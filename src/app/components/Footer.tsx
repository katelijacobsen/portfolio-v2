"use client";

import React, { useEffect, useRef, useState } from "react";
import { GoCopy } from "react-icons/go";
import { BsGithub, BsInstagram, BsLinkedin, } from "react-icons/bs";
import { FaCodepen } from "react-icons/fa";

/**
 * Accessible footer component
 *
 * - Uses <address> for contact information
 * - Copy-to-clipboard with fallback and polite live region
 * - Social links use <nav> + <ul> and open in a new tab with rel attributes
 * - Uses "sr-only" for visually hidden labels (Tailwind provides this utility)
 */

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const email = "katjamaehleke98@gmail.com";

  // clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (typeof timeoutRef.current === "number") {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Robust copy with fallback (handles older browsers)
  const copyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // fallback: create textarea, select, copy
        const textarea = document.createElement("textarea");
        textarea.value = email;
        // avoid scrolling to bottom
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      // clear previous timeout if any
      if (typeof timeoutRef.current === "number") {
        window.clearTimeout(timeoutRef.current);
      }
      // hide copy state after 1500ms
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 1500);
    } catch (err) {
      // Optionally handle copy errors (e.g., show an error state)
      console.error("Copy failed", err);
    }
  };

  return (
    <footer
      id="contact-information"
      className="pixel-footer relative flex flex-col items-center justify-end py-large md:py-0 text-white border-t border-gray-600 overflow-hidden md:grid md:grid-cols-3 md:grid-rows-3 w-full"
    >
      {/* Decorative pixel element (aria-hidden) */}
      <div className="pixel-me" aria-hidden="true" />


      {/* Hidden heading for screen readers to identify the region */}
      <h2 className="sr-only" id="footer-heading">
        Contact and social links
      </h2>

      {/* Contact information: use <address> for semantic contact info */}
      <address
        className="flex items-center jus gap-2 p-4 md:row-start-3 md:col-start-1 z-10 not-italic mx-large"
        aria-labelledby="footer-heading"
      >
        {/* Visible email as a mailto link */}
        {/* Copy button */}
        <button
          type="button"
          onClick={copyEmail}
          className=" flex items-center  gap-medium hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
          aria-label="Copy email address to clipboard"
        >
          <p className="text-sm sm:text-base focus:outline-offset-2 focus:ring-2 focus:ring-pink-500 rounded">
            {email}
          </p>

          <GoCopy aria-hidden="true" />
        </button>

        {/* Polite live region / status for screen readers and visible feedback */}
        <span
          role="status"
          aria-live="polite"
          className={`ml-2 text-xs bg-pink-500 text-white px-2 py-[.2rem] rounded-sm transition-all duration-200 ease-in ${
            copied
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {copied ? "Copied" : ""}
        </span>
      </address>

      {/* Social links */}
      <nav
        aria-label="Social links"
        className="flex gap-6 md:justify-end justify-center z-10 md:row-start-3 md:col-start-3 mx-large"
      >
        <ul className="flex items-center gap-6 m-0 p-0 list-none">
          <li>
            <a
              href="https://github.com/katelijacobsen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
              aria-label="Katja's GitHub (opens in a new tab)"
            >
              <BsGithub aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </a>
          </li>

          <li>
            <a
              href="https://codepen.io/Katja-M-hleke"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
              aria-label="Katja's GitHub (opens in a new tab)"
            >
              <FaCodepen aria-hidden="true" />
              <span className="sr-only">Codepen</span>
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
              aria-label="Katja's LinkedIn (opens in a new tab)"
            >
              <BsLinkedin aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
              aria-label="Katja's Instagram (opens in a new tab)"
            >
              <BsInstagram aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
