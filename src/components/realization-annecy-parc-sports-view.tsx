import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  DEPARTMENTS,
  DOMAIN_MAP,
  type Realization,
} from "@/data/techlux";
import type { RealizationPageMeta } from "@/data/realization-pages";
import { TEAM_MEMBERS } from "@/data/team";
import { AnnecyParcSportsHero } from "@/components/annecy-parc-sports-hero";

type Props = {
  realization: Realization;
  meta: RealizationPageMeta;
  jsonLd: object[];
};

const EDITORIAL_LEDE =
  "Un plateau sportif à l'échelle du territoire annécien : hauteur de feux, homogénéité sur la pelouse et retenue vis-à-vis du voisinage, pensés comme un geste architectural de nuit.";

const PULL_QUOTE =
  "La lumière doit servir la compétition sans envahir le paysage alpin — chaque axe photométrique a été validé au millimètre.";

export function RealizationAnnecyParcSportsView({
  realization,
  meta,
  jsonLd,
}: Props) {
  const dept = DEPARTMENTS.find((d) => d.code === realization.department);
  const accountManager = TEAM_MEMBERS.find((m) => m.id === meta.accountManagerId);
  const heroSrc = "/realisations/annecy-parc-sports-hero.jpg";
  const detailSrc = "/realisations/annecy-parc-sports.png";

  return (
    <div className="min-h-screen bg-[#f4f4f1] text-[#1a1a1c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AnnecyParcSportsHero imageSrc={heroSrc} alt={meta.coverAlt ?? meta.locationLabel}>
        <nav
          aria-label="Fil d'Ariane"
          className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/50 bg-white/72 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#3d3d42] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md"
        >
          <Link href="/realisations" className="transition-colors hover:text-[#b07612]">
            Réalisations
          </Link>
          <span className="text-black/25">/</span>
          <span>{realization.city}</span>
          <span className="text-black/25">/</span>
          <span className="text-[#1a1a1c]">{realization.title}</span>
        </nav>
      </AnnecyParcSportsHero>

      <section className="relative z-[2] -mt-16 sm:-mt-24 lg:-mt-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-[2rem] border border-black/[0.06] bg-white/95 p-8 shadow-[0_48px_120px_-64px_rgba(26,36,48,0.35)] backdrop-blur-sm sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-black/45">
                  <MapPin className="size-3.5 text-[#c88712]" />
                  {meta.locationLabel}
                </p>
                <h1 className="mt-5 text-[clamp(2.1rem,5.2vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                  Parc des Sports
                  <span className="mt-2 block text-[clamp(1.35rem,2.8vw,2rem)] font-medium tracking-[-0.02em] text-[#5c6b5a]">
                    {realization.subtitle}
                  </span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/62 sm:text-xl">
                  {realization.summary}
                </p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-black/48">
                  {EDITORIAL_LEDE}
                </p>
                <ProjectCta realization={realization} />
              </div>
              <MetricsPanel realization={realization} meta={meta} deptName={dept?.name} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:py-28 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">
              Lecture du site
            </p>
            <blockquote className="mt-6 border-l-2 border-[#7fa88a] pl-6 text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-snug tracking-[-0.02em] text-[#2c3530]">
              « {PULL_QUOTE} »
            </blockquote>
            <p className="mt-8 text-sm leading-relaxed text-black/50">
              Étude photométrique Tech&apos;lux, maîtrise d&apos;ouvrage{" "}
              <strong className="font-semibold text-black/75">
                {meta.stakeholders.maitriseOuvrage}
              </strong>
              , bureau{" "}
              <strong className="font-semibold text-black/75">
                {meta.stakeholders.bureauEtudes}
              </strong>
              .
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <figure className="relative overflow-hidden rounded-3xl bg-[#e8ece9]">
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={detailSrc}
                    alt="Vue nocturne du terrain — Parc des Sports d'Annecy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="border-t border-black/[0.06] px-5 py-4 text-xs uppercase tracking-[0.18em] text-black/45">
                  Ambiance nocturne · Lac et Aravis
                </figcaption>
              </figure>
              <TechnicalBento points={meta.technicalPoints} kelvin={realization.kelvin} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.06] bg-[linear-gradient(180deg,#eef2ee_0%,#f4f4f1_100%)] py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">
                Écosystème projet
              </p>
              <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.035em]">
                Intervenants &amp; fabrication
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-black/50">
              Chaîne courte entre concepteur lumière, fabricant de mâts et installateurs locaux —
              pour un chantier sportif exigeant et livré en {realization.year}.
            </p>
          </div>
          <StakeholderGrid
            meta={meta}
            accountManager={accountManager}
            realization={realization}
            deptName={dept?.name}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:py-24 lg:px-10">
        <p className="text-xs uppercase tracking-[0.24em] text-black/45">Domaines</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {realization.domains.map((slug) => (
            <li key={slug}>
              <Link
                href={`/solutions/${slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-black/80 transition-colors hover:border-[#7fa88a]/60 hover:text-[#3d5a45]"
              >
                {DOMAIN_MAP[slug].title}
                <ArrowUpRight className="size-3.5 opacity-40 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-black/55">
          Fabricants :{" "}
          <Link
            href="/fournisseurs"
            className="font-semibold text-[#1a1a1c] underline decoration-[#7fa88a]/50 underline-offset-4 hover:decoration-[#c88712]"
          >
            {realization.partners.join(" · ")}
          </Link>
        </p>
      </section>

      <section className="bg-[linear-gradient(135deg,#dfe5e8_0%,#c9d4d9_48%,#b8c6ce_100%)] py-20 text-[#1a1a1c] sm:py-24">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <h2 className="max-w-2xl text-[clamp(1.5rem,3.2vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
            Un équipement sportif comparable ?{" "}
            <span className="text-black/50">
              Décrivez votre plateau, la norme visée et votre calendrier.
            </span>
          </h2>
          <Link
            href={`/contact?departement=${realization.department}&domaine=${realization.domains[0]}`}
            className="group inline-flex h-14 w-fit items-center gap-2 rounded-full bg-[#1a1a1c] px-8 text-base font-semibold text-white hover:bg-[#2c3530]"
          >
            Demande d&apos;étude
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function MetricsPanel({
  realization,
  meta,
  deptName,
}: {
  realization: Realization;
  meta: RealizationPageMeta;
  deptName?: string;
}) {
  const metrics = [
    { value: "34 m", label: "Hauteur de mât", accent: "text-[#3d6b8c]" },
    { value: realization.kelvin, label: "Température", accent: "text-[#c88712]" },
    { value: realization.year, label: "Livraison", accent: "text-[#3d5a45]" },
    { value: meta.leadPartner, label: "Mâts acier", accent: "text-[#1a1a1c]" },
  ];

  return (
    <div className="lg:col-span-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-black/[0.06] bg-[#f8f7f4] p-5 sm:p-6"
          >
            <p className={`text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight ${m.accent}`}>
              {m.value}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-black/45">{m.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-black/45">
        {deptName ?? "Haute-Savoie"} · Projecteurs LED{" "}
        {realization.partners[1] ?? "Siteco"} · Normes fédérales
      </p>
    </div>
  );
}

function TechnicalBento({
  points,
  kelvin,
}: {
  points: string[];
  kelvin: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex-1 rounded-3xl border border-[#7fa88a]/25 bg-[#f0f4f1] p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-[#5c6b5a]">Performance</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-[#2c3530]">{kelvin}</p>
        <p className="mt-2 text-sm text-black/50">Blanc neutre sportif, rendu caméra maîtrisé</p>
      </div>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li
            key={point}
            className="flex gap-4 rounded-2xl border border-black/[0.05] bg-white px-4 py-3.5"
          >
            <span className="text-sm font-semibold tabular-nums text-[#7fa88a]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-snug text-black/70">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StakeholderGrid({
  meta,
  accountManager,
  realization,
  deptName,
}: {
  meta: RealizationPageMeta;
  accountManager: (typeof TEAM_MEMBERS)[number] | undefined;
  realization: Realization;
  deptName?: string;
}) {
  const rows = [
    { label: "Maîtrise d'ouvrage", value: meta.stakeholders.maitriseOuvrage },
    { label: "Bureau d'études", value: meta.stakeholders.bureauEtudes },
    { label: "Installateur", value: meta.stakeholders.installateur },
  ].filter((r) => r.value);

  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((row) => (
        <div
          key={row.label}
          className="rounded-2xl border border-black/[0.06] bg-white/80 p-6 backdrop-blur-sm"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-black/40">{row.label}</p>
          <p className="mt-3 text-base font-medium leading-snug text-[#1a1a1c]">{row.value}</p>
        </div>
      ))}
      {accountManager && (
        <div className="rounded-2xl border border-[#7fa88a]/30 bg-white p-6 shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.22em] text-black/40">Chargé d&apos;affaires</p>
          <p className="mt-3 text-lg font-semibold">{accountManager.name}</p>
          <p className="mt-1 text-sm text-black/50">{accountManager.role}</p>
          <p className="mt-2 text-xs text-black/40">
            Dépt. {realization.department}
            {deptName ? ` · ${deptName}` : ""}
          </p>
          <Link
            href={`/equipe#membre-${accountManager.id}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#3d5a45] hover:underline"
          >
            Équipe Tech&apos;lux
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

function ProjectCta({ realization }: { realization: Realization }) {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Link
        href={`/contact?departement=${realization.department}&domaine=${realization.domains[0]}`}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#1a1a1c] px-7 text-sm font-semibold text-white hover:bg-[#3d5a45]"
      >
        Projet similaire
        <ArrowUpRight className="size-4" />
      </Link>
      <Link
        href={`/realisations?domaine=${realization.domains[0]}`}
        className="inline-flex h-12 items-center gap-2 rounded-full border border-black/12 px-7 text-sm font-medium text-black/65 hover:border-black/25 hover:text-[#1a1a1c]"
      >
        Autres équipements sportifs
      </Link>
    </div>
  );
}