import type { Realization } from "@/data/techlux";
import { DOMAIN_MAP } from "@/data/techlux";
import { primaryMemberForDepartment } from "@/data/team";

export type RealizationStakeholders = {
  maitriseOuvrage?: string;
  bureauEtudes?: string;
  installateur?: string;
};

export type RealizationPageMeta = {
  seoTitle: string;
  metaDescription: string;
  locationLabel: string;
  leadPartner: string;
  technicalPoints: string[];
  stakeholders: RealizationStakeholders;
  accountManagerId: string;
  coverImage?: string;
  coverAlt?: string;
};

const OVERRIDES: Partial<
  Record<
    string,
    Partial<
      Pick<
        RealizationPageMeta,
        | "seoTitle"
        | "metaDescription"
        | "locationLabel"
        | "leadPartner"
        | "technicalPoints"
        | "stakeholders"
        | "accountManagerId"
        | "coverImage"
        | "coverAlt"
      >
    >
  >
> = {
  "annecy-parc-sports": {
    seoTitle:
      "Mâts d'éclairage sportif grande hauteur (34 m) : PETITJEAN",
    metaDescription:
      "Parc des Sports d'Annecy (74) : mâts acier 34 m PETITJEAN et projecteurs LED Siteco. Étude Tech'lux, maîtrise d'ouvrage Ville d'Annecy.",
    locationLabel: "Parc des Sports d'Annecy (74)",
    leadPartner: "PETITJEAN",
    technicalPoints: [
      "Mâts acier galvanisé grande hauteur — 34 m",
      "Projecteurs LED sportifs Siteco, sans scintillement",
      "Étude photométrique conforme aux exigences fédérales",
      "Maîtrise du halo et des débordements vers le voisinage",
    ],
    stakeholders: {
      maitriseOuvrage: "Ville d'Annecy",
      bureauEtudes: "OSMOSE Ingénierie",
      installateur: "CECCON BTP — Annecy & HTB Services",
    },
    accountManagerId: "langlade",
    coverImage: "/realisations/annecy-parc-sports-hero.jpg",
    coverAlt:
      "Parc des Sports d'Annecy (74) — vue aérienne du plateau sportif et de l'éclairage nocturne, mâts PETITJEAN",
  },
  "valence-stade-pompidou": {
    seoTitle:
      "Éclairage sportif LED et mâts grande hauteur : SITECO — Stade Georges Pompidou (26)",
    stakeholders: {
      maitriseOuvrage: "Ville de Valence",
      bureauEtudes: "Bureau d'études éclairage (collectivité)",
      installateur: "Entreprise générale d'électricité — Drôme",
    },
    accountManagerId: "charlotte",
  },
  "pierre-benite-eglise": {
    seoTitle:
      "Mise en lumière d'église et patrimoine : MEYER — Notre-Dame de l'Assomption (69)",
    stakeholders: {
      maitriseOuvrage: "Commune de Pierre-Bénite",
      bureauEtudes: "Architecte lumière & BE fluides",
    },
    accountManagerId: "sauze",
  },
  "menthon-saint-bernard": {
    seoTitle:
      "Mâts bois Aubrilam et éclairage lac : CHRYSALIS — Bords du lac d'Annecy (74)",
    stakeholders: {
      maitriseOuvrage: "Commune de Menthon-Saint-Bernard",
    },
    accountManagerId: "langlade",
  },
};

function defaultMaitriseOuvrage(city: string, title: string) {
  if (/cci|eurexpo|vie claire|kaufman|broad/i.test(title)) {
    return title;
  }
  if (city === "Lyon") return "Métropole de Lyon";
  return `Commune de ${city}`;
}

function buildSeoTitle(realization: Realization): string {
  const lead = realization.partners[0]?.toUpperCase() ?? "TECH'LUX";
  const primary = DOMAIN_MAP[realization.domains[0]];
  const theme = primary?.title ?? "Éclairage extérieur";
  return `${theme} : ${lead} — ${realization.title} (${realization.department})`;
}

export function getRealizationPageMeta(
  realization: Realization
): RealizationPageMeta {
  const override = OVERRIDES[realization.id] ?? {};
  const manager =
    override.accountManagerId ??
    primaryMemberForDepartment(realization.department)?.id ??
    "philippe";

  const locationLabel =
    override.locationLabel ??
    `${realization.title} — ${realization.city} (${realization.department})`;

  const metaDescription =
    override.metaDescription ??
    `${locationLabel}. ${realization.summary} Luminaires ${realization.partners.join(", ")}. Température ${realization.kelvin}, ${realization.year}.`.slice(
      0,
      300
    );

  return {
    seoTitle: override.seoTitle ?? buildSeoTitle(realization),
    metaDescription,
    locationLabel,
    leadPartner: override.leadPartner ?? realization.partners[0]?.toUpperCase() ?? "TECH'LUX",
    technicalPoints: override.technicalPoints ?? realization.highlights,
    stakeholders: {
      maitriseOuvrage:
        override.stakeholders?.maitriseOuvrage ??
        defaultMaitriseOuvrage(realization.city, realization.title),
      bureauEtudes: override.stakeholders?.bureauEtudes,
      installateur: override.stakeholders?.installateur,
    },
    accountManagerId: manager,
    coverImage: override.coverImage,
    coverAlt: override.coverAlt,
  };
}

/** Vignettes photo pour les cartes liste (projets avec visuel chantier). */
export function getRealizationCover(
  id: string
): { src: string; alt: string } | null {
  const entry = OVERRIDES[id];
  if (!entry?.coverImage) return null;
  return {
    src: entry.coverImage,
    alt: entry.coverAlt ?? "Photo du projet",
  };
}