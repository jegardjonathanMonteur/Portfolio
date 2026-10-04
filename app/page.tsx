import { redirect } from "next/navigation";

/**
 * jonathanjegard.com (adresse nue) : la page Vexi vit maintenant sur /vexi (règle du 04/10/2026).
 * Le renvoi est déjà fait par next.config.mjs avant d'arriver ici ; ce fichier est un filet
 * de sécurité. On garde les paramètres de l'adresse (?merci=1 au retour de Stripe, utm_…).
 * Les ancres (#contact…) suivent toutes seules : le navigateur les garde pendant un renvoi.
 */
export default function Accueil({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const q = new URLSearchParams();
  for (const [cle, valeur] of Object.entries(searchParams)) {
    if (typeof valeur === "string") q.append(cle, valeur);
    else valeur?.forEach((v) => q.append(cle, v));
  }
  const suite = q.toString();
  redirect(suite ? `/vexi?${suite}` : "/vexi");
}
