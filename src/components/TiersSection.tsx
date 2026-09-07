"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIERS = [
  {
    id: "developer",
    name: "Developer",
    tag: "Individual",
    subheading: "For prototyping and local testing",
    monthlyPrice: 0,
    annualPrice: 0,
    period: "forever",
    featured: false,
    description:
      "Full local engine for testing, simulation, and building initial device prototypes on your workstation.",
    features: [
      "Up to 10 connected devices",
      "Standard execution interval",
      "Local C++ and WebAssembly bindings",
      "Community documentation and examples",
      "Local state playback",
    ],
    cta: "Start free",
    ctaStyle: "outline",
  },
  {
    id: "production",
    name: "Production",
    tag: "Most popular",
    subheading: "For commercial fleets and applications",
    monthlyPrice: 490,
    annualPrice: 390,
    period: "month",
    featured: true,
    description:
      "Engineered for commercial automation, multi-agent facilities, and continuous production workloads.",
    features: [
      "Up to 500 connected devices",
      "Sub-millisecond execution target",
      "Low-latency transport drivers",
      "Event replay and debugging tools",
      "Standard support SLA",
    ],
    cta: "Start trial",
    ctaStyle: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tag: "Custom",
    subheading: "For dedicated hardware and customized deployments",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    period: "custom terms",
    featured: false,
    description:
      "Self-hosted and air-gapped deployments tailored to specific hardware architectures and compliance standards.",
    features: [
      "Unlimited connected devices",
      "Custom latency targets",
      "Air-gapped deployment option",
      "Hardware-specific kernel integration",
      "Dedicated technical support team",
    ],
    cta: "Contact team",
    ctaStyle: "outline",
  },
];

export default function TiersSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

      const items = cardsRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 78%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tiers"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#1b1022] border-b border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4">
            <span className="font-mono text-xs text-white/60 tracking-widest uppercase">
              Pricing
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight mb-4">
            Predictable scalability without hidden fees
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-white/60 uppercase mb-8">
            Deploy on your own infrastructure or edge servers
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/[0.03] border border-white/10 font-mono text-xs">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                !isAnnual
                  ? "bg-white text-[#1b1022] font-medium"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                isAnnual
                  ? "bg-white text-[#1b1022] font-medium"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Annual (20% discount)
            </button>
          </div>
        </div>

        {/* 3 Full Width Tier Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            const price =
              typeof tier.monthlyPrice === "number"
                ? isAnnual
                  ? tier.annualPrice
                  : tier.monthlyPrice
                : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.featured
                    ? "bg-white/[0.04] border border-white/30"
                    : "bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                <div>
                  {/* Tag & Subheading */}
                  <div className="font-mono text-xs text-white/50 tracking-wider uppercase mb-2">
                    {tier.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="font-mono text-xs text-white/60 tracking-wide mb-6">
                    {tier.subheading}
                  </div>

                  {/* Price */}
                  <div className="pb-6 mb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-4xl sm:text-5xl font-normal text-white tracking-tight">
                        {typeof price === "number" ? `$${price}` : price}
                      </span>
                      {typeof price === "number" && (
                        <span className="font-mono text-xs text-white/50 uppercase">
                          / {tier.period}
                        </span>
                      )}
                    </div>
                    {isAnnual &&
                      typeof tier.monthlyPrice === "number" &&
                      typeof tier.annualPrice === "number" &&
                      tier.monthlyPrice > 0 && (
                        <div className="font-mono text-xs text-white/40 mt-1">
                          Billed annually
                        </div>
                      )}
                  </div>

                  <p className="text-sm text-[#a69eb0] leading-relaxed mb-8 font-normal">
                    {tier.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-10">
                    <div className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                      Included
                    </div>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="text-sm text-white/80 font-normal">
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <a
                    href="#hero"
                    className={`w-full py-3.5 rounded-full font-mono text-xs font-medium tracking-wide transition-all duration-300 flex items-center justify-center ${
                      tier.ctaStyle === "primary"
                        ? "bg-white text-[#1b1022] hover:bg-white/90 active:scale-98"
                        : "bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/15"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
          <span>Enterprise air-gap support available on request</span>
          <span>Self-hosted or managed deployments</span>
        </div>
      </div>
    </section>
  );
}
