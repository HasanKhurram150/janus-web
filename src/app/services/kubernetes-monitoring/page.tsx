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

const K8S_TABS: TabData[] = [
  {
    id: "visibility",
    title: "Realize full cluster visibility without cloud data taxes or telemetry sprawl",
    shortTitle: "Cluster Observability",
    description:
      "JANUS Kubernetes Monitoring delivers comprehensive, on-premise observability across your container workloads, control planes, and node infrastructure. Deployed 100% within your private boundary on standard Ubuntu Server, JANUS continuously collects pod metrics, node health, cluster events, and container resource utilization without streaming sensitive workload metadata or logs to multi-tenant cloud platforms. With a flat licensing model, platform teams can monitor expanding microservices, dynamic namespaces, and ephemeral pods without per-node, per-core, or per-metric billing penalties.",
    bullets: [
      "100% on-premise telemetry retention with zero external SaaS egress or phone-home telemetry",
      "Continuous ingestion of kubelet metrics, cAdvisor data, and Kubernetes event streams",
      "Flat predictable licensing eliminating per-node, per-core, and per-custom-metric surcharges",
      "Seamless support across vanilla upstream K8s, OpenShift, RKE2, k3s, and air-gapped enclaves",
    ],
    metrics: {
      label: "TELEMETRY EGRESS TAX",
      value: "$0.00",
      sub: "Zero per-metric or ingestion surcharges • 100% local database storage",
    },
    codeSnippet: `// JANUS Air-Gapped Kubernetes Telemetry Pipeline
[Cluster: PROD-K8S-CORE | Distribution: v1.29.2-upstream]
  ↳ Telemetry Channel: Local Mutual TLS (Internal Cluster CA)
  ↳ Node Exporter & cAdvisor: 24 Worker Nodes Ingested
  ↳ Cloud Telemetry Phone-Home: BLOCKED [0.00 KB/s Egress]
  ↳ Pod State Engine: 480 Active Pods Across 14 Namespaces
  ↳ Total Metric License Penalties: $0.00 [Flat Enterprise Model]
  ✓ Cluster Telemetry Pipeline Active [Air-Gap Verified]`,
  },
  {
    id: "context",
    title: "Empower operational accuracy with converged physical and cluster context",
    shortTitle: "Converged Physical Context",
    description:
      "Unlike standalone container monitors that view Kubernetes as an isolated virtual abstraction, JANUS bridges dynamic container telemetry directly with your underlying physical compute and network fabric. Every cluster node, daemonset, and ingress route is mapped to its underlying host OS, physical IPAM allocation, and top-of-rack switch port. Platform engineers and security analysts gain instant visibility into whether a container issue stems from an application crash loop, node memory pressure, or an underlying physical network bottleneck.",
    bullets: [
      "Instant correlation linking container pods and namespaces to physical host nodes and NICs",
      "Live IPAM integration mapping pod CIDRs and node IPs to top-of-rack switch ports",
      "Distinguish between application code regressions, CNI limits, and physical switch port congestion",
      "Elimination of virtual isolation blind spots through unified physical topology mapping",
    ],
    metrics: {
      label: "NODE ATTRIBUTION TIME",
      value: "< 500ms",
      sub: "From pod anomaly to physical switch port & IPAM binding",
    },
    codeSnippet: `// Dynamic Container to Physical Fabric Binding
[Pod Anomaly: payment-service-78df9b94-k98p | Namespace: prod-apps]
  ↳ State Alert     : CrashLoopBackOff (Restart Count: 14)
  ↳ Scheduled Node  : k8s-worker-04.internal (10.10.6.24)
  ↳ Physical Host   : Dell PowerEdge R650 [Kernel 5.15.0-89]
  ↳ Switch Binding  : TOR-SW-02:Gi1/0/8 [VLAN 20: K8S_FABRIC]
  ↳ Root Cause Analysis: Node Memory Pressure (94.2% Physical RAM)
  ✓ Physical Node Context Attributed [< 350ms Elapsed]`,
  },
  {
    id: "devsecops",
    title: "Fuel GitOps and DevSecOps within a single sovereign architecture",
    shortTitle: "GitOps & DevSecOps",
    description:
      "Break down the silo between infrastructure reliability and security operations. Because JANUS unifies Kubernetes metrics with its native SIEM event pipeline and network flow analyzers, container crashes, anomalous ingress spikes, API server audit alerts, and unauthorized namespace modifications surface in the same operational console—accelerating root-cause analysis across infrastructure and application tiers.",
    bullets: [
      "Real-time parsing of Kubernetes API server audit logs for privilege escalation and RBAC drift",
      "Unified correlation bridging SIEM security alerts directly with container restart cycles",
      "Detection of rogue containers, unapproved registry pulls, and cluster-admin role grants",
      "One-click actionability: alert operators, isolate network interfaces, or cordon degraded nodes",
    ],
    metrics: {
      label: "API AUDIT VELOCITY",
      value: "< 1.2s",
      sub: "Real-time detection of unauthorized RBAC & cluster privilege drift",
    },
    codeSnippet: `// Unified DevSecOps & K8s API Server Audit Event
[AUDIT ALERT: HIGH] K8s API Server Unauthorized RoleBinding
  ↳ User Identity   : devops-automation-sa
  ↳ Action          : create RoleBinding (cluster-admin)
  ↳ Target Namespace: kube-system
  ↳ SIEM Correlation: RULE-K8S-PRIVILEGE-ESCALATION Bound
  ↳ Action Triggered:
      1. Alert Dispatched to SOC Console with Origin Pod IP
      2. Automated Policy Enforcement: RBAC Modification Reverted
  ✓ Control Plane Integrity Preserved [< 1.1s Total Elapsed]`,
  },
];

