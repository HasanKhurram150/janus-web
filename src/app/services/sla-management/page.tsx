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

const SLA_TABS: TabData[] = [
  {
    id: "visibility",
    title: "Realize deterministic SLA visibility without disconnected spreadsheets or SaaS portals",
    shortTitle: "Deterministic SLA Tracking",
    description:
      "JANUS SLA Management delivers continuous, empirical tracking of internal and vendor service-level agreements directly within your private network boundary. Deployed 100% on-premise on standard Ubuntu Server, JANUS continuously monitors uptime, operational availability, link latency, and service responsiveness across your critical infrastructure, network links, and digital services. Operating under a flat licensing model with zero cloud dependencies, it eliminates recurring SaaS monitoring subscriptions and third-party access to proprietary service performance metrics.",
    bullets: [
      "100% on-premise SLA calculation with zero cloud egress or external SaaS portal dependencies",
      "Continuous tracking of critical circuit latency, jitter, packet loss, and service availability",
      "Flat predictable licensing eliminating per-probe, per-check, and per-endpoint subscription fees",
      "Unified operational dashboards spanning bare-metal servers, network switches, and vendor WAN links",
    ],
    metrics: {
      label: "DATA LEAKAGE RISK",
      value: "0.00%",
      sub: "Strict air-gap compliance • Proprietary uptime metrics remain strictly on-premise",
    },
    codeSnippet: `// JANUS Sovereign SLA Calculation Pipeline
[Service: CORE-BGP-TRANSIT | Target: 99.99% Availability]
  ↳ Measurement Interval: 1.0s Continuous Synthetic Probing
  ↳ Evaluation Window   : Rolling 30 Days (720 Hours)
  ↳ Total Uptime Logged : 719h 56m 12s [99.991% Actual Uptime]
  ↳ Cloud Portal Sync   : BLOCKED [0.00 KB/s Egress]
  ↳ Total SaaS Licensing Surcharges: $0.00 [Flat Enterprise Model]
  ✓ Service Compliance Status: MET (Error Budget: 3m 48s Remaining)`,
  },
  {
    id: "telemetry",
    title: "Empower operational accuracy with converged physical and telemetry validation",
    shortTitle: "Physical & Telemetry Validation",
    description:
      "Unlike standalone ticketing or SLA dashboards that rely on manually logged incident timestamps, JANUS calculates service availability using live, objective machine telemetry. Synthetic network probing, ICMP reachability sweeps, SNMP interface metrics, and application port health checks automatically feed into real-time uptime calculations. Network and operations teams gain indisputable, hardware-validated proof of whether an SLA breach is caused by external ISP link degradation, hardware failure, or localized server downtime.",
    bullets: [
      "Objective empirical validation using ICMP, SNMP, and synthetic application port probes",
      "Direct correlation with live Layer 2 switch port telemetry and hardware interface status",
      "Eliminate subjective dispute cycles with carrier ISPs through indisputable machine logs",
      "Granular millisecond-precision tracking of latency spikes, jitter, and packet drop ratios",
    ],
    metrics: {
      label: "PROBE RESOLUTION",
      value: "< 1.0s",
      sub: "Sub-second synthetic validation across all monitored service endpoints",
    },
    codeSnippet: `// Converged Physical Telemetry Verification
[Degradation Alert: SCADA-GATEWAY-01 | Latency Spike > 65ms]
  ↳ Synthetic Probe Target: 10.10.1.1:443 (HTTPS Check)
  ↳ Physical Port Binding : CORE-SW-01:Gi1/0/1 [VLAN 10: WAN_EDGE]
  ↳ Hardware SNMP Query   : Interface Gi1/0/1 Drops: 0 (No local errors)
  ↳ Traceroute Analysis   : Hop 3 (ISP Gateway 198.51.100.1) Flapping
  ✓ Hardware Root Cause Confirmed: Carrier ISP Transit Congestion [< 420ms]`,
  },
  {
    id: "convergence",
    title: "Fuel NOC + Management convergence within a single unified console",
    shortTitle: "NOC + Management Convergence",
    description:
      "Eliminate the dispute cycle between IT operations, engineering teams, and executive management. Because JANUS links SLA compliance directly with its native IPAM discovery, SIEM alert timeline, and switch-port topology, any dip below agreed service thresholds is immediately correlated with the exact underlying root-cause event—whether it was an unmanaged port shutdown, an ISP transit flap, or an unauthorized configuration change.",
    bullets: [
      "Instant correlation linking SLA dips to SIEM alerts, IPAM states, and switch interface flaps",
      "Automated root-cause timeline uniting executive compliance curves with technical logs",
      "Actionable MTTR metrics to challenge unfair third-party telecom carrier penalties",
      "Immediate operational remediation: redirect traffic or engage vendors before end-user impact",
    ],
    metrics: {
      label: "ROOT-CAUSE TIME",
      value: "< 500ms",
      sub: "From SLA threshold breach to physical switch port & event correlation",
    },
    codeSnippet: `// Unified NOC + Executive Root-Cause Trace
[Incident Ticket: INC-SLA-084 | Target: ENTERPRISE-AUTH-SERVICE]
  ↳ Outage Duration : 2m 14s (Breach Threshold: 5m 00s)
  ↳ Correlated SIEM : CFG-CHANGE-ADMIN on CORE-SW-DIST-01
  ↳ Physical Port   : CORE-SW-DIST-01:Gi1/0/18 (Admin Down Event)
  ↳ Remediation     : Port Interface Re-enabled via One-Click CLI Write
  ↳ MTTR Logged     : 2m 14s [Immutable Regulatory Audit Record Saved]
  ✓ SLA Availability Preserved: 99.95% [Compliant]`,
  },
];

