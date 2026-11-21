"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { REALIZATION_MAP } from "@/data/techlux";

/** Anciennes URL `/realisations?projet=slug` → fiche dédiée. */
export function RealizationLegacyRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const projet = searchParams.get("projet");
    if (projet && REALIZATION_MAP[projet]) {
      router.replace(`/realisations/${projet}`);
    }
  }, [searchParams, router]);

  return null;
}