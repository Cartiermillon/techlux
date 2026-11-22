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

  const scrollScreensPerFamily = 155;

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
      style={{ height: `${audiences.length * scrollScreensPerFamily}svh` }}
      aria-label="Familles d'interlocuteurs"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-6 pb-16 pt-24 lg:px-10 lg:pt-28">
          <p className="text-left text-xs tabular-nums tracking-[0.18em] text-black/40">
            {audiences[active].index}
            <span className="text-black/25">
              {" "}
              / {audiences.length.toString().padStart(2, "0")}
            </span>
          </p>

          <div className="relative mt-4 flex min-h-0 flex-1 items-center">
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
                offset < -1.35 || offset > 1.35
                  ? 0
                  : offset < 0
                    ? Math.pow(exit, 1.15)
                    : Math.pow(enter, 1.15);

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
                  <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
                    <div className="lg:col-span-6 xl:col-span-7">
                      <h3 className="text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
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
                    <div className="max-lg:border-t max-lg:border-black max-lg:pt-10 lg:col-span-4 lg:col-start-9 lg:justify-self-end lg:border-l lg:border-black lg:pl-8 xl:col-span-3 xl:col-start-10 xl:pl-10">
                      <div className="max-w-[15.5rem] lg:ml-auto">
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
          className="group grid gap-6 border-b border-black/20 py-14 lg:grid-cols-12 lg:gap-10 lg:px-6 lg:py-20"
        >
          <div className="lg:col-span-5">
            <p className="text-xs tabular-nums text-black/40">{audience.index}</p>
            <h3 className="mt-2 text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-none tracking-[-0.045em]">
              {audience.title}
            </h3>
            <p className="mt-4 text-xl font-medium tracking-tight">{audience.claim}</p>
          </div>
          <div className="border-t border-black pt-6 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="max-w-[15.5rem] lg:ml-auto">
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