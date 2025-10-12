import Flag from "./components/Flag";
import Interest from "./components/Interest";
import Experience from "./components/Experience";
import Education from "./components/Education";
import SkillIcon from "./components/skillIcon";
import Marquee from "./components/Marquee";

export default function Page() {
  return (
    <main>
      <article className="grid grid-cols-2 gap-medium relative mb-sections">
        <div className="relative z-100">
          <h1>About</h1>
          <h2 className="text-h2">Katja Mähleke</h2>
          <p>UI/UX Designer & Frontend Developer</p>
        </div>
        <div className="wrapper col-start-2 relative">
          <img
            src="/img/pictures/profile-image.png"
            alt="Profile image of Katja"
            className="w-full h-full object-cover p-4"
          />
          <div className="feather-blur col-start-2 w-full">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </article>
      <div className="space-y-sections">
        <article className="space-y-medium">
          <section className="bg-caption p-medium  flex justify-between items-center rounded-lg border border-gray-600">
            <h3 className="headline-regular">Languages</h3>
            <ul className="flex gap-x-small">
              <Flag countryFlag="dk" />
              <Flag countryFlag="de" />
              <Flag countryFlag="gb" />
            </ul>
          </section>
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
        </article>
        <article>
          <h3>Experience</h3>
          <ul className="grid grid-cols-1 gap-medium md:grid-cols-2">
            <Experience
              imgUrl="/img/company/relesys.png"
              role="Digital Designer"
              company="Relesys A/S"
              year="2025"
              description="Description"
            />
            <Experience
              imgUrl="/img/company/IKEA.png"
              role="Sales Assosciate"
              company="IKEA"
              year="2023-2025"
              description="Description"
            />
            <Experience
              imgUrl="/img/company/IKEA.png"
              role="Returns & Claims Associate"
              company="IKEA"
              year="2021-2023"
              description="Description"
            />
            <Experience
              imgUrl="/img/company/redbarnetungdom.png"
              role="Tutor"
              company="Red Barnet Ungdom"
              year="2025"
              description="Description"
            />
          </ul>
        </article>
        <article>
          <h3>Education</h3>
          <ul className="grid grid-cols-1 gap-medium md:grid-cols-2">
            <Education
              imgUrl="/img/company/ek.png"
              role="Web Development"
              company="Professional Bachelor Degree"
              year="2026-2027"
            />
            <Education
              imgUrl="/img/company/ek.png"
              role="Multimedia Design"
              company="Academic Professional Degree"
              year="2023-2025"
            />
            <Education
              imgUrl="/img/company/krabbesholm.png"
              role="Architecture"
              company="Program"
              year="2020"
            />
            <Education
              imgUrl="/img/company/kvuc.png"
              role="Psychology"
              company="High School Diploma"
              year="2019-2021"
            />
          </ul>
        </article>
        <article className="grid grid-cols-2 grid-rows-2 gap-medium">
          <section className="bg-caption p-medium flex flex-col gap-medium rounded-lg border border-gray-600 col-start-1 col-end-3">
            <h3 className="headline-regular">Tech</h3>
            <Marquee />
          </section>
          <section className="bg-caption p-medium rounded-lg border border-gray-600">
            <h3 className="headline-regular">Video editing</h3>
            <ul className="flex flex-row gap-small">
              <SkillIcon iconSrc="/img/icons/ae.svg" altText="After Effects" />
              <SkillIcon iconSrc="/img/icons/pr.svg" altText="Premiere Pro" />
            </ul>
          </section>
          <section className="bg-caption p-medium rounded-lg border border-gray-600">
            <h3 className="headline-regular">Design tools</h3>
            <ul className="flex flex-row gap-small">
              <SkillIcon iconSrc="/img/icons/figma.svg" altText="Figma" />
              <SkillIcon
                iconSrc="/img/icons/ai.svg"
                altText="Adobe Illustrator"
              />
              <SkillIcon iconSrc="/img/icons/lr.svg" altText="Lightroom" />
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
