import type { Metadata } from "next";
import { CursorFollower } from "@/components/CursorFollower";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Navbar } from "@/components/Navbar";
import { SoundToggle } from "@/components/SoundToggle";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: `Portfolio de Jonathan Jegard, ${SITE.tagline} — ${SITE.location}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <body>
        <GrainOverlay />
        <Navbar />
        {children}
        <CursorFollower />
        <CustomCursor />
        <SoundToggle />
      </body>
    </html>
  );
}
