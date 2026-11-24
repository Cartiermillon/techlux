import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
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

const LYON_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=33+route+de+Paris%2C+69260+Charbonni%C3%A8res-les-Bains";

const cardClass =
  "overflow-hidden rounded-3xl border border-white/10 bg-[#2a2b2e] shadow-[0_28px_72px_-32px_rgba(0,0,0,0.35)]";

export function ContactOfficesPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="px-1">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/45">
          <span className="size-1.5 rounded-full bg-[#ffb43b]" />
          Nos implantations
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/60">
          Deux équipes sur le terrain. Appelez l&rsquo;agence la plus proche du
          département choisi dans le formulaire.
        </p>
      </div>

      {AGENCY_INFO.offices.map((office) => (
        <article key={office.id} className={cardClass}>
          <div className="border-b border-white/10 px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <FooterAgencyLabel className="py-0" tone="dark">
                  {OFFICE_HEADLINE[office.id]}
                </FooterAgencyLabel>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/60">
                  {OFFICE_TAGLINE[office.id]}
                </p>
              </div>
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
                className="h-[3.25rem] w-auto shrink-0 object-contain"
              />
            </div>
          </div>

          <address className="space-y-5 px-6 py-6 text-white/85 not-italic sm:px-8">
            <div>
              <p className="text-lg font-semibold tracking-tight text-white/95">
                {office.postalCode} {office.city}
              </p>
              <p className="mt-1 text-sm text-white/70">{office.address}</p>
              {office.id === "siege" ? (
                <a
                  href={LYON_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition-colors hover:text-[#ffb43b]"
                >
                  <MapPin className="size-3.5" />
                  Voir sur Google Maps
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${office.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#ffb43b] px-5 py-2.5 text-sm font-semibold tabular-nums text-[#2a2b2e] shadow-[0_10px_28px_-10px_rgba(255,180,59,0.55)] transition-colors hover:bg-white"
              >
                <Phone className="size-4" />
                {office.phone}
              </a>
            </div>
          </address>
        </article>
      ))}

      <div className={`${cardClass} flex justify-end px-6 py-5 sm:px-8`}>
        <Link
          href={AGENCY_INFO.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-[#ffb43b]"
        >
          LinkedIn Tech&rsquo;lux
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}