"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import Button from "@/components/ui/Button";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { getProjectBySlug } from "@/data/projects";
import ProjectDetails from "./ProjectDetails";

interface ProjectOverlayProps {
  slug: string;
  onClose: () => void;
  id?: string;
}

/**
 * Full-screen dialog showing one project. The cover image is animated from the
 * card in the stack via a shared `layoutId`.
 *
 * Closes on Escape, on backdrop click, and via the close button, which takes
 * focus as soon as the dialog opens.
 */
export default function ProjectOverlay({ slug, onClose, id }: ProjectOverlayProps) {
  const project = getProjectBySlug(slug);
  const closeButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} overview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-0 z-500 flex items-start justify-center p-6 w-full max-w-[936px] m-auto"
      onClick={onClose}
    >
      <motion.div
        animate={{ opacity: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 backdrop-blur-lg bg-gray-900"
        aria-hidden="true"
      />

      {/* Clicks inside the panel must not reach the backdrop's close handler. */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 w-full max-w-[1280px] mx-auto max-h-screen"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "anticipate" }}
          className="absolute right-0 top-10 z-300 px-large"
        >
          <Button ref={closeButtonRef} onClick={onClose} aria-label="Close project overview">
            <IoClose className="text-xl aspect-square" />
          </Button>
        </motion.div>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          src={project.image}
          alt={project.title}
          layoutId={`project-image-${project.slug}`}
          transition={{ duration: 0.8, ease: "anticipate", delay: 0.05 }}
          className="w-full h-auto object-cover rounded-2xl"
          style={{ viewTransitionName: `project-${project.slug}` }}
        />

        {/* Overlaps the image above it, and scrolls independently. */}
        <motion.article
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: "anticipate", delay: 0.3 }}
          className="bg-gray-700 border border-gray-600 backdrop-blur rounded-2xl p-large relative z-1000 -mt-20 md:-mt-75 px-large md:mx-large overflow-y-auto max-h-[68vh]"
        >
          <ProjectDetails project={project} />
        </motion.article>
      </div>
    </motion.div>
  );
}
