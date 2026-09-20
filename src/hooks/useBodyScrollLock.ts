"use client";

import { useEffect } from "react";

/**
 * Freezes page scrolling while `locked` is true and restores the scroll
 * position on unlock, so opening a dialog never loses the reader's place.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
