/** A tool or technology shown in the skills marquee. */
export interface Skill {
  src: string;
  /** Full name — also used as the tooltip label and image alt text. */
  name: string;
  /** How long it has been used, shown in the hover tooltip. */
  experience: string;
}

export const skills: Skill[] = [
  { src: "/img/icons/react.svg", name: "React", experience: "1.5 year" },
  { src: "/img/icons/nextjs.svg", name: "Next.js", experience: "1 year" },
  { src: "/img/icons/typescript.svg", name: "TypeScript", experience: "1 year" },
  { src: "/img/icons/tailwind.svg", name: "Tailwind CSS", experience: "2 years" },
  { src: "/img/icons/astro.svg", name: "Astro", experience: "2 years" },
  { src: "/img/icons/gsap.svg", name: "GreenSock Animation Platform", experience: "1.5 year" },
  { src: "/img/icons/figma.svg", name: "Figma", experience: "2.5 years" },
  { src: "/img/icons/git.svg", name: "Git", experience: "2 years" },
  { src: "/img/icons/mysql.svg", name: "MySQL", experience: "1 year" },
  { src: "/img/icons/python.svg", name: "Python", experience: "1 year" },
  { src: "/img/icons/docker.svg", name: "Docker", experience: "1 year" },
  { src: "/img/icons/neo4j.svg", name: "Neo4j", experience: "1/2 year" },
  { src: "/img/icons/arangodb.svg", name: "ArangoDB", experience: "1/2 year" },
];
