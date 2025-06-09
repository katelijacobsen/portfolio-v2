import { notFound } from "next/navigation";
import { cards } from "./../../../data/projects";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = cards.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <main>
      <h1>{project.title}</h1>
      <img src={project.imgSrc} alt={project.imgAlt} />
      <p>{project.description}</p>
    </main>
  );
}