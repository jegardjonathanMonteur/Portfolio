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
  title: "Vexi World : devine les drapeaux du monde",
  description:
    "Joue gratuitement à Vexi World, le jeu de drapeaux : Défi du jour, Classique, Révision des 197 pays. La démo sur ordi, le jeu complet sur Android.",
} as const;

export const VEXI_TAGLINE = "Le jeu de drapeaux : devine les drapeaux du monde.";

export const VEXI_MODES = [
  {
    id: "classique",
    name: "Classique",
    description: "Le mode principal : choisis la difficulté et les continents, et trouve les drapeaux.",
  },
  {
    id: "defi-quotidien",
    name: "Défi Quotidien",
    description: "Un nouveau défi chaque jour, et ta flamme qui grandit.",
  },
  {
    id: "revision",
    name: "Révision",
    description: "Une galerie des 197 drapeaux, pour apprendre à ton rythme.",
  },
  {
    id: "marathon",
    name: "Marathon",
    description: "Les 197 drapeaux à la suite, sans t'arrêter.",
  },
  {
    id: "mosaique",
    name: "Mosaïque",
    description: "Plusieurs drapeaux se partagent le même tableau : retrouve-les tous.",
  },
  {
    id: "memoire",
    name: "Mémoire",
    description: "Cite les pays de tête, ou restitue une suite de drapeaux dans l'ordre.",
  },
] as const;

export const VEXI_NAV = [
  { label: "Présentation", href: "#presentation" },
  { label: "Jouer", href: "#jouer" },
  { label: "Télécharger", href: "#telecharger" },
] as const;
