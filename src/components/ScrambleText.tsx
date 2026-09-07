"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const GLYPHS = "8aネa0io0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
  onHover?: boolean;
  speed?: number; // frame interval in ms
}

export default function ScrambleText({
  text,
  className = "",
  trigger,
  onHover = true,
  speed = 28,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const animatingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const target = text;
    const length = target.length;
    let iteration = 0;
    const maxIterations = length * 3 + 6;

    const interval = setInterval(() => {
      iteration++;

      const revealedChars = Math.floor((iteration / maxIterations) * length);

      const nextText = target
        .split("")
        .map((char, index) => {
          // Preserve trailing period or spaces
          if (char === " ") return " ";
          if (index < revealedChars) {
            return target[index];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(nextText);

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(target);
        animatingRef.current = false;
      }
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    if (trigger) {
      scramble();
    }
  }, [trigger, scramble]);

  return (
    <span
      className={`inline-block select-none ${className}`}
      onMouseEnter={onHover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
}
