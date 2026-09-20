/** A tool or technology shown in the skills marquee. */
export interface Skill {
  src: string;
  /** Full name — also used as the tooltip label and image alt text. */
  name: string;
  /** How long it has been used, shown in the hover tooltip. */
  experience: string;
}

export const skills: Skill[] = [
  { src: "/img/icons/html.svg", name: "Hypertext markup language", experience: "2.5 years" },
  { src: "/img/icons/css.svg", name: "Cascading Style Sheets", experience: "2.5 years" },
  { src: "/img/icons/js.svg", name: "Java Script", experience: "2.5 years" },
  { src: "/img/icons/react.svg", name: "React", experience: "1.5 year" },
  { src: "/img/icons/nextjs.svg", name: "Next.js", experience: "1 year" },
  { src: "/img/icons/tailwind.svg", name: "Tailwind CSS", experience: "2 years" },
  { src: "/img/icons/astro.svg", name: "Astro", experience: "2 years" },
  { src: "/img/icons/motion.svg", name: "motion", experience: "1.5 year" },
  { src: "/img/icons/gsap.svg", name: "GreenSock Animation Platform", experience: "1.5 year" },
  { src: "/img/icons/figma.svg", name: "Figma", experience: "2.5 years" },
  { src: "/img/icons/ai.svg", name: "Adobe Illustrator", experience: "2.5 years" },
  { src: "/img/icons/lr.svg", name: "Adobe Lightroom", experience: "1.5 years" },
  { src: "/img/icons/ae.svg", name: "Adobe After Effects", experience: "3 years" },
  { src: "/img/icons/pr.svg", name: "Adobe Premiere Pro", experience: "1.5 year" },
  { src: "/img/icons/git.svg", name: "Git", experience: "2 years" },
];
