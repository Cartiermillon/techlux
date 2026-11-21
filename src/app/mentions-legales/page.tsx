import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { AGENCY_INFO } from "@/data/techlux";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et informations réglementaires de Tech'lux.",
};

const SECTIONS = [
  {
    title: "Mentions obligatoires",
    body: (
      <>
        <p>
          La société <strong>Tech&rsquo;lux</strong> est enregistrée sous le
          n° SIREN <strong>{AGENCY_INFO.siren}</strong> et a pour siège social
          33 Route de Paris, 69260 Charbonnières-les-Bains. Tél. : 09 67 07 56
          77 / 04 78 48 56 77.
        </p>
        <p>
          Directeur de la publication : <strong>{AGENCY_INFO.director}</strong>
          .
        </p>
        <p>Hébergeur : {AGENCY_INFO.hosting}.</p>
      </>
    ),
  },
  {
    title: "Protection des informations personnelles",
    body: (
      <p>
        Conformément au RGPD et à la loi Informatique et Libertés du 6 janvier
        1978 modifiée, les informations recueillies via le formulaire de
        contact servent uniquement à traiter votre demande et n&rsquo;ont pour
        destinataire que la société Tech&rsquo;lux. Vous disposez d&rsquo;un
        droit d&rsquo;accès, de rectification et de suppression auprès de
        Tech&rsquo;lux, à l&rsquo;adresse du siège social.
      </p>
    ),
  },
  {
    title: "Propriété intellectuelle",
    body: (
      <p>
        Les contenus, textes, graphismes, visuels et bases de données de ce
        site sont protégés par la législation française et internationale
        relative au droit d&rsquo;auteur. Toute reproduction ou représentation,
        intégrale ou partielle, sans autorisation écrite préalable est
        interdite.
      </p>
    ),
  },
  {
    title: "Liens hypertextes",
    body: (
      <p>
        Les liens vers les sites de nos fabricants partenaires ont pour seul but
        de compléter votre information technique. Tech&rsquo;lux ne saurait être
        tenue responsable du contenu de ces sites tiers.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <PageHero
        eyebrow="Informations réglementaires"
        title={
          <>
            Mentions <span className="text-black/35">légales.</span>
          </>
        }
      />
      <section className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-10">
        <div className="border-t border-black/20">
          {SECTIONS.map((s, i) => (
            <div
              key={s.title}
              className="grid gap-4 border-b border-black/15 py-10 lg:grid-cols-12 lg:gap-10"
            >
              <div className="flex items-baseline gap-5 lg:col-span-5">
                <span className="text-xs tabular-nums text-black/40">
                  0{i + 1}
                </span>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                  {s.title}
                </h2>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-black/65 sm:text-base lg:col-span-7">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
