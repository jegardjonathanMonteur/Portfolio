/**
 * Source unique des constantes Vexi.
 * Pour changer la couleur d'accent de l'app plus tard : modifier uniquement VEXI_ACCENT.
 */

/** Accent Vexi — une seule variable, branchée dans Tailwind via tailwind.config.ts */
export const VEXI_ACCENT = "#5B8CFF";

/**
 * L'app n'est pas encore publique. Tant que false, la vitrine téléphone affiche
 * « Bientôt sur Google Play » (non cliquable) au lieu du vrai bouton.
 * À passer à true le jour J, en même temps que la mise en ligne du site.
 */
export const APP_PUBLIEE = false;

/** Fiche Play Store de Vexi World, sans marqueur. */
const FICHE_PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.jonathanjegard.vexiworld";

/**
 * Bouton Google Play de la vitrine téléphone. Le marqueur `site_mobile` fait
 * apparaître dans la Play Console les installations venues du site sur téléphone
 * (visiteurs Instagram surtout), à part de celles de la démo PC (`site_bouton`, `site_qr`).
 */
export const URL_PLAY_STORE_MOBILE = `${FICHE_PLAY_STORE}&referrer=${encodeURIComponent(
  "utm_source=site_mobile",
)}`;

/** Compte Instagram du jeu. */
export const VEXI_INSTAGRAM = "https://www.instagram.com/vexi_world/";

/** Adresse publique du site, copiée par le bouton « Copier le lien » (iPhone / iPad). */
export const URL_SITE_PUBLIC = "https://jonathanjegard.com";

/**
 * « Soutenir Vexi » : lien de paiement Stripe (montant libre 2 à 100 €, 5 € proposés),
 * créé le 28/09/2026. Après paiement, Stripe renvoie sur https://jonathanjegard.com/?merci=1.
 */
const LIEN_STRIPE_SOUTIEN = "https://buy.stripe.com/fZu9ATewacGde3g3wt8og00";

/**
 * Interrupteur du bouton « Soutenir Vexi ». false = « Bientôt disponible ».
 * À passer à true seulement quand Jonathan dit « active », en même temps que
 * SOUTIEN_ACTIF dans la démo (jeu-drapeaux/src/config/demo.ts).
 */
export const SOUTIEN_ACTIF = false;

/**
 * Bouton « Soutenir Vexi » de la vitrine téléphone : ouvre directement Stripe
 * (Apple Pay / Google Pay proposés sur place). Marqueur `site_mobile` pour les
 * statistiques Stripe. Vide tant que le soutien n'est pas activé.
 */
export const URL_SOUTIEN = SOUTIEN_ACTIF ? `${LIEN_STRIPE_SOUTIEN}?utm_source=site_mobile` : "";

/** Captures de l'app montrées dans la vitrine téléphone (public/vexi/captures).
 * Légendes traduites dans lib/textes-site.ts (clé `captures`). */
export const VEXI_CAPTURES = [
  { src: "/vexi/captures/defi.webp", cle: "defi" },
  { src: "/vexi/captures/contre-la-montre.webp", cle: "clm" },
  { src: "/vexi/captures/mosaique.webp", cle: "mosaique" },
  { src: "/vexi/captures/carte.webp", cle: "carte" },
  { src: "/vexi/captures/revision.webp", cle: "revision" },
] as const;

export const VEXI_SEO = {
  title: "Vexi World : devine les drapeaux du monde",
  description:
    "Joue gratuitement à Vexi World, le jeu de drapeaux : Défi du jour, Classique, Révision des 197 pays. La démo sur ordi, le jeu complet sur Android.",
} as const;

export const VEXI_TAGLINE = "Le jeu de drapeaux : devine les drapeaux du monde.";

/** Modes dans l'ordre de l'app (textes repris de l'écran d'accueil de l'app). */
export const VEXI_MODES = [
  {
    id: "defi-quotidien",
    name: "Défi du jour",
    description: "Un nouveau défi chaque jour, et ta flamme qui grandit.",
  },
  {
    id: "classique",
    name: "Classique",
    description: "Choisis la difficulté et les continents, et trouve les drapeaux.",
  },
  {
    id: "contre-la-montre",
    name: "Contre-la-montre",
    description: "Choisis ton chrono, réponds vite avant la fin du compte à rebours.",
  },
  {
    id: "marathon",
    name: "Marathon",
    description: "197 pays d'affilée. Une nouvelle saison chaque mois.",
  },
  {
    id: "memoire",
    name: "Mémoire",
    description: "Cite les pays de tête, ou retiens la suite.",
  },
  {
    id: "mosaique",
    name: "Mosaïque",
    description: "2 à 4 fragments de drapeaux à reconnaître.",
  },
  {
    id: "revision",
    name: "Révision",
    description: "Les 197 drapeaux et leur histoire, pour apprendre à ton rythme.",
  },
] as const;

export const VEXI_NAV = [
  { label: "Présentation", href: "#presentation" },
  { label: "Jouer", href: "#jouer" },
  { label: "Télécharger", href: "#telecharger" },
] as const;
