"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Attribute the hook uses to find the cards inside the container. */
export const CARD_ATTRIBUTE = "data-stack-card";

/** How far (as a fraction of the viewport height) the page scrolls per card. */
const SCROLL_PER_CARD = 0.8;
/** Seconds the deck takes to catch up with the scroll position (scrub lag). */
const SCRUB_SMOOTHING = 1;

interface Options {
  /** Element holding the cards. */
  containerRef: RefObject<HTMLElement | null>;
  /**
   * Element pinned while the stack is stepped through, e.g. the cards plus
   * their heading. Defaults to the container itself.
   */
  pinRef?: RefObject<HTMLElement | null>;
  /**
   * Suspends snapping — used while the project overlay is open, so the scroll
   * lock and the scroll restore on close cannot make the deck jump.
   */
  paused?: boolean;
}

/**
 * Turns a list of absolutely-stacked cards into a scroll-driven deck.
 *
 * The container is pinned for one "page" of scrolling per card and a scrubbed
 * timeline maps that scroll distance onto the card transitions. The page keeps
 * scrolling natively, so trackpads and wheels behave the same everywhere, and
 * snapping settles the deck on the next card in the scroll direction once the
 * gesture ends.
 */
export function useProjectCardStack({
  containerRef,
  pinRef,
  paused = false,
}: Options): void {
  // Read inside the snap callback so it always sees the current value rather
  // than the value captured when the (mount-only) setup effect ran.
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const pinned = pinRef?.current ?? container;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(`[${CARD_ATTRIBUTE}]`)
    );
    if (cards.length < 2) return;

    const context = gsap.context(() => {
      // Stack every card on top of the first one, slightly offset.
      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        y: (index: number) => 20 * index,
        zIndex: (index: number) => cards.length + index,
        transformOrigin: "center top",
      });

      // Progress values (0–1) of the card labels, filled in once the timeline
      // is built. Snapping steps between these in the scroll direction.
      let snapPoints: (value: number, direction?: number) => number = (value) => value;

      const timeline = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinned,
          pin: pinned,
          start: "top 15%",
          end: () => `+=${(cards.length - 1) * window.innerHeight * SCROLL_PER_CARD}`,
          scrub: SCRUB_SMOOTHING,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value, self) =>
              pausedRef.current || !self ? value : snapPoints(value, self.direction),
            // Snap from where the gesture actually stopped instead of projecting
            // its momentum forward, so a trackpad flick moves one card, not three.
            inertia: false,
            // Wait for the trackpad's momentum to die down before settling.
            delay: 0.15,
            duration: { min: 0.3, max: 0.8 },
            ease: "power2.inOut",
          },
        },
      });

      cards.slice(1).forEach((card, index) => {
        const previous = cards[index];
        timeline.addLabel(`card-${index}`);

        // Push the current card back…
        timeline.to(previous, { scale: 0.85 + index * 0.03, filter: "blur(4px)" });

        // …while the next one slides in over it.
        timeline.from(card, { y: 500, opacity: 0, filter: "blur(2px)" }, "<");
      });

      // Without a label at the very end, snapping could never settle on the
      // last card — it would stay half off-screen.
      timeline.addLabel(`card-${cards.length - 1}`);

      const duration = timeline.duration();
      snapPoints = ScrollTrigger.snapDirectional(
        Object.values(timeline.labels).map((time) => time / duration)
      );
    }, container);

    // `context.revert()` only kills the tweens and ScrollTriggers created above,
    // leaving animations owned by other components alone.
    return () => context.revert();
  }, [containerRef, pinRef]);
}
