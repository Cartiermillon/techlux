"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";

type SpaceId =
  | "chemin-pieton"
  | "place"
  | "voirie"
  | "patrimoine"
  | "sport"
  | "parking";

interface SpaceProfile {
  id: SpaceId;
  label: string;
  audience: string;
  enClass: string;
  luxMin: number;
  luxTarget: number;
  uniformity: string;
  kelvin: string;
  ulr: string;
  note: string;
}

const SPACES: SpaceProfile[] = [
  {
    id: "chemin-pieton",
    label: "Cheminement piéton",
    audience: "Paysagistes",
    enClass: "P4 / P5",
    luxMin: 5,
    luxTarget: 10,
    uniformity: "Eₘᵢₙ / Eₘₐₓ ≥ 0,25",
    kelvin: "2200–2700 K",
    ulr: "ULR ≤ 1 %",
    note:
      "Confort de marche sans éblouissement. Privilégier optiques piétonnes basses et gradation sur détection.",
  },
  {
    id: "place",
    label: "Place & cœur de village",
    audience: "Concepteurs lumière",
    enClass: "P3",
    luxMin: 10,
    luxTarget: 20,
    uniformity: "Eₘᵢₙ / Eₘₐₓ ≥ 0,25",
    kelvin: "2400–3000 K",
    ulr: "ULR ≤ 1 %",
    note:
      "Ambiance sociale et lisibilité des volumes. Scénarios d'abaissement nocturne pour limiter la consommation.",
  },
  {
    id: "voirie",
    label: "Voirie structurante",
    audience: "Bureaux d'études",
    enClass: "M / C selon trafic",
    luxMin: 15,
    luxTarget: 30,
    uniformity: "Selon EN 13201-2",
    kelvin: "2700–3000 K",
    ulr: "ULR ≤ 1 %",
    note:
      "Uniformité de luminance sur chaussée et trottoir. Vérifier le risque d'éblouissement (TI) aux intersections.",
  },
  {
    id: "patrimoine",
    label: "Façade & patrimoine",
    audience: "Concepteurs lumière",
    enClass: "Hors voirie",
    luxMin: 3,
    luxTarget: 15,
    uniformity: "Par zones architecturales",
    kelvin: "2700 K",
    ulr: "Faisceau maîtrisé",
    note:
      "Éclairement local sur pierre et reliefs. Pas de flux parasite vers le ciel ni vers les riverains.",
  },
  {
    id: "sport",
    label: "Terrain sportif",
    audience: "Bureaux d'études",
    enClass: "FFF / FFT",
    luxMin: 75,
    luxTarget: 200,
    uniformity: "Selon discipline",
    kelvin: "4000–5000 K",
    ulr: "Asymétrique",
    note:
      "Homologation et retransmission : contrôler l'uniformité, le halo et les débordements hors enceinte.",
  },
  {
    id: "parking",
    label: "Parking & dessertes",
    audience: "Paysagistes",
    enClass: "P4",
    luxMin: 5,
    luxTarget: 15,
    uniformity: "Eₘᵢₙ / Eₘₐₓ ≥ 0,25",
    kelvin: "2700–3000 K",
    ulr: "ULR ≤ 1 %",
    note:
      "Sécurité passive et repérage des cheminements. Solaire autonome possible si pas de réseau.",
  },
];

function spacingHint(lux: number): string {
  if (lux <= 10) return "12–18 m entre points lumineux (selon hauteur de feu)";
  if (lux <= 25) return "25–35 m sur voirie standard (selon optique)";
  if (lux <= 50) return "Point par point : étude DIALux ou courbe isoligne";
  return "Mâts grande hauteur : calcul photométrique obligatoire";
}

