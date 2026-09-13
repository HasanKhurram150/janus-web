"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#1b1022] border-b border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="mb-6">
          <span className="font-mono text-xs text-white/60 tracking-widest uppercase">
            Architecture
          </span>
        </div>

        {/* 2-Column Full Width Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight mb-6">
              From Discovery to Defense: The Vision Behind JANUS
            </h2>

            {/* Geist Mono Subheading */}
            <p className="font-mono text-xs sm:text-sm tracking-wider text-white/60 uppercase mb-6 pb-6 border-b border-white/10">
              Instant automated quarantine without cloud latency.
            </p>

            <div className="space-y-4 text-[#a69eb0] text-base sm:text-lg leading-relaxed font-normal">
              <p>
                JANUS converges Layer-2/3 network management, SIEM, and automated SOAR into one pane of glass. By bridging the NOC-SOC divide, it enables teams to map dynamic infrastructure, detect anomalies in real time, and trigger automated firewall quarantines in milliseconds, replacing scattered tool stacks with unified, zero-latency defense.
              </p>
            </div>

            {/* Core Metrics Banner */}
            <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-mono text-3xl font-normal text-white">0.02 mm</div>
                <div className="font-mono text-xs text-white/50 uppercase tracking-wider mt-1">Spatial precision</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="font-mono text-3xl font-normal text-white">0.4 ms</div>
                <div className="font-mono text-xs text-white/50 uppercase tracking-wider mt-1">Tick interval</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="font-mono text-3xl font-normal text-white">100%</div>
                <div className="font-mono text-xs text-white/50 uppercase tracking-wider mt-1">Deterministic</div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Pillars */}
          <div ref={cardsRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Pillar 1 */}
            <div className="p-7 min-h-[250px] rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-normal text-white mb-3">On Prem</h3>
                <p className="text-sm text-[#a69eb0] leading-relaxed font-normal">
                  JANUS deploys natively within your perimeter, keeping all your data strictly on-premise. You maintain complete data sovereignty and execute sub-second firewall mitigations without a single packet leaving your private network.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 min-h-[250px] rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-normal text-white mb-3">Unified Dashboard</h3>
                <p className="text-sm text-[#a69eb0] leading-relaxed font-normal">
                  Monitor network health, analyze security events, and execute automated playbooks from a single unified workspace.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 min-h-[250px] rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-normal text-white mb-3">Direct transport</h3>
                <p className="text-sm text-[#a69eb0] leading-relaxed font-normal">
                  Nodes communicate directly over low-overhead socket protocols, avoiding centralized bottlenecks and unnecessary hops.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-7 min-h-[250px] rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-normal text-white mb-3">State verification</h3>
                <p className="text-sm text-[#a69eb0] leading-relaxed font-normal">
                  State changes are validated mathematically across nodes to maintain consistency and prevent unauthorized tampering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
