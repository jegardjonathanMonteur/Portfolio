"use client";

import { useLangueSite } from "@/lib/langue-site";
import { SITE } from "@/lib/site";
import { TEXTES_SITE } from "@/lib/textes-site";
import {
  applyVexiHeaderNight,
  isVexiNightFromStorage,
  prefersColorSchemeDark,
  VEXI_THEME_STORAGE_KEY,
} from "@/lib/vexi-header-theme";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const isPortfolio = pathname === "/portfolio" || pathname.startsWith("/portfolio/");
  // Libellés dans la langue du visiteur (règle du 25/09 : barre, vitrine et 404 traduites).
  const T = TEXTES_SITE[useLangueSite()].barre;

  useLayoutEffect(() => {
    if (isPortfolio) {
      applyVexiHeaderNight(false);
      return;
    }

    const sync = () => {
      applyVexiHeaderNight(
        isVexiNightFromStorage(
          localStorage.getItem(VEXI_THEME_STORAGE_KEY),
          prefersColorSchemeDark(),
        ),
      );
    };

    sync();

    const onStorage = (event: StorageEvent) => {
      if (event.key === VEXI_THEME_STORAGE_KEY || event.key === null) {
        sync();
      }
    };
    window.addEventListener("storage", onStorage);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      const stored = localStorage.getItem(VEXI_THEME_STORAGE_KEY);
      if (stored !== "clair" && stored !== "sombre") {
        sync();
      }
    };
    mql.addEventListener("change", onScheme);

    return () => {
      window.removeEventListener("storage", onStorage);
      mql.removeEventListener("change", onScheme);
      applyVexiHeaderNight(false);
    };
  }, [isPortfolio]);

  return (
    <header className="site-header">
      <nav
        className="flex h-full items-center justify-center gap-2 px-4 sm:gap-6"
        aria-label="Espaces du site"
      >
        <Link
          href="/vexi"
          aria-current={!isPortfolio ? "page" : undefined}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 sm:px-4 sm:text-xs ${
            !isPortfolio
              ? "bg-vexi-accent/20 text-vexi-accent"
              : "text-[#E8E0D0]/55 hover:text-[#E8E0D0]"
          }`}
        >
          <Image
            src="/logos/vexi.png"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] shrink-0 rounded-full"
          />
          Vexi
        </Link>
        <Link
          href="/portfolio"
          aria-current={isPortfolio ? "page" : undefined}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 sm:px-4 sm:text-xs ${
            isPortfolio
              ? "bg-white/10 text-[#E8E0D0]"
              : "text-[#E8E0D0]/55 hover:text-[#E8E0D0]"
          }`}
        >
          <span
            className="font-display text-sm leading-none text-[#E8E0D0]"
            aria-hidden
          >
            {SITE.initials}
          </span>
          {/* Sur téléphone, libellé court : sinon il chevauche « Légal » à droite. */}
          <span className="hidden sm:inline">{T.portfolio}</span>
          <span className="sm:hidden">{T.portfolioCourt}</span>
        </Link>
      </nav>
      {/* Mentions légales : discrètes mais accessibles depuis toutes les pages (obligation légale). */}
      <Link
        href="/mentions-legales"
        className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-[10px] tracking-[0.08em] text-[#E8E0D0]/40 transition-colors hover:text-[#E8E0D0]/80 sm:right-5"
      >
        <span className="hidden sm:inline">{T.mentions}</span>
        <span className="sm:hidden">{T.mentionsCourt}</span>
      </Link>
    </header>
  );
}
