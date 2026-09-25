"use client";

import { VexiJeu } from "@/components/vexi/VexiJeu";
import { VexiVitrineMobile } from "@/components/vexi/VexiVitrineMobile";
import { detecterAppareil, type Appareil } from "@/lib/appareil";
import { useEffect, useState } from "react";

/**
 * Page Vexi (/).
 * - Ordinateur : la démo jouable (iframe), comme avant.
 * - Téléphone ou tablette : la vitrine, sans jeu, qui envoie vers l'app.
 *
 * Le choix se fait dans le navigateur (le serveur ne sait pas quel écran regarde).
 * Tant qu'on ne sait pas, on n'affiche rien : ça évite de charger la démo pour rien
 * sur un téléphone, et ça ne dure qu'un instant.
 */
export function VexiPage() {
  const [appareil, setAppareil] = useState<Appareil | null>(null);

  useEffect(() => {
    setAppareil(detecterAppareil());
  }, []);

  if (appareil === null) {
    return <div className="vexi-attente" aria-hidden />;
  }

  if (appareil === "pc") {
    return (
      <div className="vexi-root">
        <main>
          <VexiJeu />
        </main>
      </div>
    );
  }

  return <VexiVitrineMobile appareil={appareil} />;
}
