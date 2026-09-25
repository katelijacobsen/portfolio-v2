import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
import Disclosure from "@/components/ui/Disclosure";
import Tag from "@/components/ui/Tag";
import type { Recommendation } from "@/types";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

/** "July 2025". UTC so the month never shifts with the visitor's time zone. */
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * One recommendation: the referee's role, a short highlight quote, and the full
 * letter behind an animated disclosure.
 */
export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { id, title, organisation, relationship, date, imgUrl, highlight, letter } =
    recommendation;
  const headingId = `recommendation-${id}`;

  return (
    <article aria-labelledby={headingId} className="flex flex-col gap-medium">
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
            <h4 id={headingId}>{title}</h4>
            <p>{organisation}</p>
          </div>
        </div>

        <Tag className="flex-shrink-0">
          <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
        </Tag>
      </div>

      <Tag>{relationship}</Tag>

      <blockquote className="relative pl-10 text-xl leading-snug font-light text-gray-100">
        <RiDoubleQuotesL aria-hidden className="absolute left-0 top-0 size-7 text-pink-400" />
        {highlight}
      </blockquote>

      <Disclosure summary="Read full letter">
        <blockquote className="mt-medium space-y-medium border-l-2 border-gray-600 pl-medium">
          {letter.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </blockquote>
      </Disclosure>
    </article>
  );
}
