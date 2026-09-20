"use client";

import React, { useCallback, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import {
  DEFAULT_GLOW_COLOR,
  DEFAULT_PARTICLE_COUNT,
  type BentoEffectOptions,
} from "./constants";

type ParticleCardProps = Pick<
  BentoEffectOptions,
  | "particleCount"
  | "glowColor"
  | "enableTilt"
  | "enableMagnetism"
  | "clickEffect"
  | "disableAnimations"
> & {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * A card that reacts to the pointer: particles drift out on hover, the card can
 * tilt and lean toward the cursor, and a click sends a ripple across it.
 *
 * Set `particleCount` to 0 to keep the pointer behaviour without the particles.
 */
export default function ParticleCard({
  children,
  className,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = false,
  disableAnimations = false,
}: ParticleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  /** Particle blueprints, created once from the card's size. */
  const templatesRef = useRef<HTMLDivElement[]>([]);
  /** Particles currently in the DOM. */
  const activeRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);

  const createTemplates = useCallback(() => {
    if (templatesRef.current.length > 0 || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    templatesRef.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
  }, [particleCount, glowColor]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(window.clearTimeout);
    timeoutsRef.current = [];

    activeRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => particle.remove(),
      });
    });
    activeRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    createTemplates();

    templatesRef.current.forEach((template, index) => {
      const timeoutId = window.setTimeout(() => {
        const card = cardRef.current;
        if (!isHoveredRef.current || !card) return;

        const particle = template.cloneNode(true) as HTMLDivElement;
        card.appendChild(particle);
        activeRef.current.push(particle);

        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(particle, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [createTemplates]);

  useEffect(() => {
    const element = cardRef.current;
    if (disableAnimations || !element) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      spawnParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearParticles();

      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const { x, y, centerX, centerY } = pointerPosition(element, event);

      if (enableTilt) {
        gsap.to(element, {
          rotateX: ((y - centerY) / centerY) * -10,
          rotateY: ((x - centerX) / centerX) * 10,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
      if (enableMagnetism) {
        gsap.to(element, {
          x: (x - centerX) * 0.05,
          y: (y - centerY) * 0.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (!clickEffect) return;
      spawnRipple(element, event, glowColor);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearParticles();
      gsap.killTweensOf(element);
    };
  }, [
    spawnParticles,
    clearParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div ref={cardRef} className={cn("relative overflow-hidden", className)} style={style}>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------- helpers */

function createParticleElement(x: number, y: number, color: string): HTMLDivElement {
  const element = document.createElement("div");
  element.className = "particle";
  element.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return element;
}

/** Cursor position relative to an element, plus that element's centre. */
function pointerPosition(element: HTMLElement, event: MouseEvent) {
  const rect = element.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    centerX: rect.width / 2,
    centerY: rect.height / 2,
  };
}

/** Expands a soft circle from the click point out to the furthest corner. */
function spawnRipple(element: HTMLElement, event: MouseEvent, glowColor: string) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const radius = Math.max(
    Math.hypot(x, y),
    Math.hypot(x - rect.width, y),
    Math.hypot(x, y - rect.height),
    Math.hypot(x - rect.width, y - rect.height)
  );

  const ripple = document.createElement("div");
  ripple.style.cssText = `
    position: absolute;
    width: ${radius * 2}px;
    height: ${radius * 2}px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
    left: ${x - radius}px;
    top: ${y - radius}px;
    pointer-events: none;
    z-index: 1000;
  `;
  element.appendChild(ripple);

  gsap.fromTo(
    ripple,
    { scale: 0, opacity: 1 },
    {
      scale: 1,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    }
  );
}
