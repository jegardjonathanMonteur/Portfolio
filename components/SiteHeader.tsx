"use client";

import { SITE } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isPortfolio = pathname === "/portfolio" || pathname.startsWith("/portfolio/");

  return (
    <header className="site-header">
      <nav
        className="flex h-full items-center justify-center gap-2 px-4 sm:gap-6"
        aria-label="Espaces du site"
      >
        <Link
          href="/"
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
          Portfolio monteur
        </Link>
      </nav>
      {/* Mentions légales : discrètes mais accessibles depuis toutes les pages (obligation légale). */}
      <Link
        href="/mentions-legales"
        className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-[10px] tracking-[0.08em] text-[#E8E0D0]/40 transition-colors hover:text-[#E8E0D0]/80 sm:right-5"
      >
        <span className="hidden sm:inline">Mentions légales</span>
        <span className="sm:hidden">Légal</span>
      </Link>
    </header>
  );
}
