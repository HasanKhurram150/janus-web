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

const DLP_TABS: TabData[] = [
  {
    id: "inspection",
    title: "Realize authoritative data loss prevention without external inspection pipelines",
    shortTitle: "Continuous Inspection",
    description:
      "JANUS Data Loss Prevention (DLP) delivers comprehensive content inspection, data flow tracking, and egress policy enforcement directly inside your private operational perimeter. Deployed 100% on-premise on standard Ubuntu Server, JANUS inspects sensitive data states across endpoints, network boundaries, and internal transfers without routing cleartext, hashes, or documents through third-party multi-tenant clouds. Operating under a flat licensing model, security teams can enforce data security policies across every host, share, and subnet without per-user, per-GB, or per-document licensing fees.",
    bullets: [
      "100% on-premise inspection of sensitive data across endpoints, network boundaries, and file transfers",
      "Zero transmission of cleartext documents, hashes, or regex dictionaries to third-party multi-tenant clouds",
      "Flat predictable licensing eliminating per-user, per-GB, and per-document subscription fees",
      "Continuous protection across data at rest, data in motion, and data in use across every host and subnet",
    ],
    metrics: {
      label: "CLOUD EXPOSURE RISK",
      value: "0.00%",
      sub: "Strict sovereign compliance • Zero content or telemetry egresses the private perimeter",
    },
    codeSnippet: `// JANUS Sovereign DLP Inspection Engine
[Policy: SENSITIVE-ASSET-PROTECTION | Status: ACTIVE]
  ↳ Scanning Mode      : 100% Local Kernel & Network Intercept
  ↳ Inspection Payload : In-Memory Deterministic Regex & Entropy Sweep
  ↳ Cloud Relay Sync   : DISABLED [0.00 KB/s Egress]
  ↳ Scanned Host Count : 1,420 Endpoints & Subnets
  ↳ Licensing Overhead : $0.00 [Flat Enterprise Model - No Per-GB Tax]
  ✓ State: Deterministic Egress Protection Online`,
  },
  {
    id: "correlation",
    title: "Empower policy precision with content and network correlation",
    shortTitle: "Content & Network Context",
    description:
      "Unlike standalone DLP agents that operate in isolation or blind cloud CASBs that miss physical egress paths, JANUS couples deep content inspection with native Layer 2 and network context. Identifying sensitive assets—such as source code repositories, sovereign identity registries, defense schematics, and financial records—is tied directly to user sessions, host processes, IP assignments, and physical switch ports. Security analysts can distinguish between authorized localized data synchronization and an active exfiltration attempt over an unapproved egress interface.",
    bullets: [
      "Deep content inspection coupled directly with native Layer 2 switch ports and process context",
      "Deterministic classification for source code, sovereign registries, defense schematics, and financial data",
      "Distinguish authorized localized data synchronization from active exfiltration across rogue interfaces",
      "Continuous process tree tracing linking host binaries directly to destination IPs and physical ports",
    ],
    metrics: {
      label: "CONTEXT ACCURACY",
      value: "100%",
      sub: "Physical switch port, process tree, and user session unified in every policy match",
    },
    codeSnippet: `// Unified Content & Physical Network Trace
[Exfiltration Alert: SENSITIVE-REPO-EXFIL | Host: DEV-WS-104]
  ↳ Detected Asset     : Cryptographic Key Pair (.pem signature)
  ↳ Launching Process  : /usr/bin/scp [PID: 19842 | Parent: bash]
  ↳ User Session       : operator.adm (UID 1004)
  ↳ Physical Port      : CORE-SW-04:Gi1/0/22 [VLAN 40: SECURE_DEV]
  ↳ Egress Destination : 192.168.100.85 (Unauthorized Subnet Interface)
  ✓ Correlated Origin  : Port Gi1/0/22 -> Process 19842 Verified`,
  },
  {
    id: "containment",
    title: "Fuel NOC + SOC convergence with coordinated exfiltration containment",
    shortTitle: "Coordinated Containment",
    description:
      "Eliminate the gap between detecting a policy violation and neutralizing the data leak. Because JANUS unifies DLP rules with native Endpoint monitoring, SIEM correlation, and hardware-level NAC, an unauthorized data movement event does not simply generate an isolated ticket. When an exfiltration threshold is crossed, JANUS can terminate the offending transfer, isolate the host process, and coordinate with the network layer to quarantine the physical switch port or revoke network access immediately.",
    bullets: [
      "Instant NOC + SOC convergence: bridge exfiltration detection directly to hardware-level enforcement",
      "Automated host process termination and active file transfer blocking at the kernel level",
      "Direct coordination with integrated NAC to quarantine physical switch ports and drop VLAN access",
      "Revoke active user sessions and trigger automated incident workbench forensics in under 1.2s",
    ],
    metrics: {
      label: "CONTAINMENT SPEED",
      value: "< 1.2s",
      sub: "Automated host process termination and physical switch port quarantine",
    },
    codeSnippet: `// Coordinated NOC + SOC Containment Pipeline
[Remediation Trigger: EXFIL-DEFENSE-ACTIVE | Incident: INC-DLP-904]
  ↳ Action 1 : Kernel Transfer Intercept -> Terminated Transfer [0.08s]
  ↳ Action 2 : Terminated Rogue Process Tree PID 19842 [0.15s]
  ↳ Action 3 : Disabled Unauthorized Mass Storage Interface (/dev/sdb1)
  ↳ Action 4 : Switch Port Quarantine -> CORE-SW-04:Gi1/0/22 [ADMIN DOWN]
  ↳ Action 5 : Revoked Active Kerberos/Radius Session for operator.adm
  ✓ Threat Neutralized: Exfiltration Halted Before Data Egress [1.14s Total]`,
  },
];

