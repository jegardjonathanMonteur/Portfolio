"use client";

import { SON_ACTIVE } from "@/lib/site";
import { useCallback, useEffect, useRef, useState } from "react";

const VOLUME = 0.25;

/**
 * Musique d'ambiance du PORTFOLIO uniquement (ce composant n'est monté que dans
 * app/portfolio/layout.tsx : jamais de musique côté Vexi).
 *
 * Règles validées par Jonathan le 25/09/2026 :
 * 1. Arrivée sur le portfolio : la musique se lance toute seule (25 %). Si le navigateur
 *    bloque le son automatique, elle démarre au premier clic / toucher / touche du clavier.
 *    Le bouton affiche OFF tant que la musique ne joue pas vraiment.
 * 2. Le visiteur coupe : elle reste coupée, même après un aller-retour Vexi → portfolio.
 *    Seul un rechargement de la page (ou une nouvelle visite) la relance.
 * 3. Départ vers Vexi : arrêt immédiat. Retour sans l'avoir coupée : reprise là où elle
 *    s'était arrêtée.
 * 4. Une vidéo du portfolio se lance : pause, puis reprise à la fin de la vidéo.
 */

// Mémoire de la visite : ces variables survivent aux changements de page internes
// (Vexi ↔ portfolio) mais repartent à zéro quand la page est rechargée.
let coupeeParLeVisiteur = false;
let positionReprise = 0;

export function SoundToggle() {
  if (!SON_ACTIVE) {
    return null;
  }

  return <SoundToggleActive />;
}

function SoundToggleActive() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOn, setIsOn] = useState(false);
  const wasPausedByVideo = useRef(false);

  const lancer = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;
    audio.volume = VOLUME;
    try {
      await audio.play();
      setIsOn(true);
      return true;
    } catch {
      setIsOn(false);
      return false;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME;
    if (positionReprise > 0) {
      try {
        audio.currentTime = positionReprise;
      } catch {
        /* position pas encore disponible : on repart du début */
      }
    }

    // Démarrage au premier geste si le navigateur a bloqué le son automatique.
    // Un clic sur le bouton SOUND lui-même est ignoré ici : c'est le bouton qui décide.
    const surPremierGeste = (e: Event) => {
      const cible = e.target as Element | null;
      if (cible?.closest?.("[data-bouton-son]")) return;
      retirerEcoute();
      if (!coupeeParLeVisiteur && audio.paused) void lancer();
    };
    const evenements = ["pointerdown", "keydown", "touchstart"] as const;
    const retirerEcoute = () =>
      evenements.forEach((ev) => document.removeEventListener(ev, surPremierGeste, true));

    if (!coupeeParLeVisiteur) {
      void lancer().then((ok) => {
        if (!ok) evenements.forEach((ev) => document.addEventListener(ev, surPremierGeste, true));
      });
    }

    const onVideoPlaying = () => {
      if (!audio.paused) {
        wasPausedByVideo.current = true;
        audio.pause();
        setIsOn(false);
      }
    };
    const onVideoEnded = () => {
      if (wasPausedByVideo.current) {
        wasPausedByVideo.current = false;
        if (!coupeeParLeVisiteur) void lancer();
      }
    };
    document.addEventListener("video-playing", onVideoPlaying);
    document.addEventListener("video-ended", onVideoEnded);

    return () => {
      retirerEcoute();
      document.removeEventListener("video-playing", onVideoPlaying);
      document.removeEventListener("video-ended", onVideoEnded);
      // Départ du portfolio : on retient où on en était, puis silence immédiat.
      positionReprise = audio.currentTime || 0;
      audio.pause();
    };
  }, [lancer]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      coupeeParLeVisiteur = false;
      void lancer();
    } else {
      coupeeParLeVisiteur = true;
      audio.pause();
      setIsOn(false);
    }
  }, [lancer]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        preload="auto"
        loop
        className="hidden"
        aria-hidden
      />

      <button
        type="button"
        data-bouton-son
        onClick={toggle}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-black/60 px-5 py-3 text-sm uppercase tracking-[0.2em] text-cream shadow-lg shadow-black/30 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-black/70"
        aria-pressed={isOn}
        aria-label={isOn ? "Couper le son ambiant" : "Activer le son ambiant"}
      >
        <span
          className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
            isOn
              ? "bg-lavender shadow-[0_0_8px_2px_rgba(168,200,232,0.5)]"
              : "bg-cream-muted/30"
          }`}
          aria-hidden
        />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-cream">
          SOUND — {isOn ? "ON" : "OFF"}
        </span>
      </button>
    </>
  );
}
