"use client";

import React from "react";
import { motion } from "motion/react";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { getProjectBySlug } from "@/data/projects";

/**
 * Standalone page for a single project — the shareable/deep-link counterpart to
 * the overlay on the home page. Both render the same `ProjectDetails`.
 */
export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="relative grid grid-cols-1 gap-8 py-large max-w-[1280px] m-auto p-small">
      <motion.img
        src={project.image}
        alt={project.title}
        layoutId={`project-image-${project.slug}`}
        transition={{ duration: 1.4, ease: "anticipate", delay: 0.1 }}
        className="w-full h-auto object-cover rounded-2xl"
        style={{ viewTransitionName: `project-${project.slug}` }}
      />

      {/* Overlaps the image above it. */}
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "anticipate" }}
        className="bg-gray-700 border border-gray-600 backdrop-blur rounded-2xl p-large relative z-10 -mt-20 md:-mt-40 px-large md:mx-large"
      >
        <ProjectDetails project={project} titleAs="h1" />
      </motion.article>
    </main>
  );
}
