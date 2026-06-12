import { Inter } from "next/font/google";
import localFont from "next/font/local";

/** Corps — Inter (Google Fonts) */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

/** Titres — Ghodtail (fichier local) */
export const fontDisplay = localFont({
  src: [{ path: "../fonts/gohdtail.woff2", weight: "400", style: "normal" }],
  variable: "--font-gohdtail",
  display: "swap",
  fallback: ["Ghodtail", "Georgia", "serif"],
});
