"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "../data/projects";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Observer from "gsap/Observer";
import { useRef, useEffect } from "react";

import { FaFigma } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, Observer);

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

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length || !containerRef.current) return;

    const time = 0.5;

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
      tl.add(`card${i + 2}`);
      const scaleVal = 0.85 + i * 0.05;
      tl.to(cards[i], {
        scale: scaleVal,
        duration: time,
      });
      tl.from(
        cards[i + 1],
        {
          y: () => window.innerHeight,
          duration: time,
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
      wheelSpeed: -1,
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
      start: "top+=-300",
      end: "+=500",
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
    <main className="space-y-sections py-large px-medium md:px-negative max-w-[1280px] m-auto">
      <section className="h-screen">
        <Image
          width={160}
          height={160}
          src="/img/pictures/pixel-me.gif"
          alt=""
        />
        <h3>
          Hi I’m Katja! I’m a designer with a strong passion for webdesign that
          are accessible for all types of users. My focus is to use my UI/UX
          skills to create intuitive straightforward digital experiences,
          including responsive design to ensure consistent performance across
          all devices.
        </h3>
      </section>
      <article className="cards-section">
        <section
          ref={containerRef}
          className="relative h-screen overflow-hidden cards-section "
        >
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => addToRef(el)}
              className="absolute top-0 left-0 w-full grid grid-cols-[auto_auto_auto] grid-rows-3 card"
              style={{ minHeight: 250 }}
            >
              <Image
                width={936}
                height={536}
                src={project.image}
                alt={project.title}
                className="pointer-events-none rounded-lg col-start-1 col-end-4 row-start-1 row-end-4 object-cover place-self-stretch"
              />
              <h4 className="col-start-1 row-start-1 place-self-center text-white text-2xl font-bold">
                {project.title}
              </h4>
              <div className="p-medium col-start-2 row-start-3 place-self-center">
                <div className="flex gap-medium">
                  <Link
                    href="/projects/foo-festival"
                    className="bg-blue-500 py-2 px-4 rounded-full text-gray-50 border border-gray-50"
                  >
                    Overview
                  </Link>
                  <Link
                    href=""
                    className="bg-blue-50 py-2 px-4 rounded-full text-blue-500 border border-blue-500 m-auto"
                  >
                    <FaFigma />
                  </Link>
                  <Link
                    href=""
                    className="bg-blue-50 py-2 px-4 rounded-full text-blue-500 border border-blue-500 m-auto"
                  >
                    <FiExternalLink />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
