import BorderGlow from "@/components/effects/BorderGlow";
import type { Recommendation } from "@/types";
import RecommendationCard from "./RecommendationCard";

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

/** Recommendation letters as glowing cards, stacked like the résumé sections. */
export default function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  if (recommendations.length === 0) return null;

  return (
    <section aria-labelledby="recommendations-heading">
      <h3 id="recommendations-heading" className="py-medium">
        Recommendations
      </h3>

      <ul className="grid grid-cols-1 gap-large list-none m-0 p-0">
        {recommendations.map((recommendation) => (
          <BorderGlow as="li" key={recommendation.id} className="p-6 font-light">
            <RecommendationCard recommendation={recommendation} />
          </BorderGlow>
        ))}
      </ul>
    </section>
  );
}
