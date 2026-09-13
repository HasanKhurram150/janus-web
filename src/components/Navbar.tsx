"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Image from "next/image";
import janusLogo from "../app/assets/JANUS_white.svg";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    setMobileMenuOpen(false);

    if (pathname !== "/") {
      return; // Let the browser handle navigation to the new page + hash
    }

    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (el: Element | string, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(targetId, { offset: -80 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isSiemPage = pathname?.startsWith("/services/siem");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isSiemPage
          ? "bg-[#1b1022]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-white/5 py-6"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex flex-col items-center gap-1 group text-white">
          <Image src={janusLogo} alt="JANUS Logo" className="h-10 w-auto opacity-90" />
          <span className="font-medium text-sm tracking-tight text-white leading-none">
            JANUS
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono">
          <a
            href="/#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="text-white/60 hover:text-white transition-colors duration-200 text-xs tracking-wider"
          >
            About
          </a>
          <a
            href="/#features"
            onClick={(e) => handleNavClick(e, "#features")}
            className="text-white/60 hover:text-white transition-colors duration-200 text-xs tracking-wider"
          >
            Features
          </a>
          <a
            href="/services"
            className="text-white/60 hover:text-white transition-colors duration-200 text-xs tracking-wider"
          >
            Capabilities
          </a>
      
          <a
            href="/#faqs"
            onClick={(e) => handleNavClick(e, "#faqs")}
            className="text-white/60 hover:text-white transition-colors duration-200 text-xs tracking-wider"
          >
            FAQs
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="/#tiers"
            onClick={(e) => handleNavClick(e, "#tiers")}
            className="px-4 py-2 rounded-full bg-white text-[#1b1022] font-mono text-xs font-medium tracking-wide transition-all duration-300 hover:bg-white/90 active:scale-98"
          >
            Get started
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden px-3 py-1.5 text-white/70 hover:text-white border border-white/10 rounded-full font-mono text-xs"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-[#1b1022]/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6 flex flex-col gap-4 font-mono text-xs tracking-wider">
          <a
            href="/#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="text-white/70 hover:text-white py-2 border-b border-white/5"
          >
            About
          </a>
          <a
            href="/#features"
            onClick={(e) => handleNavClick(e, "#features")}
            className="text-white/70 hover:text-white py-2 border-b border-white/5"
          >
            Features
          </a>
          <a
            href="/services"
            className="text-white/70 hover:text-white py-2 border-b border-white/5"
          >
            Capabilities
          </a>
          <a
            href="/#usecases"
            onClick={(e) => handleNavClick(e, "#usecases")}
            className="text-white/70 hover:text-white py-2 border-b border-white/5"
          >
            Use cases
          </a>
          <a
            href="/#faqs"
            onClick={(e) => handleNavClick(e, "#faqs")}
            className="text-white/70 hover:text-white py-2 border-b border-white/5"
          >
            FAQs
          </a>
          <a
            href="/#tiers"
            onClick={(e) => handleNavClick(e, "#tiers")}
            className="mt-2 text-center py-2.5 bg-white text-[#1b1022] font-medium rounded-full"
          >
            Get started
          </a>
        </div>
      )}
    </header>
  );
}
