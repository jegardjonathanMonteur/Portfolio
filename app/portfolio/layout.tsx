import type { Metadata } from "next";
import { CursorFollower } from "@/components/CursorFollower";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { SoundToggle } from "@/components/SoundToggle";
import { SITE } from "@/lib/site";

const PORTFOLIO_TITLE = `${SITE.name} · ${SITE.tagline}`;
const PORTFOLIO_DESCRIPTION = `Portfolio de Jonathan Jegard, ${SITE.tagline} · ${SITE.location}`;

export const metadata: Metadata = {
  title: PORTFOLIO_TITLE,
  description: PORTFOLIO_DESCRIPTION,
  openGraph: {
    title: PORTFOLIO_TITLE,
    description: PORTFOLIO_DESCRIPTION,
    siteName: SITE.name,
    locale: "fr_FR",
    type: "website",
    url: "/portfolio",
    images: [
      {
        url: "https://jonathanjegard.com/hero-bg.jpg",
        alt: `${SITE.name} · ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PORTFOLIO_TITLE,
    description: PORTFOLIO_DESCRIPTION,
    images: ["https://jonathanjegard.com/hero-bg.jpg"],
  },
};

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="portfolio-root">
      <Navbar />
      {children}
      <CursorFollower />
      <CustomCursor />
      {/* Musique d'ambiance du portfolio (jamais côté Vexi) : règles dans SoundToggle.tsx. */}
      <SoundToggle />
    </div>
  );
}
