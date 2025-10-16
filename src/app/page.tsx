"use client";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../data/projects";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const addToRef = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

useEffect(() => {
    const cards = cardsRef.current;
    
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        {
          y: 200,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 100,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="space-y-sections py-large px-medium md:px-negative max-w-[1280px] m-auto">
      <Image width={160} height={160} src="/img/pictures/pixel-me.gif" alt="" />
      <h3>
        Hi I’m Katja! I’m a designer with a strong passion for webdesign that
        are accessible for all types of users. My focus is to use my UI/UX
        skills to create intuitive straightforward digital experiences,
        including responsive design to ensure consistent performance across all
        devices.
      </h3>
      <article>
        <h3 className="py-medium">Projects</h3>
        <section className="space-y-sections ">
          {projects.map((project, i) => (
            <div key={i} ref={addToRef} className="test grid grid-cols-3 grid-rows-3 ">
              <Image
                width={936}
                height={536}
                src={project.image}
                alt="Foo"
                className="pointer-events-none rounded-lg col-start-1 col-end-4 row-start-1 row-end-4 object-cover place-self-stretch"
              />
              <h4 className="col-start-1 row-start-1 place-self-center">
                {project.title}
              </h4>
              <div className="p-medium col-start-3 row-start-3 place-self-center">
                <div className="flex gap-medium">
                  <Link
                    href="/projects/foo-festival"
                    className="bg-blue-500 py-2 px-4 rounded-full"
                  >
                    Overview
                  </Link>
                  <Link href="">Doc</Link>
                  <Link href="">Visit</Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
