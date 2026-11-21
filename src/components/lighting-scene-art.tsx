"use client";

import React from "react";
import { parseKelvin, type KelvinPreset, type ScenePreset } from "@/data/techlux";
import { cn } from "cn";

interface LightingSceneArtProps {
  preset: ScenePreset;
  kelvin?: KelvinPreset | string;
  trameNoire?: boolean;
  className?: string;
}

const KELVIN_COLORS: Record<
  KelvinPreset,
  { core: string; mid: string; ambient: string }
> = {
  "2200K": { core: "#FF9F2E", mid: "#F5821F", ambient: "#9C420E" },
  "2400K": { core: "#FFB144", mid: "#F5982D", ambient: "#A65314" },
  "2700K": { core: "#FFC66D", mid: "#F5B841", ambient: "#B3741A" },
  "3000K": { core: "#FFE09E", mid: "#F5CE6E", ambient: "#9E8444" },
  "4000K": { core: "#F2F7FF", mid: "#B9D7FF", ambient: "#4B76A8" },
  "5000K": { core: "#FFFFFF", mid: "#CFE4FF", ambient: "#5B8EC9" },
};

export function LightingSceneArt({
  preset,
  kelvin = "2700K",
  trameNoire = false,
  className,
}: LightingSceneArtProps) {
  const uid = React.useId().replace(/:/g, "");
  const palette = KELVIN_COLORS[parseKelvin(kelvin)];
  const opacityFactor = trameNoire ? 0.35 : 0.92;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#070A12] select-none",
        className
      )}
    >
      <svg
        viewBox="0 0 640 380"
        className="h-full w-full block"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#05070D" />
            <stop offset="65%" stopColor="#0B1120" />
            <stop offset="100%" stopColor="#131B2E" />
          </linearGradient>

          <linearGradient id={`${uid}-beam`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.core} stopOpacity={0.9 * opacityFactor} />
            <stop offset="45%" stopColor={palette.mid} stopOpacity={0.35 * opacityFactor} />
            <stop offset="100%" stopColor={palette.ambient} stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${uid}-upbeam`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={palette.core} stopOpacity={0.85 * opacityFactor} />
            <stop offset="55%" stopColor={palette.mid} stopOpacity={0.28 * opacityFactor} />
            <stop offset="100%" stopColor={palette.ambient} stopOpacity="0" />
          </linearGradient>

          <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.core} stopOpacity={0.85 * opacityFactor} />
            <stop offset="40%" stopColor={palette.mid} stopOpacity={0.25 * opacityFactor} />
            <stop offset="100%" stopColor={palette.ambient} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Night Sky */}
        <rect width="640" height="380" fill={`url(#${uid}-sky)`} />

        {/* Subtle stars / constellation */}
        <g fill="#E2E8F0" opacity={trameNoire ? 0.55 : 0.25}>
          <circle cx="82" cy="48" r="1" />
          <circle cx="144" cy="76" r="0.8" />
          <circle cx="240" cy="36" r="1.1" />
          <circle cx="385" cy="54" r="0.9" />
          <circle cx="492" cy="42" r="1.2" />
          <circle cx="570" cy="86" r="0.8" />
          <circle cx="310" cy="82" r="0.7" />
        </g>

        {/* Horizon ground plane */}
        <rect x="0" y="302" width="640" height="78" fill="#06080E" />
        <line
          x1="0"
          y1="302"
          x2="640"
          y2="302"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />

        {preset === "heritage" && (
          <g>
            {/* Distant skyline */}
            <path
              d="M0 302 V250 H75 V225 H130 V260 H185 V302 Z M455 302 V245 H515 V220 H575 V258 H640 V302 Z"
              fill="#0D1322"
            />
            {/* Monumental facade / church silhouette */}
            <rect x="215" y="155" width="210" height="147" fill="#131B2E" stroke="rgba(255,255,255,0.1)" />
            {/* Bell tower */}
            <rect x="285" y="72" width="70" height="83" fill="#162038" stroke="rgba(255,255,255,0.12)" />
            <polygon points="320,24 278,72 362,72" fill="#1A2642" />
            {/* Uplight beams on facade */}
            <polygon points="240,302 222,155 274,155" fill={`url(#${uid}-upbeam)`} />
            <polygon points="320,302 292,74 348,74" fill={`url(#${uid}-upbeam)`} />
            <polygon points="400,302 366,155 418,155" fill={`url(#${uid}-upbeam)`} />
            {/* Rose window glow */}
            <circle cx="320" cy="195" r="22" fill={`url(#${uid}-halo)`} />
            <circle cx="320" cy="195" r="14" stroke={palette.core} strokeOpacity="0.55" strokeWidth="1.2" fill="none" />
            {/* Ground projectors */}
            <rect x="236" y="296" width="8" height="6" rx="1" fill={palette.core} />
            <rect x="316" y="296" width="8" height="6" rx="1" fill={palette.core} />
            <rect x="396" y="296" width="8" height="6" rx="1" fill={palette.core} />
          </g>
        )}

        {preset === "urban" && (
          <g>
            {/* Urban blocks */}
            <rect x="30" y="190" width="90" height="112" fill="#101626" />
            <rect x="140" y="210" width="110" height="92" fill="#0D1322" />
            <rect x="380" y="195" width="120" height="107" fill="#101626" />
            <rect x="520" y="220" width="95" height="82" fill="#0D1322" />
            {/* Perspective avenue lines */}
            <line x1="0" y1="360" x2="290" y2="302" stroke="rgba(255,255,255,0.1)" />
            <line x1="640" y1="360" x2="350" y2="302" stroke="rgba(255,255,255,0.1)" />
            {/* Street poles */}
            {[160, 320, 480].map((x, idx) => (
              <g key={x}>
                <path
                  d={`M${x} 302 V120 Q${x} 102 ${x + (idx === 1 ? 0 : idx === 0 ? 22 : -22)} 102`}
                  stroke="#94A3B8"
                  strokeWidth="3"
                  fill="none"
                />
                <polygon
                  points={`${x + (idx === 1 ? 0 : idx === 0 ? 22 : -22)},106 ${x - 75},308 ${x + 75},308`}
                  fill={`url(#${uid}-beam)`}
                />
                <circle
                  cx={x + (idx === 1 ? 0 : idx === 0 ? 22 : -22)}
                  cy="104"
                  r="4"
                  fill={palette.core}
                />
              </g>
            ))}
          </g>
        )}

        {preset === "solar" && (
          <g>
            {/* Rolling hills / greenway */}
            <path
              d="M0 302 Q170 250 330 282 T640 272 V302 Z"
              fill="#0E1524"
            />
            {/* Solar mast */}
            <line x1="250" y1="302" x2="250" y2="96" stroke="#CBD5E1" strokeWidth="4" />
            {/* Solar panel array */}
            <polygon points="224,84 278,74 282,92 228,102" fill="#1E3A5F" stroke="#60A5FA" strokeWidth="1" />
            {/* Cantilever luminaire */}
            <line x1="250" y1="112" x2="292" y2="112" stroke="#CBD5E1" strokeWidth="3" />
            <polygon points="290,114 205,315 385,315" fill={`url(#${uid}-beam)`} />
            <ellipse cx="290" cy="306" rx="75" ry="10" fill={`url(#${uid}-halo)`} />
            <circle cx="290" cy="113" r="4.5" fill={palette.core} />
            {/* Secondary distant solar mast */}
            <line x1="470" y1="302" x2="470" y2="150" stroke="#64748B" strokeWidth="2.5" />
            <polygon points="484,158 430,308 540,308" fill={`url(#${uid}-beam)`} opacity="0.65" />
            <circle cx="484" cy="158" r="3" fill={palette.core} />
          </g>
        )}

        {preset === "bridge" && (
          <g>
            {/* Water reflection zone */}
            <rect x="0" y="302" width="640" height="78" fill="#060B15" />
            {/* Bridge deck & arch */}
            <line x1="40" y1="226" x2="600" y2="226" stroke="#334155" strokeWidth="8" />
            <path
              d="M120 226 Q320 115 520 226"
              fill="none"
              stroke="#64748B"
              strokeWidth="4"
            />
            {/* Bridge cables */}
            {[170, 220, 270, 320, 370, 420, 470].map((x) => (
              <line
                key={x}
                x1={x}
                y1="226"
                x2={x}
                y2={226 - Math.sin(((x - 120) / 400) * Math.PI) * 55}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.2"
              />
            ))}
            {/* Linear architectural glow under bridge */}
            <rect
              x="95"
              y="229"
              width="450"
              height="3.5"
              fill={palette.core}
              opacity={opacityFactor}
            />
            <polygon points="105,232 535,232 560,302 80,302" fill={`url(#${uid}-beam)`} opacity="0.55" />
            {/* Water shimmer */}
            <ellipse cx="320" cy="336" rx="190" ry="14" fill={`url(#${uid}-halo)`} opacity="0.5" />
          </g>
        )}

        {preset === "sports" && (
          <g>
            {/* Stadium turf */}
            <polygon points="80,302 560,302 620,370 20,370" fill="#0B1F19" />
            <line x1="320" y1="302" x2="320" y2="370" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <ellipse cx="320" cy="336" rx="52" ry="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            {/* High-mast floodlights */}
            <line x1="120" y1="302" x2="120" y2="68" stroke="#94A3B8" strokeWidth="4" />
            <rect x="106" y="60" width="28" height="14" rx="2" fill="#1E293B" stroke={palette.core} />
            <line x1="520" y1="302" x2="520" y2="68" stroke="#94A3B8" strokeWidth="4" />
            <rect x="506" y="60" width="28" height="14" rx="2" fill="#1E293B" stroke={palette.core} />
            {/* Asymmetric floodlight beams */}
            <polygon points="120,74 170,340 420,340" fill={`url(#${uid}-beam)`} />
            <polygon points="520,74 220,340 470,340" fill={`url(#${uid}-beam)`} />
          </g>
        )}

        {preset === "wood-mast" && (
          <g>
            {/* Park trees silhouettes */}
            <circle cx="95" cy="240" r="46" fill="#0C171B" />
            <circle cx="545" cy="235" r="52" fill="#0C171B" />
            {/* Timber masts */}
            {[205, 435].map((x) => (
              <g key={x}>
                <polygon points={`${x - 4},302 ${x + 4},302 ${x + 2},105 ${x - 2},105`} fill="#7C5333" />
                <line x1={x} y1="112" x2={x + (x < 320 ? 28 : -28)} y2="108" stroke="#CBD5E1" strokeWidth="3" />
                <polygon
                  points={`${x + (x < 320 ? 28 : -28)},110 ${x - 78},306 ${x + 78},306`}
                  fill={`url(#${uid}-beam)`}
                />
                <circle cx={x + (x < 320 ? 28 : -28)} cy="109" r="4" fill={palette.core} />
              </g>
            ))}
          </g>
        )}

        {preset === "smart-crosswalk" && (
          <g>
            {/* Crosswalk stripes */}
            {[220, 265, 310, 355, 400].map((x) => (
              <polygon
                key={x}
                points={`${x},312 ${x + 26},312 ${x + 34},354 ${x - 6},354`}
                fill="rgba(255,255,255,0.28)"
              />
            ))}
            {/* Smart pole + sensor ring */}
            <line x1="175" y1="302" x2="175" y2="96" stroke="#94A3B8" strokeWidth="3.5" />
            <line x1="175" y1="98" x2="235" y2="98" stroke="#94A3B8" strokeWidth="3" />
            <polygon points="232,100 185,355 435,355" fill={`url(#${uid}-beam)`} />
            <circle cx="232" cy="99" r="4.5" fill={palette.core} />
            {/* Radar / Smart detection waves */}
            <path d="M190 140 Q210 155 190 170" stroke="#38BDF8" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M200 132 Q226 155 200 178" stroke="#38BDF8" strokeWidth="1.5" fill="none" opacity="0.5" />
            {/* Active LED road studs */}
            {[205, 255, 305, 355, 405, 440].map((x) => (
              <circle key={x} cx={x} cy="308" r="2.6" fill={palette.core} />
            ))}
          </g>
        )}

        {preset === "dark-sky" && (
          <g>
            {/* Dense night sky */}
            <g fill="#E2E8F0" opacity="0.7">
              {[
                [60, 30], [118, 62], [176, 24], [212, 90], [268, 44], [350, 28],
                [412, 70], [470, 36], [534, 64], [588, 26], [612, 98], [330, 110],
                [150, 118], [520, 120], [96, 96], [440, 112],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" />
              ))}
            </g>
            {/* Tree line and hills */}
            <path
              d="M0 302 V262 Q60 236 120 258 T240 250 T360 262 T480 244 T640 256 V302 Z"
              fill="#0B1019"
            />
            {[70, 110, 520, 568].map((x) => (
              <polygon key={x} points={`${x},302 ${x - 16},302 ${x},240 ${x + 16},302`} fill="#080C14" />
            ))}
            {/* Shielded luminaire, light strictly downward */}
            <line x1="320" y1="302" x2="320" y2="130" stroke="#94A3B8" strokeWidth="3.5" />
            <path d="M296 128 H344 L336 140 H304 Z" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
            <polygon points="306,140 334,140 392,302 248,302" fill={`url(#${uid}-beam)`} />
            <ellipse cx="320" cy="304" rx="82" ry="10" fill={`url(#${uid}-halo)`} opacity="0.7" />
            <circle cx="320" cy="141" r="3.5" fill={palette.core} />
            {/* Upward emission blocked */}
            <path d="M300 118 Q320 100 340 118" stroke="#38BDF8" strokeWidth="1.2" fill="none" strokeDasharray="3 4" opacity="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
}
