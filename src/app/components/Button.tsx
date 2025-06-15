"use client";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  icon?: boolean;
  className?: string;
  variant: "primary" | "secondary";
}

const Button = ({ text, variant, icon, className }: Props) => {
  let variantClass = "";

  switch (variant) {
    case "primary":
      variantClass = "";
      break;
    case "secondary":
      variantClass =
        "cursor-pointer flex items-center gap-medium bg-neutral text-button text-accent p-button rounded-full border-2 border-accent blue-shadow";
      break;
  }

  return (
    <button className="w-full sm:w-auto h-full group top-0 transition-transform duration-200 relative block uppercase cursor-pointer align-middle font-butto text-primary-1 p-button rounded-full border-primary-1 border transform-3d z-20">
      {text}
      <span className="active:translate-y-[12%] top-0 right-0 left-0 bottom-0 transition-transform duration-200 absolute inline-block w-full h-full z-80">
        <span className="absolute transition-transform duration-200 top-[25%] right-0 left-0 bottom-0 rounded-full z-50 group-hover:translate-y-1 text-primary-1 ">
          {" "}
          {text}{" "}
        </span>
        <span className="absolute transition-transform duration-200 top-0 right-0 left-0 bottom-0 bg-accent-1 border-2 border-primary-2 rounded-full z-10 group-hover:translate-y-1"></span>
      </span>
      <span className="absolute transition-transform duration-200 w-full h-full top-[20%] right-0 left-0 bottom-0 bg-accent-2 rounded-full z-0"></span>
    </button>
  );
};

export default Button;
{
  /*className={`${variantClass} ${className}`} */
}
