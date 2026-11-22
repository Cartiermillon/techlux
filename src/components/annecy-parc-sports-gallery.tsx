"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const SLIDES = [
  {
    src: "/realisations/annecy-parc-sports-gallery-01.jpg",
    alt: "Mât PETITJEAN et projecteurs LED au crépuscule, Parc des Sports d'Annecy",
    caption: "Mât & nappes LED",
    orientation: "portrait",
  },
  {
    src: "/realisations/annecy-parc-sports-gallery-02.jpg",
    alt: "Console d'éclairage LED au-dessus de la piste et du terrain",
    caption: "Plateau sportif",
    orientation: "landscape",
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
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[min(92vh,980px)] w-full overflow-hidden bg-[#1c2428]">
        {SLIDES.map((slide, i) => {
          const visible = i === active;
          return (
            <figure
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                visible ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
              aria-hidden={!visible}
            >
              {slide.orientation === "portrait" ? (
                <>
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    sizes="100vw"
                    className="scale-110 object-cover blur-3xl brightness-75 saturate-125"
                    aria-hidden
                  />
                  <div className="absolute inset-y-0 left-1/2 h-full w-[min(72vh,540px)] -translate-x-1/2">
                    <Image
                      src={slide.src}
                      alt={visible ? slide.alt : ""}
                      fill
                      sizes="540px"
                      className="object-cover object-center"
                      priority={i === 0}
                    />
                  </div>
                </>
              ) : (
                <Image
                  src={slide.src}
                  alt={visible ? slide.alt : ""}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority={i === 0}
                />
              )}
            </figure>
          );
        })}

        <button
          type="button"
          onClick={() => go(active - 1)}
          className="absolute left-4 top-1/2 z-[2] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1a1a1c] backdrop-blur-md transition-colors hover:bg-white sm:left-6"
          aria-label="Photo précédente"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          className="absolute right-4 top-1/2 z-[2] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1a1a1c] backdrop-blur-md transition-colors hover:bg-white sm:right-6"
          aria-label="Photo suivante"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute inset-x-0 bottom-5 z-[2] flex items-center justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
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
