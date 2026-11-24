import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { AGENCY_INFO } from "@/data/techlux";
import { FooterAgencyLabel } from "@/components/footer-agency-label";

const OFFICE_HEADLINE: Record<string, string> = {
  siege: "Siège · Lyon",
  agence: "Agence · Chambéry",
};

const LYON_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=33+route+de+Paris%2C+69260+Charbonni%C3%A8res-les-Bains";

const cardClass = "contact-agency-white overflow-hidden rounded-3xl";

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
          <div className="border-b border-white/10 bg-[#2a2b2e] px-6 py-5 text-white sm:px-8">
            <FooterAgencyLabel className="py-0 uppercase" tone="dark">
              {OFFICE_HEADLINE[office.id]}
            </FooterAgencyLabel>
          </div>

          <address className="bg-white px-6 py-6 not-italic sm:px-8">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0 flex-1 space-y-5">
                <div>
                  <p className="text-lg font-semibold tracking-tight text-[#1a1a1c]">
                    {office.postalCode} {office.city}
                  </p>
                  <p className="mt-1 text-sm text-black/55">{office.address}</p>
                  {office.id === "siege" ? (
                    <a
                      href={LYON_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#b07612] transition-colors hover:text-[#1a1a1c]"
                    >
                      <MapPin className="size-3.5" />
                      Voir sur Google Maps
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : null}
                </div>

                {office.id === "siege" ? (
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${office.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#ffb43b] px-5 py-2.5 text-sm font-semibold tabular-nums text-[#2a2b2e] shadow-[0_10px_28px_-10px_rgba(255,180,59,0.55)] transition-colors hover:bg-[#1a1a1c] hover:text-white"
                    >
                      <Phone className="size-4" />
                      {office.phone}
                    </a>
                  </div>
                ) : null}
              </div>

              <div className="flex w-[5.5rem] shrink-0 justify-end sm:w-[6.25rem]">
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
                  width={80}
                  height={96}
                  className="h-[5.75rem] w-auto max-w-full object-contain object-right sm:h-[6.75rem]"
                />
              </div>
            </div>
          </address>
        </article>
      ))}

      <div
        className={`${cardClass} flex justify-end bg-white px-6 py-5 sm:px-8`}
      >
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