"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { projects } from "../../data/projects"; // adjust path if needed
import { FaFigma } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Button from "./Button";
import { IoClose } from "react-icons/io5";

type Props = {
  slug: string;
  onClose: () => void;
};

export default function ProjectOverlay({ slug, onClose }: Props) {
  const project = projects.find((p) => p.slug === slug);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-start justify-center p-6 w-full max-w-[1440px] m-auto"
      role="dialog"
      aria-modal="true"
      aria-label="dialog"
      onClick={onClose} // backdrop click closes
    >
      {/* backdrop */}
      <motion.div
        animate={{ opacity: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 backdrop-blur-lg bg-gray-900"
        aria-hidden="true"
      />

      {/* content wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-[1280px] mx-auto"
        style={{ maxHeight: "100vh" }}
      >
        {/* Close button (top-right of viewport) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: .8, ease: "anticipate" }}
          className="absolute right-0 top-10 z-300 px-large"
        >
          <Button
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Close project overview"
          >
            <IoClose className="text-xl aspect-square " />
          </Button>
        </motion.div>

        {/* top image (full width) */}
        <div className="relative">
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
        </div>

        {/* article card that overlaps the image (same classes as your Slug page) */}
        <motion.article
          initial={{ opacity: 0, y: 50, filter: "blur(10px)", }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", }}
          exit={{ opacity: 0, y: 50, filter: "blur(10px)", }}
          transition={{ duration: 0.6, ease: "anticipate", delay: 0.3 }}
          className="
            bg-gray-700 border border-gray-600 backdrop-blur 
            rounded-2xl p-large 
            relative z-10 
            -mt-20 md:-mt-60 px-large md:mx-large 
          max-h-10 h-[56dvh] overflow-y-scroll"
          style={{ maxHeight: "68vh" }}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <div className="flex gap-4 text-xl relative">
              {project.figmaLink && (
                <Button>
                  <FaFigma />
                </Button>
              )}
              {project.site && (
                <Button>
                  <FiExternalLink />
                </Button>
              )}
            </div>
          </div>

          <div className="mt-medium">
            {project.overview && (
              <>
                <h2 className="mt-large">Overview</h2>
                <p className="mt-small">{project.overview}</p>
              </>
            )}

            {project.process && (
              <>
                <h2 className="mt-large">Process</h2>
                <p className="mt-small">{project.process}</p>
              </>
            )}

            {(project.mockup || project.mockupTwo) && (
              <div className="grid grid-cols-1 md:grid-cols-[auto_auto] gap-medium py-large">
                {project.mockup && (
                  // using plain <img> for fast load in overlay; change to next/image if preferred
                  <img
                    src={project.mockup}
                    alt={project.alt || "Project mockup"}
                    loading="lazy"
                    className="w-full h-full rounded-lg"
                  />
                )}
                {project.mockupTwo && (
                  <img
                    src={project.mockupTwo}
                    alt={project.alt || "Project mockup"}
                    loading="lazy"
                    className="w-full h-full rounded-lg"
                  />
                )}
              </div>
            )}

            {project.results && (
              <>
                <h2 className="mt-large">The results</h2>
                <p className="mt-small">{project.results}</p>
              </>
            )}
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
