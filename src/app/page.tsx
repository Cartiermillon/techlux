import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SpotlightStage } from "@/components/spotlight-stage";
import { PhotometricExplorer } from "@/components/photometric-explorer";
import { SolutionsShowcase } from "@/components/solutions-showcase";
import { LightingSceneArt } from "@/components/lighting-scene-art";
import {
  PARTNERS,
  REALIZATIONS,
  parseKelvin,
} from "@/data/techlux";

const FEATURED_IDS = [
  "pierre-benite-eglise",
  "menthon-saint-bernard",
  "saint-fons-salengro",
  "valloire-fort-telegraphe",
  "decines-grand-large",
  "lyon-saint-rambert",
];

const FEATURED_SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-6",
  "md:col-span-6",
];

const AUDIENCES = [
  {
    index: "01",
    title: "Paysagistes",
    claim: "La lumière au service du vivant.",
    text: "Mâts en bois lamellé-collé, teintes ambre et blanc chaud, optiques sans fuite vers le ciel. Des luminaires qui s'effacent le jour et respectent la trame noire la nuit.",
    tags: ["Trame noire", "Mâts bois", "Intégration paysagère"],
    href: "/realisations?domaine=mats-eclairage-public",
    cta: "Voir les ouvrages paysagers",
  },
  {
    index: "02",
    title: "Concepteurs lumière",
    claim: "Votre intention, fidèlement exécutée.",
    text: "Un interlocuteur technique pour passer du concept au chantier : projecteurs architecturaux, optiques de précision, encastrés, scénarios de gradation, chez les meilleurs fabricants européens.",
    tags: ["Mise en lumière", "Faisceaux découpés", "Gradation"],
    href: "/realisations?domaine=mise-en-lumiere-patrimoine-batiments",
    cta: "Voir les mises en lumière",
  },
  {
    index: "03",
    title: "Bureaux d'études",
    claim: "Des solutions conformes, documentées.",
    text: "Fiches techniques, données photométriques et solutions alignées sur l'EN 13201 et l'arrêté sur les nuisances lumineuses, pour sécuriser vos prescriptions et vos DCE.",
    tags: ["EN 13201", "Photométrie", "Smart city"],
    href: "/realisations?domaine=eclairage-voirie-en-13201",
    cta: "Voir les projets de voirie",
  },
];

function HeroLayer({ lit }: { lit: boolean }) {
  const Heading = lit ? "div" : "h1";
  const dim = "text-white/[0.13]";
  const note = lit ? "text-[#ffb43b]" : "text-white/25";

  return (
    <div className="relative mx-auto flex min-h-[78svh] max-w-[1400px] flex-col justify-end px-6 pb-10 pt-24 lg:px-10">
      <span
        className={`absolute right-[8%] top-[18%] hidden text-xs tracking-[0.2em] sm:block ${note}`}
      >
        2200 K
      </span>
      <span
        className={`absolute left-[46%] top-[11%] hidden text-xs tracking-[0.2em] md:block ${note}`}
      >
        ULR 0 %
      </span>
      <span
        className={`absolute right-[22%] top-[36%] hidden text-xs tracking-[0.2em] md:block ${note}`}
      >
        EN 13201
      </span>
      <span
        className={`absolute left-[6%] top-[24%] hidden text-xs tracking-[0.2em] md:block ${note}`}
      >
        2700 K
      </span>
      <span
        className={`absolute right-[10%] top-[52%] hidden text-xs tracking-[0.2em] lg:block ${note}`}
      >
        IP66 · IK10
      </span>

      <p
        className={`mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.24em] ${
          lit ? "text-white/80" : "text-white/45"
        }`}
      >
        <span className="size-1.5 rounded-full bg-[#ffb43b]" />
        Lyon &amp; Savoie · depuis 2010
      </p>

      <Heading
        className={`max-w-[14ch] text-[clamp(2.65rem,9.5vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] ${
          lit ? "text-white" : dim
        }`}
      >
        Agence
        <br />
        d&rsquo;aménagement{" "}
        <span className={lit ? "text-[#ffb43b]" : "text-white/[0.13]"}>
          lumière
        </span>
      </Heading>
    </div>
  );
}

