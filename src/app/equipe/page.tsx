import type { Metadata } from "next";
import { EquipeSpotlightHero } from "@/components/equipe-spotlight-hero";
import { TeamRegionMap } from "@/components/team-region-map";
import { TeamDirectory } from "@/components/team-directory";

export const metadata: Metadata = {
  title: "Équipe & territoires",
  description:
    "L'équipe commerciale Tech'lux en Auvergne-Rhône-Alpes : interlocuteurs par département, téléphones et e-mails.",
};

export default function EquipePage() {
  return (
    <>
      <EquipeSpotlightHero />

      <div className="min-h-screen bg-[#f4f4f1]">
      <section
        id="carte-territoires"
        className="scroll-mt-20 mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-10"
      >
        <TeamRegionMap />
      </section>

      <TeamDirectory />
      </div>
    </>
  );
}
