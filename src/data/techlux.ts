export type DomainSlug =
  | "renovation-eclairage-public-led"
  | "trame-noire-pollution-lumineuse"
  | "eclairage-public-solaire"
  | "mats-eclairage-public"
  | "eclairage-voirie-en-13201"
  | "eclairage-public-smart-city"
  | "mise-en-lumiere-patrimoine-batiments"
  | "eclairage-urbain-decoratif"
  | "eclairage-stade-terrain-de-sport";

export type ScenePreset =
  | "heritage"
  | "urban"
  | "solar"
  | "bridge"
  | "sports"
  | "wood-mast"
  | "smart-crosswalk"
  | "dark-sky";

export interface DomainFaq {
  question: string;
  answer: string;
}

export interface DomainExpertise {
  slug: DomainSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
  audiences: string[];
  faq: DomainFaq[];
  norms: string[];
  recommendedKelvin: string;
  partners: string[];
  scene: ScenePreset;
}

export interface Partner {
  id: string;
  name: string;
  specialty: string;
  description: string;
  departments: string[];
  website: string;
  domains: DomainSlug[];
  origin: string;
}

export interface Realization {
  id: string;
  city: string;
  department: string;
  title: string;
  subtitle?: string;
  domains: DomainSlug[];
  partners: string[];
  scene: ScenePreset;
  kelvin: string;
  summary: string;
  highlights: string[];
  year: string;
}

export interface NewsItem {
  id: string;
  title: string;
  partner: string;
  category: string;
  dateLabel: string;
  summary: string;
  specs: string[];
  domain: DomainSlug;
}

export interface DepartmentInfo {
  code: string;
  name: string;
  region: string;
}

export const AGENCY_INFO = {
  name: "Tech'lux",
  brandShort: "techlux",
  foundedYear: 2010,
  experienceYears: 30,
  siren: "520 675 240",
  director: "Philippe Cartier-Millon",
  hosting: "OVH — 2 rue Kellermann, 59100 Roubaix",
  tagline: "Agence d'aménagement lumière & éclairage extérieur",
  headline:
    "Nous valorisons par la lumière vos espaces publics ainsi que votre patrimoine bâti.",
  intro:
    "Créée en 2010, mais riche d'une trentaine d'années d'expérience, Tech'lux vous accompagne dans la réalisation de vos projets d'aménagement lumière. Partenaire des plus grands fabricants européens, notre agence conçoit et propose des solutions adaptées à vos exigences techniques et aux normes environnementales actuelles.",
  offices: [
    {
      id: "siege",
      label: "Siège social — Ouest Lyonnais",
      phone: "09 67 07 56 77",
      secondaryPhone: "04 78 48 56 77",
      address: "33, route de Paris",
      postalCode: "69260",
      city: "Charbonnières-les-Bains",
      coordinates: { lon: 4.7492, lat: 45.7839 },
      coverage: "Métropole de Lyon, Rhône, Ain, Loire, Bourgogne & La Réunion",
    },
    {
      id: "agence",
      label: "Agence commerciale — Jacob-Bellecombette",
      phone: "04 79 26 28 12",
      address: "19, Route de la Cascade",
      postalCode: "73000",
      city: "Jacob-Bellecombette",
      coordinates: { lon: 5.9228, lat: 45.5582 },
      coverage:
        "Secteur des deux Savoies, Haute-Savoie, Isère, Drôme & Ardèche",
    },
  ],
  socials: {
    linkedin: "https://fr.linkedin.com/company/tech-lux",
    instagram: "https://www.instagram.com/techlux_sarl/",
  },
};

export const DEPARTMENTS: DepartmentInfo[] = [
  { code: "01", name: "Ain", region: "Auvergne-Rhône-Alpes" },
  { code: "07", name: "Ardèche", region: "Auvergne-Rhône-Alpes" },
  { code: "21", name: "Côte-d'Or", region: "Bourgogne-Franche-Comté" },
  { code: "26", name: "Drôme", region: "Auvergne-Rhône-Alpes" },
  { code: "38", name: "Isère", region: "Auvergne-Rhône-Alpes" },
  { code: "39", name: "Jura", region: "Bourgogne-Franche-Comté" },
  { code: "42", name: "Loire", region: "Auvergne-Rhône-Alpes" },
  { code: "58", name: "Nièvre", region: "Bourgogne-Franche-Comté" },
  { code: "69", name: "Rhône", region: "Auvergne-Rhône-Alpes" },
  { code: "71", name: "Saône-et-Loire", region: "Bourgogne-Franche-Comté" },
  { code: "73", name: "Savoie", region: "Auvergne-Rhône-Alpes" },
  { code: "74", name: "Haute-Savoie", region: "Auvergne-Rhône-Alpes" },
  { code: "89", name: "Yonne", region: "Bourgogne-Franche-Comté" },
  { code: "974", name: "La Réunion", region: "Outre-mer" },
];

