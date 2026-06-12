"use client";

import { motion } from "framer-motion";

type AdobeLogoProps = {
  size: number;
  bg: string;
  letters: string;
  color: string;
};

function AdobeLogo({ size, bg, letters, color }: AdobeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label={letters}
    >
      <rect width="100" height="100" rx="16" fill={bg} />
      <text
        x="50"
        y="50"
        dominantBaseline="central"
        textAnchor="middle"
        fill={color}
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="44"
        letterSpacing="1"
      >
        {letters}
      </text>
    </svg>
  );
}

function RemotionLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label="Remotion"
    >
      <rect width="100" height="100" rx="16" fill="#1a1a2e" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="white" strokeWidth="2" />
      <polygon points="42,38 42,62 62,50" fill="white" />
    </svg>
  );
}

export function Tools() {
  return (
    <section className="bg-[#0B1729] py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-5xl leading-[1.05] text-fog-cream md:text-7xl">
            Mes outils
          </h2>
          <p className="mt-4 font-sans text-xs uppercase tracking-[0.15em] text-[#E8E0D0] opacity-40">
            MA STACK CRÉATIVE
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-[80px] gap-y-12"
        >
          <div className="flex cursor-pointer flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:opacity-100">
            <AdobeLogo size={90} bg="#00005B" letters="Pr" color="#9999FF" />
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#E8E0D0]">
              Premiere Pro
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:opacity-100">
            <AdobeLogo size={90} bg="#00005B" letters="Ae" color="#9999FF" />
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#E8E0D0]">
              After Effects
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:opacity-100">
            <AdobeLogo size={90} bg="#00005B" letters="Me" color="#9999FF" />
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#E8E0D0]">
              Media Encoder
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:opacity-100">
            <RemotionLogo size={90} />
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#E8E0D0]">
              Remotion
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
