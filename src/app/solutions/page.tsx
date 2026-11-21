import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SolutionSceneThumb } from "@/components/solution-scene-thumb";
import { DOMAINS } from "@/data/techlux";

export const metadata: Metadata = {
  title: "Solutions d'éclairage extérieur pour collectivités et prescripteurs",
  description:
    "Rénovation LED, trame noire, éclairage solaire, voirie, Smart City, mâts, mise en lumière du patrimoine, éclairage d'ambiance et de stades : les solutions Tech'lux avec étude photométrique.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <PageHero
        eyebrow={`Solutions · ${DOMAINS.length} domaines`}
        title={
          <>
            Solutions d&rsquo;éclairage{" "}
            <span className="text-black/35">extérieur.</span>
          </>
        }
        intro="Communes, bureaux d'études, paysagistes et architectes : chaque page détaille normes, fabricants et réalisations — avec une demande d'étude orientée par département."
      />

      <section className="border-b border-black/12 bg-white py-12">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="text-base leading-relaxed text-black/60">
            Priorité aux sujets les plus recherchés par les collectivités :{" "}
            <Link
              href="/solutions/renovation-eclairage-public-led"
              className="font-medium text-[#0b0b0c] underline-offset-4 hover:text-[#b07612] hover:underline"
            >
              rénovation d&rsquo;éclairage public LED
            </Link>
            , trame noire, étude photométrique EN 13201 et Smart City.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 sm:py-20 lg:px-10">
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {DOMAINS.map((domain) => (
            <li key={domain.slug}>
              <Link
                href={`/solutions/${domain.slug}`}
                className="group block"
              >
                <SolutionSceneThumb
                  preset={domain.scene}
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {domain.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-black/60">
                      {domain.tagline}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1.5 size-5 shrink-0 text-black/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#b07612]" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-black/40">
                  {domain.audiences.slice(0, 3).join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
