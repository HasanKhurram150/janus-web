"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TabData {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string; sub: string };
  codeSnippet: string;
}

const IPAM_TABS: TabData[] = [
  {
    id: "inventory",
    title: "Realize deterministic IP inventory without spreadsheets or blind spots",
    shortTitle: "Deterministic Inventory",
    description:
      "JANUS IPAM delivers an automated, single source of truth for your physical and edge address space. Deployed 100% on-premise on standard Ubuntu Server, JANUS continuously discovers, tracks, and reconciles IPv4 and IPv6 assets across your subnets using native ICMP probing, ARP table inspection, and SNMP sweeps. Operating with zero phone-home telemetry and a flat licensing structure, it eliminates the per-IP licensing penalties and cloud-sync requirements of conventional IP management tools.",
    bullets: [
      "Continuous scheduled ICMP sweeps and gateway ARP table ingestion",
      "Native IPv4/IPv6 dual-stack support across physical and virtual subnets",
      "Strictly air-gapped discovery with zero phone-home telemetry",
      "Flat predictable licensing with zero per-IP consumption tax",
    ],
    metrics: {
      label: "DISCOVERY THROUGHPUT",
      value: "65,000+ IPs / min",
      sub: "Parallel asynchronous ICMP/ARP engine • Zero packet drop",
    },
    codeSnippet: `// JANUS Air-Gapped Subnet Discovery Pipeline
[Target Subnet: 10.240.0.0/16 (65,534 Total Addresses)]
  ↳ Parallel Multi-Threaded ICMP Echo Sweep
  ↳ Gateway ARP Cache Extraction (Cisco / Juniper / Arista)
  ↳ Subnet Utilization Calculation: 84.2% Allocated (55,180 Active)
  ↳ Stale Reservation Pruning: 142 Stale IPs Flagged for Reclaim
  ✓ Telemetry Egress Leak: 0.00% [Strict Air-Gap Verified]`,
  },
  {
    id: "mapping",
    title: "Empower operational accuracy with physical Layer 2 port mapping",
    shortTitle: "Physical L2 Port Mapping",
    description:
      "Unlike standalone IPAM databases that only track IP addresses in static tables, JANUS natively correlates logical subnets with your physical network infrastructure. Every active IP is automatically bound to its hardware MAC address, associated VLAN, and physical switch and port interface via standard SNMP/Bridge-MIB polling. Network teams gain instant physical visibility into where every device is connected without manual switch querying.",
    bullets: [
      "Instant MAC-to-Switch-Port physical binding (e.g. CORE-SW-01 / Gi1/0/24)",
      "Automated RFC 1493 Bridge-MIB and Q-BRIDGE-MIB polling engine",
      "Real-time VLAN tagging and 802.1Q trunk interface correlation",
      "Eliminates manual CLI switch querying during outages, moves, and audits",
    ],
    metrics: {
      label: "PHYSICAL PINPOINT SPEED",
      value: "< 1.2s",
      sub: "Direct hardware port attribution from IP to physical copper/fiber",
    },
    codeSnippet: `// Dynamic L2 Entity Attribution & Bridge-MIB Graph
Target IP:       10.240.14.88
MAC Address:     00:1A:2B:3C:4D:5E [Intel Embedded NIC]
VLAN ID:         120 [CRITICAL_SCADA_OPS]
Switch Entity:   CORE-SW-DIST-01 (10.240.0.1)
Physical Port:   GigabitEthernet 1/0/24 [UP / 1000Mbps Full]
Hardware State:  L2 Link Stable • Zero Topology Drift Verified`,
  },
  {
    id: "convergence",
    title: "Fuel NOC + SOC convergence within a single architecture",
    shortTitle: "NOC + SOC Convergence",
    description:
      "Break the operational barrier between network administration and threat response. Because JANUS unifies IPAM, switch port tracking, and SIEM event correlation under one engine, an IP address conflict, rogue device alert, or security event immediately provides both the network administrator and the security analyst with actionable, hardware-level attribution.",
    bullets: [
      "Unified operational pane for network administrators and security analysts",
      "Instant Layer 2 hardware port isolation for rogue or misbehaving devices",
      "Seamless correlation of SIEM alerts with historical IPAM host timelines",
      "Zero swivel-chair latency between anomaly discovery and network remediation",
    ],
    metrics: {
      label: "MEAN TIME TO REMEDIATION",
      value: "< 1.8s",
      sub: "Direct hardware port shutdown without third-party cloud brokers",
    },
    codeSnippet: `// Converged NOC + SOC Instant Hardware Containment
Event Trigger:   Rogue Hardware / Duplicate IP Conflict
Offending IP:    10.240.14.89 [Claiming Gateway 10.240.14.1]
Physical Port:   CORE-SW-DIST-01:Gi1/0/25 [Access Port]
[Step 1] Send SNMP Set / SSH Command: "shutdown interface Gi1/0/25"
[Step 2] Quarantine MAC: 48:D7:05:99:A1:02 in 802.1X NAC Table
[Step 3] Broadcast Incident Notification to Converged Operations Room
Result: Host isolated at Layer 2 in 1.48s (Zero Packet Egress)`,
  },
];

