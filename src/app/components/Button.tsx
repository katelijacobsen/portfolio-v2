"use client";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text?: string;
  icon?: boolean;
  bg?: string;
  bg2?: string;
  borderclr?: string;
  textclr?: string;
  w?: string;
  fadeIn?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href: string;
  children?: React.ReactNode;
}

function Button({
  text,
  icon,
  bg = "bg-accent-1",
  bg2 = "bg-accent-2",
  borderclr = "border-primary-1",
  textclr = "text-primary-1",
  w = "w-full",
  onClick,
  href,
  children
}: Props) {
  return (
      <Link href={href} className="text-white py-small px-medium relative rounded-sm flex justify-center items-center">
        {text}{children}
      </Link>
  );
}

export default Button;
