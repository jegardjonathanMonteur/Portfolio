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

        <section
          id="jouer"
          className="mx-auto max-w-5xl px-6 py-24 md:px-12"
        >
          <h2 className="font-display text-4xl text-[#E8E0D0] md:text-6xl">
            Jouer
          </h2>
          <p className="mt-6 font-sans text-base font-light text-[#E8E0D0]/60">
            Démo jouable bientôt disponible
          </p>
          <div className="mt-10 min-h-[200px] rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6">
            <VexiJeu />
          </div>
        </section>

        <VexiTelecharger />
      </main>
    </div>
  );
}
