/**
 * Single source of truth for everything that describes the site itself:
 * copy, URLs, navigation and social profiles.
 *
 * Adding a page = adding one entry to `navLinks`.
 * Adding a social profile = adding one entry to `socialLinks`.
 */
import type { IconType } from "react-icons";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaCodepen } from "react-icons/fa";

export const siteConfig = {
  name: "Katja Mähleke",
  role: "Web Developer Student",
  url: "https://katjajacobsen.dk",
  email: "katjamaehleke98@gmail.com",
  description:
    "Hi — I'm Katja, a web developer who likes to understand how things work all the way through. Knowing how data flows from the backend to the screen lets me build applications that are fast, reliable and accessible to everyone, not just nice on the surface. Explaining that to others as a teaching assistant has only made me better at it",
  ogDescription:
    "Portfolio of Katja Mähleke – specializing in web development with a strong focus on maintainability and accessibility, from the backend to the screen",
  ogTitle: "Katja Mähleke – Full-stack Developer & Multimedia Designer",
  keywords: [
    "Katja Mähleke",
    "Multimedia Designer",
    "Frontend Developer",
    "UI/UX Designer",
    "Accessible Web Design",
    "KEA Copenhagen",
    "Digital Design Portfolio",
    "React",
    "Next.js",
    "Full-stack",
    "Web Development",
    "Backend Developer",
    "Web Student"
  ],
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export interface SocialLink {
  label: string;
  href: string;
  Icon: IconType;
}

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/katelijacobsen", Icon: BsGithub },
  { label: "Codepen", href: "https://codepen.io/Katja-M-hleke", Icon: FaCodepen },
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: BsLinkedin },
];
