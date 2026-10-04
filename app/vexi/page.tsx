import { RedirectionAnciensLiens } from "@/components/RedirectionAnciensLiens";
import { VexiPage } from "@/components/vexi/VexiPage";

/**
 * Page Vexi : jonathanjegard.com/vexi (règles validées le 04/10/2026).
 * Ordinateur : la démo jouable. Téléphone / tablette : la vitrine qui envoie vers l'app.
 * L'adresse nue jonathanjegard.com renvoie ici (next.config.mjs), en gardant ?merci=1 etc.
 */
export default function PageVexi() {
  return (
    <>
      <RedirectionAnciensLiens />
      <VexiPage />
    </>
  );
}
