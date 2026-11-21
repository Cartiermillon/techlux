import type { Metadata } from "next";
import { PartnersDirectory } from "@/components/partners-directory";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Partenaires européens",
  description:
    "Les 7 fabricants européens représentés par Tech'lux : Aubrilam, Chrysalis, Cometa, Meyer, Petitjean, Siteco et Solux.",
};

export default function FournisseursPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <PageHero
        eyebrow="Partenaires industriels"
        title={
          <>
            Fabricants <span className="text-black/35">européens.</span>
          </>
        }
        intro="Neuf constructeurs spécialisés pour couvrir toute la chaîne de l'éclairage extérieur : mâts, luminaires, solaire autonome, mise en lumière et smart city."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-10">
        <PartnersDirectory />
      </section>
    </div>
  );
}
