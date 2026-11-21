import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { REALIZATIONS, REALIZATION_MAP } from "@/data/techlux";
import { getRealizationPageMeta } from "@/data/realization-pages";
import { SITE_URL } from "@/lib/site";
import { RealizationDetailView } from "@/components/realization-detail-view";
import { RealizationAnnecyParcSportsView } from "@/components/realization-annecy-parc-sports-view";
import { AGENCY_INFO } from "@/data/techlux";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return REALIZATIONS.map((r) => ({ slug: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const realization = REALIZATION_MAP[slug];
  if (!realization) return {};
  const meta = getRealizationPageMeta(realization);
  const ogImage = meta.coverImage
    ? [{ url: `${SITE_URL}${meta.coverImage}`, alt: meta.coverAlt ?? meta.seoTitle }]
    : undefined;
  return {
    title: meta.seoTitle,
    description: meta.metaDescription,
    alternates: { canonical: `/realisations/${realization.id}` },
    openGraph: {
      title: meta.seoTitle,
      description: meta.metaDescription,
      url: `/realisations/${realization.id}`,
      type: "article",
      locale: "fr_FR",
      images: ogImage,
    },
  };
}

export default async function RealisationProjectPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const realization = REALIZATION_MAP[slug];
  if (!realization) notFound();

  const meta = getRealizationPageMeta(realization);
  const pageUrl = `${SITE_URL}/realisations/${realization.id}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: meta.seoTitle,
      description: meta.metaDescription,
      url: pageUrl,
      dateCreated: realization.year,
      locationCreated: {
        "@type": "Place",
        name: realization.city,
        address: {
          "@type": "PostalAddress",
          addressLocality: realization.city,
          addressRegion: realization.department,
          addressCountry: "FR",
        },
      },
      creator: {
        "@type": "Organization",
        name: AGENCY_INFO.name,
        url: SITE_URL,
      },
      keywords: realization.domains.join(", "),
      ...(meta.coverImage
        ? { image: `${SITE_URL}${meta.coverImage}` }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Réalisations",
          item: `${SITE_URL}/realisations`,
        },
        { "@type": "ListItem", position: 3, name: realization.title, item: pageUrl },
      ],
    },
  ];

  if (realization.id === "annecy-parc-sports") {
    return (
      <RealizationAnnecyParcSportsView
        realization={realization}
        meta={meta}
        jsonLd={jsonLd}
      />
    );
  }

  return (
    <RealizationDetailView
      realization={realization}
      meta={meta}
      jsonLd={jsonLd}
    />
  );
}