"use client";
// Import GSAP and React Hooks
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
//Icons
import { FiArrowUpRight } from "react-icons/fi";

// Components
import Image from "next/image";
import Button from "./components/Button";
import TechSkills from "./components/TechSkills";
import SoftSkills from "./components/SoftSkills";
import Card from "./components/Card";
import Link from "next/link";
import FloatingBrick from "./components/FloatingBrick";
import Gradient from "./components/Gradient";
import AboutMe from "./components/AboutMe";

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
    slug: "kaer-kaffebar",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "FINAL EXAM",
    tags: ["UI/UX", "Illustrations", "API", "Designsystem"],
    description:
      "For the group final exam project, I was responsible for illustrations, UI/UX design, designsystem and backend development, including API endpoints and database management with Supabase. I helped create a user-friendly interface supported by effective data management.",
  },
  {
    title: "Internship",
    slug: "prototypes",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "RELESYS",
    tags: ["CMS", "A11Y", "UI/UX"],
    description:
      "As a Digital Designer Intern at Relesys, I contributed to diverse digital product development tasks. My role involved rapid app prototyping in Figma and applying front-end skills (CSS/HTML) for app customization. I also honed my design argumentation skills, translating brand identities into impactful app prototypes using tools like Figma.",
  },
  {
    title: "Foo Fest",
    slug: "foo-fest",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "3RD SEMESTER EXAM",
    tags: ["UI/UX", "A11Y", "Frontend", "Logo"],
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and UI/UX",
  },
  {
    title: "Frontend",
    slug: "frontend",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "3RD SEMESTER",
    tags: ["Astro", "CSS", "UI/UX"],
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and a good user experience.",
  },
  {
    title: "Ducky's Diner",
    slug: "duckys-diner",
    imgSrc: "/img/pictures/Logo.avif",
    imgAlt: "Project thumbnail",
    keyword: "2ND SEMESTER",
    tags: ["GAME DESIGN", "JAVASCRIPT", "CSS", "ANIMATION"],
    description:
      "During my first semester, I gained foundational skills in JavaScript and CSS animations, which I applied to develop 'Ducky's Diner,' a game that combines engaging gameplay with playful animation. The project also introduced me to basic game design principles, enabling me to create an interactive and entertaining experience",
  },
];
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Reference the values
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutArticleRef = useRef<HTMLElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const aboutParagraphRef = useRef<HTMLParagraphElement | null>(null);

  //Animation H1 with GSAP by splitting characters
  useEffect(() => {
    let split: any = null;
    document.fonts.ready.then(() => {
      split = SplitText.create(".text", {
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
    return () => {
      if (split && typeof split.revert === "function") split.revert();
    };
  }, []);

  // Animation for 'About me' section with GSAP
  useEffect(() => {
    let splitHeading: any = null;
    let splitParagraph: any = null;
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
        splitHeading = new SplitText(aboutHeadingRef.current, {
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
        splitParagraph = new SplitText(aboutParagraphRef.current, {
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
        });
      }
    }, aboutSectionRef);

    return () => {
      ctx.revert();
      if (splitHeading && typeof splitHeading.revert === "function")
        splitHeading.revert();
      if (splitParagraph && typeof splitParagraph.revert === "function")
        splitParagraph.revert();
    };
  }, []);

  return (
    <main className="space-y-large ">
      {/* Header Section with Grid Layout and Buttons */}

      <header className="w-auto h-[80dvh] flex flex-col justify-center md:gap-small lg:gap-medium mx-large">
        <div className="grid grid-cols-[auto_auto_auto] grid-rows-3">
          <h1 className="uppercase row-start-2 col-start-2 col-end-3 text-center self-end text-body-text">
            Por<span className="text-accent-1">t</span>fol
            <span className="text-accent-1">i</span>o
          </h1>
          <div className="flex items-center justify-center col-start-2 font-semibold">
            <h2 className="">Frontend</h2>
            <Image
              width={100}
              height={100}
              src="/img/shapes/flower.svg"
              alt="orange flower"
              className="w-8 h-8 mx-auto"
              loading="lazy"
            />
            <Image
              width={100}
              height={100}
              src="/img/shapes/flower.svg"
              alt="orange flower"
              className="w-8 h-8 mx-auto"
              loading="lazy"
            />
            <Image
              width={100}
              height={100}
              src="/img/shapes/flower.svg"
              alt="orange flower"
              className="w-8 h-8 mx-auto"
              loading="lazy"
            />
            <h2 className="">UI/UX</h2>
          </div>
          <div className="flex items-center justify-center col-start-2 font-semibold">
            <h2 className="">2025</h2>
            <Image
              width={100}
              height={100}
              src="/img/shapes/star.svg"
              alt="yellow star"
              className="w-8 h-8 mx-auto"
              loading="lazy"
            />
            <Image
              width={100}
              height={100}
              src="/img/shapes/star.svg"
              alt="yellow star"
              className="w-8 h-8 mx-auto"
              loading="lazy"
            />
            <Image
              width={100}
              height={100}
              src="/img/shapes/star.svg"
              alt="yellow star"
              className="w-8 h-8 mx-auto"
              loading="lazy"
            />
            <h2 className="">Katja Mähleke</h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-medium justify-center items-center">
          <Button text="See my work" />
          <Button
            text="Get in touch"
            bg="bg-primary-1"
            bg2="bg-primary-3"
            textclr="text-accent-1"
            borderclr="border-accent-1"
          />
        </div>
      </header>

      {/* Article Section about me */}
      <section className="relative my-negative text-body-text">
        <AboutMe />
        <Gradient
          projectId={"Rmw56LZnSfkqFxfyAcyB?"}
        />
      </section>
      <section className="mx-large">
        <h3>Project</h3>
        <ul>
          {cards.map((card, i) => (
            <Link key={i} href={`/projects/${card.slug}`}>
              <Card
                key={i}
                title={card.title}
                imgSrc={card.imgSrc}
                imgAlt={card.imgAlt}
                description={card.description}
                rotation={i % 2 === 0 ? "-rotate-2" : "rotate-2"}
              />
            </Link>
          ))}
        </ul>
      </section>
      <section>
        <h3>Experience</h3>
        <Image
          width={500}
          height={500}
          src="/img/pictures/portrait.avif"
          alt=""
          loading="lazy"
        />
      </section>
      <section>{/* Add Coding Animation Here */}</section>
      <section>
        <h2 className="font-header text-h2 text-center text-body-text">
          {" "}
          Thank you for your time
        </h2>
      </section>
    </main>
  );
}
