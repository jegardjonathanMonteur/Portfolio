import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable · Vexi World",
  robots: { index: false },
};

/**
 * Page 404 du site (remplace la page blanche en anglais de Next.js).
 * La barre du site (Vexi / Portfolio) reste au-dessus : elle vient du layout racine.
 */
export default function PageIntrouvable() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-night px-6 pt-[var(--site-header-h)] text-center">
      <span className="text-6xl" aria-hidden>
        🏳️
      </span>
      <h1 className="font-display text-4xl text-cream sm:text-5xl">Ce drapeau n&apos;existe pas</h1>
      <p className="max-w-md text-base text-cream-muted">
        La page que tu cherches est introuvable. Elle a peut-être changé d&apos;adresse, ou le lien
        est incomplet.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-vexi-accent px-6 py-3 font-sans text-sm font-medium text-night transition-opacity hover:opacity-90"
        >
          Jouer à Vexi World
        </Link>
        <Link
          href="/portfolio"
          className="rounded-full border border-border px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:border-cream/40"
        >
          Voir le portfolio monteur
        </Link>
      </div>
    </main>
  );
}
