import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DOMAIN_MAP, type Realization } from "@/data/techlux";

const HERO_PHOTO = {
  src: "/realisations/annecy-parc-sports-gallery-02.jpg",
  alt: "Console d'éclairage LED au-dessus de la piste et du terrain, Parc des Sports d'Annecy",
  caption: "Plateau sportif",
} as const;

type Props = {
  realization: Realization;
};

export function AnnecyParcSportsGallery({ realization }: Props) {
  return (
    <figure
      aria-label="Galerie du chantier"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#1c2428]"
    >
      <Image
        src={HERO_PHOTO.src}
        alt={HERO_PHOTO.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-6 pb-8 pt-28 sm:px-10 sm:pb-10">
        <div className="pointer-events-auto mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.24em] text-white/70">Domaines</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {realization.domains.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/solutions/${slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/20"
                >
                  {DOMAIN_MAP[slug].title}
                  <ArrowUpRight className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-white/65">
            {HERO_PHOTO.caption}
          </p>
        </div>
      </div>
    </figure>
  );
}