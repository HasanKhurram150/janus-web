"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const USE_CASES = [
  {
    id: "swarm-robotics",
    tag: "Autonomy",
    title: "Robotics and automated fleets",
    subheading: "Low-latency path coordination in dense facilities",
    description:
      "When mobile units operate in the same warehouse, centralized routing introduces communication lag and navigation stalls. Janus coordinates spatial occupancy locally, calculating collision-free trajectories in under a millisecond.",
    metrics: [
      { label: "Fleet capacity", value: "1,200 units" },
      { label: "Clearance margin", value: "2.0 mm" },
      { label: "Network savings", value: "94%" },
    ],
    codeSnippet: `import { JanusMesh } from "@janus/spatial";

const mesh = await JanusMesh.connect({
  clusterId: "facility-west",
  updateRateHz: 1200,
});

await mesh.broadcastPosition({
  unitId: "arm-084",
  coordinates: [14.2, 0.8, -2.1],
});`,
  },
  {
    id: "hf-sim",
    tag: "Simulation",
    title: "Physical simulation environments",
    subheading: "Consistent physics for hardware validation",
    description:
      "Validate vehicle dynamics, sensor feeds, and environmental conditions before physical deployment. Janus runs physics steps with deterministic precision across repeated iterations.",
    metrics: [
      { label: "Step frequency", value: "2,400 Hz" },
      { label: "Repeatability", value: "100%" },
      { label: "Parallel instances", value: "64 worlds" },
    ],
    codeSnippet: `import { JanusSimulation } from "@janus/spatial";

const sim = new JanusSimulation({
  gravity: [0.0, -9.81, 0.0],
  fixedTimestep: 1 / 2400,
});

const frame = await sim.step({
  substeps: 4,
  sensorPayload: ["lidar", "depth"],
});`,
  },
  {
    id: "spatial-telepresence",
    tag: "Spatial interfaces",
    title: "Spatial display interfaces",
    subheading: "Low-latency streaming for connected displays",
    description:
      "Minimize motion-to-photon latency in augmented reality and spatial visualization systems. Janus streams coordinate state directly to display pipelines with sub-millisecond updates.",
    metrics: [
      { label: "Frame latency", value: "1.4 ms" },
      { label: "Display target", value: "120 fps" },
      { label: "Motion drift", value: "Minimal" },
    ],
    codeSnippet: `import { JanusDisplay } from "@janus/spatial";

const pipeline = await JanusDisplay.connect({
  displayId: "deck-primary",
  targetRefreshRate: 120,
});

pipeline.onFrame((state) => {
  renderEngine.drawSpatialField(state);
});`,
  },
  {
    id: "sovereign-defense",
    tag: "Isolated systems",
    title: "Isolated critical infrastructure",
    subheading: "Local operation without external dependencies",
    description:
      "Operate critical monitoring systems completely disconnected from public cloud providers. Janus runs entirely on local hardware with verified data integrity.",
    metrics: [
      { label: "Cloud reliance", value: "Zero" },
      { label: "Network model", value: "Local peer" },
      { label: "Verification", value: "Hardware trust" },
    ],
    codeSnippet: `import { JanusLocalNode } from "@janus/spatial";

const node = await JanusLocalNode.initIsolated({
  localNetworkOnly: true,
  storagePath: "/data/janus",
});

await node.monitorInputs({
  sampleIntervalMs: 5,
});`,
  },
];

export default function UsecasesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentCase = USE_CASES[activeTab];

  return (
    <section
      id="usecases"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#1b1022] border-b border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-14">
          <div className="mb-4">
            <span className="font-mono text-xs text-white/60 tracking-widest uppercase">
              Use cases
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight mb-4">
            Tested across demanding production environments
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-white/60 uppercase">
            Applications across industrial automation, simulation, and spatial hardware
          </p>
        </div>

        {/* Use Cases Selector Tabs (Full Width) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {USE_CASES.map((item, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? "bg-white/[0.06] border-white/30"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                }`}
              >
                <div className="font-mono text-[11px] text-white/50 tracking-wider uppercase mb-3">
                  {item.tag}
                </div>
                <div>
                  <h3 className="font-normal text-white text-base leading-snug">
                    {item.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Use Case Box */}
        <div
          ref={contentRef}
          className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="font-mono text-xs text-white/50 tracking-wider uppercase mb-2">
                {currentCase.tag}
              </span>
              <h3 className="text-2xl sm:text-4xl font-normal text-white mb-2 leading-tight">
                {currentCase.title}
              </h3>
              <div className="font-mono text-xs text-white/60 tracking-wider uppercase mb-6 pb-4 border-b border-white/10">
                {currentCase.subheading}
              </div>
              <p className="text-[#a69eb0] text-base leading-relaxed mb-8 font-normal">
                {currentCase.description}
              </p>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 mb-8">
                {currentCase.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="font-mono text-xl sm:text-2xl font-normal text-white tracking-tight">
                      {m.value}
                    </div>
                    <div className="font-mono text-[11px] text-white/50 tracking-wider uppercase mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <a
                  href="#tiers"
                  className="font-mono text-xs text-white/80 hover:text-white tracking-wide uppercase border-b border-white/20 hover:border-white pb-1 transition-all"
                >
                  View deployment details
                </a>
              </div>
            </div>

            {/* Right Code Box */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#120a18] border border-white/10 p-5 sm:p-6 font-mono text-xs text-white/80">
                <div className="text-white/40 pb-3 mb-4 border-b border-white/10 text-[11px]">
                  Example integration
                </div>
                <pre className="overflow-x-auto text-xs leading-relaxed text-white/80 font-mono">
                  <code>{currentCase.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
