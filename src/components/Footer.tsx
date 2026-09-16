"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (el: number | string, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    if (targetId === "/") {
      if (pathname === "/") {
        e.preventDefault();
        scrollToTop();
      }
      return;
    }

    if (pathname !== "/") {
      e.preventDefault();
      try {
        sessionStorage.setItem("janus_scroll_target", targetId);
      } catch (_) {}
      router.push("/" + targetId);
      return;
    }

    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    if (window.history.pushState) {
      window.history.pushState(null, "", targetId);
    }

    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (el: Element | string, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-janus-bg border-t border-white/10 pt-20 pb-12 px-6 sm:px-10 lg:px-16 text-white overflow-hidden relative">
      {/* Ambient subtle glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[250px] bg-purple-600/5 blur-[120px] pointer-events-none -z-0" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* 1. Brand Column (Left) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col items-start">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="relative w-10 h-8 flex items-center justify-center">
                <Image
                  src="/images/JANUS_white.svg"
                  alt="JANUS Logo"
                  width={42}
                  height={32}
                  className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-tight">
                JANUS
              </div>
            </Link>

            <p className="text-sm text-[#a69eb0] leading-relaxed max-w-md font-normal">
              Engineering wire-speed log pipelines, sovereign cyber architectures,
              and uncompromising defense grounded in 100% on-premise control.
            </p>

            <div className="font-mono text-xs text-white/40 flex items-center gap-2 pt-1">
              <span>Distributed Edge Infrastructure</span>
              <span className="w-1 h-1 rounded-full bg-purple-400/60" />
              <span>Spatial Systems Runtime</span>
            </div>
          </div>

          {/* 2. Pages Column (Center) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 font-semibold">
              Pages
            </h4>
            <ul className="space-y-2.5 text-sm text-[#a69eb0]">
              <li>
                <Link
                  href="/"
                  onClick={(e) => handleNavClick(e, "/")}
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block duration-150"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block duration-150"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  onClick={(e) => handleNavClick(e, "#features")}
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block duration-150"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block duration-150"
                >
                  Capabilities
                </Link>
              </li>
              <li>
                <a
                  href="/#faqs"
                  onClick={(e) => handleNavClick(e, "#faqs")}
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block duration-150"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Inquiries Column (Right) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 font-semibold">
              Inquiries
            </h4>
            <p className="text-xs text-[#a69eb0] font-light">
              Direct access to lead engineering:
            </p>
            <a
              href="mailto:support@antilineartech.com"
              className="block text-sm font-mono text-white hover:text-purple-300 transition-colors break-words"
            >
              support@antilineartech.com
            </a>
            <div className="pt-2">
              <a
                href="https://www.antilineartech.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-janus-bg hover:bg-white/90 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all active:scale-95 duration-200"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40">
          <div>
            &copy; {new Date().getFullYear()} JANUS. All rights reserved.
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors tracking-wide flex items-center gap-1.5 group cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <span className="group-hover:-translate-y-0.5 transition-transform duration-200">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
