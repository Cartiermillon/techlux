import Image from "next/image";
import { cn } from "cn";

interface TechluxLogoProps {
  variant?: "dark" | "light";
  className?: string;
  /** Utiliser le logo image (défaut) ou le mot-signe texte */
  mark?: "image" | "text";
}

const LOGO_RATIO = 3266 / 2449;

export function TechluxLogo({
  variant = "light",
  className,
  mark = "image",
}: TechluxLogoProps) {
  if (mark === "image" && variant === "light") {
    return (
      <Image
        src="/brand/techlux-logo.png"
        alt="Tech'lux — agence d'aménagement lumière"
        width={Math.round(125 * LOGO_RATIO)}
        height={125}
        priority
        className={cn(
          "h-[7.4rem] w-auto max-h-full max-w-[min(88vw,31rem)] object-contain object-left sm:h-[7.85rem]",
          className
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-heading text-[1.35rem] font-semibold leading-none tracking-[-0.04em] select-none",
        variant === "light" ? "text-white" : "text-[#0b0b0c]",
        className
      )}
    >
      techlux
    </span>
  );
}
