"use client";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  icon?: boolean;
  bg?: string;
  bg2?: string;
  borderclr?: string;
  textclr?: string;
  w?: string;
  fadeIn?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  text,
  bg = "bg-accent-1",
  bg2 = "bg-accent-2",
  borderclr = "border-primary-1",
  textclr = "text-primary-1",
  w = "w-full",
  onClick,
  fadeIn
}: Props) {
  return (
    <button onClick={onClick} 
      className={`${w}  ${fadeIn} transition-all ease-in-out sm:w-auto h-full font-semibold tracking-[.2ch] group top-0 duration-200 relative block uppercase cursor-pointer align-middle font-butto p-button rounded-full transform-3d z-20`}
    >
      {text}
      <span className="active:translate-y-[10%] top-0 right-0 left-0 bottom-0 transition-transform duration-200 absolute inline-block w-full h-full z-80">
        <span
          className={`absolute transition-all duration-200 top-[20%] right-0 left-0 bottom-0 rounded-full z-50 group-hover:translate-y-1 ${textclr} `}
        >
          {" "}
          {text}{" "}
        </span>
        <span
          className={`absolute transition-all duration-200 top-0 right-0 left-0 bottom-0 ${bg} border-2 ${borderclr} rounded-full z-10 group-hover:translate-y-1`}
        ></span>
      </span>
      <span
        className={` absolute transition-all duration-200 w-full h-full top-[20%] right-0 left-0 bottom-0 ${bg2} border-2 ${borderclr} rounded-full z-0`}
      ></span>
    </button>
  );
}

export default Button;
