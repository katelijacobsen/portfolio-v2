"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

//Component
import SkillIcon from "./skillIcon";

// Create list of icons for reuseability & maintainability
const iconImg = [
  { src: "/img/icons/html.svg", alt: "Hypertext markup language", exp: "2.5 years" },
  { src: "/img/icons/css.svg", alt: "Cascading Style Sheets", exp: "2.5 years" },
  { src: "/img/icons/js.svg", alt: "Java Script", exp: "2.5 years" },
  { src: "/img/icons/react.svg", alt: "React", exp: "1.5 year" },
  { src: "/img/icons/nextjs.svg", alt: "Next.js", exp: "1 year" },
  { src: "/img/icons/tailwind.svg", alt: "Tailwind CSS", exp: "2 years" },
  { src: "/img/icons/astro.svg", alt: "Astro", exp: "2 years" },
  { src: "/img/icons/motion.svg", alt: "motion", exp: "1.5 year" },
  { src: "/img/icons/gsap.svg", alt: "GreenSock Animation Platform", exp: "1.5 year" },
  { src: "/img/icons/figma.svg", alt: "Figma", exp: "2.5 years" },
  { src: "/img/icons/ai.svg", alt: "Adobe Illustrator", exp: "2.5 years" },
  { src: "/img/icons/lr.svg", alt: "Adobe Lightroom", exp: "1.5 years" },
  { src: "/img/icons/ae.svg", alt: "Adobe After Effects", exp: "3 years" },
  { src: "/img/icons/pr.svg", alt: "Adobe Premiere Pro", exp: "1.5 year" },
  { src: "/img/icons/git.svg", alt: "Git", exp: "2 years" },
];

export interface Props {
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

const Marquee: React.FC<Props> = ({
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIshovered] = useState<{ alt: string; exp: string } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // We need enough copies to fill the screen plus one extra set
  const copyIcons = [...iconImg, ...iconImg, ...iconImg];

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleIconHover = (icon: { alt: string; exp: string }) => {
    setIshovered(icon);
    if (pauseOnHover && animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleIconLeave = () => {
    setIshovered(null);
    if (pauseOnHover && animationRef.current) {
      animationRef.current.play();
    }
  };

  useEffect(() => {
    const marquee = marqueeRef.current;
    const content = contentRef.current;
    if (!marquee || !content) return;

    // Calculate widths
    const firstItem = content.children[0] as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const itemsPerSet = iconImg.length;
    const setWidth = itemWidth * itemsPerSet;
    
    // Calculate how many sets we need to show based on container width
    const containerWidth = marquee.offsetWidth;
    const totalSets = Math.ceil(containerWidth / setWidth) + 1; // +1 for seamless loop

    // Calculate total content width for one complete cycle
    const totalContentWidth = setWidth * totalSets;

    // Duration calculation - adjust this formula as needed
    const duration = totalContentWidth / (speed * 2);

    // Reset position based on direction
    if (direction === "left") {
      gsap.set(content, { x: 0 });
    } else {
      gsap.set(content, { x: -totalContentWidth / 2 });
    }

    // Create seamless loop using modular arithmetic
    if (direction === "left") {
      animationRef.current = gsap.to(content, {
        x: `-=${totalContentWidth / 2}`,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const xNum = parseFloat(x);
            // Use modular arithmetic to create seamless loop
            return `${(xNum % (totalContentWidth / 2)) - (totalContentWidth / 2)}px`;
          }
        }
      });
    } else {
      animationRef.current = gsap.to(content, {
        x: `+=${totalContentWidth / 2}`,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const xNum = parseFloat(x);
            // Use modular arithmetic to create seamless loop
            return `${(xNum % (totalContentWidth / 2))}px`;
          }
        }
      });
    }

    return () => {
      animationRef.current?.kill();
    };
  }, [speed, direction]);

  return (
    <div 
      className={`relative overflow-hidden w-full ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-10 fade-overlay pointer-events-none"></div>
      {/* Tooltip */}
      {isHovered && (
        <div 
          className="fixed z-50 px-2 py-[.3rem] text-h1 text-white bg-[#DD2590] rounded-md pointer-events-none hover:opacity-100 opacity-100 transform transition duration-800 ease-in-out"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y + 15,
          }}
        >
          {isHovered.alt}: {isHovered.exp}
        </div>
      )}

      {/* Marquee Container */}
      <div ref={marqueeRef} className="flex w-full">
        {/* Marquee Content - This gets animated */}
        <div ref={contentRef} className="flex marquee-content">
          {copyIcons.map((icon, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center p-medium flex-shrink-0"
              onMouseEnter={() => handleIconHover(icon)}
              onMouseLeave={handleIconLeave}
            >
              <div className="transition-transform duration-300 hover:scale-125">
                <SkillIcon iconSrc={icon.src} altText={icon.alt} size={64} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;