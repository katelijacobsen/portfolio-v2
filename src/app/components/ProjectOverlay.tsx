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
  id?: string;
};

export default function ProjectOverlay({ slug, onClose }: Props) {
  const project = projects.find((p) => p.slug === slug);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const articleRef = useRef<HTMLElement>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    // Store scroll position
    scrollPositionRef.current = window.scrollY;
    
    // Add no-scroll class to body
    document.body.classList.add('no-scroll');
    
    // Prevent any background scrolling
    const preventDefault = (e: Event) => {
      if (!articleRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    // Add event listeners to prevent scrolling
    document.addEventListener('scroll', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });

    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    
    return () => {
      // Remove no-scroll class
      document.body.classList.remove('no-scroll');
      
      // Remove event listeners
      document.removeEventListener('scroll', preventDefault);
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
      
      window.removeEventListener("keydown", onKey);
      
      // Restore scroll position after a brief delay
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 10);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-0 z-500 flex items-start justify-center p-6 w-full max-w-[936px] m-auto"
      role="dialog"
      aria-modal="true"
      aria-label="dialog"
      onClick={onClose}
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
        {/* Close button */}
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

        {/* top image */}
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

        {/* article card that overlaps the image */}
        <motion.article
          ref={articleRef}
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: "anticipate", delay: 0.3 }}
          className="
            bg-gray-700 border border-gray-600 backdrop-blur 
            rounded-2xl p-large 
            relative z-10 
            -mt-20 md:-mt-60 px-large md:mx-large 
            overflow-y-auto"
          style={{ maxHeight: "68vh" }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{project.title}</h3>
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