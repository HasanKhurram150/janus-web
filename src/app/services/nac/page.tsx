"use client";

import { useState } from "react";
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

const NAC_TABS: TabData[] = [
  {
    id: "enforcement",
    title: "Realize authoritative edge enforcement without agent friction or cloud tollgates",
    shortTitle: "Edge Enforcement",
    description:
      "JANUS NAC delivers deterministic Network Access Control directly at the local access layer. Deployed 100% on-premise on standard Ubuntu Server, JANUS governs access to physical switch ports and wireless segments without external cloud brokers or recurring per-endpoint license taxes. Combining standards-based 802.1X/RADIUS authentication, MAC Authentication Bypass (MAB), and out-of-band SNMP/CLI switch control, JANUS validates device legitimacy before granting access to internal network fabric.",
    bullets: [
      "On-premise 802.1X/RADIUS authentication with zero cloud phone-home",
      "Automated MAC Authentication Bypass (MAB) for headless IoT & printers",
      "Direct SNMP write and CLI switch port control across multi-vendor fabric",
      "Flat predictable licensing with zero per-endpoint subscription penalties",
    ],
    metrics: {
      label: "AUTHENTICATION LATENCY",
      value: "< 45ms",
      sub: "Local RADIUS RFC 2865 engine • Zero WAN dependency",
    },
    codeSnippet: `// JANUS Air-Gapped Port Admission Pipeline
[Access Switch: CORE-SW-01:Gi1/0/18]
  ↳ EAP-TLS / 802.1X Handshake Initiated
  ↳ Local Radius Auth (On-Prem SQLite/LDAP Registry)
  ↳ Certificate Validation: CN=SEC-WS-088.internal
  ↳ Dynamic Authorization: Grant VLAN 120 (SCADA_OPS)
  ✓ Cloud Broker Dependency: 0.00% [Strict Air-Gap Verified]`,
  },
  {
    id: "profiling",
    title: "Empower admission accuracy with active Layer 2 profiling and port control",
    shortTitle: "Active L2 Profiling",
    description:
      "Unlike overlay security tools that merely monitor traffic after admission, JANUS controls the physical access layer. By profiling endpoints through DHCP fingerprinting, MAC OUI vendor lookups, and direct Bridge-MIB switch polling, JANUS distinguishes authorized corporate hardware from rogue laptops, unauthorized IoT devices, and unmanaged access points. Unknown or unauthorized devices are automatically restricted at the switch port before they touch core data planes.",
    bullets: [
      "DHCP option 55/60 fingerprinting and IEEE OUI hardware vendor lookup",
      "Real-time RFC 1493 Bridge-MIB polling to bind MAC directly to switch port",
      "Immediate identification of unmanaged switches and rogue access points",
      "Automatic port-level restriction before unverified devices reach core routes",
    ],
    metrics: {
      label: "PROFILING ACCURACY",
      value: "99.8%",
      sub: "Deterministic hardware attribute matching • Zero guesswork",
    },
    codeSnippet: `// Dynamic L2 Device Profiling & Hardware Attribution
Target MAC:      00:1A:2B:3C:4D:5E [Intel Corporate NIC]
DHCP Options:    Option 55 (1,3,6,15,119,252) -> OS: Ubuntu 24.04 LTS
Switch Entity:   SW-ACCESS-02 (10.240.0.2)
Physical Port:   GigabitEthernet 1/0/24 [Access Port]
Profile Result:  AUTHORIZED_MANAGED_ENDPOINT
Policy Action:   Assign Production VLAN 120 • 802.1X Authenticated`,
  },
  {
    id: "containment",
    title: "Fuel NOC + SOC convergence with instantaneous hardware containment",
    shortTitle: "NOC + SOC Containment",
    description:
      "Unify identity admission, IPAM tracking, and SIEM threat correlation into an automated defense feedback loop. When the JANUS SIEM or vulnerability engine flags an active exploit, credential abuse, or rogue MAC anomaly, JANUS NAC moves instantly from detection to isolation—reassigning the endpoint to a restricted quarantine VLAN or administratively shutting down the physical switch port in real time.",
    bullets: [
      "Automated feedback loop between SIEM threat alerts and NAC port control",
      "Sub-2-second dynamic VLAN isolation into remediation quarantine",
      "One-click hardware port shutdown from security triage console",
      "Maintains analyst remote triage access while eliminating lateral spread",
    ],
    metrics: {
      label: "CONTAINMENT LATENCY",
      value: "< 1.4s",
      sub: "Direct RADIUS CoA (RFC 3576) & SNMP Set port execution",
    },
    codeSnippet: `// Converged SIEM-to-NAC Automated Hardware Containment
Event Trigger:   SIEM Alert #JAN-9842 (Ransomware Lateral Sweep)
Target IP:       10.240.14.88 | MAC: 00:1A:2B:3C:4D:5E
Switch Location: CORE-SW-01:Gi1/0/24
[Step 1] Send RADIUS CoA (RFC 3576) Disconnect-Request
[Step 2] Reassign Port to VLAN 999 (ISOLATION_QUARANTINE)
[Step 3] Apply Ingress Filter: Deny All Internal Subnet Transit
Result: Host quarantined at hardware layer in 1.32s (Air-Gapped Sovereign Defense)`,
  },
];

