"use client";

import { MagicBento } from "@/components/effects/magic-bento";
import type { ResumeEntry } from "@/types";
import ResumeCard from "./ResumeCard";

interface ResumeSectionProps {
  heading: string;
  entries: ResumeEntry[];
}

/**
 * A titled block of résumé cards in the Magic Bento grid.
 *
 * Both "Experience" and "Education" use this; they differ only in the data
 * passed in, which is why there is one component rather than two.
 */
export default function ResumeSection({ heading, entries }: ResumeSectionProps) {
  return (
    <section>
      <h3 className="py-medium">{heading}</h3>

      <MagicBento
        items={entries}
        ariaLabel={heading}
        getKey={(entry) => `${entry.company}-${entry.role}-${entry.year}`}
        renderItem={(entry) => <ResumeCard entry={entry} />}
        enableTilt={false}
        enableMagnetism={false}
        particleCount={0}
        spotlightRadius={200}
      />
    </section>
  );
}
