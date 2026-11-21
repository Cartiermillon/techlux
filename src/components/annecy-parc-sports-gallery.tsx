"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const SLIDES = [
  {
    src: "/realisations/annecy-parc-sports-gallery-01.jpg",
    alt: "Mât PETITJEAN et projecteurs LED au crépuscule, Parc des Sports d'Annecy",
    caption: "Mât & nappes LED",
  },
  {
    src: "/realisations/annecy-parc-sports-gallery-02.jpg",
    alt: "Console d'éclairage LED au-dessus de la piste et du terrain",
    caption: "Plateau sportif",
  },
] as const;

export function AnnecyParcSportsGallery() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = SLIDES.length;

  React.useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const go = (index: number) => {
    setActive((index + count) % count);
  };

  return (
    <section
      aria-label="Galerie du chantier"
      aria-roledescription="carousel"
      className="border-t border-black/[0.06] bg-[#ebece8] py-16 sm:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto mb-8 flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-6 lg:mb-10 lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-black/45">Sur le terrain</p>
          <h2 className="mt-3 text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold tracking-[-0.035em]">
            Le plateau vu{" "}
            <span className="text-black/45">depuis les mâts.</span>
          </h2>
        </div>
        <p className="text-sm tabular-nums text-black/45">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-[#e7e8e4] shadow-[0_36px_90px_-48px_rgba(20,30,40,0.4)] sm:rounded-[2rem]">
          <div className="relative h-[min(86vh,920px)]">
            {SLIDES.map((slide, i) => (
              <figure
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  i === active ? "z-[1] opacity-100" : "z-0 opacity-0"
                }`}
                aria-hidden={i !== active}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-contain"
                  priority={i === 0}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#ebece8] via-[#ebece8]/80 to-transparent px-6 pb-6 pt-16 sm:px-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-black/55">
                    {slide.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(active - 1)}
            className="absolute left-3 top-1/2 z-[2] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#1a1a1c] shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:left-5"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            className="absolute right-3 top-1/2 z-[2] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#1a1a1c] shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:right-5"
            aria-label="Photo suivante"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "w-10 bg-[#1a1a1c]" : "w-2.5 bg-black/20 hover:bg-black/35"
              }`}
              aria-label={`Afficher ${slide.caption}`}
              aria-current={i === active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
