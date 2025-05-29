"use client";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  variant: "primary" | "secondary";
  icon?: ReactNode;
  className?: string;
}

const Button = ({ text, variant, icon, className }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.from(buttonRef.current, {
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 60%",
        toggleActions: "play none none none",
        markers: false,
      },
      width: 0,
      opacity: 0,
      delay: 2,
      duration: 0.8,
      ease: "power4.out",
    });

    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 60%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      delay: 2.6,
      duration: 0.6,
    });

    gsap.from(iconRef.current, {
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 60%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      delay: 2.8,
      duration: 0.6,
    });
  }, []);

  let variantClass = "";

  switch (variant) {
    case "primary":
      variantClass =
        "flex items-center justify-center gap-medium w-full md:w-[15rem] h-[4rem] bg-[linear-gradient(244deg,_#2854E3_13.87%,_#96ABEE_175.35%)] text-primary text-button p-button rounded-full blue-shadow";
      break;
    case "secondary":
      variantClass =
        "flex items-center gap-medium bg-neutral text-button text-accent p-button rounded-full border-2 border-accent blue-shadow";
      break;
  }

  return (
    <button ref={buttonRef} className={`${variantClass} ${className} relative z-10`}>
      <span ref={textRef}>{text}</span>
      <span ref={iconRef}>{icon}</span>
    </button>
  );
};

export default Button;
