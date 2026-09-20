"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { navLinks } from "@/config/site";

/**
 * Primary navigation. The active item is marked by a pill that animates
 * between links via a shared `layoutId`.
 *
 * Links come from `navLinks` in the site config, so adding a page needs no
 * change here.
 */
export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="relative inline-flex z-50 p-medium">
      <div className="relative bg-gray-800/80 backdrop-blur-sm p-small rounded-full border border-gray-600">
        <ul className="flex space-x-4 relative m-0 p-0 list-none">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className="relative z-10 block px-4 py-2"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white pointer-events-none"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-20 ${isActive ? "text-gray-800" : "text-white"}`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
