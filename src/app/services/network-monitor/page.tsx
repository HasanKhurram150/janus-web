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

const NETWORK_TABS: TabData[] = [
  {
    id: "observability",
    title: "Realize full-stack network observability without node taxes or cloud polling",
    shortTitle: "Full-Stack Observability",
    description:
      "JANUS Network Monitor delivers continuous, high-fidelity visibility into your physical switches, routers, firewalls, and network links directly within your private operational boundary. Deployed 100% on-premise on standard Ubuntu Server, JANUS continuously monitors interface states, link throughput, hardware vitals, and traffic health without sending topology data or device telemetry to external SaaS vendors. Operating under a flat licensing model, network teams can monitor every switch port, trunk link, and edge gateway across the entire estate without per-sensor or per-node billing penalties.",
    bullets: [
      "100% on-premise SNMP polling, packet analysis, and state collection with zero cloud reliance",
      "Continuous monitoring of interface throughput, CRC errors, chassis temperatures, and CPU load",
      "Flat licensing model eliminating recurring per-port, per-sensor, and per-node subscription fees",
      "Deep coverage across physical switches, distribution routers, firewalls, and campus trunk links",
    ],
    metrics: {
      label: "CLOUD POLLING RISK",
      value: "0.00%",
      sub: "Strict sovereign compliance • Zero topology schemas or metrics egress the perimeter",
    },
    codeSnippet: `// JANUS Sovereign Fabric Polling Pipeline
[Device: CORE-SW-DIST-01 | Model: Catalyst 9300 | OS: Cisco IOS-XE]
  ↳ Polling Engine     : 100% Local SNMPv3 Engine (AuthPriv: AES-256)
  ↳ Interfaces Polled  : 48 Physical Ports + 4 10G SFP+ Uplinks
  ↳ Polling Frequency  : Sub-Second Synthetic Health + 5s Interface Counters
  ↳ Cloud SaaS Sync    : BLOCKED [0.00 KB/s Egress]
  ↳ Total Node Taxes   : $0.00 [Flat Enterprise Model]
  ✓ State: Deterministic Fabric Telemetry Online`,
  },
  {
    id: "topology",
    title: "Empower operational accuracy with native Layer 2 topology and hardware context",
    shortTitle: "Layer 2 & Hardware Context",
    description:
      "Unlike disconnected network monitoring tools that only display isolated ping charts, JANUS integrates network health directly with its authoritative IPAM and Layer 2 switch polling. Every monitored interface is automatically correlated with its connected MAC addresses, assigned VLANs, active IP leases, and peer switch interconnections via standard SNMP (v1/v2c/v3) and Bridge-MIB/LLDP discovery. Engineers gain instant, actionable insight into exactly which downstream hosts and services are impacted when an interface experiences errors or link saturation.",
    bullets: [
      "Automated Layer 2 correlation linking switch interfaces directly to MACs, VLANs, and active IP leases",
      "Real-time Bridge-MIB and LLDP discovery for deterministic multi-hop physical topology maps",
      "Instant blast-radius analysis showing impacted downstream workloads during interface saturation",
      "Multi-vendor MIB support across Cisco, Juniper, Aruba, Fortinet, and enterprise switching hardware",
    ],
    metrics: {
      label: "TOPOLOGY RESOLUTION",
      value: "100%",
      sub: "Hardware-verified port-to-host and trunk topology mapping",
    },
    codeSnippet: `// Converged Physical Layer 2 Topology Correlation
[Interface Degradation: CORE-SW-DIST-01:Gi1/0/24 | Type: Trunk]
  ↳ Peer Switch Link   : EDGE-SW-ACC-03:Gi1/0/48 (LLDP Confirmed)
  ↳ Bound VLANs        : 10 (PROD), 20 (DB), 40 (SECURE_DEV)
  ↳ Connected Downstream: 28 Active Hosts [Audited via Bridge-MIB]
  ↳ Error Signature    : 142 FCS/CRC Errors/sec (Bad SFP/Duplex Mismatch)
  ✓ Blast Radius       : 28 Hosts / 3 Critical Services Identified [< 350ms]`,
  },
  {
    id: "convergence",
    title: "Fuel NOC + SOC convergence within a single operational console",
    shortTitle: "NOC + SOC Convergence",
    description:
      "Break down the divide between infrastructure availability and threat detection. Because JANUS unifies network monitoring with its native SIEM event pipeline, flow tracking, and NAC controls, a sudden traffic spike, interface flap, or broadcast storm is immediately cross-referenced with security events. Network administrators and security analysts share a single source of truth, accelerating root-cause discovery across operational faults and active security incidents.",
    bullets: [
      "Single unified console merging network interface vitals with SIEM security event pipelines",
      "Instant cross-referencing between traffic spikes, interface flaps, and active security anomalies",
      "NetFlow / sFlow integration revealing top talkers, anomalous protocol spikes, and lateral data moves",
      "Direct operational containment: disable rogue ports or isolate broadcast storms in under 1.2s",
    ],
    metrics: {
      label: "CONVERGENCE SPEED",
      value: "< 1.2s",
      sub: "From anomaly detection to physical port disablement and security correlation",
    },
    codeSnippet: `// Unified NOC + SOC Incident Attribution
[Fabric Anomaly: RUNAWAY-TRAFFIC-BURST | Interface: CORE-SW-01:Gi1/0/18]
  ↳ Flow Analysis      : NetFlow Spike 850 Mbps (UDP Port 445 / Lateral SMB)
  ↳ Correlated Host    : DEV-WS-104 (IP: 10.10.4.18 | MAC: 52:54:00:1a:8b)
  ↳ SIEM Threat Match  : T1021.002 - Lateral Tool Transfer Attempt
  ↳ Remediation Trigger: Physical Switch Port Disabled via NAC SNMP Write
  ✓ Containment Status : Port Gi1/0/18 Down -> Threat Neutralized [0.98s]`,
  },
];