const DEFENSE_PILLARS = [
  {
    title: "Keep 100% of your data inspection inside your network",
    description:
      "Inspect sensitive files, policies, and violation logs without uploading them to external vendor clouds. Your proprietary information stays completely inside your private perimeter.",
    highlight: "100% On-Premise",
  },
  {
    title: "Block unauthorized USB drives and network transfers",
    description:
      "Stop data theft across physical and digital channels. JANUS restricts unapproved USB storage devices, blocks suspicious network uploads, and halts sensitive file copying.",
    highlight: "Multi-Channel Protection",
  },
  {
    title: "Classify confidential documents automatically",
    description:
      "Instantly recognize financial records, customer identities, secret keys, and confidential markers. Accurate rule matching catches sensitive files before they can leave.",
    highlight: "Automatic Classification",
  },
  {
    title: "Track complete chain of custody for every file",
    description:
      "See who accessed a sensitive document, which app opened it, and where it was sent. Your team gets a complete, easy-to-read timeline for every data movement.",
    highlight: "Full Custody History",
  },
  {
    title: "Spot insider threats and suspicious bulk downloads",
    description:
      "Detect abnormal employee actions before damage is done. JANUS flags mass file renaming, after-hours downloads, and unauthorized archive creation immediately.",
    highlight: "Insider Risk Alerts",
  },
  {
    title: "Stop data exfiltration with immediate port isolation",
    description:
      "When an unauthorized data leak is detected, JANUS stops it on the spot. It cancels the transfer, blocks the USB port, and cuts network access at the switch port in seconds.",
    highlight: "Instant Containment",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Content & Telemetry Data Residency",
    sub: "Data leakage & corporate intellectual property exposure",
    janusPrimary: "100% On-Premise Local Custody",
    janusSecondary: "Zero cloud egress. File inspection, regex dictionaries, hashes, and violation telemetry stay strictly within your private perimeter.",
    legacyPrimary: "Mandatory Multi-Tenant Cloud SaaS",
    legacySecondary: "Uploads sensitive file hashes, text fragments, and telemetry to vendor cloud infrastructure for inspection and analysis.",
  },
  {
    criterion: "Pricing Model & Data Volume Taxes",
    sub: "Scale data protection without subscription penalties",
    janusPrimary: "Flat Enterprise Licensing",
    janusSecondary: "Inspect all endpoints, network shares, and internal subnets with zero per-GB inspection taxes, per-user fees, or file count caps.",
    legacyPrimary: "Per-User / Per-GB Surcharges",
    legacySecondary: "Escalating bandwidth and per-seat fees that penalize continuous inspection, forcing teams to whitelist high-volume shares.",
  },
  {
    criterion: "Physical Infrastructure & Switch Port Correlation",
    sub: "Pinpointing the physical origin of exfiltration attempts",
    janusPrimary: "Native Layer 2 Port & Host Attribution",
    janusSecondary: "Every DLP breach is immediately correlated with the physical switch port, VLAN, process tree, and user session.",
    legacyPrimary: "Disconnected Host-Only Agents",
    legacySecondary: "Operates in isolation with zero Layer 2 physical visibility, blind to unmanaged bridge interfaces or physical egress channels.",
  },
  {
    criterion: "Hardware-Level Exfiltration Quarantine",
    sub: "Instant remediation before bytes leave the perimeter",
    janusPrimary: "Immediate Process Kill & Port Drop via NAC",
    janusSecondary: "Automated kernel-level transfer termination, USB peripheral lockdown, and physical switch port quarantine in under 1.2s.",
    legacyPrimary: "Passive Alerts & Slow Cloud Tickets",
    legacySecondary: "Generates an asynchronous ticket or alert in a cloud dashboard, leaving data in-transit until manual intervention occurs.",
  },
  {
    criterion: "Proprietary Signature & Regex Privacy",
    sub: "Confidentiality of custom classification rules",
    janusPrimary: "Confidential Local Dictionaries",
    janusSecondary: "Custom national security regex rules, proprietary code signatures, and internal patterns remain strictly offline and private.",
    legacyPrimary: "Cloud-Synced Dictionaries",
    legacySecondary: "Forces custom detection patterns and sensitive keyword dictionaries to be synced and stored on vendor cloud servers.",
  },
  {
    criterion: "Air-Gapped Operational Autonomy",
    sub: "Defense-grade and isolated sovereign enclaves",
    janusPrimary: "100% Autonomous Air-Gapped Execution",
    janusSecondary: "Functions completely offline with full scanning, behavioral heuristics, and containment capabilities intact.",
    legacyPrimary: "Cloud Connectivity Dependency",
    legacySecondary: "Agent policies degrade or fail entirely when disconnected from central vendor cloud management consoles.",
  },
];

