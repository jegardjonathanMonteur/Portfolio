"use client";

import { useLangueSite } from "@/lib/langue-site";
import { TEXTES_SITE } from "@/lib/textes-site";
import Link from "next/link";
import { useEffect } from "react";

/** Contenu de la page 404, dans la langue du visiteur (FR, EN, ES, DE, IT). */
export function PageIntrouvableContenu() {
  const langue = useLangueSite();
  const T = TEXTES_SITE[langue].introuvable;

  useEffect(() => {
    document.title = T.titreOnglet;
  }, [T.titreOnglet]);

  return (
    <main
      lang={langue}
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-night px-6 pt-[var(--site-header-h)] text-center"
    >
      <span className="text-6xl" aria-hidden>
        🏳️
      </span>
      <h1 className="font-display text-4xl text-cream sm:text-5xl">{T.titre}</h1>
      <p className="max-w-md text-base text-cream-muted">{T.texte}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/vexi"
          className="rounded-full bg-vexi-accent px-6 py-3 font-sans text-sm font-medium text-night transition-opacity hover:opacity-90"
        >
          {T.jouer}
        </Link>
        <Link
          href="/portfolio"
          className="rounded-full border border-border px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:border-cream/40"
        >
          {T.portfolio}
        </Link>
      </div>
    </main>
  );
}
