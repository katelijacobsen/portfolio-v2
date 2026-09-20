"use client";

import { useEffect, useState } from "react";

/** Viewport width (px) at or below which we treat the device as mobile. */
export const MOBILE_BREAKPOINT = 768;

/**
 * Tracks whether the viewport is mobile-sized.
 *
 * Starts as `false` so server and first client render agree; it flips on mount.
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const sync = () => setIsMobile(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [breakpoint]);

  return isMobile;
}
