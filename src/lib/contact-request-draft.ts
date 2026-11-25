import { DOMAIN_MAP, type DomainSlug } from "@/data/techlux";

export type ContactDraftInput = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  hasProject: boolean;
  department?: string;
  departmentLabel?: string;
  domain?: string;
  message: string;
};

export function buildContactReference(): string {
  return `TLX-${Date.now().toString(36).toUpperCase()}`;
}

export function buildContactDraftText(
  input: ContactDraftInput,
  reference: string
): string {
  const domainTitle = input.domain
    ? (DOMAIN_MAP[input.domain as DomainSlug]?.title ?? input.domain)
    : null;
  const lines = [
    `Référence demande : ${reference}`,
    "",
    `Nom : ${input.name}`,
    input.organization ? `Organisation : ${input.organization}` : null,
    `E-mail : ${input.email}`,
    input.phone ? `Téléphone : ${input.phone}` : null,
    `Projet à présenter : ${input.hasProject ? "Oui" : "Non"}`,
    input.hasProject && input.department
      ? `Département : ${input.department}${input.departmentLabel ? ` (${input.departmentLabel})` : ""}`
      : null,
    input.hasProject && domainTitle ? `Domaine : ${domainTitle}` : null,
    "",
    "Message :",
    input.message,
  ];
  return lines.filter(Boolean).join("\n");
}