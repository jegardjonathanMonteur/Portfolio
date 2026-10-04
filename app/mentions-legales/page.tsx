import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales · jonathanjegard.com",
  description: "Mentions légales et données personnelles du site jonathanjegard.com (Vexi World et portfolio).",
};

/**
 * Mentions légales (obligatoires pour un site professionnel en France, loi LCEN art. 6).
 * À mettre à jour si l'adresse, le statut ou l'hébergeur changent,
 * et quand « Soutenir Vexi » (Stripe) ou un outil de mesure d'audience seront actifs.
 */
export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-night px-6 pb-20 pt-[calc(var(--site-header-h)+3rem)] text-cream">
      <div className="mx-auto max-w-2xl space-y-10">
        <header className="space-y-3">
          <h1 className="font-display text-4xl sm:text-5xl">Mentions légales</h1>
          <p className="text-sm text-cream-muted">Dernière mise à jour : 25 septembre 2026</p>
        </header>

        <section className="space-y-2">
          <h2 className="font-display text-2xl">Éditeur du site</h2>
          <p className="leading-relaxed text-cream-muted">
            Jonathan Jegard, entrepreneur individuel (micro-entreprise)
            <br />
            65 rue Louis Braille, 29280 Plouzané, France
            <br />
            SIRET : 908 968 506 00034
            <br />
            Contact :{" "}
            <a className="text-cream underline underline-offset-4" href="mailto:jegardjonathan@gmail.com">
              jegardjonathan@gmail.com
            </a>
            <br />
            Directeur de la publication : Jonathan Jegard
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl">Hébergement</h2>
          <p className="leading-relaxed text-cream-muted">
            Vercel Inc.
            <br />
            440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis
            <br />
            vercel.com
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl">Contenu du site</h2>
          <p className="leading-relaxed text-cream-muted">
            Le site présente le jeu Vexi World (démo jouable) et le portfolio de Jonathan Jegard,
            monteur vidéo et motion designer. Les textes, visuels, vidéos et le jeu sont la
            propriété de Jonathan Jegard, sauf mention contraire. Toute reproduction sans
            autorisation est interdite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl">Données personnelles</h2>
          <p className="leading-relaxed text-cream-muted">
            La démo de Vexi World ne demande aucun compte et ne dépose aucun cookie. Ta progression
            (parties jouées, série, réglages comme le son ou le thème) est enregistrée uniquement
            dans ton navigateur, sur ton appareil. Elle n&apos;est jamais envoyée à un serveur et tu
            peux l&apos;effacer à tout moment en vidant les données du site dans ton navigateur.
          </p>
          <p className="leading-relaxed text-cream-muted">
            Si tu écris par e-mail, ton adresse et ton message servent uniquement à te répondre.
            Pour toute question sur tes données, écris à{" "}
            <a className="text-cream underline underline-offset-4" href="mailto:jegardjonathan@gmail.com">
              jegardjonathan@gmail.com
            </a>
            .
          </p>
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/vexi"
            className="rounded-full bg-vexi-accent px-6 py-3 font-sans text-sm font-medium text-night transition-opacity hover:opacity-90"
          >
            Retour à Vexi World
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-border px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:border-cream/40"
          >
            Portfolio monteur
          </Link>
        </div>
      </div>
    </main>
  );
}
