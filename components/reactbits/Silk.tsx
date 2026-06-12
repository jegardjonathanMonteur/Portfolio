"use client";

import { FOG } from "@/lib/visual-dna";
import { useReducedMotion } from "@/lib/useReducedMotion";

type SilkProps = {
  className?: string;
  /** Vitesse d'animation (1 = lent, 2 = très lent) */
  speed?: number;
};

/**
 * ReactBits Silk — vagues CSS monochromes (sans Three.js).
 */
export function Silk({ className = "", speed = 2 }: SilkProps) {
  const reduced = useReducedMotion();
  const duration = `${14 / speed}s`;

  if (reduced) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{ backgroundColor: FOG.blackSoft }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ backgroundColor: FOG.blackSoft }}
      aria-hidden
    >
      <div
        className="absolute -inset-[40%] opacity-[0.15]"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${FOG.mist}40, transparent 70%)`,
          animation: `silk-drift ${duration} ease-in-out infinite alternate`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            105deg,
            transparent,
            transparent 80px,
            ${FOG.cream}08 80px,
            ${FOG.cream}12 81px
          )`,
          animation: `silk-shift ${duration} linear infinite`,
        }}
      />
    </div>
  );
}
