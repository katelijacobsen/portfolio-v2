"use client";

import React, { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Layered pill styling shared by the link and button variants. */
const BASE_CLASSES =
  "relative z-100 flex items-center justify-center gap-2 py-2 px-4 font-semibold uppercase tracking-[.2ch] rounded-full cursor-pointer transition-all ease-in-out duration-200 group";

interface CommonProps {
  children?: ReactNode;
  /** Extra classes, e.g. a width utility. */
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    /** Renders an anchor instead of a button. External URLs open in a new tab. */
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** The stacked pink pill layers that give the button its depth on hover. */
function ButtonSurface({ children }: { children?: ReactNode }) {
  return (
    <>
      <span className="z-10 flex items-center gap-2 text-gray-50 transition-transform duration-200 group-hover:translate-y-1 relative">
        {children}
      </span>
      <span className="absolute inset-0 bg-pink-500 border-2 border-gray-200 rounded-full z-1 group-hover:translate-y-1 transition-transform duration-200" />
      <span className="absolute inset-0 bg-pink-700 border-2 border-gray-200 rounded-full z-0 translate-y-[25%] transition-transform duration-200" />
    </>
  );
}

/**
 * The site's single call-to-action. Renders an `<a>` when given an `href` and a
 * `<button>` otherwise, so it is never a button pretending to be a link.
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ children, className, ...props }, ref) {
    if ("href" in props && props.href !== undefined) {
      const { href, ...anchorProps } = props;
      const isExternal = href.startsWith("http");

      return (
        <a
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(BASE_CLASSES, className)}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <ButtonSurface>{children}</ButtonSurface>
        </a>
      );
    }

    const { type = "button", ...buttonProps } = props as ButtonAsButton;

    return (
      <button
        {...buttonProps}
        type={type}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(BASE_CLASSES, className)}
      >
        <ButtonSurface>{children}</ButtonSurface>
      </button>
    );
  }
);

export default Button;
