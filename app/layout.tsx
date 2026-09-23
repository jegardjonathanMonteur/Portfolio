import type { Metadata } from "next";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { VEXI_SEO } from "@/lib/vexi";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jonathanjegard.com"),
  title: VEXI_SEO.title,
  description: VEXI_SEO.description,
  openGraph: {
    title: VEXI_SEO.title,
    description: VEXI_SEO.description,
    siteName: "Vexi",
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
    >
      <body>
        <GrainOverlay />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
