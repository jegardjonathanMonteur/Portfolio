"use client";

import { FOG } from "@/lib/visual-dna";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ShinyTextProps = {
  text: string;
  className?: string;
  speed?: number;
};

/**
 * ReactBits Shiny Text — reflet métallique lent (CSS).
 */
export function ShinyText({ text, className = "", speed = 5 }: ShinyTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(
          120deg,
          ${FOG.mist} 0%,
          ${FOG.cream} 40%,
          ${FOG.cream} 50%,
          ${FOG.mist} 60%,
          ${FOG.mist} 100%
        )`,
        backgroundSize: "200% auto",
        animation: `shiny-sweep ${speed}s ease-in-out infinite`,
      }}
    >
      {text}
    </span>
  );
}