const DEFENSE_PILLARS = [
  {
    title: "Maintain sovereign compliance records — completely air-gapped and on-premise",
    description:
      "Audit infrastructure availability, vendor commitments, and operational response times without sending internal uptime statistics, circuit details, or partner performance metrics to external clouds. JANUS stores, calculates, and exports all SLA records locally, satisfying rigorous compliance audits, internal governance, and sovereign air-gap mandates.",
    highlight: "100% Air-Gapped Compliance",
  },
  {
    title: "Track multi-tier SLA commitments with objective telemetry",
    description:
      "Define and monitor granular operational thresholds tailored to specific business tiers: automatically measure continuous uptime percentages (e.g., 99.9% to 99.999%) across core routers and servers, track latency, jitter, and packet loss baselines across WAN circuits, and periodically validate essential network services (DNS, NTP, HTTPS, LDAP).",
    highlight: "Multi-Tier Telemetry",
  },
  {
    title: "Eliminate false-positive penalties with intelligent maintenance scheduling",
    description:
      "Protect SLA scores from distortions during authorized change windows. JANUS allows operators to schedule planned maintenance windows that temporarily pause breach alarms and uptime deductions for designated nodes, ports, or subnets, preserving clean, audit-ready reporting.",
    highlight: "Maintenance Window Intelligence",
  },
  {
    title: "Harness unified error budgeting and breach alerting",
    description:
      "Prevent unexpected end-of-month SLA failures through continuous error budget tracking. JANUS calculates remaining allowable downtime across active measurement windows, issuing automated threshold warnings when sustained latency or intermittent packet loss threatens to exhaust SLA allowances.",
    highlight: "Dynamic Error Budgeting",
  },
  {
    title: "Prioritize accountability with immutable audit trails and reporting",
    description:
      "Generate verifiable uptime reports for internal leadership, compliance auditors, or third-party telecom providers. Historical performance curves, incident onset timestamps, and precise time-to-recovery (MTTR) metrics provide transparent documentation to challenge unfair third-party carrier SLAs or demonstrate compliance with regulatory standards.",
    highlight: "Immutable Audit Trails & MTTR",
  },
  {
    title: "Bridge performance degradation directly to operational remediation",
    description:
      "Turn performance dips into immediate tactical responses. When an SLA metric breaches defined risk margins, JANUS immediately points operators to the physical switch interface, IP address, and associated system alerts, allowing engineers to redirect traffic, isolate degraded routes, or engage vendors before end-users experience service interruption.",
    highlight: "Hardware Root-Cause Link",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "SLA & Telemetry Data Residency",
    sub: "Data leakage & corporate uptime confidentiality",
    janusPrimary: "100% On-Premise Local Custody",
    janusSecondary: "Zero cloud egress. Circuit configurations, downtime metrics, and partner SLA compliance data stay strictly local.",
    legacyPrimary: "Mandatory Multi-Tenant Cloud SaaS",
    legacySecondary: "Streams internal infrastructure uptime, circuit endpoints, and network latency records to third-party vendor clouds.",
  },
  {
    criterion: "Pricing Model & Probe Frequency Taxes",
    sub: "Scale service verification without subscription penalties",
    janusPrimary: "Flat Predictable Licensing",
    janusSecondary: "Perform sub-second synthetic checks across thousands of internal endpoints without per-probe or per-check surcharges.",
    legacyPrimary: "Per-Check / Per-Endpoint Surcharges",
    legacySecondary: "Escalating subscription tiers that penalize high-frequency polling, forcing teams to throttle check intervals to 5+ minutes.",
  },
  {
    criterion: "Physical Infrastructure & Switch Port Correlation",
    sub: "Pinpointing the hardware origin of service dips",
    janusPrimary: "Native Switch Port & IPAM Binding",
    janusSecondary: "Every SLA breach is instantly correlated with physical switch interfaces, SNMP error counts, and ISP transit links.",
    legacyPrimary: "Disconnected Black-Box Pingers",
    legacySecondary: "Only reports that an IP is down; incapable of identifying whether failure is local switch, cabling, or remote ISP carrier.",
  },
  {
    criterion: "Intelligent Maintenance & Error Budgeting",
    sub: "Clean audit compliance without false penalties",
    janusPrimary: "Granular Window Exclusions & Error Budgets",
    janusSecondary: "Automates planned maintenance exclusions and tracks dynamic error budgets to prevent end-of-month surprises.",
    legacyPrimary: "Static All-or-Nothing Alerting",
    legacySecondary: "Scheduled maintenance pollutes uptime reports or requires manual post-hoc spreadsheet recalculations.",
  },
  {
    criterion: "Auditing Rigor & MTTR Precision",
    sub: "Carrier disputes and regulatory compliance",
    janusPrimary: "Immutable Millisecond-Resolution Telemetry",
    janusSecondary: "Produces defensible, machine-validated audit trails to hold carrier ISPs accountable and prove SLA compliance.",
    legacyPrimary: "Coarse-Grained Polling Averages",
    legacySecondary: "Low-resolution 5-minute sampling intervals easily disputed by external telecom providers during SLA penalty reviews.",
  },
  {
    criterion: "Offline Operational Autonomy",
    sub: "Air-gapped and sovereign enclave deployment",
    janusPrimary: "100% Standalone On-Premise Execution",
    janusSecondary: "Fully operational within sovereign, defense-grade, and isolated critical infrastructure enclaves with zero internet access.",
    legacyPrimary: "Mandatory SaaS Portal Dependency",
    legacySecondary: "Dashboards and alerting fail completely if external internet connectivity or vendor cloud portals go offline.",
  },
];

