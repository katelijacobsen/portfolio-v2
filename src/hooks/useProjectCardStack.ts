"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, Observer, ScrollTrigger } from "@/lib/gsap";

/** Attribute the hook uses to find the cards inside the container. */
export const CARD_ATTRIBUTE = "data-stack-card";

const SCROLL_TRIGGER_ID = "project-card-stack";
const TIMELINE_STEP = 0.4;

interface Options {
  /** Element that gets pinned while the stack is being stepped through. */
  containerRef: RefObject<HTMLElement | null>;
  /**
   * Suspends the interaction — used while the project overlay is open so the
   * stack does not animate behind the dialog.
   */
  paused?: boolean;
}

/**
 * Turns a list of absolutely-stacked cards into a scroll-driven deck.
 *
 * While the container is pinned, wheel/touch gestures are intercepted by a GSAP
 * Observer and mapped onto timeline labels — one label per card — instead of
 * scrolling the page. The observer disables itself at either end of the deck so
 * the page keeps scrolling normally.
 */
export function useProjectCardStack({ containerRef, paused = false }: Options): void {
  // Read inside GSAP callbacks so they always see the current value rather than
  // the value captured when the (mount-only) setup effect ran.
  const pausedRef = useRef(paused);
  const observerRef = useRef<Observer | null>(null);

  useEffect(() => {
    pausedRef.current = paused;

    const trigger = ScrollTrigger.getById(SCROLL_TRIGGER_ID);
    if (paused) {
      observerRef.current?.disable();
      trigger?.disable();
    } else {
      trigger?.enable();
    }
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(`[${CARD_ATTRIBUTE}]`)
    );
    if (cards.length === 0) return;

    const context = gsap.context(() => {
      let isAnimating = false;

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

      const timeline = gsap.timeline({ paused: true });

      cards.slice(0, -1).forEach((card, index) => {
        const label = `card-${index}`;
        timeline.add(label);

        // Push the current card back…
        timeline.to(
          card,
          {
            scale: 0.85 + index * 0.03,
            filter: "blur(4px)",
            duration: TIMELINE_STEP,
            ease: "expo.out",
          },
          label
        );

        // …while the next one slides in over it.
        timeline.from(
          cards[index + 1],
          {
            y: 500,
            opacity: 0,
            filter: "blur(2px)",
            duration: TIMELINE_STEP,
            ease: "expo.out",
          },
          "<"
        );
      });

      const stepTo = (label: string | null, isScrollingDown: boolean) => {
        const atEnd = isScrollingDown ? !timeline.nextLabel() : !timeline.previousLabel();
        if (atEnd) {
          // Hand scrolling back to the page.
          observer.disable();
          return;
        }

        if (isAnimating || !label) return;
        isAnimating = true;
        timeline.tweenTo(label, {
          onComplete: () => {
            isAnimating = false;
          },
        });
      };

      let restoreScroll: (() => void) | null = null;

      const observer = Observer.create({
        target: window,
        wheelSpeed: -1000,
        tolerance: 150,
        preventDefault: true,
        onDown: () => stepTo(timeline.previousLabel(), false),
        onUp: () => stepTo(timeline.nextLabel(), true),
        onEnable(self) {
          // Pin the page where it is: any scroll that slips through is undone.
          const savedScroll = self.scrollY();
          restoreScroll = () => self.scrollY(savedScroll);
          document.addEventListener("scroll", restoreScroll, { passive: false });
        },
        onDisable() {
          if (restoreScroll) document.removeEventListener("scroll", restoreScroll);
          restoreScroll = null;
        },
      });

      observer.disable();
      observerRef.current = observer;

      const enableObserver = () => {
        if (!observer.isEnabled && !pausedRef.current) observer.enable();
      };

      ScrollTrigger.create({
        id: SCROLL_TRIGGER_ID,
        trigger: container,
        pin: true,
        start: "top 30%",
        // The deck is stepped through by the observer, not by scroll distance,
        // so the pin itself only needs to exist for an instant.
        end: "+=1",
        onEnter: enableObserver,
        onEnterBack: enableObserver,
      });

      return () => {
        observer.kill();
        timeline.kill();
        observerRef.current = null;
      };
    }, container);

    // `context.revert()` only kills the tweens and ScrollTriggers created above,
    // leaving animations owned by other components alone.
    return () => context.revert();
  }, [containerRef]);
}
