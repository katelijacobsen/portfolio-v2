"use client";

import { GoCopy } from "react-icons/go";
import { siteConfig, socialLinks } from "@/config/site";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

/**
 * Site footer: copy-to-clipboard email address and social profiles.
 *
 * Profiles come from `socialLinks` in the site config, so adding one needs no
 * change here.
 */
export default function SiteFooter() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <footer
      id="contact-information"
      className="pixel-footer relative flex flex-col items-center justify-end py-large md:py-0 text-white border-t border-gray-600 overflow-hidden md:grid md:grid-cols-3 md:grid-rows-3 w-full"
    >
      <div className="pixel-me" aria-hidden="true" />

      <h2 className="sr-only" id="footer-heading">
        Contact and social links
      </h2>

      <address
        className="flex items-center gap-2 p-4 md:row-start-3 md:col-start-1 z-10 not-italic mx-large"
        aria-labelledby="footer-heading"
      >
        <button
          type="button"
          onClick={() => copy(siteConfig.email)}
          className="flex items-center gap-medium hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
          aria-label="Copy email address to clipboard"
        >
          <p className="text-sm sm:text-base">{siteConfig.email}</p>
          <GoCopy aria-hidden="true" />
        </button>

        {/* Announced to screen readers, and visible for a moment after copying. */}
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

      <nav
        aria-label="Social links"
        className="flex gap-6 md:justify-end justify-center z-10 md:row-start-3 md:col-start-3 mx-large"
      >
        <ul className="flex items-center gap-6 m-0 p-0 list-none">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
                aria-label={`${siteConfig.name}'s ${label} (opens in a new tab)`}
              >
                <Icon aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
