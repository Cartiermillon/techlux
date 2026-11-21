"use client";

import React from "react";
import { cn } from "cn";

type OpticId = "symetrique" | "voirie" | "patrimoine" | "pieton";

interface Lobe {
  c: number;
  w: number;
  a: number;
}

interface Optic {
  id: OpticId;
  label: string;
  hint: string;
  axis: number;
  cutoff: boolean;
  lobes: Lobe[];
  note: string;
}

const OPTICS: Optic[] = [
  {
    id: "symetrique",
    label: "Symétrique",
    hint: "Place, parvis, parc",
    axis: 0,
    cutoff: true,
    lobes: [{ c: 0, w: 46, a: 1 }],
    note: "Éclairement homogène autour du mât, sans flux au-dessus de l'horizon.",
  },
  {
    id: "voirie",
    label: "Asymétrique voirie",
    hint: "Chaussée & trottoir",
    axis: 0,
    cutoff: true,
    lobes: [
      { c: 36, w: 24, a: 1 },
      { c: -14, w: 26, a: 0.28 },
    ],
    note: "La lumière part vers la chaussée et épargne les façades et jardins riverains.",
  },
  {
    id: "patrimoine",
    label: "Faisceau serré",
    hint: "Façade, clocher, ouvrage",
    axis: 125,
    cutoff: false,
    lobes: [
      { c: 0, w: 9, a: 1 },
      { c: 0, w: 22, a: 0.18 },
    ],
    note: "Projecteur dirigé sur l'ouvrage : le faisceau se découpe sur la pierre, pas dans le ciel.",
  },
  {
    id: "pieton",
    label: "Confort piéton",
    hint: "Cheminement, berge",
    axis: 0,
    cutoff: true,
    lobes: [
      { c: 0, w: 62, a: 0.85 },
      { c: 22, w: 30, a: 0.25 },
    ],
    note: "Distribution large et douce pour les parcours lents, sans point d'éblouissement.",
  },
];

const STEP = 2;
const CX = 200;
const CY = 200;
const R = 158;

function wrap(deg: number) {
  let d = deg;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

function intensity(optic: Optic, theta: number) {
  const d = wrap(theta - optic.axis);
  let v = 0;
  for (const lobe of optic.lobes) {
    const x = (d - lobe.c) / lobe.w;
    v += lobe.a * Math.exp(-(x * x));
  }
  if (optic.cutoff) {
    const rad = (theta * Math.PI) / 180;
    v *= Math.pow(Math.max(0, Math.cos(rad)), 0.35);
  }
  return v;
}

function kelvinToRgb(kelvin: number): [number, number, number] {
  const t = kelvin / 100;
  let r: number;
  let g: number;
  let b: number;
  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = 255;
  }
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return [clamp(r), clamp(g), clamp(b)];
}

function kelvinLabel(k: number) {
  if (k <= 2300) return "Ambre";
  if (k <= 3200) return "Blanc chaud";
  if (k <= 4300) return "Blanc neutre";
  return "Blanc froid";
}

function kelvinAdvice(k: number) {
  if (k <= 2300) return "Spectre ambre : le plus respectueux de la faune nocturne.";
  if (k <= 3000) return "Jusqu'à 3000 K : compatible avec l'arrêté sur les nuisances lumineuses.";
  if (k <= 4300) return "Réservé aux zones d'activité et d'enjeu sécuritaire fort.";
  return "À limiter aux équipements sportifs et aux zones techniques.";
}