const TOPOLOGY_PILLARS = [
  {
    title: "Use automated discovery to eliminate stale reservations",
    description:
      "Replace manual record-keeping with continuous, scheduled network discovery. JANUS sweeps designated CIDR blocks to detect active nodes, mark responsive addresses, and flag abandoned reservations, ensuring your subnet utilization metrics reflect true network state rather than outdated records.",
    highlight: "Automated CIDR Sweeps",
  },
  {
    title: "Detect rogue hardware and IP conflicts immediately",
    description:
      "Guard against addressing discrepancies and unauthorized hardware additions. JANUS tracks MAC-to-IP relationships over time, instantly alerting operators to duplicate IP assignments, MAC address changes on static infrastructure, and unknown devices claiming addresses outside authorized pools.",
    highlight: "Rogue & Conflict Detection",
  },
  {
    title: "Harness unified entity history and change auditing",
    description:
      "Track the complete operational lifecycle of every network address. JANUS logs historical bindings across IP changes, MAC transitions, and switch port migrations, giving engineers an auditable timeline to simplify network troubleshooting, capacity planning, and post-incident forensics.",
    highlight: "Historical Audit Trail",
  },
  {
    title: "Prioritize capacity planning with real-time subnet metrics",
    description:
      "Monitor address pool depletion before outages occur. JANUS provides clear, real-time visualization of subnet saturation, available address buffers, and prefix distribution, enabling network teams to plan route allocations and expand infrastructure based on live network measurements.",
    highlight: "Saturation Analytics",
  },
  {
    title: "Bridge IP inventory directly to rapid network control",
    description:
      "Turn address visibility into instant operational intervention. Because JANUS links IP records directly to physical switch ports, network operators can pinpoint the exact physical location of a misbehaving or rogue host and initiate port-level remediation right at the hardware layer.",
    highlight: "Hardware-Layer Control",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Data Residency & Air-Gap",
    sub: "Data leakage & sovereign perimeter control",
    janusPrimary: "100% On-Premise Execution",
    janusSecondary: "Strict 0.00% cloud phone-home; air-gapped topology retention",
    legacyPrimary: "Mandatory Cloud Sync",
    legacySecondary: "Network topology and IP schemas exported to third-party SaaS",
  },
  {
    criterion: "Physical L2 Switch Port Binding",
    sub: "Hardware correlation & topology mapping",
    janusPrimary: "Native L2 Switch & Port Mapping",
    janusSecondary: "Instant MAC, Switch ID, VLAN & physical interface resolution (e.g. Gi1/0/24)",
    legacyPrimary: "Disconnected Static Tables",
    legacySecondary: "Alerts and records treated as isolated text; zero native switch port visibility",
  },
  {
    criterion: "Licensing & Cost Predictability",
    sub: "Scale infrastructure without consumption taxes",
    janusPrimary: "Flat Predictable Licensing",
    janusSecondary: "Zero per-IP limits, zero device penalties, and zero overage taxes",
    legacyPrimary: "Per-IP Consumption Tax",
    legacySecondary: "Steep tiered pricing per managed IP or active subnet prefix",
  },
  {
    criterion: "NOC + SOC Convergence",
    sub: "Remediation velocity & incident response",
    janusPrimary: "Direct Hardware Containment (< 1.8s)",
    janusSecondary: "Unifies IPAM with SIEM and automated Layer 2 port shutdown via SOAR",
    legacyPrimary: "Siloed IPAM Database",
    legacySecondary: "Disconnected from security tooling; requires manual ticket escalation",
  },
  {
    criterion: "Host Infrastructure",
    sub: "Hardware footprint & deployment simplicity",
    janusPrimary: "Standard Ubuntu Server (Bare-Metal/VM)",
    janusSecondary: "Lightweight single-server architecture; runs on commodity NVMe hardware",
    legacyPrimary: "Complex Multi-Node Clusters",
    legacySecondary: "Requires heavy distributed databases, external brokers, and continuous tuning",
  },
  {
    criterion: "Enclave & Defense Compliance",
    sub: "Air-gapped and military certifications",
    janusPrimary: "Military & SCADA Enclave Ready",
    janusSecondary: "Built specifically for isolated networks, critical infrastructure, and SCADA",
    legacyPrimary: "Cloud-Dependent Compliance Fails",
    legacySecondary: "Requires persistent outbound telemetry, violating strict air-gap compliance",
  },
];

