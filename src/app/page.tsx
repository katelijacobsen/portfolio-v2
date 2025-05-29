"use client";
// Import GSAP and React Hooks
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useEffect, useRef } from "react";

//Register GSAP Plugin

//Icons
import { LuArrowUpRight } from "react-icons/lu";

// Components
import Image from "next/image";
import Button from "./components/Button";
import Skills from "./components/Skills";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {

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


  // Reference the values
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutArticleRef = useRef<HTMLElement>(null);
  const aboutHeadingRef = useRef<HTMLElement>(null);
  const aboutParagraphRef = useRef<HTMLElement>(null);

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
            markers: true, // Enable for debugging
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
            markers: true, // Enable for debugging
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
    <main className="space-y-negative mb-negative" id="smooth-wrapper">
      <div id="smooth-content" className="space-y-negative">
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
              aesthetics. It's about crafting solutions that are both intuitive
              and engaging.
            </p>
          </div>
        </article>
      </section>
      <section className="mx-large block relative">
        <blockquote className="font-subheader text-center lg:mx-negative asset-moon2 asset-misc absolute">
          "This is the section where I'm
          <i className="italic font-bold"> supposed </i> to impress you with my
          portfolio"
        </blockquote>
      </section>
      <section className="relative">
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
      </div>
    </main>
  );
}
