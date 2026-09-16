"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Make lenis globally accessible
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Smoothly intercept in-page anchor links (e.g. #faqs, #capabilities, #comparison)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      const isHashOnly = href.startsWith("#") && href.length > 1;
      const isHomeHash = href.startsWith("/#") && href.length > 2;

      if (isHashOnly || (isHomeHash && pathname === "/")) {
        e.preventDefault();
        const selector = isHashOnly ? href : href.slice(1);
        const element = document.querySelector(selector);
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element as HTMLElement, { offset: -80, duration: 1.2 });
        } else if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [pathname]);

  // When route changes, directly scroll to hash if present, or reset to top
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash || sessionStorage.getItem("janus_scroll_target");

    if (hash) {
      try {
        sessionStorage.removeItem("janus_scroll_target");
      } catch (_) {}

      const performScroll = () => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el as HTMLElement, { offset: -80, immediate: true });
          } else {
            el.scrollIntoView();
          }
          ScrollTrigger.refresh();
          return true;
        }
        return false;
      };

      // Try immediately and on slight delays to ensure DOM is ready
      if (!performScroll()) {
        const t1 = setTimeout(performScroll, 50);
        const t2 = setTimeout(performScroll, 150);
        const t3 = setTimeout(performScroll, 350);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
      return;
    }

    // Default: no hash -> reset scroll to top of the new page
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div key={pathname} className="page-transition w-full flex flex-col items-center">
      {children}
    </div>
  );
}

