"use client";
// Import GSAP and React Hooks
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useEffect, useRef } from "react";

//Icons
import { LuArrowUpRight } from "react-icons/lu";

// Components
import Image from "next/image";
import Button from "./components/Button";
import Footer from "./components/Footer";
import TechSkills from "./components/TechSkills";
import SoftSkills from "./components/SoftSkills";
import Card from "./components/Card";

const cards = [
  {
    title: "Foo Fest",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and a good user experience.",
  },
  {
    title: "Foo Fest",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and a good user experience.",
  },
  {
    title: "Foo Fest",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and a good user experience.",
  },
  {
    title: "Foo Fest",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and a good user experience.",
  },
  {
    title: "Foo Fest",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
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
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const projectsHeaderRef = useRef<HTMLElement>(null);

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

  // Animation for project Cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-card").forEach((card: any) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              toggleActions: "play none none reverse",
              // markers: true, // Disable in production
            },
          }
        );
      });
    }, cardsContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div className="space-y-negative mb-negative" id="smooth-content">
        <main className="space-y-negative">
          <section className="flex flex-col items-center content-center gap-medium mx-large">
            <header className="text-center">
              <div className="line">
                <h1 className="text">Hej I'm Katja</h1>
              </div>
              <h2 className="-tracking-widest font-header text">
                <strong className="italic font-subheader">UI/UX</strong> &{" "}
                <strong className="font-subheader">Frontend Designer</strong>
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
          <section className="mx-large" aria-labelledby="projects-heading">
            <header
              ref={projectsHeaderRef}
              className="sticky top-0 z-10 py-large bg-background"
              id="projects-heading"
            >
              <h2>Latest Projects</h2>
            </header>

            <div
              ref={cardsContainerRef}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-12"
            >
              {cards.map((card, i) => (
                <Card
                  key={i}
                  title={card.title}
                  imgSrc={card.imgSrc}
                  imgAlt={card.imgAlt}
                  description={card.description}
                  className="project-card"
                  rotation={i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1"}
                />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
