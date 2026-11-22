"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight, PenLine } from "lucide-react";
import { cn } from "cn";
import { TechluxLogo } from "./techlux-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { AGENCY_INFO } from "@/data/techlux";

const NAV_ITEMS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/equipe", label: "Équipe" },
  { href: "/fournisseurs", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const overPhoto = pathname === "/realisations/annecy-parc-sports";

  return (
    <header
      className={cn(
        "z-40 w-full text-white",
        overPhoto
          ? "fixed inset-x-0 top-0 bg-gradient-to-b from-black/40 via-black/15 to-transparent"
          : "sticky top-0 border-b border-white/10 bg-[#050506]/85 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex min-h-0 max-w-[1400px] items-center justify-between px-4 py-0 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="Tech'lux, accueil"
          className="flex h-full max-w-[min(88vw,31rem)] shrink-0 items-center py-0"
        >
          <TechluxLogo variant="light" mark="image" />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              !item.href.includes("#") && pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[15px] tracking-wide transition-colors",
                  isActive
                    ? "text-[#ffb43b]"
                    : "text-white/60 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/etude-lumiere"
            className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-[#ffb43b] px-6 pr-4 text-[15px] font-semibold text-[#050506] shadow-[0_0_0_1px_rgba(255,180,59,0.4)] transition-[transform,box-shadow] hover:shadow-[0_8px_28px_-8px_rgba(255,180,59,0.85)] active:scale-[0.98]"
          >
            <PenLine className="size-4 opacity-80" aria-hidden />
            Demande d&rsquo;étude
            <span className="flex size-8 items-center justify-center rounded-full bg-[#050506]/12 transition-colors group-hover:bg-[#050506]/20">
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Ouvrir le menu"
                  className="text-white hover:bg-white/10 hover:text-white"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm border-white/10 bg-[#050506] text-white"
            >
              <SheetHeader className="border-b border-white/10 pb-4">
                <SheetTitle className="text-left">
                  <TechluxLogo
                    variant="light"
                    mark="image"
                    className="h-[4.35rem] max-w-[min(88vw,14.5rem)]"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-2">
                {NAV_ITEMS.map((item, i) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className="flex items-baseline gap-4 border-b border-white/10 px-4 py-5 text-2xl font-semibold tracking-tight text-white transition-colors hover:text-[#ffb43b]"
                      />
                    }
                  >
                    <span className="text-xs font-normal text-white/35">
                      0{i + 1}
                    </span>
                    {item.label}
                  </SheetClose>
                ))}
              </div>
              <div className="mt-auto space-y-1 border-t border-white/10 p-6 text-sm text-white/65">
                <p>Lyon · {AGENCY_INFO.offices[0].phone}</p>
                <p>Jacob-Bellecombette · {AGENCY_INFO.offices[1].phone}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
