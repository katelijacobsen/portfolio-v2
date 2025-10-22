"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { projects } from "../../data/projects"; // adjust path if needed
import { FaFigma } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Button from "./Button";

type Props = {
  slug: string;
  onClose: () => void;
};

export default function ProjectOverlay({ slug, onClose }: Props) {
  const project = projects.find((p) => p.slug === slug);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "visible";
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
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label="dialog"
      onClick={onClose} // backdrop click closes
    >
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        aria-hidden="true"
      />

      {/* content wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-[1280px] mx-auto"
        style={{ maxHeight: "100vh" }}
      >
        {/* Close button (top-right of viewport) */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close project overview"
          className="fixed top-6 right-6 z-[60] rounded-full p-2 mx-32 my-large ring-1 ring-pink-600 bg-pink-900 hover:bg-pink-800"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </button>

        {/* top image (full width) */}
        <div className="relative">
          <motion.img
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.3 }}
          className="
            bg-gray-700 border border-gray-600 backdrop-blur 
            rounded-2xl p-large 
            relative z-10 
            -mt-20 md:-mt-100 px-large md:mx-large overflow-auto
          max-h-80 overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-slate-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-slate-300"
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
    </div>
  );
}
