"use client";

import { Magnet } from "@/components/reactbits/Magnet";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { SITE } from "@/lib/site";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="contact" className="section-fade relative min-h-[80vh] overflow-hidden py-40">
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-fog-black/75" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-fog-black via-fog-black/60 to-fog-black/40"
        aria-hidden
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12"
      >
        <h2 className="mb-16 mt-4 font-display text-7xl leading-[1.05] text-fog-cream md:text-8xl">
          Parlons de votre{" "}
          <em className="italic text-fog-mist">projet.</em>
        </h2>

        <a
          href={`mailto:${SITE.email}`}
          className="font-sans text-2xl text-fog-cream underline-offset-8 transition-colors duration-300 hover:text-fog-mist hover:underline"
        >
          {SITE.email}
        </a>

        <div className="mt-12 flex justify-center">
          <Magnet magnetStrength={4}>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center rounded-full border border-white/10 px-8 py-4 transition-colors duration-300 hover:border-fog-cream/30"
            >
              <ShinyText
                text="ÉCRIRE UN MESSAGE"
                speed={6}
                className="font-sans text-xs uppercase tracking-[0.2em]"
              />
            </a>
          </Magnet>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs uppercase tracking-[0.2em] text-fog-mist transition-colors duration-300 hover:text-fog-cream"
          >
            Instagram
          </a>
          <span className="text-fog-mist/40" aria-hidden>
            ·
          </span>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs uppercase tracking-[0.2em] text-fog-mist transition-colors duration-300 hover:text-fog-cream"
          >
            LinkedIn
          </a>
        </div>

        <p className="mt-32 font-sans text-xs text-fog-mist opacity-50">
          © {SITE.year} — Jonathan Jegard. {SITE.location}
        </p>
        <p
          className="mx-auto mt-3 max-w-[600px] px-4 text-center font-sans text-[11px] leading-relaxed text-fog-mist opacity-35"
        >
          Tous droits réservés. Le contenu, le design et le code de ce site sont la propriété exclusive de Jonathan Jegard. Toute reproduction, modification ou réutilisation, totale ou partielle, à des fins commerciales ou malveillantes, est strictement interdite sans autorisation écrite préalable.
        </p>
      </motion.div>
    </section>
  );
}
