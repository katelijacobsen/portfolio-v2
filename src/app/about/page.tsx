import Image from "next/image";
import Interest from "../components/Interest";
import Flag from "../components/Flag";
import Marquee from "../components/Marquee";
import MagicExperienceBento from "../components/MagicExperienceBento";
import MagicEducationBento from "../components/MagicEducationBento";

const experiences = [
  {
    imgUrl: "/img/company/relesys.png",
    role: "Digital Designer",
    company: "Relesys A/S",
    year: "2025",
    points: [
      "Design-system",
      "Visual Identity",
      "Wireframing",
      "Prototyping",
      "Sales Mockups",
    ],
  },
  {
    imgUrl: "/img/company/IKEA.png",
    role: "Sales Associate",
    company: "IKEA",
    year: "2023-2025",
    points: [
      "Guide customers through products",
      "Delivery assistance",
      "Improving work schedule routine",
      "Plan care and maintenance",
    ],
  },
  {
    imgUrl: "/img/company/IKEA.png",
    role: "Returns & Claims Associate",
    company: "IKEA",
    year: "2021-2023",
    points: [
      "Improving spare-parts system for colleagues",
      "Assessed items for refund, replacement or repair",
      "Provided guidance on return policies",
      "Handles customer returns and claims",
    ],
  },
  {
    imgUrl: "/img/company/redbarnetungdom.png",
    role: "Tutor",
    company: "Red Barnet Ungdom",
    year: "2025",
    points: [
      "Encouraged learning through patience, motivation and positive reinforcement with children",
      "Encouraged confidence through one-on-one tutoring",
    ],
  },
];
const educations = [
  {
    imgUrl: "/img/company/ek.png",
    role: "Web developer",
    company: "Profession bachelor degree",
    year: "2025",
  },
  {
    imgUrl: "/img/company/ek.png",
    role: "Multimedia design",
    company: "Academic profession degree",
    year: "2023-2025",
  },
  {
    imgUrl: "/img/company/krabbesholm.png",
    role: "Architecture",
    company: "Program",
    year: "2020",
  },
  {
    imgUrl: "/img/company/kvuc.png",
    role: "Psychology",
    company: "High school degree",
    year: "2021",
  },
];

export default function Page() {
  return (
    <main className="space-y-sections py-large px-medium md:px-negative max-w-[1280px] m-auto">
      <article className="grid grid-cols-2 lg:grid-cols-3 grid-rows-[auto_auto] gap-medium relative mb-sections">
        <div className="relative z-100 order-1">
          <h1>About</h1>
          <h2>Katja Mähleke</h2>
          <p>UI/UX Designer & Frontend Developer</p>
        </div>

        <div className="wrapper relative order-2">
          <Image
            width={100}
            height={100}
            src="/img/pictures/profile-image.png"
            alt="Profile image of Katja"
            className="w-full aspect-square object-contain p-4"
          />
          <div className="feather-blur w-full ">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="flex gap-medium flex-col order-3 col-span-2 lg:col-span-1 lg:col-start-3 row-start-2 lg:row-start-1">
          <section className="bg-caption space-y-medium border border-gray-600 rounded-lg p-medium">
            <h3 className="headline-regular">Interests</h3>
            <ul className="flex flex-wrap gap-small">
              <Interest
                interest="Baking"
                icon="/img/icons/baking.svg"
                borderColor="border border-orange-400"
                bg="bg-orange-900"
              />
              <Interest
                interest="Hiking"
                icon="/img/icons/hiking.svg"
                borderColor="border border-emerald-400"
                bg="bg-emerald-900"
              />
              <Interest
                interest="DIY"
                icon="/img/icons/diy.svg"
                borderColor="border border-purple-400"
                bg="bg-purple-900"
              />
              <Interest
                interest="Videogames"
                icon="/img/icons/videogames.svg"
                borderColor="border border-rose-400"
                bg="bg-rose-900"
              />
              <Interest
                interest="Coding"
                icon="/img/icons/coding.svg"
                borderColor="border border-blue-400"
                bg="bg-blue-900"
              />
              <Interest
                interest="Drawing"
                icon="/img/icons/diy.svg"
                borderColor="border border-fuchsia-400"
                bg="bg-fuchsia-900"
              />
            </ul>
          </section>

          <section className="bg-caption p-medium inline-flex justify-between items-center rounded-lg border border-gray-600 w-full">
            <h3 className="headline-regular">Languages</h3>
            <ul className="flex gap-x-small">
              <Flag countryFlag="dk" />
              <Flag countryFlag="de" />
              <Flag countryFlag="gb" />
            </ul>
          </section>
        </div>
      </article>

      <article>
        <h3> Tech & design skills</h3>
        <Marquee />
      </article>

      <article
        aria-label="work experience and education"
        className="space-y-sections"
      >
        <section>
          <h3 className="py-medium">Experience</h3>
          <MagicExperienceBento
            experiences={experiences}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={200}
            particleCount={0}
            glowColor="156, 163, 175"
          />
        </section>
        <section>
          <h3 className="py-medium">Education</h3>
          <MagicEducationBento
            educations={educations}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={200}
            particleCount={0}
            glowColor="156, 163, 175"
          />
        </section>
      </article>
    </main>
  );
}
