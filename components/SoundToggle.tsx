"use client";

import { SON_ACTIVE } from "@/lib/site";
import { useCallback, useEffect, useRef, useState } from "react";

const VOLUME = 0.25;

/**
 * Musique d'ambiance du PORTFOLIO uniquement (ce composant n'est monté que dans
 * app/portfolio/layout.tsx : jamais de musique côté Vexi).
 *
 * Règles validées par Jonathan (25/09/2026, règle 4 revue le 28/09/2026) :
 * 1. Arrivée sur le portfolio : la musique se lance toute seule (25 %). Si le navigateur
 *    bloque le son automatique, elle démarre au premier geste qui l'autorise (toucher,
 *    clic, touche du clavier). Tant qu'elle n'a pas vraiment démarré, on réessaie au geste
 *    suivant (un simple scroll sur téléphone ne suffit pas toujours au navigateur).
 *    Le bouton affiche ON seulement quand la musique joue vraiment.
 * 2. Le visiteur coupe : elle reste coupée, même après un aller-retour Vexi → portfolio.
 *    Seul un rechargement de la page (ou une nouvelle visite) la relance.
 * 3. Départ vers Vexi : arrêt immédiat. Retour sans l'avoir coupée : reprise là où elle
 *    s'était arrêtée.
 * 4. Vidéos du portfolio :
 *    - toucher une vignette (le lecteur s'affiche) ou lire une vidéo en muet : la musique continue ;
 *    - une vidéo joue AVEC le son : pause de la musique, le bouton passe sur OFF ;
 *    - cette vidéo se met en pause, repasse en muet, se termine ou disparaît : reprise de la
 *      musique là où elle s'était arrêtée (sauf si le visiteur l'avait coupée lui-même) ;
 *    - la vidéo YouTube en grand : pause à l'ouverture, reprise à la fermeture.
 *    Les lecteurs préviennent avec les événements "video-playing" / "video-ended"
 *    (detail.id = quelle vidéo), envoyés seulement quand le son de la vidéo démarre / s'arrête.
 * 5. Fin du morceau : il recommence tout seul, le bouton reste sur ON.
 * 6. Le téléphone coupe la musique tout seul (appel, autre appli, écran verrouillé) :
 *    elle reprend au prochain geste sur la page, si le visiteur ne l'avait pas coupée.
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

/** Gestes qui autorisent le son pour les navigateurs (le scroll seul ne compte pas toujours). */
const GESTES = ["pointerup", "touchend", "click", "keydown"] as const;

function SoundToggleActive() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOn, setIsOn] = useState(false);
  /** La musique a été mise en pause à cause d'une vidéo avec le son. */
  const pauseeParVideo = useRef(false);
  /** Vidéos qui jouent en ce moment avec le son (plusieurs possibles). */
  const videosSonores = useRef(new Set<string>());
  /** Vrai quand c'est NOUS qui mettons la musique en pause (bouton, vidéo, départ). */
  const pauseVoulue = useRef(false);

  const lancer = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;
    audio.volume = VOLUME;
    try {
      await audio.play();
      return true;
    } catch {
      // Fichier en erreur ou jamais chargé : on le recharge et on réessaie une fois.
      if (audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        try {
          audio.load();
          audio.volume = VOLUME;
          await audio.play();
          return true;
        } catch {
          /* le navigateur refuse encore : on attendra le prochain geste */
        }
      }
      return false;
    }
  }, []);

  /** Pause décidée par le site (et pas par le téléphone). */
  const mettreEnPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    pauseVoulue.current = true;
    audio.pause();
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

    // Le bouton suit l'état RÉEL du son : ON seulement quand ça joue vraiment.
    const onJoue = () => setIsOn(true);
    const onPause = () => {
      setIsOn(false);
      if (pauseVoulue.current) {
        pauseVoulue.current = false;
        return;
      }
      // Pause venue du téléphone lui-même (règle 6) : reprise au prochain geste.
      if (!audio.ended && !coupeeParLeVisiteur) attendreGeste();
    };
    audio.addEventListener("playing", onJoue);
    audio.addEventListener("pause", onPause);

    // Démarrage au prochain geste autorisé (règles 1 et 6). On garde l'écoute tant que
    // la musique n'a pas vraiment démarré. Le bouton SOUND gère lui-même ses clics.
    let essaiEnCours = false;
    const surGeste = (e: Event) => {
      const cible = e.target as Element | null;
      if (cible?.closest?.("[data-bouton-son]")) return;
      if (coupeeParLeVisiteur || !audio.paused) {
        retirerEcoute();
        return;
      }
      if (videosSonores.current.size > 0 || essaiEnCours) return;
      essaiEnCours = true;
      void lancer().then((ok) => {
        essaiEnCours = false;
        if (ok) retirerEcoute();
      });
    };
    let ecoute = false;
    const attendreGeste = () => {
      if (ecoute) return;
      ecoute = true;
      GESTES.forEach((ev) => document.addEventListener(ev, surGeste, true));
    };
    const retirerEcoute = () => {
      ecoute = false;
      GESTES.forEach((ev) => document.removeEventListener(ev, surGeste, true));
    };

    if (!coupeeParLeVisiteur) {
      void lancer().then((ok) => {
        if (!ok) attendreGeste();
      });
    }

    // Règle 4 : une vidéo du portfolio joue avec le son.
    const onVideoPlaying = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string }>).detail?.id ?? "video";
      videosSonores.current.add(id);
      if (!audio.paused) {
        pauseeParVideo.current = true;
        mettreEnPause();
      }
    };
    // Le son de cette vidéo s'arrête : reprise quand plus aucune vidéo ne joue avec le son.
    const onVideoEnded = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string }>).detail?.id ?? "video";
      videosSonores.current.delete(id);
      if (videosSonores.current.size > 0) return;
      if (pauseeParVideo.current) {
        pauseeParVideo.current = false;
        if (!coupeeParLeVisiteur) {
          void lancer().then((ok) => {
            if (!ok) attendreGeste();
          });
        }
      }
    };
    document.addEventListener("video-playing", onVideoPlaying);
    document.addEventListener("video-ended", onVideoEnded);

    // Fin du morceau : il boucle (attribut loop). Filet de sécurité si un navigateur
    // s'arrête quand même à la fin : on repart du début, et le bouton reste sur ON.
    const onFin = () => {
      if (coupeeParLeVisiteur) return;
      audio.currentTime = 0;
      void lancer();
    };
    audio.addEventListener("ended", onFin);

    return () => {
      retirerEcoute();
      audio.removeEventListener("playing", onJoue);
      audio.removeEventListener("pause", onPause);
      document.removeEventListener("video-playing", onVideoPlaying);
      document.removeEventListener("video-ended", onVideoEnded);
      audio.removeEventListener("ended", onFin);
      // Départ du portfolio : on retient où on en était, puis silence immédiat.
      positionReprise = audio.currentTime || 0;
      pauseVoulue.current = true;
      audio.pause();
    };
  }, [lancer, mettreEnPause]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      coupeeParLeVisiteur = false;
      pauseeParVideo.current = false;
      void lancer();
    } else {
      coupeeParLeVisiteur = true;
      mettreEnPause();
    }
  }, [lancer, mettreEnPause]);

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
          SOUND · {isOn ? "ON" : "OFF"}
        </span>
      </button>
    </>
  );
}
