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

const SEC_OPS_TABS: TabData[] = [
  {
    id: "visibility",
    badge: "DATA INGESTION & SCALE",
    title: "Realize comprehensive visibility",
    shortTitle: "Comprehensive Ingestion",
    description:
      "JANUS SIEM delivers total operational visibility by ingesting, parsing, and indexing high-throughput telemetry across your physical and digital estate. Deployed fully on-premise on standard Ubuntu Server, JANUS handles RFC 3164/5424 syslog, SNMP polling, and bidirectional flow data with zero phone-home telemetry. With flat licensing and no EPS or GB-per-day penalties, security teams can ingest high-verbosity logs from every router, firewall, switch port, and endpoint without calculating consumption costs.",
    bullets: [
      "RFC 3164 and RFC 5424 syslog listener with multi-threaded parser",
      "Native SNMP v2c/v3 polling and asynchronous trap collector",
      "Zero phone-home telemetry — strictly air-gapped data retention",
      "Flat predictable licensing with zero EPS or GB/day volume penalties",
    ],
    metrics: {
      label: "PEAK INGESTION CAPACITY",
      value: "150,000+ EPS",
      sub: "Zero packet loss • Local NVMe indexed ring buffer",
    },
    codeSnippet: `// JANUS Air-Gapped Ingestion Pipeline
[Syslog Listener: UDP/514, TCP/6514 TLS]
  ↳ Multi-Threaded RFC 5424 Deserializer
  ↳ Local Geo/Entity Parser (Offline MaxMind DB)
  ↳ Zero-Egress In-Memory Ring Buffer
  ↳ NVMe Columnar Indexer (AES-256 GCM at rest)
  ✓ Cloud Telemetry Leak: 0.00% [Strict Air-Gap Verified]`,
  },
  {
    id: "detection",
    badge: "L2/L3 TOPOLOGY CORRELATION",
    title: "Empower accurate detection with physical and network context",
    shortTitle: "L2 Context Correlation",
    description:
      "Unlike disconnected SIEMs that treat alerts as isolated text strings, JANUS bridges log analysis directly with native Layer 2 switch polling and IPAM. An alert does not just reveal an IP—it pinpoints the host's MAC address, VLAN, and physical switch port. By combining deterministic threat heuristics with real-time entity tracking, JANUS surfaces actionable incidents while suppressing noise.",
    bullets: [
      "Instant MAC-to-Switch-Port physical pinpointing (e.g. SW-CORE-01 / Gi1/0/24)",
      "Automated IPAM entity binding across dynamic DHCP and static subnets",
      "Deterministic heuristics mapped to MITRE ATT&CK enterprise matrix",
      "> 92.4% alert noise reduction via physical infrastructure contextualization",
    ],
    metrics: {
      label: "FALSE POSITIVE REDUCTION",
      value: "92.4%",
      sub: "Physical topology context filters unverified network alerts",
    },
    codeSnippet: `// Host Entity Resolution & Physical Pinpoint
Target IP:      10.240.14.88
MAC Address:    00:1A:2B:3C:4D:5E [Intel NIC]
VLAN ID:        120 [CRITICAL_SCADA_OPS]
Switch ID:      CORE-SW-DIST-01 (10.240.0.1)
Physical Port:  GigabitEthernet 1/0/24 [TRUNKED]
Threat Score:   CRITICAL (Score: 94) - Rogue DHCP ACK & ARP Poisoning`,
  },
  {
    id: "efficiency",
    badge: "CONVERGED NOC + SOC OPERATIONS",
    title: "Fuel operational efficiency with converged NOC + SOC defense",
    shortTitle: "Converged NOC+SOC Defense",
    description:
      "Unify syslog collection, flow monitoring, behavioral analytics, and incident containment within a single, self-contained architecture. Move instantly from detection to remediation through integrated SOAR capabilities, cutting out the friction of toggling between disconnected monitoring consoles.",
    bullets: [
      "Unified operational telemetry: Network health + Security events in one screen",
      "Integrated SOAR playbooks for instant Layer 2 hardware port isolation",
      "Automated firewall ACL generation and temporary IP quarantine",
      "Zero swivel-chair latency between detection, triage, and mitigation",
    ],
    metrics: {
      label: "MEAN TIME TO REMEDIATION",
      value: "< 2.4s",
      sub: "Direct hardware port shutdown without third-party cloud brokers",
    },
    codeSnippet: `// Automated Hardware-Layer Containment Playbook
Trigger: Incident #JAN-9812 (Active Lateral Movement Detected)
[Step 1] Verify physical port: CORE-SW-DIST-01:Gi1/0/24
[Step 2] Send SNMP Set / SSH Command: "shutdown interface Gi1/0/24"
[Step 3] Apply Firewall ACL: "deny ip host 10.240.14.88 any"
[Step 4] Broadcast Incident Notification to SOC Duty Channel
Result: Host fully isolated at Layer 2 in 1.84s (Zero Packet Egress)`,
  },
];

