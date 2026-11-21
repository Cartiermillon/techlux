import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { AGENCY_INFO } from "@/data/techlux";
import { FooterAgencyLabel } from "@/components/footer-agency-label";

const OFFICE_HEADLINE: Record<string, string> = {
  siege: "Siège · Lyon",
  agence: "Agence · Savoie",
};

const OFFICE_TAGLINE: Record<string, string> = {
  siege: "Ouest lyonnais · Rhône & alentours",
  agence: "Chambéry · Savoie & Haute-Savoie",
};

const cardClass = "contact-agency-white overflow-hidden rounded-3xl";

export function ContactOfficesPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className={`${cardClass} px-6 py-6 sm:px-8`}>
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/45">
          <span className="size-1.5 rounded-full bg-[#ffb43b]" />
          Nos implantations
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/60">
          Deux équipes sur le terrain pour vos études d&rsquo;éclairage — joignez
          directement l&rsquo;agence la plus proche de votre projet.
        </p>
      </div>

      {AGENCY_INFO.offices.map((office) => (
        <article key={office.id} className={cardClass}>
          <div className="border-b border-black/[0.06] bg-[#fafaf8] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-5">
              <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] bg-white shadow-sm">
                <Image
                  src={
                    office.id === "siege"
                      ? "/brand/blason-lyon.png"
                      : "/brand/blason-savoie.png"
                  }
                  alt={
                    office.id === "siege"
                      ? "Armoiries de Lyon"
                      : "Armoiries de Savoie"
                  }
                  width={52}
                  height={64}
                  className="h-[3.25rem] w-auto object-contain"
                />
              </div>
              <div className="min-w-0">
                <FooterAgencyLabel className="py-0" tone="light">
                  {OFFICE_HEADLINE[office.id]}
                </FooterAgencyLabel>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-black/45">
                  {OFFICE_TAGLINE[office.id]}
                </p>
              </div>
            </div>
          </div>

          <address className="space-y-5 px-6 py-6 not-italic sm:px-8">
            <div>
              <p className="text-lg font-semibold tracking-tight text-[#1a1a1c]">
                {office.postalCode} {office.city}
              </p>
              <p className="mt-1 text-sm text-black/55">{office.address}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${office.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#ffb43b] px-5 py-2.5 text-sm font-semibold tabular-nums text-[#2a2b2e] shadow-[0_10px_28px_-10px_rgba(255,180,59,0.55)] transition-colors hover:bg-[#1a1a1c] hover:text-white"
              >
                <Phone className="size-4" />
                {office.phone}
              </a>
              {office.secondaryPhone ? (
                <a
                  href={`tel:${office.secondaryPhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f4f4f1] px-4 py-2.5 text-sm font-medium text-black/75 transition-colors hover:border-black/20 hover:bg-[#ecebe8]"
                >
                  <Phone className="size-3.5 text-black/40" />
                  Fixe {office.secondaryPhone}
                </a>
              ) : null}
            </div>
          </address>
        </article>
      ))}

      <div
        className={`${cardClass} flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8`}
      >
        <div className="flex items-center gap-3 text-sm text-black/60">
          <Mail className="size-4 shrink-0 text-[#c88712]" />
          <span>
            Le formulaire prépare un texte à copier ; la prise de contact se fait par téléphone ou
            e-mail.
          </span>
        </div>
        <Link
          href={AGENCY_INFO.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#1a1a1c] transition-colors hover:text-[#c88712]"
        >
          LinkedIn Tech&rsquo;lux
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}