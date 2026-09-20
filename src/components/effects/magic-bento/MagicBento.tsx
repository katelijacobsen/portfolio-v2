"use client";

import React, { useRef, type CSSProperties, type Key, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useIsMobile } from "@/hooks/useIsMobile";
import GlobalSpotlight from "./GlobalSpotlight";
import ParticleCard from "./ParticleCard";
import {
  BENTO_CARD_CLASS,
  BENTO_SECTION_CLASS,
  DEFAULT_EFFECTS,
  type BentoEffectOptions,
} from "./constants";

interface MagicBentoProps<T> extends BentoEffectOptions {
  items: T[];
  /** Renders the contents of one card. The card shell is supplied by the grid. */
  renderItem: (item: T, index: number) => ReactNode;
  /** Stable key per item. Defaults to the array index. */
  getKey?: (item: T, index: number) => Key;
  /** Grid classes for the card container, e.g. "lg:grid-cols-2". */
  className?: string;
  /** Accessible label for the list of cards. */
  ariaLabel?: string;
}

/**
 * A grid of cards with cursor-reactive effects — spotlight, border glow,
 * particles, tilt, magnetism and a click ripple.
 *
 * The grid owns the effects; callers own the card content via `renderItem`, so
 * one implementation serves experience, education or anything added later.
 * Every effect is skipped on mobile, where there is no cursor to react to.
 */
export default function MagicBento<T>({
  items,
  renderItem,
  getKey,
  className,
  ariaLabel,
  disableAnimations = false,
  ...options
}: MagicBentoProps<T>) {
  const {
    enableStars,
    enableSpotlight,
    enableBorderGlow,
    enableTilt,
    enableMagnetism,
    clickEffect,
    spotlightRadius,
    particleCount,
    glowColor,
  } = { ...DEFAULT_EFFECTS, ...stripUndefined(options) };

  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const effectsDisabled = disableAnimations || isMobile;

  return (
    <div
      ref={gridRef}
      className={cn(BENTO_SECTION_CLASS, "relative select-none")}
      style={{ "--glow-color": glowColor } as CSSProperties}
    >
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={effectsDisabled}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <ul
        aria-label={ariaLabel}
        className={cn("grid grid-cols-1 gap-medium list-none m-0 p-0", className)}
      >
        {items.map((item, index) => (
          <li key={getKey?.(item, index) ?? index} className="contents">
            <ParticleCard
              className={cn(
                BENTO_CARD_CLASS,
                "flex flex-col font-light",
                enableBorderGlow && "bento-card--border-glow"
              )}
              disableAnimations={effectsDisabled}
              // Keeping the card mounted with zero particles preserves tilt,
              // magnetism and the click ripple when stars are switched off.
              particleCount={enableStars ? particleCount : 0}
              glowColor={glowColor}
              enableTilt={enableTilt}
              enableMagnetism={enableMagnetism}
              clickEffect={clickEffect}
            >
              {renderItem(item, index)}
            </ParticleCard>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Drops explicit `undefined` values so they do not override the defaults. */
function stripUndefined<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}