export default function SlaManagementPage() {
  const [activeTab, setActiveTab] = useState<string>("visibility");

  const currentTab = SLA_TABS.find((t) => t.id === activeTab) || SLA_TABS[0];

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
                SLA Management
              </span>
              :<br />
              Empirical Truth, Zero Cloud
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
              Continuous, empirical tracking of internal and vendor service-level agreements directly within your private network boundary with zero SaaS portals.
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
            {/* 1. Background Window: Authoritative SLA Assurance Console & Matrix */}
            <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#140b1a]/95 rounded-2xl border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#190e22] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span className="font-mono text-[11px] text-white/60">
                    Service SLA Matrix · 30-Day Window · 12 Circuits Monitored
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Table & Host Context Drawer */}
              <div className="flex-1 flex overflow-hidden">
                {/* Service SLA Records Table */}
                <div className="flex-1 p-3.5 space-y-2 font-mono text-[10px] text-white/60 overflow-hidden">
                  <div className="grid grid-cols-12 pb-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
                    <span className="col-span-4">Service / Circuit</span>
                    <span className="col-span-3">Target / Actual</span>
                    <span className="col-span-2">Latency</span>
                    <span className="col-span-3 text-right">Status</span>
                  </div>

                  {[
                    { svc: "CORE-BGP-TRANSIT-1", s: "99.99% / 99.995%", lat: "4.2ms", st: "Compliant", sc: "text-emerald-400" },
                    { svc: "PRIMARY-LDAP-AUTH", s: "99.90% / 99.940%", lat: "1.8ms", st: "Compliant", sc: "text-emerald-400" },
                    { svc: "SCADA-GATEWAY-EDGE", s: "99.95% / 99.720%", lat: "68ms", st: "Breach Risk", sc: "text-red-400" },
                    { svc: "ENTERPRISE-DNS-RES", s: "99.99% / 100.00%", lat: "0.9ms", st: "Compliant", sc: "text-emerald-400" },
                    { svc: "BRANCH-VPN-TUNNEL-4", s: "99.50% / 99.810%", lat: "14ms", st: "Compliant", sc: "text-blue-400" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 py-1 items-center border-b border-white/5">
                      <span className="col-span-4 text-purple-300 font-semibold truncate">{row.svc}</span>
                      <span className="col-span-3 truncate text-white/80">{row.s}</span>
                      <span className="col-span-2 text-white/50">{row.lat}</span>
                      <span className={`col-span-3 text-right font-semibold ${row.sc}`}>{row.st}</span>
                    </div>
                  ))}
                </div>

                {/* Right Physical Context Drawer */}
                <div className="w-36 bg-[#100715] border-l border-white/10 p-3 flex flex-col justify-between font-mono text-[9px] text-white/60">
                  <div className="space-y-2">
                    <div className="text-purple-400 uppercase font-semibold text-[8px] tracking-wider">Circuit Attribution</div>
                    <div>Target: <span className="text-white">10.10.1.1</span></div>
                    <div>Port: <span className="text-emerald-400">Gi1/0/1</span></div>
                    <div>Circuit: <span className="text-purple-300">T1-FIBER-88</span></div>
                    <div>MTTR: <span className="text-white">4m 12s</span></div>
                    <div>Cloud Leak: <span className="text-emerald-400 font-bold">0.00% [Strict]</span></div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[8px]">
                      SaaS Cost: $0.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Top-Left Floating Window: Error Budget & Breach Alert Card */}
            <div className="absolute left-0 top-0 w-[82%] sm:w-[76%] bg-[#1a0e24]/95 rounded-xl border border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span className="font-semibold text-white text-[11px]">
                    SLA Warning: SCADA-GATEWAY-EDGE
                  </span>
                </div>
                <span className="font-mono text-[9px] text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                  Budget: 18m 42s left
                </span>
              </div>

              <div className="py-2 space-y-1 font-mono text-[10px] text-white/70">
                <div className="flex justify-between">
                  <span>Target SLA: <strong className="text-white">99.95%</strong></span>
                  <span>Current Uptime: <strong className="text-amber-300">99.72%</strong></span>
                </div>
                <div className="text-[9px] text-purple-300/80 truncate">
                  Cause: Sustained carrier latency spike &gt; 45ms on transit circuit
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Interface: CORE-SW-01:Gi1/0/1 Bound</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-2 py-1 rounded bg-red-600/80 hover:bg-red-500 text-white font-medium text-[9px] shadow-sm">
                    Route Failover
                  </button>
                  <button className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-[9px] shadow-sm">
                    Exclude Window
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom-Left Floating Window: NOC + Management Root-Cause Attribution */}
            <div className="absolute left-2 sm:left-4 bottom-2 w-[74%] sm:w-[68%] bg-[#110717] rounded-xl border border-purple-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3.5 z-30 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-semibold text-xs text-white">NOC Root-Cause Attribution</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-white/50">Probe Resolution: 1.0s</span>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[10px] text-white/70">
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">Hardware Validation:</span>
                  <span className="text-emerald-400 font-semibold">ICMP + SNMP Verified</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">Underlying Trigger:</span>
                  <span className="text-purple-300 font-semibold">Carrier BGP Hop Latency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Measurable Service Assurance Without SaaS Portals (4 Metric Cards) */}
      <section id="outcomes" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-y border-white/10 bg-[#160b1b]/60">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-light text-white">
              Measurable Service Assurance Without SaaS Portals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Compliance Data Custody
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                100%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Air-gapped on-premise SLA records with zero performance metrics or circuit logs sent to SaaS clouds.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                SaaS Subscription Tax
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                $0.00
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Flat enterprise licensing eliminating per-probe, per-check, and recurring portal subscription fees.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Probe Resolution
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 1.0s
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Synthetic ICMP, SNMP, and application port probes continuously validate real service availability.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Root-Cause Attribution
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 500ms
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Instant correlation linking SLA degradation directly to physical switch interfaces and ISP transit.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Service Assurance at Your Fingertips (Tabbed Capability Showcase) */}
      <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Service Assurance at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Measure, Audit, and Guarantee at Wire Speed
              </span>
            </h2>
            <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
              Explore how JANUS combines continuous empirical SLA tracking, live physical telemetry validation, and unified NOC+Management correlation into a sovereign service assurance platform.
            </p>
          </div>

          {/* Interactive 3-Tab Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
            {SLA_TABS.map((tab) => {
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
                      <span className="text-xs text-white/60">janus-sla-engine.log</span>
                    </div>
                    <span className="text-[10px] text-purple-300 uppercase tracking-wider bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/20">
                      SLA Engine
                    </span>
                  </div>
                  {/* Code Body */}
                  <pre className="p-5 text-xs text-purple-200/90 leading-relaxed overflow-x-auto whitespace-pre font-mono">
                    <code>{currentTab.codeSnippet}</code>
                  </pre>
                  {/* Status Footer */}
                  <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                    <span>SLA Probe Engine: Active</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Objective Machine Telemetry
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Deterministic Service Assurance Pillars Grid (6 Pillars) */}
      <section id="architecture" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-[#14081c]/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Deterministic Service Assurance Pillars
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 leading-relaxed">
              Six core operational capabilities engineered for absolute SLA custody, empirical telemetry validation, and rapid infrastructure remediation.
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

      {/* Section 5: Why Sovereign Service Assurance Wins (Comparison Table) (Commented Out) */}
      {/*
      <section id="comparison" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
              Why Sovereign Service Assurance{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Wins
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
              Compare JANUS with cloud-dependent uptime SaaS portals across performance data custody, probe frequency taxes, physical network attribution, and offline resilience.
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
                        <span>JANUS SLA Management</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                          Air-Gapped
                        </span>
                      </div>
                    </th>
                    <th className="py-6 px-6 sm:px-8 text-white/60 font-medium text-base sm:text-lg w-[35%]">
                      Cloud-Brokered Uptime SaaS (Datadog / Pingdom)
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Empirical SLA Auditing on Sovereign Hardware
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy local active probe synthetic testing across your air-gapped data centers in hours. Continuous mathematical truth, zero telemetry leak.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
