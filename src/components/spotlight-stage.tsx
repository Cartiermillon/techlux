"use client";

import React from "react";

interface SpotlightStageProps {
  base: React.ReactNode;
  lit: React.ReactNode;
  children?: React.ReactNode;
}

export function SpotlightStage({ base, lit, children }: SpotlightStageProps) {
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
        <div className="hairline-grid pointer-events-none absolute inset-0" />
        <div>{base}</div>
        <div
          aria-hidden="true"
          className="spot-glow pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="spot-mask pointer-events-none absolute inset-0"
        >
          <div className="hairline-grid-lit absolute inset-0" />
          {lit}
        </div>
      </div>
      {children}
    </div>
  );
}