const DEFENSE_PILLARS = [
  {
    title: "Maintain sovereign operational telemetry — completely air-gapped and on-premise",
    description:
      "Monitor mission-critical backbone and edge networks without exposing internal device IPs, routing schemas, or interface utilization statistics to multi-tenant cloud platforms. JANUS collects, stores, and graphs all polling metrics and state histories strictly within your local environment, meeting strict air-gap compliance and national data sovereignty mandates.",
    highlight: "100% Air-Gapped Telemetry",
  },
  {
    title: "Track multi-vendor infrastructure via universal standards",
    description:
      "Eliminate proprietary vendor lock-in. JANUS monitors multi-vendor environments—including Cisco, Juniper, Aruba, Fortinet, and generic enterprise managed switches—using standard protocols: hardened SNMP (v1, v2c, and v3 AES-256) for interface throughput, packet discards, CRC errors, CPU load, and chassis temperature; and proactive ICMP/TCP synthetics for instant outage detection.",
    highlight: "Universal Multi-Vendor Standards",
  },
  {
    title: "Detect network anomalies, broadcast storms, and interface flapping",
    description:
      "Guard against silent network degradation and operational bottlenecks. JANUS continuously monitors interface error baselines, instantly alerting operators to duplex mismatches, bad cabling (FCS/CRC errors), rapid port flapping, and packet drop spikes before end-users experience application degradation.",
    highlight: "Deterministic Anomaly Tracking",
  },
  {
    title: "Harness unified traffic flow and bandwidth analysis",
    description:
      "Move beyond basic link utilization percentages. By pairing SNMP interface counters with native flow monitoring (NetFlow/sFlow), JANUS identifies the exact 'top talkers,' protocols, and conversations consuming interface bandwidth, allowing engineers to determine whether a saturated link is driven by routine backups, video streaming, or anomalous lateral transfers.",
    highlight: "NetFlow & Top-Talker Analytics",
  },
  {
    title: "Prioritize capacity planning with historical link utilization metrics",
    description:
      "Eliminate guesswork in bandwidth provisioning. JANUS tracks long-term traffic trends and peak usage curves across physical trunks and WAN links, giving network planners the empirical data needed to schedule link upgrades, balance VLAN trunk loads, and optimize route topologies.",
    highlight: "Capacity Planning & Trends",
  },
  {
    title: "Bridge network alerts directly to rapid operational containment",
    description:
      "Turn network fault detection into immediate intervention. When an interface experiences runaway packet loops, rogue traffic generation, or unapproved device connections, JANUS links the event directly to physical port controls. Operators can disable the switch port, reassign the VLAN, or initiate upstream firewall rules directly from the unified console without switching management tools.",
    highlight: "Direct Hardware Containment",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Fabric Telemetry & Topology Residency",
    sub: "Confidentiality of network schemas and traffic statistics",
    janusPrimary: "100% On-Premise Local Custody",
    janusSecondary: "Zero cloud egress. SNMP polling, flow records, interface states, and topology maps stay strictly within your operational boundary.",
    legacyPrimary: "Mandatory Multi-Tenant Cloud SaaS",
    legacySecondary: "Streams internal IP ranges, switch configurations, topology maps, and traffic bandwidth graphs to third-party vendor clouds.",
  },
  {
    criterion: "Pricing Model & Node Surcharges",
    sub: "Scale infrastructure monitoring without subscription penalties",
    janusPrimary: "Flat Enterprise Licensing",
    janusSecondary: "Monitor thousands of physical switch ports, trunks, and edge gateways with zero per-sensor, per-node, or per-interface fees.",
    legacyPrimary: "Per-Node / Per-Sensor Tax",
    legacySecondary: "Escalating subscription tiers that bill per device, per port, or per interface, forcing teams to monitor only a fraction of their estate.",
  },
  {
    criterion: "Layer 2 Switch Port & IPAM Correlation",
    sub: "Pinpointing downstream workload impact",
    janusPrimary: "Native Bridge-MIB & IPAM Integration",
    janusSecondary: "Every interface is automatically correlated with downstream MAC addresses, VLAN tags, active IP leases, and host identities.",
    legacyPrimary: "Disconnected Black-Box Pingers",
    legacySecondary: "Only reports that an interface is busy or down; blind to which downstream devices or VLANs are actually affected.",
  },
  {
    criterion: "Integrated NOC + SOC Security Convergence",
    sub: "Unifying operational faults with threat defense",
    janusPrimary: "Unified SIEM, Flow & NAC Correlation",
    janusSecondary: "Traffic spikes and interface flaps are instantly cross-referenced against SIEM alerts and active threat intelligence feeds.",
    legacyPrimary: "Siloed Network-Only Dashboards",
    legacySecondary: "Operates in total isolation from the SOC; unable to tell if a traffic spike is a legitimate backup or an active DDoS / lateral exfiltration.",
  },
  {
    criterion: "Direct Hardware-Layer Containment",
    sub: "Immediate operational intervention from the console",
    janusPrimary: "Sub-Second Port Shutdown & VLAN Quarantine",
    janusSecondary: "Disable rogue switch ports, isolate broadcast storms, and reassign VLANs via integrated SNMP/CLI writes directly from the dashboard.",
    legacyPrimary: "Passive Monitoring & Email Alerts",
    legacySecondary: "Only generates an alert email or ticketing notification, leaving operators to manually log into individual switch CLIs.",
  },
  {
    criterion: "Air-Gapped Operational Autonomy",
    sub: "Defense-grade and isolated sovereign networks",
    janusPrimary: "100% Standalone Air-Gapped Execution",
    janusSecondary: "Fully operational within classified, sovereign, and physically air-gapped critical infrastructure enclaves with zero internet access.",
    legacyPrimary: "Mandatory SaaS Cloud Connection",
    legacySecondary: "Dashboards, historical graphs, and alert delivery fail completely if external internet connectivity or vendor cloud portals go offline.",
  },
];

