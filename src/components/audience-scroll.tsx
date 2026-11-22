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

/** ~150svh en zone « pause » ≈ 1,5 s de défilement à ~100vh/s avant la transition */
const SCROLL_SVH_PER_FAMILY = 260;
const HOLD_FRACTION = 150 / SCROLL_SVH_PER_FAMILY;

function smoothstep(t: number) {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}

function scrollRawToAudienceProgress(raw: number) {
  const base = Math.floor(raw);
  const frac = raw - base;
  if (frac <= HOLD_FRACTION) return base;
  const t = (frac - HOLD_FRACTION) / (1 - HOLD_FRACTION);
  return base + smoothstep(t);
}

export function AudiencePartnerIntro() {
  return (
    <section
      aria-labelledby="pour-qui-accroche"
      className="scroll-mt-16 border-b border-black/[0.08] bg-[#f4f4f1] px-6 py-16 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50 lg:col-span-4">
            <span className="size-1.5 rounded-full bg-[#ffb43b]" />
            Pour qui
          </p>
          <h2
            id="pour-qui-accroche"
            className="text-left text-[clamp(2.35rem,6.5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] lg:col-span-8"
          >
          Un partenaire de ceux qui{" "}
          <span className="text-black/35">
            conçoivent, prescrivent et dessinent
          </span>{" "}
          le paysage nocturne.
          </h2>
        </div>
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
      const raw = scrolled / step;
      setProgress(scrollRawToAudienceProgress(raw));
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
      style={{ height: `${audiences.length * SCROLL_SVH_PER_FAMILY}svh` }}
      aria-label="Familles d'interlocuteurs"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-6 pb-16 pt-24 lg:px-10 lg:pt-28">
          <div className="relative flex min-h-0 flex-1 items-center">
            {audiences.map((audience, index) => {
              const offset = index - progress;
              const enter = Math.min(Math.max(1 - offset, 0), 1);
              const exit = Math.min(Math.max(1 + offset, 0), 1);
              const y =
                offset > 0
                  ? 14 + (1 - smoothstep(enter)) * 48
                  : offset < 0
                    ? -10 - (1 - smoothstep(exit)) * 28
                    : 0;
              const opacity =
                offset < -1.15 || offset > 1.15
                  ? 0
                  : offset < 0
                    ? Math.pow(smoothstep(exit), 2)
                    : Math.pow(smoothstep(enter), 2);

              return (
                <article
                  key={audience.index}
                  className="absolute inset-x-0 w-full text-left will-change-transform"
                  style={{
                    transform: `translate3d(0, ${y}%, 0)`,
                    opacity,
                    pointerEvents:
                      Math.abs(offset) < 0.45 && opacity > 0.6 ? "auto" : "none",
                    zIndex: Math.round(100 - Math.abs(offset) * 10),
                  }}
                  aria-hidden={Math.abs(offset) > 0.5}
                >
                  <div className="mx-auto grid w-full max-w-[1080px] gap-10 lg:grid-cols-2 lg:items-start lg:gap-0">
                    <div className="min-w-0 lg:pr-[200px]">
                      <p className="text-sm tabular-nums tracking-[0.24em] text-black/45 sm:text-base">
                        {audience.index}
                      </p>
                      <h3 className="mt-3 text-[clamp(2.75rem,8vw,5.75rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
                        {audience.title}
                      </h3>
                      <p className="mt-8 max-w-lg text-[clamp(1.2rem,2.1vw,1.65rem)] font-medium leading-snug tracking-[-0.02em]">
                        {audience.claim}
                      </p>
                      <Link
                        href={audience.href}
                        className="group mt-12 inline-flex items-center gap-2 text-sm font-medium hover:text-[#b07612]"
                      >
                        {audience.cta}
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                    <div className="max-lg:border-t-2 max-lg:border-black max-lg:pt-10 lg:border-l-2 lg:border-black lg:pl-8">
                      <div className="max-w-[15.5rem]">
                        <p className="text-sm leading-relaxed text-black/58">
                          {audience.text}
                        </p>
                        <ul className="mt-6 space-y-1.5 text-[13px] text-black/70">
                          {audience.tags.map((tag) => (
                            <li key={tag} className="flex gap-2.5">
                              <span
                                className="shrink-0 text-black/35"
                                aria-hidden
                              >
                                —
                              </span>
                              <span>{tag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
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
          className="group mx-auto grid max-w-[1080px] gap-6 border-b border-black/20 py-14 lg:grid-cols-2 lg:gap-0 lg:px-6 lg:py-20"
        >
          <div className="lg:pr-[200px]">
            <p className="text-sm tabular-nums tracking-[0.24em] text-black/45 sm:text-base">
              {audience.index}
            </p>
            <h3 className="mt-2 text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-none tracking-[-0.045em]">
              {audience.title}
            </h3>
            <p className="mt-4 text-xl font-medium tracking-tight">{audience.claim}</p>
          </div>
          <div className="border-t-2 border-black pt-6 lg:border-l-2 lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="max-w-[15.5rem]">
            <p className="text-sm leading-relaxed text-black/58">
              {audience.text}
            </p>
            <ul className="mt-4 space-y-1.5 text-[13px] text-black/70">
              {audience.tags.map((tag) => (
                <li key={tag} className="flex gap-3">
                  <span className="text-black/35" aria-hidden>
                    —
                  </span>
                  {tag}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-block text-sm font-medium text-black/70">
              {audience.cta}
            </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}