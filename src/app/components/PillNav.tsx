'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PillNav = () => {
  const pathname = usePathname();
  const homeLinkRef = useRef<HTMLAnchorElement>(null);
  const aboutLinkRef = useRef<HTMLAnchorElement>(null);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      const isToHome = pathname === '/';
      const isToAbout = pathname === '/about';
      
      if (isToHome || isToAbout) {
        const targetLink = isToHome ? homeLinkRef.current : aboutLinkRef.current;
        const previousLink = isToHome ? aboutLinkRef.current : homeLinkRef.current;
        
        if (targetLink && previousLink) {
          // Animate previous link out (optional)
          gsap.to(previousLink, {
            scale: 0.95,
            opacity: 0.7,
            duration: 0.2,
            ease: "power2.out"
          });
          
          // Bounce animation for active link
          gsap.fromTo(targetLink, 
            {
              scale: 0.7,
              rotation: -10,
              opacity: 0
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.8,
              ease: "elastic.out(1.2, 0.5)"
            }
          );
        }
      }
      
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <nav className="relative inline-flex z-50 p-medium">
      <div className="bg-gray-800/80 backdrop-blur-sm px-2 py-4 rounded-full border-gray-600 border">
        <ul className="flex space-x-4">
          <li className="">
            <Link
              ref={homeLinkRef}
              href="/"
              className={`p-4 py-2 rounded-full transition-colors ${
                pathname === '/'
                  ? 'bg-white text-gray-700'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              ref={aboutLinkRef}
              href="/about"
              className={`px-4 py-2 rounded-full transition-colors ${
                pathname === '/about'
                  ? 'bg-white text-gray-800'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PillNav;