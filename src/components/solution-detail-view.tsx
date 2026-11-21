import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { parseKelvin } from "@/data/techlux";
import type { SolutionPageModel } from "@/lib/solutions";
import { SolutionSceneHero } from "@/components/solution-scene-hero";
import { SolutionSceneThumb } from "@/components/solution-scene-thumb";

const labelClass = "text-xs uppercase tracking-[0.22em] text-black/50";
const sectionTitleClass =
  "text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em]";

type SolutionDetailViewProps = {
  model: SolutionPageModel;
  jsonLd: object[];
};

export function SolutionDetailView({ model, jsonLd }: SolutionDetailViewProps) {
  const { domain, seo, faq, projects, related, others } = model;
  const hasRichContent =
    seo.lead.length > 0 ||
    seo.useCases.length > 0 ||
    seo.editorial.length > 0;

  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-black/12">
        <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-12 sm:pb-20 sm:pt-16 lg:px-10">
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-black/45"
          >
            <Link href="/solutions" className="hover:text-[#b07612]">
              Solutions
            </Link>
            <span>/</span>
            <span className="text-black/70">{domain.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h1 className="text-[clamp(2.25rem,5.2vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em] text-[#0b0b0c]">
                {domain.seoTitle}
              </h1>
              <p className="mt-6 text-xl font-medium leading-snug tracking-tight text-black/80">
                {domain.tagline}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/60 sm:text-lg">
                {domain.description}
              </p>
              {seo.lead ? (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/55">
                  {seo.lead}
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/contact?domaine=${domain.slug}`}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#ffb43b] px-7 text-[15px] font-semibold text-[#050506] hover:bg-[#0b0b0c] hover:text-white"
                >
                  Demande d&rsquo;étude
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={`/realisations?domaine=${domain.slug}`}
                  className="text-sm font-medium text-black/70 underline-offset-4 hover:text-[#b07612] hover:underline"
                >
                  Voir les réalisations
                </Link>
                <Link
                  href="/etude-lumiere"
                  className="text-sm font-medium text-black/70 underline-offset-4 hover:text-[#b07612] hover:underline"
                >
                  Simulateur photométrique
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SolutionSceneHero
                preset={domain.scene}
                kelvin={parseKelvin(domain.recommendedKelvin)}
              />
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-black/45">
                Température conseillée · {domain.recommendedKelvin}
              </p>
            </div>
          </div>
        </div>
      </section>

      {seo.useCases.length > 0 && (
        <section className="border-b border-black/12 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <h2 className={sectionTitleClass}>
              Cas d&rsquo;usage —{" "}
              <span className="text-black/35">{domain.title}</span>
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {seo.useCases.map((item) => (
                <li
                  key={item.title}
                  className="border-t border-black/15 pt-6"
                >
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {seo.process.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 py-16 sm:py-20 lg:px-10">
          <p className={labelClass}>Démarche d&rsquo;étude</p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em]">
            De l&rsquo;inventaire du parc à la prescription luminaire
          </h2>
          <ol className="mt-12 grid gap-8 border-t border-black/15 pt-10 md:grid-cols-2">
            {seo.process.map((step) => (
              <li key={step.step} className="flex gap-5">
                <span className="text-xs font-semibold tabular-nums text-[#b07612]">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {seo.editorial.map((block) => (
        <section
          key={block.id}
          className="border-t border-black/12 bg-white py-14 sm:py-16"
        >
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <h2 className="max-w-3xl text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-snug tracking-[-0.03em]">
              {block.h2}
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-black/65">
              {block.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <h2 className={labelClass}>Repères techniques</h2>
          <ul className="mt-5 space-y-3 border-t border-black/15 pt-5">
            {domain.norms.map((norm) => (
              <li key={norm} className="flex items-center gap-3 text-lg">
                <span className="size-1.5 rounded-full bg-[#ffb43b]" />
                {norm}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-xs uppercase tracking-[0.22em] text-black/50">
            Pour qui
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2 border-t border-black/15 pt-5">
            {domain.audiences.map((a) => (
              <li
                key={a}
                className="rounded-full border border-black/20 px-4 py-1.5 text-sm text-black/75"
              >
                {a}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-xs uppercase tracking-[0.22em] text-black/50">
            Fabricants partenaires
          </h2>
          <p className="mt-5 border-t border-black/15 pt-5 text-lg">
            {domain.partners.join(" · ")}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/fournisseurs"
              className="text-sm font-medium text-black/70 underline-offset-4 hover:text-[#b07612] hover:underline"
            >
              Tous les partenaires
            </Link>
            {seo.crossLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-black/70 underline-offset-4 hover:text-[#b07612] hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className={labelClass}>
            {hasRichContent ? "Questions fréquentes des collectivités" : "Questions fréquentes"}
          </h2>
          <div className="mt-5 border-t border-black/15">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group border-b border-black/15 py-5"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-xl font-semibold tracking-tight">
                  {item.question}
                  <span className="mt-1 text-2xl leading-none text-[#b07612] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/65">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-black/12 bg-[#ecebe8] py-14">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <h2 className={labelClass}>Solutions complémentaires</h2>
            <ul className="mt-5 flex flex-wrap gap-3 border-t border-black/15 pt-5">
              {related.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/solutions/${d.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black/80 hover:border-[#ffb43b]/50 hover:text-[#b07612]"
                  >
                    {d.title}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="border-t border-black/12 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <h2 className={sectionTitleClass}>
              Réalisations{" "}
              <span className="text-black/35">associées</span>
            </h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/realisations/${p.id}`}
                    className="group block"
                  >
                    <SolutionSceneThumb
                      preset={p.scene}
                      className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-black/45">
                      {p.city} · {p.department} · {p.year}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight group-hover:text-[#b07612]">
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <p className="mt-1 text-sm text-black/60">{p.subtitle}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-[#3a3d44] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em]">
            Un projet de {domain.title.toLowerCase()} ?{" "}
            <span className="text-white/55">
              Indiquez votre département, nous orientons votre demande.
            </span>
          </h2>
          <Link
            href={`/contact?domaine=${domain.slug}`}
            className="group inline-flex h-14 w-fit items-center gap-2 rounded-full bg-[#ffb43b] px-8 text-base font-semibold text-[#050506] hover:bg-white"
          >
            Demande d&rsquo;étude
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <h2 className={labelClass}>Toutes les solutions</h2>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/15 pt-5">
          {others.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/solutions/${d.slug}`}
                className="text-[15px] font-medium text-black/70 hover:text-[#b07612]"
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
