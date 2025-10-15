import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    // Show 404 if no project matches the slug
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-6">{project.description}</p>
      <Image
        src={project.image}
        alt={project.title}
        width={800}
        height={500}
        className="rounded-lg"
      />
    </div>
  );
}
