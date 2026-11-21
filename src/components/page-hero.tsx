import React from "react";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}

export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="border-b border-black/12 bg-[#f4f4f1]">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-16 sm:pb-20 sm:pt-24 lg:px-10">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50">
          <span className="size-1.5 rounded-full bg-[#ffb43b]" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.93] tracking-[-0.05em] text-[#0b0b0c]">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-black/60 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
