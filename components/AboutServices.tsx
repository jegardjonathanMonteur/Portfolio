"use client";

import { Silk } from "@/components/reactbits/Silk";
import { motion } from "framer-motion";

export default function AboutServices() {
  return (
    <section
      id="apropos"
      className="relative overflow-hidden bg-[#0B1729] py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Silk speed={2} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, #3b5bdb 0%, transparent 70%)",
            opacity: 0.2,
            filter: "blur(80px)",
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, #1c3d8a 0%, transparent 70%)",
            opacity: 0.25,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #2d4fa3 0%, transparent 70%)",
            opacity: 0.18,
            filter: "blur(80px)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          opacity: 0.04,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="mb-20 text-center font-display text-5xl leading-[1.05] text-fog-cream md:text-7xl"
        >
          Qui je suis
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0D1B30] shadow-xl">
            <img
              src="/photo-pro.jpg"
              alt="Jonathan Jegard"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="font-sans text-lg leading-relaxed text-[#E8E0D0] md:text-xl">
            Je m&apos;appelle Jonathan Jegard.<br />
            Monteur vidéo &amp; motion designer basé à Brest.<br />
            J&apos;ai choisi ce métier par conviction — pas par accident.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
        >
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-[#0D1B30] shadow-xl md:order-2">
            <img
              src="/ambiance.jpg"
              alt="Ambiance de montage"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="font-sans text-lg leading-relaxed text-[#E8E0D0] md:order-1 md:text-xl">
            Ce qui m&apos;attire dans la vidéo, c&apos;est la précision : la bonne image
            au bon moment, le mouvement qui sert l&apos;intention, le rendu qui
            correspond exactement à ce qu&apos;on avait imaginé.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="mb-20 text-center font-display text-2xl leading-snug text-fog-cream md:text-3xl md:leading-relaxed"
        >
          &ldquo;Storytelling, VSL, motion design — trois façons différentes de
          raconter, convaincre, marquer.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <p className="font-sans text-lg leading-relaxed text-[#E8E0D0] md:text-xl">
            Je travaille de façon méthodique. Je livre dans les délais.
            Je communique à chaque étape.
          </p>
          <p className="mt-4 font-sans text-lg font-semibold leading-relaxed text-[#B8A8D0] md:text-xl">
            Pas de surprises — juste du travail sérieux, au service de votre projet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
