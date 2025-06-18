"use client";
// Import GSAP and React Hooks
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

// Components
import Image from "next/image";
import Button from "./components/Button";
import TechSkills from "./components/TechSkills";
import SoftSkills from "./components/SoftSkills";
import Card from "./components/Card";
import Link from "next/link";
import Gradient from "./components/Gradient";
import AboutMe from "./components/AboutMe";

const cards = [
  {
    title: "Kær Kaffebar",
    slug: "kaer-kaffebar",
    imgSrc: "/img/pictures/kaer-kaffebar.avif",
    imgAlt: "Project thumbnail",
    keyword: "FINAL EXAM",
    tags: ["UI/UX", "Illustrations", "API", "Designsystem"],
    description:
      "For the group final exam project, I was responsible for illustrations, UI/UX design, designsystem and backend development, including API endpoints and database management with Supabase. I helped create a user-friendly interface supported by effective data management.",
  },
  {
    title: "Ducky's Diner",
    slug: "duckys-diner",
    imgSrc: "/img/pictures/duckys-diner.avif",
    imgAlt: "Project thumbnail",
    keyword: "2ND SEMESTER",
    tags: ["GAME DESIGN", "JAVASCRIPT", "CSS", "ANIMATION"],
    description:
    "During my first semester, I gained foundational skills in JavaScript and CSS animations, which I applied to develop 'Ducky's Diner,' a game that combines engaging gameplay with playful animation. The project also introduced me to basic game design principles, enabling me to create an interactive and entertaining experience",
  },
  {
    title: "Foo Fest",
    slug: "foo-fest",
    imgSrc: "/img/pictures/foo-fest .avif",
    imgAlt: "Project thumbnail",
    keyword: "3RD SEMESTER EXAM",
    tags: ["UI/UX", "A11Y", "Frontend", "Logo"],
    description:
      "In a 3rd semester group project, I worked on the booking flow and made the logo. We built the website using React, Next.js, and Tailwind, with focus on accessibility and UI/UX",
  },
  {
    title: "CPH Light Festival",
    slug: "frontend",
    imgSrc: "/img/pictures/cphlf.avif",
    imgAlt: "Project thumbnail",
    keyword: "3RD SEMESTER",
    tags: ["Astro", "CSS", "UI/UX"],
    description:
      "In this 2nd semester project I redesigned the website for Copenhagen Light Festival to improve its UI/UX using a design system and the Astro framework. The goal was to create a modern, user-friendly site that better showcased their art installations and events. ",
  },
  {
    title: "First Website",
    slug: "frontend",
    imgSrc: "/img/pictures/first-website.avif",
    imgAlt: "Project thumbnail",
    keyword: "3RD SEMESTER",
    tags: ["Astro", "CSS", "UI/UX"],
    description:
      "For my first project at KEA, I built a personal website about my baking hobby. It introduced me to UX/UI basics and inspired me to learn JavaScript on my own to create a croissant quiz. I focused on user-friendly design and responsive layouts.",
  },
];
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const btnsRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  //Animation H1 with GSAP by splitting characters
  useEffect(() => {
    let split: any = null;

    // Animation for H1
    document.fonts.ready.then(() => {
      split = SplitText.create(".text-split", {
        type: "lines",
      });

      gsap.from(split.lines, {
        duration: 1.8,
        y: 400,
        ease: "power4.out",
        delay: 1.5,
        skewY: 12,
        autoAlpha: 1,
        stagger: {
          amount: 0.3,
        },
      });

      gsap.from(".slide-left", {
        x: -100,
        opacity: 0,
        duration: 2,
        ease: "power4.out",
      });

      gsap.from(".slide-right", {
        x: 100,
        opacity: 0,
        duration: 2,
        ease: "power4.out",
      });

      gsap.from(".flower-rotate", {
        x: 50,
        opacity: 0,
        rotate: -180,
        duration: 1.4,
        delay: 1.8,
        stagger: 0.25,
        ease: "power4.out",
      });

      gsap.from(".star-rotate", {
        x: -50,
        opacity: 0,
        rotate: -360,
        duration: 2,
        delay: 2.2,
        stagger: 0.25,
        ease: "power3.out",
      });

      if (btnsRef.current) {
        const buttons = btnsRef.current.querySelectorAll("button");

        gsap.to(buttons, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2.4,
          delay: 2,
          stagger: 0.25,
          ease: "power3.out",
        });
      }
    });

    if (aboutRef.current) {
      gsap.from(aboutRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "elastic.out(1,0.9)",
      });
    }

    return () => {
      if (split && typeof split.revert === "function") split.revert();
    };
  }, []);

  return (
    <main className="space-y-large ">
      {/* Header Section with Grid Layout and Buttons */}

      <header className="w-auto h-[80dvh] flex flex-col justify-center md:gap-small lg:gap-medium mx-large">
        <div className="grid grid-cols-[auto_auto_auto] grid-rows-3">
          <h1 className="text-split line uppercase row-start-2 col-start-2 col-end-3 text-center self-end text-body-text">KAT<span className="text-accent-1">J</span>A <br/> MÄH<span className="text-accent-1">L</span>EKE</h1>
          <div className="flex items-center justify-center col-start-2 font-semibold">
            <h2 className="slide-left">Frontend</h2>
            <Image
              width={100}
              height={100}
              src="/img/shapes/flower-green.svg"
              alt="orange flower"
              className="w-8 h-8 mx-auto flower-rotate"
              loading="lazy"
            />
            <Image
              width={100}
              height={100}
              src="/img/shapes/flower.svg"
              alt="orange flower"
              className="w-8 h-8 mx-auto flower-rotate"
              loading="lazy"
            />
            <Image
              width={100}
              height={100}
              src="/img/shapes/flower-pink.svg"
              alt="orange flower"
              className="w-8 h-8 mx-auto flower-rotate"
              loading="lazy"
            />
            <h2 className="slide-right">UI/UX</h2>
          </div>
          <div className="flex items-center justify-center col-start-2 font-semibold">
            <h2 className="slide-left">2025</h2>
            <Image
              width={100}
              height={100}
              src="/img/shapes/star-pink.svg"
              alt="yellow star"
              className="w-8 h-8 mx-auto star-rotate"
              loading="lazy"
            />
            <Image
              width={100}
              height={100}
              src="/img/shapes/star.svg"
              alt="yellow star"
              className="w-8 h-8 mx-auto star-rotate"
              loading="lazy"
            />
            <Image
              width={100}
              height={100}
              src="/img/shapes/star-green.svg"
              alt="yellow star"
              className="w-8 h-8 mx-auto star-rotate"
              loading="lazy"
            />
            <h2 className="slide-right">Portfolio</h2>
          </div>
        </div>
        <div
          ref={btnsRef}
          className="flex flex-col md:flex-row gap-medium justify-center items-center "
        >
          <Button text="See my work" fadeIn="fade-in" />
          <Button
            text="Get in touch"
            bg="bg-primary-1"
            bg2="bg-primary-3"
            textclr="text-accent-1"
            borderclr="border-accent-1"
            fadeIn="fade-in"
          />
        </div>
      </header>

      {/* Article Section about me */}
      <section ref={aboutRef} className="relative my-negative text-body-text">
        <AboutMe />
        <Gradient projectId={"Rmw56LZnSfkqFxfyAcyB?"} />
      </section>
      <section className="mx-large grid grid-cols-6 grid-rows-2 gap-medium">
        <section className="col-start-1 col-end-5 relative">
          <h2 className="font-header text-body-text text-h2 asset-moon">
            Tec<span className="text-accent-1">h</span>nic
            <span className="text-accent-1">a</span>l S
            <span className="text-accent-1">k</span>ill
            <span className="text-accent-1">s</span>
          </h2>
          <TechSkills />
        </section>
        <section className=" col-start-3 col-end-7 row-start-2 relative asset-wheel">
          <h2 className="font-header text-body-text text-h2 text-right ">
            Sof<span className="text-accent-1">t</span> Sk
            <span className="text-accent-1">i</span>lls
          </h2>
          <SoftSkills />
        </section>
      </section>
      <section className="mx-large text-body-text">
        <h2 className="font-header text-h2 my-medium">
          Pro<span className="text-accent-1">j</span>ect
          <span className="text-accent-1">s</span>
        </h2>
        <ul className="grid grid-cols-1  md:grid-cols-2 gap-8">
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
      <section className="mx-large grid grid-cols-4 grid-rows-[auto_auto]">
        <h2 className="font-header text-body-text text-h2 row-start-1">
          Exp<span className="text-accent-1">e</span>rie
          <span className="text-accent-1">n</span>ce
        </h2>
        <Image
          width={500}
          height={500}
          src="/img/pictures/internship.png"
          alt=""
          loading="lazy"
          className="w-1/2 h-full object-cover brown-shadow rounded-2xl grid-start-1 row-start-2 col-span-full"
        />
        <p className=" col-start-3 col-span-full bg-primary-1 p-medium brown-shadow rounded-2xl text-body-text row-start-2">
          As a Digital Designer Intern at Relesys, I contributed to diverse
          digital product development tasks. My role involved rapid app
          prototyping in Figma and applying front-end skills (CSS/HTML) for app
          customization. I also honed my design argumentation skills,
          translating brand identities into impactful app prototypes using tools
          like Figma.
        </p>
      </section>
      <section>
        <h2 className="font-header text-h2 text-center text-body-text">
          Tha<span className="text-accent-1">n</span>k y
          <span className="text-accent-1">o</span>u <br /> for{" "}
          <span className="text-accent-1">y</span>our{" "}
          <span className="text-accent-1">t</span>ime
        </h2>
      </section>
    </main>
  );
}
