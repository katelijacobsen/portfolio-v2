import Image from "next/image";
import Flag from "@/components/ui/Flag";
import InterestPill from "@/components/ui/InterestPill";
import { interests, languages } from "@/data/interests";
import { siteConfig } from "@/config/site";

/** Portrait, name and role, alongside the interests and languages panels. */
export default function ProfileIntro() {
  return (
    <article className="grid grid-cols-2 lg:grid-cols-3 grid-rows-[auto_auto] gap-medium relative mb-sections">
      <div className="relative z-100 order-1">
        <h1>About</h1>
        <h2>{siteConfig.name}</h2>
        <p>{siteConfig.role}</p>
      </div>

      <div className="wrapper relative order-2">
        <Image
          width={300}
          height={300}
          src="/img/pictures/profile-image.avif"
          alt="Profile image of Katja"
          className="w-full aspect-square object-contain p-small"
        />
        {/* Four stacked layers build the feathered blur; see globals.css. */}
        <div className="feather-blur w-full" aria-hidden="true">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>

      <div className="flex gap-medium flex-col order-3 col-span-2 lg:col-span-1 lg:col-start-3 row-start-2 lg:row-start-1 place-self-center">
        <section
          aria-labelledby="interests-heading"
          className="bg-caption space-y-medium border border-gray-600 rounded-lg p-medium"
        >
          <h3 id="interests-heading" className="headline-regular">
            Interests
          </h3>
          <ul className="flex flex-wrap gap-[.2rem] m-0 p-0 list-none">
            {interests.map((interest) => (
              <InterestPill key={interest.label} {...interest} />
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="languages-heading"
          className="bg-caption p-medium inline-flex justify-between items-center rounded-lg border border-gray-600 w-full"
        >
          <h3 id="languages-heading" className="headline-regular">
            Languages
          </h3>
          <ul className="flex gap-x-small m-0 p-0 list-none">
            {languages.map((code) => (
              <Flag key={code} countryCode={code} />
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