export const DOMAINS: DomainExpertise[] = [
  {
    slug: "renovation-eclairage-public-led",
    title: "Rénovation LED",
    shortTitle: "Rénovation LED",
    tagline: "Moderniser un parc vétuste sans perdre en qualité de lumière",
    description:
      "Diagnostic du parc existant, étude photométrique et choix de luminaires LED pour réduire les consommations, la maintenance et les nuisances lumineuses, point par point et rue par rue.",
    seoTitle: "Rénovation d'éclairage public LED : diagnostic, étude et luminaires",
    metaDescription:
      "Rénovation d'éclairage public en LED pour les communes : diagnostic du parc, étude photométrique EN 13201, choix des luminaires et aides à mobiliser.",
    audiences: ["Communes", "Intercommunalités", "Syndicats d'énergie", "Bureaux d'études"],
    faq: [
      {
        question: "Pourquoi rénover son éclairage public en LED ?",
        answer:
          "Les luminaires anciens (sodium, mercure) consomment davantage et demandent plus de maintenance. Un diagnostic du parc chiffre le gain attendu avant travaux et hiérarchise les rues à traiter en priorité.",
      },
      {
        question: "Quelles aides mobiliser pour une commune ?",
        answer:
          "Selon le territoire : certificats d'économies d'énergie (fiche RES-EC-104, réservée aux collectivités), programme Lum'ACTEE+ pour les études et la maîtrise d'œuvre, aides des syndicats départementaux d'énergie. Les conditions varient et le dossier se dépose généralement avant le démarrage des travaux.",
      },
      {
        question: "Quelles règles respecter lors d'une rénovation ?",
        answer:
          "Les niveaux d'éclairement se justifient selon la norme EN 13201, et l'arrêté du 27 décembre 2018 encadre l'orientation des luminaires, la température de couleur et les plages d'extinction.",
      },
    ],
    norms: ["EN 13201", "Arrêté 27 déc. 2018", "Diagnostic du parc existant"],
    recommendedKelvin: "2200K – 3000K",
    partners: ["Chrysalis", "Siteco", "Cometa"],
    scene: "urban",
  },
  {
    slug: "trame-noire-pollution-lumineuse",
    title: "Trame noire",
    shortTitle: "Trame noire",
    tagline: "Préserver la nuit et la biodiversité sans renoncer à la sécurité",
    description:
      "Extinction en cœur de nuit, abaissement, températures de couleur chaudes et optiques sans flux vers le ciel : une stratégie d'éclairage compatible avec les corridors écologiques nocturnes.",
    seoTitle: "Trame noire et réduction de la pollution lumineuse : étude et solutions",
    metaDescription:
      "Trame noire et pollution lumineuse : extinction nocturne, températures de couleur chaudes, optiques sans flux vers le ciel. Étude et luminaires adaptés aux collectivités.",
    audiences: ["Communes", "Parcs et territoires", "Bureaux d'études", "Paysagistes"],
    faq: [
      {
        question: "Qu'est-ce que la trame noire ?",
        answer:
          "C'est l'ensemble des continuités écologiques où l'obscurité est préservée la nuit pour permettre aux espèces nocturnes de se déplacer, se nourrir et se reproduire.",
      },
      {
        question: "Quelles mesures concrètes appliquer sur l'éclairage ?",
        answer:
          "Réduire le nombre de points lumineux, éteindre ou abaisser en cœur de nuit, privilégier des températures de couleur chaudes (2700 K, ambre 2200 K en zone sensible) et des optiques qui n'émettent aucun flux vers le haut.",
      },
      {
        question: "Que prévoit l'arrêté du 27 décembre 2018 ?",
        answer:
          "Il encadre l'orientation des luminaires, le flux émis vers le haut, la température de couleur et des plages d'extinction pour certaines installations. Il se complète par la stratégie locale de la collectivité.",
      },
    ],
    norms: ["Extinction en cœur de nuit", "ULR 0 %", "2200K – 2700K"],
    recommendedKelvin: "2200K – 2700K",
    partners: ["Chrysalis", "Solux", "Cometa"],
    scene: "dark-sky",
  },
  {
    slug: "eclairage-public-solaire",
    title: "Éclairage solaire",
    shortTitle: "Solaire",
    tagline: "Autonomie énergétique et déploiement sans tranchée",
    description:
      "Candélabres solaires autonomes à haut rendement pour voies vertes, parkings, zones périurbaines et sites isolés, avec gestion intelligente de l'énergie et respect de la trame noire.",
    seoTitle: "Éclairage public solaire : candélabres autonomes pour communes",
    metaDescription:
      "Éclairage public solaire autonome pour voies vertes, parkings et sites isolés : installation sans tranchée, gestion de l'énergie et détection de présence.",
    audiences: ["Communes", "Paysagistes", "Aménageurs", "Bureaux d'études"],
    faq: [
      {
        question: "Quand choisir l'éclairage solaire ?",
        answer:
          "Quand le réseau est éloigné ou la tranchée coûteuse : cheminements doux, parkings, hameaux, sites isolés ou extensions ponctuelles de voirie.",
      },
      {
        question: "Les candélabres solaires fonctionnent-ils en hiver et en altitude ?",
        answer:
          "Le dimensionnement de la batterie et du panneau dépend de l'ensoleillement local et du profil de gradation retenu. Une étude préalable valide l'autonomie sur site, y compris en zone de montagne.",
      },
    ],
    norms: ["Zéro génie civil réseau", "Batterie longue durée", "Détection crépusculaire"],
    recommendedKelvin: "2200K – 3000K",
    partners: ["Solux", "Aubrilam"],
    scene: "solar",
  },
  {
    slug: "eclairage-voirie-en-13201",
    title: "Éclairage de voirie",
    shortTitle: "Voirie",
    tagline: "Sécurité des axes et maîtrise des nuisances lumineuses",
    description:
      "Luminaires fonctionnels haute performance optique assurant l'uniformité de luminance sur les voiries, giratoires et axes structurants tout en supprimant le flux sortant vers le ciel.",
    seoTitle: "Éclairage de voirie et étude photométrique EN 13201",
    metaDescription:
      "Éclairage de voirie conforme EN 13201 : étude photométrique, luminaires routiers à faible flux vers le ciel, giratoires et axes structurants pour communes et bureaux d'études.",
    audiences: ["Communes", "Bureaux d'études", "Maîtres d'œuvre", "Départements"],
    faq: [
      {
        question: "Que fixe la norme EN 13201 ?",
        answer:
          "Elle définit les classes d'éclairage selon la vitesse, le trafic, la géométrie de la voie et le type d'usagers. L'étude photométrique démontre que les niveaux retenus sont atteints.",
      },
      {
        question: "Qu'est-ce que l'ULR ?",
        answer:
          "L'ULR est la proportion de flux émise au-dessus de l'horizontale. Les luminaires de voirie récents visent un ULR inférieur à 1 %, voire nul, pour limiter le halo lumineux.",
      },
    ],
    norms: ["EN 13201", "ULR < 1%", "Arrêté 27 déc. 2018"],
    recommendedKelvin: "2700K – 3000K",
    partners: ["Siteco", "Chrysalis"],
    scene: "urban",
  },
  {
    slug: "eclairage-public-smart-city",
    title: "Smart City",
    shortTitle: "Smart City",
    tagline: "Éclairage adaptatif, télégestion et sécurisation piétonne",
    description:
      "Systèmes intelligents de gradation, détection de présence, télégestion point à point et signalisation lumineuse active des passages piétons pour réduire jusqu'à 75 % des consommations.",
    seoTitle: "Éclairage public intelligent : gradation, détection et télégestion Smart City",
    metaDescription:
      "Éclairage public Smart City : gradation dynamique, détection de présence, télégestion point à point et sécurisation des passages piétons pour les collectivités.",
    audiences: ["Communes", "Intercommunalités", "Bureaux d'études", "Exploitants"],
    faq: [
      {
        question: "Quelles économies attendre d'un éclairage intelligent ?",
        answer:
          "Gradation selon la fréquentation, détection de présence et télégestion permettent de réduire fortement les consommations, jusqu'à 75 % selon la configuration de départ.",
      },
      {
        question: "Comment éviter d'être dépendant d'un seul fabricant ?",
        answer:
          "En s'appuyant sur des standards ouverts comme Zhaga Book 18 et DALI-2 / D4i, qui permettent de piloter et de faire évoluer le parc sans changer l'ensemble des luminaires.",
      },
    ],
    norms: ["Zhaga Book 18", "DALI-2 / D4i", "Gradation dynamique"],
    recommendedKelvin: "2200K – 3000K",
    partners: ["Cometa"],
    scene: "smart-crosswalk",
  },
  {
    slug: "mats-eclairage-public",
    title: "Mâts d'éclairage",
    shortTitle: "Mâts",
    tagline: "Matériaux nobles, ingénierie mécanique et grande hauteur",
    description:
      "Mâts décoratifs en bois lamellé-collé, supports acier ou aluminium, consoles et mâts grande hauteur conçus pour s'intégrer durablement dans les paysages urbains et alpins.",
    seoTitle: "Mâts d'éclairage public : bois lamellé-collé, acier et grande hauteur",
    metaDescription:
      "Mâts d'éclairage public en bois lamellé-collé, acier ou aluminium, consoles et mâts grande hauteur conformes EN 40, pour paysagistes et bureaux d'études.",
    audiences: ["Paysagistes", "Bureaux d'études", "Communes", "Architectes"],
    faq: [
      {
        question: "Quelle norme encadre les mâts d'éclairage ?",
        answer:
          "La série de normes EN 40 définit les exigences de conception et de résistance des candélabres. Elle sert de base aux notes de calcul demandées en consultation.",
      },
      {
        question: "Mât bois ou mât acier : comment choisir ?",
        answer:
          "Le bois lamellé-collé certifié PEFC convient aux sites où l'intégration paysagère prime. L'acier ou l'aluminium s'impose pour les fortes contraintes mécaniques et les grandes hauteurs.",
      },
    ],
    norms: ["EN 40", "Bois certifié PEFC", "Résistance vents forts"],
    recommendedKelvin: "Multi-applications",
    partners: ["Aubrilam", "Petitjean"],
    scene: "wood-mast",
  },
  {
    slug: "mise-en-lumiere-patrimoine-batiments",
    title: "Mise en lumière du patrimoine",
    shortTitle: "Mise en lumière",
    tagline: "Sublimation du patrimoine bâti et des ouvrages d'art",
    description:
      "Projecteurs architecturaux de précision, optiques rasantes et linéaires encastrés pour révéler églises, édifices historiques, façades contemporaines, forts et passerelles.",
    seoTitle: "Mise en lumière du patrimoine : églises, façades et ouvrages d'art",
    metaDescription:
      "Mise en lumière de patrimoine bâti, églises, façades et ouvrages d'art : projecteurs architecturaux de précision, IRC élevé et anti-éblouissement. Étude pour communes et architectes.",
    audiences: ["Communes", "Architectes", "Concepteurs lumière", "Paysagistes"],
    faq: [
      {
        question: "Quelle température de couleur pour éclairer de la pierre ?",
        answer:
          "Une lumière chaude entre 2200 K et 3000 K, avec un indice de rendu des couleurs élevé (IRC > 80, idéalement 90), met en valeur la pierre sans la durcir.",
      },
      {
        question: "Comment concilier mise en lumière et extinction nocturne ?",
        answer:
          "Des plages d'extinction sont prévues pour l'éclairage de façades. La programmation astronomique et horaire se définit dès la conception pour rester conforme.",
      },
    ],
    norms: ["Optiques haute précision", "IRC > 80 / 90", "Anti-éblouissement"],
    recommendedKelvin: "2200K – 3000K",
    partners: ["Meyer"],
    scene: "heritage",
  },
  {
    slug: "eclairage-urbain-decoratif",
    title: "Éclairage d'ambiance",
    shortTitle: "Ambiance",
    tagline: "Identité nocturne des cœurs de ville et espaces de vie",
    description:
      "Luminaires contemporains et ensembles urbains alliant signature esthétique de jour comme de nuit, confort visuel des piétons et préservation de la biodiversité nocturne.",
    seoTitle: "Éclairage urbain décoratif : luminaires d'ambiance pour cœurs de ville",
    metaDescription:
      "Éclairage urbain décoratif pour cœurs de ville, places et promenades : luminaires design, confort visuel des piétons et compatibilité trame noire.",
    audiences: ["Paysagistes", "Architectes", "Communes", "Aménageurs"],
    faq: [
      {
        question: "Un luminaire décoratif peut-il rester compatible avec la trame noire ?",
        answer:
          "Oui, à condition de choisir des optiques asymétriques, des températures de couleur chaudes et un flux dirigé vers le sol, sans dispersion vers le ciel ni vers les espaces naturels voisins.",
      },
      {
        question: "Comment garder une cohérence entre mâts et luminaires ?",
        answer:
          "En traitant l'ensemble dès l'étude : famille de luminaires, hauteur et matière des mâts, teintes et scénarios de gradation sont choisis ensemble pour former une signature d'espace.",
      },
    ],
    norms: ["Confort visuel", "Optiques asymétriques", "Compatible trame noire"],
    recommendedKelvin: "2200K – 2700K",
    partners: ["Chrysalis", "Aubrilam", "Siteco"],
    scene: "bridge",
  },
  {
    slug: "eclairage-stade-terrain-de-sport",
    title: "Éclairage de stades",
    shortTitle: "Stades",
    tagline: "Performance visuelle pour stades, tennis et complexes",
    description:
      "Projecteurs LED asymétriques et mâts grande hauteur garantissant une excellente uniformité sur les aires de jeu, sans gêne pour le voisinage ni pollution lumineuse.",
    seoTitle: "Éclairage de stades et terrains de sport : projecteurs LED et mâts",
    metaDescription:
      "Éclairage de stades, terrains de football et courts de tennis : projecteurs LED sans scintillement, mâts grande hauteur, uniformité et maîtrise du halo.",
    audiences: ["Communes", "Clubs et fédérations", "Bureaux d'études", "Gestionnaires d'équipements"],
    faq: [
      {
        question: "Quel niveau d'éclairement pour un équipement sportif ?",
        answer:
          "Il dépend de la discipline et du niveau de pratique. Les référentiels des fédérations (FFF, FFT) fixent des exigences que l'étude photométrique vérifie, avec l'uniformité sur l'aire de jeu.",
      },
      {
        question: "Comment limiter la gêne pour les riverains ?",
        answer:
          "Par des projecteurs asymétriques à faible débordement, un positionnement adapté des mâts et une extinction programmée en fin d'activité.",
      },
    ],
    norms: ["Normes FFF / FFT", "Sans scintillement", "Maîtrise du halo"],
    recommendedKelvin: "4000K – 5000K",
    partners: ["Siteco", "Petitjean"],
    scene: "sports",
  },
];

