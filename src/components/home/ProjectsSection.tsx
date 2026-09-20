import ProjectCardStack from "@/components/projects/ProjectCardStack";

interface ProjectsSectionProps {
  id: string;
}

/** Projects heading plus the scroll-driven card deck. */
export default function ProjectsSection({ id }: ProjectsSectionProps) {
  return (
    <section id={id} aria-labelledby="projects-heading" className="pt-sections">
      <h2 id="projects-heading" className="my-medium">
        Projects
      </h2>

      <ProjectCardStack />
    </section>
  );
}
