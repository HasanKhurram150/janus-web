"use client";

import { useState } from "react";
import Image from "next/image";
import ScrambleText from "./ScrambleText";

interface BentoCardProps {
  title: string;
  meta: string;
  tags: string[];
  imageSrc: string;
  centerEmblem?: React.ReactNode;
  className?: string;
}

export default function BentoCard({
  title,
  meta,
  tags,
  imageSrc,
  centerEmblem,
  className = "",
}: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full h-[520px] sm:h-[580px] lg:h-[620px] rounded-[32px] sm:rounded-[40px] overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-500 bg-[#140b19] shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer ${className}`}
    >
      {/* Background Image with Hover Scale */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
        {/* Subtle Film Grain Noise */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      </div>

      {/* Center Floating Emblem / Wordmark */}
      {centerEmblem && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-500 group-hover:scale-105">
          {centerEmblem}
        </div>
      )}

      {/* Bottom Information Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 z-20">
        {/* Left: Scramble Title & Meta */}
        <div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-none mb-3">
            <ScrambleText text={title} trigger={isHovered} />
          </h3>
          <div className="font-mono text-[10px] sm:text-[11px] text-white/50 tracking-widest uppercase">
            {meta}
          </div>
        </div>

        {/* Right: Pill Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md font-mono text-[10px] text-white/70 uppercase tracking-wider transition-colors duration-200 group-hover:border-white/40 group-hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
