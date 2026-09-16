"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SiemDeepDiveProps {
  onClose?: () => void;
}

export default function SiemDeepDive({ onClose }: SiemDeepDiveProps) {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pillars = [
    {
      id: "visibility",
      badge: "DATA INGESTION // SCALE",
      title: "Realize comprehensive visibility",
      shortTitle: "Comprehensive Visibility",
      description:
        "JANUS SIEM delivers total operational visibility by ingesting, parsing, and indexing high-throughput telemetry across your physical and digital estate. Deployed fully on-premise on standard Ubuntu Server, JANUS handles RFC 3164/5424 syslog, SNMP polling, and bidirectional flow data with zero phone-home telemetry. With flat licensing and no EPS or GB-per-day penalties, security teams can ingest high-verbosity logs from every router, firewall, switch port, and endpoint without calculating consumption costs.",
      highlights: [
        { label: "Phone-Home Telemetry", val: "0% / None" },
        { label: "Licensing Penalty", val: "Zero EPS Tax" },
        { label: "Deployment", val: "100% On-Premise" },
        { label: "Standard Ingest", val: "RFC 3164 / 5424" },
      ],
      metricLabel: "LIVE INGESTION RATE",
      metricValue: "142,850 EPS",
      metricSub: "Zero drop rate • Bidirectional flow parsing",
    },
    {
      id: "detection",
      badge: "L2/L3 TOPOLOGY CORRELATION",
      title: "Empower accurate detection with physical and network context",
      shortTitle: "Accurate Detection & Context",
      description:
        "Unlike disconnected SIEMs that treat alerts as isolated text strings, JANUS bridges log analysis directly with native Layer 2 switch polling and IPAM. An alert does not just reveal an IP—it pinpoints the host's MAC address, VLAN, and physical switch port. By combining deterministic threat heuristics with real-time entity tracking, JANUS surfaces actionable incidents while suppressing noise.",
      highlights: [
        { label: "Correlation Scope", val: "Layer 2 - Layer 7" },
        { label: "Physical Pinpoint", val: "Switch Port Level" },
        { label: "Noise Suppression", val: "> 90% Heuristic" },
        { label: "Entity Linkage", val: "MAC + IPAM + VLAN" },
      ],
      metricLabel: "ALERT NOISE SUPPRESSED",
      metricValue: "92.4%",
      metricSub: "Physical context eliminates disconnected false positives",
    },
    {
      id: "efficiency",
      badge: "UNIFIED NOC + SOC RESPONSE",
      title: "Fuel operational efficiency with converged NOC + SOC defense",
      shortTitle: "Converged Operational Efficiency",
      description:
        "Unify syslog collection, flow monitoring, behavioral analytics, and incident containment within a single, self-contained architecture. Move instantly from detection to remediation through integrated SOAR capabilities, cutting out the friction of toggling between disconnected monitoring consoles.",
      highlights: [
        { label: "Console Friction", val: "Zero Swivel" },
        { label: "Mitigation Speed", val: "< 2.4s Automated" },
        { label: "Containment Scope", val: "Hardware Port Lock" },
        { label: "Architecture", val: "Converged NOC+SOC" },
      ],
      metricLabel: "MEAN TIME TO REMEDIATION",
      metricValue: "< 2.4s",
      metricSub: "Integrated SOAR automated containment without console switching",
    },
  ];

  const analyticsCapabilities = [
    {
      id: "det-1",
      tag: "MITRE ATT&CK // RULES",
      title: "Use deterministic, framework-aligned detections",
      description:
        "JANUS correlates incoming syslog and network telemetry against dynamic signature rulebases and deterministic heuristics mapped systematically to the MITRE ATT&CK framework. Detect brute-force credential attacks, abnormal administrative sessions (RDP/SSH), rogue Layer 2 changes, and volumetric DoS spikes with zero reliance on opaque, resource-heavy machine-learning nodes.",
      bullets: ["Dynamic signature rulebases", "Mapped to MITRE ATT&CK", "Zero opaque black-box AI"],
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: "det-2",
      tag: "L2/L3 TOPOLOGY MAPPING",
      title: "Bridge detection engineering directly to physical infrastructure",
      description:
        "Track adversarial techniques (TTPs) across both network traffic and physical access boundaries. Correlate host activity with network topology to identify lateral movement, unapproved listening ports, or rogue hardware insertions before threats expand across subnets.",
      bullets: ["Physical access boundaries", "Lateral movement detection", "Rogue hardware tracking"],
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: "det-3",
      tag: "ENTITY PROFILING // ZERO FATIGUE",
      title: "Harness unified entity aggregation and rapid triage",
      description:
        "Automatically consolidate related operational anomalies, flow spikes, and security events around specific network entities. An analyst can review a consolidated incident profile—linking the timeline of events, bidirectional traffic volume, and endpoint process triggers—in a single view to eliminate alert fatigue.",
      bullets: ["Consolidated incident profile", "Bidirectional flow spikes", "Process triggers correlation"],
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "det-4",
      tag: "ROOT-CAUSE ATTRIBUTION",
      title: "Prioritize focus with root-cause attribution",
      description:
        "Instead of overwhelming analysts with hundreds of disconnected interface or authentication alerts, JANUS ties multi-source events back to the responsible IP and switch interface. Teams immediately identify whether an alert stems from an operational misconfiguration, an internal exfiltration attempt, or an external exploit.",
      bullets: ["Root-cause IP & Port trace", "Misconfig vs exploit filter", "Drastic fatigue reduction"],
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: "det-5",
      tag: "HARDWARE-LAYER SOAR",
      title: "Execute direct, immediate containment",
      description:
        "Eliminate delay between triage and response. Trigger one-click containment actions directly from the platform—initiating firewall IP quarantines or tracing the physical port for immediate Layer 2 network isolation. JANUS ensures that incident response is executed directly at the hardware layer, right where your network lives.",
      bullets: ["One-click IP quarantine", "Layer 2 hardware port isolation", "Zero cloud lag execution"],
      icon: (
        <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full mt-10 p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#140b19]/95 border border-purple-500/20 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.8)] text-white transition-all duration-500">
      {/* Top Bar with Badge & Close */}
      <div className="flex items-center justify-between pb-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Splunk-Class SecOps Architecture
          </span>
          <span className="hidden sm:inline font-mono text-xs text-white/40 tracking-wider">
            AIR-GAPPED SIEM & SOAR
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-mono text-xs transition-colors"
          >
            <span>Close view</span>
            <span className="text-sm">✕</span>
          </button>
        )}
      </div>

      {/* Main Big Heading */}
      <div className="pt-10 pb-12 max-w-5xl">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-6">
          Sovereign Telemetry at Your Fingertips:{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-400 font-medium">
            Total Visibility, Zero Cloud Exposure
          </span>
        </h2>
        <div className="flex flex-wrap gap-2.5 pt-2">
          {["Ubuntu Server Native", "0 EPS Taxes", "Layer 2 Mapping", "Airgapped Compliance", "Sub-second SOAR"].map(
            (badge, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80"
              >
                ✓ {badge}
              </span>
            )
          )}
        </div>
      </div>

      {/* Part 1: Splunk "Power your SecOps" Style Interactive 3-Pillar Component */}
      <div className="mb-20 rounded-2xl bg-janus-bg/80 border border-white/10 p-6 sm:p-8 lg:p-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Tab Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 pb-8 border-b border-white/10">
          {pillars.map((p, idx) => {
            const isActive = activePillar === idx;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillar(idx)}
                className={`flex-1 min-w-[220px] text-left p-4 sm:p-5 rounded-xl transition-all duration-300 border ${
                  isActive
                    ? "bg-purple-900/30 border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] text-purple-400 font-semibold tracking-wider uppercase">
                    0{idx + 1}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />}
                </div>
                <div className="text-sm sm:text-base font-medium text-white tracking-tight">
                  {p.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detail: 2-Column Split View (Splunk ES Style) */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Descriptive Narrative & Technical Attributes */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-tight mb-5">
              {pillars[activePillar].title}
            </h3>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light mb-8">
              {pillars[activePillar].description}
            </p>

            {/* Structured Specifications Matrix */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {pillars[activePillar].highlights.map((h, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col">
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-1">
                    {h.label}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-purple-200">
                    {h.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Fidelity Interactive Telemetry Visualizer */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="w-full rounded-2xl bg-[#100717] border border-purple-500/20 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
              {/* Telemetry Visual Top Controls */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-white/60">
                    JANUS_SEC_OPERATIONS // NODE_01
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  ACTIVE AIRGAP
                </span>
              </div>

              {/* Dynamic Content based on active pillar */}
              {activePillar === 0 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1">
                      {pillars[0].metricLabel}
                    </div>
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                      {pillars[0].metricValue}
                    </div>
                    <div className="text-xs text-emerald-400 font-mono mt-1">
                      ↑ {pillars[0].metricSub}
                    </div>
                  </div>

                  {/* High throughput pipeline nodes */}
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-purple-300 font-semibold">RFC 3164/5424</div>
                      <div className="text-[10px] text-white/40 mt-1">Syslog Stream</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-purple-300 font-semibold">SNMP v2c/v3</div>
                      <div className="text-[10px] text-white/40 mt-1">Direct Polling</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-purple-300 font-semibold">NetFlow / IPFIX</div>
                      <div className="text-[10px] text-white/40 mt-1">Bidirectional</div>
                    </div>
                  </div>

                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src="/images/SEIM_dashboard.svg"
                      alt="JANUS SIEM Dashboard Ingestion"
                      fill
                      className="object-cover object-top opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100717] via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 font-mono text-[10px] text-white/70">
                      Live Ingestion Timeline • Ubuntu Server On-Prem Index
                    </div>
                  </div>
                </div>
              )}

              {activePillar === 1 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1">
                      {pillars[1].metricLabel}
                    </div>
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 tracking-tight">
                      {pillars[1].metricValue}
                    </div>
                    <div className="text-xs text-white/60 font-mono mt-1">
                      {pillars[1].metricSub}
                    </div>
                  </div>

                  {/* Physical context entity breadcrumb */}
                  <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 font-mono text-xs space-y-2">
                    <div className="flex justify-between items-center text-rose-300 pb-1 border-b border-white/5 font-semibold">
                      <span>FLAGGED INCIDENT: BRUTE-FORCE RDP (T1110)</span>
                      <span className="text-[10px] bg-rose-500/20 px-2 py-0.5 rounded">CRITICAL</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70">
                      <div>Host IP: <span className="text-white font-bold">192.168.10.45</span></div>
                      <div>MAC: <span className="text-white font-bold">00:1A:2B:3C:4D:5E</span></div>
                      <div>VLAN: <span className="text-purple-300 font-bold">VLAN 40 (Ops Sec)</span></div>
                      <div>Switch: <span className="text-purple-300 font-bold">SW-CORE-01 [Rack B4]</span></div>
                    </div>
                    <div className="p-2 rounded bg-purple-900/40 border border-purple-500/40 text-[11px] text-purple-200">
                      📍 Physical Interface: <span className="font-bold text-white">GigabitEthernet 1/0/24</span> [Layer 2 Locked]
                    </div>
                  </div>

                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src="/images/network_topology.svg"
                      alt="JANUS Network Topology Layer 2"
                      fill
                      className="object-cover object-center opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100717] via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 font-mono text-[10px] text-white/70">
                      Direct Layer 2 Switch Polling & IPAM Contextual Graph
                    </div>
                  </div>
                </div>
              )}

              {activePillar === 2 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1">
                      {pillars[2].metricLabel}
                    </div>
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-purple-300 tracking-tight">
                      {pillars[2].metricValue}
                    </div>
                    <div className="text-xs text-white/60 font-mono mt-1">
                      {pillars[2].metricSub}
                    </div>
                  </div>

                  {/* Unified SOAR Playbook Steps */}
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="text-white/80">1. Syslog Ingest & MITRE Triage</span>
                      <span className="text-emerald-400">PASSED [0.3s]</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="text-white/80">2. IPAM & Layer 2 Port Correlation</span>
                      <span className="text-emerald-400">CORRELATED [0.7s]</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-between">
                      <span className="text-white font-semibold">3. One-Click Automated SOAR Isolation</span>
                      <span className="text-purple-300 font-bold">READY [1.4s]</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                    <span className="text-lg">🛡️</span>
                    <div className="text-xs font-mono text-emerald-200">
                      Zero console switching. Detection and hardware-level remediation live in the same pane.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Analytics at Your Fingertips (Deep-Dive Threat Investigation Grid) */}
      <div className="pt-8 border-t border-white/10">
        <div className="max-w-4xl mb-12">
          <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight mb-3">
            Analytics at Your Fingertips: Monitor, Detect, and Investigate Threats at Wire Speed
          </h3>
          <p className="text-sm sm:text-base font-mono text-purple-300 mb-4">
            Gain rapid insights from your data — completely air-gapped and on-premise
          </p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Unify data management for security practitioners to provide centralized internal data visibility, access, and analysis without sending a single byte outside your perimeter. Control the flow of security telemetry to satisfy strict regulatory standards, defense-grade compliance, and air-gapped operational requirements without performance compromises or cloud egress costs.
          </p>
        </div>

        {/* 5 Threat Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyticsCapabilities.map((item, idx) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                hoveredCard === idx
                  ? "bg-purple-900/25 border-purple-500/50 -translate-y-1 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest font-semibold">
                    {item.tag}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {item.icon}
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-medium text-white tracking-tight leading-snug mb-3">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bullet tags */}
              <div className="pt-4 border-t border-white/5 space-y-1.5 font-mono text-[11px] text-white/60">
                {item.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-1.5">
                    <span className="text-purple-400">›</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Summary / CTA block filling 6th slot */}
          <div className="p-6 sm:p-7 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-janus-bg flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-purple-300 uppercase tracking-widest font-semibold mb-3 block">
                TOTAL DEFENSE ASSURANCE
              </span>
              <h4 className="text-lg sm:text-xl font-medium text-white tracking-tight leading-snug mb-3">
                Zero Cloud Reliance. 100% Hardware Authority.
              </h4>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                JANUS operates with absolute sovereignty on your network hardware. No telemetry leaves your building, ensuring defense-grade air-gapped readiness.
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-janus-bg border border-white/20 font-mono text-xs font-semibold tracking-wider transition-all duration-300"
              >
                Done exploring ↑
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Close Button */}
      {onClose && (
        <div className="mt-14 pt-8 border-t border-white/10 flex justify-center">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-janus-bg border border-white/20 font-mono text-xs font-medium tracking-wider transition-all duration-300"
          >
            <span>Close detailed view</span>
            <span>↑</span>
          </button>
        </div>
      )}
    </div>
  );
}
