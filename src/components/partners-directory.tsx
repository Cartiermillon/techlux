"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Globe2, X } from "lucide-react";
import {
  DEPARTMENTS,
  PARTNERS,
  DOMAIN_MAP,
  type DomainSlug,
} from "@/data/techlux";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

export function PartnersDirectory() {
  const [selectedDept, setSelectedDept] = React.useState<string>("all");
  const [selectedDomain, setSelectedDomain] = React.useState<DomainSlug | "all">(
    "all"
  );

  const filtered = React.useMemo(() => {
    return PARTNERS.filter((p) => {
      if (selectedDept !== "all" && !p.departments.includes(selectedDept)) {
        return false;
      }
      if (selectedDomain !== "all" && !p.domains.includes(selectedDomain)) {
        return false;
      }
      return true;
    });
  }, [selectedDept, selectedDomain]);

  const activeDeptInfo = DEPARTMENTS.find((d) => d.code === selectedDept);

  return (
    <div className="space-y-8">
      {/* Interactive Territory Filter */}
      <div className="rounded-none border border-black/10 bg-white p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#b07612]">
              Couverture territoriale
            </p>
            <h2 className="font-heading text-xl font-bold text-[#0c101a] mt-0.5">
              Sélectionnez votre département pour afficher les fabricants représentés
            </h2>
          </div>
          {(selectedDept !== "all" || selectedDomain !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSelectedDept("all");
                setSelectedDomain("all");
              }}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#b07612] hover:underline self-start sm:self-auto cursor-pointer"
            >
              <X className="size-3.5" />
              Tout afficher
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedDept("all")}
            className={cn(
              "rounded-full px-3.5 py-1.5 font-mono text-xs transition-all cursor-pointer",
              selectedDept === "all"
                ? "bg-[#0c101a] text-white"
                : "bg-[#ecece7] text-[#586070] hover:text-[#0c101a]"
            )}
          >
            Tous les départements
          </button>
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDept === dept.code;
            return (
              <button
                key={dept.code}
                type="button"
                onClick={() => setSelectedDept(dept.code)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5",
                  isSelected
                    ? "bg-[#f5b841] text-[#07090f] font-semibold"
                    : "bg-[#ecece7] text-[#586070] hover:bg-black/10 hover:text-[#0c101a]"
                )}
              >
                <span className="font-mono">{dept.code}</span>
                <span>{dept.name}</span>
              </button>
            );
          })}
        </div>

        {activeDeptInfo && (
          <div className="rounded-none bg-[#090c14] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5 text-[#f5b841]" />
              <strong>
                {activeDeptInfo.code} — {activeDeptInfo.name}
              </strong>
              <span className="text-white/50">({activeDeptInfo.region})</span>
            </span>
            <span className="font-mono text-[#f5b841]">
              {filtered.length} fabricant{filtered.length > 1 ? "s" : ""}{" "}
              représenté{filtered.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col justify-between rounded-none border border-black/10 bg-white p-6 transition-all hover:border-black/25 hover:shadow-xl hover:shadow-black/5"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#586070]">
                    <Globe2 className="size-3 text-[#b07612]" />
                    {partner.origin}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-bold tracking-tight text-[#0c101a]">
                    {partner.name}
                  </h3>
                </div>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Site officiel de ${partner.name}`}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 text-[#0c101a] hover:bg-[#0c101a] hover:text-[#f5b841] transition-colors"
                >
                  <ArrowUpRight className="size-4" />
                </a>
              </div>

              <p className="mt-2 text-sm font-semibold text-[#b07612]">
                {partner.specialty}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#586070]">
                {partner.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {partner.domains.map((slug) => (
                  <Badge
                    key={slug}
                    variant="secondary"
                    className="bg-[#ecece7] text-[#0c101a] text-[11px]"
                  >
                    {DOMAIN_MAP[slug].shortTitle}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/8 space-y-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#586070] mb-1.5">
                  Départements couverts par Tech&rsquo;lux
                </p>
                <div className="flex flex-wrap gap-1">
                  {partner.departments.map((d) => (
                    <span
                      key={d}
                      className={cn(
                        "rounded-md px-1.5 py-0.5 font-mono text-[11px]",
                        d === selectedDept
                          ? "bg-[#f5b841] text-[#07090f] font-bold"
                          : "bg-[#ecece7] text-[#586070]"
                      )}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0c101a] hover:text-[#b07612]"
                >
                  Voir le site officiel
                  <ArrowUpRight className="size-3.5" />
                </a>
                <Button
                  render={<Link href="/contact" />}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-[#586070] hover:text-[#0c101a]"
                >
                  Chiffrer un projet
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