const DEFENSE_PILLARS = [
  {
    title: "Maintain sovereign workload metrics — completely air-gapped and on-premise",
    description:
      "Monitor production clusters and sensitive workloads without exposing internal service names, deployment manifests, or environment variables to external third-party SaaS vendors. JANUS ingests, aggregates, and visualizes all cluster metrics, node statuses, and Kubernetes API audit logs strictly within your private boundary, fulfilling strict air-gap compliance and operational data sovereignty requirements.",
    highlight: "100% Air-Gapped Custody",
  },
  {
    title: "Automate dynamic pod and node health tracking",
    description:
      "Eliminate visibility blind spots caused by ephemeral microservices. Monitor CPU utilization, memory pressure, disk I/O, network throughput, and kubelet conditions (Ready, DiskPressure, MemoryPressure) across worker and control plane nodes, while catching stuck deployments, persistent CrashLoopBackOff cycles, failed scheduling attempts, and container OOM kills in real time.",
    highlight: "Dynamic Health Tracking",
  },
  {
    title: "Ingest Kubernetes API server audit logs natively",
    description:
      "Audit administrative and automated actions across your cluster control plane. JANUS parses Kubernetes audit logs to flag privilege escalations, cluster-admin role bindings, unauthorized secret access, and modifications to critical ingress controllers or security context constraints without requiring external analytical tooling.",
    highlight: "Native API Server Auditing",
  },
  {
    title: "Harness unified workload history and capacity forecasting",
    description:
      "Eliminate tribal knowledge and guesswork in capacity planning. JANUS tracks resource requests versus actual consumption over time, surfacing over-provisioned namespaces, under-utilized worker nodes, and persistent pod restart loops to help engineering teams optimize compute allocation and right-size resource limits.",
    highlight: "Capacity Forecasting",
  },
  {
    title: "Prioritize troubleshooting with integrated network and host correlation",
    description:
      "Move beyond generic container error codes. When a microservice degrades, JANUS cross-references container logs, egress network flows, and node-level system events. Engineers immediately see whether downtime is caused by a failing upstream service dependency, an unapplied CNI policy, or saturated physical hardware.",
    highlight: "Host & Network Correlation",
  },
  {
    title: "Bridge cluster alerts directly to rapid infrastructure control",
    description:
      "Turn cluster metrics into immediate administrative action. When an unapproved workload is scheduled or a rogue container triggers volumetric traffic spikes, JANUS provides actionable attribution back to the host node and network interface, allowing teams to cordon nodes, alert operators, or isolate traffic at the network boundary before the blast radius spreads.",
    highlight: "Rapid Cluster Control",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Telemetry Residency & Sovereign Air-Gap",
    sub: "Cluster data custody & secret leakage protection",
    janusPrimary: "100% On-Premise Local Custody",
    janusSecondary: "Zero data egress. Pod manifests, environment variables, cluster logs, and metrics remain strictly within your local perimeter.",
    legacyPrimary: "Mandatory Multi-Tenant Cloud SaaS",
    legacySecondary: "Continuous egress of container logs, deployment specs, and telemetry to public vendor cloud repositories.",
  },
  {
    criterion: "Pricing Model & Custom Metric Tax",
    sub: "Cost scaling with microservice sprawl",
    janusPrimary: "Flat Predictable Licensing",
    janusSecondary: "Zero per-node, per-core, or per-metric billing taxes. Scale pods, namespaces, and microservices with zero bill shock.",
    legacyPrimary: "Punitive Per-Host & Per-Metric Surcharges",
    legacySecondary: "Steep bills that escalate rapidly with custom Prometheus metrics, container counts, and log ingestion volume.",
  },
  {
    criterion: "Physical Infrastructure & Switch Port Binding",
    sub: "Bridging virtual pods to physical network fabric",
    janusPrimary: "Native IPAM & Top-of-Rack Switch Correlation",
    janusSecondary: "Maps Kubernetes worker nodes and CNI interfaces directly to physical IPAM records and switch ports.",
    legacyPrimary: "Virtual-Only Abstraction Silo",
    legacySecondary: "Treats Kubernetes as an isolated cloud overlay; blind to underlying physical hardware faults and network bottlenecks.",
  },
  {
    criterion: "Control Plane & Native API Server Auditing",
    sub: "Unified reliability and security visibility",
    janusPrimary: "Integrated SIEM & API Audit Engine",
    janusSecondary: "Parses K8s audit logs to detect unauthorized RBAC changes, secret access, and privilege drift in sub-seconds.",
    legacyPrimary: "Fragmented Add-On Cloud Modules",
    legacySecondary: "Requires separate, costly cloud security plugins (CSPM/CWPP) disconnected from real-time operational metrics.",
  },
  {
    criterion: "Agent Resource Footprint on Nodes",
    sub: "Daemonset compute consumption",
    janusPrimary: "Ultralight Local Exporters (< 1% Node CPU)",
    janusSecondary: "Efficient metrics scraper with minimal memory overhead, leaving compute power dedicated to user workloads.",
    legacyPrimary: "Heavy Agent Daemonsets",
    legacySecondary: "High CPU and memory consumption per worker node for continuous encryption, buffering, and cloud transmission.",
  },
  {
    criterion: "Air-Gapped & Offline Autonomy",
    sub: "Resilience during isolated operational environments",
    janusPrimary: "Deterministic Local Engine",
    janusSecondary: "Operates with 100% functionality in air-gapped enclaves, SCADA environments, and defense installations.",
    legacyPrimary: "Cloud-Broker Dependency",
    legacySecondary: "Dashboard rendering and alerting break down completely when outbound WAN or internet access is severed.",
  },
];

