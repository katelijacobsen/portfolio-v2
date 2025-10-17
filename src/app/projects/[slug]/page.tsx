"use client";

import React from "react";
import Image from "next/image";
import { projects } from "../../../data/projects";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // ✅ unwrap params promise with React.use
  const { slug } = React.use(params);

  const project = projects.find((p) => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <main className="p-8">
      <Image
        width={1200}
        height={700}
        src={project.image}
        alt={project.title}
        style={{
          viewTransitionName: `project-${project.slug}`,
        }}
        className="rounded-lg object-cover w-full h-auto"
      />
      <h1 className="text-3xl font-bold mt-6">{project.title}</h1>
      <p className="mt-2 max-w-prose">{project.description}</p>
    </main>
  );
}