export function PhotometricExplorer() {
  const [opticId, setOpticId] = React.useState<OpticId>("voirie");
  const [kelvin, setKelvin] = React.useState(2700);

  const optic = OPTICS.find((o) => o.id === opticId) ?? OPTICS[0];
  const [r, g, b] = kelvinToRgb(kelvin);
  const color = `rgb(${r}, ${g}, ${b})`;

  const { path, beamAngle, peakAngle } = React.useMemo(() => {
    const samples: { theta: number; v: number }[] = [];
    let max = 0;
    for (let theta = -180; theta <= 180; theta += STEP) {
      const v = intensity(optic, theta);
      samples.push({ theta, v });
      if (v > max) max = v;
    }
    let d = "";
    let aboveHalf = 0;
    let peak = samples[0];
    samples.forEach((s, i) => {
      const n = s.v / max;
      if (n >= 0.5) aboveHalf += STEP;
      if (s.v > peak.v) peak = s;
      const rad = (s.theta * Math.PI) / 180;
      const x = CX + Math.sin(rad) * n * R;
      const y = CY + Math.cos(rad) * n * R;
      d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
    });
    return {
      path: `${d}Z`,
      beamAngle: aboveHalf,
      peakAngle: Math.round(wrap(peak.theta)),
    };
  }, [optic]);

  const rings = [0.25, 0.5, 0.75, 1];
  const spokes = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/50">
          <span className="size-1.5 rounded-full bg-[#ffb43b]" />
          Simulateur de distribution
        </p>
        <h2 className="mt-6 text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          La lumière se prescrit en{" "}
          <span className="text-white/40">degrés</span> et en{" "}
          <span style={{ color }}>Kelvin.</span>
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
          Choisissez une optique, ajustez la température de couleur : voyez où
          part chaque photon avant même de poser le premier mât.
        </p>

        <div className="mt-10 border-t border-white/12">
          {OPTICS.map((o, i) => {
            const active = o.id === optic.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setOpticId(o.id)}
                aria-pressed={active}
                className={cn(
                  "group flex w-full cursor-pointer items-baseline gap-5 border-b border-white/12 py-4 text-left transition-colors",
                  active ? "text-white" : "text-white/45 hover:text-white/80"
                )}
              >
                <span className="w-6 text-xs tabular-nums text-white/35">
                  0{i + 1}
                </span>
                <span className="flex-1 text-lg font-medium tracking-tight">
                  {o.label}
                </span>
                <span className="hidden text-xs text-white/40 sm:block">
                  {o.hint}
                </span>
                <span
                  className={cn(
                    "size-2 rounded-full transition-all",
                    active ? "scale-100 bg-[#ffb43b]" : "scale-0 bg-white/30"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="kelvin-range"
              className="text-xs uppercase tracking-[0.22em] text-white/50"
            >
              Température de couleur
            </label>
            <span className="text-2xl font-semibold tabular-nums tracking-tight">
              {kelvin}
              <span className="text-sm text-white/45"> K</span>
            </span>
          </div>
          <input
            id="kelvin-range"
            type="range"
            min={2200}
            max={5000}
            step={100}
            value={kelvin}
            onChange={(e) => setKelvin(Number(e.target.value))}
            className="light-range mt-5"
          />
          <div className="mt-3 flex justify-between text-[11px] text-white/35">
            <span>2200 K ambre</span>
            <span>5000 K froid</span>
          </div>
          <p className="mt-5 text-sm text-white/60">
            <strong className="font-medium text-white">
              {kelvinLabel(kelvin)}.
            </strong>{" "}
            {kelvinAdvice(kelvin)}
          </p>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="relative border border-white/12 bg-[#08080a] p-4 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(60% 60% at 50% 50%, rgba(${r},${g},${b},0.14), transparent 70%)`,
            }}
          />
          <svg
            viewBox="0 0 400 400"
            role="img"
            aria-label={`Courbe de distribution lumineuse : ${optic.label}, ${kelvin} kelvin`}
            className="relative mx-auto block w-full max-w-[560px]"
          >
            {rings.map((ring) => (
              <circle
                key={ring}
                cx={CX}
                cy={CY}
                r={R * ring}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            ))}
            {spokes.map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={angle}
                  x1={CX}
                  y1={CY}
                  x2={CX + Math.sin(rad) * R}
                  y2={CY + Math.cos(rad) * R}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
              );
            })}
            <line
              x1={CX - R - 14}
              y1={CY}
              x2={CX + R + 14}
              y2={CY}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <text
              x={CX - R - 14}
              y={CY - 8}
              fill="rgba(255,255,255,0.4)"
              fontSize="9"
              letterSpacing="1.5"
            >
              HORIZON
            </text>

            <path
              d={path}
              fill={color}
              fillOpacity="0.16"
              stroke={color}
              strokeWidth="1.75"
              strokeLinejoin="round"
              style={{ transition: "fill 200ms, stroke 200ms" }}
            />

            <circle cx={CX} cy={CY} r="4" fill="#fff" />
            <circle cx={CX} cy={CY} r="9" fill="none" stroke={color} strokeOpacity="0.6" />

            {rings.map((ring) => (
              <text
                key={`l-${ring}`}
                x={CX + 5}
                y={CY + R * ring - 3}
                fill="rgba(255,255,255,0.3)"
                fontSize="8"
              >
                {Math.round(ring * 100)}%
              </text>
            ))}
          </svg>

          <div className="relative mt-6 grid grid-cols-3 border-t border-white/12 pt-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Angle de faisceau
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
                {beamAngle}°
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Axe principal
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
                {Math.abs(peakAngle)}°
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Flux vers le ciel
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {optic.cutoff ? "0 %" : "Sur l'ouvrage"}
              </p>
            </div>
          </div>
          <p className="relative mt-5 text-sm leading-relaxed text-white/60">
            {optic.note}
          </p>
          <p className="relative mt-3 text-[11px] text-white/30">
            Représentation schématique à visée pédagogique. Les données
            photométriques réelles sont fournies par les fabricants partenaires.
          </p>
        </div>
      </div>
    </div>
  );
}
