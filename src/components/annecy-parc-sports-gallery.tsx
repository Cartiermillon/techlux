import Image from "next/image";

const HERO_PHOTO = {
  src: "/realisations/annecy-parc-sports-gallery-02.jpg",
  alt: "Console d'éclairage LED au-dessus de la piste et du terrain, Parc des Sports d'Annecy",
  caption: "Plateau sportif",
} as const;

export function AnnecyParcSportsGallery() {
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
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-6 pb-6 pt-16 text-[11px] uppercase tracking-[0.22em] text-white/80 sm:px-10">
        {HERO_PHOTO.caption}
      </figcaption>
    </figure>
  );
}