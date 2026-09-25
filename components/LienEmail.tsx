"use client";

import { SITE } from "@/lib/site";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * Lien e-mail qui marche pour tout le monde.
 *
 * Un simple `mailto:` ne fait rien si le visiteur n'a pas d'appli mail configurée
 * (cas fréquent : Gmail dans le navigateur). Au clic, on copie donc l'adresse dans le
 * presse-papier ET on garde l'ouverture de l'appli mail, avec un petit message
 * « Adresse copiée » pendant quelques secondes. Si la copie échoue, le message
 * affiche simplement l'adresse pour que le visiteur puisse la noter.
 */
export function LienEmail({ className, children }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Le message est rendu directement dans <body> : un parent animé (transform)
  // casserait sa position « fixe » en bas de l'écran.
  const [monte, setMonte] = useState(false);
  useEffect(() => setMonte(true), []);

  useEffect(
    () => () => {
      if (minuteur.current) clearTimeout(minuteur.current);
    },
    [],
  );

  function afficher(texte: string) {
    setMessage(texte);
    if (minuteur.current) clearTimeout(minuteur.current);
    minuteur.current = setTimeout(() => setMessage(null), 2800);
  }

  async function copier() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      afficher(`Adresse copiée : ${SITE.email}`);
    } catch {
      afficher(`Écris-moi à : ${SITE.email}`);
    }
  }

  return (
    <>
      <a
        href={`mailto:${SITE.email}`}
        className={className}
        onClick={() => {
          // Pas de preventDefault : l'appli mail s'ouvre aussi si elle existe.
          void copier();
        }}
      >
        {children}
      </a>
      {monte
        ? createPortal(
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-8 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-white/10 bg-fog-soft/95 px-5 py-3 font-sans text-sm text-fog-cream shadow-lg backdrop-blur transition-all duration-300 ${
          message ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {message ?? ""}
      </div>,
            document.body,
          )
        : null}
    </>
  );
}
