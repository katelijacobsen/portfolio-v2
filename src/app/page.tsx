"use client";
// Import GSAP and React Hooks
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useEffect, useRef, useState } from "react";

//Icons
import { LuArrowUpRight } from "react-icons/lu";

// Components
import Image from "next/image";
import Button from "./components/Button";
import Footer from "./components/Footer";
import TechSkills from "./components/TechSkills";
import SoftSkills from "./components/SoftSkills";
import Card from "./components/Card";
import Project from "./components/Project";

// constant to create a list of images for projects
const projectImgs = [
  [
    "/img/pictures/waffles.avif",
    "/img/pictures/mug.avif",
    "/img/pictures/coffe-w-legs.avif",
  ],
  [
    "/img/pictures/Logo.avif",
    "/img/pictures/tickets.png",
    "/img/pictures/hand-w-microphone.avif",
  ],
  [
    "/img/pictures/waffles.avif",
    "/img/pictures/mug.avif",
    "/img/pictures/Logo.avif",
  ],
  [
    "/img/pictures/waffles.avif",
    "/img/pictures/greenmindMockup.avif",
    "/img/pictures/Logo.avif",
  ],
  [
    "/img/pictures/waffles.avif",
    "/img/pictures/mug.avif",
    "/img/pictures/Logo.avif",
  ],
];

