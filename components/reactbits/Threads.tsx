"use client";

import { CREAM_RGB } from "@/lib/visual-dna";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef } from "react";

type ThreadsProps = {
  className?: string;
  /** Amplitude des ondulations (bas = lent / subtil) */
  amplitude?: number;
  /** Espacement vertical entre fils (haut = plus espacé) */
  distance?: number;
  lineOpacity?: number;
};

/**
 * ReactBits Threads — fils animés (canvas, sans ogl).
 * Monochrome crème, mouvement lent type tissu/brume.
 */
export function Threads({
  className = "",
  amplitude = 0.35,
  distance = 0.12,
  lineOpacity = 0.08,
}: ThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    const [r, g, b] = CREAM_RGB;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const lineCount = 36;
      const gap = h * distance;

      for (let i = 0; i < lineCount; i++) {
        const p = i / lineCount;
        const baseY = gap * i + gap * 0.5;
        const alpha = lineOpacity * (0.4 + 0.6 * (1 - Math.abs(p - 0.5) * 1.2));

        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const wave =
            Math.sin(x * 0.004 + t * 0.4 + p * 6) * h * amplitude * 0.04 +
            Math.sin(x * 0.002 + t * 0.25) * h * amplitude * 0.02;
          const y = baseY + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${r * 255},${g * 255},${b * 255},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      t += 0.008;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [amplitude, distance, lineOpacity, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
