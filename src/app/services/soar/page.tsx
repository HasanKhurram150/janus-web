"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TabData {
  id: string;
  badge: string;
  title: string;
  shortTitle: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string; sub: string };
  codeSnippet: string;
}

const SOAR_TABS: TabData[] = [
  {
    id: "containment",
    badge: "HARDWARE-LEVEL THREAT CONTAINMENT",
    title: "Neutralize active attacks in seconds with direct hardware-level isolation",
    shortTitle: "Direct Hardware Containment",
    description:
      "When an intrusion is confirmed, every second counts. JANUS SOAR eliminates the delays of external ticketing and manual switch administration by triggering direct, physical Layer 2 port quarantine and endpoint isolation. Attackers are severed from the network before they can move laterally, establish persistence, or exfiltrate critical operational data.",
    bullets: [
      "Direct Layer 2 switch port shutdown and VLAN quarantine in under two seconds",
      "Autonomous host isolation across physical endpoints, servers, and industrial systems",
      "Zero reliance on cloud API brokers or internet connectivity during containment",
      "Reversible quarantine actions with instant one-click administrative restoration",
    ],
    metrics: {
      label: "MEAN TIME TO CONTAINMENT",
      value: "< 1.8s",
      sub: "Direct hardware port isolation • Zero lateral movement",
    },
    codeSnippet: `// JANUS SOAR — Live Containment Execution
[Threat Vector: Lateral Movement & Ransomware Staging]
  ↳ Target Asset: SCADA-PLC-04 (Critical Segment)
  ↳ Physical Port: CORE-SW-01 / Gi1/0/24
  ↳ Executing Action: HARDWARE_PORT_SHUTDOWN
  ↳ Status: ISOLATED [Elapsed: 1.14s]
  ↳ Traffic Quarantined: 100%
  ✓ Lateral Spread Halted: Zero Additional Hosts Compromised`,
  },
  {
    id: "playbooks",
    badge: "AUTONOMOUS PLAYBOOK ORCHESTRATION",
    title: "Deploy flexible, deterministic response workflows tailored to your operational reality",
    shortTitle: "Autonomous Playbook Engine",
    description:
      "Build and execute sophisticated multi-step incident response playbooks without writing complex scripts. JANUS SOAR enables security teams to automate investigation, enrichment, and containment across network devices, firewalls, and endpoints with deterministic consistency and full auditability.",
    bullets: [
      "Pre-configured defense playbooks for ransomware, brute force, insider threats, and rogue devices",
      "Visual condition branching with automated fallback and verification mechanisms",
      "Deterministic execution paths that behave identically in air-gapped test and production",
      "Zero cloud dependencies — all playbooks run entirely on local sovereign infrastructure",
    ],
    metrics: {
      label: "PLAYBOOK RUNTIME",
      value: "< 250ms",
      sub: "Local sub-second orchestration engine • Zero cloud latency",
    },
    codeSnippet: `// JANUS SOAR — Playbook Orchestration Status
Playbook:       SCADA_ENCLAVE_EMERGENCY_CONTAINMENT
Trigger:        Unauthorized Lateral Connection (MITRE T1021)
Execution Mode: Fully Autonomous [Air-Gapped Policy]
Step 1: Snapshot Volatile Memory & Active Sockets ...... [SUCCESS]
Step 2: Revoke Active Identity Sessions ............... [SUCCESS]
Step 3: Reconfigure Edge Firewall Blocklist ........... [SUCCESS]
Step 4: Physically Isolate Switch Interface Gi1/0/24 .. [SUCCESS]
Result: Complete Incident Neutralization in 1.42s`,
  },
  {
    id: "collaboration",
    badge: "CONVERGED NOC + SOC COLLABORATION",
    title: "Bridge the gap between detection, network engineering, and executive oversight",
    shortTitle: "Converged Operations",
    description:
      "Eliminate the operational silos between your Network Operations Center and Security Operations Center. When JANUS SOAR isolates a port or quarantines an address, NOC engineers and SOC analysts see the same synchronized operational record with zero ticket-tossing delays or conflicting actions.",
    bullets: [
      "Single shared operational timeline for both network engineers and security analysts",
      "Automated bidirectional synchronization between alert triage and port state",
      "Dual-authorization safeguards for high-impact industrial and production systems",
      "Comprehensive forensic audit trail generated automatically for regulatory compliance",
    ],
    metrics: {
      label: "TRIAGE EFFICIENCY GAIN",
      value: "96.8%",
      sub: "Zero tool-switching latency between NOC & SOC teams",
    },
    codeSnippet: `// Converged Operations Record — Sync Engine
Incident ID:    INC-2026-9042
Severity:       CRITICAL (P1)
SOC Action:     Switch Port Quarantined (CORE-SW-01 / Gi1/0/24)
NOC Impact:     VLAN 120 Operational Route Preserved
Audit Trail:    Cryptographically Signed Local Log
Evidence:       Volatile Memory Dump & Packet Sample Saved
Status:         Mitigated • Audit Ready`,
  },
];