export default function KubernetesMonitoringPage() {
  const [activeTab, setActiveTab] = useState<string>("visibility");

  const currentTab = K8S_TABS.find((t) => t.id === activeTab) || K8S_TABS[0];

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
                Kubernetes Monitoring
              </span>
              :<br />
              Full Visibility, Zero Data Tax
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8">
              Comprehensive, on-premise observability across container workloads, control planes, and physical node infrastructure with zero cloud data taxes.
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
            {/* 1. Background Window: Kubernetes Cluster Observability Console */}
            <div className="absolute right-0 top-4 sm:top-6 w-[88%] sm:w-[85%] h-[370px] sm:h-[400px] bg-[#140b1a]/95 rounded-2xl border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white font-sans text-xs backdrop-blur-md">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#190e22] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span className="font-mono text-[11px] text-white/60">
                    Cluster: PROD-K8S-01 · v1.29.2 · 24 Nodes · 480 Pods Active
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Table & Node Context Drawer */}
              <div className="flex-1 flex overflow-hidden">
                {/* Pod Status Records Table */}
                <div className="flex-1 p-3.5 space-y-2 font-mono text-[10px] text-white/60 overflow-hidden">
                  <div className="grid grid-cols-12 pb-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
                    <span className="col-span-4">Workload / Pod</span>
                    <span className="col-span-3">Namespace</span>
                    <span className="col-span-2">Restarts</span>
                    <span className="col-span-3 text-right">Status</span>
                  </div>

                  {[
                    { pod: "ingress-nginx-controller-6d8", ns: "ingress-nginx", r: "0", s: "Running", sc: "text-emerald-400" },
                    { pod: "payment-gw-78df9b94-k98p", ns: "prod-apps", r: "14", s: "CrashLoop", sc: "text-red-400" },
                    { pod: "postgres-cluster-1", ns: "database", r: "0", s: "Running", sc: "text-emerald-400" },
                    { pod: "redis-sentinel-node-0", ns: "caching", r: "1", s: "Running", sc: "text-blue-400" },
                    { pod: "analytics-batch-worker-4", ns: "data-tier", r: "3", s: "OOMKilled", sc: "text-amber-400" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 py-1 items-center border-b border-white/5">
                      <span className="col-span-4 text-purple-300 font-semibold truncate">{row.pod}</span>
                      <span className="col-span-3 truncate text-white/80">{row.ns}</span>
                      <span className="col-span-2 text-white/50">{row.r}</span>
                      <span className={`col-span-3 text-right font-semibold ${row.sc}`}>{row.s}</span>
                    </div>
                  ))}
                </div>

                {/* Right Physical Node Drawer */}
                <div className="w-36 bg-[#100715] border-l border-white/10 p-3 flex flex-col justify-between font-mono text-[9px] text-white/60">
                  <div className="space-y-2">
                    <div className="text-purple-400 uppercase font-semibold text-[8px] tracking-wider">Physical Binding</div>
                    <div>Node: <span className="text-white">worker-04</span></div>
                    <div>Host IP: <span className="text-purple-300">10.10.6.24</span></div>
                    <div>Port: <span className="text-emerald-400">Gi1/0/8</span></div>
                    <div>Switch: <span className="text-white">TOR-SW-02</span></div>
                    <div>Cloud Egress: <span className="text-emerald-400 font-bold">0 B/s [Strict]</span></div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[8px]">
                      Node CPU: 18.4%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Top-Left Floating Window: Pod Crash & Resource Anomaly Alert */}
            <div className="absolute left-0 top-0 w-[82%] sm:w-[76%] bg-[#1a0e24]/95 rounded-xl border border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-20 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span className="font-semibold text-white text-[11px]">
                    Workload Incident: payment-gw (CrashLoopBackOff)
                  </span>
                </div>
                <span className="font-mono text-[9px] text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                  OOMKilled (1024Mi)
                </span>
              </div>

              <div className="py-2 space-y-1 font-mono text-[10px] text-white/70">
                <div className="flex justify-between">
                  <span>Namespace: <strong className="text-white">prod-apps</strong></span>
                  <span>Node: <strong className="text-purple-300">k8s-worker-04</strong></span>
                </div>
                <div className="text-[9px] text-red-300/90 truncate">
                  Cause: Memory limit breached • Correlated with upstream DB latency
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Physical Port Bound: TOR-SW-02:Gi1/0/8</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-2 py-1 rounded bg-red-600/80 hover:bg-red-500 text-white font-medium text-[9px] shadow-sm">
                    Cordon Node
                  </button>
                  <button className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-[9px] shadow-sm">
                    Inspect Pod
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom-Left Floating Window: Control Plane API Server Audit Status */}
            <div className="absolute left-2 sm:left-4 bottom-2 w-[74%] sm:w-[68%] bg-[#110717] rounded-xl border border-purple-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3.5 z-30 text-white font-sans text-xs backdrop-blur-md">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-semibold text-xs text-white">K8s Control Plane Audit Engine</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-white/50">Audit Latency: 0.94s</span>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[10px] text-white/70">
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">API RBAC Drift:</span>
                  <span className="text-emerald-400 font-semibold">0 Unapproved Roles</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-white/60">Cloud Telemetry Egress:</span>
                  <span className="text-purple-300 font-semibold">0.00 KB/s [Strict Air-Gap]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Measurable Cluster Reliability Without Cloud Tax (4 Metric Cards) */}
      <section id="outcomes" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-y border-white/10 bg-[#160b1b]/60">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-light text-white">
              Measurable Cluster Reliability Without Cloud Tax
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
                Air-gapped on-premise metric retention with zero pod manifests or logs streamed to SaaS clouds.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Custom Metric Tax
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                $0.00
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Flat enterprise licensing with zero per-node, per-core, or per-metric billing penalties.
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
                Instant correlation from degraded container pod to host node IPAM and physical switch port.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-xs font-mono text-purple-300 tracking-wider uppercase mb-3">
                Control Plane Audit
              </div>
              <div className="text-5xl font-light text-white tracking-tight mb-3">
                &lt; 1.2s
              </div>
              <div className="text-sm text-white/70 font-light leading-relaxed">
                Real-time parsing of Kubernetes API server audit events for security privilege escalations.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Container Infrastructure at Your Fingertips (Tabbed Capability Showcase) */}
      <section id="capabilities" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Container Infrastructure at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Inspect, Correlate, and Stabilize at Cluster Speed
              </span>
            </h2>
            <p className="text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
              Explore how JANUS combines real-time cluster observability, converged physical hardware mapping, and unified GitOps/DevSecOps monitoring into a single sovereign platform.
            </p>
          </div>

          {/* Interactive 3-Tab Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
            {K8S_TABS.map((tab) => {
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
                      <span className="text-xs text-white/60">kubectl-telemetry-stream.log</span>
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
                    <span>Cluster Status: Operational</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Sovereign Metrics Ingestion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Deterministic Kubernetes Observability Pillars Grid (6 Pillars) */}
      <section id="architecture" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 bg-[#14081c]/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Deterministic Kubernetes Observability Pillars
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 leading-relaxed">
              Six core operational capabilities engineered for absolute telemetry custody, sub-second root-cause correlation, and rapid cluster control.
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

      {/* Section 5: Why Sovereign Kubernetes Observability Wins (Comparison Table) (Commented Out) */}
      {/*
      <section id="comparison" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
              Why Sovereign Kubernetes Observability{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Wins
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
              Compare JANUS with cloud-dependent container APMs across data custody, custom metric taxes, physical network attribution, and control plane security.
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
                        <span>JANUS Kubernetes Observability</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                          Air-Gapped
                        </span>
                      </div>
                    </th>
                    <th className="py-6 px-6 sm:px-8 text-white/60 font-medium text-base sm:text-lg w-[35%]">
                      Cloud-Brokered APM (Datadog / Dynatrace)
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
            Master Kubernetes in Air-Gapped Isolation
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy self-contained cluster telemetry via eBPF daemonsets in minutes. Zero egress fees, zero cloud dependencies.
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
