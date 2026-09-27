import { RevealHeading } from "@/components/ui/reveal-heading";
import Image from "next/image";
import { BookingCta } from "@/components/ui/booking-cta";
import { GalleryMotion } from "@/components/ui/gallery-motion";
import type { GalleryContent } from "@/data/gallery";

export function Gallery({
  content,
  bookingHref,
}: {
  content: GalleryContent;
  bookingHref: string;
}) {
  return (
    <GalleryMotion>
      <section
        id="gallery"
        aria-labelledby="gallery-title"
        className="border-t border-border bg-white px-5 pb-20 pt-12 text-espresso min-[700px]:px-8 min-[700px]:pb-32 min-[1000px]:px-[clamp(32px,4.8vw,84px)]"
      >
        <header className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <p
            data-gallery-reveal
            className="mb-5 flex items-center gap-2.5 text-sm"
          >
            <span
              className="size-[5px] rounded-full bg-gold"
              aria-hidden="true"
            />
            {content.eyebrow}
          </p>
          <RevealHeading
            id="gallery-title"
            className="whitespace-pre-line text-balance text-[clamp(2.1rem,3.8vw,4rem)] font-normal leading-[1.12] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            {content.title}
          </RevealHeading>
          <BookingCta
            data-gallery-reveal
            className="mt-8"
            href={bookingHref}
            label={content.bookingLabel}
            target="_blank"
            rel="noreferrer"
          />
        </header>

        <div className="mx-auto mt-12 grid max-w-[1560px] grid-cols-2 auto-rows-[clamp(180px,45vw,300px)] gap-3 min-[700px]:mt-20 min-[700px]:gap-4 min-[1000px]:grid-cols-4 min-[1000px]:auto-rows-[clamp(200px,19vw,290px)]">
          {content.images.map((image, index) => (
            <figure
              key={image.id}
              data-gallery-card
              className="relative isolate m-0 min-w-0 overflow-hidden rounded-[24px] bg-espresso first:col-span-2 last:col-span-2 min-[1000px]:first:row-span-2 min-[1000px]:nth-3:row-span-2 min-[1000px]:nth-5:col-span-2"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0 || index === 5
                    ? "(min-width: 1728px) 780px, (min-width: 1000px) 46vw, 100vw"
                    : index === 4
                      ? "(min-width: 1728px) 780px, 46vw"
                      : "(min-width: 1728px) 390px, (min-width: 1000px) 23vw, 46vw"
                }
                data-gallery-image
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-start gap-3 bg-ink/80 px-4 py-3 text-ivory min-[700px]:px-5 min-[700px]:py-4">
                <span
                  aria-hidden="true"
                  className="pt-1 text-xs tabular-nums text-ivory/70"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-normal leading-snug tracking-[-.02em] min-[700px]:text-lg min-[1200px]:text-xl rtl:tracking-normal">
                  {image.title}
                </h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </GalleryMotion>
  );
}