export default function DlpPage() {
  const [activeTab, setActiveTab] = useState<string>("inspection");

  const currentTab = DLP_TABS.find((t) => t.id === activeTab) || DLP_TABS[0];

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
              Sovereign{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                DLP
              </span>
              :<br />
              Neutralize Data Theft at Machine Speed
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
              Comprehensive content inspection, data flow tracking, and egress policy enforcement directly inside your private operational perimeter with zero cloud pipelines.
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
            {/* 1. Background Window: Authoritative DLP Inspection & Egress Console */}
            <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#140b1a]/95 rounded-2xl border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#190e22] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span className="font-mono text-[11px] text-white/60">
                    DLP Exfiltration Monitor · Live Host & Network Egress
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Table & Host Context Drawer */}
              <div className="flex-1 flex overflow-hidden">
                {/* DLP Violations Table */}
                <div className="flex-1 p-3.5 space-y-2 font-mono text-[10px] text-white/60 overflow-hidden">
                  <div className="grid grid-cols-12 pb-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
                    <span className="col-span-4">Asset / Target</span>
                    <span className="col-span-3">Vector / Channel</span>
                    <span className="col-span-2">Match</span>
                    <span className="col-span-3 text-right">Action</span>
                  </div>

                  {[
                    { asset: "id_rsa_prod_master", ch: "SCP (192.168.10.45)", m: "RSA Key", act: "Blocked", ac: "text-red-400" },
                    { asset: "customer_registry.csv", ch: "USB (Kingston 64G)", m: "Luhn / CC", act: "Quarantined", ac: "text-red-400" },
                    { asset: "core_architecture.pdf", ch: "SMB File Share", m: "SECRET Marker", act: "Audited", ac: "text-amber-400" },
                    { asset: "api_tokens_env.sh", ch: "Clipboard Copy", m: "Bearer Token", act: "Interrupted", ac: "text-red-400" },
                    { asset: "defense_spec_v3.dwg", ch: "Print / Spool", m: "Confidential", act: "Hold Review", ac: "text-purple-300" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 py-1 items-center border-b border-white/5">
                      <span className="col-span-4 text-purple-300 font-semibold truncate">{row.asset}</span>
                      <span className="col-span-3 truncate text-white/80">{row.ch}</span>
                      <span className="col-span-2 text-white/50">{row.m}</span>
                      <span className={`col-span-3 text-right font-semibold ${row.ac}`}>{row.act}</span>
                    </div>
                  ))}
                </div>

                {/* Right Physical Context Drawer */}
                <div className="w-36 bg-[#100715] border-l border-white/10 p-3 flex flex-col justify-between font-mono text-[9px] text-white/60">
                  <div className="space-y-2">
                    <div className="text-purple-400 uppercase font-semibold text-[8px] tracking-wider">Hardware Context</div>
                    <div>Host: <span className="text-white">DEV-WS-104</span></div>
                    <div>Port: <span className="text-emerald-400">Gi1/0/22</span></div>
                    <div>Process: <span className="text-purple-300">scp (PID 19842)</span></div>
                    <div>Isolation: <span className="text-red-400 font-bold">NAC Port Drop</span></div>
                    <div>Cloud Leak: <span className="text-emerald-400 font-bold">0.00%</span></div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[8px]">
                      Inspection: Flat $0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Top-Left Floating Window: Exfiltration Interception Alert Card */}
            <div className="absolute left-0 top-0 w-[82%] sm:w-[76%] bg-[#1a0e24]/95 rounded-xl border border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span className="font-semibold text-white text-[11px]">
                    Exfiltration Blocked: DEV-WS-104
                  </span>
                </div>
                <span className="font-mono text-[9px] text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                  Transfer Terminated
                </span>
              </div>

              <div className="py-2 space-y-1 font-mono text-[10px] text-white/70">
                <div className="flex justify-between">
                  <span>Target: <strong className="text-white">id_rsa_prod_master.pem</strong></span>
                  <span>Match: <strong className="text-purple-300">RSA Private Key</strong></span>
                </div>
                <div className="text-[9px] text-purple-300/80 truncate">
                  Vector: SCP transfer attempt to unapproved egress IP 192.168.100.85
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Kernel Intercept: 0.08s</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-2 py-1 rounded bg-red-600/80 hover:bg-red-500 text-white font-medium text-[9px] shadow-sm">
                    Isolate Port
                  </button>
                  <button className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-[9px] shadow-sm">
                    Forensic Trace
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom-Left Floating Window: NOC + SOC Hardware Attribution */}
            <div className="absolute left-2 sm:left-4 bottom-2 w-[74%] sm:w-[68%] bg-[#110717] rounded-xl border border-purple-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3.5 z-30 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-semibold text-xs text-white">NOC + SOC Port Quarantine</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-white/50">Containment: 1.14s</span>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[10px] text-white/70">
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">Hardware Switch Port:</span>
                  <span className="text-emerald-400 font-semibold">CORE-SW-04:Gi1/0/22</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">Quarantine Action:</span>
                  <span className="text-purple-300 font-semibold">Physical Port Admin Down</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Measurable Exfiltration Defense (4 Metric Cards) */}
      <section id="outcomes" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-y border-white/10 bg-[#160b1b]/60">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-light text-white">
              Measurable Exfiltration Defense Without Cloud Pipelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Sovereign Data Custody
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                100%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Air-gapped on-premise inspection with zero cleartext files, hashes, or regex dictionaries sent to clouds.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Data Volume Inspection Tax
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                $0.00
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Flat enterprise licensing eliminating per-user, per-GB, and recurring per-document SaaS fees.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Policy Enforcement
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 500ms
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Deterministic regex, Luhn algorithms, and signature scanning across endpoints and network shares.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Hardware Isolation
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 1.2s
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Instant coordinated containment: host process kill and physical switch port quarantine via NAC.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Data Protection at Your Fingertips (Tabbed Capability Showcase) */}
      <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Data Protection at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Classify, Track, and Secure at Machine Speed
              </span>
            </h2>
            <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
              Explore how JANUS combines 100% on-premise content inspection, Layer 2 network and process correlation, and automated hardware-level containment into a sovereign DLP platform.
            </p>
          </div>

          {/* Interactive 3-Tab Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
            {DLP_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-purple-900/30 border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.25)] text-white"
                      : "bg-white/[0.03] border-white/10 hover:border-purple-400/20 text-white/70 hover:text-white"
                  }`}
                >
                  <div className="font-semibold text-base sm:text-lg mb-1 flex items-center justify-between">
                    <span>{tab.shortTitle}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />}
                  </div>
                  <div className="text-xs sm:text-sm text-white/50 font-light line-clamp-2">
                    {tab.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#23142e] to-[#170c1e] border border-purple-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Explanatory Content & Bullets */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4 leading-snug">
                  {currentTab.title}
                </h3>
                <p className="text-base text-white/70 font-light leading-relaxed mb-6">
                  {currentTab.description}
                </p>

                <div className="space-y-3 mb-8 w-full">
                  {currentTab.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-purple-300 text-xs">✓</span>
                      </div>
                      <span className="text-sm text-white/80 font-light leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Micro Metric Banner */}
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between w-full">
                  <div>
                    <div className="font-mono text-xs text-purple-300 uppercase tracking-wider">
                      {currentTab.metrics.label}
                    </div>
                    <div className="text-xs text-white/50 font-light mt-0.5">
                      {currentTab.metrics.sub}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {currentTab.metrics.value}
                  </div>
                </div>
              </div>

              {/* Right Column: Code / Terminal Inspection Window */}
              <div className="lg:col-span-5 w-full">
                <div className="rounded-2xl bg-[#110717] border border-purple-500/30 shadow-2xl overflow-hidden text-left font-mono">
                  {/* Window Bar */}
                  <div className="px-4 py-3 bg-[#180a22] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      <span className="text-xs text-white/60">janus-dlp-engine.log</span>
                    </div>
                    <span className="text-[10px] text-purple-300 uppercase tracking-wider bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/20">
                      DLP Engine
                    </span>
                  </div>
                  {/* Code Body */}
                  <pre className="p-5 text-xs text-purple-200/90 leading-relaxed overflow-x-auto whitespace-pre font-mono">
                    <code>{currentTab.codeSnippet}</code>
                  </pre>
                  {/* Status Footer */}
                  <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                    <span>Egress Intercept: Active</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Sovereign Content Inspection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Deterministic Data Loss Prevention Pillars Grid (6 Pillars) */}
      <section id="architecture" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-[#14081c]/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Data Loss Prevention at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Detect, Block, and Contain Data Leaks in Real Time
              </span>
            </h2>
            <h3 className="text-xl sm:text-2xl font-light text-purple-300 mt-5 leading-snug">
              Protect sensitive company data — 100% on-premise with zero cloud leaks
            </h3>
            <p className="text-base sm:text-lg text-white/75 font-light mt-4 leading-relaxed max-w-4xl">
              Stop unauthorized data sharing across USB drives, networks, and applications. JANUS inspects and protects your confidential files locally without uploading a single document or pattern to external clouds.
            </p>
          </div>

          {/* 6-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DEFENSE_PILLARS.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-center justify-end mb-4">
                  <span className="font-mono text-xs text-white/30">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-purple-200 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Why Sovereign DLP Wins (Comparison Table) (Commented Out) */}
      {/*
      <section id="comparison" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
              Why Sovereign DLP{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Wins
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
              Compare JANUS with cloud CASBs and standalone DLP agents across sensitive data residency, per-GB inspection taxes, physical network correlation, and offline containment.
            </p>
          </div>

          <div className="rounded-3xl bg-[#14081c]/90 border border-white/10 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-light border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="py-6 px-6 sm:px-8 text-white/50 font-mono text-xs uppercase tracking-wider w-[30%]">
                      Criterion &amp; Architecture
                    </th>
                    <th className="py-6 px-6 sm:px-8 text-white font-semibold text-base sm:text-lg w-[35%] bg-purple-900/20 border-x border-purple-500/20">
                      <div className="flex items-center justify-between">
                        <span>JANUS Data Loss Prevention</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                          Air-Gapped
                        </span>
                      </div>
                    </th>
                    <th className="py-6 px-6 sm:px-8 text-white/60 font-medium text-base sm:text-lg w-[35%]">
                      Cloud CASBs &amp; Standalone DLP Agents
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-6 px-6 sm:px-8 align-top">
                        <div className="text-white font-medium text-base mb-1">
                          {row.criterion}
                        </div>
                        <div className="text-xs text-white/50 font-mono">
                          {row.sub}
                        </div>
                      </td>
                      <td className="py-6 px-6 sm:px-8 align-top bg-purple-900/10 border-x border-purple-500/20">
                        <div className="text-purple-300 font-semibold text-sm mb-1 flex items-center gap-2">
                          <span>✓</span>
                          <span>{row.janusPrimary}</span>
                        </div>
                        <div className="text-xs text-white/80 font-light leading-relaxed">
                          {row.janusSecondary}
                        </div>
                      </td>
                      <td className="py-6 px-6 sm:px-8 align-top text-white/60">
                        <div className="text-white/80 font-medium text-sm mb-1 flex items-center gap-2">
                          <span className="text-red-400/80">✗</span>
                          <span>{row.legacyPrimary}</span>
                        </div>
                        <div className="text-xs text-white/50 font-light leading-relaxed">
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

      {/* Section 6: Direct Lab Deployment CTA */}
      <section id="poc" className="w-full py-24 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-theme-gradient-b text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-bold px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 inline-block mb-6">
            Deployment &amp; PoC
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Stop Exfiltration on Sovereign Hardware
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Deploy JANUS DLP in under two hours across any Linux or Windows workstation fleet without cloud agents or telemetry leakage.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#overview"
              className="px-9 py-4 rounded-full bg-white text-janus-bg font-mono text-xs font-bold uppercase tracking-widest hover:bg-purple-100 transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              Deploy on Ubuntu Server
            </a>
            <a
              href="#capabilities"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Schedule Technical Walkthrough
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