export function IlluminanceStudyTool() {
  const [spaceId, setSpaceId] = React.useState<SpaceId>("chemin-pieton");
  const [lengthM, setLengthM] = React.useState(120);
  const [widthM, setWidthM] = React.useState(4);

  const space = SPACES.find((s) => s.id === spaceId) ?? SPACES[0];
  const area = Math.max(1, lengthM * widthM);
  const fluxEstimate = Math.round(space.luxTarget * area * 1.25);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/50">
          <span className="size-1.5 rounded-full bg-[#ffb43b]" />
          Pré-dimensionnement
        </p>
        <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          Cible d&rsquo;éclairement <span className="text-white/40">en lux.</span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60">
          Sélectionnez un type d&rsquo;espace : nous affichons les ordres de
          grandeur réglementaires et un premier flux lumineux à valider en étude
          détaillée (DIALux, isolignes fabricants).
        </p>

        <div className="mt-10 border-t border-white/12">
          {SPACES.map((s, i) => {
            const active = s.id === spaceId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSpaceId(s.id)}
                aria-pressed={active}
                className={cn(
                  "flex w-full cursor-pointer items-baseline gap-5 border-b border-white/12 py-4 text-left transition-colors",
                  active ? "text-white" : "text-white/45 hover:text-white/80"
                )}
              >
                <span className="w-6 text-xs tabular-nums text-white/35">
                  0{i + 1}
                </span>
                <span className="flex-1 text-base font-medium">{s.label}</span>
                <span className="hidden text-xs text-white/40 sm:block">
                  {s.audience}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="border border-white/12 bg-[#08080a] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">
            {space.audience} · {space.enClass}
          </p>
          <p className="mt-4 text-5xl font-semibold tabular-nums tracking-tight">
            {space.luxTarget}
            <span className="text-2xl text-white/50"> lux</span>
          </p>
          <p className="mt-1 text-sm text-white/50">
            Minimum indicatif : {space.luxMin} lux
          </p>

          <dl className="mt-8 grid gap-4 border-t border-white/12 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Uniformité
              </dt>
              <dd className="mt-1 text-sm text-white/85">{space.uniformity}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Température
              </dt>
              <dd className="mt-1 text-sm text-white/85">{space.kelvin}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Vers le ciel
              </dt>
              <dd className="mt-1 text-sm text-white/85">{space.ulr}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Espacement type
              </dt>
              <dd className="mt-1 text-sm text-white/85">
                {spacingHint(space.luxTarget)}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-sm leading-relaxed text-white/60">
            {space.note}
          </p>

          <div className="mt-10 border-t border-white/12 pt-8">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Surface à éclairer (estimation flux)
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-white/55">Longueur (m)</span>
                <input
                  type="number"
                  min={5}
                  max={5000}
                  value={lengthM}
                  onChange={(e) => setLengthM(Number(e.target.value) || 0)}
                  className="mt-2 w-full border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-[#ffb43b]"
                />
              </label>
              <label className="block text-sm">
                <span className="text-white/55">Largeur (m)</span>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={widthM}
                  onChange={(e) => setWidthM(Number(e.target.value) || 0)}
                  className="mt-2 w-full border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-[#ffb43b]"
                />
              </label>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Surface{" "}
              <strong className="font-medium text-white">
                {area.toLocaleString("fr-FR")} m²
              </strong>{" "}
              — flux lumineux indicatif{" "}
              <strong className="font-medium text-[#ffb43b]">
                {fluxEstimate.toLocaleString("fr-FR")} lm
              </strong>{" "}
              (coefficient de maintenance 0,8 non inclus).
            </p>
          </div>

          <Link
            href={`/contact?domaine=${encodeURIComponent(
              space.id === "patrimoine"
                ? "mise-en-lumiere-patrimoine-batiments"
                : space.id === "sport"
                  ? "eclairage-stade-terrain-de-sport"
                  : space.id === "voirie"
                    ? "eclairage-voirie-en-13201"
                    : space.id === "chemin-pieton"
                      ? "eclairage-public-solaire"
                      : "eclairage-urbain-decoratif"
            )}`}
            className="group mt-8 inline-flex h-11 items-center gap-2 bg-[#ffb43b] px-5 text-sm font-semibold text-[#050506] hover:bg-white"
          >
            Demander l&rsquo;étude détaillée
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
