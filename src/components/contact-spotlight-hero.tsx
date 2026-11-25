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
    <div className="relative mx-auto flex min-h-[82svh] max-w-[1400px] flex-col justify-center px-6 pb-16 pt-[max(4.5rem,10vh)] lg:px-10">
      <span
        className={`absolute left-[8%] top-[16%] hidden text-xs tracking-[0.2em] sm:block ${note}`}
      >
        69 · Charbonnières
      </span>
      <Heading
        className={`font-display max-w-[14ch] text-[clamp(2.25rem,7.2vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] ${
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
    <div className="min-h-svh bg-[#050506]">
    <SpotlightStage
      background={{
        src: "/contact-hero-fort-telegraphe.jpg",
        alt: "Mise en lumière du fort — Valloire, fort du Télégraphe",
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
