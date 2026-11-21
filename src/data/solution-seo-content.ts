import type { DomainFaq, DomainSlug } from "@/data/techlux";

export type SolutionUseCase = {
  title: string;
  text: string;
};

export type SolutionProcessStep = {
  step: string;
  title: string;
  text: string;
};

export type SolutionEditorialBlock = {
  id: string;
  h2: string;
  paragraphs: string[];
};

export type SolutionSeoContent = {
  lead: string;
  useCases: SolutionUseCase[];
  process: SolutionProcessStep[];
  editorial: SolutionEditorialBlock[];
  relatedSlugs: DomainSlug[];
  crossLinks: { href: string; label: string }[];
  extraFaq: DomainFaq[];
};

const RENOVATION_LED: SolutionSeoContent = {
  lead:
    "La rénovation d'un parc d'éclairage public concerne des milliers de points lumineux souvent équipés encore de sodium, mercure ou de premières générations LED. Avant tout marché de travaux, une étude photométrique et un diagnostic patrimonial permettent de définir le juste niveau d'éclairement, le matériel adapté et le montage des dossiers de financement — CEE, Lum'ACTEE+ ou aides du syndicat d'énergie.",
  useCases: [
    {
      title: "Relamping ou remplacement complet",
      text: "Le remplacement de la source LED sur un luminaire existant limite l'investissement mais conserve parfois des optiques obsolètes. Le renouvellement du luminaire et du mât est préférable lorsque la photométrie, l'ULR ou la maintenance ne suivent plus.",
    },
    {
      title: "Cœur de bourg et places publiques",
      text: "Les traversées piétonnes, places et linéaires commerçants demandent un confort visuel élevé et des températures chaudes (2 200 K à 3 000 K), compatible avec l'identité nocturne du centre-ville.",
    },
    {
      title: "Axes structurants et giratoires",
      text: "Voiries à fort trafic : classement EN 13201, uniformité de luminance, visibilité des obstacles et maîtrise du flux vers le ciel pour respecter l'arrêté du 27 décembre 2018.",
    },
    {
      title: "Parcs résidentiels et lotissements",
      text: "Réduction des consommations et de la maintenance tout en abaissant la lumière en cœur de nuit grâce à la gradation ou à l'extinction programmée.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Relevé et diagnostic du parc",
      text: "Inventaire des points lumineux, typologie des voies, puissances installées, pannes récurrentes. Première orientation sur le gain énergétique attendu.",
    },
    {
      step: "02",
      title: "Étude photométrique EN 13201",
      text: "Simulation des niveaux d'éclairement selon les classes de voie, choix des optiques et validation du confort des usagers (piétons, cyclistes, véhicules).",
    },
    {
      step: "03",
      title: "Variantes luminaires & chiffrage",
      text: "Comparatif de solutions chez les fabricants partenaires (Chrysalis, Siteco, Cometa…) : performance, photométrie, durée de vie, coût global sur 20 ans.",
    },
    {
      step: "04",
      title: "Montage financier & département",
      text: "Identification des aides (CEE RES-EC-104, Lum'ACTEE+, syndicat départemental) et orientation vers l'agence Lyon ou Savoie selon le territoire du projet.",
    },
  ],
  editorial: [
    {
      id: "pourquoi-led",
      h2: "Pourquoi rénover l'éclairage public en LED aujourd'hui",
      paragraphs: [
        "Les collectivités d'Auvergne-Rhône-Alpes et de Bourgogne-Franche-Comté font face à un double impératif : maîtriser la facture énergétique de l'éclairage public et réduire les nuisances lumineuses signalées par les habitants et les associations de protection de la nuit.",
        "Passer du sodium haute pression ou du mercure aux luminaires LED n'est pas qu'un changement d'ampoule : c'est l'occasion de requalifier la photométrie rue par rue, d'introduire l'abaissement nocturne et de préparer une télégestion ultérieure.",
        "Tech'lux accompagne maîtres d'ouvrage, bureaux d'études et syndicats d'énergie dès la phase de conception, en apportant fiches techniques, courbes photométriques et retours de chantiers comparables sur le territoire.",
      ],
    },
    {
      id: "etude-photometrique",
      h2: "Étude photométrique et conformité EN 13201",
      paragraphs: [
        "L'étude d'éclairage public repose sur le classement des voies selon la norme européenne EN 13201 : vitesse, trafic, géométrie, zones de conflit piéton. Elle fixe les niveaux minimaux à atteindre pour voir et être vu.",
        "Pour un bureau d'études ou une commune sans service technique dédié, nous fournissons des simulations, des préconisations de hauteur de feux et des gammes de luminaires déjà éprouvées en Rhône, Ain, Loire, Savoie ou Haute-Savoie.",
        "L'étude intègre dès le départ l'arrêté du 27 décembre 2018 : orientation des luminaires, limitation du flux vers le haut, températures de couleur et plages d'extinction lorsque le projet le prévoit.",
      ],
    },
    {
      id: "financement",
      h2: "Financer la rénovation : CEE, Lum'ACTEE+ et syndicats",
      paragraphs: [
        "Le Fonds vert ne finance plus directement les travaux de rénovation de l'éclairage public, mais les collectivités disposent d'autres leviers. Les certificats d'économies d'énergie, via la fiche RES-EC-104 réservée aux collectivités territoriales, participent au financement du remplacement des armoires et luminaires énergivores.",
        "Le programme Lum'ACTEE+ soutient les études et la maîtrise d'œuvre des rénovations ambitieuses, avec des objectifs de baisse de consommation. Les syndicats départementaux d'énergie peuvent compléter par des forfaits au point lumineux.",
        "Nous aidons à structurer le dossier en amont des travaux : sans étude solide, les dérives de suréquipement ou de non-conformité photométrique sont fréquentes après coup.",
      ],
    },
    {
      id: "territoire",
      h2: "Une équipe locale : Ouest lyonnais et Savoie",
      paragraphs: [
        "Depuis Charbonnières-les-Bains (Rhône) et Jacob-Bellecombette (Savoie), Tech'lux intervient sur la Métropole de Lyon, le Rhône, l'Ain, la Loire, l'Isère, les deux Savoies, la Drôme, l'Ardèche, la Bourgogne-Franche-Comté et La Réunion.",
        "Deux agences permettent des relevés rapides et un suivi de projet continu — que vous soyez une commune de 800 habitants, une intercommunalité ou un bureau d'études en phase de consultation.",
      ],
    },
  ],
  relatedSlugs: [
    "eclairage-voirie-en-13201",
    "trame-noire-pollution-lumineuse",
    "eclairage-public-smart-city",
  ],
  crossLinks: [
    { href: "/etude-lumiere", label: "Outil d'étude d'éclairement" },
    { href: "/fournisseurs", label: "Fabricants partenaires" },
    { href: "/equipe", label: "Équipe régionale" },
  ],
  extraFaq: [
    {
      question: "Quelle différence entre rénovation LED et simple relamping ?",
      answer:
        "Le relamping change la source lumineuse à l'intérieur d'un boîtier existant. La rénovation complète remplace luminaire, optique et parfois mât pour atteindre les performances photométriques et l'ULR exigés aujourd'hui.",
    },
    {
      question: "Combien de temps dure une étude d'éclairage public ?",
      answer:
        "Pour un diagnostic de parc et une première variante, comptez quelques semaines selon la taille du territoire et la disponibilité des plans. Une étude photométrique détaillée pour consultation s'étale sur l'ensemble de la mission de maîtrise d'œuvre.",
    },
    {
      question: "Peut-on rénover progressivement par quartiers ?",
      answer:
        "Oui, la plupart des communes traitent leur parc par tranches annuelles. Un schéma directeur permet de hiérarchiser les rues prioritaires (sécurité, plaintes, vétusté) et de lisser l'investissement.",
    },
  ],
};

