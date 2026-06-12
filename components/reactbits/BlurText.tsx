"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion } from "framer-motion";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
};

/**
 * ReactBits Blur Text — sort du flou progressivement.
 */
export function BlurText({
  text,
  className = "",
  delay = 0.8,
  duration = 1.5,
}: BlurTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <p className={className}>{text}</p>;
  }

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {text}
    </motion.p>
  );
}
