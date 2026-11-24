"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SpotlightStage } from "@/components/spotlight-stage";

function EquipeHeroLayer({ lit }: { lit: boolean }) {
  const Heading = lit ? "div" : "h1";
  const dim = "text-white/[0.13]";
  const note = lit ? "text-[#ffb43b]" : "text-white/25";

  return (
    <div className="relative mx-auto flex min-h-[78svh] max-w-[1400px] flex-col justify-center px-6 pb-16 pt-[max(4.5rem,10vh)] lg:px-10">
      <span
        className={`absolute left-[8%] top-[16%] hidden text-xs tracking-[0.2em] sm:block ${note}`}
      >
        69 · Pierre-Bénite
      </span>
      <span
        className={`absolute right-[12%] top-[22%] hidden text-xs tracking-[0.2em] md:block ${note}`}
      >
        ARA
      </span>
      <span
        className={`absolute right-[18%] top-[48%] hidden text-xs tracking-[0.2em] lg:block ${note}`}
      >
        Mise en lumière
      </span>

      <p
        className={`flex items-center gap-3 text-xs uppercase tracking-[0.22em] ${
          lit ? "text-white/50" : "text-white/25"
        }`}
      >
        <span className="size-1.5 rounded-full bg-[#ffb43b]" />
        Proximité terrain
      </p>

      <Heading
        className={`font-display mt-6 max-w-[14ch] text-[clamp(2.25rem,7.2vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] ${
          lit ? "text-white" : dim
        }`}
      >
        Notre{" "}
        <span className={lit ? "text-[#ffb43b]" : "text-white/[0.13]"}>
          équipe
        </span>
        <br />
        régionale.
      </Heading>
    </div>
  );
}

export function EquipeSpotlightHero() {
  return (
    <SpotlightStage
      background={{
        src: "/equipe-hero-pierre-benite-eglise.jpg",
        alt: "Vue aérienne de l’église Notre-Dame de l’Assomption à Pierre-Bénite, mise en lumière au crépuscule",
      }}
      base={<EquipeHeroLayer lit={false} />}
      lit={<EquipeHeroLayer lit />}
    >
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-10">
          <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Une chargée ou un chargé d&rsquo;affaires dédié par secteur en
            Auvergne-Rhône-Alpes. Explorez la carte, puis appelez ou écrivez
            directement à votre interlocuteur.
          </p>
          <Link
            href="#carte-territoires"
            className="group inline-flex h-12 shrink-0 items-center gap-2 border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:border-white"
          >
            Voir la carte
            <ArrowDown className="size-4" />
          </Link>
        </div>
      </div>
    </SpotlightStage>
  );
}