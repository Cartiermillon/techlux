"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SpotlightStage } from "@/components/spotlight-stage";

function ContactHeroLayer({ lit }: { lit: boolean }) {
  const Heading = lit ? "div" : "h1";
  const dim = "text-white/[0.13]";
  const note = lit ? "text-[#ffb43b]" : "text-white/25";

  return (
    <div className="relative mx-auto flex min-h-[78svh] max-w-[1400px] flex-col justify-center px-6 pb-16 pt-[max(4.5rem,10vh)] lg:px-10">
      <span
        className={`absolute left-[8%] top-[16%] hidden text-xs tracking-[0.2em] sm:block ${note}`}
      >
        69 · Charbonnières
      </span>
      <span
        className={`absolute right-[12%] top-[22%] hidden text-xs tracking-[0.2em] md:block ${note}`}
      >
        73 · Savoie
      </span>
      <span
        className={`absolute right-[16%] top-[48%] hidden text-xs tracking-[0.2em] lg:block ${note}`}
      >
        Étude lumière
      </span>

      <p
        className={`flex items-center gap-3 text-xs uppercase tracking-[0.22em] ${
          lit ? "text-white/50" : "text-white/25"
        }`}
      >
        <span className="size-1.5 rounded-full bg-[#ffb43b]" />
        Échange &amp; étude
      </p>

      <Heading
        className={`font-display mt-6 max-w-[14ch] text-[clamp(2.25rem,7.2vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] ${
          lit ? "text-white" : dim
        }`}
      >
        Parlons de
        <br />
        votre{" "}
        <span className={lit ? "text-[#ffb43b]" : "text-white/[0.13]"}>
          projet.
        </span>
      </Heading>
    </div>
  );
}

export function ContactSpotlightHero() {
  return (
    <SpotlightStage
      background={{
        src: "/contact-hero-lyon-viricel.png",
        alt: "Mise en lumière nocturne — Lyon 6, rue Viricel",
        kenBurns: true,
      }}
      base={<ContactHeroLayer lit={false} />}
      lit={<ContactHeroLayer lit />}
    >
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-10">
          <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Indiquez le{" "}
            <strong className="font-medium text-white">département</strong> et
            le{" "}
            <strong className="font-medium text-white">
              domaine d&rsquo;éclairage
            </strong>
            . Envoyer le message ouvre votre messagerie, adressée à
            l&rsquo;interlocuteur du département.
          </p>
          <Link
            href="#contact-form"
            className="group inline-flex h-12 shrink-0 items-center gap-2 border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:border-white"
          >
            Remplir le formulaire
            <ArrowDown className="size-4" />
          </Link>
        </div>
      </div>
    </SpotlightStage>
  );
}
