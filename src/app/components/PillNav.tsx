'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import React from 'react';

export default function PillNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute inline-flex z-50 p-medium">
      <div className="relative bg-gray-800/80 backdrop-blur-sm px-2 py-4 rounded-full border-gray-600 border">
        <ul className="flex space-x-4 relative">
          <li className="relative">
            <Link href="/" className="relative z-10 block px-4 py-2">
              {pathname === '/' && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'white' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-20 ${pathname === '/' ? 'text-gray-800' : 'text-white'}`}>Home</span>
            </Link>
          </li>

          <li className="relative">
            <Link href="/about" className="relative z-10 block px-4 py-2">
              {pathname === '/about' && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-20 ${pathname === '/about' ? 'text-gray-800' : 'text-white'}`}>About</span>
            </Link>
          </li>

          <li className="relative">
            <Link href="/projects" className="relative z-10 block px-4 py-2">
              {pathname === '/projects' && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-20 ${pathname === '/projects' ? 'text-gray-800' : 'text-white'}`}>Projects</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
