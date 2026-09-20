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
 * An endlessly scrolling row of skill icons, with a tooltip on hover.
 *
 * The track holds two identical copies of the list and slides by exactly one
 * copy's width, so the loop point is invisible no matter the viewport size.
 */
export default function SkillsMarquee({
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className,
}: SkillsMarqueeProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // One copy is half the track; sliding by that much lands on an identical frame.
    const distance = track.scrollWidth / 2;
    const duration = distance / speed;
    const [from, to] = direction === "left" ? [0, -50] : [-50, 0];

    const context = gsap.context(() => {
      animationRef.current = gsap.fromTo(
        track,
        { xPercent: from },
        { xPercent: to, duration, ease: "none", repeat: -1 }
      );
    }, track);

    return () => {
      animationRef.current = null;
      context.revert();
    };
  }, [speed, direction]);

  const handleEnter = (skill: Skill) => {
    setHoveredSkill(skill);
    if (pauseOnHover) animationRef.current?.pause();
  };

  const handleLeave = () => {
    setHoveredSkill(null);
    if (pauseOnHover) animationRef.current?.play();
  };

  return (
    <div
      className={cn("relative overflow-hidden w-full", className)}
      onMouseMove={(event) => setPointer({ x: event.clientX, y: event.clientY })}
    >
      <div className="absolute inset-0 z-10 fade-overlay pointer-events-none" />

      {hoveredSkill && (
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
            className="inline-flex items-center justify-center p-medium flex-shrink-0"
            onMouseEnter={() => handleEnter(skill)}
            onMouseLeave={handleLeave}
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
