"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion } from "framer-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  /** Durée totale de l'animation (s) */
  duration?: number;
  /** Délai entre chaque caractère (ms) */
  staggerMs?: number;
  as?: "h1" | "h2" | "p" | "span";
};

/**
 * ReactBits Split Text — apparition lettre par lettre (Framer Motion).
 */
export function SplitText({
  text,
  className = "",
  duration = 1.2,
  staggerMs = 40,
  as: Tag = "span",
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const chars = text.split("");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration * 0.85,
            delay: (i * staggerMs) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
