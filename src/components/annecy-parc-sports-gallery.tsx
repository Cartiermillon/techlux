import Image from "next/image";

const PHOTOS = [
  {
    src: "/realisations/annecy-parc-sports-gallery-01.jpg",
    alt: "Mât PETITJEAN et projecteurs LED au crépuscule, Parc des Sports d'Annecy",
    caption: "Mât & nappes LED",
    aspect: "portrait" as const,
  },
  {
    src: "/realisations/annecy-parc-sports-gallery-02.jpg",
    alt: "Console d'éclairage LED au-dessus de la piste et du terrain",
    caption: "Plateau sportif",
    aspect: "landscape" as const,
  },
] as const;

export function AnnecyParcSportsGallery() {
  return (
    <section
      aria-label="Galerie du chantier"
      className="relative w-full border-t border-black/[0.06] bg-[#e8e9e5]"
    >
      <div className="mx-auto max-w-[1400px] px-6 pb-4 pt-14 lg:px-10">
        <p className="text-xs uppercase tracking-[0.26em] text-black/45">Sur le terrain</p>
        <h2 className="mt-3 text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold tracking-[-0.035em]">
          Le plateau vu{" "}
          <span className="text-black/45">depuis les mâts.</span>
        </h2>
      </div>

      <div className="annecy-gallery-vertical-scroll mx-auto flex max-w-[1400px] flex-col gap-1 px-0 sm:gap-2">
        {PHOTOS.map((photo, i) => (
          <figure
            key={photo.src}
            className={`relative w-full overflow-hidden bg-[#1c2428] ${
              photo.aspect === "portrait"
                ? "min-h-[min(88vh,920px)]"
                : "min-h-[min(72vh,680px)]"
            }`}
          >
            {photo.aspect === "portrait" ? (
              <>
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className="scale-110 object-cover blur-3xl brightness-75 saturate-110"
                  aria-hidden
                />
                <div className="absolute inset-y-0 left-1/2 w-[min(92vw,560px)] -translate-x-1/2">
                  <div className="relative h-full w-full">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 560px"
                      className="object-cover object-center"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={i === 1}
              />
            )}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-6 pb-5 pt-12 text-[11px] uppercase tracking-[0.22em] text-white/80 sm:px-10">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}