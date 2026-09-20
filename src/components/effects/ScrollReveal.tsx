"use client";

import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface ScrollRevealProps {
  /** Plain text. Each word is revealed individually as the block scrolls past. */
  children: string;
  /** Fades the words in from a blur as well as from `baseOpacity`. */
  enableBlur?: boolean;
  /** Opacity words start at, 0-1. */
  baseOpacity?: number;
  /** Degrees the block is rotated by before it straightens out. */
  baseRotation?: number;
  /** Blur radius in px the words start at. Ignored unless `enableBlur`. */
  blurStrength?: number;
  className?: string;
}

/** Shared ScrollTrigger configuration for all three tweens. */
const TRIGGER_START = "top 75%";
const TRIGGER_END = "bottom top+=1000";

/**
 * Reveals a paragraph word by word while it scrolls into view, straightening a
 * slight rotation at the same time.
 */
export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  className,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split on whitespace, keeping the separators so spacing survives.
  const words = useMemo(
    () =>
      children.split(/(\s+)/).map((chunk, index) =>
        /^\s+$/.test(chunk) ? (
          chunk
        ) : (
          <span className="inline-block word" key={index}>
            {chunk}
          </span>
        )
      ),
    [children]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // A context scopes every tween and ScrollTrigger created inside it, so
    // cleanup removes only this component's animations.
    const context = gsap.context(() => {
      const trigger = { trigger: element, start: TRIGGER_START, end: TRIGGER_END, scrub: 1 };

      gsap.fromTo(
        element,
        { transformOrigin: "0% 20%", rotate: baseRotation },
        { rotate: 0, ease: "none", scrollTrigger: trigger }
      );

      const wordElements = element.querySelectorAll<HTMLElement>(".word");

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: "opacity" },
        { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: trigger }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          { filter: "blur(0px)", ease: "none", stagger: 0.05, scrollTrigger: trigger }
        );
      }

      ScrollTrigger.refresh();
    }, element);

    return () => context.revert();
  }, [children, enableBlur, baseOpacity, baseRotation, blurStrength]);

  return (
    <div ref={containerRef} className={cn("my-5", className)}>
      <h3>{words}</h3>
    </div>
  );
}
