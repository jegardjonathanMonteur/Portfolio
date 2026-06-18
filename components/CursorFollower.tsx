"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number; life: number };

const TRAIL_CREAM = "245, 241, 232";
const LIFE_DECAY = 0.025;

/**
 * Traînée canvas — clearRect chaque frame, points avec lifetime.
 * Pas de voile semi-transparent : le site reste intact.
 * Curseur natif inchangé. Desktop uniquement (md+).
 */
export function CursorFollower() {
  const [isDesktop, setIsDesktop] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!isDesktop) return null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY, life: 1 });
    };
    window.addEventListener("mousemove", handleMove);

    let animationId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.current.forEach((p) => {
        p.life -= LIFE_DECAY;
      });
      points.current = points.current.filter((p) => p.life > 0);

      for (let i = 0; i < points.current.length - 1; i++) {
        const p1 = points.current[i];
        const p2 = points.current[i + 1];
        const opacity = p1.life * 0.6;
        const width = p1.life * 1.5;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${TRAIL_CREAM}, ${opacity})`;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      aria-hidden
    />
  );
}
