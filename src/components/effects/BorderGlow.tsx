"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

interface BorderGlowProps extends HTMLAttributes<HTMLElement> {
  /** Element rendered as the card, e.g. "section" or "li". */
  as?: ElementType;
  /** Glow colour as a space-separated HSL triplet, e.g. "325 80% 70%". */
  glowColor?: string;
  /** Three colours blended into the mesh gradient on the lit border. */
  colors?: [string, string, string];
  /** Card surface; any CSS colour or variable. */
  backgroundColor?: string;
  borderRadius?: number;
  /** How far (px) the soft glow spreads outside the card. */
  glowRadius?: number;
  /** 0–100: how far from the centre (in %) the cursor must be before the glow starts. */
  edgeSensitivity?: number;
  /** Multiplies the strength of every glow layer. */
  glowIntensity?: number;
  /** 0–50: size (in % of a full turn) of the lit arc of the border. */
  coneSpread?: number;
  /** 0–1: strength of the colour wash just inside the lit edge. */
  fillOpacity?: number;
}

/**
 * A card whose border lights up in the direction of the cursor as it nears
 * the edge — inspired by React Bits' "Border Glow".
 *
 * Built to be cheap: the pointer only writes two CSS variables (the cursor's
 * angle around the centre and how close it is to the edge), at most once per
 * frame. React never re-renders while the cursor moves, and every gradient,
 * mask and shadow is static CSS (`.border-glow` in globals.css) rather than
 * inline strings rebuilt on each move. The glow layers sit behind the
 * children, so `className` lays out the content directly (flex, grid, …).
 */
export default function BorderGlow({
  as: Component = "div",
  className,
  style,
  children,
  glowColor = "325 80% 70%",
  colors = ["#f472b6", "#c084fc", "#60a5fa"],
  backgroundColor = "var(--color-caption)",
  borderRadius = 21,
  glowRadius = 62,
  edgeSensitivity = 11,
  glowIntensity = 2,
  coneSpread = 25,
  fillOpacity = 0.5,
  ...attributes
}: BorderGlowProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const update = () => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;
      // Cursor relative to the card's centre.
      const dx = pointerX - rect.left - halfWidth;
      const dy = pointerY - rect.top - halfHeight;

      // 0 at the centre, 1 on the edge the cursor is closest to — so it works
      // the same for wide, tall and square cards.
      const edge = Math.min(Math.max(Math.abs(dx) / halfWidth, Math.abs(dy) / halfHeight), 1);
      // 0deg points up and increases clockwise, matching `conic-gradient`.
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

      card.style.setProperty("--glow-edge", edge.toFixed(3));
      card.style.setProperty("--glow-angle", `${angle.toFixed(1)}deg`);
    };

    const onMove = (event: PointerEvent) => {
      // Touch has no hover, so a tap would leave the glow stuck on.
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      card.style.setProperty("--glow-edge", "0");
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const glowStyle = {
    "--glow-color": glowColor,
    "--glow-c1": colors[0],
    "--glow-c2": colors[1],
    "--glow-c3": colors[2],
    "--glow-bg": backgroundColor,
    "--glow-border-radius": `${borderRadius}px`,
    "--glow-radius": `${glowRadius}px`,
    "--glow-sensitivity": edgeSensitivity,
    "--glow-intensity": glowIntensity,
    "--glow-cone": `${coneSpread}%`,
    "--glow-fill": fillOpacity,
    ...style,
  } as CSSProperties;

  return (
    <Component
      ref={cardRef}
      className={cn("border-glow", className)}
      style={glowStyle}
      {...attributes}
    >
      <span className="border-glow__border" aria-hidden="true" />
      <span className="border-glow__fill" aria-hidden="true" />
      <span className="border-glow__halo" aria-hidden="true" />
      {children}
    </Component>
  );
}
