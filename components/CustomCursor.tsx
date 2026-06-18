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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailDotsRef = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hoveredRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [rings, setRings] = useState<RippleRing[]>([]);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!isDesktop) return null;
  if (isTouchDevice) return null;

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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "transparent",
          border: "1.5px solid rgba(255, 255, 255, 0.6)",
          pointerEvents: "none",
          zIndex: 99999,
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
