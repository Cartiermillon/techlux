"use client";

import Image from "next/image";
import React from "react";

const SLIDES = [
  {
    src: "/realisations/annecy-parc-sports-gallery-01.jpg",
    alt: "Mâts et projecteurs LED au crépuscule — tribunes du Parc des Sports d'Annecy",
    caption: "Tribunes & projecteurs",
  },
  {
    src: "/realisations/annecy-parc-sports-gallery-02.jpg",
    alt: "Mât PETITJEAN 34 m et nappe LED Siteco — vue verticale au crépuscule",
    caption: "Mât grande hauteur",
  },
  {
    src: "/realisations/annecy-parc-sports-gallery-03.jpg",
    alt: "Vue aérienne du plateau sportif et console d'éclairage LED",
    caption: "Console photométrique",
  },
] as const;

export function AnnecyParcSportsGallery() {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - childCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section
      aria-label="Galerie du chantier"
      className="relative overflow-hidden border-t border-black/[0.06] bg-[#ebece8] py-16 sm:py-20"
    >
      <div className="mx-auto mb-10 max-w-[1400px] px-6 lg:mb-12 lg:px-10">
        <p className="text-xs uppercase tracking-[0.26em] text-black/45">Sur le terrain</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-2xl text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold tracking-[-0.035em]">
            Le plateau vu{" "}
            <span className="text-black/45">depuis les mâts.</span>
          </h2>
          <p className="text-sm text-black/45">Faites défiler →</p>
        </div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-12 bg-gradient-to-r from-[#ebece8] to-transparent sm:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 bg-gradient-to-l from-[#ebece8] to-transparent sm:w-24"
          aria-hidden
        />

        <div
          ref={scrollerRef}
          className="annecy-gallery-scroller flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-min(100vw,1400px))/2+1.5rem))] pb-2 pt-1 sm:gap-7"
        >
          {SLIDES.map((slide, i) => (
            <figure
              key={slide.src}
              className="group relative shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-[#f4f4f1] shadow-[0_28px_80px_-40px_rgba(20,30,40,0.35)] sm:rounded-[2rem]"
              style={{
                width: "min(92vw, 720px)",
                height: "min(78vh, 920px)",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 92vw, 720px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                priority={i === 0}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent px-6 pb-6 pt-16">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/75">
                  {String(i + 1).padStart(2, "0")} · {slide.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1400px] items-center justify-center gap-2 px-6 lg:px-10">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => scrollTo(i)}
            className="relative h-2.5 rounded-full transition-all duration-300"
            style={{ width: active === i ? "2.5rem" : "0.5rem" }}
            aria-label={`Voir ${slide.caption}`}
            aria-current={active === i}
          >
            <span
              className={`absolute inset-0 rounded-full ${
                active === i ? "bg-[#1a1a1c]" : "bg-black/20 hover:bg-black/35"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}