"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

const CAPABILITIES_LIST = [
  {
    id: "siem",
    name: "SIEM & SOAR",
    desc: "Centralized log indexing, telemetry & automated threat killing",
    href: "/services/siem",
  },
  {
    id: "network-monitor",
    name: "Network Monitor",
    desc: "Real-time topology, latency, bandwidth & switch status",
    href: "/services/network-monitor",
  },
  {
    id: "endpoint-security",
    name: "Endpoint Security",
    desc: "Fleet health, background process tracking & USB defense",
    href: "/services/endpoint-security",
  },
  {
    id: "vulnerability-scanner",
    name: "Vulnerability Scanner",
    desc: "Automated port scans, CVE tracking & CVSS severity audits",
    href: "/services/vulnerability-scanner",
  },
  {
    id: "ipam",
    name: "IPAM",
    desc: "Centralized IP allocation, conflict avoidance & subnet mapping",
    href: "/services/ipam",
  },
  {
    id: "nac",
    name: "NAC",
    desc: "Switch port visibility, access policies & rogue quarantine",
    href: "/services/nac",
  },
  {
    id: "dlp",
    name: "DLP",
    desc: "Confidential document protection & unauthorized print audits",
    href: "/services/dlp",
  },
  {
    id: "kubernetes-monitoring",
    name: "Kubernetes Monitoring",
    desc: "Cluster API telemetry, pod observability & container health",
    href: "/services/kubernetes-monitoring",
  },
  {
    id: "sla-management",
    name: "SLA Management",
    desc: "Uptime compliance tracking, breach warnings & reliability metrics",
    href: "/services/sla-management",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown whenever pathname changes
  useEffect(() => {
    setCapabilitiesOpen(false);
    setMobileMenuOpen(false);
    setMobileCapabilitiesOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCapabilitiesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setCapabilitiesOpen(false);
    }, 180);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    setMobileMenuOpen(false);
    setCapabilitiesOpen(false);

    if (pathname !== "/") {
      e.preventDefault();
      try {
        sessionStorage.setItem("janus_scroll_target", targetId);
      } catch (_) {}
      router.push("/" + targetId);
      return;
    }

    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    if (window.history.pushState) {
      window.history.pushState(null, "", targetId);
    }

    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (el: Element | string, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isServicePage = pathname?.startsWith("/services");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled || isServicePage || capabilitiesOpen
          ? "bg-janus-bg/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-white/5 py-6"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex flex-col items-center gap-1 group text-white"
        >
          <Image
            src="/images/JANUS_white.svg"
            alt="JANUS Logo"
            width={40}
            height={40}
            className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-medium text-sm tracking-tight text-white leading-none">
            JANUS
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono">
          <a
            href="/#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="text-white/60 hover:text-white transition-colors duration-200 text-xs tracking-wider"
          >
            About
          </a>
          <a
            href="/#features"
            onClick={(e) => handleNavClick(e, "#features")}
            className="text-white/60 hover:text-white transition-colors duration-200 text-xs tracking-wider"
          >
            Features
          </a>

          {/* Capabilities Nav Item with Mega Dropdown Trigger */}
          <div
            className="relative py-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/services"
              className={`transition-colors duration-200 text-xs tracking-wider py-2 ${
                capabilitiesOpen || isServicePage
                  ? "text-white font-medium"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Capabilities
            </Link>
          </div>

          <a
            href="/#faqs"
            onClick={(e) => handleNavClick(e, "#faqs")}
            className="text-white/60 hover:text-white transition-colors duration-200 text-xs tracking-wider"
          >
            FAQs
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://www.antilineartech.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all active:scale-95 duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden px-3 py-1.5 text-white/70 hover:text-white border border-white/10 rounded-full font-mono text-xs"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Desktop Mega Dropdown Panel for Capabilities */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-[95vw] max-w-5xl transition-all duration-200 ease-out pt-3 ${
          capabilitiesOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible"
        }`}
      >
        <div className="relative bg-janus-card/98 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(168,85,247,0.15)] overflow-hidden">
          {/* Ambient subtle background glow */}
          <div className="absolute top-0 right-1/4 w-80 h-40 bg-purple-600/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-60 h-32 bg-pink-600/10 blur-[70px] pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-5">
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 font-semibold">
                Capabilities
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CAPABILITIES_LIST.map((cap) => (
                <Link
                  key={cap.id}
                  href={cap.href}
                  onClick={() => setCapabilitiesOpen(false)}
                  className="group/item block p-4 rounded-2xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all duration-150 cursor-pointer"
                >
                  <div className="text-sm font-medium text-white group-hover/item:text-purple-200 transition-colors">
                    {cap.name}
                  </div>
                  <p className="text-xs text-[#a69eb0] line-clamp-2 group-hover/item:text-white/80 transition-colors mt-1 leading-relaxed">
                    {cap.desc}
                  </p>
                </Link>
              ))}
            </div>

            <div className="pt-5 border-t border-white/5 mt-5 flex items-center">
              <Link
                href="/services"
                onClick={() => setCapabilitiesOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-pink-400 hover:text-pink-300 transition-colors group"
              >
                <span>View all capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-janus-bg/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6 flex flex-col gap-4 font-mono text-xs tracking-wider max-h-[85vh] overflow-y-auto">
          <a
            href="/#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="text-white/70 hover:text-white py-2 border-b border-white/5"
          >
            About
          </a>
          <a
            href="/#features"
            onClick={(e) => handleNavClick(e, "#features")}
            className="text-white/70 hover:text-white py-2 border-b border-white/5"
          >
            Features
          </a>

          {/* Capabilities Accordion on Mobile */}
          <div className="border-b border-white/5 pb-2">
            <button
              onClick={() => setMobileCapabilitiesOpen(!mobileCapabilitiesOpen)}
              className="w-full flex items-center justify-between text-white/70 hover:text-white py-2"
            >
              <span>Capabilities</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileCapabilitiesOpen ? "rotate-180 text-purple-400" : ""
                }`}
              />
            </button>
            {mobileCapabilitiesOpen && (
              <div className="pl-2 pt-2 pb-1 space-y-2">
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs text-pink-400 hover:text-pink-300 font-medium py-1"
                >
                  View all capabilities →
                </Link>
                {CAPABILITIES_LIST.map((cap) => (
                  <Link
                    key={cap.id}
                    href={cap.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-white/70 hover:text-white text-xs"
                  >
                    {cap.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href="/#faqs"
            onClick={(e) => handleNavClick(e, "#faqs")}
            className="text-white/70 hover:text-white py-2 border-b border-white/5"
          >
            FAQs
          </a>
          <a
            href="https://www.antilineartech.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-full text-xs font-semibold bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all active:scale-95 duration-200"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