const cards = [
  {
    title: "Kær Kaffebar",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "final exam",
    tags: ["UI/UX", "Illustrations", "API", "Designsystem"],
    description:
      "For the group final exam project, I was responsible for illustrations, UI/UX design, designsystem and backend development, including API endpoints and database management with Supabase. I helped create a user-friendly interface supported by effective data management.",
  },
  {
    title: "Foo Fest",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "3rd semester exam",
    tags: ["UI/UX", "A11Y", "Frontend"],
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and UI/UX",
  },
  {
    title: "Foody",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "side project",
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and a good user experience.",
  },
  {
    title: "Prototypes",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "internship",
    tags: ["CMS", "", "A11Y"],
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and a good user experience.",
  },
  {
    title: "Frontend",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "3rd semester",
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and a good user experience.",
  },
];
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  // Reference the values
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutArticleRef = useRef<HTMLElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const aboutParagraphRef = useRef<HTMLParagraphElement | null>(null);
  // State to manage hover effects on the projects
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  //Scroll Smooth
  useEffect(() => {
    let smoother: ScrollSmoother | null = null;

    if (typeof window !== "undefined") {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
      });
    }

    return () => {
      if (smoother) smoother.kill();
    };
  }, []);

  //Animation H1 with GSAP by splitting characters
  useEffect(() => {
    //"Promise"
    document.fonts.ready.then(() => {
      //Variant
      let split = SplitText.create(".text", {
        type: "chars",
      });

      gsap.from(split.chars, {
        duration: 1.8,
        y: 100,
        ease: "power4.out",
        delay: 1,
        skewY: 7,
        autoAlpha: 0,
        stagger: {
          amount: 0.3,
        },
      });
    });
  }, []);

  // Animation for 'About me' section with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.from(aboutArticleRef.current, {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
          markers: false, // Enable for debugging
        },
        width: 0,
        height: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Split H2 Animation
      if (aboutHeadingRef.current && aboutParagraphRef.current) {
        // Heading animation
        const splitHeading = new SplitText(aboutHeadingRef.current, {
          type: "words",
        });

        gsap.from(splitHeading.words, {
          scrollTrigger: {
            trigger: aboutHeadingRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
            markers: false, // Enable for debugging
          },
          opacity: 0,
          y: 20,
          stagger: 0.05,
          delay: 1.0,
          duration: 2.8,
          ease: "elastic.out(1,0.3)",
        });

        // Paragraph animation
        const splitParagraph = new SplitText(aboutParagraphRef.current, {
          type: "words",
          wordsClass: "word-item",
        });

        gsap.from(splitParagraph.words, {
          scrollTrigger: {
            trigger: aboutParagraphRef.current,
            start: "top 77%",
            toggleActions: "play none none none",
            markers: false, // Enable for debugging
          },
          opacity: 0,
          y: 20,
          delay: 1.0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => splitParagraph.revert(), // Clean up after animation
        });
      }
    }, aboutSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div className="space-y-negative mb-negative relative" id="smooth-content">
        <main className="space-y-negative">
          <section className="flex flex-col items-center content-center gap-medium mx-large">
            <header className="text-center">
              <div className="line">
                <h1 className="text">Hej I'm Katja</h1>
              </div>
              <h2 className="-tracking-widest font-header text">
                <strong className="italic font-subheader">
                  Frontend Developer
                </strong>{" "}
                & <strong className="font-subheader">UI/UX</strong>
              </h2>
            </header>
            <figure className="asset-moon asset-wheel relative">
              <Image
                src="/img/pictures/testimg.png"
                width={300}
                height={300}
                alt="Picture of the designer"
                loading="lazy"
                className="rounded-full blue-shadow relative asset-after"
              />
              <div className=" rounded-full absolute blur-overlay"></div>
            </figure>
            <Button
              variant="primary"
              text="Take a look"
              icon={<LuArrowUpRight className="w-8 h-auto" />}
            />
          </section>
          <section ref={aboutSectionRef} className="mx-large">
            <article
              ref={aboutArticleRef}
              className="bg-white lg:mx-large p-medium rounded-2xl blue-shadow"
            >
              <header>
                <h2 ref={aboutHeadingRef}>About me</h2>
              </header>
              <div className="line">
                <p
                  ref={aboutParagraphRef}
                  className="text-body-text/10 text-paragraph"
                >
                  I’m a educated multimedia designer that has strong focus on
                  creating and implementing designs. To me, it's not just about
                  aesthetics. It's about crafting solutions that are both
                  intuitive and engaging.
                </p>
              </div>
            </article>
          </section>
          <section className="mx-large relative block">
            <blockquote className="font-subheader text-center asset-moon2 asset-misc relative">
              This is the section where I'm
              <i className="italic font-bold"> supposed </i> to impress you with
              my portfolio
            </blockquote>
            <div className="grid grid-cols-4 relative">
              <div>
                <Image
                  src="/img/icons/moon3.avif"
                  width={160}
                  height={160}
                  alt="abstract flower with four pattels with blue gradient"
                  loading="lazy"
                />
              </div>
              <div>
                <Image
                  src="/img/icons/flower3.avif"
                  width={160}
                  height={160}
                  alt="abstract flower with four pattels with blue gradient"
                  loading="lazy"
                />
              </div>
              <div>
                <Image
                  src="/img/icons/misc8.avif"
                  width={160}
                  height={160}
                  alt="abstract flower with four pattels with blue gradient"
                  loading="lazy"
                />
              </div>
              <div>
                <Image
                  src="/img/icons/misc5.avif"
                  width={160}
                  height={160}
                  alt="abstract flower with four pattels with blue gradient"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
          <section className="mx-large" aria-labelledby="skills-heading">
            <header>
              <h2 id="skills-heading">Skills</h2>
            </header>
            <div className="grid grid-cols-1 gap-y-large gap-x-large lg:gap-y-medium lg:grid-cols-2 lg:grid-rows-2">
              <section>
                <h3>Technical Skills</h3>
                <TechSkills />
              </section>
              <section className="lg:col-start-2 lg:row-start-2">
                <h3 className="text-right">Soft Skills</h3>
                <SoftSkills />
              </section>
            </div>
          </section>
          <section className="mx-large relative flex flex-col"> 
            <header className="sm:sticky sm:top-0 sm:z-10 sm:p-medium sm:my-large sm:bg-white md:bg-primary sm:blue-shadow sm:rounded-2xl">
              <h2>Latest Projects</h2>
            </header>
            <ul className="hidden md:flex md:flex-col md:gap-y-medium">
              {cards.map((card, i) => (
                <Project
                  key={i}
                  title={card.title}
                  keyword={card.keyword}
                  tags={card.tags} // <-- add this
                  onHover={() => setHoveredProject(i)}
                  onLeave={() => setHoveredProject(null)}
                />
              ))}
            </ul>
            {hoveredProject !== null && (
              <div
                className="relative flex gap-2 z-50 pointer-events-none w-full h-full"
                style={{ width: '100%', height: '100%', position: 'absolute' }}
                
                
              >
                {projectImgs[hoveredProject]?.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Preview ${i + 10}`}
                    className="relative rounded object-contain transition-all duration-700 ease-out"
                    style={{
                      width: '20%',
                      height: 'auto',
                      left: i === 2 ? '20%' : i === 1 ? '30%' : '10%',
                      top: i === 2 ? '50%' : i === 1 ? '20%' : '-5%',
                      opacity: 1,
                      transform: `scale(1)`,
                      transition: 'opacity 0.5s, transform 0.5s',
                      zIndex: 10 + i,
                      // Animate in: scale/opacity on mount
                      animation: 'imgFadeIn 0.8s cubic-bezier(0.4,0,0.2,1) both',
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
                <style jsx global>{`
                  @keyframes imgFadeIn {
                    from {
                      opacity: 0;
                      transform: scale(0.8);
                    }
                    to {
                      opacity: 1;
                      transform: scale(1);
                    }
                  }
                `}</style>
              </div>
            )}
            <ul
              className="grid grid-cols-1 gap-y-large justify-items-center md:hidden"
              tabIndex={0}
              aria-label="Project Cards"
            >
              {cards.map((card, i) => (
                <div key={i} className="">
                  <Card
                    key={i}
                    title={card.title}
                    imgSrc={card.imgSrc}
                    imgAlt={card.imgAlt}
                    description={card.description}
                    rotation={i % 2 === 0 ? "-rotate-2" : "rotate-2"}
                  />
                </div>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
