"use client";

import Image from "next/image";
import React from "react";

export type SpotlightBackground = {
  src: string;
  alt: string;
};

interface SpotlightStageProps {
  children: React.ReactNode;
  background?: SpotlightBackground;
}

export function SpotlightStage({ children, background }: SpotlightStageProps) {
  return (
    <div className="relative isolate overflow-hidden bg-[#050506] text-white">
      <div className="relative">
        {background ? (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={background.src}
              alt={background.alt}
              fill
              priority
              sizes="100vw"
              className="home-hero-photo-dim scale-[1.04] object-cover object-[62%_center]"
            />
            <div className="absolute inset-0 bg-[#050506]/28" aria-hidden />
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#050506]/55 via-transparent to-[#050506]/78"
              aria-hidden
            />
          </div>
        ) : null}
        <div className="relative z-[1]">{children}</div>
      </div>
    </div>
  );
}