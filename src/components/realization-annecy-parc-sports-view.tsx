import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  DEPARTMENTS,
  DOMAIN_MAP,
  type Realization,
} from "@/data/techlux";
import type { RealizationPageMeta } from "@/data/realization-pages";
import { TEAM_MEMBERS } from "@/data/team";
import { AnnecyParcSportsHero } from "@/components/annecy-parc-sports-hero";
import { AnnecyParcSportsGallery } from "@/components/annecy-parc-sports-gallery";

const ANNECY_EDITORIAL_SHELL =
  "rounded-[2rem] border border-black/[0.06] shadow-[0_48px_120px_-64px_rgba(26,36,48,0.35)] backdrop-blur-sm";

const ANNECY_EDITORIAL_CARD = `${ANNECY_EDITORIAL_SHELL} bg-white/95`;

type Props = {
  realization: Realization;
  meta: RealizationPageMeta;
  jsonLd: object[];
};

export function RealizationAnnecyParcSportsView({
  realization,
  meta,
  jsonLd,
}: Props) {
  const dept = DEPARTMENTS.find((d) => d.code === realization.department);
  const accountManager = TEAM_MEMBERS.find((m) => m.id === meta.accountManagerId);
  const heroSrc = "/realisations/annecy-parc-sports-hero.jpg";

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
          <div className={`${ANNECY_EDITORIAL_CARD} p-8 sm:p-12 lg:p-16`}>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h1 className="text-[clamp(2.1rem,5.2vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                  Parc des Sports Annecy
                  <span className="mt-2 block text-[clamp(1.35rem,2.8vw,2rem)] font-medium tracking-[-0.02em] text-[#5c6b5a]">
                    {realization.subtitle}
                  </span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/62 sm:text-xl">
                  {realization.summary}
                </p>
                <TechnicalList points={meta.technicalPoints} />
                <ProjectCta realization={realization} />
              </div>
              <MetricsPanel realization={realization} meta={meta} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className={`${ANNECY_EDITORIAL_CARD} p-8 sm:p-12 lg:p-16`}>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">
                Écosystème projet
              </p>
              <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.035em]">
                Intervenants &amp; fabrication
              </h2>
            </div>
            <StakeholderGrid
              meta={meta}
              accountManager={accountManager}
              realization={realization}
              deptName={dept?.name}
            />
          </div>
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

      <section className="pb-20 pt-4 text-[#1a1a1c] sm:pb-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div
            className={`flex flex-col gap-8 bg-[linear-gradient(135deg,#dfe5e8_0%,#c9d4d9_48%,#b8c6ce_100%)] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16 ${ANNECY_EDITORIAL_SHELL}`}
          >
            <h2 className="max-w-2xl text-[clamp(1.5rem,3.2vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
              Un équipement sportif comparable ?{" "}
              <span className="text-black/50">
                Décrivez votre plateau, la norme visée et votre calendrier.
              </span>
            </h2>
            <Link
              href={`/contact?departement=${realization.department}&domaine=${realization.domains[0]}`}
              className="group inline-flex h-14 w-fit shrink-0 items-center gap-2 rounded-full bg-[#1a1a1c] px-8 text-base font-semibold text-white hover:bg-[#2c3530]"
            >
              Demande d&apos;étude
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <AnnecyParcSportsGallery />
    </div>
  );
}

function MetricsPanel({
  realization,
  meta,
}: {
  realization: Realization;
  meta: RealizationPageMeta;
}) {
  const metrics = [
    { value: "Haute-Savoie (74)", label: "Département", wide: true },
    { value: "34 m", label: "Hauteur de mât" },
    { value: realization.kelvin, label: "Température" },
    { value: realization.year, label: "Livraison" },
    { value: meta.leadPartner, label: "Fabricant" },
  ];

  return (
    <div className="lg:col-span-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {metrics.map((m) => (
          <InfoCard
            key={m.label}
            label={m.label}
            value={m.value}
            className={m.wide ? "col-span-2" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function StakeholderBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[clamp(1.2rem,2.1vw,1.65rem)] font-semibold leading-snug tracking-tight text-[#1a1a1c]">
        {value}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-black/45">{label}</p>
    </div>
  );
}

function InfoCard({
  label,
  value,
  className,
  children,
}: {
  label: string;
  value: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-black/[0.06] bg-[#f8f7f4] p-5 sm:p-6 ${className ?? ""}`}
    >
      <p className="text-[clamp(1.2rem,2.2vw,1.85rem)] font-semibold leading-tight tracking-tight text-[#1a1a1c]">
        {value}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-black/45">{label}</p>
      {children}
    </div>
  );
}

function TechnicalList({ points }: { points: string[] }) {
  return (
    <ol className="mt-8 max-w-2xl space-y-2">
      {points.map((point, i) => (
        <li
          key={point}
          className="flex gap-4 rounded-2xl border border-black/[0.05] bg-[#f8f7f4] px-4 py-3.5"
        >
          <span className="text-sm font-semibold tabular-nums text-[#1a1a1c]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm leading-snug text-[#1a1a1c]/75">{point}</span>
        </li>
      ))}
    </ol>
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
    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
      {rows.map((row) => (
        <StakeholderBlock key={row.label} label={row.label} value={row.value!} />
      ))}
      {accountManager && (
        <div>
          <StakeholderBlock label="Chargé d'affaires" value={accountManager.name} />
          <p className="mt-2 text-sm text-black/50">{accountManager.role}</p>
          <p className="mt-1 text-xs text-black/40">
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