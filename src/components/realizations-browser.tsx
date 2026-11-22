"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowUpRight, MapPin, X } from "lucide-react";
import {
  DOMAINS,
  REALIZATIONS,
  DOMAIN_MAP,
  parseKelvin,
  type DomainSlug,
} from "@/data/techlux";
import { getRealizationCover } from "@/data/realization-pages";
import { LightingSceneArt } from "./lighting-scene-art";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

interface RealizationsBrowserProps {
  initialDomain?: string;
}

export function RealizationsBrowser({
  initialDomain,
}: RealizationsBrowserProps) {
  const validInitialDomain = DOMAINS.some((d) => d.slug === initialDomain)
    ? (initialDomain as DomainSlug)
    : "all";

  const [selectedDomain, setSelectedDomain] = React.useState<DomainSlug | "all">(
    validInitialDomain
  );
  const [selectedDept, setSelectedDept] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");

  const availableDepts = React.useMemo(() => {
    const set = new Set(REALIZATIONS.map((r) => r.department));
    return Array.from(set).sort();
  }, []);

  const filtered = React.useMemo(() => {
    return REALIZATIONS.filter((r) => {
      if (selectedDomain !== "all" && !r.domains.includes(selectedDomain)) {
        return false;
      }
      if (selectedDept !== "all" && r.department !== selectedDept) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${r.city} ${r.department} ${r.title} ${r.subtitle ?? ""} ${r.partners.join(" ")} ${r.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [selectedDomain, selectedDept, query]);

  const resetFilters = () => {
    setSelectedDomain("all");
    setSelectedDept("all");
    setQuery("");
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="rounded-none border border-black/10 bg-white p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#586070]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une ville, un projet, un fabricant (ex: Meyer, Lyon)..."
              className="pl-10 h-10 rounded-full bg-[#ecece7] border-black/10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#586070] mr-1">
              <SlidersHorizontal className="size-3.5" />
              Département :
            </span>
            <button
              type="button"
              onClick={() => setSelectedDept("all")}
              className={cn(
                "rounded-full px-3 py-1 font-mono text-xs transition-colors cursor-pointer",
                selectedDept === "all"
                  ? "bg-[#0c101a] text-white"
                  : "bg-[#ecece7] text-[#586070] hover:text-[#0c101a]"
              )}
            >
              Tous
            </button>
            {availableDepts.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-xs transition-colors cursor-pointer",
                  selectedDept === dept
                    ? "bg-[#f5b841] text-[#07090f] font-semibold"
                    : "bg-[#ecece7] text-[#586070] hover:text-[#0c101a]"
                )}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Domain pills */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-black/8">
          <button
            type="button"
            onClick={() => setSelectedDomain("all")}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
              selectedDomain === "all"
                ? "bg-[#0c101a] text-white"
                : "bg-[#ecece7] text-[#586070] hover:bg-black/10 hover:text-[#0c101a]"
            )}
          >
            Toutes ({REALIZATIONS.length})
          </button>
          {DOMAINS.map((domain) => {
            const count = REALIZATIONS.filter((r) =>
              r.domains.includes(domain.slug)
            ).length;
            const active = selectedDomain === domain.slug;
            return (
              <button
                key={domain.slug}
                type="button"
                onClick={() => setSelectedDomain(domain.slug)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
                  active
                    ? "bg-[#0c101a] text-[#f5b841]"
                    : "bg-[#ecece7] text-[#586070] hover:bg-black/10 hover:text-[#0c101a]"
                )}
              >
                {domain.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-[#586070]">
        <p>
          <strong className="text-[#0c101a]">{filtered.length}</strong>{" "}
          réalisation{filtered.length > 1 ? "s" : ""} affichée
          {filtered.length > 1 ? "s" : ""}
        </p>
        {(selectedDomain !== "all" || selectedDept !== "all" || query) && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#b07612] hover:underline cursor-pointer"
          >
            <X className="size-3.5" />
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-none border border-dashed border-black/15 bg-white p-12 text-center space-y-3">
          <p className="font-heading text-lg font-semibold">
            Aucune réalisation ne correspond à ces critères
          </p>
          <p className="text-sm text-[#586070]">
            Essayez de modifier le domaine d&rsquo;éclairage ou le département
            sélectionné.
          </p>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="rounded-full mt-2"
          >
            Voir toutes les réalisations
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const cover = getRealizationCover(project.id);
            return (
            <Link
              key={project.id}
              href={`/realisations/${project.id}`}
              className="group text-left flex flex-col overflow-hidden rounded-none border border-black/10 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8"
            >
              <div className="relative w-full overflow-hidden">
                {cover ? (
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <LightingSceneArt
                    preset={project.scene}
                    kelvin={parseKelvin(project.kelvin)}
                    className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/55 bg-white/72 px-2.5 py-1 font-mono text-[11px] text-[#1a1a1c] shadow-[0_10px_28px_-16px_rgba(0,0,0,0.45)] backdrop-blur-md">
                    <MapPin className="size-3 text-[#c88712]" />
                    {project.city} ({project.department})
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-[#f5b841] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#07090f]">
                    {project.kelvin}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 w-full">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.domains.map((slug) => (
                      <Badge
                        key={slug}
                        variant="secondary"
                        className="bg-[#ecece7] text-[#0c101a] text-[11px] font-medium"
                      >
                        {DOMAIN_MAP[slug].shortTitle}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-[#0c101a] group-hover:text-[#b07612] transition-colors">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="mt-0.5 text-xs font-medium text-[#586070]">
                      {project.subtitle}
                    </p>
                  )}
                  <p className="mt-2.5 text-sm text-[#586070] leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-black/8 flex items-center justify-between text-xs w-full">
                  <span className="font-mono text-[#586070]">
                    {project.partners.join(" · ")}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0c101a] group-hover:text-[#b07612]">
                    Fiche projet <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
          })}
        </div>
      )}
    </div>
  );
}
