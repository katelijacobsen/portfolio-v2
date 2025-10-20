"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  href?: string;
  text?: string;
  children?: ReactNode;
  w?: string;
  fadeIn?: string;
  ariaLabel?: string;
}

function Button({ text, href = "#", children, w = "w-auto", fadeIn, ariaLabel }: Props) {
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <span
        className="
          z-10 flex items-center gap-2 text-gray-50 
          transition-transform duration-200 
          group-hover:translate-y-1
        "
      >
        {children}
        {text && <span>{text}</span>}
      </span>

      <span
        className="
          absolute inset-0 bg-pink-500 border-2 border-gray-200 rounded-full 
          z-0 group-hover:translate-y-1
          transition-transform duration-200
        "
      ></span>

      <span
        className="
          absolute inset-0 bg-pink-700 border-2 border-gray-200 rounded-full -z-10
          translate-y-[25%] 
          transition-transform duration-200
        "
      ></span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex items-center justify-center gap-2 py-2 px-4 font-semibold uppercase tracking-[.2ch] rounded-full cursor-pointer transition-all ease-in-out duration-200 group ${w} ${fadeIn}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  // internal link
  return (
    <Link
      href={href}
      className={`relative flex items-center justify-center gap-2 py-2 px-4 font-semibold uppercase tracking-[.2ch] rounded-full cursor-pointer transition-all ease-in-out duration-200 group ${w} ${fadeIn}`}
      aria-label={ariaLabel}
    >
      {content}
    </Link>
  );
}

export default Button;
