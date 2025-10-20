"use client";

import React from "react";
import Image from "next/image";
import { projects } from "../../../data/projects";
import { FaFigma } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Button from "@/app/components/Button";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <div>Project not found</div>;

  return (
    <main className="relative grid grid-cols-1 gap-8 py-large max-w-[1280px] m-auto p-small">
      <div className="relative">
        <Image
          width={1400}
          height={1400}
          src={project.image}
          alt={project.title}
          className="w-full h-auto object-cover rounded-2xl"
          style={{
            viewTransitionName: `project-${project.slug}`,
          }}
        />
      </div>

      <article
        className="
          bg-gray-700 border border-gray-600 backdrop-blur 
          rounded-2xl p-large 
          relative z-10 
          -mt-20 md:-mt-40 px-large md:mx-large
        "
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <div className="flex gap-4 text-xl relative">
            {project.figmaLink && (
              <Button href={project.figmaLink}>
                <FaFigma />
              </Button>
            )}
            {project.site && (
              <Button href={project.site}>
                <FiExternalLink />
              </Button>
            )}
          </div>
        </div>

        <div>
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
                <Image
                  width={1200}
                  height={1200}
                  src={project.mockup}
                  alt={project.alt || "Project mockup"}
                  loading="lazy"
                  className="w-full h-full rounded-lg"
                />
              )}
              {project.mockupTwo && (
                <Image
                  width={1200}
                  height={1200}
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
      </article>
    </main>
  );
}
