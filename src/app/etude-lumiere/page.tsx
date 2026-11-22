import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { IlluminanceStudyTool } from "@/components/illuminance-study-tool";
import { PhotometricExplorer } from "@/components/photometric-explorer";

export const metadata: Metadata = {
  title: "Étude lumière & éclairement",
  description:
    "Études photométriques, cibles d'éclairement en lux, conformité EN 13201 et trame noire : accompagnement Tech'lux pour paysagistes, concepteurs lumière et bureaux d'études.",
};

const DELIVERABLES = [
  {
    index: "01",
    title: "Cahier des charges lumineux",
    text: "Classes d'éclairement, uniformité, courbes de gradation et contraintes de trame noire intégrées à vos pièces écrites.",
  },
  {
    index: "02",
    title: "Photométrie & isolignes",
    text: "Validation des niveaux en lux, du ULR et des risques d'éblouissement avec les données fabricants partenaires.",
  },
  {
    index: "03",
    title: "Prescription & chantier",
    text: "Choix des luminaires, mâts et scénarios de pilotage ; suivi jusqu'à la recette nocturne sur site.",
  },
];

export default function EtudeLumierePage() {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <PageHero
        eyebrow="Demande d'étude · Éclairement"
        title={
          <>
            L&rsquo;espace public
            <br />
            se dessine
            <br />
            aussi la <span className="text-black/35">nuit.</span>
          </>
        }
        intro="Paysagistes, concepteurs lumière et bureaux d'études : nous traduisons votre scénario nocturne en niveaux de lux conformes, en optiques adaptées et en solutions exécutables."
      />

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="border-t border-black/20">
          {DELIVERABLES.map((d) => (
            <div
              key={d.index}
              className="grid gap-4 border-b border-black/15 py-10 lg:grid-cols-12 lg:gap-10"
            >
              <div className="flex items-baseline gap-5 lg:col-span-4">
                <span className="text-xs tabular-nums text-black/40">
                  {d.index}
                </span>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                  {d.title}
                </h2>
              </div>
              <p className="text-base leading-relaxed text-black/60 lg:col-span-8">
                {d.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#050506] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <IlluminanceStudyTool />
        </div>
      </section>

      <section className="bg-[#f4f4f1] py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50">
              <span className="size-1.5 rounded-full bg-[#ffb43b]" />
              Distribution lumineuse
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              L&rsquo;éclairement dépend autant du{" "}
              <span className="text-black/35">faisceau</span> que du Kelvin.
            </h2>
          </div>
          <div className="border border-black/15 bg-[#050506] p-6 sm:p-10">
            <PhotometricExplorer />
          </div>
        </div>
      </section>

      <section className="border-t border-black/12 bg-white py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center lg:px-10">
          <p className="max-w-xl text-lg font-medium tracking-tight">
            Transmettez vos plans DWG ou DWG + niveaux cibles : nos équipes
            Lyon et Savoie vous renvoient une première analyse sous 48h ouvrées.
          </p>
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-2 border border-black/20 px-6 text-sm font-semibold transition-colors hover:border-[#0b0b0c] hover:bg-[#0b0b0c] hover:text-white"
          >
            Lancer une étude
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
