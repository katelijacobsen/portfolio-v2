"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "./Button";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleMenu = () => {


    if (menuOpen && menuRef.current) {
      const menu = menuRef.current;
      const items = menu.querySelectorAll("li");

      const tl = gsap.timeline({
        onComplete: () => {
          setRenderMenu(false);
          setMenuOpen(false);
        },
      });

      tl.to(items, {
        opacity: 0,
        y: 40,
        duration: 0.2,
        ease: "power2.out",
        stagger: {
          each: 0.1,
        },
      });

      tl.to(menu, {
        x: 600,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      setRenderMenu(true);
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    if (renderMenu && menuRef.current) {
      const menu = menuRef.current;
      const items = menu.querySelectorAll("li");

      const tl = gsap.timeline();
      tl.from(menu, {
        x: 600,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.from(items, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        stagger: {
          each: 0.2,
          from: "start",
        },
      });
    }
  }, [renderMenu]);

  return (
    <nav className="fixed w-full flex justify-end z-100">
      <div className="absolute right-6 top-6 z-50">
        <Button
          text={menuOpen ? "Close" : "Menu"}
          w="w-auto"
          onClick={toggleMenu}
          bg={menuOpen ? "bg-primary-1" : "bg-accent-1"}
          bg2={menuOpen ? "bg-primary-3" : "bg-accent-1"}
          textclr={menuOpen ? "text-accent-1" : "text-primary-2"}
          borderclr={menuOpen ? "border-accent-1" : "border-primary-1"}
        />
      </div>

      {menuOpen && (
        <ul
          ref={menuRef}
          className="font-header text-h3 md:text-h2 text-primary-2 bg-accent-1 w-1/2 md:w-1/3 px-8 md:px-16 py-24 md:py-16 absolute top-0 right-0 space-y-12 md:space-y-20 brown-shadow rounded-bl-none md:rounded-bl-2xl rounded-tl-none md:rounded-tl-2xl h-screen flex flex-col justify-center z-40"
        >
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about-me">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact-information">Contact</a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Header;
