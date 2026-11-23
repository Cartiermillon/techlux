"use client";

import { usePathname } from "next/navigation";
import React from "react";

/** Aptos sur toute la page d’accueil (y compris header et footer). */
export function HomeRootTypography() {
  const pathname = usePathname();

  React.useLayoutEffect(() => {
    const root = document.documentElement;
    const onHome = pathname === "/";
    root.classList.toggle("home-aptos", onHome);
    return () => root.classList.remove("home-aptos");
  }, [pathname]);

  return null;
}