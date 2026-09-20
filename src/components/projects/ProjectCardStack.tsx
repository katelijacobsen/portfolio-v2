"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { projects } from "@/data/projects";
import { useProjectCardStack } from "@/hooks/useProjectCardStack";
import ProjectCard from "./ProjectCard";
import ProjectOverlay from "./ProjectOverlay";

/**
 * The scroll-driven deck of project cards plus the overlay it opens.
 *
 * Owns which project is open; the GSAP wiring lives in `useProjectCardStack`
 * and the card markup in `ProjectCard`, so this component only coordinates.
 */
export default function ProjectCardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useProjectCardStack({ containerRef, paused: openSlug !== null });

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
