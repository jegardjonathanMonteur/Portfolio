import type { Metadata } from "next";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { VEXI_HEADER_THEME_BOOT } from "@/lib/vexi-header-theme";
import { VEXI_SEO } from "@/lib/vexi";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jonathanjegard.com"),
  title: VEXI_SEO.title,
  description: VEXI_SEO.description,
  openGraph: {
    title: VEXI_SEO.title,
    description: VEXI_SEO.description,
    siteName: "Vexi World",
    locale: "fr_FR",
    type: "website",
    url: "/",
  },
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
      suppressHydrationWarning
    >
      <head>
        <Script
          id="vexi-header-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: VEXI_HEADER_THEME_BOOT }}
        />
      </head>
      <body>
        <GrainOverlay />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
