/**
 * Quel appareil regarde le site ? Sert à choisir entre la démo jouable (ordinateur)
 * et la vitrine (téléphone ou tablette).
 *
 * Règles validées le 25/09 :
 * - iPhone, iPad (même un iPad qui se fait passer pour un Mac) → « ios »
 * - Android (téléphone ou tablette) → « android »
 * - autre écran tactile sans souris → « autre-mobile » (on lui montre Google Play)
 * - tout le reste, y compris un ordinateur portable à écran tactile → « pc »
 */
export type Appareil = "pc" | "android" | "ios" | "autre-mobile";

const VALEURS: readonly Appareil[] = ["pc", "android", "ios", "autre-mobile"];

export function detecterAppareil(): Appareil {
  // En local seulement : ?appareil=ios (ou android, pc…) pour voir chaque cas sur l'ordi.
  if (process.env.NODE_ENV !== "production") {
    const force = new URLSearchParams(window.location.search).get("appareil");
    if (force && (VALEURS as readonly string[]).includes(force)) {
      return force as Appareil;
    }
  }

  const ua = navigator.userAgent;
  // Depuis 2019, Safari sur iPad annonce « Macintosh » : un Mac n'a pas d'écran tactile,
  // donc « Macintosh » + plusieurs points de contact = iPad.
  const estIos =
    /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (estIos) return "ios";
  if (/Android/i.test(ua)) return "android";

  // Écran tactile dont le pointeur principal est le doigt (pas de souris).
  const tactileSansSouris = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  return tactileSansSouris ? "autre-mobile" : "pc";
}
