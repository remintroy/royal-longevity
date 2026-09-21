import { RevealHeading } from "@/components/ui/reveal-heading";
import Image from "next/image";
import { BookingCta } from "@/components/ui/booking-cta";
import { GalleryMotion } from "@/components/ui/gallery-motion";
import type { GalleryContent } from "@/data/gallery";

export function Gallery({ content, bookingHref }: {
  content: GalleryContent;
  bookingHref: string;
}) {
  const columns = [content.images.slice(0, 2), content.images.slice(2, 4), content.images.slice(4, 6)];

  return (
    <GalleryMotion>
      <section id="gallery" aria-labelledby="gallery-title" className="border-t border-border bg-white px-5 pb-20 pt-12 text-espresso min-[700px]:px-8 min-[700px]:pb-32 min-[1000px]:px-[clamp(32px,4.8vw,84px)]">
        <header className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <p data-gallery-reveal className="mb-5 flex items-center gap-2.5 text-sm">
            <span className="size-[5px] rounded-full bg-gold" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <RevealHeading id="gallery-title" className="whitespace-pre-line text-balance text-[clamp(2.1rem,3.8vw,4rem)] font-normal leading-[1.12] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal">
            {content.title}
          </RevealHeading>
          <BookingCta data-gallery-reveal className="mt-8" href={bookingHref} label={content.bookingLabel} target="_blank" rel="noreferrer" />
        </header>

        <div className="mx-auto mt-12 grid max-w-[1560px] gap-4 min-[700px]:mt-20 min-[1000px]:grid-cols-[1fr_1.35fr_1fr]">
          {columns.map((column, columnIndex) => (
            <div key={column[0].id} className={`grid content-start gap-4 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-1 ${columnIndex === 0 ? "min-[1000px]:pt-[120px]" : columnIndex === 2 ? "min-[1000px]:pt-[158px]" : ""}`}>
              {column.map((image, imageIndex) => (
                <figure key={image.id} data-gallery-card className={`relative isolate m-0 overflow-hidden rounded-[24px] bg-espresso ${columnIndex === 0 && imageIndex === 1 ? "aspect-[4/5] min-[700px]:aspect-[3/2] min-[1000px]:aspect-[4/5]" : imageIndex === 0 && columnIndex > 0 ? "aspect-square min-[700px]:aspect-[3/2] min-[1000px]:aspect-square" : "aspect-[3/2]"}`}>
                  <Image src={image.src} alt={image.alt} fill sizes={columnIndex === 1 ? "(min-width: 1000px) 38vw, (min-width: 700px) 50vw, 100vw" : "(min-width: 1000px) 28vw, (min-width: 700px) 50vw, 100vw"} data-gallery-image className="object-cover" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(32,23,15,0.7),rgba(32,23,15,0.12)_38%,transparent_65%)]" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <span aria-hidden="true" className="mb-1 block text-sm tabular-nums">{String(columnIndex * 2 + imageIndex + 1).padStart(2, "0")}</span>
                    <h3 className="text-lg font-normal leading-snug tracking-[-.02em] min-[1200px]:text-[23px] rtl:tracking-normal">{image.title}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </section>
    </GalleryMotion>
  );
}