const SOAR_PILLARS = [
  {
    title: "Isolate compromised devices in seconds",
    description:
      "Stop attacks the moment they are detected. JANUS immediately cuts off the affected device at the physical switch port, blocking malicious activity before it can spread.",
    highlight: "Fast Isolation",
    badge: "INSTANT RESPONSE",
  },
  {
    title: "Automate response with proven playbooks",
    description:
      "Remove manual guesswork from incident response. Step-by-step playbooks run tested mitigation actions automatically, ensuring fast and reliable defense every time.",
    highlight: "Proven Steps",
    badge: "AUTOMATED PLAYBOOKS",
  },
  {
    title: "Run 100% locally with zero cloud dependencies",
    description:
      "Protect sensitive, classified, and private environments. JANUS SOAR works entirely inside your network without external cloud connections or outside data leaks.",
    highlight: "100% On-Premise",
    badge: "AIR-GAPPED READY",
  },
  {
    title: "Keep humans in control of critical decisions",
    description:
      "Balance automated speed with team oversight. Require analyst approval before touching vital servers, and use quick one-click rollbacks whenever needed.",
    highlight: "Team Control",
    badge: "HUMAN OVERSIGHT",
  },
  {
    title: "Unite IT and security teams on one platform",
    description:
      "Give network engineers and security analysts a single shared view of every incident. Teams resolve issues together faster without switching tools or miscommunicating.",
    highlight: "Shared Visibility",
    badge: "UNIFIED TEAMS",
  },
];

