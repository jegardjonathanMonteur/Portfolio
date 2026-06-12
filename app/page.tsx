import AboutServices from "@/components/AboutServices";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { Tools } from "@/components/Tools";

/**
 * Page d'accueil — assemblage des 5 sections cinématographiques.
 */
export default function Home() {
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
