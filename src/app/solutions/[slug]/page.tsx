import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOMAINS } from "@/data/techlux";
import { SITE_URL } from "@/lib/site";
import {
  buildSolutionJsonLd,
  getSolutionPageModel,
} from "@/lib/solutions";
import { SolutionDetailView } from "@/components/solution-detail-view";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return DOMAINS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getSolutionPageModel(slug);
  if (!model) return {};

  const { domain, seo } = model;
  const description =
    seo.lead.length > 0
      ? `${domain.metaDescription} ${seo.lead}`.slice(0, 320)
      : domain.metaDescription;

  return {
    title: domain.seoTitle,
    description,
    alternates: { canonical: `/solutions/${domain.slug}` },
    openGraph: {
      title: domain.seoTitle,
      description,
      url: `/solutions/${domain.slug}`,
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default async function SolutionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const model = getSolutionPageModel(slug);
  if (!model) notFound();

  const jsonLd = buildSolutionJsonLd(model.domain, model.faq, SITE_URL);

  return <SolutionDetailView model={model} jsonLd={jsonLd} />;
}