const DETECTION_PILLARS = [
  {
    title: "Use deterministic, framework-aligned detections",
    description:
      "JANUS correlates incoming syslog and network telemetry against dynamic signature rulebases and deterministic heuristics mapped systematically to the MITRE ATT&CK framework. Detect brute-force credential attacks, abnormal administrative sessions (RDP/SSH), rogue Layer 2 changes, and volumetric DoS spikes with zero reliance on opaque, resource-heavy machine-learning nodes.",
    highlight: "MITRE ATT&CK Heuristics",
    badge: "FRAMEWORK HEURISTICS",
  },
  {
    title: "Bridge detection engineering directly to physical infrastructure",
    description:
      "Track adversarial techniques (TTPs) across both network traffic and physical access boundaries. Correlate host activity with network topology to identify lateral movement, unapproved listening ports, or rogue hardware insertions before threats expand across subnets.",
    highlight: "MITRE ATT&CK L2/L3 Correlation",
    badge: "TOPOLOGY INTELLIGENCE",
  },
  {
    title: "Harness unified entity aggregation and rapid triage",
    description:
      "Automatically consolidate related operational anomalies, flow spikes, and security events around specific network entities. An analyst can review a consolidated incident profile—linking the timeline of events, bidirectional traffic volume, and endpoint process triggers—in a single view to eliminate alert fatigue.",
    highlight: "Single-Pane Entity Profile",
    badge: "ZERO ALERT FATIGUE",
  },
  {
    title: "Prioritize focus with root-cause attribution",
    description:
      "Instead of overwhelming analysts with hundreds of disconnected interface or authentication alerts, JANUS ties multi-source events back to the responsible IP and switch interface. Teams immediately identify whether an alert stems from an operational misconfiguration, an internal exfiltration attempt, or an external exploit.",
    highlight: "Root-Cause Attribution Engine",
    badge: "ROOT-CAUSE ATTRIBUTION",
  },
  {
    title: "Execute direct, immediate containment",
    description:
      "Eliminate delay between triage and response. Trigger one-click containment actions directly from the platform—initiating firewall IP quarantines or tracing the physical port for immediate Layer 2 network isolation. JANUS ensures that incident response is executed directly at the hardware layer, right where your network lives.",
    highlight: "Sub-2.5s Port Shutdown",
    badge: "HARDWARE-LAYER SOAR",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Data Residency & Air-Gap",
    sub: "Data leakage & sovereign perimeter control",
    janusPrimary: "100% On-Premise Execution",
    janusSecondary: "Strict 0.00% cloud phone-home; air-gapped data retention",
    legacyPrimary: "Mandatory Cloud Streaming",
    legacySecondary: "Telemetry exported to external SaaS servers; internet dependent",
  },
  {
    criterion: "Licensing & Ingestion Costs",
    sub: "Predictable scaling without volume penalties",
    janusPrimary: "Flat Predictable Licensing",
    janusSecondary: "Zero EPS limits, zero GB/day penalties, and zero overage taxes",
    legacyPrimary: "Variable Consumption Tax",
    legacySecondary: "Per-GB/day or EPS billing; volume spikes trigger steep budget penalties",
  },
  {
    criterion: "Physical L2 Switch Port Attribution",
    sub: "Hardware correlation & topology mapping",
    janusPrimary: "Native L2 Switch & Port Pinpoint",
    janusSecondary: "Instant MAC, Switch ID, VLAN & physical interface resolution (e.g. Gi1/0/24)",
    legacyPrimary: "Disconnected Text Log Parsing",
    legacySecondary: "Alerts treated as isolated text strings; zero native physical port visibility",
  },
  {
    criterion: "Remediation Velocity",
    sub: "Mean time to threat containment",
    janusPrimary: "Direct Hardware Port Shutdown (< 2.4s)",
    janusSecondary: "Automated Layer 2 port isolation and local firewall IP quarantine via SOAR",
    legacyPrimary: "Delayed External Webhooks",
    legacySecondary: "Manual ticket creation or cloud webhook brokers with minutes of lag",
  },
  {
    criterion: "Host Infrastructure",
    sub: "Hardware footprint & deployment complexity",
    janusPrimary: "Standard Ubuntu Server (Bare-Metal/VM)",
    janusSecondary: "Lightweight single-server architecture; runs on commodity NVMe hardware",
    legacyPrimary: "Massive Multi-Node Clusters",
    legacySecondary: "Complex multi-tenant clusters requiring heavy maintenance & broker nodes",
  },
  {
    criterion: "Enclave & Defense Compliance",
    sub: "Air-gapped and military certifications",
    janusPrimary: "Military & SCADA Enclave Ready",
    janusSecondary: "Built specifically for isolated networks, critical infrastructure, and SCADA",
    legacyPrimary: "Cloud-Dependent Compliance Fails",
    legacySecondary: "Requires persistent telemetry egress, violating strict air-gap compliance",
  },
];

