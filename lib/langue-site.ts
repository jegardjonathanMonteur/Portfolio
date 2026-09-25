"use client";

import { useEffect, useState } from "react";

/**
 * Langue du site (vitrine téléphone, barre du haut, page 404).
 * Règles validées le 25/09/2026 :
 * - si le visiteur a déjà choisi une langue dans la démo (bouton FR/EN…), on la reprend ;
 * - sinon la langue du navigateur si c'est FR, EN, ES, DE ou IT ;
 * - sinon l'anglais.
 * Le portfolio et les mentions légales restent en français.
 */
export type LangueSite = "fr" | "en" | "es" | "de" | "it";

const LANGUES: readonly LangueSite[] = ["fr", "en", "es", "de", "it"];

/** Clé écrite par la démo quand le joueur change de langue (même site, même stockage). */
const CLE_LANGUE_DEMO = "vexi_langue";

function estLangue(v: string | null | undefined): v is LangueSite {
  return !!v && (LANGUES as readonly string[]).includes(v);
}

export function detecterLangueSite(): LangueSite {
  try {
    const choisie = localStorage.getItem(CLE_LANGUE_DEMO);
    if (estLangue(choisie)) return choisie;
  } catch {
    /* stockage bloqué : on passe au navigateur */
  }
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const p of prefs) {
    const code = (p || "").slice(0, 2).toLowerCase();
    if (estLangue(code)) return code;
  }
  return "en";
}

/**
 * Langue courante. Rendu serveur en français, puis la vraie langue dès l'arrivée
 * dans le navigateur. Suit aussi un changement de langue fait dans la démo.
 */
export function useLangueSite(): LangueSite {
  const [langue, setLangue] = useState<LangueSite>("fr");

  useEffect(() => {
    setLangue(detecterLangueSite());
    const onStorage = (e: StorageEvent) => {
      if (e.key === CLE_LANGUE_DEMO || e.key === null) setLangue(detecterLangueSite());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return langue;
}
