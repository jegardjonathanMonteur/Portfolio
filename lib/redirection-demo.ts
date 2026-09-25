/**
 * Faut-il renvoyer vers la vitrine (/) quelqu'un qui ouvre l'adresse de la démo (/demo/…) ?
 *
 * Règle validée le 25/09 : sur téléphone ou tablette, pas de démo jouable.
 * On ne renvoie que l'ouverture de la PAGE elle-même :
 * - pas les fichiers de la démo (scripts, images), sinon la démo casserait sur PC ;
 * - pas la démo affichée dans le site sur ordi (le navigateur l'annonce comme « iframe »).
 *
 * Limite connue : un iPad qui se fait passer pour un Mac n'est pas reconnu ici
 * (le serveur ne voit pas l'écran tactile). Il verrait la démo s'il tapait /demo/ à la main.
 */
const APPAREIL_MOBILE = /Android|iPhone|iPad|iPod|Mobile/i;

export function doitRenvoyerVersVitrine(
  chemin: string,
  userAgent: string,
  destination: string | null,
): boolean {
  if (!APPAREIL_MOBILE.test(userAgent)) return false;
  // Navigateurs récents : ils disent ce qu'ils chargent (« document » = une page ouverte).
  if (destination) return destination === "document";
  // Vieux navigateurs : on ne touche qu'aux adresses sans extension de fichier.
  return !/\.[a-z0-9]+$/i.test(chemin) || chemin.endsWith("/index.html");
}
