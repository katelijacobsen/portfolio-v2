import Image from "next/image";
import Tag from "@/components/ui/Tag";
import type { ResumeEntry } from "@/types";

interface ResumeCardProps {
  entry: ResumeEntry;
}

/**
 * Contents of one experience or education card: logo, role, organisation, the
 * period as a tag, and optional bullet points.
 *
 * Entries without `points` simply render the header — which is what makes the
 * same card work for both education and experience.
 */
export default function ResumeCard({ entry }: ResumeCardProps) {
  const { role, company, year, imgUrl, points } = entry;

  return (
    <div className="flex flex-col h-full gap-medium">
      <div className="flex items-start justify-between gap-medium">
        <div className="flex items-center gap-medium min-w-0">
          <Image
            src={imgUrl}
            alt=""
            aria-hidden
            width={56}
            height={56}
            className="rounded-full aspect-square w-14 h-14 object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h4>{role}</h4>
            <p>{company}</p>
          </div>
        </div>

        <Tag className="flex-shrink-0">{year}</Tag>
      </div>

      {points && points.length > 0 && (
        <ul className="space-y-2 flex-1 list-disc pl-5 m-0">
          {points.map((point) => (
            <li key={point} className="text-gray-200 leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