export default function SiemProductPage() {
  const [activeTab, setActiveTab] = useState<string>("visibility");

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

  const currentTab = SEC_OPS_TABS.find((t) => t.id === activeTab) || SEC_OPS_TABS[0];

  return (
    <div className="relative w-full min-h-screen text-white flex flex-col items-center overflow-x-clip bg-janus-bg">
        {/* Main Sticky Navbar */}
        <Navbar />

        {/* Hero Section (Splunk Enterprise Security Essentials Style) */}
        {/* Hero Section (Splunk-Style Layout with Deep Purple JANUS Theme) */}
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
               The industry-standard<br />
                <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  SIEM
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
                Gain comprehensive visibility, accurate detections, and operational efficiency across your security operations.
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
              {/* 1. Background Window: Main Investigation Table */}
              <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#140b1a]/95 rounded-2xl border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
                {/* Window Header */}
                <div className="px-4 py-3 bg-[#190e22] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span className="font-mono text-[11px] text-white/60">
                      All incident rules · previous 7 days · for system: scada-network
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                  </div>
                </div>

                {/* Table & Detail Drawer Layout */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Incident Table */}
                  <div className="flex-1 p-3.5 space-y-2 font-mono text-[10px] text-white/60 overflow-hidden">
                    <div className="grid grid-cols-12 pb-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
                      <span className="col-span-3">Time</span>
                      <span className="col-span-4">Incident Name</span>
                      <span className="col-span-3">Host Entity</span>
                      <span className="col-span-2 text-right">Severity</span>
                    </div>

                    {[
                      { t: "15:28:44", n: "MITRE T1078 RDP Brute", h: "10.240.14.88", s: "Critical", sc: "text-red-400" },
                      { t: "15:28:41", n: "ARP Gateway Spoof", h: "192.168.10.45", s: "High", sc: "text-orange-400" },
                      { t: "15:28:39", n: "Catalyst Link Up/Down", h: "10.200.4.12", s: "Info", sc: "text-blue-400" },
                      { t: "15:28:35", n: "Rogue Hardware Insert", h: "172.16.8.190", s: "Critical", sc: "text-red-400" },
                      { t: "15:28:30", n: "NetFlow Peak 1.42M", h: "10.100.2.1", s: "Notice", sc: "text-emerald-400" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-12 py-1 items-center border-b border-white/5">
                        <span className="col-span-3 text-white/40">{row.t}</span>
                        <span className="col-span-4 truncate text-white/80">{row.n}</span>
                        <span className="col-span-3 font-semibold text-purple-300">{row.h}</span>
                        <span className={`col-span-2 text-right font-semibold ${row.sc}`}>{row.s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right Detail Drawer */}
                  <div className="w-36 bg-[#100715] border-l border-white/10 p-3 flex flex-col justify-between font-mono text-[9px] text-white/60">
                    <div className="space-y-2">
                      <div className="text-purple-400 uppercase font-semibold text-[8px] tracking-wider">Entity Context</div>
                      <div>IP: <span className="text-white">10.240.14.88</span></div>
                      <div>Switch: <span className="text-white">CORE-SW-01</span></div>
                      <div>Port: <span className="text-emerald-400">Gi1/0/24</span></div>
                      <div>MAC: <span className="text-white">00:1A:2B:3C</span></div>
                      <div>Status: <span className="text-red-400">Quarantined</span></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Right Expand Button */}
                <div className="absolute bottom-3 right-3">
                  <div className="p-1.5 rounded-lg bg-white/10 border border-white/20 text-white/70 hover:text-white transition-colors cursor-pointer shadow-md">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. Top-Left Floating Window: "Run action" Dialog */}
              <div className="absolute left-0 top-0 w-[72%] sm:w-[66%] bg-[#170e20] rounded-xl border border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">
                      ✓
                    </span>
                    <span className="font-semibold text-xs text-white">Run action</span>
                  </div>
                  <span className="text-white/40 hover:text-white cursor-pointer text-sm leading-none">×</span>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-4 text-[10px] font-mono border-b border-white/10 pb-1.5 mb-2.5 text-white/50">
                  <span className="text-purple-300 font-semibold border-b border-purple-400 pb-1">By connection</span>
                  <span className="hover:text-white cursor-pointer">By action</span>
                </div>

                {/* Form Body */}
                <div className="space-y-2 text-[10px]">
                  <div className="text-white/60">
                    Configure detonate on <strong className="text-white font-medium">JANUS Attack Analyzer</strong> for SOAR
                  </div>

                  <div className="p-1.5 rounded bg-black/50 border border-purple-500/40 font-mono text-[9px] text-purple-200 flex items-center justify-between">
                    <span>janus_attack_analyzer</span>
                    <span className="text-purple-400">▼</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-white/50 text-[9px]">url (*)</div>
                    <div className="p-1.5 rounded bg-black/50 border border-white/10 font-mono text-[9px] text-purple-200">
                      http://45.220.1.75/update.exe
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <div className="p-1 rounded bg-black/40 border border-white/10 text-white/40 text-[9px]">
                      job_id
                    </div>
                    <div className="p-1 rounded bg-black/40 border border-white/10 text-white/40 text-[9px]">
                      profile: default
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                    <button className="px-2.5 py-1 rounded text-white/50 hover:text-white text-[10px]">
                      Cancel
                    </button>
                    <button className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-[10px] shadow-sm">
                      Run action
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Bottom-Left Floating Window: "Overview" Timeline Chart */}
              <div className="absolute left-2 sm:left-4 bottom-2 w-[74%] sm:w-[68%] bg-[#110717] rounded-xl border border-purple-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3.5 z-30 text-white font-sans text-xs backdrop-blur-md">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-xs text-white">Overview</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-white/50">Live Incident Timeline</span>
                  </div>
                </div>

                {/* Timeline Graph Canvas */}
                <div className="relative pl-6 pr-8 pb-4 pt-1">
                  {/* Y-Axis Labels */}
                  <div className="absolute left-0 top-0 bottom-4 flex flex-col justify-between text-[8px] font-mono text-white/40 select-none">
                    <span>90</span>
                    <span>70</span>
                    <span>50</span>
                    <span>30</span>
                    <span>0</span>
                  </div>

                  {/* Graph Grid & Horizontal Stacked Attack Phase Pills */}
                  <div className="space-y-2 border-l border-b border-white/10 pl-2 pb-1 relative">
                    {/* Vertical guideline */}
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-purple-400/30 border-dashed" />

                    <div className="flex items-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e53935] text-white text-[9px] font-medium shadow-sm truncate max-w-[200px]">
                        Initial access via phishing...
                      </span>
                    </div>

                    <div className="flex items-center pl-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#d81b60] text-white text-[9px] font-medium shadow-sm truncate max-w-[200px]">
                        Possible Exploitation of Public...
                      </span>
                    </div>

                    <div className="flex items-center pl-8">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f4511e] text-white text-[9px] font-medium shadow-sm truncate max-w-[200px]">
                        Command and Control via Ext...
                      </span>
                    </div>

                    <div className="flex items-center pl-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#fb8c00] text-white text-[9px] font-medium shadow-sm truncate max-w-[200px]">
                        Command and Control via Ext...
                      </span>
                    </div>
                  </div>

                  {/* X-Axis Timestamps */}
                  <div className="flex justify-between text-[8px] font-mono text-white/40 pt-1.5 select-none pl-2">
                    <span>12:00</span>
                    <span>16:00</span>
                    <span>20:00</span>
                    <span>00:00</span>
                    <span>04:00</span>
                    <span>08:00</span>
                    <span>12:00</span>
                  </div>

                  {/* Floating Zoom Toolbar on the right */}
                  <div className="absolute right-1 top-6 flex flex-col rounded-lg bg-white/10 border border-white/20 text-white/60 overflow-hidden shadow-md text-[10px]">
                    <button className="px-1.5 py-1 hover:text-white hover:bg-white/10 transition-colors">+</button>
                    <div className="h-px bg-white/10" />
                    <button className="px-1.5 py-1 hover:text-white hover:bg-white/10 transition-colors">-</button>
                    <div className="h-px bg-white/10" />
                    <button className="px-1.5 py-1 hover:text-white hover:bg-white/10 transition-colors">⛶</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Splunk-Style Eyebrow Outcome Metric Cards */}
        <section id="outcomes" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-y border-white/10 bg-[#160b1b]/60">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-4xl font-light text-white">
                Measurable Security ROI Without Cloud Compromise
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
                  Physical Precision
                </div>
                <div className="text-5xl font-light text-emerald-400 tracking-tight mb-3">
                  92.4%
                </div>
                <div className="text-sm text-white/70 font-light leading-relaxed">
                  False-positive noise suppressed through direct Layer 2 switch port and IPAM correlation.
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                  Remediation Velocity
                </div>
                <div className="text-5xl font-light text-purple-300 tracking-tight mb-3">
                  &lt; 2.4s
                </div>
                <div className="text-sm text-white/70 font-light leading-relaxed">
                  Mean time from detection to hardware switch port shutdown via integrated SOAR playbooks.
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                  Predictable Economics
                </div>
                <div className="text-5xl font-light text-white tracking-tight mb-3">
                  0 EPS
                </div>
                <div className="text-sm text-white/70 font-light leading-relaxed">
                  Zero volume penalties or GB-per-day overage taxes. Log every port with zero financial anxiety.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: "Sovereign Telemetry at Your Fingertips" Tabbed Capability Showcase */}
        <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-4xl mb-16">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
                Sovereign Telemetry at Your Fingertips:{" "}
                <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  Total Visibility, Zero Cloud Exposure
                </span>
              </h2>
              <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
                Explore how JANUS combines telemetry ingestion, physical network topology, and automated
                SOAR playbooks into a single air-gapped security platform.
              </p>
            </div>

            {/* Interactive 3-Tab Selector with the 3 Headings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
              {SEC_OPS_TABS.map((tab, idx) => {
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
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500" />
                    )}
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold ${
                            isActive ? "text-purple-300" : "text-white/40 group-hover:text-white/60"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_#c084fc]" />
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
              {/* Left Column: Detailed Description (Unboxed without container outline) */}
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
                    <div className="text-xs text-white/50 mt-1">
                      {currentTab.metrics.sub}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <svg className="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Code & Architecture Visualizer */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl bg-[#120818] border border-white/10 overflow-hidden shadow-2xl">
                {/* Console Window Header */}
                <div className="px-6 py-4 bg-[#180c20] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-3 font-mono text-xs text-white/60">
                      janus-telemetry-engine // {currentTab.id}.log
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STREAM ACTIVE
                  </span>
                </div>

                {/* Code Terminal Body */}
                <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm text-purple-200/90 leading-relaxed overflow-x-auto whitespace-pre font-mono bg-black/50 flex-1 flex flex-col justify-center">
                  <code>{currentTab.codeSnippet}</code>
                </div>

                {/* Interactive Action Footer */}
                <div className="p-6 bg-[#160b1b] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <span className="text-white/60">
                    Engine Version: <strong className="text-white">JANUS v4.2.0-SOVEREIGN</strong>
                  </span>
                  <button
                    onClick={() => {
                      const nextIndex =
                        (SEC_OPS_TABS.findIndex((t) => t.id === activeTab) + 1) % SEC_OPS_TABS.length;
                      setActiveTab(SEC_OPS_TABS[nextIndex].id);
                    }}
                    className="text-purple-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next capability</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Analytics at Your Fingertips & Detection Engine Grid */}
        <section
          id="architecture"
          className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-theme-gradient-b border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-4xl mb-16">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
                Analytics at Your Fingertips:{" "}
                <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  Monitor, Detect, and Investigate Threats at Wire Speed
                </span>
              </h2>
              <h3 className="text-xl sm:text-2xl font-light text-purple-300 mt-5 leading-snug">
                Gain rapid insights from your data — completely air-gapped and on-premise
              </h3>
              <p className="text-base sm:text-lg text-white/75 font-light mt-4 leading-relaxed max-w-4xl">
                Unify data management for security practitioners to provide centralized internal data visibility, access,
                and analysis without sending a single byte outside your perimeter. Control the flow of security
                telemetry to satisfy strict regulatory standards, defense-grade compliance, and air-gapped operational
                requirements without performance compromises or cloud egress costs.
              </p>
            </div>

            {/* 5 Pillars Equal-Sized Cards */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {DETECTION_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] p-8 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-center justify-end mb-6">
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

        {/* Section 5: Sovereign SIEM vs Cloud SIEM Comparison (Commented Out) */}
        {/*
        <section id="comparison" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mb-16 text-center mx-auto">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
                Why Sovereign Air-Gapped SIEM{" "}
                <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  Wins
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/60 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
                Compare JANUS with conventional cloud-dependent SIEMs across compliance, cost, and hardware-level response capabilities.
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
                      <th className="py-6 px-6 sm:px-8 text-white w-[40%] bg-purple-950/50 border-x border-purple-500/30">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-sans text-base font-semibold text-white tracking-normal">
                              JANUS Air-Gapped SIEM
                            </div>
                            <div className="text-[11px] font-mono text-purple-300/80 font-normal mt-0.5">
                              Converged NOC + SOC Platform
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                            Sovereign Standard
                          </span>
                        </div>
                      </th>
                      <th className="py-6 px-6 sm:px-8 text-white/50 w-[30%]">
                        <div>
                          <div className="font-sans text-base font-normal text-white/70 tracking-normal">
                            Legacy / Cloud SIEMs
                          </div>
                          <div className="text-[11px] font-mono text-white/40 font-normal mt-0.5">
                            SaaS & Multi-Tenant Platforms
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="py-5 px-6 sm:px-8">
                          <div>
                            <div className="text-white font-medium text-sm sm:text-base">
                              {row.criterion}
                            </div>
                            <div className="text-xs text-white/40 font-light mt-0.5">
                              {row.sub}
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6 sm:px-8 bg-purple-950/25 border-x border-purple-500/25">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-purple-500/30 text-purple-200 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 border border-purple-400/40 shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                              ✓
                            </span>
                            <div>
                              <div className="text-purple-100 font-medium text-sm sm:text-base">
                                {row.janusPrimary}
                              </div>
                              <div className="text-xs text-purple-300/70 font-light mt-0.5 leading-relaxed">
                                {row.janusSecondary}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6 sm:px-8">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-white/5 text-white/40 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 border border-white/10">
                              ✕
                            </span>
                            <div>
                              <div className="text-white/70 text-sm sm:text-base font-light">
                                {row.legacyPrimary}
                              </div>
                              <div className="text-xs text-white/35 font-light mt-0.5 leading-relaxed">
                                {row.legacySecondary}
                              </div>
                            </div>
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
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-bold px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 inline-block mb-6">
              Evaluation &amp; Deployment
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Ready to modernize your SOC with <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">Enterprise SIEM</span>?
            </h2>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Experience petabyte-scale streaming analytics, instant compliance posture, and zero per-gigabyte ingestion fees.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#overview"
                className="px-9 py-4 rounded-full bg-white text-janus-bg font-mono text-xs font-bold uppercase tracking-widest hover:bg-purple-100 transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
              >
                Schedule Air-Gapped POC →
              </a>
              <Link
                href="/services"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                View All 9 Capabilities
              </Link>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>
  );
}
