import type { MetadataRoute } from "next";
import { DOMAINS, REALIZATIONS } from "@/data/techlux";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/solutions",
  "/realisations",
  "/equipe",
  "/fournisseurs",
  "/etude-lumiere",
  "/actualites",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      priority: path === "" ? 1 : 0.7,
    })),
    ...DOMAINS.map((d) => ({
      url: `${SITE_URL}/solutions/${d.slug}`,
      lastModified: now,
      priority: 0.9,
    })),
    ...REALIZATIONS.map((r) => ({
      url: `${SITE_URL}/realisations/${r.id}`,
      lastModified: now,
      priority: 0.85,
    })),
  ];
}
