import BorderGlow from "@/components/effects/BorderGlow";
import type { ResumeEntry } from "@/types";
import ResumeCard from "./ResumeCard";

interface ResumeSectionProps {
  heading: string;
  entries: ResumeEntry[];
}

/**
 * A titled list of résumé cards with a cursor-reactive glowing border.
 *
 * Both "Experience" and "Education" use this; they differ only in the data
 * passed in, which is why there is one component rather than two.
 */
export default function ResumeSection({ heading, entries }: ResumeSectionProps) {
  return (
    <section>
      <h3 className="py-medium">{heading}</h3>

      <ul aria-label={heading} className="grid grid-cols-1 gap-large list-none m-0 p-0">
        {entries.map((entry) => (
          <BorderGlow
            as="li"
            key={`${entry.company}-${entry.role}-${entry.year}`}
            className="p-6 font-light"
          >
            <ResumeCard entry={entry} />
          </BorderGlow>
        ))}
      </ul>
    </section>
  );
}
