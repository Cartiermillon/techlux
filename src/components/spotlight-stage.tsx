"use client";

import Image from "next/image";
import React from "react";

export type SpotlightBackground = {
  src: string;
  alt: string;
};

interface SpotlightStageProps {
  base: React.ReactNode;
  lit: React.ReactNode;
  children?: React.ReactNode;
  background?: SpotlightBackground;
}

function SpotlightPhoto({
  src,
  alt,
  dimmed,
}: {
  src: string;
  alt: string;
  dimmed: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[62%_center] ${
          dimmed ? "home-hero-photo-dim scale-[1.04]" : "scale-[1.06]"
        }`}
      />
      {dimmed ? (
        <>
          <div className="absolute inset-0 bg-[#050506]/28" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#050506]/55 via-transparent to-[#050506]/78"
            aria-hidden
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#050506]/8" aria-hidden />
      )}
    </div>
  );
}

export function SpotlightStage({ base, lit, children, background }: SpotlightStageProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const layerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let visible = true;
    let pointerActive = false;
    let lastMove = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      layer.style.setProperty("--x", `${cx}px`);
      layer.style.setProperty("--y", `${cy}px`);
    };

    const start = layer.getBoundingClientRect();
    cx = tx = start.width * 0.64;
    cy = ty = start.height * 0.4;
    apply();

    const onMove = (e: PointerEvent) => {
      const r = layer.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      pointerActive = true;
      lastMove = performance.now();
    };

    const tick = (t: number) => {
      if (visible) {
        const r = layer.getBoundingClientRect();
        if (pointerActive && t - lastMove > 3500) pointerActive = false;
        if (!pointerActive && !reduceMotion) {
          const k = t / 1000;
          tx = r.width * (0.5 + 0.3 * Math.sin(k * 0.42));
          ty = r.height * (0.42 + 0.22 * Math.sin(k * 0.67 + 1.2));
        }
        cx += (tx - cx) * 0.07;
        cy += (ty - cy) * 0.07;
        apply();
      }
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(root);

    root.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative isolate overflow-hidden bg-[#050506] text-white"
    >
      <div ref={layerRef} className="relative">
        {background ? (
          <SpotlightPhoto src={background.src} alt={background.alt} dimmed />
        ) : null}
        <div className="relative z-[2]">{base}</div>
        <div
          aria-hidden="true"
          className="spot-glow pointer-events-none absolute inset-0 z-[3]"
        />
        <div
          aria-hidden="true"
          className="spot-mask pointer-events-none absolute inset-0 z-[4]"
        >
          {background ? (
            <div aria-hidden>
              <SpotlightPhoto src={background.src} alt="" dimmed={false} />
            </div>
          ) : null}
          <div className="relative h-full">{lit}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
