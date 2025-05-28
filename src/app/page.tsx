"use client";
// Import GSAP and React Hooks
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import Image from "next/image";
import Button from "./components/Button";
import Skills from "./components/Skills";

export default function Home() {

  return (
    <main className="space-y-negative mb-negative">
      <section className="flex flex-col items-center content-center">
        <header className="text-center">
          <h1>
            Hej I'm Katja
          </h1>
          <h2 className="-tracking-widest font-header">
            <strong className="italic font-subheader">UI/UX</strong> &{" "}
            <strong className="font-subheader">Frontend Designer</strong>
          </h2>
        </header>
        <Image
          src="/profile.png"
          width={100}
          height={100}
          alt="Picture of the designer"
        />
        <Button>Contact Me</Button>
      </section>
      <section className="lg:mx-large">
        <article className="bg-white lg:mx-large p-medium rounded-2xl blue-shadow">
          <header>
            <h2>About me</h2>
          </header>
          <p className="text-paragraph/10">
            I’m a educated multimedia designer that has strong focus on creating
            and implementing designs. To me, it's not just about aesthetics.
            It's about crafting solutions that are both intuitive and engaging.
          </p>
        </article>
      </section>
      <section className="mx-large">
        <blockquote className="font-subheader text-center lg:mx-negative">
          "This is the section where I'm{" "}
          <i className="italic font-bold">supposed</i> to impress you with my
          portfolio"
        </blockquote>
      </section>
      <section>
        <header>
          <h2>Technical skills</h2>
        </header>
        <Skills />
      </section>
      <section>
        <header>
          <h2>Creative skills</h2>
        </header>
        <Skills />
      </section>
    </main>
  );
}
