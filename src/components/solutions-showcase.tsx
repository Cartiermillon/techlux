"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DOMAINS, parseKelvin, type DomainSlug } from "@/data/techlux";
import { LightingSceneArt } from "./lighting-scene-art";
import { cn } from "cn";

export function SolutionsShowcase() {
  const [activeSlug, setActiveSlug] =
    React.useState<DomainSlug>("mise-en-lumiere-patrimoine-batiments");

  const active = DOMAINS.find((d) => d.slug === activeSlug) ?? DOMAINS[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <ul className="border-t border-black/15 lg:col-span-7">
        {DOMAINS.map((domain, index) => {
          const isActive = domain.slug === active.slug;
          return (
            <li key={domain.slug} className="border-b border-black/15">
              <button
                type="button"
                onClick={() => setActiveSlug(domain.slug)}
                onMouseEnter={() => setActiveSlug(domain.slug)}
                onFocus={() => setActiveSlug(domain.slug)}
                aria-pressed={isActive}
                className="group flex w-full cursor-pointer items-baseline gap-5 py-5 text-left sm:gap-8 sm:py-6"
              >
                <span className="w-7 text-xs tabular-nums text-black/40">
                  0{index + 1}
                </span>
                <span
                  className={cn(
                    "flex-1 text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-none tracking-[-0.035em] transition-all duration-300",
                    isActive
                      ? "translate-x-2 text-[#0b0b0c]"
                      : "text-black/30 group-hover:text-black/60"
                  )}
                >
                  {domain.title}
                </span>
                <span
                  className={cn(
                    "size-2 rounded-full bg-[#ffb43b] transition-transform duration-300",
                    isActive ? "scale-100" : "scale-0"
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <div className="overflow-hidden">
            <LightingSceneArt
              preset={active.scene}
              kelvin={parseKelvin(active.recommendedKelvin)}
              className="aspect-[4/3] w-full"
            />
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.22em] text-black/45">
              {active.recommendedKelvin}
            </p>
            <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">
              {active.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/60">
              {active.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-black/70">
              {active.norms.map((norm) => (
                <li key={norm} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[#ffb43b]" />
                  {norm}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center justify-between border-t border-black/15 pt-5">
              <p className="text-sm text-black/55">
                {active.partners.join(" · ")}
              </p>
              <Link
                href={`/solutions/${active.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#0b0b0c] hover:text-[#b07612]"
              >
                Découvrir la solution
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
