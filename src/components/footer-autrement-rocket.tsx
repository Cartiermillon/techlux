"use client";

import React from "react";
import { createPortal } from "react-dom";

const ETUDE_CTA_ID = "nav-etude-cta";
const ROCKET_MS = 1150;

type Burst = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  pathD: string;
};

function buildBurst(from: DOMRect, to: DOMRect): Burst {
  const fromX = from.left + from.width / 2;
  const fromY = from.top + from.height / 2;
  const toX = to.left + to.width / 2;
  const toY = to.top + to.height / 2;
  const ctrlX = (fromX + toX) / 2 + (fromX - toX) * 0.08;
  const ctrlY = Math.min(fromY, toY) - Math.max(80, Math.abs(fromY - toY) * 0.35);
  const pathD = `M ${fromX} ${fromY} Q ${ctrlX} ${ctrlY} ${toX} ${toY}`;
  return { fromX, fromY, toX, toY, pathD };
}

type FooterAutrementRocketProps = {
  children: React.ReactNode;
  className?: string;
};

export function FooterAutrementRocket({
  children,
  className,
}: FooterAutrementRocketProps) {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [burst, setBurst] = React.useState<Burst | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const busyRef = React.useRef(false);

  React.useEffect(() => setMounted(true), []);

  const launch = React.useCallback(() => {
    if (busyRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = spanRef.current;
    const target = document.getElementById(ETUDE_CTA_ID);
    if (!el || !target) return;

    const from = el.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    if (to.width === 0) return;

    busyRef.current = true;
    setBurst(buildBurst(from, to));

    window.setTimeout(() => {
      target.classList.add("footer-rocket-hit");
      window.setTimeout(() => target.classList.remove("footer-rocket-hit"), 900);
    }, ROCKET_MS - 80);

    window.setTimeout(() => {
      setBurst(null);
      busyRef.current = false;
    }, ROCKET_MS + 200);
  }, []);

  const onEnter = () => launch();

  return (
    <>
      <span
        ref={spanRef}
        onMouseEnter={onEnter}
        className={`footer-autrement-word relative inline-block cursor-pointer ${className ?? ""}`}
      >
        {children}
      </span>
      {mounted &&
        burst &&
        createPortal(
          <div
            className="footer-rocket-layer pointer-events-none fixed inset-0 z-[200]"
            aria-hidden
          >
            <svg className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="footer-rocket-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffb43b" stopOpacity="0" />
                  <stop offset="35%" stopColor="#fff6d8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#ffb43b" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <path
                d={burst.pathD}
                fill="none"
                stroke="url(#footer-rocket-stroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={1}
                className="footer-rocket-trail"
              />
            </svg>
            <span
              className="footer-rocket-head"
              style={
                {
                  left: burst.fromX,
                  top: burst.fromY,
                  ["--rocket-path" as string]: `path('${burst.pathD}')`,
                } as React.CSSProperties
              }
            />
            {Array.from({ length: 14 }, (_, i) => (
              <span
                key={i}
                className="footer-rocket-spark"
                style={
                  {
                    left: burst.fromX,
                    top: burst.fromY,
                    ["--rocket-path" as string]: `path('${burst.pathD}')`,
                    animationDelay: `${i * 0.045}s`,
                    ["--spark-jitter" as string]: `${(i % 5) - 2}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>,
          document.body
        )}
    </>
  );
}