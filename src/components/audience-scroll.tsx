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

export function AudienceScroll({ audiences }: { audiences: Audience[] }) {
  const trackRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);
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
      const next = Math.min(
        audiences.length - 1,
        Math.floor(scrolled / step)
      );
      setActive((current) => (current === next ? current : next));
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
      <section id="pour-qui" className="scroll-mt-16 bg-[#f4f4f1] py-24 sm:py-32">
        <AudienceIntro />
        <AudienceList audiences={audiences} />
      </section>
    );
  }

  const current = audiences[active];

  return (
    <section
      id="pour-qui"
      ref={trackRef}
      className="relative bg-[#f4f4f1]"
      style={{ height: `${(audiences.length + 1) * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 pb-8 pt-28 lg:px-10 lg:pt-32">
          <div className="flex items-end justify-between gap-6">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50">
              <span className="size-1.5 rounded-full bg-[#ffb43b]" />
              Pour qui
            </p>
            <p className="text-xs tabular-nums tracking-[0.18em] text-black/40">
              {current.index}
              <span className="text-black/25"> / {audiences.length.toString().padStart(2, "0")}</span>
            </p>
          </div>

          <div
            key={current.index}
            className="audience-panel-in flex flex-1 flex-col justify-center"
            aria-live="polite"
          >
            <h2 className="max-w-[12ch] text-[clamp(3.4rem,11vw,9rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
              {current.title}
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="max-w-xl text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-snug tracking-[-0.03em]">
                  {current.claim}
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-black/60 sm:text-lg">
                  {current.text}
                </p>
              </div>
              <div className="lg:col-span-5 lg:justify-self-end">
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-black/70">
                  {current.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-[#ffb43b]" />
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link
                  href={current.href}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-[#b07612]"
                >
                  {current.cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

          <nav aria-label="Familles" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {audiences.map((audience, index) => {
              const selected = index === active;
              return (
                <button
                  key={audience.index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={selected ? "true" : undefined}
                  className={`border-t py-3 text-left text-sm transition-colors ${
                    selected
                      ? "border-[#050506] font-medium text-[#050506]"
                      : "border-black/15 text-black/40 hover:text-black/70"
                  }`}
                >
                  <span className="mr-2 text-[10px] tabular-nums tracking-[0.16em]">
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

function AudienceIntro() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-12">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50 lg:col-span-4">
          <span className="size-1.5 rounded-full bg-[#ffb43b]" />
          Pour qui
        </p>
        <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] lg:col-span-8">
          Un partenaire de ceux qui{" "}
          <span className="text-black/35">conçoivent, prescrivent et dessinent</span>{" "}
          le paysage nocturne.
        </h2>
      </div>
    </div>
  );
}

function AudienceList({ audiences }: { audiences: Audience[] }) {
  return (
    <div className="mx-auto mt-16 max-w-[1400px] border-t border-black/20 px-6 lg:px-10">
      {audiences.map((audience) => (
        <Link
          key={audience.index}
          href={audience.href}
          className="group grid gap-6 border-b border-black/20 py-10 lg:grid-cols-12 lg:gap-10 lg:px-6 lg:py-14"
        >
          <div className="flex items-baseline gap-5 lg:col-span-5">
            <span className="text-xs tabular-nums text-black/40">{audience.index}</span>
            <h3 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-none tracking-[-0.045em]">
              {audience.title}
            </h3>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xl font-medium tracking-tight">{audience.claim}</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-black/60 sm:text-base">
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