export default function HomePage() {
  const featured = FEATURED_IDS.map((id) =>
    REALIZATIONS.find((r) => r.id === id)
  ).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <SpotlightStage
        background={{
          src: "/home-hero-stadium.jpg",
          alt: "Complexe sportif et stade éclairés au crépuscule, vue aérienne",
        }}
        base={<HeroLayer lit={false} />}
        lit={<HeroLayer lit />}
      >
        <div className="relative z-10 border-t border-white/10">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-10 lg:grid-cols-12 lg:px-10">
            <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg lg:col-span-6">
              Depuis 2010, et forte de plus de trente ans d&rsquo;expérience,
              Tech&rsquo;lux équipe les projets des{" "}
              <strong className="font-medium text-white">paysagistes</strong>,
              des{" "}
              <strong className="font-medium text-white">
                concepteurs lumière
              </strong>{" "}
              et des{" "}
              <strong className="font-medium text-white">
                bureaux d&rsquo;études
              </strong>{" "}
              avec les plus grands fabricants européens.
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:col-span-6 lg:justify-end">
              <Link
                href="/etude-lumiere"
                className="group inline-flex h-12 items-center gap-2 bg-[#ffb43b] px-6 text-sm font-semibold text-[#050506] transition-colors hover:bg-white"
              >
                Démarrer une étude lumière
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/realisations"
                className="group inline-flex h-12 items-center gap-2 border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:border-white"
              >
                Explorer les réalisations
                <ArrowDown className="size-4 -rotate-90" />
              </Link>
            </div>
          </div>

          <div
            className="overflow-hidden border-t border-white/10 py-4"
            aria-label="Fabricants partenaires"
          >
            <div className="marquee-track flex w-max gap-14 pr-14 text-sm uppercase tracking-[0.28em] text-white/40">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <span key={`${p.id}-${i}`} className="flex items-center gap-14">
                  {p.name}
                  <span className="size-1 rounded-full bg-[#ffb43b]/70" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </SpotlightStage>

      <section
        id="pour-qui"
        className="scroll-mt-16 bg-[#f4f4f1] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50 lg:col-span-4">
              <span className="size-1.5 rounded-full bg-[#ffb43b]" />
              Pour qui
            </p>
            <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] lg:col-span-8">
              Un partenaire de ceux qui{" "}
              <span className="text-black/35">
                conçoivent, prescrivent et dessinent
              </span>{" "}
              le paysage nocturne.
            </h2>
          </div>

          <div className="mt-16 border-t border-black/20">
            {AUDIENCES.map((a) => (
              <Link
                key={a.index}
                href={a.href}
                className="group grid gap-6 border-b border-black/20 py-10 transition-colors hover:bg-[#050506] hover:text-white lg:grid-cols-12 lg:gap-10 lg:px-6 lg:py-14"
              >
                <div className="flex items-baseline gap-5 lg:col-span-5">
                  <span className="text-xs tabular-nums text-black/40 group-hover:text-white/40">
                    {a.index}
                  </span>
                  <h3 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-none tracking-[-0.045em]">
                    {a.title}
                  </h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-xl font-medium tracking-tight">
                    {a.claim}
                  </p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-black/60 group-hover:text-white/65 sm:text-base">
                    {a.text}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-black/70 group-hover:text-white/75">
                    {a.tags.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-[#ffb43b]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end justify-between lg:col-span-2 lg:flex-col lg:items-end">
                  <ArrowUpRight className="size-8 text-black/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#ffb43b]" />
                  <span className="text-sm font-medium text-black/70 group-hover:text-white lg:mt-auto">
                    {a.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050506] py-24 text-white sm:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PhotometricExplorer />
        </div>
      </section>

      <section
        id="solutions"
        className="scroll-mt-16 bg-[#f4f4f1] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-16 grid gap-6 lg:grid-cols-12">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50 lg:col-span-4">
              <span className="size-1.5 rounded-full bg-[#ffb43b]" />
              Solutions
            </p>
            <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] lg:col-span-8">
              Neuf solutions,{" "}
              <span className="text-black/35">
                un seul fil conducteur : la juste lumière.
              </span>
            </h2>
          </div>
          <SolutionsShowcase />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              Réalisations{" "}
              <span className="text-black/35">choisies</span>
            </h2>
            <Link
              href="/realisations"
              className="group inline-flex items-center gap-2 text-sm font-medium hover:text-[#b07612]"
            >
              Les {REALIZATIONS.length} réalisations
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
            {featured.map((project, i) => (
              <Link
                key={project.id}
                href={`/realisations/${project.id}`}
                className={`group block ${FEATURED_SPANS[i]}`}
              >
                <div className="overflow-hidden">
                  <LightingSceneArt
                    preset={project.scene}
                    kelvin={parseKelvin(project.kelvin)}
                    className="h-[300px] w-full transition-transform duration-700 group-hover:scale-[1.04] md:h-[420px]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                      {project.city} ({project.department}) · {project.kelvin}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-[#b07612]">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="mt-1 text-sm text-black/55">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-black/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#b07612]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f1] py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-14 grid gap-6 lg:grid-cols-12">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50 lg:col-span-4">
              <span className="size-1.5 rounded-full bg-[#ffb43b]" />
              Fabricants représentés
            </p>
            <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] lg:col-span-8">
              Neuf maisons européennes,{" "}
              <span className="text-black/35">une même exigence.</span>
            </h2>
          </div>

          <ul className="border-t border-black/20">
            {PARTNERS.map((p) => (
              <li key={p.id} className="border-b border-black/15">
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-12 items-baseline gap-4 py-5 transition-colors hover:bg-[#050506] hover:text-white sm:px-4"
                >
                  <span className="col-span-12 text-2xl font-semibold tracking-[-0.035em] sm:col-span-4 sm:text-3xl">
                    {p.name}
                  </span>
                  <span className="col-span-9 text-sm text-black/60 group-hover:text-white/70 sm:col-span-5">
                    {p.specialty}
                  </span>
                  <span className="hidden text-sm text-black/40 group-hover:text-white/50 sm:col-span-2 sm:block">
                    {p.origin}
                  </span>
                  <ArrowUpRight className="col-span-3 size-5 justify-self-end text-black/30 transition-all group-hover:text-[#ffb43b] sm:col-span-1" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/fournisseurs"
              className="group inline-flex items-center gap-2 text-sm font-medium hover:text-[#b07612]"
            >
              Trouver les fabricants par département
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
