"use client";

import { FOG } from "@/lib/visual-dna";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef } from "react";

type DotGridProps = {
  className?: string;
  gap?: number;
  dotSize?: number;
};

/**
 * ReactBits Dot Grid — grille de points avec pulse au survol (canvas).
 */
export function DotGrid({ className = "", gap = 44, dotSize = 2 }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let mx = -9999;
    let my = -9999;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / 120);
          const alpha = 0.1 + t * 0.25;
          const scale = 1 + t * 0.8;

          ctx.beginPath();
          ctx.arc(x, y, (dotSize * scale) / 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 241, 232, ${alpha})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [gap, dotSize, reduced]);

  if (reduced) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{ backgroundColor: FOG.black }}
        aria-hidden
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
