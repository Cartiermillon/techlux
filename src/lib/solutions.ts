import {
  AGENCY_INFO,
  DOMAIN_MAP,
  DOMAINS,
  REALIZATIONS,
  type DomainExpertise,
  type DomainFaq,
  type DomainSlug,
  type Realization,
} from "@/data/techlux";
import { SOLUTION_SEO } from "@/data/solution-seo-content";

export type SolutionPageModel = {
  domain: DomainExpertise;
  seo: (typeof SOLUTION_SEO)[DomainSlug];
  faq: DomainFaq[];
  projects: Realization[];
  related: DomainExpertise[];
  others: DomainExpertise[];
};

export function getSolutionPageModel(slug: string): SolutionPageModel | null {
  const domain = DOMAIN_MAP[slug as DomainSlug];
  if (!domain) return null;

  const seo = SOLUTION_SEO[domain.slug];
  const faq = [...domain.faq, ...seo.extraFaq];
  const projects = REALIZATIONS.filter((r) => r.domains.includes(domain.slug)).slice(
    0,
    3
  );
  const related = seo.relatedSlugs
    .map((s) => DOMAIN_MAP[s])
    .filter(Boolean) as DomainExpertise[];
  const others = DOMAINS.filter((d) => d.slug !== domain.slug);

  return { domain, seo, faq, projects, related, others };
}

export function buildSolutionJsonLd(
  domain: DomainExpertise,
  faq: DomainFaq[],
  siteUrl: string
) {
  const pageUrl = `${siteUrl}/solutions/${domain.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: domain.seoTitle,
      description: domain.metaDescription,
      url: pageUrl,
      serviceType: domain.title,
      areaServed: [
        "Auvergne-Rhône-Alpes",
        "Bourgogne-Franche-Comté",
        "La Réunion",
      ],
      provider: {
        "@type": "Organization",
        name: AGENCY_INFO.name,
        url: siteUrl,
      },
      audience: domain.audiences.map((a) => ({
        "@type": "Audience",
        audienceType: a,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Solutions",
          item: `${siteUrl}/solutions`,
        },
        { "@type": "ListItem", position: 3, name: domain.title, item: pageUrl },
      ],
    },
  ];
}
