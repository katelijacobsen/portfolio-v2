"use client";

import React, { useEffect, useState } from "react";
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = { children: React.ReactNode; onExitComplete?: () => void };

export default function ClientTransitions({ children, onExitComplete }: Props) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.readyState === "complete") {
      setIsReady(true);
      return;
    }
    const onLoad = () => setIsReady(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Important: the outer div is *always* rendered (so server markup matches),
  // but we hide it via inline style until isReady === true.
  // Inline style prevents flash on first paint.
  return (
    <div
      // inline style so the server output includes the hidden state on first paint
      style={{
        // hide visually and prevent interaction until ready:
        visibility: isReady ? "visible" : "hidden",
        // keep layout intact if you want: (optional) display: isReady ? undefined : "none"
      }}
    >
      <LayoutGroup>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== "undefined") window.scrollTo(0, 0);
            if (onExitComplete) onExitComplete();
          }}
        >
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            style={{ minHeight: "100vh" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
