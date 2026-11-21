"use client";

import { LightingSceneArt } from "@/components/lighting-scene-art";
import type { KelvinPreset, ScenePreset } from "@/data/techlux";
import { cn } from "cn";

type SolutionSceneHeroProps = {
  preset: ScenePreset;
  kelvin: KelvinPreset | string;
  className?: string;
};

/** Seul îlot client par page solution (illustration héro). */
export function SolutionSceneHero({
  preset,
  kelvin,
  className,
}: SolutionSceneHeroProps) {
  return (
    <LightingSceneArt
      preset={preset}
      kelvin={kelvin}
      className={cn("aspect-[4/3] w-full", className)}
    />
  );
}