export default function NetworkMonitorPage() {
  const [activeTab, setActiveTab] = useState<string>("observability");

  const currentTab = NETWORK_TABS.find((t) => t.id === activeTab) || NETWORK_TABS[0];

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
              Self-Contained{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Network Monitoring
              </span>
              :<br />
              Total Interface Mastery
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
              Continuous, high-fidelity visibility into physical switches, routers, firewalls, and network links directly within your private operational boundary with zero cloud polling.
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
            {/* 1. Background Window: Fabric Telemetry Console & Interface Matrix */}
            <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#140b1a]/95 rounded-2xl border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#190e22] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span className="font-mono text-[11px] text-white/60">
                    Fabric Matrix · CORE-SW-DIST-01 · 52 Interfaces
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Table & Host Context Drawer */}
              <div className="flex-1 flex overflow-hidden">
                {/* Monitored Interfaces Table */}
                <div className="flex-1 p-3.5 space-y-2 font-mono text-[10px] text-white/60 overflow-hidden">
                  <div className="grid grid-cols-12 pb-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
                    <span className="col-span-4">Interface</span>
                    <span className="col-span-3">Throughput</span>
                    <span className="col-span-2">CRC Err</span>
                    <span className="col-span-3 text-right">Status</span>
                  </div>

                  {[
                    { iface: "Gi1/0/1 [Uplink-RTR]", tp: "840 Mbps", err: "0", st: "Connected", sc: "text-emerald-400" },
                    { iface: "Gi1/0/24 [Trunk-VLANs]", tp: "920 Mbps", err: "142/s", st: "Flapping", sc: "text-red-400" },
                    { iface: "Te1/1/1 [10G Core]", tp: "4.2 Gbps", err: "0", st: "Connected", sc: "text-emerald-400" },
                    { iface: "Po1 [LACP Trunk]", tp: "1.8 Gbps", err: "2", st: "Connected", sc: "text-emerald-400" },
                    { iface: "Gi1/0/18 [SEC-DEV]", tp: "12 Mbps", err: "0", st: "Audited", sc: "text-purple-300" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 py-1 items-center border-b border-white/5">
                      <span className="col-span-4 text-purple-300 font-semibold truncate">{row.iface}</span>
                      <span className="col-span-3 truncate text-white/80">{row.tp}</span>
                      <span className={`col-span-2 ${row.err !== "0" ? "text-amber-400 font-bold" : "text-white/50"}`}>{row.err}</span>
                      <span className={`col-span-3 text-right font-semibold ${row.sc}`}>{row.st}</span>
                    </div>
                  ))}
                </div>

                {/* Right Physical Context Drawer */}
                <div className="w-36 bg-[#100715] border-l border-white/10 p-3 flex flex-col justify-between font-mono text-[9px] text-white/60">
                  <div className="space-y-2">
                    <div className="text-purple-400 uppercase font-semibold text-[8px] tracking-wider">Switch Vitals</div>
                    <div>Model: <span className="text-white">C9300-48P</span></div>
                    <div>IP: <span className="text-emerald-400">10.10.0.1</span></div>
                    <div>CPU Load: <span className="text-purple-300">14% [Nominal]</span></div>
                    <div>Chassis Temp: <span className="text-white">38°C</span></div>
                    <div>Cloud Poll: <span className="text-emerald-400 font-bold">0.00%</span></div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[8px]">
                      Node Tax: $0.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Top-Left Floating Window: Fabric Health Alert Card */}
            <div className="absolute left-0 top-0 w-[82%] sm:w-[76%] bg-[#1a0e24]/95 rounded-xl border border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span className="font-semibold text-white text-[11px]">
                    Fabric Degradation: CORE-SW-DIST-01
                  </span>
                </div>
                <span className="font-mono text-[9px] text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                  CRC Errors: 142/s
                </span>
              </div>

              <div className="py-2 space-y-1 font-mono text-[10px] text-white/70">
                <div className="flex justify-between">
                  <span>Interface: <strong className="text-white">Gi1/0/24 (Trunk)</strong></span>
                  <span>Impact: <strong className="text-purple-300">28 Downstream Hosts</strong></span>
                </div>
                <div className="text-[9px] text-purple-300/80 truncate">
                  Anomaly: FCS/CRC burst detected • Probable bad SFP or duplex mismatch
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>SNMPv3 Polling: 1.0s Resolution</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-2 py-1 rounded bg-red-600/80 hover:bg-red-500 text-white font-medium text-[9px] shadow-sm">
                    Isolate Port
                  </button>
                  <button className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-[9px] shadow-sm">
                    Trace Link
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom-Left Floating Window: NOC + SOC Unified Flow Attribution */}
            <div className="absolute left-2 sm:left-4 bottom-2 w-[74%] sm:w-[68%] bg-[#110717] rounded-xl border border-purple-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3.5 z-30 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-semibold text-xs text-white">NOC + SOC Flow Attribution</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-white/50">Containment: &lt; 1.2s</span>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[10px] text-white/70">
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">NetFlow Top Talker:</span>
                  <span className="text-emerald-400 font-semibold">Lateral SMB (850 Mbps)</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">Switch Port Binding:</span>
                  <span className="text-purple-300 font-semibold">Gi1/0/18 (DEV-WS-104)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Measurable Fabric Health Without Node Taxes (4 Metric Cards) */}
      <section id="outcomes" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-y border-white/10 bg-[#160b1b]/60">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-light text-white">
              Measurable Fabric Health Without Node Taxes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Sovereign Telemetry Custody
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                100%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Air-gapped on-premise SNMP and flow collection with zero topology or device telemetry sent to clouds.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Per-Node &amp; Port Taxes
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                $0.00
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Flat enterprise licensing eliminating recurring per-port, per-sensor, and per-node subscription fees.
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
                Sub-second synthetic ICMP reachability checks and real-time SNMP interface discard tracking.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Hardware Containment
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 1.2s
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Instant operational intervention: switch port shutdown, VLAN reassignment, and upstream firewall rules.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Network Operations at Your Fingertips (Tabbed Capability Showcase) */}
      <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Network Operations at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Poll, Analyze, and Stabilize at Wire Speed
              </span>
            </h2>
            <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
              Explore how JANUS combines 100% on-premise full-stack SNMP polling, native Layer 2 topology correlation, and unified NOC+SOC convergence into an authoritative fabric telemetry platform.
            </p>
          </div>

          {/* Interactive 3-Tab Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
            {NETWORK_TABS.map((tab) => {
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
                      <span className="text-xs text-white/60">janus-fabric-engine.log</span>
                    </div>
                    <span className="text-[10px] text-purple-300 uppercase tracking-wider bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/20">
                      Fabric Engine
                    </span>
                  </div>
                  {/* Code Body */}
                  <pre className="p-5 text-xs text-purple-200/90 leading-relaxed overflow-x-auto whitespace-pre font-mono">
                    <code>{currentTab.codeSnippet}</code>
                  </pre>
                  {/* Status Footer */}
                  <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                    <span>SNMP Poller: Active</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Hardware Validated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Deterministic Network Operations Pillars Grid (6 Pillars) */}
      <section id="architecture" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-[#14081c]/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Deterministic Fabric Telemetry Pillars
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 leading-relaxed">
              Six core operational capabilities engineered for absolute telemetry custody, multi-vendor standards, and rapid hardware-layer containment.
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

      {/* Section 5: Why Sovereign Fabric Telemetry Wins (Comparison Table) (Commented Out) */}
      {/*
      <section id="comparison" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
              Why Sovereign Fabric Telemetry{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Wins
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
              Compare JANUS with cloud-dependent monitoring SaaS and standalone ping tools across telemetry custody, node pricing taxes, Layer 2 topology context, and offline resilience.
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
                        <span>JANUS Network Monitor</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                          Air-Gapped
                        </span>
                      </div>
                    </th>
                    <th className="py-6 px-6 sm:px-8 text-white/60 font-medium text-base sm:text-lg w-[35%]">
                      Cloud Monitoring SaaS &amp; Disconnected Pingers
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
            Master Every Switch, Port &amp; Fiber Link
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy self-contained network telemetry across your air-gapped switches and routers in hours. Zero cloud connection, pure local mastery.
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
