"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/cn";

interface DisclosureProps {
  /** Always-visible toggle label. */
  summary: ReactNode;
  /** Content revealed when open. */
  children: ReactNode;
  className?: string;
}

const DURATION_MS = 350;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * An animated show/hide section built on the native `<details>` element, so it
 * keeps everything that comes with it: keyboard support, "expanded/collapsed"
 * announcements for screen readers, working without JavaScript, and browsers
 * opening it for find-in-page.
 *
 * Clicks on the summary are intercepted to slide the content open or closed
 * with the Web Animations API. A click mid-animation reverses it from where it
 * is. With `prefers-reduced-motion`, the native instant toggle is left alone.
 */
export default function Disclosure({ summary, children, className }: DisclosureProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  // Where the disclosure is heading, which leads `open` while closing: the
  // content has to stay rendered until the collapse finishes.
  const [expanded, setExpanded] = useState(false);

  useEffect(() => () => animationRef.current?.cancel(), []);

  const handleSummaryClick = (event: MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    event.preventDefault();

    const expanding = !expanded;
    // Measure before cancelling so a reversal starts from the current frame.
    const startHeight = details.open ? content.getBoundingClientRect().height : 0;
    const startOpacity = details.open ? Number(getComputedStyle(content).opacity) : 0;
    animationRef.current?.cancel();

    // Opening renders the content first so its full height can be measured.
    if (expanding) details.open = true;
    const endHeight = expanding ? content.scrollHeight : 0;

    const animation = content.animate(
      {
        height: [`${startHeight}px`, `${endHeight}px`],
        opacity: [startOpacity, expanding ? 1 : 0],
        overflow: ["hidden", "hidden"],
      },
      { duration: DURATION_MS, easing: EASING }
    );
    animation.onfinish = () => {
      animationRef.current = null;
      if (!expanding) details.open = false;
    };

    animationRef.current = animation;
    setExpanded(expanding);
  };

  return (
    <details
      ref={detailsRef}
      // Keeps the chevron in sync when the browser toggles it natively
      // (reduced motion, find-in-page).
      onToggle={(event) => {
        if (!animationRef.current) setExpanded(event.currentTarget.open);
      }}
      className={className}
    >
      <summary
        onClick={handleSummaryClick}
        className="flex w-fit items-center gap-small list-none [&::-webkit-details-marker]:hidden rounded-md py-x-small font-semibold text-gray-100 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-400"
      >
        {summary}
        <FiChevronDown
          aria-hidden
          className={cn(
            "size-5 motion-safe:transition-transform motion-safe:duration-300",
            expanded && "rotate-180"
          )}
        />
      </summary>

      {/* `flow-root` contains the children's margins, so the measured height
          matches the final layout and the animation doesn't jump at the end. */}
      <div ref={contentRef} className="flow-root">
        {children}
      </div>
    </details>
  );
}
