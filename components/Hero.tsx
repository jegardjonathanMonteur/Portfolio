"use client";

import { SITE } from "@/lib/site";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden"
    >
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
        sizes="100vw"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,23,41,0.3) 0%, rgba(11,23,41,0.6) 100%)",
        }}
        aria-hidden
      />

      <div className="hero-transition" aria-hidden />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.h1
          variants={fadeUp(0)}
          initial="initial"
          animate="animate"
          className="font-display text-[clamp(2.5rem,10vw,8rem)] font-light leading-[0.95] tracking-[0.15em] text-white"
        >
          {SITE.name}
        </motion.h1>
        <motion.p
          variants={fadeUp(0.3)}
          initial="initial"
          animate="animate"
          className="mt-6 font-sans text-xs uppercase tracking-[0.4em] text-white/70 md:text-sm"
        >
          {SITE.tagline}
        </motion.p>
      </div>

      <motion.p
        variants={fadeUp(0.4)}
        initial="initial"
        animate="animate"
        className="absolute bottom-8 left-8 z-10 font-sans text-xs uppercase tracking-[0.2em] text-white/50 md:bottom-12 md:left-12"
      >
        ({SITE.year} — PORTFOLIO)
      </motion.p>

      <motion.a
        variants={fadeUp(0.5)}
        initial="initial"
        animate="animate"
        href="#projets"
        className="absolute bottom-8 right-8 z-10 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white md:bottom-12 md:right-12"
      >
        SCROLL
        <span className="animate-scroll-hint" aria-hidden>
          ↓
        </span>
      </motion.a>
    </section>
  );
}
