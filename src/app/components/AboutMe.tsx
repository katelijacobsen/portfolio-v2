import Image from "next/image";
import React from "react";
import FloatingBrick from "./FloatingBrick";
import { FiArrowUpRight } from "react-icons/fi";
import { useRef, useEffect } from "react";

//GSAP
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxes = bentoRef.current?.querySelectorAll(".bento-box");

    if (boxes) {
      gsap.from(boxes, {
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 2,
        ease: "elastic.out(1,0.9)",
        y: 100,
        stagger: 0.1,
      });
    }
  }, []);

  return (
    <article
      ref={bentoRef}
      className="z-90 flex flex-col relative gap-medium  p-10 rounded-3xl lg:grid lg:grid-cols-7 lg:grid-rows-[auto_12rem_18rem] lg:px-negative"
    >
      <section className="bento-box flex lg:hidden absolute -my-50 right-10 z-90">
        <Image
          width={512}
          height={512}
          src="/img/pictures/portrait.avif"
          alt=""
          loading="lazy"
          className="rounded-full border-4 border-primary-2 brown-shadow w-[240px] h-auto lg:h-full object-cover"
        />
      </section>

      <section className="bento-box lg:col-start-1 lg:col-end-3 lg:h-full hidden lg:flex">
        <Image
          width={512}
          height={512}
          src="/img/pictures/portrait.avif"
          alt=""
          loading="lazy"
          className="rounded-2xl border-4 border-primary-2 brown-shadow w-full h-auto lg:h-full object-cover"
        />
      </section>

      <section className="bento-box lg:col-start-3 lg:col-span-full lg:row-start-1 bg-primary-1 p-medium brown-shadow rounded-2xl">
        <h3 className="font-subheader font-semibold tracking-wide">About me</h3>
        <p>
          Hi I’m Katja! I’m a multimedia designer with a strong passion for
          webdesign that are accessible for all types of users. My focus is to
          use my UI/UX skills to create intuitive straightforward digital
          experiences, including responsive design to ensure consistent
          performance across all devices. I also think that when tackling
          complex problems it requires to break a solution down with simplicity
          to deliver universal accessibility web solutions that connect with
          diverse users.
        </p>
      </section>

      <section className="bento-box lg:col-span-2 lg:row-start-2 hidden items-center justify-center rounded-2xl gap-medium bg-primary-1 p-medium brown-shadow">
        <Image
          width={500}
          height={500}
          src="/img/shapes/moon.png"
          alt="yellow-orange-blue gradient geometric moon"
          loading="lazy"
          className="w-full h-auto lg:h-full object-contain"
        />
      </section>

      <div className="grid grid-cols-4 grid-rows-[12rem] row-start-2 col-span-full gap-medium">
        <section className="bento-box col-span-2 items-center justify-center rounded-2xl gap-medium bg-primary-1 p-medium brown-shadow">
          <Image
            width={500}
            height={500}
            src="/img/shapes/moon.png"
            alt="yellow-orange-blue gradient geometric moon"
            loading="lazy"
            className="w-full h-full aspect-square lg:h-full object-contain"
          />
        </section>

        <a href="" className="bento-box col-start-3 col-span-full bg-primary-1 p-medium text-h3 font-header brown-shadow rounded-2xl flex flex-col justify-between text-left group">
          <FiArrowUpRight className="ms-auto w-10 h-10 text-accent-1 transition-transform duration-400 ease-out group-hover:-translate-y-2 group-hover:translate-x-2" />
          My CV
        </a>
      </div>

      <section className="bento-box lg:col-span-4 lg:row-start-3 bg-primary-1 p-medium brown-shadow rounded-2xl relative">
        <h3 className="font-subheader font-semibold tracking-wide my-2">
          Things I like to do
        </h3>
        <ul className="relative w-full sm:h-auto md:h-auto lg:h-50 max-h-full aspect-[1.7/1] md:aspect-[2/1]">
          <FloatingBrick
            text="Baking"
            bg="bg-secondary-3"
            rotate="rotate-[3deg]"
            style={{ top: "28%", left: "30%" }}
          />
          <FloatingBrick
            text="Hiking"
            bg="bg-accent-1"
            textclr="text-primary-1"
            rotate="rotate-[24deg]"
            style={{ top: "55%", left: "2%" }}
          />
          <FloatingBrick
            text="Drawing"
            bg="bg-secondary-4"
            rotate="rotate-[8deg]"
            style={{ top: "0%", left: "50%" }}
          />
          <FloatingBrick
            text="Games"
            bg="bg-secondary-1"
            rotate="rotate-[-12deg]"
            style={{ top: "60%", left: "60%" }}
          />
          <FloatingBrick
            text="DIY"
            bg="bg-secondary-2"
            textclr="text-primary-1"
            rotate="rotate-[-24deg]"
            style={{ top: "5%", left: "8%" }}
          />
        </ul>
      </section>

      <section className="bento-box lg:col-start-5 lg:col-span-full lg:row-start-3 flex items-center justify-center rounded-2xl gap-medium bg-primary-1 p-medium brown-shadow">
        <Image
          width={500}
          height={500}
          src="/img/shapes/moon.png"
          alt="yellow-orange-blue gradient geometric moon"
          loading="lazy"
          className="w-full h-auto lg:h-full object-contain"
        />
      </section>
    </article>
  );
}

export default AboutMe;
