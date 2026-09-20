/** Shared defaults and tuning values for the Magic Bento effects. */

export const DEFAULT_PARTICLE_COUNT = 30;
export const DEFAULT_SPOTLIGHT_RADIUS = 500;
/** Tailwind gray-400, as the `R, G, B` triplet the CSS variables expect. */
export const DEFAULT_GLOW_COLOR = "255, 93, 163, 0.5";

/** Class the spotlight uses to find the section it should light up. */
export const BENTO_SECTION_CLASS = "bento-section";
/** Class every card carries so the spotlight can measure its distance. */
export const BENTO_CARD_CLASS = "bento-card";

/**
 * Feature switches shared by the bento grid and its cards. Every effect can be
 * turned off individually; all of them are skipped on touch/small screens.
 */
export interface BentoEffectOptions {
  /** Floating particles on hover. */
  enableStars?: boolean;
  /** Cursor-following glow across the whole section. */
  enableSpotlight?: boolean;
  /** Gradient border that brightens near the cursor. */
  enableBorderGlow?: boolean;
  /** 3D tilt following the cursor. */
  enableTilt?: boolean;
  /** Card drifts slightly toward the cursor. */
  enableMagnetism?: boolean;
  /** Ripple on click. */
  clickEffect?: boolean;
  /** Escape hatch: turns every effect off. */
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  /** `R, G, B` triplet, e.g. "156, 163, 175". */
  glowColor?: string;
}

export const DEFAULT_EFFECTS: Required<
  Omit<BentoEffectOptions, "disableAnimations">
> = {
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: false,
  enableMagnetism: false,
  clickEffect: true,
  spotlightRadius: DEFAULT_SPOTLIGHT_RADIUS,
  particleCount: DEFAULT_PARTICLE_COUNT,
  glowColor: DEFAULT_GLOW_COLOR,
};
