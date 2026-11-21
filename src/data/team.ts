import araMap from "@/data/ara-departments.json";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** Codes département INSEE (01, 69, …) */
  departments: string[];
  /** Libellé affiché quand le périmètre n’est pas uniquement départemental */
  territoryLabel?: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  linkedin: string;
  accent: string;
  /** Chemin public (ex. /team/charlotte.jpg) */
  photo: string;
}

export const ARA_MAP_VIEWBOX = araMap.viewBox;
export const ARA_DEPT_PATHS = araMap.paths as Record<string, string>;
export const ARA_MAP_DEPARTMENTS = araMap.departments;
export const ARA_MAP_OFFICES = araMap.offices as {
  id: string;
  shortLabel: string;
  title: string;
  x: number;
  y: number;
}[];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "charlotte",
    name: "Charlotte Cartier-Millon",
    role: "Chargée d'affaires",
    departments: ["69", "38", "26"],
    email: "c.cartier-millon@techlux.fr",
    phone: "+33670087731",
    phoneDisplay: "07 70 08 77 31",
    linkedin: "https://www.linkedin.com/in/charlotte-cartier-millon-b8b591113/",
    accent: "#ffb43b",
    photo: "/team/charlotte.jpg",
  },
  {
    id: "sauze",
    name: "Philippe Sauze",
    role: "Chargé d'affaires",
    departments: ["01", "07", "69"],
    email: "p.sauze@techlux.fr",
    phone: "+33670670465",
    phoneDisplay: "06 70 67 04 65",
    linkedin: "https://www.linkedin.com/in/philippe-sauze-424501a3/",
    accent: "#5b9cf5",
    photo: "/team/sauze.jpg",
  },
  {
    id: "langlade",
    name: "Philippe Langlade",
    role: "Chargé d'affaires — Deux Savoies",
    departments: ["73", "74"],
    territoryLabel: "Secteur des deux Savoies",
    email: "p.langlade@techlux.fr",
    phone: "+33670332343",
    phoneDisplay: "06 70 33 23 43",
    linkedin: "https://www.linkedin.com/in/philippelanglade/",
    accent: "#4ade80",
    photo: "/team/langlade.jpg",
  },
  {
    id: "delphine",
    name: "Delphine Cartier-Millon",
    role: "Chargée d'affaires",
    departments: ["42", "43"],
    territoryLabel: "Loire & Haute-Loire",
    email: "d.cartier-millon@techlux.fr",
    phone: "+33678007021",
    phoneDisplay: "06 78 00 70 21",
    linkedin:
      "https://www.linkedin.com/in/delphine-cartier-millon-8914481a8/",
    accent: "#c084fc",
    photo: "/team/delphine.png",
  },
  {
    id: "philippe",
    name: "Philippe Cartier-Millon",
    role: "Directeur de publication · Référent grands comptes",
    departments: ["69"],
    territoryLabel: "Mairie de Lyon",
    email: "p.cartier-millon@techlux.fr",
    phone: "+33617497702",
    phoneDisplay: "06 17 49 77 02",
    linkedin: "https://fr.linkedin.com/company/tech-lux",
    accent: "#f472b6",
    photo: "/team/philippe.png",
  },
];

export function membersForDepartment(code: string): TeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.departments.includes(code));
}

export function primaryMemberForDepartment(
  code: string
): TeamMember | undefined {
  const all = membersForDepartment(code);
  if (all.length === 0) return undefined;
  if (code === "69") return all.find((m) => m.id === "philippe") ?? all[0];
  return all[0];
}
