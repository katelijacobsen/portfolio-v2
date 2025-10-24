// app/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Observer from "gsap/Observer";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";

// Local components & data
import Button from "./components/Button";
import ScrollReveal from "./components/ScrollReveal";
import PixelBlast from "./components/PixelBlast";
import ProjectOverlay from "./components/ProjectOverlay";
import { projects } from "../data/projects";

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger, Observer);

export default function Page() {
  /* ---------------------------
     Refs & constants
     --------------------------- */
  // allow any HTMLElement so li/figure/div refs work with GSAP
  const cardsRef = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const observerRef = useRef<any>(null);
  const animatingRef = useRef(false);
  const allowScrollRef = useRef(true);
  const scrollTimeoutRef = useRef<gsap.core.Tween | null>(null);

  const TIMELINE_STEP = 0.4;
  const SCROLL_DISABLE_DELAY = 1; // seconds

  /* ---------------------------
     Helpers
     --------------------------- */
  const addToRef = (el: HTMLElement | null) => {
    if (!el) return;
    if (!cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  /* ---------------------------
     Overlay state & accessibility helpers
     --------------------------- */
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const isOverlayOpen = Boolean(openSlug);

  const openProject = (slug: string) => {
    // Use View Transition API when available for a smoother transition
    if ((document as any).startViewTransition) {
      (document as any).startViewTransition(() => setOpenSlug(slug));
    } else {
      setOpenSlug(slug);
    }
  };

  const closeProject = () => setOpenSlug(null);

  // When overlay opens, add 'overflow: hidden' to body to prevent background scroll
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  /* ---------------------------
     GSAP setup: stacking, timeline, observer, scrollTrigger
     --------------------------- */
  useEffect(() => {
    const cards = cardsRef.current;
    const container = containerRef.current;

    if (!cards.length || !container) return;

    // small delayed call used to control scroll re-enable
    scrollTimeoutRef.current = gsap
      .delayedCall(SCROLL_DISABLE_DELAY, () => {
        allowScrollRef.current = true;
      })
      .pause();

    // initial stacking/positioning for cards
    gsap.set(cards, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      y: (i: number) => 20 * i,
      zIndex: (i: number) => cards.length + i,
      transformOrigin: "center top",
    });

    // timeline
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    for (let i = 0; i < cards.length - 1; i++) {
      const label = `card-${i}`;
      tl.add(label);

      const scaleVal = 0.85 + i * 0.03;

      // blur & scale current
      tl.to(
        cards[i],
        {
          scale: scaleVal,
          filter: "blur(4px)",
          duration: TIMELINE_STEP,
          ease: "expo.out",
        },
        label
      );

      // bring next card in
      tl.from(
        cards[i + 1],
        {
          y: 500,
          opacity: 0,
          filter: "blur(2px)",
          duration: TIMELINE_STEP,
          ease: "expo.out",
        },
        "<"
      );
    }

    // helper to tween timeline to a label
    function tweenToLabel(label: string | null, isScrollingDown: boolean) {
      const timeline = tlRef.current;
      if (!timeline) return;

      const hasNext = !!timeline.nextLabel();
      const hasPrev = !!timeline.previousLabel();

      // if we're at the ends, disable observer and bail
      if ((isScrollingDown && !hasNext) || (!isScrollingDown && !hasPrev)) {
        observerRef.current?.disable();
        return;
      }

      if (!animatingRef.current && label) {
        animatingRef.current = true;
        timeline.tweenTo(label, {
          onComplete: () => {
            animatingRef.current = false;
          },
        });
      }
    }

    // create Observer (wheel/touch)
    const cardsObserver = Observer.create({
      target: window,
      wheelSpeed: -300,
      tolerance: 30,
      preventDefault: true,
      onDown: () => tweenToLabel(tl.previousLabel(), false),
      onUp: () => tweenToLabel(tl.nextLabel(), true),
      onEnable(self: any) {
        allowScrollRef.current = false;
        scrollTimeoutRef.current?.restart(true);

        const savedScroll = self.scrollY ? self.scrollY() : window.scrollY;
        // restore scroll while observer is active so page doesn't jump
        self._restoreScroll = () => {
          if (self.scrollY) self.scrollY(savedScroll);
          else window.scrollTo(0, savedScroll);
        };
        document.addEventListener("scroll", self._restoreScroll, {
          passive: false,
        });
      },
      onDisable(self: any) {
        document.removeEventListener("scroll", self._restoreScroll);
      },
    });

    observerRef.current = cardsObserver;
    cardsObserver.disable();

    // pin container and enable observer when inside
    const st = ScrollTrigger.create({
      id: "cards-pin",
      trigger: container,
      pin: true,
      start: "top 30%",
      end: "+=",
      markers: false,
      onEnter: () => {
        if (!cardsObserver.isEnabled) cardsObserver.enable();
      },
      onEnterBack: () => {
        if (!cardsObserver.isEnabled) cardsObserver.enable();
      },
    });

    // cleanup on unmount
    return () => {
      try {
        observerRef.current?.disable();
        if (typeof observerRef.current?.kill === "function")
          observerRef.current.kill();
      } catch {
        /* ignore */
      }

      tlRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(cards);
      scrollTimeoutRef.current?.kill();
      cardsRef.current = [];
      st.kill();
    };
  }, []);

  /* ---------------------------
     Render (semantic + accessible)
     --------------------------- */
  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: "anticipate", delay: 0.1 }}
      className="space-y-sections px-medium md:px-negative max-w-[1280px] m-auto relative py-sections overflow-hidden"
      aria-live="polite"
    >
      {/* Skip link for keyboard users */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only" // keep visually hidden but visible on focus (assumes tailwind sr-only)
      >
        Skip to projects
      </a>

      {/* When overlay is open, mark the main content as hidden for screen readers */}
      <div>
        {/* Hero / Pixel background */}
        <header className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[60dvh] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, delay: 1.4 }}
            className="absolute inset-0 z-10 w-full h-full"
            aria-hidden="true"
            style={{ width: '100%', height: '600px', position: 'relative' }}
          >
            <PixelBlast
              variant="diamond"
              pixelSize={4}
              color="#1345B1"
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid
              liquidStrength={0.12}
              liquidRadius={0}
              liquidWobbleSpeed={0}
              speed={0.6}
              edgeFade={0.25}
              transparent
            />
          </motion.div>

          <div className="absolute z-10 h-full w-full px-negative flex flex-col justify-center gap-medium lg:gap-y-10 text-gray-200 text-center">
            <div className="grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto_auto] gap-y-14 mx-negative">
              <h1 className="text-split line uppercase row-start-2 col-start-2 col-end-3 self-end text-body-text">
                KATJA <br /> MÄHLEKE
              </h1>

              {/* Subheadings describing skills/role */}
              <div
                className="flex items-center justify-between col-span-3"
                aria-hidden="false"
              >
                <p className="slide-left" aria-label="Role: Frontend">
                  Frontend
                </p>
                <p className="slide-right" aria-label="Discipline: UI and UX">
                  UI/UX
                </p>
              </div>

              <div className="flex items-center justify-between col-span-3">
                <p className="slide-left" aria-label="Year">
                  2025
                </p>
                <p className="slide-right" aria-label="Type">
                  Portfolio
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-medium justify-center items-center relative">
              {/* Consider giving this button an href for real navigation; left as action button */}
              <Button
                aria-label="Jump to projects"
                onClick={() => document.getElementById("projects")?.focus()}
              >
                See my work
              </Button>
            </div>
          </div>
        </header>

        {/* Intro */}
        <section
          id="intro"
          aria-labelledby="intro-heading"
          className="pt-sections"
        >
          <ScrollReveal
            baseOpacity={0}
            enableBlur
            baseRotation={5}
            blurStrength={10}
          >
            Hi — I’m Katja! I’m a designer with a strong passion for web design
            that is accessible to all users. I focus on using my UI/UX skills to
            create intuitive, straightforward digital experiences, including
            responsive design to ensure consistent performance across devices.
          </ScrollReveal>

          <div aria-hidden="false" className="mt-medium">
            <figure>
              <Image
                width={160}
                height={160}
                src="/img/pictures/pixel-me.gif"
                alt="Animated pixel portrait of Katja"
                className="mx-[75%]"
                unoptimized
              />
              <figcaption className="sr-only">
                Katja's pixel portrait
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="pt-sections"
        >
          <h2 id="projects-heading" className="my-medium">
            Projects
          </h2>

          <article className="cards-section" aria-label="Projects carousel">
            {/* container pinned and observed by GSAP */}
            <section
              ref={containerRef}
              className="relative min-h-[60vh] md:min-h-[60vh] w-full cards-section"
            >
              {/* Use a list for better semantics */}
              <ul className="m-0 p-0 list-none">
                {projects.map((project) => (
                  <li
                    key={project.slug}
                    ref={(el) => addToRef(el as HTMLElement)}
                    // each card is absolutely positioned by GSAP
                    className="absolute top-0 left-0 w-full grid grid-cols-3 grid-rows-3"
                    style={{ minHeight: 150 }}
                  >
                    {/* Image container (non-scaled area) */}
                    <figure className="col-start-1 col-end-4 row-start-1 row-end-4 place-self-stretch relative z-0">
                      {/* The button maintains native keyboard interactivity */}
                      <button
                        onClick={() => openProject(project.slug)}
                        className="w-full h-full p-0 border-0 card-gradient"
                        aria-label={`Open ${project.title} overview`}
                        aria-controls={`project-overlay-${project.slug}`}
                        aria-expanded={openSlug === project.slug}
                      >
                        <motion.img
                          src={project.image}
                          alt={`${project.title} — ${project.tag}`}
                          layoutId={`project-image-${project.slug}`}
                          transition={{ duration: 0.8, ease: "anticipate" }}
                          className="rounded-lg w-full h-full object-cover"
                          style={{
                            willChange: "transform, opacity",
                            transform: "translateZ(0)", // Force GPU acceleration
                          }}
                        />
                      </button>

                      <figcaption className="sr-only">
                        {project.title}, {project.tag}
                      </figcaption>
                    </figure>

                    <div className="col-start-1 col-end-3 md:col-start-1 row-start-3 flex items-center gap-medium px-medium md:px-14 ">
                      <h3 className="text-white font-bold z-10 relative">
                        {project.title}
                      </h3>
                    </div>

                    {/* Overview action */}
                    <div className="col-start-3 row-start-3 z-300 relative place-self-center p-medium">
                      <Button
                        onClick={() => openProject(project.slug)}
                        aria-controls={`project-overlay-${project.slug}`}
                        aria-expanded={openSlug === project.slug}
                      >
                        Overview
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </section>
      </div>

      {/* Project overlay (portal-like). When open, it should manage focus internally.
          We pass an id so the open button's aria-controls points to this overlay. */}
      <AnimatePresence mode="wait">
        {openSlug && (
          <ProjectOverlay
            id={`project-overlay-${openSlug}`}
            slug={openSlug}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
