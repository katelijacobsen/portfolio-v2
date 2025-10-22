"use client";

import Button from "./components/Button";
import Image from "next/image";
import gsap from "gsap";
import ScrollReveal from "./components/ScrollReveal";
import Observer from "gsap/Observer";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { projects } from "../data/projects";
import { motion } from "motion/react";
import Link from "next/link";

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

  const router = useRouter();

  function handleTransition(slug: string) {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(`/projects/${slug}`);
      });
    } else {
      router.push(`/projects/${slug}`);
    }
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
      className="space-y-sections px-medium md:px-negative max-w-[1280px] m-auto relative py-sections"
    >
      <header
        id="home"
        className="w-auto h-[60dvh] flex flex-col justify-center gap-medium lg:gap-y-10"
      >
        <div className="grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto_auto] gap-y-14">
          <h1 className="text-split line uppercase row-start-2 col-start-2 col-end-3 text-center self-end text-body-text">
            KATJA <br /> MÄHLEKE
          </h1>
          <div className="flex items-center justify-between col-span-3 ">
            <h2 className="slide-left">Frontend</h2>
            <h2 className="slide-right">UI/UX</h2>
          </div>
          <div className="flex items-center justify-between col-span-3 ">
            <h2 className="slide-left">2025</h2>
            <h2 className="slide-right">Portfolio</h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-medium justify-center items-center relative">
          <Button>See my work</Button>
          <Button>Contact</Button>
        </div>
      </header>
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
        />
      </section>
      <section>
        <div className="relative pt-sections">
          <h3 className="my-medium"> Projects </h3>
        </div>
        <article className="cards-section">
          <section
            ref={containerRef}
            className="relative min-h-[60vh] md:min-h-[60vh] w-full overflow-hidden cards-section "
          >
            {projects.map((project, i) => (
              <div
                key={i}
                ref={(el) => addToRef(el)}
                className="absolute top-0 left-0 w-full grid grid-cols-[auto_auto_auto] grid-rows-[1fr_1fr_1fr] gap-y-medium"
                style={{ minHeight: 150 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="col-start-1 col-end-4 row-start-1 row-end-4 place-self-stretch object-cover relative z-0 card"
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    layoutId={`project-image-${project.slug}`}
                    transition={{ duration: 1, ease: "anticipate", delay: 0.1 }}
                    style={{
                      viewTransitionName: `project-${project.slug}`,
                    }}
                    className="pointer-events-none rounded-lg "
                  />
                </Link>

                <h4 className="col-start-2 col-span-2 row-start-2 place-self-end  pr-10 text-white text-2xl font-bold z-10 relative ">
                  {project.title}
                </h4>

                <div className="col-start-2 row-start-3 z-10 relative place-self-center">
                  <div className="flex gap-medium">
                    <Button href={`/projects/${project.slug}`}>Overview</Button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </article>
      </section>
      <section></section>
    </motion.main>
  );
}