function minimalFallback(slug: DomainSlug): SolutionSeoContent {
  const related: Record<DomainSlug, DomainSlug[]> = {
    "renovation-eclairage-public-led": [
      "eclairage-voirie-en-13201",
      "trame-noire-pollution-lumineuse",
    ],
    "trame-noire-pollution-lumineuse": [
      "renovation-eclairage-public-led",
      "eclairage-urbain-decoratif",
    ],
    "eclairage-public-solaire": ["mats-eclairage-public", "trame-noire-pollution-lumineuse"],
    "mats-eclairage-public": ["eclairage-urbain-decoratif", "eclairage-public-solaire"],
    "eclairage-voirie-en-13201": [
      "renovation-eclairage-public-led",
      "eclairage-public-smart-city",
    ],
    "eclairage-public-smart-city": [
      "renovation-eclairage-public-led",
      "eclairage-voirie-en-13201",
    ],
    "mise-en-lumiere-patrimoine-batiments": [
      "eclairage-urbain-decoratif",
      "trame-noire-pollution-lumineuse",
    ],
    "eclairage-urbain-decoratif": [
      "mats-eclairage-public",
      "mise-en-lumiere-patrimoine-batiments",
    ],
    "eclairage-stade-terrain-de-sport": [
      "eclairage-voirie-en-13201",
      "mats-eclairage-public",
    ],
  };
  return {
    lead: "",
    useCases: [],
    process: [],
    editorial: [],
    relatedSlugs: related[slug] ?? [],
    crossLinks: [
      { href: "/etude-lumiere", label: "Outil d'étude d'éclairement" },
      { href: "/contact", label: "Demande d'étude" },
    ],
    extraFaq: [],
  };
}

export const SOLUTION_SEO: Record<DomainSlug, SolutionSeoContent> = {
  "renovation-eclairage-public-led": RENOVATION_LED,
  "trame-noire-pollution-lumineuse": minimalFallback("trame-noire-pollution-lumineuse"),
  "eclairage-public-solaire": minimalFallback("eclairage-public-solaire"),
  "mats-eclairage-public": minimalFallback("mats-eclairage-public"),
  "eclairage-voirie-en-13201": minimalFallback("eclairage-voirie-en-13201"),
  "eclairage-public-smart-city": minimalFallback("eclairage-public-smart-city"),
  "mise-en-lumiere-patrimoine-batiments": minimalFallback(
    "mise-en-lumiere-patrimoine-batiments"
  ),
  "eclairage-urbain-decoratif": minimalFallback("eclairage-urbain-decoratif"),
  "eclairage-stade-terrain-de-sport": minimalFallback("eclairage-stade-terrain-de-sport"),
};
