"use client";

import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { Silk } from "@/components/reactbits/Silk";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PARAGRAPHS = [
  "Monteur vidéo et motion designer basé à Brest, je façonne des images qui retiennent l'attention. Chaque projet est une question de tempo, de souffle, de précision.",
  "Je travaille avec des marques qui veulent dépasser le contenu standard. PME ambitieuses, institutions, créateurs qui cherchent une signature visuelle propre.",
] as const;

export function Approach() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      id="apropos"
      className="section-fade relative bg-fog-black py-32"
    >
      <Silk speed={2} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={
            headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
          }
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-label">(02) — APPROACH</p>
          <h2 className="mb-16 mt-4 font-display text-6xl leading-[1.08] text-fog-cream">
            Le rythme avant{" "}
            <em className="italic text-fog-mist">tout.</em>
          </h2>
        </motion.header>

        <div className="flex max-w-2xl flex-col gap-6">
          {PARAGRAPHS.map((text, i) => (
            <ScrollReveal key={text.slice(0, 24)} delay={i * 0.12}>
              <p className="font-sans text-lg leading-relaxed text-fog-cream">
                {text}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
