"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type Audience = {
  index: string;
  title: string;
  claim: string;
  text: string;
  tags: string[];
  href: string;
  cta: string;
};

export function AudiencePartnerIntro() {
  return (
    <section
      aria-labelledby="pour-qui-accroche"
      className="scroll-mt-16 border-b border-black/[0.08] bg-[#f4f4f1] px-6 py-16 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] text-center">
        <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50">
          <span className="size-1.5 rounded-full bg-[#ffb43b]" />
          Pour qui
        </p>
        <h2
          id="pour-qui-accroche"
          className="mx-auto mt-6 max-w-5xl text-[clamp(2.35rem,6.5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
        >
          Un partenaire de ceux qui{" "}
          <span className="text-black/35">
            conçoivent, prescrivent et dessinent
          </span>{" "}
          le paysage nocturne.
        </h2>
      </div>
    </section>
  );
}

export function AudienceScroll({ audiences }: { audiences: Audience[] }) {
  const trackRef = React.useRef<HTMLElement>(null);
  const [progress, setProgress] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  React.useEffect(() => {
    if (reduceMotion) return;
    const el = trackRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      const max = Math.max(el.offsetHeight - view, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), max);
      const step = max / audiences.length;
      setProgress(scrolled / step);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [audiences.length, reduceMotion]);

  const active = Math.min(
    audiences.length - 1,
    Math.max(0, Math.floor(progress))
  );

  const goTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const view = window.innerHeight;
    const max = Math.max(el.offsetHeight - view, 1);
    const step = max / audiences.length;
    const top =
      window.scrollY + el.getBoundingClientRect().top + step * index + 4;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  if (reduceMotion) {
    return (
      <section id="pour-qui-familles" className="bg-[#f4f4f1] pb-24 pt-8">
        <AudienceList audiences={audiences} />
      </section>
    );
  }

  return (
    <section
      id="pour-qui-familles"
      ref={trackRef}
      className="relative bg-[#f4f4f1]"
      style={{ height: `${audiences.length * 100}svh` }}
      aria-label="Familles d'interlocuteurs"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-[920px] flex-col px-6 pb-8 pt-24 lg:px-10 lg:pt-28">
          <p className="text-center text-xs tabular-nums tracking-[0.18em] text-black/40">
            {audiences[active].index}
            <span className="text-black/25">
              {" "}
              / {audiences.length.toString().padStart(2, "0")}
            </span>
          </p>

          <div className="relative mt-4 flex min-h-0 flex-1 items-center justify-center">
            {audiences.map((audience, index) => {
              const offset = index - progress;
              const enter = Math.min(Math.max(1 - offset, 0), 1);
              const exit = Math.min(Math.max(1 + offset, 0), 1);
              const y =
                offset > 0
                  ? 28 + (1 - enter) * 72
                  : offset < 0
                    ? -18 - (1 - exit) * 42
                    : 0;
              const opacity =
                offset < -1.05 || offset > 1.15
                  ? 0
                  : offset < 0
                    ? exit
                    : enter;

              return (
                <article
                  key={audience.index}
                  className="absolute inset-x-0 flex flex-col items-center text-center will-change-transform"
                  style={{
                    transform: `translate3d(0, ${y}%, 0)`,
                    opacity,
                    pointerEvents:
                      Math.abs(offset) < 0.45 && opacity > 0.6 ? "auto" : "none",
                    zIndex: Math.round(100 - Math.abs(offset) * 10),
                  }}
                  aria-hidden={Math.abs(offset) > 0.5}
                >
                  <h3 className="text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
                    {audience.title}
                  </h3>
                  <p className="mx-auto mt-6 max-w-xl text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug tracking-[-0.02em]">
                    {audience.claim}
                  </p>
                  <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-black/60 sm:text-lg">
                    {audience.text}
                  </p>
                  <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-black/70">
                    {audience.tags.map((tag) => (
                      <li key={tag} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-[#ffb43b]" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={audience.href}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-[#b07612]"
                  >
                    {audience.cta}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              );
            })}
          </div>

          <nav
            aria-label="Familles"
            className="mt-auto grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {audiences.map((audience, index) => {
              const selected = index === active;
              return (
                <button
                  key={audience.index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={selected ? "true" : undefined}
                  className={`border-t py-3 text-center text-sm transition-colors ${
                    selected
                      ? "border-[#050506] font-medium text-[#050506]"
                      : "border-black/15 text-black/40 hover:text-black/70"
                  }`}
                >
                  <span className="mr-1.5 text-[10px] tabular-nums tracking-[0.16em]">
                    {audience.index}
                  </span>
                  {audience.title}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}

function AudienceList({ audiences }: { audiences: Audience[] }) {
  return (
    <div className="mx-auto max-w-[1400px] border-t border-black/20 px-6 lg:px-10">
      {audiences.map((audience) => (
        <Link
          key={audience.index}
          href={audience.href}
          className="group grid gap-6 border-b border-black/20 py-10 lg:grid-cols-12 lg:gap-10 lg:px-6 lg:py-14"
        >
          <div className="flex items-baseline justify-center gap-5 lg:col-span-5 lg:justify-start">
            <span className="text-xs tabular-nums text-black/40">
              {audience.index}
            </span>
            <h3 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-none tracking-[-0.045em]">
              {audience.title}
            </h3>
          </div>
          <div className="text-center lg:col-span-5 lg:text-left">
            <p className="text-xl font-medium tracking-tight">{audience.claim}</p>
            <p className="mt-3 text-sm leading-relaxed text-black/60 sm:text-base">
              {audience.text}
            </p>
          </div>
          <span className="text-sm font-medium text-black/70 lg:col-span-2 lg:text-right">
            {audience.cta}
          </span>
        </Link>
      ))}
    </div>
  );
}