const NAC_PILLARS = [
  {
    title: "Enforce strict pre-admission standards via 802.1X and MAB",
    description:
      "Verify every incoming connection before issuing network transit. JANUS supports enterprise 802.1X EAP protocols for managed user devices while providing automated MAC Authentication Bypass (MAB) for headless systems, printers, cameras, and OT infrastructure, preventing unauthorized plug-ins on open wall jacks.",
    highlight: "802.1X & MAB Standards",
  },
  {
    title: "Detect rogue hardware and MAC spoofing instantly",
    description:
      "Prevent perimeter bypass via forged network identities. By continuously reconciling live ARP tables, MAC-to-port bindings, and device profiles against authoritative IPAM baselines, JANUS detects duplicate MACs, port hopping, and unauthorized hardware insertions, blocking lateral network traversal before an intruder establishes a persistent foothold.",
    highlight: "Rogue & Spoof Detection",
  },
  {
    title: "Harness dynamic VLAN isolation and quarantine workflows",
    description:
      "Isolate non-compliant or compromised endpoints without taking downstream infrastructure offline. JANUS interacts directly with enterprise switch hardware to dynamically reassign ports into restricted guest or remediation VLANs, containing the blast radius of compromised machines while preserving analyst access for remote triage.",
    highlight: "Dynamic Quarantine",
  },
  {
    title: "Bridge multi-vendor switch hardware with universal protocol standards",
    description:
      "Eliminate single-vendor hardware lock-in. JANUS communicates with heterogeneous switch infrastructure across Cisco, Aruba, Juniper, and generic managed switches using universal standards—including RADIUS RFC 2865/3576 (CoA), standard SNMP write/traps, and SSH/CLI integration—protecting your existing capital hardware investments.",
    highlight: "Multi-Vendor Universal",
  },
  {
    title: "Execute direct, one-click port containment",
    description:
      "Close the gap between threat detection and physical enforcement. Security operators can trigger immediate physical containment directly from an incident ticket—bouncing a port, disabling a switch interface, or blacklisting a MAC address across all managed access switches without requiring manual network engineering tickets.",
    highlight: "One-Click Containment",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Data Residency & Air-Gap",
    sub: "Data leakage & sovereign perimeter control",
    janusPrimary: "100% On-Premise Execution",
    janusSecondary: "Strict 0.00% cloud phone-home; air-gapped RADIUS & identity database",
    legacyPrimary: "Mandatory Cloud Identity Broker",
    legacySecondary: "User credentials and network topology synchronized to third-party SaaS",
  },
  {
    criterion: "Physical Switch Port Control",
    sub: "Hardware-layer boundary enforcement",
    janusPrimary: "Direct L2 Port Shutdown & Dynamic VLAN",
    janusSecondary: "Native SNMP/Bridge-MIB and RADIUS CoA execution at the physical interface",
    legacyPrimary: "Agent-Dependent Overlay",
    legacySecondary: "Relies on OS software agents; powerless against unmanaged rogue devices",
  },
  {
    criterion: "Licensing & Cost Predictability",
    sub: "Scale infrastructure without consumption taxes",
    janusPrimary: "Flat Predictable Licensing",
    janusSecondary: "Zero per-endpoint subscription fees or annual device counting penalties",
    legacyPrimary: "Per-Endpoint Subscription Tax",
    legacySecondary: "Steep recurring pricing tiers per connected laptop, phone, or IoT node",
  },
  {
    criterion: "NOC + SOC Convergence",
    sub: "Automated threat response latency",
    janusPrimary: "Direct Hardware Containment (< 1.4s)",
    janusSecondary: "Instant correlation between SIEM alerts and physical switch port quarantine",
    legacyPrimary: "Disconnected Security Silos",
    legacySecondary: "Manual ticket creation between security analysts and network engineers",
  },
  {
    criterion: "Multi-Vendor Compatibility",
    sub: "Heterogeneous network infrastructure",
    janusPrimary: "Universal Standards (RADIUS, SNMP, CLI)",
    janusSecondary: "Works seamlessly across Cisco, Aruba, Juniper, and generic managed switches",
    legacyPrimary: "Vendor Lock-In Architecture",
    legacySecondary: "Requires expensive proprietary hardware linecards and manufacturer lock-in",
  },
  {
    criterion: "Enclave & Defense Compliance",
    sub: "Air-gapped and military certifications",
    janusPrimary: "Military & SCADA Enclave Ready",
    janusSecondary: "Built specifically for isolated networks, critical infrastructure, and SCADA",
    legacyPrimary: "Cloud-Dependent Compliance Fails",
    legacySecondary: "Requires continuous outbound internet access, violating strict air-gap compliance",
  },
];

