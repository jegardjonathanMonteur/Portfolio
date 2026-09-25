import type { Metadata } from "next";
import { PageIntrouvableContenu } from "@/components/PageIntrouvableContenu";

export const metadata: Metadata = {
  title: "Page introuvable · Vexi World",
  robots: { index: false },
};

/**
 * Page 404 du site (remplace la page blanche en anglais de Next.js).
 * La barre du site (Vexi / Portfolio) reste au-dessus : elle vient du layout racine.
 * Textes traduits dans la langue du visiteur : components/PageIntrouvableContenu.tsx.
 */
export default function PageIntrouvable() {
  return <PageIntrouvableContenu />;
}
