"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./BentoCard";
import ScrambleText from "./ScrambleText";

const BENTO_ITEMS = [
  {
    id: "siem",
    title: "1. SIEM",
    tags: ["REAL-TIME VISIBILITY", "THREAT DETECTION", "FULL-SPECTRUM ALERTING"],
    imageSrc: "/images/SEIM_dashboard.svg",
    imageFit: "contain" as const,
    href: "/services/siem",
    centerEmblem: (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-6 rounded-full bg-blue-500" />
          <span className="w-1.5 h-7 rounded-full bg-blue-400" />
          <span className="w-1.5 h-5 rounded-full bg-blue-600" />
        </div>
        <span className="text-xl sm:text-2xl font-normal text-white tracking-tight">
          SIEM Operations
        </span>
      </div>
    ),
  },
  {
    id: "soar",
    title: "2. SOAR",
    tags: ["INSTANT RESPONSE", "ZERO MANUAL EFFORT", "ADAPTIVE DEFENCE"],
    imageSrc: "/images/malware.svg",
    imageFit: "contain" as const,
    href: "/services/soar",
    centerEmblem: (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
        <span className="text-xl sm:text-2xl font-normal text-white tracking-tight">
          Automated Response
        </span>
      </div>
    ),
  },
  {
    id: "noc",
    title: "3. NOC",
    tags: ["24/7 UPTIME ASSURANCE", "FAULT ISOLATION", "PROACTIVE RECOVERY"],
    imageSrc: "/images/network_topology.svg",
    imageFit: "contain" as const,
    centerEmblem: (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        <span className="text-xl sm:text-2xl font-normal text-white tracking-tight">
          Network Operations
        </span>
      </div>
    ),
  },
  {
    id: "soc",
    title: "4. SOC",
    tags: ["CONTINUOUS OVERSIGHT", "RISK REDUCTION", "AUDIT-READY POSTURE"],
    imageSrc: "/images/compliance.svg",
    imageFit: "contain" as const,
    centerEmblem: (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
        <span className="text-xl sm:text-2xl font-normal text-white tracking-tight">
          Security Operations
        </span>
      </div>
    ),
  },
  {
    id: "ipam",
    title: "5. IPAM",
    tags: ["PHYSICAL ATTRIBUTION", "ROGUE DETECTION", "LIVE PORT MAPPING"],
    imageSrc: "/images/network_topology.svg",
    imageFit: "contain" as const,
    href: "/services/ipam",
    centerEmblem: (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        <span className="text-xl sm:text-2xl font-normal text-white tracking-tight">
          IP &amp; Asset Management
        </span>
      </div>
    ),
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
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

      // Row 1 cards stagger
      const row1Items = row1Ref.current?.children;
      if (row1Items) {
        gsap.fromTo(
          row1Items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row1Ref.current,
              start: "top 78%",
            },
          }
        );
      }

      // Row 2 cards stagger
      const row2Items = row2Ref.current?.children;
      if (row2Items) {
        gsap.fromTo(
          row2Items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 82%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-janus-bg border-b border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div className="mb-4">
            <span className="font-mono text-xs text-white/60 tracking-widest uppercase">
              <ScrambleText text="Features." onHover={true} />
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight mb-4">
            Hardware Level Monitoring and Active Threat Defence in an Airgapped Enviroment
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-white/60 uppercase">
            Hardware-level visibility and device control without cloud lag.
          </p>
        </div>

        {/* Bento Grid — Row 1: 3 cards | Row 2: 2 cards centered */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Row 1: SIEM · SOAR · NOC */}
          <div
            ref={row1Ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          >
            {BENTO_ITEMS.slice(0, 3).map((item) => (
              <BentoCard
                key={item.id}
                title={item.title}
                tags={item.tags}
                imageSrc={item.imageSrc}
                centerEmblem={item.centerEmblem}
                imageFit={item.imageFit}
                href={item.href}
              />
            ))}
          </div>

          {/* Row 2: SOC · IPAM — centered */}
          <div
            ref={row2Ref}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-stretch lg:w-2/3 lg:mx-auto"
          >
            {BENTO_ITEMS.slice(3).map((item) => (
              <BentoCard
                key={item.id}
                title={item.title}
                tags={item.tags}
                imageSrc={item.imageSrc}
                centerEmblem={item.centerEmblem}
                imageFit={item.imageFit}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