export const PARTNERS: Partner[] = [
  {
    id: "aubrilam",
    name: "AUBRILAM",
    specialty: "Mâts décoratifs, supports et mobilier en bois",
    description:
      "Fabricant français reconnu pour ses mâts d'éclairage en bois lamellé-collé et son mobilier urbain durable alliant chaleur architecturale et résistance mécanique.",
    departments: ["01", "07", "26", "38", "42", "69", "73", "74", "974"],
    website: "https://www.aubrilam.com/fr/",
    domains: ["mats-eclairage-public", "eclairage-urbain-decoratif", "eclairage-public-solaire"],
    origin: "France",
  },
  {
    id: "chrysalis",
    name: "CHRYSALIS",
    specialty: "Éclairage design & contemporain",
    description:
      "Concepteur de luminaires urbains design et éco-conçus, intégrant températures mixtes, boucliers anti-intrusion lumineuse et solutions respectueuses de la biodiversité.",
    departments: ["01", "07", "26", "38", "39", "42", "69", "71", "73", "74"],
    website: "https://www.chrysaliseclairage.com/",
    domains: ["eclairage-urbain-decoratif", "eclairage-voirie-en-13201", "eclairage-public-smart-city", "renovation-eclairage-public-led", "trame-noire-pollution-lumineuse"],
    origin: "France",
  },
  {
    id: "cometa",
    name: "COMETA",
    specialty: "Solutions connectées & Smart City",
    description:
      "Technologies de pilotage intelligent, capteurs de présence, télégestion de l'éclairage public et signalisation lumineuse active pour les territoires connectés.",
    departments: ["01", "07", "26", "38", "42", "69", "73", "74", "974"],
    website: "https://cometa-smartcity.fr/",
    domains: ["eclairage-public-smart-city", "renovation-eclairage-public-led", "trame-noire-pollution-lumineuse"],
    origin: "France",
  },
  {
    id: "meyer",
    name: "MEYER",
    specialty: "Mise en lumière & Éclairage urbain",
    description:
      "Ingénierie allemande de très haute précision pour la mise en lumière architecturale : projecteurs, encastrés de sol, optiques elliptiques et anti-éblouissement.",
    departments: [
      "01",
      "07",
      "21",
      "26",
      "38",
      "39",
      "42",
      "58",
      "69",
      "71",
      "73",
      "74",
      "89",
      "974",
    ],
    website: "https://www.meyer-lighting.com/",
    domains: ["mise-en-lumiere-patrimoine-batiments", "eclairage-urbain-decoratif"],
    origin: "Allemagne",
  },
  {
    id: "petitjean",
    name: "PETITJEAN",
    specialty: "Mâts & supports d'éclairage public & grande hauteur",
    description:
      "Leader européen de la conception et fabrication de mâts acier et supports techniques, des candélabres urbains aux mâts grande hauteur pour stades et infrastructures.",
    departments: ["01", "07", "26", "38", "39", "42", "69", "71", "73", "74"],
    website: "https://www.petitjean.fr/",
    domains: ["mats-eclairage-public", "eclairage-stade-terrain-de-sport", "eclairage-voirie-en-13201"],
    origin: "France",
  },
  {
    id: "siteco",
    name: "SITECO",
    specialty: "Éclairage sportif, décoratif & fonctionnel",
    description:
      "Solutions d'éclairage haute technicité pour la voirie, les grands espaces, les installations sportives et les projets urbains avec drivers intelligents iQ.",
    departments: ["01", "07", "26", "38", "39", "42", "69", "71", "73", "74", "974"],
    website: "https://www.siteco.com/",
    domains: ["eclairage-stade-terrain-de-sport", "eclairage-voirie-en-13201", "eclairage-urbain-decoratif", "renovation-eclairage-public-led"],
    origin: "Allemagne",
  },
  {
    id: "solux",
    name: "SOLUX",
    specialty: "Éclairage solaire autonome",
    description:
      "Systèmes d'éclairage public solaire haute autonomie conçus pour fonctionner toute l'année avec gestion énergétique intelligente et installation rapide.",
    departments: ["01", "07", "26", "38", "39", "42", "69", "71", "73", "74", "974"],
    website: "https://solux.fr/fr/",
    domains: ["eclairage-public-solaire", "eclairage-voirie-en-13201", "trame-noire-pollution-lumineuse"],
    origin: "France",
  },
];

