"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import SkillIcon from "@/components/ui/SkillIcon";
import { skills, type Skill } from "@/data/skills";

interface SkillsMarqueeProps {
  /** Pixels travelled per second. */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * How quickly the track eases back to its cruising speed after a fling or a
 * hover pause. Higher is snappier; 3 settles in roughly a second.
 */
const VELOCITY_EASING = 3;

/**
 * An endlessly scrolling row of skill icons, with a tooltip on hover.
 *
 * The track holds two identical copies of the list and its offset is wrapped
 * by exactly one copy's width, so the loop point is invisible no matter the
 * viewport size. The row can be dragged either way; letting go keeps the
 * momentum of the drag, which then eases back into the normal auto-scroll.
 */
export default function SkillsMarquee({
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className,
}: SkillsMarqueeProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  // Mutable animation state, read every frame by the ticker below.
  const hoveringRef = useRef(false);
  const dragRef = useRef<{ pointerId: number; lastX: number; lastTime: number } | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cruiseVelocity = direction === "left" ? -speed : speed;
    velocityRef.current = cruiseVelocity;

    // One copy is half the track; wrapping by that much lands on an identical frame.
    let copyWidth = track.scrollWidth / 2;
    const resizeObserver = new ResizeObserver(() => {
      copyWidth = track.scrollWidth / 2;
    });
    resizeObserver.observe(track);

    const setX = gsap.quickSetter(track, "x", "px");

    const tick = (_time: number, deltaMs: number) => {
      const delta = Math.min(deltaMs, 100) / 1000; // Avoid a jump after a background tab.

      if (!dragRef.current) {
        const target = pauseOnHover && hoveringRef.current ? 0 : cruiseVelocity;
        // Frame-rate independent ease towards the target speed.
        velocityRef.current += (target - velocityRef.current) * (1 - Math.exp(-VELOCITY_EASING * delta));
        offsetRef.current += velocityRef.current * delta;
      }

      if (copyWidth > 0) setX(gsap.utils.wrap(-copyWidth, 0, offsetRef.current));
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      gsap.set(track, { clearProps: "transform" });
    };
  }, [speed, direction, pauseOnHover]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    // Keep receiving moves even when the pointer leaves the row mid-drag.
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, lastX: event.clientX, lastTime: event.timeStamp };
    velocityRef.current = 0;
    setHovered(null);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    setPointer({ x: event.clientX, y: event.clientY });

    const drag = dragRef.current;
    if (!drag) {
      // Hover is resolved from the pointer's target rather than per-icon enter/leave
      // events, which pointer capture and touch input leave in a stale state.
      if (event.pointerType === "mouse") setHovered(event.target);
      return;
    }
    if (drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.lastX;
    const dt = Math.max(event.timeStamp - drag.lastTime, 1) / 1000;
    offsetRef.current += dx;
    // Smoothed so a single jittery event does not decide the fling speed.
    velocityRef.current = velocityRef.current * 0.8 + (dx / dt) * 0.2;

    drag.lastX = event.clientX;
    drag.lastTime = event.timeStamp;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    // A pointer that stopped before release should not fling.
    if (event.timeStamp - drag.lastTime > 80) velocityRef.current = 0;

    dragRef.current = null;
    setIsDragging(false);
  };

  const setHovered = (target: EventTarget | null) => {
    const item = target instanceof Element ? target.closest<HTMLElement>("[data-skill-index]") : null;
    const skill = item ? skills[Number(item.dataset.skillIndex)] : null;

    hoveringRef.current = skill !== null;
    setHoveredSkill((current) => (current === skill ? current : skill));
  };

  return (
    <div
      // `pan-y` leaves vertical swipes to the page, so touch users can still scroll past.
      className={cn("relative overflow-hidden w-full select-none touch-pan-y", className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => setHovered(null)}
      // Stop the browser's native image drag from hijacking the gesture.
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="absolute inset-0 z-10 fade-overlay pointer-events-none" />

      {hoveredSkill && !isDragging && (
        <div
          role="tooltip"
          className="fixed z-50 px-2 py-[.3rem] text-h1 text-white bg-[#DD2590] rounded-md pointer-events-none"
          style={{ left: pointer.x + 15, top: pointer.y + 15 }}
        >
          {hoveredSkill.name}: {hoveredSkill.experience}
        </div>
      )}

      <ul ref={trackRef} className="flex w-max m-0 p-0 list-none">
        {/* Two copies: the second one is decorative and hidden from assistive tech. */}
        {[...skills, ...skills].map((skill, index) => (
          <li
            key={`${skill.src}-${index}`}
            aria-hidden={index >= skills.length}
            data-skill-index={index % skills.length}
            className="inline-flex items-center justify-center p-medium flex-shrink-0"
          >
            <div className="transition-transform duration-300 hover:scale-125">
              <SkillIcon src={skill.src} alt={skill.name} size={64} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
