"use client";

import { FadeIn } from "@/components/FadeIn";
import { VideoModal } from "@/components/VideoModal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Threads } from "@/components/reactbits/Threads";
import { WORK_PROJECTS } from "@/lib/projects";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type VignetteCardProps = {
  accent: string;
  letter: string;
  title: string;
  onPlay: () => void;
  glowAlpha?: string;
};

function VignetteCard({ accent, letter, title, onPlay, glowAlpha = "26" }: VignetteCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onPlay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative mt-6 block w-full overflow-hidden rounded-xl text-left transition-all duration-[400ms] ease-out hover:shadow-lg hover:shadow-blue-900/20"
      style={{
        aspectRatio: "16/9",
        background: `
          radial-gradient(ellipse at 15% 15%, ${accent}${glowAlpha} 0%, transparent 60%),
          linear-gradient(180deg, ${hovered ? '#22324d' : '#1a2942'} 0%, ${hovered ? '#15263f' : '#0f1d33'} 100%)
        `,
        border: hovered
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        className="absolute left-5 top-5 z-10 h-2 w-2 rounded-full"
        style={{ backgroundColor: accent }}
      />

      <span className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <span className="font-display text-[180px] text-white opacity-[0.04]">
          {letter}
        </span>
      </span>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-display text-xl text-[#f5f0e8] transition-all duration-[400ms] ease-out group-hover:translate-x-1 md:text-2xl">
          {title}
        </p>
        <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-all duration-[400ms] ease-out group-hover:scale-110">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            className="ml-0.5"
          >
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export function SelectedWork() {
  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [playingVsl, setPlayingVsl] = useState(false);
  const [playingTrez, setPlayingTrez] = useState(false);
  const [playingMos, setPlayingMos] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const vkStudio = WORK_PROJECTS.find((p) => p.client === "VK STUDIO")!;
  const treziroise = WORK_PROJECTS.find((p) => p.client === "OIIKOS")!;
  const mosaique = WORK_PROJECTS.find((p) => p.client === "PERSONAL PROJECT")!;

  return (
    <section
      id="projets"
      className="section-fade relative overflow-hidden scroll-mt-0 bg-fog-black py-32"
    >
      <Threads amplitude={0.5} distance={0.12} lineOpacity={0.2} />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-[120px]"
        style={{
          background: "linear-gradient(to bottom, transparent, #0B1729)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={
            headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
          }
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display text-5xl leading-[1.05] text-fog-cream md:text-7xl">
            Mes dernières créations
          </h2>
          <p className="mt-4 font-sans text-xs uppercase tracking-[0.15em] text-[#B8A8D0]">
            STORYTELLING · VSL · MOTION DESIGN
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-[40px]">
          <FadeIn delay={0}>
            <div>
              <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.136em] text-[#B8A8D0] opacity-50">
                NARRATIF — 2026
              </p>
              <VignetteCard
                accent="#e89850"
                letter="S"
                title="Storytelling"
                glowAlpha="59"
                onPlay={() => setYoutubeOpen(true)}
              />
              <p className="mt-6 font-sans text-base leading-relaxed text-fog-mist">
                Je me suis lancé un défi en natation. J'en ai fait ma première vidéo.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.136em] text-[#B8A8D0] opacity-50">
                VIDEO SALES LETTER — {vkStudio.year}
              </p>
              {playingVsl ? (
                <VideoPlayer src={vkStudio.videoSrc} title={vkStudio.title} showSoundToggle />
              ) : (
                <VignetteCard
                  accent="#00E4BB"
                  letter="V"
                  title="VK Studio"
                  glowAlpha="59"
                  onPlay={() => setPlayingVsl(true)}
                />
              )}
              <p className="mt-6 font-sans text-base leading-relaxed text-fog-mist">
                Une vidéo de vente qui convainc. Validée par l&apos;équipe VK Studio.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.136em] text-[#B8A8D0] opacity-50">
                MOTION DESIGN — {treziroise.year}
              </p>
              {playingTrez ? (
                <VideoPlayer src={treziroise.videoSrc} title={treziroise.title} showSoundToggle />
              ) : (
                <VignetteCard
                  accent="#9d8cff"
                  letter="O"
                  title={treziroise.title}
                  glowAlpha="59"
                  onPlay={() => setPlayingTrez(true)}
                />
              )}
              <p className="mt-6 font-sans text-base leading-relaxed text-fog-mist">
                Un reel motion design pour Oiikos, une Délégation de service publique. Rythme, énergie et identité de marque.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.136em] text-[#B8A8D0] opacity-50">
                {mosaique.tag}
              </p>
              {playingMos ? (
                <VideoPlayer
                  src={mosaique.videoSrc}
                  title={mosaique.title}
                  containerClassName="aspect-square max-w-[1200px] bg-[#0B1729]"
                  objectFit="contain"
                />
              ) : (
                <VignetteCard
                  accent="#9d8cff"
                  letter="M"
                  title="Showreel"
                  glowAlpha="59"
                  onPlay={() => setPlayingMos(true)}
                />
              )}
              <p className="mt-6 font-sans text-base leading-relaxed text-fog-mist">
                9 animations différentes. Un seul timing. Autant de styles que possible.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <VideoModal
        isOpen={youtubeOpen}
        onClose={() => setYoutubeOpen(false)}
        videoId="EDWxHXYg-lo"
      />
    </section>
  );
}
