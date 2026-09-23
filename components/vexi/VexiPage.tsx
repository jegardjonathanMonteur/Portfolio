"use client";

import { VexiJeu } from "@/components/vexi/VexiJeu";
import { VexiNav } from "@/components/vexi/VexiNav";
import { VexiPresentation } from "@/components/vexi/VexiPresentation";
import { VexiTelecharger } from "@/components/vexi/VexiTelecharger";

export function VexiPage() {
  return (
    <div className="vexi-root">
      <VexiNav />
      <main>
        <VexiPresentation />

        <section id="jouer">
          <h2 className="sr-only">Jouer</h2>
          <VexiJeu />
        </section>

        <VexiTelecharger />
      </main>
    </div>
  );
}
