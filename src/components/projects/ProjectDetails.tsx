import Image from "next/image";
import { FaFigma } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import type { Project } from "@/types";

interface ProjectDetailsProps {
  project: Project;
  /** Heading level for the project title, so the page outline stays correct. */
  titleAs?: "h1" | "h3";
}

/**
 * The written body of a project: title, links, and whichever of the
 * overview/process/mockups/results sections have been filled in.
 *
 * Shared by the overlay on the home page and the standalone
 * `/projects/[slug]` route, so the two can never drift apart.
 */
export default function ProjectDetails({
  project,
  titleAs: Title = "h3",
}: ProjectDetailsProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-medium">
        <div className="flex items-center gap-small">
          <Title className="text-2xl font-bold">{project.title}</Title>
          <Tag className="bg-pink-50 text-pink-500 uppercase font-semibold">
            {project.tag}
          </Tag>
        </div>

        <div className="flex gap-4 text-xl relative">
          {project.figmaLink && (
            <Button href={project.figmaLink} aria-label={`Open ${project.title} in Figma`}>
              <FaFigma />
            </Button>
          )}
          {project.site && (
            <Button href={project.site} aria-label={`Visit the ${project.title} site`}>
              <FiExternalLink />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-medium">
        <ProjectSection heading="Overview" body={project.overview} />
        <ProjectSection heading="Process" body={project.process} />

        {project.mockups && project.mockups.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-medium py-large">
            {project.mockups.map((mockup) => (
              <Image
                key={mockup.src}
                src={mockup.src}
                alt={mockup.alt}
                width={1200}
                height={1200}
                loading="lazy"
                className="w-full h-full rounded-lg"
              />
            ))}
          </div>
        )}

        <ProjectSection heading="The results" body={project.results} />
      </div>
    </>
  );
}

/** Renders one titled block, or nothing when the copy has not been written. */
function ProjectSection({ heading, body }: { heading: string; body?: string }) {
  if (!body) return null;

  return (
    <>
      <h2 className="mt-large">{heading}</h2>
      <p className="mt-small">{body}</p>
    </>
  );
}
