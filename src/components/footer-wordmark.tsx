"use client";

import React from "react";

const wordmarkClass =
  "font-display whitespace-nowrap text-center text-[26vw] font-semibold leading-[0.8] tracking-[-0.07em]";

export function FooterWordmark() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [light, setLight] = React.useState({ x: 50, y: 78, active: false });

  const updateFromEvent = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setLight({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const mask = light.active
    ? `radial-gradient(ellipse 32% 58% at ${light.x}% ${light.y}%, #000 0%, #000 18%, rgba(0,0,0,0.45) 40%, transparent 70%)`
    : `radial-gradient(ellipse 55% 85% at 50% 88%, rgba(0,0,0,0.5) 0%, transparent 68%)`;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative -mb-[3.2vw] min-h-[0.55em] cursor-default select-none py-2"
      onMouseMove={(e) => updateFromEvent(e.clientX, e.clientY)}
      onMouseLeave={() => setLight((s) => ({ ...s, active: false }))}
    >
      <p
        className={`${wordmarkClass} text-white/[0.095]`}
        style={{
          textShadow: "0 0.04em 0.12em rgba(0,0,0,0.85)",
        }}
      >
        techlux
      </p>
      <p
        className={`absolute inset-x-0 top-2 ${wordmarkClass} bg-gradient-to-b from-[#ffb43b] via-white to-white/35 bg-clip-text text-transparent transition-[opacity,filter] duration-200`}
        style={{
          opacity: light.active ? 1 : 0.48,
          filter: light.active
            ? "drop-shadow(0 0 28px rgba(255,180,59,0.35))"
            : "none",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        techlux
      </p>
    </div>
  );
}
