"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

type Spark = { x: number; y: number; angle: number; startTime: number };

type ClickSparkProps = {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  className?: string;
};

/**
 * ReactBits Click Spark — particules au clic.
 */
export function ClickSpark({
  children,
  sparkColor = "#F5F1E8",
  sparkSize = 6,
  sparkRadius = 12,
  sparkCount = 8,
  duration = 400,
  className = "",
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((s) => {
        const elapsed = ts - s.startTime;
        if (elapsed >= duration) return false;
        const p = elapsed / duration;
        const eased = 1 - (1 - p) * (1 - p);
        const dist = eased * sparkRadius;
        const len = sparkSize * (1 - eased);
        const x1 = s.x + dist * Math.cos(s.angle);
        const y1 = s.y + dist * Math.sin(s.angle);
        const x2 = s.x + (dist + len) * Math.cos(s.angle);
        const y2 = s.y + (dist + len) * Math.sin(s.angle);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced, sparkColor, sparkSize, sparkRadius, duration]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      const batch = Array.from({ length: sparkCount }, (_, i) => ({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));
      sparksRef.current.push(...batch);
    },
    [reduced, sparkCount]
  );

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {!reduced && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}
