import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import {
  DEPARTMENTS,
  DOMAIN_MAP,
  type Realization,
} from "@/data/techlux";
import type { RealizationPageMeta } from "@/data/realization-pages";
import { TEAM_MEMBERS } from "@/data/team";
import { SolutionSceneHero } from "@/components/solution-scene-hero";
import { parseKelvin } from "@/data/techlux";

type RealizationDetailViewProps = {
  realization: Realization;
  meta: RealizationPageMeta;
  jsonLd: object[];
};

export function RealizationDetailView({
  realization,
  meta,
  jsonLd,
}: RealizationDetailViewProps) {
  const dept = DEPARTMENTS.find((d) => d.code === realization.department);
  const accountManager = TEAM_MEMBERS.find((m) => m.id === meta.accountManagerId);
  const hasPhoto = Boolean(meta.coverImage);

  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {hasPhoto ? (
        <section className="bg-[#0a0a0c] text-white">
          <div className="mx-auto max-w-[1400px] px-6 pt-10 pb-6 lg:px-10">
            <nav
              aria-label="Fil d'Ariane"
              className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/45"
            >
              <Link href="/realisations" className="hover:text-[#ffb43b]">
                Réalisations
              </Link>
              <span>/</span>
              <span className="text-white/75">{realization.city}</span>
            </nav>
          </div>
          <PhotoHeroFigure meta={meta} realization={realization} deptName={dept?.name} />
          <PhotoHeroIntro
            realization={realization}
            meta={meta}
            deptName={dept?.name}
          />
        </section>
      ) : (
        <section className="border-b border-black/12">
          <ClassicProjectHeader
            realization={realization}
            meta={meta}
            deptName={dept?.name}
          />
        </section>
      )}

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <StatsColumn realization={realization} meta={meta} />
        <StakeholdersColumn meta={meta} accountManager={accountManager} realization={realization} deptName={dept?.name} />
      </section>

      <section className="bg-[#3a3d44] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <h2 className="max-w-2xl text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em]">
            Un projet comparable dans votre commune ?{" "}
            <span className="text-white/55">
              Indiquez votre département et le domaine d&apos;éclairage.
            </span>
          </h2>
          <Link
            href={`/contact?departement=${realization.department}&domaine=${realization.domains[0]}`}
            className="group inline-flex h-14 w-fit items-center gap-2 rounded-full bg-[#ffb43b] px-8 text-base font-semibold text-[#050506] hover:bg-white"
          >
            Demande d&apos;étude
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function PhotoHeroFigure({
  meta,
  realization,
  deptName,
}: {
  meta: RealizationPageMeta;
  realization: Realization;
  deptName?: string;
}) {
  return (
    <figure className="mx-auto max-w-[1400px] px-4 pb-10 sm:px-6 lg:px-10">
      <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_-24px_rgba(0,0,0,0.85)]">
        <div className="relative">
          <Image
            src={meta.coverImage!}
            alt={meta.coverAlt ?? meta.locationLabel}
            width={1200}
            height={1200}
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="h-auto w-full object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent"
            aria-hidden
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-[#0a0a0c]/95 via-[#0a0a0c]/70 to-transparent px-6 pb-6 pt-24 sm:px-10 sm:pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7eb8ff]">
              {realization.department} · {realization.city.toUpperCase()} ·{" "}
              {realization.title}
            </p>
            {meta.stakeholders.maitriseOuvrage && (
              <p className="text-sm text-white/80">
                Maîtrise d&apos;ouvrage : {meta.stakeholders.maitriseOuvrage}
              </p>
            )}
            {meta.stakeholders.bureauEtudes && (
              <p className="text-sm text-white/65">
                Maîtrise d&apos;œuvre : {meta.stakeholders.bureauEtudes}
              </p>
            )}
            <p className="text-xs text-white/45">
              {realization.year}
              {deptName ? ` · ${deptName}` : ""} · {meta.leadPartner}
            </p>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

function PhotoHeroIntro({
  realization,
  meta,
  deptName,
}: {
  realization: Realization;
  meta: RealizationPageMeta;
  deptName?: string;
}) {
  return (
    <div className="border-t border-white/10 bg-[#0a0a0c]">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:py-14 lg:px-10">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/45">
          <MapPin className="size-3.5 text-[#ffb43b]" />
          {meta.locationLabel}
        </p>
        <h1 className="mt-4 max-w-4xl text-[clamp(1.75rem,4.2vw,3.15rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-white">
          {meta.seoTitle}
        </h1>
        {realization.subtitle && (
          <p className="mt-4 text-xl font-medium text-[#ffb43b]">
            {realization.subtitle}
          </p>
        )}
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
          {realization.summary}
        </p>
        <p className="mt-3 text-sm text-white/45">
          Température {realization.kelvin}
          {deptName ? ` · ${deptName}` : ""}
        </p>
        <RealizationCta realization={realization} variant="dark" />
      </div>
    </div>
  );
}

function ClassicProjectHeader({
  realization,
  meta,
  deptName,
}: {
  realization: Realization;
  meta: RealizationPageMeta;
  deptName?: string;
}) {
  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-12 sm:pb-20 sm:pt-16 lg:px-10">
      <nav
        aria-label="Fil d'Ariane"
        className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-black/45"
      >
        <Link href="/realisations" className="hover:text-[#b07612]">
          Réalisations
        </Link>
        <span>/</span>
        <span className="text-black/70">{realization.city}</span>
      </nav>
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <ClassicProjectIntro realization={realization} meta={meta} deptName={deptName} />
        <div className="lg:col-span-5">
          <SolutionSceneHero
            preset={realization.scene}
            kelvin={parseKelvin(realization.kelvin)}
          />
        </div>
      </div>
    </div>
  );
}

function ClassicProjectIntro({
  realization,
  meta,
  deptName,
}: {
  realization: Realization;
  meta: RealizationPageMeta;
  deptName?: string;
}) {
  return (
    <div className="lg:col-span-7">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-black/45">
        <MapPin className="size-3.5 text-[#c88712]" />
        Réalisation · {meta.locationLabel}
      </p>
      <h1 className="mt-4 text-[clamp(1.75rem,4.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#0b0b0c]">
        {meta.seoTitle}
      </h1>
      {realization.subtitle && (
        <p className="mt-4 text-xl font-medium text-[#b07612]">{realization.subtitle}</p>
      )}
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/60 sm:text-lg">
        {realization.summary}
      </p>
      <p className="mt-3 text-sm text-black/45">
        {realization.year}
        {deptName ? ` · ${deptName}` : ""} · Température {realization.kelvin}
      </p>
      <RealizationCta realization={realization} />
    </div>
  );
}

function StatsColumn({
  realization,
  meta,
}: {
  realization: Realization;
  meta: RealizationPageMeta;
}) {
  return (
    <div className="lg:col-span-6">
      <h2 className="text-xs uppercase tracking-[0.22em] text-black/50">
        Points techniques clés
      </h2>
      <ul className="mt-5 space-y-3 border-t border-black/15 pt-5">
        {meta.technicalPoints.map((point) => (
          <li key={point} className="flex items-start gap-3 text-base">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#c88712]" />
            <span className="text-black/75">{point}</span>
          </li>
        ))}
      </ul>
      <h2 className="mt-12 text-xs uppercase tracking-[0.22em] text-black/50">
        Domaines mobilisés
      </h2>
      <ul className="mt-5 flex flex-wrap gap-2 border-t border-black/15 pt-5">
        {realization.domains.map((slug) => (
          <li key={slug}>
            <Link
              href={`/solutions/${slug}`}
              className="inline-flex rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black/80 hover:border-[#ffb43b]/50 hover:text-[#b07612]"
            >
              {DOMAIN_MAP[slug].title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-black/55">
        Fabricant référencé :{" "}
        <strong className="font-semibold text-[#1a1a1c]">{meta.leadPartner}</strong>
        {realization.partners.length > 1
          ? ` · ${realization.partners.slice(1).join(" · ")}`
          : null}
      </p>
      <Link
        href="/fournisseurs"
        className="mt-2 inline-block text-sm font-medium text-[#b07612] hover:underline"
      >
        Voir les partenaires fabricants
      </Link>
    </div>
  );
}

function StakeholdersColumn({
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
  return (
    <div className="lg:col-span-6 space-y-8">
      <StakeholderBlock label="Maîtrise d'ouvrage" value={meta.stakeholders.maitriseOuvrage} />
      <StakeholderBlock label="Bureau d'études" value={meta.stakeholders.bureauEtudes} />
      <StakeholderBlock label="Installateur" value={meta.stakeholders.installateur} />
      {accountManager && (
        <AccountManagerCard
          accountManager={accountManager}
          realization={realization}
          deptName={deptName}
        />
      )}
    </div>
  );
}

function AccountManagerCard({
  accountManager,
  realization,
  deptName,
}: {
  accountManager: (typeof TEAM_MEMBERS)[number];
  realization: Realization;
  deptName?: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-xs uppercase tracking-[0.22em] text-black/50">
        Chargé d&apos;affaires
      </h2>
      <p className="mt-3 text-lg font-semibold tracking-tight">{accountManager.name}</p>
      <p className="mt-1 text-sm text-black/55">{accountManager.role}</p>
      <p className="mt-2 text-sm text-black/50">
        Département {realization.department}
        {deptName ? ` · ${deptName}` : ""}
      </p>
      <Link
        href={`/equipe#membre-${accountManager.id}`}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#b07612] hover:underline"
      >
        Voir l&apos;équipe
        <ArrowUpRight className="size-3.5" />
      </Link>
    </div>
  );
}

function StakeholderBlock({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="border-t border-black/15 pt-5 first:border-t-0 first:pt-0">
      <p className="text-xs uppercase tracking-[0.22em] text-black/50">{label}</p>
      <p className="mt-2 text-lg font-medium text-[#1a1a1c]">{value}</p>
    </div>
  );
}

function RealizationCta({
  realization,
  variant = "light",
}: {
  realization: Realization;
  variant?: "light" | "dark";
}) {
  const secondary =
    variant === "dark"
      ? "text-sm font-medium text-white/65 hover:text-[#ffb43b]"
      : "text-sm font-medium text-black/65 hover:text-[#b07612] hover:underline";
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Link
        href={`/contact?departement=${realization.department}&domaine=${realization.domains[0]}`}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-[#ffb43b] px-6 text-sm font-semibold text-[#050506] hover:bg-white hover:text-[#050506]"
      >
        Projet similaire
        <ArrowUpRight className="size-4" />
      </Link>
      <Link href={`/realisations?domaine=${realization.domains[0]}`} className={secondary}>
        Autres réalisations
      </Link>
    </div>
  );
}