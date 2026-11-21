"use client";

import Image from "next/image";
import React from "react";

type AnnecyParcSportsHeroProps = {
  imageSrc: string;
  alt: string;
  children: React.ReactNode;
};

export function AnnecyParcSportsHero({
  imageSrc,
  alt,
  children,
}: AnnecyParcSportsHeroProps) {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = Math.min(scrollY * 0.22, 140);

  return (
    <header className="relative min-h-[min(100svh,920px)] w-full overflow-hidden bg-[#dfe8e4]">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${parallax * 0.35}px, 0) scale(1.06)` }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="annecy-hero-kenburns object-cover object-center"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#f4f4f1]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(244,244,241,0.95),transparent_70%)]"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto flex min-h-[min(100svh,920px)] max-w-[1400px] flex-col px-4 pb-28 pt-8 sm:px-6 lg:px-10">
        <div className="flex items-start justify-between gap-4">{children}</div>
        <p className="mt-auto max-w-xl text-[11px] font-medium uppercase tracking-[0.28em] text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]">
          Vue aérienne · éclairage nocturne du complexe
        </p>
      </div>
    </header>
  );
}