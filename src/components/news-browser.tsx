"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { NEWS_ITEMS, DOMAIN_MAP, type NewsItem } from "@/data/techlux";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "cn";

interface NewsBrowserProps {
  initialArticleId?: string;
}

export function NewsBrowser({ initialArticleId }: NewsBrowserProps) {
  const [selectedPartner, setSelectedPartner] = React.useState<string>("all");
  const [activeArticle, setActiveArticle] = React.useState<NewsItem | null>(
    () => NEWS_ITEMS.find((n) => n.id === initialArticleId) ?? null
  );

  const partnersList = React.useMemo(() => {
    return Array.from(new Set(NEWS_ITEMS.map((n) => n.partner)));
  }, []);

  const filtered = React.useMemo(() => {
    if (selectedPartner === "all") return NEWS_ITEMS;
    return NEWS_ITEMS.filter((n) => n.partner === selectedPartner);
  }, [selectedPartner]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedPartner("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer",
            selectedPartner === "all"
              ? "bg-[#0c101a] text-white"
              : "bg-white border border-black/10 text-[#586070] hover:text-[#0c101a]"
          )}
        >
          Toutes les nouveautés ({NEWS_ITEMS.length})
        </button>
        {partnersList.map((partner) => (
          <button
            key={partner}
            type="button"
            onClick={() => setSelectedPartner(partner)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer",
              selectedPartner === partner
                ? "bg-[#f5b841] text-[#07090f] font-semibold"
                : "bg-white border border-black/10 text-[#586070] hover:text-[#0c101a]"
            )}
          >
            {partner}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveArticle(item)}
            className="group text-left rounded-none border border-black/10 bg-white p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/6 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <Badge className="bg-[#0c101a] text-[#f5b841] font-mono text-[11px]">
                  {item.partner}
                </Badge>
                <span className="font-mono text-[11px] text-[#586070]">
                  {item.dateLabel}
                </span>
              </div>

              <h3 className="mt-4 font-heading text-xl font-bold tracking-tight text-[#0c101a] group-hover:text-[#b07612] transition-colors">
                {item.title}
              </h3>

              <p className="mt-1 text-xs font-medium text-[#b07612]">
                {item.category} · {DOMAIN_MAP[item.domain].shortTitle}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#586070]">
                {item.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.specs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full bg-[#ecece7] px-2.5 py-1 font-mono text-[11px] text-[#0c101a]"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/8 flex items-center justify-between text-xs font-semibold text-[#0c101a]">
              <span className="inline-flex items-center gap-1.5 text-[#586070] font-normal">
                <Sparkles className="size-3.5 text-[#b07612]" />
                Fiche technique
              </span>
              <span className="inline-flex items-center gap-1 group-hover:text-[#b07612]">
                Lire <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <Dialog
        open={Boolean(activeArticle)}
        onOpenChange={(open) => {
          if (!open) setActiveArticle(null);
        }}
      >
        <DialogContent className="sm:max-w-lg bg-[#090c14] text-white border-white/15">
          {activeArticle && (
            <div className="space-y-5">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-[#f5b841] text-[#07090f] font-mono text-xs">
                    {activeArticle.partner}
                  </Badge>
                  <span className="font-mono text-xs text-white/55">
                    {activeArticle.dateLabel}
                  </span>
                </div>
                <DialogTitle className="font-heading text-2xl font-bold text-white">
                  {activeArticle.title}
                </DialogTitle>
                <DialogDescription className="text-white/65">
                  {activeArticle.category} — {DOMAIN_MAP[activeArticle.domain].title}
                </DialogDescription>
              </DialogHeader>

              <p className="text-sm leading-relaxed text-white/80">
                {activeArticle.summary}
              </p>

              <div className="rounded-none border border-white/10 bg-white/[0.04] p-4 space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  Caractéristiques principales
                </p>
                <ul className="space-y-1.5 text-xs text-white/85">
                  {activeArticle.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-[#f5b841]" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <Link
                  href="/fournisseurs"
                  className="text-xs text-white/70 hover:text-white underline underline-offset-4"
                >
                  Voir le fabricant {activeArticle.partner}
                </Link>
                <Button
                  render={<Link href="/contact" />}
                  className="rounded-full bg-[#f5b841] text-[#07090f] hover:bg-[#f7c560] font-semibold text-xs h-9 px-4"
                >
                  Demander la documentation
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
