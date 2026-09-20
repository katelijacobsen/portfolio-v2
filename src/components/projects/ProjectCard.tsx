"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import { CARD_ATTRIBUTE } from "@/hooks/useProjectCardStack";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  /** True while this project's overlay is open. */
  isOpen: boolean;
  onOpen: (slug: string) => void;
}

/**
 * One card in the stack: cover image, title, and an "Overview" action.
 *
 * Both the image and the button open the same overlay; the image is a real
 * `<button>` so it stays keyboard reachable.
 */
export default function ProjectCard({ project, isOpen, onOpen }: ProjectCardProps) {
  const overlayId = `project-overlay-${project.slug}`;
  const controls = { "aria-controls": overlayId, "aria-expanded": isOpen };

  return (
    <li
      // The stack hook finds cards by this attribute and positions them with GSAP.
      {...{ [CARD_ATTRIBUTE]: "" }}
      className="absolute top-0 left-0 w-full grid grid-cols-3 grid-rows-3 min-h-[150px]"
    >
      <figure className="col-start-1 col-end-4 row-start-1 row-end-4 place-self-stretch relative z-0 m-0">
        <button
          type="button"
          onClick={() => onOpen(project.slug)}
          className="w-full h-full p-0 border-0 card-gradient"
          aria-label={`Open ${project.title} overview`}
          {...controls}
        >
          <motion.img
            src={project.image}
            alt={`${project.title} — ${project.tag}`}
            layoutId={`project-image-${project.slug}`}
            transition={{ duration: 0.8, ease: "anticipate" }}
            className="rounded-lg w-full h-full object-cover"
            // Promote to its own layer: the stack tweens scale and blur on this.
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          />
        </button>
        <figcaption className="sr-only">
          {project.title}, {project.tag}
        </figcaption>
      </figure>

      <div className="col-start-1 col-end-3 row-start-3 flex items-center gap-medium px-medium md:px-14">
        <h3 className="text-white font-bold z-10 relative">{project.title}</h3>
      </div>

      <div className="col-start-3 row-start-3 z-300 relative place-self-center p-medium">
        <Button onClick={() => onOpen(project.slug)} {...controls}>
          Overview
        </Button>
      </div>
    </li>
  );
}
