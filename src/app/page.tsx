"use client";
// Import GSAP and React Hooks
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";

//Icons
import { LuArrowUpRight } from "react-icons/lu";

// Components
import Image from "next/image";
import Button from "./components/Button";
import Skills from "./components/Skills";
import _SplitText from "gsap/SplitText";

export default function Home() {

  
  useEffect(() => {
    //Plugin
    gsap.registerPlugin(SplitText);

    //Variant
    let split = SplitText.create(".text", {
      type: "chars, words, lines" })

    gsap.from(split.chars,{
      duration: 1.8,
      y: 100,
      ease: "power4.out",
      delay: 1,
      skewY: 7,
      autoAlpha: 0,
      stagger: {
        amount: .3
      }
    })

  }, [])
  


  return (
    <main className="space-y-negative mb-negative">
      <section className="flex flex-col items-center content-center gap-medium">
        <header className="text-center">
          <div className="line">
          <h1 className="text">
            Hej I'm Katja
          </h1>
          </div>
          <h2 className="-tracking-widest font-header">
            <strong className="italic font-subheader">UI/UX</strong> &{" "}
            <strong className="font-subheader">Frontend Designer</strong>
          </h2>
        </header>
        <div className="asset-moon asset-wheel relative">
        <Image
          src="/img/pictures/testimg.png"
          width={300}
          height={300}
          alt="Picture of the designer"
          loading="lazy"
          className="rounded-full blue-shadow relative asset-after"
          />
          </div>
        <Button variant="primary" text="Take a look" icon={<LuArrowUpRight className="w-8 h-auto"/>}/>
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