export default function SoarProductPage() {
  const [activeTab, setActiveTab] = useState<string>("containment");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const lenis = (
        window as unknown as {
          __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void };
        }
      ).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }
  }, []);

  const currentTab = SOAR_TABS.find((t) => t.id === activeTab) || SOAR_TABS[0];

  return (
    <div className="relative w-full min-h-screen text-white flex flex-col items-center overflow-x-clip bg-janus-bg">
      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="overview"
        className="relative w-full min-h-screen bg-theme-gradient text-white pt-24 sm:pt-28 pb-10 sm:pb-14 px-6 sm:px-12 lg:px-16 overflow-hidden border-b border-white/10 flex flex-col justify-center"
      >
        {/* Ambient Amber & Laser-Violet Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[36rem] h-[36rem] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-[45rem] h-[35rem] bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.18),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10 my-auto">
          {/* Left Column: Heading, Subtitle & Action Cards */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 font-mono text-[11px] tracking-wider uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Autonomous Security Orchestration
            </div>

            {/* Huge Bold Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-5">
              The autonomous<br />
              <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
                SOAR
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
              Orchestrate incident response, automate threat containment, and neutralize lateral movement at wire speed — with zero cloud lag and zero manual effort.
            </p>

            {/* Two CTA Action Cards */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
              {/* Orange/Amber Filled Button */}
              <a
                href="#capabilities"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white p-4 sm:p-5 rounded-2xl shadow-[0_0_30px_rgba(251,146,60,0.35)] border border-orange-400/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left flex-1 group cursor-pointer"
              >
                <div className="font-semibold text-base sm:text-lg flex items-center justify-between text-white">
                  <span>Explore playbooks</span>
                  <span className="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1">›</span>
                </div>
                <div className="text-xs sm:text-sm text-orange-100/85 font-light mt-1">
                  See autonomous containment live in action.
                </div>
              </a>

              {/* Outlined Glass Button */}
              <a
                href="#poc"
                className="bg-white/5 hover:bg-white/10 text-orange-200 border-2 border-orange-500/40 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(251,146,60,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left flex-1 group cursor-pointer"
              >
                <div className="font-semibold text-base sm:text-lg flex items-center justify-between text-orange-200 group-hover:text-white">
                  <span>View product brief</span>
                  <span className="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1">›</span>
                </div>
                <div className="text-xs sm:text-sm text-orange-300/75 font-light mt-1">
                  Discover response velocity and ROI.
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: 3 Overlapping Software Mockup Windows */}
          <div className="lg:col-span-6 relative w-full h-[440px] sm:h-[480px] flex items-center justify-center">
            {/* 1. Background Window: Visual Playbook DAG Canvas */}
            <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#170c14]/95 rounded-2xl border border-orange-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#1e0f1b] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                  <span className="font-mono text-[11px] text-white/60">
                    playbook-dag · lateral-movement-containment · scada-enclave
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Playbook DAG Workflow Steps */}
              <div className="flex-1 p-4 space-y-3 font-mono text-[10px] overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white/40 text-[9px] uppercase tracking-wider">
                  <span>Execution Sequence</span>
                  <span>Target Entity</span>
                  <span>Duration</span>
                  <span className="text-right">Status</span>
                </div>

                {[
                  {
                    step: "01. Telemetry Correlated",
                    target: "Ransomware Staging Alert",
                    time: "0.12s",
                    status: "Triggered",
                    color: "text-emerald-400",
                  },
                  {
                    step: "02. Physical Topology Mapped",
                    target: "CORE-SW-01 / Gi1/0/24",
                    time: "0.24s",
                    status: "Resolved",
                    color: "text-blue-400",
                  },
                  {
                    step: "03. Layer 2 Port Quarantine",
                    target: "Direct Hardware Cutoff",
                    time: "0.85s",
                    status: "Executed",
                    color: "text-orange-400",
                  },
                  {
                    step: "04. Credential & Session Revoke",
                    target: "SCADA-PLC-04 Service Account",
                    time: "1.14s",
                    status: "Revoked",
                    color: "text-purple-400",
                  },
                  {
                    step: "05. Incident Snapshot & Dispatch",
                    target: "SOC Duty Team Notified",
                    time: "1.42s",
                    status: "Secured",
                    color: "text-emerald-400 font-bold",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 border-b border-white/5 hover:bg-white/[0.02] px-1 rounded transition-colors"
                  >
                    <span className="text-white/80 font-medium">{row.step}</span>
                    <span className="text-orange-200/90">{row.target}</span>
                    <span className="text-white/40">{row.time}</span>
                    <span className={`text-right ${row.color}`}>{row.status}</span>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="p-3 bg-[#11070e] border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Workflow Complete: Threat Neutralized in 1.42s</span>
                </div>
                <span className="text-orange-300">0 Lateral Spread</span>
              </div>
            </div>

            {/* 2. Top-Left Floating Window: Playbook Trigger & Action Dialog */}
            <div className="absolute left-0 top-0 w-[72%] sm:w-[66%] bg-[#1d0e1b] rounded-xl border border-orange-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold">
                    ⚡
                  </span>
                  <span className="font-semibold text-xs text-white">Execute Containment Playbook</span>
                </div>
                <span className="text-white/40 hover:text-white cursor-pointer text-sm leading-none">×</span>
              </div>

              {/* Form Body */}
              <div className="space-y-2 text-[10px]">
                <div className="text-white/60">
                  Target: <strong className="text-white font-medium">SCADA-PLC-04</strong> · High-Risk Operational Zone
                </div>

                <div className="p-1.5 rounded bg-black/50 border border-orange-500/40 font-mono text-[9px] text-orange-200 flex items-center justify-between">
                  <span>playbook: emergency_hardware_quarantine</span>
                  <span className="text-orange-400">▼</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="p-1.5 rounded bg-black/40 border border-white/10 text-white/60 font-mono text-[9px]">
                    Switch Port: <span className="text-emerald-400">Gi1/0/24</span>
                  </div>
                  <div className="p-1.5 rounded bg-black/40 border border-white/10 text-white/60 font-mono text-[9px]">
                    VLAN: <span className="text-orange-300">Quarantine (999)</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button className="px-2.5 py-1 rounded text-white/50 hover:text-white text-[10px]">
                    Dry Run
                  </button>
                  <button className="px-3 py-1 rounded bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-[10px] shadow-sm">
                    Execute Playbook
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom-Left Floating Window: Response Velocity Timeline */}
            <div className="absolute left-2 sm:left-4 bottom-2 w-[74%] sm:w-[68%] bg-[#120710] rounded-xl border border-orange-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3.5 z-30 text-white font-sans text-xs backdrop-blur-md">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-xs text-white">Containment Velocity</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-white/50">Sub-Second Execution</span>
                </div>
              </div>

              {/* Progress Bar / Velocity Metrics */}
              <div className="space-y-2 font-mono text-[9px]">
                <div className="flex justify-between text-white/60">
                  <span>Physical Switch Isolation</span>
                  <span className="text-emerald-400 font-bold">0.85s</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full w-[85%]" />
                </div>

                <div className="flex justify-between text-white/60 pt-1">
                  <span>Total Response Time</span>
                  <span className="text-orange-300 font-bold">1.42s</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full w-[95%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Outcome Metric Cards */}
      <section id="outcomes" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-y border-white/10 bg-[#160b14]/60">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-light text-white">
              Autonomous Defense ROI at Wire Speed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-orange-300 tracking-wider uppercase mb-3">
                Remediation Velocity
              </div>
              <div className="text-5xl font-light text-orange-300 tracking-tight mb-3">
                &lt; 1.8s
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Mean time from confirmed alert to physical switch port and network perimeter quarantine.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-orange-300 tracking-wider uppercase mb-3">
                Analyst Fatigue Reduced
              </div>
              <div className="text-5xl font-light text-emerald-400 tracking-tight mb-3">
                96.8%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Repetitive triage, credential resets, and port shutdowns executed autonomously without manual toil.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-orange-300 tracking-wider uppercase mb-3">
                Air-Gapped Execution
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                100%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Fully on-premise execution with zero external cloud webhook dependencies or data leakage.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-orange-300 tracking-wider uppercase mb-3">
                Human-in-the-Loop Risk
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                0 Error
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Configurable dual-custody gates and instant one-click rollback safeguards for mission-critical systems.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Tabbed Capability Showcase */}
      <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Sovereign Orchestration at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
                Instant Containment, Zero Cloud Lag
              </span>
            </h2>
            <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
              Explore how JANUS SOAR unites automated incident containment, visual playbook execution, and converged NOC/SOC workflows into an air-gapped sovereign powerhouse.
            </p>
          </div>

          {/* Interactive 3-Tab Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
            {SOAR_TABS.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-3.5 px-4 sm:py-4 sm:px-5 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-center group overflow-hidden ${
                    isActive
                      ? "bg-orange-950/40 border-orange-500/80 shadow-[0_0_25px_rgba(251,146,60,0.25)] ring-1 ring-orange-500/40"
                      : "bg-white/[0.03] border-white/10 hover:border-orange-500/30 hover:bg-white/[0.06]"
                  }`}
                >
                  {/* Active Top Accent Line */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />
                  )}
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold ${
                          isActive ? "text-orange-300" : "text-white/40 group-hover:text-white/60"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_6px_#fb923c]" />
                      )}
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-medium leading-snug tracking-tight transition-colors ${
                        isActive ? "text-white font-semibold" : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {tab.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Detailed Description */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2 sm:py-4 lg:pr-8">
              <div>
                <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-white mb-6 leading-snug">
                  {currentTab.title}
                </h3>
                <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-8">
                  {currentTab.description}
                </p>

                <div className="space-y-3.5 mb-10">
                  {currentTab.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 border border-orange-500/30">
                        ✓
                      </span>
                      <span className="text-sm sm:text-base text-white/80 font-light">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric Strip */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 mt-6">
                <div>
                  <div className="font-mono text-xs text-white/50 uppercase tracking-wider">
                    {currentTab.metrics.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-light text-orange-300 font-mono mt-1">
                    {currentTab.metrics.value}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    {currentTab.metrics.sub}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-300">
                  <svg className="w-5 h-5 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Code & Architecture Visualizer */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl bg-[#130810] border border-white/10 overflow-hidden shadow-2xl">
              {/* Console Window Header */}
              <div className="px-6 py-4 bg-[#1b0b17] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 font-mono text-xs text-white/60">
                    janus-soar-engine // {currentTab.id}.log
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ORCHESTRATOR ONLINE
                </span>
              </div>

              {/* Code Terminal Body */}
              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm text-orange-200/90 leading-relaxed overflow-x-auto whitespace-pre font-mono bg-black/50 flex-1 flex flex-col justify-center">
                <code>{currentTab.codeSnippet}</code>
              </div>

              {/* Interactive Action Footer */}
              <div className="p-6 bg-[#180a14] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <span className="text-white/60">
                  Playbook Engine: <strong className="text-white">JANUS SOAR v4.2</strong>
                </span>
                <button
                  onClick={() => {
                    const nextIndex =
                      (SOAR_TABS.findIndex((t) => t.id === activeTab) + 1) % SOAR_TABS.length;
                    setActiveTab(SOAR_TABS[nextIndex].id);
                  }}
                  className="text-orange-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Next capability</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Capability Pillars */}
      <section
        id="architecture"
        className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-theme-gradient-b border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Action at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
                Automate, Contain, and Resolve Threats in Seconds
              </span>
            </h2>
            <h3 className="text-xl sm:text-2xl font-light text-orange-300 mt-5 leading-snug">
              Respond to security incidents automatically — 100% on-premise with zero cloud exposure
            </h3>
            <p className="text-base sm:text-lg text-white/75 font-light mt-4 leading-relaxed max-w-4xl">
              Turn security alerts directly into fast containment actions. JANUS SOAR isolates infected devices and executes response steps in seconds within your own private network, saving critical time without leaking data.
            </p>
          </div>

          {/* 5 Pillars Equal-Sized Cards */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {SOAR_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] p-8 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-orange-500/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-orange-500/15 text-orange-300 border border-orange-500/30">
                    {pillar.badge}
                  </span>
                  <span className="font-mono text-xs text-white/30">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-medium text-white mb-4 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Final Call To Action */}
      <section id="poc" className="w-full py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-theme-gradient relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-bold px-3 py-1 rounded-full bg-orange-900/30 border border-orange-500/30 inline-block mb-6">
            Evaluation &amp; Deployment
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Ready to accelerate containment with <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">Enterprise SOAR</span>?
          </h2>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Experience sub-second automated threat containment, visual playbook execution, and zero cloud webhook dependencies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#overview"
              className="px-9 py-4 rounded-full bg-white text-janus-bg font-mono text-xs font-bold uppercase tracking-widest hover:bg-orange-100 transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
            >
              Schedule Air-Gapped POC →
            </a>
            <Link
              href="/services"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              View All Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
