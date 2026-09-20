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
  role: "UI/UX Designer & Frontend Developer",
  url: "https://katjajacobsen.dk",
  email: "katjamaehleke98@gmail.com",
  description:
    "Hi! I’m Katja Mähleke, a multimedia designer from KEA (Copenhagen School of Design and Technology) passionate about creating intuitive, accessible, and user-friendly digital experiences. I specialize in frontend development and UI/UX, blending modern technologies with strong design principles.",
  ogDescription:
    "Portfolio of Katja Mähleke – specializing in intuitive UI/UX and modern frontend development with a strong foundation in accessibility and design thinking.",
  ogTitle: "Katja Mähleke – Multimedia Designer & Frontend Developer",
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
  { label: "Instagram", href: "https://www.instagram.com", Icon: BsInstagram },
];
