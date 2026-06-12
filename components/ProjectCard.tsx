"use client";

import { ClickSpark } from "@/components/reactbits/ClickSpark";
import { TiltedCard } from "@/components/reactbits/TiltedCard";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export type ProjectCardProps = {
  number: string;
  client: string;
  year: string;
  title: string;
  tag: string;
  description: string;
  videoSrc: string;
  aspectRatio: "video" | "square";
  className?: string;
};

export function ProjectCard({
  number,
  client,
  year,
  title,
  tag,
  description,
  videoSrc,
  aspectRatio,
  className = "",
}: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const isSquare = aspectRatio === "square";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      <header className="mb-6 flex justify-between font-sans text-xs uppercase tracking-widest text-fog-mist">
        <span>({number})</span>
        <span>{client}</span>
        <span>{year}</span>
      </header>

      <ClickSpark sparkColor="#F5F1E8" sparkSize={5} sparkCount={8}>
        <TiltedCard
          scaleOnHover={1.03}
          className={
            isSquare
              ? "mx-auto max-w-2xl overflow-hidden rounded-sm"
              : "mx-auto max-w-5xl overflow-hidden rounded-sm"
          }
        >
          <div className={isSquare ? "aspect-square w-full" : "aspect-video w-full"}>
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              aria-label={title}
            />
          </div>
        </TiltedCard>
      </ClickSpark>

      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h3 className="font-display text-3xl italic text-fog-cream">{title}</h3>
        <p className="shrink-0 font-sans text-xs uppercase tracking-widest text-fog-mist">
          {tag}
        </p>
      </div>

      <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-fog-mist">
        {description}
      </p>
    </motion.article>
  );
}
