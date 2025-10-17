"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "../data/projects";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Observer from "gsap/Observer";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
      wheelSpeed: -15,
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
      start: "top+=-250",
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
    <main className="space-y-sections py-large px-medium md:px-negative max-w-[1280px] m-auto">
      <section className="">
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
      <section>
        <div className="relative">
          <h3 className="my-medium"> Projects </h3>
        </div>
        <article className="cards-section">
          <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden cards-section "
          >
            {projects.map((project, i) => (
              <div
                key={i}
                ref={(el) => addToRef(el)}
                className="absolute top-0 left-0 w-full grid grid-cols-[auto_auto_auto] grid-rows-3 card"
                style={{ minHeight: 150 }}
              >
                <Image
                  width={936}
                  height={536}
                  src={project.image}
                  alt={project.title}
                  style={{
                    viewTransitionName: `project-${project.slug}`,
                  }}
                  className="pointer-events-none rounded-lg col-start-1 col-end-4 row-start-1 row-end-4 object-cover place-self-stretch z-0"
                />

                <h4 className="col-start-1 row-start-2 place-self-center text-white text-2xl font-bold z-10 relative">
                  {project.title}
                </h4>

                <div className="p-medium col-start-3 row-start-3 place-self-center z-10 relative">
                  <div className="flex gap-medium">
                    <button
                      onClick={() => handleTransition(project.slug)}
                      className="bg-blue-500 py-2 px-4 rounded-full text-white border border-white"
                    >
                      Overview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </article>
      </section>
    </main>
  );
}
