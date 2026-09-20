"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCopyToClipboard {
  /** True for `resetAfterMs` following a successful copy. */
  copied: boolean;
  copy: (value: string) => Promise<void>;
}

/**
 * Copies text to the clipboard and exposes a short-lived `copied` flag for UI
 * feedback. Falls back to a hidden textarea on browsers without the async
 * Clipboard API.
 */
export function useCopyToClipboard(resetAfterMs = 1500): UseCopyToClipboard {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    async (value: string) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          copyViaTextarea(value);
        }

        setCopied(true);
        if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setCopied(false);
          timeoutRef.current = null;
        }, resetAfterMs);
      } catch (error) {
        console.error("Copy failed", error);
      }
    },
    [resetAfterMs]
  );

  return { copied, copy };
}

/** Legacy fallback for browsers without `navigator.clipboard`. */
function copyViaTextarea(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  // Keep it off-screen so focusing it does not scroll the page.
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
