"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type RippleRing = {
  id: number;
  x: number;
  y: number;
  delay: number;
  maxSize: number;
  duration: number;
  opacity: number;
};

type TrailPoint = {
  x: number;
  y: number;
};

let ringId = 0;

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailDotsRef = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hoveredRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [rings, setRings] = useState<RippleRing[]>([]);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[data-cursor="video"]') ||
        target.getAttribute("role") === "button"
      ) {
        setHovered(true);
        hoveredRef.current = true;
      }
    };

    const onOut = () => {
      setHovered(false);
      hoveredRef.current = false;
    };

    const onDown = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const newRings: RippleRing[] = [
        { id: ++ringId, x, y, delay: 0, maxSize: 80, duration: 0.5, opacity: 0.6 },
        { id: ++ringId, x, y, delay: 0.08, maxSize: 120, duration: 0.6, opacity: 0.4 },
        { id: ++ringId, x, y, delay: 0.16, maxSize: 160, duration: 0.7, opacity: 0.2 },
      ];
      setRings((prev) => [...prev, ...newRings]);
      setTimeout(() => {
        setRings((prev) =>
          prev.filter((r) => !newRings.find((n) => n.id === r.id))
        );
      }, 900);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver, true);
    window.addEventListener("mouseout", onOut, true);
    window.addEventListener("mousedown", onDown);

    const maxTrail = 20;
    const trail: TrailPoint[] = [];
    let posX = 0, posY = 0;

    const lerp = () => {
      const el = cursorRef.current;
      if (!el) return;
      const target = mouseRef.current;
      posX += (target.x - posX) * 0.25;
      posY += (target.y - posY) * 0.25;
      el.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(${hoveredRef.current ? 1.8 : 1})`;

      trail.unshift({ x: posX, y: posY });
      if (trail.length > maxTrail) trail.pop();
      updateTrailDots(trail, trailDotsRef.current);

      rafRef.current = requestAnimationFrame(lerp);
    };
    rafRef.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver, true);
      window.removeEventListener("mouseout", onOut, true);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <div className="pointer-events-none fixed z-[9998]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) trailDotsRef.current[i] = el;
            }}
            className="pointer-events-none fixed rounded-full"
            style={{
              width: 6,
              height: 6,
              transform: "translate(-50%, -50%)",
              background: "rgba(168,200,232,0)",
            }}
          />
        ))}
      </div>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] rounded-full transition-colors duration-200"
        style={{
          width: 14,
          height: 14,
          border: "1.5px solid rgba(255,255,255,0.55)",
          borderColor: hovered ? "rgba(168,200,232,0.8)" : "rgba(255,255,255,0.55)",
        }}
      />
      <AnimatePresence>
        {rings.map((ring) => (
          <motion.div
            key={ring.id}
            initial={{
              width: 0,
              height: 0,
              opacity: ring.opacity,
              x: ring.x,
              y: ring.y,
            }}
            animate={{
              width: ring.maxSize,
              height: ring.maxSize,
              opacity: 0,
              x: ring.x - ring.maxSize / 2,
              y: ring.y - ring.maxSize / 2,
            }}
            exit={{ opacity: 0 }}
            transition={{
              delay: ring.delay,
              duration: ring.duration,
              ease: "easeOut",
            }}
            className="pointer-events-none fixed z-[9999] rounded-full"
            style={{
              border: "1px solid #A8C8E8",
              left: 0,
              top: 0,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

function updateTrailDots(points: TrailPoint[], dots: HTMLDivElement[]) {
  const len = points.length;
  for (let i = 0; i < len; i++) {
    const dot = dots[i];
    if (!dot) continue;
    const opacity = ((1 - i / 20) * 0.5).toFixed(3);
    dot.style.left = `${points[i].x}px`;
    dot.style.top = `${points[i].y}px`;
    dot.style.background = `rgba(168,200,232,${opacity})`;
  }
  for (let i = len; i < dots.length; i++) {
    dots[i].style.background = "rgba(168,200,232,0)";
  }
}
