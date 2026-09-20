"use client";

import { motion } from "motion/react";
import { HeroSection, IntroSection, ProjectsSection } from "@/components/home";

const PROJECTS_ANCHOR = "projects";

/** Home page. Each section owns its own markup, data and animation. */
export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: "anticipate", delay: 0.1 }}
      className="space-y-sections px-medium md:px-negative max-w-[1280px] m-auto relative py-sections overflow-hidden z-0"
    >
      <a href={`#${PROJECTS_ANCHOR}`} className="sr-only focus:not-sr-only">
        Skip to projects
      </a>

      <HeroSection scrollTargetId={PROJECTS_ANCHOR} />
      <IntroSection />
      <ProjectsSection id={PROJECTS_ANCHOR} />
    </motion.main>
  );
}
