"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      )
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          consoleRef.current,
          { opacity: 0, y: 30, scale: 0.99 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#1b1022] border-b border-white/5"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-white/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Header Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Main Headline (without bold font) */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.08] mb-6"
        >
          Real-time computation for physical and spatial systems
        </h1>

        {/* Geist Mono Subheading (without special characters or brackets) */}
        <p
          ref={subheadRef}
          className="font-mono text-xs sm:text-sm tracking-widest text-white/70 uppercase mb-6 max-w-2xl"
        >
          Low latency, high throughput, and consistent execution across connected hardware
        </p>

        {/* Main Body Text */}
        <p
          ref={descRef}
          className="text-base sm:text-lg md:text-xl text-[#a69eb0] max-w-2xl leading-relaxed mb-10 font-normal"
        >
          Janus provides an open runtime to coordinate spatial environments, robotics, and simulations on your own infrastructure with predictable performance.
        </p>

        {/* Action Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          <a
            href="#tiers"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[#1b1022] font-mono text-xs font-medium tracking-wide transition-all duration-300 hover:bg-white/90 active:scale-98"
          >
            Start building
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/15 font-mono text-xs tracking-wide transition-all duration-300"
          >
            View documentation
          </a>
        </div>
      </div>

      {/* Full-Page Wide Performance Console */}
      <div
        ref={consoleRef}
        className="relative z-10 w-full max-w-6xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8"
      >
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
          <span className="font-mono text-xs text-white/60">
            Runtime telemetry
          </span>
          <span className="font-mono text-xs text-white/50">
            Node status: active
          </span>
        </div>

        {/* Metrics Grid (without icons or bold weights) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-white/50 font-mono text-xs tracking-wide mb-1">
              Latency
            </div>
            <div className="text-2xl sm:text-3xl font-normal font-mono text-white tracking-tight">
              0.64 ms
            </div>
            <div className="font-mono text-[11px] text-white/40 mt-1">Average response</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-white/50 font-mono text-xs tracking-wide mb-1">
              Throughput
            </div>
            <div className="text-2xl sm:text-3xl font-normal font-mono text-white tracking-tight">
              480k ops
            </div>
            <div className="font-mono text-[11px] text-white/40 mt-1">Updates per second</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-white/50 font-mono text-xs tracking-wide mb-1">
              Consistency
            </div>
            <div className="text-2xl sm:text-3xl font-normal font-mono text-white tracking-tight">
              99.99%
            </div>
            <div className="font-mono text-[11px] text-white/40 mt-1">State alignment</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-white/50 font-mono text-xs tracking-wide mb-1">
              Active nodes
            </div>
            <div className="text-2xl sm:text-3xl font-normal font-mono text-white tracking-tight">
              1,428
            </div>
            <div className="font-mono text-[11px] text-white/40 mt-1">Distributed workers</div>
          </div>
        </div>

        {/* Clean Code Snippet */}
        <div className="p-5 rounded-xl bg-[#140b1a] border border-white/10 font-mono text-xs sm:text-sm text-white/80 overflow-x-auto">
          <div className="text-white/40 pb-3 mb-3 border-b border-white/5 text-[11px]">
            cluster_quickstart.ts
          </div>
          <pre className="text-white/80 font-mono text-xs leading-relaxed">
{`import { JanusCluster } from "@janus/spatial";

const cluster = await JanusCluster.connect({
  host: "edge-local.network",
  targetLatencyMs: 1.0,
});

await cluster.syncState({
  entityId: "device-node",
  position: [12.4, 0.5, -3.2],
  orientation: [0.0, 1.0, 0.0, 0.0],
});`}
          </pre>
        </div>
      </div>
    </section>
  );
}
