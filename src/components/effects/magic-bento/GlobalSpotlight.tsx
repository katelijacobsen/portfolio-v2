"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import {
  BENTO_CARD_CLASS,
  BENTO_SECTION_CLASS,
  DEFAULT_GLOW_COLOR,
  DEFAULT_SPOTLIGHT_RADIUS,
} from "./constants";

interface GlobalSpotlightProps {
  /** The bento grid whose cards should light up. */
  gridRef: RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

/**
 * Renders nothing. Attaches a cursor-following glow to `document.body` and
 * feeds each card a `--glow-*` custom property based on how close the cursor
 * is, which the CSS in `globals.css` turns into a border highlight.
 */
export default function GlobalSpotlight({
  gridRef,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}: GlobalSpotlightProps) {
  useEffect(() => {
    if (disableAnimations || !gridRef.current) return;

    const spotlight = createSpotlightElement(glowColor);
    document.body.appendChild(spotlight);

    const cardsInGrid = () =>
      Array.from(
        gridRef.current?.querySelectorAll<HTMLElement>(`.${BENTO_CARD_CLASS}`) ?? []
      );

    const dimAllCards = () => {
      cardsInGrid().forEach((card) => card.style.setProperty("--glow-intensity", "0"));
    };

    const fadeOutSpotlight = (duration: number) => {
      gsap.to(spotlight, { opacity: 0, duration, ease: "power2.out" });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const section = gridRef.current?.closest(`.${BENTO_SECTION_CLASS}`);
      const rect = section?.getBoundingClientRect();
      const isInside =
        !!rect &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInside) {
        fadeOutSpotlight(0.3);
        dimAllCards();
        return;
      }

      // Cards within `proximity` glow fully; between there and `fadeDistance`
      // they fade out; beyond that they stay dark.
      const proximity = spotlightRadius * 0.5;
      const fadeDistance = spotlightRadius * 0.75;
      let nearestDistance = Infinity;

      cardsInGrid().forEach((card) => {
        const distance = distanceFromCardEdge(card, event);
        nearestDistance = Math.min(nearestDistance, distance);

        updateCardGlow(
          card,
          event,
          intensityAt(distance, proximity, fadeDistance),
          spotlightRadius
        );
      });

      gsap.to(spotlight, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity = intensityAt(nearestDistance, proximity, fadeDistance) * 0.8;
      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      dimAllCards();
      fadeOutSpotlight(0.3);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(spotlight);
      spotlight.remove();
    };
  }, [gridRef, disableAnimations, spotlightRadius, glowColor]);

  return null;
}

/* ----------------------------------------------------------------- helpers */

function createSpotlightElement(glowColor: string): HTMLDivElement {
  const spotlight = document.createElement("div");
  spotlight.className = "global-spotlight";
  spotlight.style.cssText = `
    position: fixed;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle,
      rgba(${glowColor}, 0.15) 0%,
      rgba(${glowColor}, 0.08) 15%,
      rgba(${glowColor}, 0.04) 25%,
      rgba(${glowColor}, 0.02) 40%,
      rgba(${glowColor}, 0.01) 65%,
      transparent 70%
    );
    z-index: 200;
    opacity: 0;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
  `;
  return spotlight;
}

/** Distance from the cursor to the card's edge, clamped at 0 when inside. */
function distanceFromCardEdge(card: HTMLElement, event: MouseEvent): number {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const fromCenter = Math.hypot(event.clientX - centerX, event.clientY - centerY);

  return Math.max(0, fromCenter - Math.max(rect.width, rect.height) / 2);
}

/** 1 inside `proximity`, easing linearly to 0 at `fadeDistance`. */
function intensityAt(distance: number, proximity: number, fadeDistance: number): number {
  if (distance <= proximity) return 1;
  if (distance >= fadeDistance) return 0;
  return (fadeDistance - distance) / (fadeDistance - proximity);
}

function updateCardGlow(
  card: HTMLElement,
  event: MouseEvent,
  intensity: number,
  radius: number
) {
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--glow-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty("--glow-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  card.style.setProperty("--glow-intensity", intensity.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
}
