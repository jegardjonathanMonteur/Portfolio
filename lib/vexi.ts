/**
 * Source unique des constantes Vexi.
 * Pour changer la couleur d'accent de l'app plus tard : modifier uniquement VEXI_ACCENT.
 */

/** Accent Vexi — une seule variable, branchée dans Tailwind via tailwind.config.ts */
export const VEXI_ACCENT = "#5B8CFF";

/**
 * L'app n'est pas encore publique. Tant que false, le bouton Google Play
 * reste masqué. L'app est en cours de validation sur le Play Store.
 */
export const APP_PUBLIEE = false;

export const VEXI_SEO = {
  title: "Vexi — À REMPLACER",
  description: "Vexi, le jeu mobile de drapeaux. À REMPLACER.",
} as const;

export const VEXI_TAGLINE = "À REMPLACER — le jeu mobile de drapeaux.";

export const VEXI_MODES = [
  {
    id: "classique",
    name: "Classique",
    description: "À REMPLACER — mode Classique.",
  },
  {
    id: "defi-quotidien",
    name: "Défi Quotidien",
    description: "À REMPLACER — mode Défi Quotidien.",
  },
  {
    id: "revision",
    name: "Révision",
    description: "À REMPLACER — mode Révision.",
  },
  {
    id: "marathon",
    name: "Marathon",
    description: "À REMPLACER — mode Marathon.",
  },
  {
    id: "mosaique",
    name: "Mosaïque",
    description: "À REMPLACER — mode Mosaïque.",
  },
  {
    id: "memoire",
    name: "Mémoire",
    description: "À REMPLACER — mode Mémoire.",
  },
] as const;

export const VEXI_NAV = [
  { label: "Présentation", href: "#presentation" },
  { label: "Jouer", href: "#jouer" },
  { label: "Télécharger", href: "#telecharger" },
] as const;
