import type { Metadata } from "next";
import { Suspense } from "react";
import { RealizationsBrowser } from "@/components/realizations-browser";
import { RealizationLegacyRedirect } from "@/components/realization-legacy-redirect";
import { PageHero } from "@/components/page-hero";
import { REALIZATIONS } from "@/data/techlux";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Éclairage public, solaire, sportif, smart city et mise en lumière du patrimoine : les réalisations accompagnées par Tech'lux.",
};

type SearchParams = Promise<{ domaine?: string; projet?: string }>;

async function RealizationsSection({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  return (
    <RealizationsBrowser initialDomain={params.domaine} />
  );
}

export default function RealisationsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <Suspense fallback={null}>
        <RealizationLegacyRedirect />
      </Suspense>
      <PageHero
        eyebrow={`Références · ${REALIZATIONS.length} projets`}
        title={
          <>
            Réalisations <span className="text-black/35">en lumière.</span>
          </>
        }
        intro="Espaces publics, cœurs de bourg, équipements sportifs, passerelles et édifices patrimoniaux, en Auvergne-Rhône-Alpes, en Bourgogne et au-delà."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-10">
        <Suspense
          fallback={
            <div className="border border-black/10 bg-white p-12 text-center text-sm text-[#5b5b60]">
              Chargement des réalisations...
            </div>
          }
        >
          <RealizationsSection searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
