import type { ScenePreset } from "@/data/techlux";
import { cn } from "cn";

const PRESET_STYLE: Record<
  ScenePreset,
  { from: string; via: string; to: string; accent: string }
> = {
  heritage: { from: "#1a1420", via: "#2d2240", to: "#120e18", accent: "#ffc66d" },
  urban: { from: "#0e1218", via: "#1e2632", to: "#0a0d12", accent: "#ffe09e" },
  solar: { from: "#0c1810", via: "#1a2e22", to: "#08120c", accent: "#7dd87d" },
  bridge: { from: "#101820", via: "#243040", to: "#0c1018", accent: "#ffb43b" },
  sports: { from: "#0a1018", via: "#182838", to: "#060a10", accent: "#cfe4ff" },
  "wood-mast": { from: "#141210", via: "#2a2420", to: "#0e0c0a", accent: "#e8b87a" },
  "smart-crosswalk": { from: "#0c1420", via: "#1a2840", to: "#080e18", accent: "#38bdf8" },
  "dark-sky": { from: "#080a12", via: "#14182a", to: "#05060a", accent: "#94a3b8" },
};

type SolutionSceneThumbProps = {
  preset: ScenePreset;
  className?: string;
  label?: string;
};

export function SolutionSceneThumb({
  preset,
  className,
  label,
}: SolutionSceneThumbProps) {
  const s = PRESET_STYLE[preset];
  return (
    <div
      className={cn("relative overflow-hidden bg-[#070A12]", className)}
      aria-hidden={label ? undefined : true}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, ${s.from} 0%, ${s.via} 45%, ${s.to} 100%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[55%] w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-2xl"
        style={{ background: s.accent }}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      {label ? (
        <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-white/45">
          {label}
        </p>
      ) : null}
    </div>
  );
}
