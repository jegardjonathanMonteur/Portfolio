"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type MagnetProps = {
  children: ReactNode;
  className?: string;
  padding?: number;
  magnetStrength?: number;
};

/**
 * ReactBits Magnet — élément attiré doucement par le curseur.
 */
export function Magnet({
  children,
  className = "",
  padding = 80,
  magnetStrength = 3,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = Math.abs(cx - e.clientX);
      const dy = Math.abs(cy - e.clientY);
      if (dx < width / 2 + padding && dy < height / 2 + padding) {
        setPos({
          x: (e.clientX - cx) / magnetStrength,
          y: (e.clientY - cy) / magnetStrength,
        });
      } else {
        setPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, magnetStrength, reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: reduced
          ? undefined
          : `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: reduced ? undefined : "transform 0.35s ease-out",
      }}
    >
      {children}
    </div>
  );
}
