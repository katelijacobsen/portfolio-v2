import React, { useRef, useState } from "react";
import { Button } from "./Button";
import { gsap } from "gsap";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  // ...add more links if needed
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const linksRef = useRef([]);

  const handleMenuClick = () => {
    setOpen((prev) => !prev);
    if (!open) {
      gsap.fromTo(
        linksRef.current,
        { y: 40, opacity: 0, pointerEvents: "none" },
        {
          y: 0,
          opacity: 1,
          pointerEvents: "auto",
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(linksRef.current, {
        y: 40,
        opacity: 0,
        pointerEvents: "none",
        stagger: 0.08,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  };

  return (
    <nav style={{ position: "relative" }}>
      <Button onClick={handleMenuClick}>
        {open ? "Close" : "Menu"}
      </Button>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          position: "absolute",
          top: "3rem",
          left: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {navLinks.map((link, i) => (
          <li
            key={link.name}
            ref={(el) => (linksRef.current[i] = el)}
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              fontSize: "1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#222",
              transition: "color 0.2s",
            }}
            onClick={() => setOpen(false)}
          >
            <a href={link.href} style={{ textDecoration: "none", color: "inherit" }}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