export default function IpamProductPage() {
  const [activeTab, setActiveTab] = useState<string>("inventory");

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

  const currentTab = IPAM_TABS.find((t) => t.id === activeTab) || IPAM_TABS[0];

  return (
    <div className="relative w-full min-h-screen text-white flex flex-col items-center overflow-x-clip bg-janus-bg">
        {/* Main Sticky Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section
          id="overview"
          className="relative w-full min-h-screen bg-theme-gradient text-white pt-24 sm:pt-28 pb-10 sm:pb-14 px-6 sm:px-12 lg:px-16 overflow-hidden border-b border-white/10 flex flex-col justify-center"
        >
          {/* Ambient Purple Glows */}
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-[36rem] h-[36rem] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-[45rem] h-[35rem] bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.18),transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10 my-auto">
            {/* Left Column: Heading, Subtitle & Action Cards */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Huge Bold Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-5">
                On-Prem{" "}
                <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  IPAM
                </span>
                <br />
                with Live Port Mapping
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
                Automate on-premise IPv4 and IPv6 discovery, correlate every address with its physical switch and port, and eliminate spreadsheets with zero cloud telemetry.
              </p>

              {/* Two CTA Action Cards */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                {/* Purple Filled Button */}
                <a
                  href="#capabilities"
                  className="bg-purple-600 hover:bg-purple-500 text-white p-4 sm:p-5 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-purple-400/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left flex-1 group cursor-pointer"
                >
                  <div className="font-semibold text-base sm:text-lg flex items-center justify-between text-white">
                    <span>Take a guided tour</span>
                    <span className="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1">›</span>
                  </div>
                  <div className="text-xs sm:text-sm text-purple-100/85 font-light mt-1">
                    Got 5 minutes? See how the UI works.
                  </div>
                </a>

                {/* Purple Outlined Glass Button */}
                <a
                  href="#poc"
                  className="bg-white/5 hover:bg-white/10 text-purple-200 border-2 border-purple-500/50 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left flex-1 group cursor-pointer"
                >
                  <div className="font-semibold text-base sm:text-lg flex items-center justify-between text-purple-200 group-hover:text-white">
                    <span>View product brief</span>
                    <span className="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1">›</span>
                  </div>
                  <div className="text-xs sm:text-sm text-purple-300/75 font-light mt-1">
                    Discover key features and benefits.
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: 3 Overlapping Software Mockup Windows */}
            <div className="lg:col-span-6 relative w-full h-[440px] sm:h-[480px] flex items-center justify-center">
              {/* 1. Background Window: Subnet Explorer Table */}
              <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#140b1a]/95 rounded-2xl border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
                {/* Window Header */}
                <div className="px-4 py-3 bg-[#190e22] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span className="font-mono text-[11px] text-white/60">
                      Subnet: 10.240.14.0/24 · SCADA Operations Enclave · 254 Hosts
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                  </div>
                </div>

                {/* Table & Detail Drawer Layout */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Address Records Table */}
                  <div className="flex-1 p-3.5 space-y-2 font-mono text-[10px] text-white/60 overflow-hidden">
                    <div className="grid grid-cols-12 pb-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
                      <span className="col-span-3">IP Address</span>
                      <span className="col-span-4">Host / Entity</span>
                      <span className="col-span-3">Physical Port</span>
                      <span className="col-span-2 text-right">Status</span>
                    </div>

                    {[
                      { ip: "10.240.14.1", h: "CORE-GW-01", p: "SW-01:Gi1/0/1", s: "Gateway", sc: "text-blue-400" },
                      { ip: "10.240.14.88", h: "SCADA-PLC-04", p: "SW-02:Gi1/0/24", s: "Active", sc: "text-purple-300" },
                      { ip: "10.240.14.89", h: "ROGUE_HOST", p: "SW-02:Gi1/0/25", s: "Conflict", sc: "text-red-400" },
                      { ip: "10.240.14.90", h: "SRV-HISTORIAN", p: "SW-01:Te1/0/4", s: "Static", sc: "text-emerald-400" },
                      { ip: "10.240.14.91", h: "Available Buffer", p: "Unassigned", s: "Free", sc: "text-white/40" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-12 py-1 items-center border-b border-white/5">
                        <span className="col-span-3 text-purple-300 font-semibold">{row.ip}</span>
                        <span className="col-span-4 truncate text-white/80">{row.h}</span>
                        <span className="col-span-3 text-white/50">{row.p}</span>
                        <span className={`col-span-2 text-right font-semibold ${row.sc}`}>{row.s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right Detail Drawer */}
                  <div className="w-36 bg-[#100715] border-l border-white/10 p-3 flex flex-col justify-between font-mono text-[9px] text-white/60">
                    <div className="space-y-2">
                      <div className="text-purple-400 uppercase font-semibold text-[8px] tracking-wider">Entity Context</div>
                      <div>IP: <span className="text-white">10.240.14.88</span></div>
                      <div>MAC: <span className="text-purple-300">00:1A:2B:3C</span></div>
                      <div>Switch: <span className="text-white">SW-DIST-02</span></div>
                      <div>Port: <span className="text-emerald-400">Gi1/0/24</span></div>
                      <div>VLAN: <span className="text-white">120 (SCADA)</span></div>
                      <div>Binding: <span className="text-emerald-400">Bridge-MIB</span></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Right Indicator */}
                <div className="absolute bottom-3 right-3">
                  <div className="p-1.5 rounded-lg bg-white/10 border border-white/20 text-white/70 hover:text-white transition-colors cursor-pointer shadow-md">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. Top-Left Floating Window: Subnet Reconciliation Dialog */}
              <div className="absolute left-0 top-0 w-[72%] sm:w-[66%] bg-[#170e20] rounded-xl border border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                      ✓
                    </span>
                    <span className="font-semibold text-xs text-white">Reconcile Address Space</span>
                  </div>
                  <span className="text-white/40 hover:text-white cursor-pointer text-sm leading-none">×</span>
                </div>

                {/* Form Body */}
                <div className="space-y-2 text-[10px]">
                  <div className="text-white/60">
                    Target CIDR block on <strong className="text-white font-medium">JANUS L2 Polling Engine</strong>
                  </div>

                  <div className="p-1.5 rounded bg-black/50 border border-purple-500/40 font-mono text-[9px] text-purple-200 flex items-center justify-between">
                    <span>10.240.0.0/16 [Enclave Infrastructure]</span>
                    <span className="text-purple-400">▼</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-white/50 text-[9px]">Sweep method</div>
                    <div className="p-1.5 rounded bg-black/50 border border-white/10 font-mono text-[9px] text-purple-200">
                      ICMP Echo + ARP Cache + Bridge-MIB
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <div className="p-1 rounded bg-black/40 border border-white/10 text-white/40 text-[9px]">
                      stale_ttl: 48h
                    </div>
                    <div className="p-1 rounded bg-black/40 border border-white/10 text-emerald-400 text-[9px]">
                      zero_cloud_sync: true
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                    <button className="px-2.5 py-1 rounded text-white/50 hover:text-white text-[10px]">
                      Dismiss
                    </button>
                    <button className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-[10px] shadow-sm">
                      Execute Sweep
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Bottom-Left Small Metric Capsule */}
              <div className="absolute -bottom-3 left-4 bg-[#14081c]/95 border border-purple-500/40 px-4 py-2.5 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] backdrop-blur-md z-30 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-[11px] font-mono text-white/80">
                  L2 Topology Attribution: <span className="text-purple-300 font-semibold">100% Deterministic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Operational Impact Outcome Cards */}
        <section id="outcomes" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-y border-white/10 bg-[#160b1b]/60">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-4xl font-light text-white">
                Measurable Network Precision Without Cloud Compromise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                  Full-Spectrum Visibility
                </div>
                <div className="text-5xl font-light text-white tracking-tight mb-3">
                  100%
                </div>
                <div className="text-sm text-white/70 font-light leading-relaxed">
                  Air-gapped on-premise data retention with zero phone-home calls or external egress.
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                  L2 Pinpoint Velocity
                </div>
                <div className="text-5xl font-light text-white tracking-tight mb-3">
                  &lt; 1.2s
                </div>
                <div className="text-sm text-white/70 font-light leading-relaxed">
                  Instantaneous MAC-to-Switch-Port resolution via SNMP Bridge-MIB without manual CLI querying.
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                  Subnet Reconciliation
                </div>
                <div className="text-5xl font-light text-white tracking-tight mb-3">
                  100%
                </div>
                <div className="text-sm text-white/70 font-light leading-relaxed">
                  Continuous automated ICMP and ARP sweeps eliminate dead reservations and spreadsheet drift.
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                  Predictable Economics
                </div>
                <div className="text-5xl font-light text-white tracking-tight mb-3">
                  0 IP Tax
                </div>
                <div className="text-sm text-white/70 font-light leading-relaxed">
                  Zero per-IP fees or consumption penalties. Track every host and switch port with zero cost anxiety.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Authoritative Ground Truth Tabbed Capability Showcase */}
        <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-4xl mb-16">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
                On-Prem IPAM with{" "}
                <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  Live Port Mapping
                </span>
              </h2>
              <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
                Explore how JANUS combines automated IP inventory, physical switch port attribution, and unified NOC+SOC convergence into an air-gapped network management engine.
              </p>
            </div>

            {/* Interactive 3-Tab Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
              {IPAM_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative py-3.5 px-4 sm:py-4 sm:px-5 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-center group overflow-hidden ${
                      isActive
                        ? "bg-purple-950/40 border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/40"
                        : "bg-white/[0.03] border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06]"
                    }`}
                  >
                    {/* Active Top Accent Line */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                    )}

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                          isActive ? "text-white font-semibold" : "text-white/70 group-hover:text-white"
                        }`}
                      >
                        {tab.shortTitle}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? "bg-purple-400 shadow-[0_0_8px_#c084fc]" : "bg-white/20 group-hover:bg-white/40"
                        }`}
                      />
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
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 border border-purple-500/30">
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
                    <div className="text-2xl sm:text-3xl font-light text-purple-300 font-mono mt-1">
                      {currentTab.metrics.value}
                    </div>
                  </div>
                  <div className="text-right max-w-[200px] text-xs text-white/60 font-light">
                    {currentTab.metrics.sub}
                  </div>
                </div>
              </div>

              {/* Right Column: Code/Terminal Window Display */}
              <div className="lg:col-span-6 flex flex-col rounded-3xl bg-[#120817] border border-purple-500/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                {/* Window Bar */}
                <div className="px-6 py-4 bg-[#180b20] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-3 font-mono text-xs text-white/60">
                      janus-ipam-engine --reconcile --l2-bridge-mib
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    DISCOVERY ACTIVE
                  </span>
                </div>

                {/* Terminal Content */}
                <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm text-purple-200/90 leading-relaxed overflow-x-auto whitespace-pre bg-black/50 flex-1 flex flex-col justify-center">
                  {currentTab.codeSnippet}
                </div>

                {/* Footer Bar */}
                <div className="p-6 bg-[#160b1b] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="text-white/60">
                    Data Retention: <span className="text-white font-medium">Local NVMe (AES-256)</span>
                  </div>
                  <div className="text-purple-300">
                    Physical Accuracy: <span className="font-bold">100% Deterministic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Infrastructure Topology Grid */}
        <section
          id="architecture"
          className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-theme-gradient-b border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-4xl mb-16">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
                Infrastructure Topology at Your Fingertips:{" "}
                <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  Discover, Track, and Reconcile Subnets at Wire Speed
                </span>
              </h2>
              <h3 className="text-xl sm:text-2xl font-light text-purple-300 mt-5 leading-snug">
                Maintain authoritative subnet visibility — completely air-gapped and on-premise
              </h3>
              <p className="text-base sm:text-lg text-white/75 font-light mt-4 leading-relaxed max-w-4xl">
                Control your core network schema without transmitting internal topology, VLAN layouts, or host inventories to external cloud providers. JANUS runs all subnet calculations, periodic discovery scans, and historical retention entirely within your private boundary, satisfying strict air-gapped and data-sovereignty requirements for defense, utilities, and high-security enterprise enclaves.
              </p>
            </div>

            {/* 5 Pillars Cards */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {TOPOLOGY_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] p-8 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-end mb-6">
                      <span className="font-mono text-xs text-white/30">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-normal text-white mb-4 leading-snug group-hover:text-purple-200 transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                    <span>JANUS IPAM ENGINE</span>
                    <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Architectural Comparison Table (Commented Out) */}
        {/*
        <section
          id="comparison"
          className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-[#170c1f] relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mb-16 text-center mx-auto">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
                Why Sovereign Air-Gapped IPAM{" "}
                <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  Wins
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/60 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
                Compare JANUS with conventional cloud-dependent or spreadsheet tools across compliance, physical switch port attribution, and licensing.
              </p>
            </div>

            <div className="rounded-3xl bg-[#14081c]/90 border border-white/10 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-light border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="py-6 px-6 sm:px-8 text-white/50 font-mono text-xs uppercase tracking-wider w-[30%]">
                        Evaluation Criteria
                      </th>
                      <th className="py-6 px-6 sm:px-8 text-purple-300 font-semibold text-base sm:text-lg w-[38%] bg-purple-500/10 border-x border-purple-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                            <span>JANUS IPAM</span>
                          </div>
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                            AIR-GAPPED
                          </span>
                        </div>
                      </th>
                      <th className="py-6 px-6 sm:px-8 text-white/50 font-medium text-sm sm:text-base w-[32%]">
                        Conventional IPAM / Spreadsheets
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-6 sm:px-8 align-top">
                          <div className="font-normal text-white text-base mb-1">{row.criterion}</div>
                          <div className="text-white/50 text-xs">{row.sub}</div>
                        </td>

                        <td className="py-6 px-6 sm:px-8 align-top bg-purple-500/[0.06] border-x border-purple-500/20">
                          <div className="font-medium text-purple-200 text-base mb-1 flex items-center gap-2">
                            <span className="text-emerald-400 text-sm">✓</span>
                            {row.janusPrimary}
                          </div>
                          <div className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                            {row.janusSecondary}
                          </div>
                        </td>

                        <td className="py-6 px-6 sm:px-8 align-top">
                          <div className="font-normal text-white/75 text-base mb-1 flex items-center gap-2">
                            <span className="text-red-400/80 text-sm">✕</span>
                            {row.legacyPrimary}
                          </div>
                          <div className="text-white/45 text-xs sm:text-sm font-light leading-relaxed">
                            {row.legacySecondary}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Section 6: Final Call To Action */}
        <section id="poc" className="w-full py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-theme-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0,transparent_70%)]" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight mb-6 leading-tight">
              Ready to reclaim complete control of your IP infrastructure?
            </h2>

            <p className="text-lg sm:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Deploy sovereign IPAM on your own servers in under 30 minutes. Zero external DNS queries, zero cloud subscriptions, zero vendor lock-in.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:contact@janus-defense.com?subject=Sovereign%20IPAM%20POC%20Request"
                className="px-9 py-4 rounded-full bg-white text-janus-bg font-mono text-xs font-bold uppercase tracking-widest hover:bg-purple-100 transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
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
