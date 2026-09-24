"use client";

import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";

// WebGL background: browser-only, and heavy enough to keep out of the main bundle.
const PixelBlast = dynamic(() => import("@/components/effects/PixelBlast"), {
  ssr: false,
  loading: () => null,
});

/** Settings for the animated pixel background behind the title. */
const PIXEL_BLAST_SETTINGS = {
  variant: "diamond",
  pixelSize: 4,
  color: "#1345B1",
  patternScale: 3,
  patternDensity: 1.2,
  pixelSizeJitter: 0.5,
  enableRipples: true,
  rippleSpeed: 0.4,
  rippleThickness: 0.12,
  rippleIntensityScale: 1.5,
  liquid: true,
  liquidStrength: 0.12,
  liquidRadius: 0,
  liquidWobbleSpeed: 0,
  speed: 0.6,
  edgeFade: 0.55,
  transparent: true,
} as const;

interface HeroSectionProps {
  /** Anchor the "Jump to projects" button scrolls to. */
  scrollTargetId: string;
}

/** Full-bleed opening banner: name, role tags and the call to action. */
export default function HeroSection({ scrollTargetId }: HeroSectionProps) {
  const scrollToTarget = () => {
    gsap.to(window, {
      duration: 0.4,
      scrollTo: `#${scrollTargetId}`,
      ease: "power2.inOut",
    });
  };

  return (
    <header className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[60dvh] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
      </div>

      <div className="absolute z-200 h-full w-full px-negative flex flex-col justify-center gap-medium lg:gap-y-10 text-gray-200 text-center">
        <div className="grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto_auto] gap-y-14 mx-negative">
          <h1 className="text-split line uppercase row-start-2 col-start-2 col-end-3 self-end text-body-text">
            KATJA <br /> MÄHLEKE
          </h1>

          <div className="flex items-center justify-between col-span-3">
            <p className="slide-left">Full-stack</p>
            <p className="slide-right">Development</p>
          </div>

          <div className="flex items-center justify-between col-span-3">
            <p className="slide-left">2025</p>
            <p className="slide-right">Portfolio</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center relative">
          <Button onClick={scrollToTarget}>Jump to Projects</Button>
        </div>
      </div>
    </header>
  );
}