export const REALIZATIONS: Realization[] = [
  {
    id: "saint-fons-salengro",
    city: "Saint-Fons",
    department: "69",
    title: "Place Roger Salengro",
    subtitle: "Requalification urbaine et confort nocturne",
    domains: ["eclairage-urbain-decoratif", "mats-eclairage-public", "eclairage-public-smart-city"],
    partners: ["Chrysalis", "Aubrilam"],
    scene: "urban",
    kelvin: "2700K",
    year: "2025",
    summary:
      "Aménagement lumière complet du cœur de place favorisant l'usage piéton, les rencontres et la sobriété énergétique grâce à la gradation horaire.",
    highlights: ["Température chaude 2700K", "Optiques asymétriques anti-éblouissement", "Abaissement nocturne programmé"],
  },
  {
    id: "sainte-consorce-badel",
    city: "Sainte-Consorce",
    department: "69",
    title: "Chemin du Badel",
    subtitle: "Mobilité douce & autonomie solaire",
    domains: ["eclairage-public-solaire", "eclairage-voirie-en-13201", "trame-noire-pollution-lumineuse"],
    partners: ["Solux"],
    scene: "solar",
    kelvin: "2700K",
    year: "2025",
    summary:
      "Sécurisation d'un axe de circulation douce sans extension de réseau électrique grâce à des ensembles solaires autonomes à détection de passage.",
    highlights: ["Installation sans tranchée", "Détection de présence intelligente", "Zéro consommation réseau"],
  },
  {
    id: "saint-cyr-mont-dor",
    city: "Saint-Cyr-au-Mont-d'Or",
    department: "69",
    title: "Aménagement de voirie & cœur de bourg",
    subtitle: "Éclairage patrimonial respectueux des Monts d'Or",
    domains: ["eclairage-urbain-decoratif", "eclairage-voirie-en-13201", "trame-noire-pollution-lumineuse"],
    partners: ["Chrysalis", "Petitjean"],
    scene: "urban",
    kelvin: "2400K",
    year: "2025",
    summary:
      "Harmonisation esthétique des traversées de village avec un éclairage doux limitant strictement le halo vers la voûte céleste.",
    highlights: ["ULR 0% (zéro lumière vers le ciel)", "Teinte chaude 2400K", "Intégration paysagère"],
  },
  {
    id: "lyon-saint-rambert",
    city: "Lyon",
    department: "69",
    title: "Quartier Saint-Rambert",
    subtitle: "Luminaires architecturaux en bord de Saône",
    domains: ["eclairage-urbain-decoratif", "mats-eclairage-public"],
    partners: ["Chrysalis"],
    scene: "wood-mast",
    kelvin: "2700K",
    year: "2025",
    summary:
      "Déploiement d'ensembles décoratifs sur mesure respectant le Plan Lumière lyonnais et préservant les continuités écologiques de la Saône.",
    highlights: ["Conformité Plan Lumière", "Préservation corridors écologiques", "Design épuré"],
  },
  {
    id: "crest-volland-saisies",
    city: "Crest-Volland",
    department: "73",
    title: "Route des Saisies",
    subtitle: "Éclairage alpin haute résistance",
    domains: ["eclairage-voirie-en-13201", "mats-eclairage-public"],
    partners: ["Siteco", "Petitjean"],
    scene: "urban",
    kelvin: "3000K",
    year: "2025",
    summary:
      "Équipement d'un axe de montagne soumis aux contraintes climatiques hivernales sévères avec maintien d'une excellente visibilité sur chaussée enneigée.",
    highlights: ["Tenue gel et charges de neige", "Driver iQ adaptatif", "Sécurité routière renforcée"],
  },
  {
    id: "rillieux-carre-nature",
    city: "Rillieux-la-Pape",
    department: "69",
    title: "Carré Nature par Kaufman & Broad",
    subtitle: "Résidence éco-conçue et éclairage solaire",
    domains: ["eclairage-public-solaire", "eclairage-urbain-decoratif"],
    partners: ["Solux", "Aubrilam"],
    scene: "solar",
    kelvin: "2700K",
    year: "2025",
    summary:
      "Accompagnement d'un programme immobilier neuf sur l'éclairage autonome des cheminements piétons et espaces verts paysagers.",
    highlights: ["Autonomie énergétique", "Matériaux durables", "Confort résidentiel nocturne"],
  },
  {
    id: "pierre-benite-eglise",
    city: "Pierre-Bénite",
    department: "69",
    title: "Église Notre-Dame de l'Assomption",
    subtitle: "Mise en lumière du patrimoine architectural",
    domains: ["mise-en-lumiere-patrimoine-batiments"],
    partners: ["Meyer"],
    scene: "heritage",
    kelvin: "2700K",
    year: "2025",
    summary:
      "Révélation des reliefs de pierre, du clocher et des vitraux par un jeu de faisceaux serrés et d'optiques architecturales sans débordement.",
    highlights: ["Projecteurs architecturaux Meyer", "Absence d'éblouissement", "Horloge astronomique"],
  },
  {
    id: "grigny-vie-claire",
    city: "Grigny",
    department: "69",
    title: "La Vie Claire",
    subtitle: "Éclairage de site tertiaire et abords",
    domains: ["eclairage-voirie-en-13201", "eclairage-public-solaire", "eclairage-public-smart-city"],
    partners: ["Siteco", "Cometa"],
    scene: "urban",
    kelvin: "3000K",
    year: "2025",
    summary:
      "Optimisation lumineuse et énergétique des voiries internes, parkings et accès logistiques avec gestion automatisée.",
    highlights: ["Détection crépusculaire et présence", "Réduction facture énergétique", "Conformité réglementaire"],
  },
  {
    id: "collonges-mont-dor",
    city: "Collonges-au-Mont-d'Or",
    department: "69",
    title: "Traversée et espaces publics",
    subtitle: "Sobriété lumineuse en bord de Saône",
    domains: ["eclairage-urbain-decoratif", "eclairage-public-smart-city", "trame-noire-pollution-lumineuse", "renovation-eclairage-public-led"],
    partners: ["Chrysalis", "Cometa"],
    scene: "wood-mast",
    kelvin: "2200K",
    year: "2025",
    summary:
      "Transition LED intelligente avec scénarios nocturnes adaptés à la fréquentation et préservation des zones humides riveraines.",
    highlights: ["Spectre ambre 2200K", "Protection faune nocturne", "Pilotage horaire"],
  },
  {
    id: "lagnieu-eglise",
    city: "Lagnieu",
    department: "01",
    title: "Église Saint-Jean-Baptiste",
    subtitle: "Valorisation nocturne d'un édifice historique",
    domains: ["mise-en-lumiere-patrimoine-batiments"],
    partners: ["Meyer"],
    scene: "heritage",
    kelvin: "2700K",
    year: "2025",
    summary:
      "Scénographie lumineuse mettant en valeur la façade et le clocher de l'église tout en respectant l'extinction nocturne réglementaire.",
    highlights: ["Optiques elliptiques précises", "Intégration discrète sur façade", "Extinction programmée"],
  },
  {
    id: "saint-genis-laval",
    city: "Saint-Genis-Laval",
    department: "69",
    title: "Avenue et cheminements urbains",
    subtitle: "Modernisation LED et confort piéton",
    domains: ["renovation-eclairage-public-led", "eclairage-voirie-en-13201", "eclairage-urbain-decoratif"],
    partners: ["Siteco", "Chrysalis"],
    scene: "urban",
    kelvin: "3000K",
    year: "2023",
    summary:
      "Remplacement du parc vétuste par des luminaires LED haute efficacité garantissant une excellente perception des trottoirs et chaussées.",
    highlights: ["Efficacité > 140 lm/W", "Longévité L90 > 100 000 h", "Uniformité optimisée"],
  },
  {
    id: "irigny-daisy-georges-martin",
    city: "Irigny",
    department: "69",
    title: "Rue Daisy Georges Martin",
    subtitle: "Sécurisation et rénovation d'axe urbain",
    domains: ["eclairage-voirie-en-13201", "mats-eclairage-public"],
    partners: ["Chrysalis", "Petitjean"],
    scene: "urban",
    kelvin: "2700K",
    year: "2023",
    summary:
      "Éclairage routier et piéton cohérent intégrant des crosses design et une photométrie dédiée à la sécurité des usagers.",
    highlights: ["Double optique route / trottoir", "Mâts acier thermolaqués", "Gradation nocturne"],
  },
  {
    id: "isle-dabeau-theobald",
    city: "L'Isle-d'Abeau",
    department: "38",
    title: "Rue Saint-Théobald",
    subtitle: "Éclairage urbain connecté et traversées sécurisées",
    domains: ["eclairage-voirie-en-13201", "eclairage-public-smart-city"],
    partners: ["Cometa", "Siteco"],
    scene: "smart-crosswalk",
    kelvin: "3000K",
    year: "2023",
    summary:
      "Sécurisation des traversées piétonnes et modernisation de l'éclairage de voirie avec pilotage intelligent.",
    highlights: ["Sécurisation active du passage piéton", "Visibilité accrue par temps de pluie", "Télégestion"],
  },
  {
    id: "menthon-saint-bernard",
    city: "Menthon-Saint-Bernard",
    department: "74",
    title: "Rives du lac d'Annecy",
    subtitle: "Mâts bois & éclairage respectueux du lac",
    domains: ["mats-eclairage-public", "eclairage-urbain-decoratif", "trame-noire-pollution-lumineuse"],
    partners: ["Aubrilam", "Chrysalis"],
    scene: "wood-mast",
    kelvin: "2400K",
    year: "2022",
    summary:
      "Intégration paysagère de mâts bois lamellé-collé et de luminaires chauds en harmonie avec le cadre naturel du lac d'Annecy.",
    highlights: ["Mâts bois Aubrilam", "Lumière chaude non intrusive", "Zéro fuite lumineuse sur le lac"],
  },
  {
    id: "paray-le-monial-passerelle",
    city: "Paray-le-Monial",
    department: "71",
    title: "Passerelle SNCF",
    subtitle: "Mise en lumière d'ouvrage d'art",
    domains: ["mise-en-lumiere-patrimoine-batiments", "eclairage-urbain-decoratif"],
    partners: ["Meyer"],
    scene: "bridge",
    kelvin: "3000K",
    year: "2022",
    summary:
      "Valorisation nocturne d'un franchissement ferroviaire majeur combinant éclairage fonctionnel du tablier et signature architecturale.",
    highlights: ["Éclairage linéaire continu", "Résistance aux vibrations", "Balisage sécurisé"],
  },
  {
    id: "givry-patrimoine",
    city: "Givry",
    department: "71",
    title: "Église – Horloge – Bureau de poste",
    subtitle: "Parcours lumière patrimonial en Bourgogne",
    domains: ["mise-en-lumiere-patrimoine-batiments", "eclairage-urbain-decoratif"],
    partners: ["Meyer", "Chrysalis"],
    scene: "heritage",
    kelvin: "2700K",
    year: "2022",
    summary:
      "Mise en scène coordonnée de trois monuments emblématiques du centre-bourg créant une identité nocturne chaleureuse.",
    highlights: ["Cohérence architecturale", "Projecteurs miniatures dissimulés", "Teinte pierre dorée"],
  },
  {
    id: "lyon-vivier-merle",
    city: "Lyon",
    department: "69",
    title: "Boulevard Marius Vivier Merle",
    subtitle: "Axe métropolitain majeur de la Part-Dieu",
    domains: ["eclairage-voirie-en-13201", "mats-eclairage-public"],
    partners: ["Siteco", "Petitjean"],
    scene: "urban",
    kelvin: "3000K",
    year: "2022",
    summary:
      "Équipement d'un boulevard structurant à fort trafic multimode (piétons, cycles, transports en commun, voitures).",
    highlights: ["Haute performance photométrique", "Mâts urbains sur mesure", "Conformité EN 13201"],
  },
  {
    id: "chassieu-eurexpo",
    city: "Chassieu",
    department: "69",
    title: "Eurexpo Lyon",
    subtitle: "Éclairage des parvis et grands espaces",
    domains: ["mats-eclairage-public", "eclairage-voirie-en-13201"],
    partners: ["Petitjean", "Siteco"],
    scene: "urban",
    kelvin: "4000K",
    year: "2022",
    summary:
      "Éclairage grande hauteur et gestion des flux sur le parc des expositions international d'Eurexpo Lyon.",
    highlights: ["Mâts grande hauteur Petitjean", "Uniformité sur vastes parvis", "Maintenance simplifiée"],
  },
  {
    id: "ecully-eglise",
    city: "Écully",
    department: "69",
    title: "Église Saint-Blaise",
    subtitle: "Mise en valeur architecturale du clocher",
    domains: ["mise-en-lumiere-patrimoine-batiments"],
    partners: ["Meyer"],
    scene: "heritage",
    kelvin: "2700K",
    year: "2022",
    summary:
      "Éclairage architectural précis soulignant les contreforts et l'élévation du clocher sans dispersion lumineuse.",
    highlights: ["Faisceaux découpés", "Protection contre l'éblouissement", "Pilotage astronomique"],
  },
  {
    id: "decines-grand-large",
    city: "Décines-Charpieu",
    department: "69",
    title: "Esplanade du Grand Large",
    subtitle: "Promenade paysagère et mobilier bois",
    domains: ["eclairage-urbain-decoratif", "mats-eclairage-public", "eclairage-public-smart-city"],
    partners: ["Aubrilam", "Chrysalis", "Cometa"],
    scene: "wood-mast",
    kelvin: "2700K",
    year: "2022",
    summary:
      "Aménagement d'une esplanade de détente et de promenade reliant la ville au plan d'eau du Grand Large.",
    highlights: ["Mâts bois chaleureux", "Scénarios événementiels", "Efficacité énergétique"],
  },
  {
    id: "valloire-fort-telegraphe",
    city: "Valloire",
    department: "73",
    title: "Fort du Télégraphe",
    subtitle: "Mise en lumière d'un site fortifié à 1 566 m",
    domains: ["mise-en-lumiere-patrimoine-batiments", "eclairage-public-solaire"],
    partners: ["Meyer"],
    scene: "heritage",
    kelvin: "2700K",
    year: "2022",
    summary:
      "Sublimation des remparts du fort dominant la vallée de la Maurienne avec des appareils conçus pour les conditions extrêmes d'altitude.",
    highlights: ["Indice IP67 / IK10", "Contraste chaud sur pierre alpine", "Visibilité panoramique maîtrisée"],
  },
  {
    id: "annecy-parc-sports",
    city: "Annecy",
    department: "74",
    title: "Parc des Sports",
    subtitle: "Mâts grande hauteur & plateau sportif",
    domains: ["eclairage-stade-terrain-de-sport", "mats-eclairage-public"],
    partners: ["Petitjean", "Siteco"],
    scene: "sports",
    kelvin: "5000K",
    year: "2023",
    summary:
      "Équipement sportif avec mâts acier grande hauteur et projecteurs LED haute performance, dimensionné pour les normes fédérales et la maîtrise des débordements lumineux.",
    highlights: [
      "Mâts acier 34 m",
      "Projecteurs Siteco sans scintillement",
      "Maîtrise du halo vers le voisinage",
    ],
  },
  {
    id: "valence-stade-pompidou",
    city: "Valence",
    department: "26",
    title: "Stade Georges Pompidou",
    subtitle: "Éclairage sportif haute performance",
    domains: ["eclairage-stade-terrain-de-sport", "mats-eclairage-public"],
    partners: ["Siteco", "Petitjean"],
    scene: "sports",
    kelvin: "5000K",
    year: "2022",
    summary:
      "Installation sportive de haut niveau offrant un rendu optimal pour les compétitions et retransmissions tout en maîtrisant les débordements.",
    highlights: ["Projecteurs Siteco haute puissance", "Zéro scintillement caméra", "Mâts grande hauteur"],
  },
  {
    id: "mauves-tennis",
    city: "Mauves",
    department: "07",
    title: "Terrains de tennis",
    subtitle: "Éclairage sportif homologué sans gêne riveraine",
    domains: ["eclairage-stade-terrain-de-sport"],
    partners: ["Siteco"],
    scene: "sports",
    kelvin: "4000K",
    year: "2022",
    summary:
      "Relamping LED des courts de tennis communaux permettant une mise en route instantanée et une réduction nette de la puissance installée.",
    highlights: ["Conformité Fédération Française de Tennis", "Allumage instantané", "-60% de consommation"],
  },
  {
    id: "macon-cci-geneves",
    city: "Mâcon",
    department: "71",
    title: "CCI | Place Genevès",
    subtitle: "Façade institutionnelle & parvis",
    domains: ["mise-en-lumiere-patrimoine-batiments", "eclairage-urbain-decoratif"],
    partners: ["Meyer", "Chrysalis"],
    scene: "heritage",
    kelvin: "2700K",
    year: "2020",
    summary:
      "Mise en lumière de la Chambre de Commerce et d'Industrie et valorisation de la Place Genevès au cœur de Mâcon.",
    highlights: ["Lecture architecturale de la façade", "Confort du parvis", "Sobriété nocturne"],
  },
];

