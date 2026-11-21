import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsBrowser } from "@/components/news-browser";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Actualités & Nouveautés",
  description:
    "Nouveautés luminaires, drivers intelligents, trame noire et innovations solaires proposées par Tech'lux et ses partenaires.",
};

type SearchParams = Promise<{ article?: string }>;

async function NewsSection({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <NewsBrowser initialArticleId={params.article} />;
}

export default function ActualitesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <PageHero
        eyebrow="Veille produits"
        title={
          <>
            Actualités <span className="text-black/35">& nouveautés.</span>
          </>
        }
        intro="Luminaires éco-conçus, détection sur passage piéton, drivers intelligents et solutions dédiées à la biodiversité nocturne."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-10">
        <Suspense
          fallback={
            <div className="border border-black/10 bg-white p-12 text-center text-sm text-[#5b5b60]">
              Chargement des actualités...
            </div>
          }
        >
          <NewsSection searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
