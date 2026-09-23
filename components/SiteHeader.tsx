"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SPACES = [
  { label: "Vexi", href: "/" },
  { label: "Portfolio monteur", href: "/portfolio" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isPortfolio = pathname === "/portfolio" || pathname.startsWith("/portfolio/");

  return (
    <header className="site-header">
      <nav
        className="mx-auto flex h-full max-w-6xl items-center justify-center gap-2 px-4 sm:gap-6"
        aria-label="Espaces du site"
      >
        {SPACES.map((space) => {
          const isActive =
            space.href === "/portfolio" ? isPortfolio : !isPortfolio;
          return (
            <Link
              key={space.href}
              href={space.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 sm:px-4 sm:text-xs ${
                isActive
                  ? isPortfolio
                    ? "bg-white/10 text-[#E8E0D0]"
                    : "bg-vexi-accent/20 text-vexi-accent"
                  : "text-[#E8E0D0]/55 hover:text-[#E8E0D0]"
              }`}
            >
              {space.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