export const REALIZATION_MAP: Record<string, Realization> = REALIZATIONS.reduce(
  (acc, r) => {
    acc[r.id] = r;
    return acc;
  },
  {} as Record<string, Realization>
);

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "selene-chrysalis",
    title: "SELENE – CHRYSALIS",
    partner: "Chrysalis",
    category: "Luminaire urbain",
    dateLabel: "Nouveauté 2025",
    summary:
      "Luminaire décoratif aux lignes épurées offrant un confort visuel optimal et une parfaite compatibilité avec les exigences de trame noire.",
    specs: ["2200K à 3000K", "ULR < 1%", "Flux maîtrisé sur voirie & cheminements"],
    domain: "eclairage-urbain-decoratif",
  },
  {
    id: "st-rambert-chrysalis",
    title: "ST-RAMBERT – CHRYSALIS",
    partner: "Chrysalis",
    category: "Design architectural",
    dateLabel: "Nouveauté 2025",
    summary:
      "Ensemble conçu pour les quartiers patrimoniaux et berges urbaines, associant esthétique contemporaine et haute efficacité photométrique.",
    specs: ["Design signature", "Zhaga Book 18", "Optiques modulables"],
    domain: "eclairage-urbain-decoratif",
  },
  {
    id: "sl31-siteco",
    title: "SL31 – SITECO",
    partner: "Siteco",
    category: "Éclairage routier",
    dateLabel: "Nouveauté",
    summary:
      "Gamme routière modulaire de nouvelle génération assurant une maintenance simplifiée et un pilotage intelligent pour les collectivités.",
    specs: ["Jusqu'à 165 lm/W", "Driver iQ intégré", "EN 13201"],
    domain: "eclairage-voirie-en-13201",
  },
  {
    id: "fabio-chrysalis",
    title: "FABIO – CHRYSALIS",
    partner: "Chrysalis",
    category: "Éclairage urbain",
    dateLabel: "Nouveauté",
    summary:
      "Borne et luminaire de parc robustes conçus pour baliser les liaisons douces et espaces verts sans éblouissement.",
    specs: ["IK10 / IP66", "Optique anti-intrusion", "Teinte au choix"],
    domain: "eclairage-urbain-decoratif",
  },
  {
    id: "eko-chrysalis",
    title: "EKO – CHRYSALIS",
    partner: "Chrysalis",
    category: "Éco-conception",
    dateLabel: "Nouveauté",
    summary:
      "Solution rationnelle et recyclable pensée pour la rénovation massive des parcs d'éclairage public communaux.",
    specs: ["Réparabilité complète", "Empreinte carbone réduite", "Gradation autonome"],
    domain: "renovation-eclairage-public-led",
  },
  {
    id: "monospot-s-meyer",
    title: "MONOSPOT S – MEYER",
    partner: "Meyer",
    category: "Mise en lumière",
    dateLabel: "Innovation",
    summary:
      "Projecteur architectural ultra-compact à optique précise permettant de sculpter les détails de façades et monuments sans pollution visuelle.",
    specs: ["IRC > 90", "Accessoires anti-éblouissement", "Corps aluminium fonderie"],
    domain: "mise-en-lumiere-patrimoine-batiments",
  },
  {
    id: "solaire-autonome-solux",
    title: "ÉCLAIRAGE SOLAIRE AUTONOME – SOLUX",
    partner: "Solux",
    category: "Énergie solaire",
    dateLabel: "Innovation",
    summary:
      "Candélabres solaires autonomes à haut rendement garantissant l'éclairage toute l'année, même en conditions hivernales exigeantes.",
    specs: ["Panneaux verticaux ou inclinés", "Batterie LiFePO4", "Zéro raccordement ENEDIS"],
    domain: "eclairage-public-solaire",
  },
  {
    id: "driver-iq-siteco",
    title: "DRIVER INTELLIGENT iQ – SITECO",
    partner: "Siteco",
    category: "Smart City",
    dateLabel: "Technologie",
    summary:
      "Pilotage embarqué automatisant les profils d'abaissement nocturne, la régulation thermique et le maintien de flux constant.",
    specs: ["CLO (Constant Light Output)", "Abaissement 5 paliers", "Programmation NFC"],
    domain: "eclairage-public-smart-city",
  },
  {
    id: "biodiv-chrysalis",
    title: "BIODIV – CHRYSALIS",
    partner: "Chrysalis",
    category: "Trame noire & Biodiversité",
    dateLabel: "Écologie",
    summary:
      "Solution lumineuse à spectre ambre et température mixte préservant les chiroptères, insectes nocturnes et corridors écologiques.",
    specs: ["Spectre 2200K / Ambre", "Faible taux de bleu", "Conforme arrêté 2018"],
    domain: "eclairage-public-smart-city",
  },
  {
    id: "hikari-petitjean",
    title: "HIKARI – PETITJEAN",
    partner: "Petitjean",
    category: "Mâts & Supports",
    dateLabel: "Design",
    summary:
      "Ligne de mâts et crosses sculpturales associant finesse mécanique et intégration urbaine contemporaine.",
    specs: ["Acier galvanisé thermolaqué", "Multiples hauteurs", "Calcul Eurocode"],
    domain: "mats-eclairage-public",
  },
  {
    id: "sirius-siteco",
    title: "SIRIUS – SITECO",
    partner: "Siteco",
    category: "Éclairage sportif",
    dateLabel: "Sport",
    summary:
      "Projecteur haute puissance pour enceintes sportives combinant rendement record et contrôle strict du halo lumineux.",
    specs: ["Optiques asymétriques", "Compatible UHD / TV", "Pilotage DALI / DMX"],
    domain: "eclairage-stade-terrain-de-sport",
  },
];

export type KelvinPreset = "2200K" | "2400K" | "2700K" | "3000K" | "4000K" | "5000K";

export function parseKelvin(k?: string): KelvinPreset {
  if (!k) return "2700K";
  if (k.includes("2200")) return "2200K";
  if (k.includes("2400")) return "2400K";
  if (k.includes("4000")) return "4000K";
  if (k.includes("5000")) return "5000K";
  if (k.includes("3000")) return "3000K";
  return "2700K";
}

export const DOMAIN_MAP: Record<DomainSlug, DomainExpertise> = DOMAINS.reduce(
  (acc, d) => {
    acc[d.slug] = d;
    return acc;
  },
  {} as Record<DomainSlug, DomainExpertise>
);
