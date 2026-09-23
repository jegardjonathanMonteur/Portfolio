import AboutServices from "@/components/AboutServices";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { Tools } from "@/components/Tools";

/**
 * Portfolio monteur — contenu identique à l'ancienne page d'accueil.
 */
export default function PortfolioPage() {
  return (
    <main>
      <Hero />
      <SelectedWork />
      <AboutServices />
      <Tools />
      <Contact />
    </main>
  );
}
