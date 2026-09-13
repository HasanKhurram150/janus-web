"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";
import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    id: "01",
    title: "SEIM SOAR",
    description: "Our system uses SIEM to provide a centralized view of network activity and security events, including attacks, IP-to-IP communications, and incoming and outgoing data traffic. Integrated with SOAR, it also helps identify the appropriate response to detected threats and takes necessary actions in handling and responding to attacks effectively.",
    tags: ["Audit", "Auto drafting", "Human handoff", "24/7 running"],
    imageSrc: "/images/SEIM_dashboard.svg",
  },
  {
    id: "02",
    title: "IPAM",
    description: "JANUS provides centralized management and monitoring of IP addresses across the network, allowing administrators to track IP allocation, identify active and available addresses, monitor IP usage, and maintain visibility of connected devices. This helps prevent IP conflicts and ensures efficient utilization of network resources.",
    tags: ["App to app", "No manual copy", "Triggers"],
    imageSrc: "/images/network_topology.svg",
  },
  {
    id: "03",
    title: "NAC",
    description: "JANUS provides Network Access Control with real-time visibility into switches, connected devices, ports, and network alarms, helping administrators identify and manage unauthorized or problematic access.",
    tags: ["Internal tools", "Chat interfaces", "Your branding", "Fast search"],
    imageSrc: "/images/network_topology.svg",
  },
  {
    id: "04",
    title: "Endpoint Security",
    description: "The feature provides centralized visibility and security monitoring for all connected endpoints. Administrators can monitor endpoint health, applications, processes, network activity, and USB devices. It displays connectivity, antivirus, firewall, and system status in a single dashboard. This helps quickly identify security issues and unusual endpoint activity.",
    tags: ["50+ tools", "Nightly syncs", "Dedup", "APIs"],
    imageSrc: "/images/malware.svg",
  },
  {
    id: "05",
    title: "Vulnerability Scanner",
    description: "Identifies vulnerabilities, exposed ports, and security misconfigurations across network targets using engines like Nmap and Nuclei. Administrators can run, schedule, and review scans, with detailed findings and scan history. CVEs are tracked through remediation, while CVSS scoring helps prioritize critical and high-severity vulnerabilities.",
    tags: ["Monitoring", "Fixes", "Improvements", "Uptime checks"],
    imageSrc: "/images/compliance.svg",
  },
  {
    id: "06",
    title: "Kubernetes Monitoring",
    description: "JANUS allows users to add and monitor Kubernetes clusters through their API endpoint and authentication token, providing centralized visibility into configured Kubernetes environments",
    tags: ["API", "Clusters", "Authentication", "Visibility"],
    imageSrc: "/images/network_topology.svg",
  },
  {
    id: "07",
    title: "SLA Management",
    description: "Monitors device uptime and downtime against defined SLAs, providing visibility into performance, compliance, SLA breaches, at-risk devices, and uptime trends to help administrators identify and resolve reliability issues.",
    tags: ["Uptime", "Compliance", "Trends", "Reliability"],
    imageSrc: "/images/SEIM_dashboard.svg",
  },
  {
    id: "08",
    title: "DLP",
    description: "Prevents unauthorized printing of confidential documents by blocking, holding for review, or logging printing activity for security and auditing.",
    tags: ["Security", "Auditing", "Confidential", "Blocking"],
    imageSrc: "/images/compliance.svg",
  },
  {
    id: "09",
    title: "NETWORK MONITOR",
    description: "Monitors network devices centrally, showing their status, uptime, IP address, RTT, bandwidth utilization, availability, and last check time to help administrators quickly identify connectivity and performance issues.",
    tags: ["Bandwidth", "Availability", "Performance", "Uptime"],
    imageSrc: "/images/network_topology.svg",
  },
];

export default function ServicesSection({ showAll = false }: { showAll?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards Animation
      cardRefs.current.forEach((card) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-gradient-to-br from-[#1b1022] via-[#2d1b3b] to-[#1b1022] text-white"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-24">
          <div className="mb-4">
            <span className="font-mono text-xs text-white/60 tracking-widest uppercase">
              <ScrambleText text="Capabilities." onHover={true} />
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-tight mb-6">
            We defend the network that runs your enterprise.
          </h2>
        </div>

        {/* Services List */}
        <div ref={containerRef} className="flex flex-col">
          {(showAll ? SERVICES : SERVICES.slice(0, 5)).map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
                className={`sticky top-20 sm:top-32 bg-gradient-to-br from-[#1b1022] via-[#2d1b3b] to-[#1b1022] flex flex-col pt-20 pb-20 sm:pt-28 sm:pb-32 border-t border-white/10 ${
                  index === (showAll ? SERVICES.length - 1 : 4) ? "border-b" : ""
                }`}
                style={{
                  zIndex: index + 10,
                }}
              >
                {/* Main Card Row */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full">
                  {/* Left Column: Number */}
                  <div className="lg:w-1/3 flex flex-col justify-between pl-4 lg:pl-10">
                    <div>
                      <div className="text-6xl sm:text-8xl font-light text-white/90 tracking-tighter">
                        {service.id}
                      </div>
                      <div className="mt-3 font-mono text-xs text-purple-400 uppercase tracking-widest">
                        {service.id === "01" ? "AIR-GAPPED SIEM & SOAR" : "NETWORK DEFENSE MODULE"}
                      </div>
                    </div>

                    <div className="mt-12 flex flex-col items-start gap-6">
                      {service.id === "01" && (
                        <Link
                          href="/services/siem"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-500/20 hover:bg-purple-500/35 text-purple-200 border border-purple-500/40 text-xs font-mono tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:scale-105 active:scale-95 cursor-pointer group"
                        >
                          <span>See more</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      )}

                      {/* Decorative Dot Grid */}
                      <div className="grid grid-cols-6 gap-2 w-max opacity-20">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Content */}
                  <div className="lg:w-2/3 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-3xl sm:text-5xl font-medium tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-2xl leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Graphic Preview Container */}
                    <div className="w-full h-56 sm:h-72 bg-[#120818] rounded-2xl border border-white/10 mb-8 flex items-center justify-center overflow-hidden relative group">
                      <Image
                        src={service.imageSrc}
                        alt={service.title}
                        fill
                        className="object-cover object-top opacity-85 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1b1022] via-transparent to-black/30" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[11px] text-white/70">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Sovereign Air-Gapped Intelligence</span>
                      </div>
                      {service.id === "01" && (
                        <Link
                          href="/services/siem"
                          className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10"
                        >
                          <span className="px-6 py-2.5 rounded-full bg-white text-[#1b1022] font-mono text-xs font-semibold shadow-2xl hover:bg-purple-100 transition-colors">
                            Click to explore full SEIM & SOAR product page →
                          </span>
                        </Link>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                      <div className="flex flex-wrap gap-2.5">
                        {service.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:bg-white/10 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        {/* See More Button */}
        {!showAll && (
          <div className="mt-16 text-center">
            <a href="/services" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium tracking-wide transition-all duration-300">
              See more capabilities
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
