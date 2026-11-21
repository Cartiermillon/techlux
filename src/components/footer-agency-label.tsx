"use client";

import React from "react";
import { cn } from "cn";

type FooterAgencyLabelProps = {
  children: string;
  className?: string;
  /** `dark` = footer ; `light` = cartes contact sur fond blanc */
  tone?: "dark" | "light";
};

export function FooterAgencyLabel({
  children,
  className,
  tone = "dark",
}: FooterAgencyLabelProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [beam, setBeam] = React.useState({ x: 50, y: 50, active: false });

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setBeam({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      active: true,
    });
  };

  const mask = beam.active
    ? `radial-gradient(ellipse 42% 120% at ${beam.x}% ${beam.y}%, #000 0%, #000 28%, rgba(0,0,0,0.35) 52%, transparent 78%)`
    : "none";

  return (
    <div
      ref={wrapRef}
      className={cn(
        "footer-agency-label group relative inline-block cursor-default py-1",
        className
      )}
      onMouseMove={onMove}
      onMouseLeave={() => setBeam((b) => ({ ...b, active: false }))}
    >
      <span
        aria-hidden
        className={cn(
          "footer-agency-label-ambient pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-2xl opacity-0 transition-opacity duration-500",
          beam.active && "opacity-100"
        )}
      />
      <span
        aria-hidden
        className="footer-agency-label-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: beam.active
            ? `linear-gradient(105deg, transparent 0%, rgba(255,180,59,0.12) ${beam.x - 18}%, rgba(255,255,255,0.22) ${beam.x}%, rgba(255,180,59,0.1) ${beam.x + 22}%, transparent 100%)`
            : undefined,
        }}
      />
      <p
        className={cn(
          "relative z-[1] text-lg font-semibold tracking-tight sm:text-xl",
          tone === "light" ? "text-[#1a1a1c]" : "text-white/82"
        )}
      >
        {children}
      </p>
      <p
        aria-hidden
        className="pointer-events-none absolute left-0 top-1 z-[2] text-lg font-semibold tracking-tight text-transparent transition-opacity duration-300 sm:text-xl"
        style={{
          opacity: beam.active ? 1 : 0,
          backgroundImage:
            "linear-gradient(120deg, #ffb43b 0%, #fff6e0 45%, #ffb43b 72%, #e89a1a 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitMaskImage: mask,
          maskImage: mask,
          filter: beam.active
            ? "drop-shadow(0 0 12px rgba(255,180,59,0.65)) drop-shadow(0 0 28px rgba(255,180,59,0.35))"
            : undefined,
        }}
      >
        {children}
      </p>
    </div>
  );
}
