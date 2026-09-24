"use client";

import { motion } from "motion/react";
import ProfileIntro from "@/components/about/ProfileIntro";
import ResumeSection from "@/components/about/ResumeSection";
import SkillsMarquee from "@/components/effects/SkillsMarquee";
import { educations } from "@/data/educations";
import { experiences } from "@/data/experiences";

/** About page. Content lives in `src/data`; layout is composed from sections. */
export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.4, ease: "anticipate", delay: 0.1 }}
      // `overflow-x-clip` keeps the cards' glow halos from adding a sideways
      // scrollbar on narrow windows (it does not create a scroll container).
      className="space-y-sections py-large px-medium md:px-negative max-w-[1440px] m-auto overflow-x-clip"
    >
      <ProfileIntro />

      <article>
        <h3>Tech &amp; design skills</h3>
        <SkillsMarquee />
      </article>

      <article aria-label="Work experience and education" className="space-y-sections">
        <ResumeSection heading="Experience" entries={experiences} />
        <ResumeSection heading="Education" entries={educations} />
      </article>
    </motion.main>
  );
}
