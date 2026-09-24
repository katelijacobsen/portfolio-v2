"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { projects } from "@/data/projects";
import { useProjectCardStack } from "@/hooks/useProjectCardStack";
import ProjectCard from "./ProjectCard";
import ProjectOverlay from "./ProjectOverlay";

interface ProjectCardStackProps {
  /** Rendered above the deck and pinned with it, so it stays put while stepping. */
  heading?: ReactNode;
}

/**
 * The scroll-driven deck of project cards plus the overlay it opens.
 *
 * Owns which project is open; the GSAP wiring lives in `useProjectCardStack`
 * and the card markup in `ProjectCard`, so this component only coordinates.
 */
export default function ProjectCardStack({ heading }: ProjectCardStackProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useProjectCardStack({ containerRef, pinRef, paused: openSlug !== null });

  const openProject = (slug: string) => {
    // View Transitions make the swap smoother where supported; the shared
    // `layoutId` animation is the fallback everywhere else.
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(() => setOpenSlug(slug));
    } else {
      setOpenSlug(slug);
    }
  };

  return (
    <>
      {/* Pinning wraps the pinned block in a GSAP "pin-spacer"; this wrapper keeps
          that extra node out of the tree React itself inserts and removes. */}
      <div>
        {/* `flow-root` keeps the heading's margin inside the pinned block. */}
        <div ref={pinRef} className="flow-root">
          {heading}

          <div
            ref={containerRef}
            className="relative min-h-[60vh] w-full cards-section"
            aria-label="Projects"
          >
            <ul className="m-0 p-0 list-none">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  isOpen={openSlug === project.slug}
                  onOpen={openProject}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {openSlug && (
          <ProjectOverlay
            id={`project-overlay-${openSlug}`}
            slug={openSlug}
            onClose={() => setOpenSlug(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
