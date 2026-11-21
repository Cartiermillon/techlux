import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { AGENCY_INFO, DOMAINS, PARTNERS } from "@/data/techlux";
import { FooterWordmark } from "@/components/footer-wordmark";
import { FooterAgencyLabel } from "@/components/footer-agency-label";

const SITE_LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/equipe", label: "Équipe" },
  { href: "/fournisseurs", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

const FOOTER_OFFICES = AGENCY_INFO.offices;

const AUDIENCE_LINKS = [
  { href: "/realisations?domaine=mats-eclairage-public", label: "Paysagistes" },
  {
    href: "/realisations?domaine=mise-en-lumiere-patrimoine-batiments",
    label: "Concepteurs lumière",
  },
  {
    href: "/realisations?domaine=eclairage-voirie-en-13201",
    label: "Bureaux d'études",
  },
];

const labelClass =
  "text-[11px] uppercase tracking-[0.24em] text-white/40";
const linkClass =
  "text-[15px] text-white/70 transition-colors hover:text-[#ffb43b]";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#050506] text-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="border-b border-white/12 pb-16 pt-24 sm:pt-32">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/50">
            <span className="size-1.5 rounded-full bg-[#ffb43b]" />
            Un projet, une intention, un site à révéler
          </p>
          <Link href="/contact" className="group mt-8 block max-w-5xl">
            <span className="block text-[clamp(2rem,5.8vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Éclairer{" "}
              <span className="text-[#ffb43b]">autrement</span>
              <ArrowUpRight className="ml-[0.08em] inline size-[0.5em] -translate-y-[0.06em] text-white/40 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-[0.14em] group-hover:text-[#ffb43b]" />
            </span>
          </Link>
        </div>

        <div className="grid gap-12 border-b border-white/12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-12 sm:col-span-2 lg:col-span-5">
            {FOOTER_OFFICES.map((office) => (
              <div key={office.id}>
                <FooterAgencyLabel>
                  {office.id === "siege" ? "Siège · Lyon" : "Agence · Savoie"}
                </FooterAgencyLabel>
                <address className="mt-3 not-italic">
                  <p className="text-sm font-medium text-white/50">
                    {office.postalCode} {office.city}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/32">
                    {office.address}
                  </p>
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, "")}`}
                    className="mt-3 inline-block text-base font-medium tabular-nums text-[#ffb43b] hover:text-white"
                  >
                    {office.phone}
                  </a>
                </address>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className={labelClass}>Solutions</p>
            <ul className="mt-5 space-y-2.5">
              {DOMAINS.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/solutions/${d.slug}`}
                    className={linkClass}
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={labelClass}>Explorer</p>
            <ul className="mt-5 space-y-2.5">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={labelClass}>Vous êtes</p>
            <ul className="mt-5 space-y-2.5">
              {AUDIENCE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={`${labelClass} mt-10`}>Suivre</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={AGENCY_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-1`}
                >
                  LinkedIn
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 border-b border-white/12 py-8 lg:grid-cols-12 lg:gap-8">
          <p className={`${labelClass} lg:col-span-3`}>
            Fabricants représentés
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2.5 text-base lg:col-span-9">
            {PARTNERS.map((p) => (
              <li key={p.id}>
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium uppercase tracking-[0.12em] text-white/90 transition-colors hover:text-[#ffb43b] sm:text-lg"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 techlux · SIREN {AGENCY_INFO.siren}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-white"
            >
              Mentions légales
            </Link>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-[#ffb43b]"
            >
              Haut de page
              <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
