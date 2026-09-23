import { APP_PUBLIEE } from "@/lib/vexi";

/**
 * Bouton Google Play masqué tant que APP_PUBLIEE === false.
 * L'app est en cours de validation sur le Play Store.
 */
export function VexiTelecharger() {
  return (
    <section
      id="telecharger"
      className="mx-auto max-w-5xl px-6 py-24 md:px-12"
    >
      <h2 className="font-display text-4xl text-[#E8E0D0] md:text-6xl">
        Télécharger
      </h2>
      <p className="mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-[#E8E0D0]/60">
        L&apos;application est en cours de validation sur le Play Store.
      </p>
      {APP_PUBLIEE ? (
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-full bg-vexi-accent px-6 py-3 font-sans text-sm text-white transition-opacity hover:opacity-90"
        >
          Google Play
        </a>
      ) : null}
    </section>
  );
}
