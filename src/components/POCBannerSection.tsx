"use client";

import Image from "next/image";

const LOGOS = [
  { src: "/images/logos/Mobilink_new.png", alt: "Mobilink" },
  { src: "/images/logos/NDMA_new.png", alt: "NDMA" },
  { src: "/images/logos/PAA_new.png", alt: "PAA", extraClasses: "!h-28 sm:!h-36" },
  { src: "/images/logos/SAFECITY_new.png", alt: "Safe City", extraClasses: "!h-28 sm:!h-36" },
  { src: "/images/logos/nutech.png", alt: "Nutech", extraClasses: "!h-36 sm:!h-48" },
];

export default function POCBannerSection() {
  return (
    <section className="relative w-full py-6 bg-white/[0.03] overflow-hidden border-b border-white/5">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-2 text-center">
        <p className="font-mono text-xl sm:text-2xl tracking-widest text-white uppercase">
          Our Partners
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="animate-marquee flex whitespace-nowrap w-max">
          {/* Render 4 sets to ensure it completely fills ultra-wide screens smoothly */}
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="flex flex-shrink-0 items-center justify-center">
              {LOGOS.map((logo, idx) => (
                <div
                  key={`logo-${setIdx}-${idx}`}
                  className="w-48 sm:w-64 flex flex-shrink-0 items-center justify-center mx-2 sm:mx-4"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`object-contain h-20 sm:h-24 w-auto ${logo.extraClasses || ""}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