export default function NacProductPage() {
  const [activeTab, setActiveTab] = useState<string>("enforcement");

  const currentTab = NAC_TABS.find((t) => t.id === activeTab) || NAC_TABS[0];

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
              Air-Gapped{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                NAC
              </span>
              :<br />
              Port-Level Control, Zero Cloud
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
              Govern physical switch ports and wireless segments without external cloud brokers, recurring agent friction, or per-endpoint license penalties.
            </p>

            {/* Two Standardized CTA Action Cards */}
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
            {/* 1. Background Window: NAC Port Admission Table */}
            <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#140b1a]/95 rounded-2xl border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#190e22] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span className="font-mono text-[11px] text-white/60">
                    Switch: CORE-SW-DIST-01 · 802.1X/MAB Active · Port Security Enforced
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Table & Detail Drawer Layout */}
              <div className="flex-1 flex overflow-hidden">
                {/* Switch Port Records Table */}
                <div className="flex-1 p-3.5 space-y-2 font-mono text-[10px] text-white/60 overflow-hidden">
                  <div className="grid grid-cols-12 pb-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
                    <span className="col-span-3">Port</span>
                    <span className="col-span-4">Device Identity</span>
                    <span className="col-span-3">Auth Method</span>
                    <span className="col-span-2 text-right">Status</span>
                  </div>

                  {[
                    { p: "Gi1/0/12", d: "SEC-WS-088", m: "802.1X (EAP)", s: "Admitted", sc: "text-emerald-400" },
                    { p: "Gi1/0/18", d: "CAM-NORTH-04", m: "MAB (OUI)", s: "Admitted", sc: "text-blue-400" },
                    { p: "Gi1/0/24", d: "SCADA-PLC-NODE-4", m: "802.1X Cert", s: "Production", sc: "text-purple-300" },
                    { p: "Gi1/0/25", d: "ROGUE_LAPTOP", m: "Unknown MAC", s: "Quarantine", sc: "text-red-400" },
                    { p: "Gi1/0/26", d: "PRINTER-DEPT-3", m: "MAB Bypass", s: "VLAN 40", sc: "text-white/70" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 py-1 items-center border-b border-white/5">
                      <span className="col-span-3 text-purple-300 font-semibold">{row.p}</span>
                      <span className="col-span-4 truncate text-white/80">{row.d}</span>
                      <span className="col-span-3 text-white/50">{row.m}</span>
                      <span className={`col-span-2 text-right font-semibold ${row.sc}`}>{row.s}</span>
                    </div>
                  ))}
                </div>

                {/* Right Detail Drawer */}
                <div className="w-36 bg-[#100715] border-l border-white/10 p-3 flex flex-col justify-between font-mono text-[9px] text-white/60">
                  <div className="space-y-2">
                    <div className="text-purple-400 uppercase font-semibold text-[8px] tracking-wider">Admission Context</div>
                    <div>Port: <span className="text-white">Gi1/0/25</span></div>
                    <div>MAC: <span className="text-purple-300">48:D7:05:99</span></div>
                    <div>VLAN: <span className="text-red-400">999 (Quarantine)</span></div>
                    <div>State: <span className="text-red-400">Traffic Denied</span></div>
                    <div>Radius: <span className="text-white">RFC 3576 CoA</span></div>
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

            {/* 2. Top-Left Floating Window: Port Quarantine Dialog */}
            <div className="absolute left-0 top-0 w-[72%] sm:w-[66%] bg-[#170e20] rounded-xl border border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-red-500 flex items-center justify-center text-[10px] text-white font-bold">
                    !
                  </span>
                  <span className="font-semibold text-xs text-white">Dynamic Port Quarantine</span>
                </div>
                <span className="text-white/40 hover:text-white cursor-pointer text-sm leading-none">×</span>
              </div>

              {/* Form Body */}
              <div className="space-y-2 text-[10px]">
                <div className="text-white/60">
                  Target switch interface on <strong className="text-white font-medium">CORE-SW-DIST-01</strong>
                </div>

                <div className="p-1.5 rounded bg-black/50 border border-purple-500/40 font-mono text-[9px] text-purple-200 flex items-center justify-between">
                  <span>GigabitEthernet 1/0/25 [ROGUE_HARDWARE]</span>
                  <span className="text-purple-400">▼</span>
                </div>

                <div className="space-y-1">
                  <div className="text-white/50 text-[9px]">Enforcement action</div>
                  <div className="p-1.5 rounded bg-black/50 border border-white/10 font-mono text-[9px] text-red-300">
                    Reassign to VLAN 999 (Isolation) + RADIUS CoA Bounce
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="p-1 rounded bg-black/40 border border-white/10 text-white/40 text-[9px]">
                    protocol: RFC 3576
                  </div>
                  <div className="p-1 rounded bg-black/40 border border-white/10 text-emerald-400 text-[9px]">
                    latency: 1.32s
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button className="px-2.5 py-1 rounded text-white/50 hover:text-white text-[10px]">
                    Dismiss
                  </button>
                  <button className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-medium text-[10px] shadow-sm">
                    Isolate Port
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom-Left Small Metric Capsule */}
            <div className="absolute -bottom-3 left-4 bg-[#14081c]/95 border border-purple-500/40 px-4 py-2.5 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] backdrop-blur-md z-30 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-[11px] font-mono text-white/80">
                Layer 2 Enforcement: <span className="text-purple-300 font-semibold">100% Deterministic</span>
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
              Measurable Access Control Without Cloud Compromise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Air-Gapped RADIUS
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                100%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Zero cloud identity egress. Authentication policies and employee credentials execute strictly on-premise.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Quarantine Velocity
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 1.4s
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Instant dynamic VLAN reassignment or port shutdown via SNMP write and RADIUS CoA (RFC 3576).
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Hardware Compatibility
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                100%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Universal 802.1X and MAB interoperability across Cisco, Aruba, Juniper, and generic managed switches.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Predictable Economics
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                0 Endpoint Tax
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Zero per-endpoint license taxes or recurring penalties. Scale laptops, cameras, and IoT with zero cost anxiety.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Air-Gapped NAC Tabbed Capability Showcase */}
      <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Air-Gapped NAC:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Port-Level Control, Zero Cloud
              </span>
            </h2>
            <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
              Explore how JANUS combines local 802.1X authentication, multi-attribute Layer 2 profiling, and unified NOC+SOC hardware containment into a sovereign access control platform.
            </p>
          </div>

          {/* Interactive 3-Tab Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
            {NAC_TABS.map((tab) => {
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
                    janus-nac-radius --enforce --l2-port-security
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  POLICY ACTIVE
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm text-purple-200/90 leading-relaxed overflow-x-auto whitespace-pre bg-black/50 flex-1 flex flex-col justify-center">
                {currentTab.codeSnippet}
              </div>

              {/* Footer Bar */}
              <div className="p-6 bg-[#160b1b] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="text-white/60">
                  Identity Store: <span className="text-white font-medium">Local Air-Gapped RADIUS</span>
                </div>
                <div className="text-purple-300">
                  Switch Control: <span className="font-bold">SNMP / Bridge-MIB Native</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Access Control Grid */}
      <section
        id="architecture"
        className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-theme-gradient-b border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Access Control at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Authenticate, Profile, and Enforce at Wire Speed
              </span>
            </h2>
            <h3 className="text-xl sm:text-2xl font-light text-purple-300 mt-5 leading-snug">
              Maintain sovereign admission policies — completely air-gapped and on-premise
            </h3>
            <p className="text-base sm:text-lg text-white/75 font-light mt-4 leading-relaxed max-w-4xl">
              Enforce role-based access control and security segmentation without transmitting employee credentials, internal MAC registries, or network topologies to third-party identity clouds. JANUS processes authentication requests, credential checks, and policy rules entirely within your private boundary, meeting strict air-gap compliance and zero-egress operational mandates.
            </p>
          </div>

          {/* 5 Pillars Cards */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {NAC_PILLARS.map((pillar, idx) => (
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
                  <span>JANUS NAC ENGINE</span>
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
              Why Sovereign Air-Gapped NAC{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Wins
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
              Compare JANUS with conventional cloud-brokered identity tools across compliance, physical switch port control, and licensing.
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
                          <span>JANUS NAC</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                          AIR-GAPPED
                        </span>
                      </div>
                    </th>
                    <th className="py-6 px-6 sm:px-8 text-white/50 font-medium text-sm sm:text-base w-[32%]">
                      Cloud-Brokered Identity NAC
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
            Ready to Lock Down Your Network at Wire Speed?
          </h2>

          <p className="text-lg sm:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule an on-premise Proof-of-Concept demonstration on your hardware. Experience 802.1X enforcement,
            Layer 2 switch port isolation, and zero cloud dependency.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:contact@janus-defense.com?subject=Air-Gapped%20NAC%20POC%20Request"
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
