"use client";

import type { Appareil } from "@/lib/appareil";
import {
  APP_PUBLIEE,
  URL_PLAY_STORE_MOBILE,
  URL_SITE_PUBLIC,
  URL_SOUTIEN,
  VEXI_CAPTURES,
  VEXI_INSTAGRAM,
  VEXI_MODES,
} from "@/lib/vexi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = { appareil: Exclude<Appareil, "pc"> };

/**
 * Vitrine Vexi sur téléphone et tablette (règles validées le 25/09).
 * Pas de jeu ici : on donne envie, et on envoie vers l'app.
 * Couleurs : suivent le mode clair / sombre du téléphone (voir .vexi-vitrine dans globals.css).
 */
export function VexiVitrineMobile({ appareil }: Props) {
  const estIos = appareil === "ios";

  return (
    <div className="vexi-vitrine">
      <main className="mx-auto flex max-w-xl flex-col px-5 pb-16">
        {/* 1. Qui on est */}
        <section className="flex flex-col items-center pt-10 text-center">
          <Image
            src="/logos/vexi.png"
            alt="Logo Vexi World"
            width={88}
            height={88}
            priority
            className="h-[88px] w-[88px] rounded-full shadow-lg"
          />
          <h1 className="mt-5 font-sans text-[2.4rem] font-bold leading-none tracking-tight text-[color:var(--vv-accent)]">
            Vexi World
          </h1>
          <p className="mt-3 font-sans text-lg font-medium text-[color:var(--vv-texte)]">
            Reconnais les 197 drapeaux du monde.
          </p>
          <p className="mt-1 font-sans text-sm text-[color:var(--vv-doux)]">
            Un nouveau défi chaque jour.
          </p>
        </section>

        {/* 2. Le bouton principal */}
        <section className="mt-8">{estIos ? <BlocIos /> : <BoutonGooglePlay />}</section>

        {/* 3. Captures */}
        <section className="mt-12" aria-label="Captures de l'application">
          <h2 className="vv-titre-section px-0">En images</h2>
          <div className="vv-carrousel -mx-5 mt-4 flex gap-4 overflow-x-auto px-5 pb-2">
            {VEXI_CAPTURES.map((c) => (
              <figure key={c.src} className="w-[62vw] max-w-[250px] shrink-0 snap-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={`Vexi World : ${c.legende}`}
                  width={540}
                  height={960}
                  loading="lazy"
                  className="h-auto w-full rounded-[22px] border border-[color:var(--vv-bord)] shadow-md"
                />
                <figcaption className="mt-2 text-center font-sans text-sm text-[color:var(--vv-doux)]">
                  {c.legende}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 4. Les modes */}
        <section className="mt-12">
          <h2 className="vv-titre-section">Les modes</h2>
          <ul className="mt-4 grid gap-3">
            {VEXI_MODES.map((mode) => (
              <li key={mode.id} className="vv-carte px-4 py-4">
                <h3 className="font-sans text-base font-semibold text-[color:var(--vv-texte)]">
                  {mode.name}
                </h3>
                <p className="mt-1 font-sans text-sm leading-relaxed text-[color:var(--vv-doux)]">
                  {mode.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Soutenir */}
        <section className="vv-carte mt-12 flex flex-col items-center px-5 py-6 text-center">
          <p className="font-sans text-sm leading-relaxed text-[color:var(--vv-doux)]">
            Vexi World est créé par une seule personne. Tu peux aider le projet à grandir.
          </p>
          {URL_SOUTIEN ? (
            <a
              href={URL_SOUTIEN}
              target="_blank"
              rel="noopener noreferrer"
              className="vv-bouton-secondaire mt-4"
            >
              ♥ Soutenir Vexi
            </a>
          ) : (
            <>
              <span className="vv-bouton-secondaire vv-inactif mt-4" aria-disabled="true">
                ♥ Soutenir Vexi
              </span>
              <span className="mt-2 font-sans text-xs text-[color:var(--vv-doux)]">
                Bientôt disponible
              </span>
            </>
          )}
        </section>

        {/* 6. La démo sur ordi (déjà dite dans le bloc iPhone, donc pas répétée) */}
        {estIos ? null : (
          <p className="mt-10 text-center font-sans text-sm text-[color:var(--vv-doux)]">
            Sur ordi, une démo jouable t&apos;attend sur jonathanjegard.com.
          </p>
        )}
      </main>
    </div>
  );
}

/** Android et autres : le bouton Google Play (inactif tant que l'app n'est pas publique). */
function BoutonGooglePlay() {
  if (!APP_PUBLIEE) {
    return (
      <span className="vv-bouton-principal vv-inactif" aria-disabled="true">
        <IconeGooglePlay />
        Bientôt sur Google Play
      </span>
    );
  }
  return (
    <a
      href={URL_PLAY_STORE_MOBILE}
      target="_blank"
      rel="noopener noreferrer"
      className="vv-bouton-principal"
    >
      <IconeGooglePlay />
      Télécharger sur Google Play
    </a>
  );
}

/** iPhone et iPad : pas encore d'app, on propose Instagram et la démo sur ordi. */
function BlocIos() {
  const { message, afficher, monte } = useMessage();

  async function copierLien() {
    // Certains navigateurs laissent la copie « en attente » (autorisation demandée) :
    // au bout d'1,5 s sans réponse, on affiche l'adresse pour que le visiteur la note.
    const delai = new Promise<"trop-long">((ok) => setTimeout(() => ok("trop-long"), 1500));
    try {
      const resultat = await Promise.race([
        navigator.clipboard.writeText(URL_SITE_PUBLIC).then(() => "copie" as const),
        delai,
      ]);
      afficher(
        resultat === "copie"
          ? "Lien copié, ouvre-le sur ton ordi"
          : "Sur ton ordi, va sur jonathanjegard.com",
      );
    } catch {
      afficher("Sur ton ordi, va sur jonathanjegard.com");
    }
  }

  return (
    <div className="vv-carte flex flex-col items-center px-5 py-6 text-center">
      <p className="font-sans text-lg font-semibold text-[color:var(--vv-texte)]">
        Pas encore sur iPhone et iPad
      </p>
      <p className="mt-1 font-sans text-sm text-[color:var(--vv-doux)]">
        Vexi World sort d&apos;abord sur Android.
      </p>

      <a
        href={VEXI_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="vv-bouton-principal mt-5"
      >
        <IconeInstagram />
        Suis @vexi_world
      </a>
      <p className="mt-2 font-sans text-xs text-[color:var(--vv-doux)]">
        pour savoir quand ça arrive
      </p>

      <div className="mt-6 h-px w-full bg-[color:var(--vv-bord)]" />

      <p className="mt-5 font-sans text-sm text-[color:var(--vv-texte)]">
        Joue à la démo sur ton ordi
      </p>
      <button type="button" onClick={() => void copierLien()} className="vv-bouton-secondaire mt-3">
        Copier le lien
      </button>

      {monte
        ? createPortal(
            <div
              role="status"
              aria-live="polite"
              className={`vv-toast ${message ? "" : "vv-toast-cache"}`}
            >
              {message ?? ""}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

/** Petit message en bas de l'écran pendant 2,8 s. */
function useMessage() {
  const [message, setMessage] = useState<string | null>(null);
  const [monte, setMonte] = useState(false);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMonte(true);
    return () => {
      if (minuteur.current) clearTimeout(minuteur.current);
    };
  }, []);

  function afficher(texte: string) {
    setMessage(texte);
    if (minuteur.current) clearTimeout(minuteur.current);
    minuteur.current = setTimeout(() => setMessage(null), 2800);
  }

  return { message, afficher, monte };
}

function IconeGooglePlay() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M4.5 2.6c-.3.3-.5.8-.5 1.4v16c0 .6.2 1.1.5 1.4l.1.1 9-9v-.2l-9-9-.1.1z" />
      <path d="M16.6 15.5l-3-3v-.2l3-3 .1.1 3.6 2c1 .6 1 1.5 0 2.1l-3.6 2-.1 0z" opacity=".85" />
      <path d="M16.7 15.4l-3.1-3.1-9.1 9.1c.3.4.9.4 1.5.1l10.7-6.1" opacity=".7" />
      <path d="M16.7 9.2L6 3.1c-.6-.4-1.2-.3-1.5.1l9.1 9.1 3.1-3.1z" opacity=".55" />
    </svg>
  );
}

function IconeInstagram() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
