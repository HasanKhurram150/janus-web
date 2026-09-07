"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./BentoCard";
import ScrambleText from "./ScrambleText";

const BENTO_ITEMS = [
  {
    id: "graphizo",
    title: "Graphizo.",
    meta: "2026 · 3 WEEK BUILD · LIVE",
    tags: ["ARCHITECTURE", "BUILD", "DATA"],
    imageSrc: "/images/graphizo.jpg",
    centerEmblem: (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-6 rounded-full bg-white" />
          <span className="w-1.5 h-7 rounded-full bg-white" />
          <span className="w-1.5 h-5 rounded-full bg-white" />
        </div>
        <span className="text-xl sm:text-2xl font-normal text-white tracking-tight">
          Graphizo
        </span>
      </div>
    ),
  },
  {
    id: "radario",
    title: "Radario.",
    meta: "2026 · 6 WEEK BUILD · LIVE",
    tags: ["STRATEGY", "BUILD"],
    imageSrc: "/images/radario.jpg",
    centerEmblem: (
      <div className="text-white text-6xl sm:text-7xl font-normal tracking-tighter select-none drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]">
        FR
      </div>
    ),
  },
  {
    id: "spectra",
    title: "Spectra.",
    meta: "2026 · 4 WEEK BUILD · LIVE",
    tags: ["COMPUTE", "KERNEL", "DATA"],
    imageSrc: "/images/spectra.jpg",
    centerEmblem: (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <span className="w-2.5 h-2.5 rounded-full bg-white" />
        <span className="text-xl sm:text-2xl font-normal text-white tracking-tight">
          Spectra
        </span>
      </div>
    ),
  },
  {
    id: "aether",
    title: "Aether.",
    meta: "2026 · 2 WEEK BUILD · LIVE",
    tags: ["PHYSICS", "SIMULATION"],
    imageSrc: "/images/aether.jpg",
    centerEmblem: (
      <div className="text-white text-6xl sm:text-7xl font-normal tracking-tighter select-none drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]">
        AE
      </div>
    ),
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      const items = gridRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#1b1022] border-b border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div className="mb-4">
            <span className="font-mono text-xs text-white/60 tracking-widest uppercase">
              <ScrambleText text="Capabilities." onHover={true} />
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight mb-4">
            Crafted for spatial and physical systems
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-white/60 uppercase">
            Interactive bento modules with real-time state execution
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
        >
          {BENTO_ITEMS.map((item) => (
            <BentoCard
              key={item.id}
              title={item.title}
              meta={item.meta}
              tags={item.tags}
              imageSrc={item.imageSrc}
              centerEmblem={item.centerEmblem}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
