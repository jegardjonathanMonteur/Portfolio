"use client";

import { VexiJeu } from "@/components/vexi/VexiJeu";
import { VexiVitrineMobile } from "@/components/vexi/VexiVitrineMobile";
import { detecterAppareil, type Appareil } from "@/lib/appareil";
import { useEffect, useState } from "react";

/** Largeur mini pour la démo PC (même seuil que DEMO_PC_MIN_LARGEUR dans le jeu). */
const LARGEUR_MIN_DEMO = 1200;

/**
 * Page Vexi (/).
 * - Ordinateur, fenêtre d'au moins 1200 px : la démo jouable (iframe).
 * - Ordinateur, fenêtre plus étroite : la vitrine, avec « Agrandis la fenêtre… ».
 *   Dès que la fenêtre est assez large, la démo réapparaît (règle validée le 25/09).
 * - Téléphone ou tablette : la vitrine, sans jeu, qui envoie vers l'app.
 *
 * Le choix se fait dans le navigateur (le serveur ne sait pas quel écran regarde).
 * Tant qu'on ne sait pas, on n'affiche rien : ça évite de charger la démo pour rien
 * sur un téléphone, et ça ne dure qu'un instant.
 */
export function VexiPage() {
  const [appareil, setAppareil] = useState<Appareil | null>(null);
  const [fenetreEtroite, setFenetreEtroite] = useState(false);

  useEffect(() => {
    setAppareil(detecterAppareil());
    const mesurer = () => setFenetreEtroite(window.innerWidth < LARGEUR_MIN_DEMO);
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, []);

  if (appareil === null) {
    return <div className="vexi-attente" aria-hidden />;
  }

  if (appareil === "pc" && !fenetreEtroite) {
    return (
      <div className="vexi-root">
        <main>
          <VexiJeu />
        </main>
      </div>
    );
  }

  return <VexiVitrineMobile appareil={appareil} fenetreEtroite={appareil === "pc"} />;
}
