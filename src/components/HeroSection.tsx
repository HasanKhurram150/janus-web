"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const logoPart1Ref = useRef<HTMLDivElement>(null);
  const logoPart2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate watermark halves
      tl.fromTo(
        logoPart1Ref.current,
        { x: -250, y: -250, opacity: 0 },
        { x: 0, y: 0, opacity: 0.04, duration: 1.8, ease: "power4.out" },
        0
      )
        .fromTo(
          logoPart2Ref.current,
          { x: 250, y: 250, opacity: 0 },
          { x: 0, y: 0, opacity: 0.04, duration: 1.8, ease: "power4.out" },
          0
        )
        // Animate main content
        .fromTo(
          contentRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          0.2 // Start at 0.2s absolutely on timeline instead of waiting for logo
        )
        // Animate decorative elements
        .fromTo(
          decorRef.current?.children || [],
          { opacity: 0 },
          { opacity: 1, duration: 1, stagger: 0.1 },
          "-=0.8"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center pt-32 pb-12 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5e2b97]/30 via-[#1b1022]/0 to-[#1b1022]/0 blur-[100px] pointer-events-none" />

      {/* Main Bounded Container */}
      <div className="relative w-full max-w-[1400px] flex-1 border border-white/10 rounded-[32px] sm:rounded-[48px] overflow-hidden flex flex-col justify-center p-8 sm:p-16 lg:p-24 bg-white/[0.02] backdrop-blur-sm">

        {/* Animated Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none overflow-hidden mix-blend-plus-lighter md:-mr-70">
          {/* Top-Left Half */}
          <div
            ref={logoPart1Ref}
            className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[1000px] lg:h-[1000px] opacity-0"
            style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          >
            <Image src="/images/JANUS_white.svg" alt="JANUS Watermark Left" fill className="object-contain" priority />
          </div>
          {/* Bottom-Right Half */}
          <div
            ref={logoPart2Ref}
            className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[1000px] lg:h-[1000px] opacity-0"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          >
            <Image src="/images/JANUS_white.svg" alt="JANUS Watermark Right" fill className="object-contain" priority />
          </div>
        </div>

        <div ref={decorRef}>
          {/* Decorative: Vertical Left Bar */}



        </div>

        {/* Content Area */}
        <div ref={contentRef} className="relative z-10 w-full max-w-5xl md:pl-24">
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-white/50 uppercase mb-8">

          </div>

          <h1 className="text-4xl sm:text-6xl md:text-[72px] lg:text-[88px] font-medium tracking-tight text-white leading-[1.05] mb-4 max-w-[1000px]">
            Every switch port mapped. <br /> Every log indexed.{" "}
            <span className="inline-block bg-[#a476ff] text-[#1b1022] px-3 py-0 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl ml-1 shadow-[0_0_30px_rgba(164,118,255,0.3)]">
              Every threat killed.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12 font-normal">
            Unify network monitoring, SIEM logs, and SOAR automation in one place. Map your fleet, spot anomalies, and block threats at the firewall in seconds.
          </p>


        </div>

      </div>
    </section>
  );
}
