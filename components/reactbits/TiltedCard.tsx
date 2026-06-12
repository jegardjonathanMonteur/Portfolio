"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
};

const spring = { stiffness: 120, damping: 22, mass: 0.8 };

/**
 * ReactBits Tilted Card — inclinaison 3D au survol.
 */
export function TiltedCard({
  children,
  className = "",
  scaleOnHover = 1.03,
  rotateAmplitude = 8,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ox = (e.clientX - rect.left) / rect.width - 0.5;
    const oy = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-oy * rotateAmplitude);
    rotateY.set(ox * rotateAmplitude);
  };

  const onEnter = () => {
    if (!reduced) scale.set(scaleOnHover);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        scale: reduced ? 1 : scale,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
