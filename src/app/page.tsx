"use client";

import Button from "./components/Button";
import Image from "next/image";
import gsap from "gsap";
import ScrollReveal from "./components/ScrollReveal";
import Observer from "gsap/Observer";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { projects } from "../data/projects";
import { AnimatePresence, motion } from "motion/react";
import PixelBlast from "./components/PixelBlast";
import ProjectOverlay from "./components/ProjectOverlay"; // new component

export default function Page() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const observerRef = useRef<any>(null);
  const animatingRef = useRef(false);
  const allowScrollRef = useRef(true);
  const scrollTimeoutRef = useRef<gsap.core.Tween | null>(null);

  const addToRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // NEW: state to store the currently open project slug
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Keep router push available for other uses (not used for the overlay)
  // const router = useRouter();

  function handleOpen(slug: string) {
    // optionally use the View Transition API if you want:
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setOpenSlug(slug);
      });
    } else {
      setOpenSlug(slug);
    }
  }

  function handleClose() {
    setOpenSlug(null);
  }

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length || !containerRef.current) return;

    const time = 0.4;

    scrollTimeoutRef.current = gsap
      .delayedCall(1, () => (allowScrollRef.current = true))
      .pause();

    // set initial stacking position & z-index
    gsap.set(cards, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      y: (i) => 20 * i,
      zIndex: (i) => cards.length + i,
      transformOrigin: "center top",
    });

    // build the timeline
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    for (let i = 0; i < cards.length - 1; i++) {
      tl.add(`card${i + 20}`);

      const scaleVal = 0.85 + i * 0.03;

      // scale + blur the current card
      tl.to(cards[i], {
        scale: scaleVal,
        filter: `blur(4px)`,
        duration: time,
        ease: "expo.out",
      });

      // animate the next card in
      tl.from(
        cards[i + 1],
        {
          y: 500,
          opacity: 0,
          filter: "blur(2px)",
          duration: time,
          ease: "expo.out",
        },
        "<"
      );
    }

    // tween helper
    function tweenToLabel(direction: string | null, isScrollingDown: boolean) {
      if (!tlRef.current) return;
      const tlLocal = tlRef.current;

      if (
        (!tlLocal.nextLabel() && isScrollingDown) ||
        (!tlLocal.previousLabel() && !isScrollingDown)
      ) {
        if (observerRef.current) observerRef.current.disable();
        return;
      }

      if (!animatingRef.current && direction) {
        animatingRef.current = true;
        tlLocal.tweenTo(direction, {
          onComplete: () => {
            animatingRef.current = false;
          },
        });
      }
    }

    // Observer
    const cardsObserver = Observer.create({
      target: window,
      wheelSpeed: -100,
      tolerance: 10,
      preventDefault: true,
      onDown: () => tweenToLabel(tl.previousLabel(), false),
      onUp: () => tweenToLabel(tl.nextLabel(), true),
      onEnable(self: any) {
        allowScrollRef.current = false;
        scrollTimeoutRef.current && scrollTimeoutRef.current.restart(true);

        const savedScroll = self.scrollY ? self.scrollY() : window.scrollY;
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

    // ScrollTrigger
    const st = ScrollTrigger.create({
      id: "STOP-SCROLL",
      trigger: containerRef.current,
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

    // cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disable();
        if (typeof observerRef.current.kill === "function")
          observerRef.current.kill();
      }
      tlRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(cards);
      scrollTimeoutRef.current?.kill();
      cardsRef.current = [];
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }} // start slightly below and invisible
      animate={{ opacity: 1, y: 0 }} // fade in and slide up
      transition={{ duration: 1.4, ease: "anticipate", delay: 0.1 }}
      className="space-y-sections px-medium md:px-negative max-w-[1280px] m-auto relative py-sections overflow-hidden"
    >
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[60dvh] overflow-hidden ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 1.4 }}
          className="absolute inset-0 z-10 "
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

        <header
          id="home"
          className="relative z-10 h-full flex flex-col justify-center gap-medium lg:gap-y-10 text-gray-200 text-center"
        >
          <div className="grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto_auto] gap-y-14 mx-negative">
            <h1 className="text-split line uppercase row-start-2 col-start-2 col-end-3 self-end text-body-text">
              KATJA <br /> MÄHLEKE
            </h1>
            <div className="flex items-center justify-between col-span-3">
              <h2 className="slide-left">Frontend</h2>
              <h2 className="slide-right">UI/UX</h2>
            </div>
            <div className="flex items-center justify-between col-span-3">
              <h2 className="slide-left">2025</h2>
              <h2 className="slide-right">Portfolio</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-medium justify-center items-center relative ">
            <Button>See my work</Button>
          </div>
        </header>
      </div>

      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
      >
        Hi I’m Katja! I’m a designer with a strong passion for webdesign that
        are accessible for all types of users. My focus is to use my UI/UX
        skills to create intuitive straightforward digital experiences,
        including responsive design to ensure consistent performance across all
        devices.
      </ScrollReveal>

      <section className="">
        <Image
          width={160}
          height={160}
          src="/img/pictures/pixel-me.gif"
          alt=""
          className="mx-[75%]"
        />
      </section>

      <section>
        <div className="relative pt-sections">
          <h3 className="my-medium"> Projects </h3>
        </div>
        <article className="cards-section">
          <section
            ref={containerRef}
            className="relative min-h-[60vh] md:min-h-[60vh] w-full cards-section "
          >
            {projects.map((project, i) => (
              <div
                key={i}
                ref={(el) => addToRef(el)}
                className="absolute top-0 left-0 w-full grid grid-cols-[auto_auto_auto] grid-rows-[1fr_2fr_1fr]"
                style={{ minHeight: 150 }}
              >
                {/* Image container that won't be scaled by GSAP */}
                <div className="col-start-1 col-end-4 row-start-1 row-end-4 place-self-stretch relative z-0">
                  <button
                    onClick={() => handleOpen(project.slug)}
                    className="w-full h-full p-0 border-0 bg-transparent card-gradient"
                    aria-label={`Open ${project.title} overview`}
                  >
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      layoutId={`project-image-${project.slug}`}
                      transition={{ duration: 0.8, ease: "anticipate" }}
                      className="rounded-lg w-full h-full object-cover "
                      style={{
                        willChange: "transform, opacity",
                        transform: "translateZ(0)", // Force GPU acceleration
                      }}
                    />
                  </button>
                </div>
                <div className="col-start-1 col-end-2 row-start-3 flex items-center gap-medium px-medium">
                  <h4 className=" text-white text-2xl font-bold z-10 relative">
                    {project.title}
                  </h4>

                  <span className=" px-small rounded-md font-semibold uppercase bg-pink-50 text-pink-500 relative z-200">
                    {project.tag}
                  </span>
                </div>

                <div className="col-start-3 row-start-3 z-300 relative place-self-center p-medium">
                  <Button onClick={() => handleOpen(project.slug)}>
                    Overview
                  </Button>
                </div>
              </div>
            ))}
          </section>
        </article>
      </section>

      {/* NEW: Project Overlay - appears above everything when open */}
      <AnimatePresence mode="wait">
        {openSlug && <ProjectOverlay slug={openSlug} onClose={handleClose} />}
      </AnimatePresence>
      <section></section>
    </motion.main>
  );
}
