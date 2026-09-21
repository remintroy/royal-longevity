import Image from "next/image";
import { BookingCta } from "@/components/ui/booking-cta";
import type { CuratedServicesContent } from "@/data/curated-services";
import { ImageMarquee } from "@/components/ui/image-marquee";

const imageHeights = [
  "h-[240px] min-[700px]:h-[clamp(300px,23.5vw,405px)]",
  "h-[212px] min-[700px]:h-[clamp(260px,20.8vw,360px)]",
  "h-[160px] min-[700px]:h-[clamp(200px,15.6vw,270px)]",
  "h-[212px] min-[700px]:h-[clamp(260px,20.8vw,360px)]",
  "h-[160px] min-[700px]:h-[clamp(200px,15.6vw,270px)]",
  "h-[240px] min-[700px]:h-[clamp(300px,23.5vw,405px)]",
  "h-[212px] min-[700px]:h-[clamp(260px,20.8vw,360px)]",
];

export function CuratedServices({ content, bookingHref }: { content: CuratedServicesContent; bookingHref: string }) {
  const stripImages = content.images.length ? [content.images[content.images.length - 1], ...content.images] : [];

  return (
    <section id="curated-services" aria-labelledby="curated-services-title" className="overflow-hidden bg-ink pb-8 pt-20 text-ivory min-[700px]:pt-28 min-[1200px]:pt-36">
      <header className="mx-auto flex max-w-[960px] flex-col items-center px-4 text-center min-[700px]:px-8">
        <p className="mb-5 flex items-center justify-center gap-2.5 text-sm">
          <span className="size-[5px] rounded-full bg-current" aria-hidden="true" />
          {content.eyebrow}
        </p>
        <h2 id="curated-services-title" className="text-balance text-[clamp(2.5rem,4.2vw,4.5rem)] font-normal leading-[1.12] tracking-[-.045em] rtl:leading-[1.4] rtl:tracking-normal">
          {content.title}
        </h2>
        <p className="mt-6 whitespace-pre-line text-pretty text-lg leading-[1.4] text-ivory/70 min-[700px]:text-2xl rtl:leading-[1.7]">
          {content.description}
        </p>
        <BookingCta
          href={bookingHref}
          label={content.bookingLabel}
          target="_blank"
          rel="noreferrer"
          className="mt-8 bg-ivory text-espresso hover:bg-white focus-visible:outline-ivory [&>span:first-child]:bg-ink [&>span:first-child]:text-ivory min-[700px]:mt-9"
        />
        <p className="mt-4 text-sm leading-relaxed text-ivory/70">{content.enquiryNote}</p>
      </header>
      <ImageMarquee controls={content.marqueeControls}>
          {stripImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className={`relative w-[160px] shrink-0 overflow-hidden rounded-[24px] min-[700px]:w-[clamp(200px,15.6vw,320px)] ${imageHeights[index % imageHeights.length]}`}>
              <Image src={image.src} alt="" fill sizes="(min-width: 700px) clamp(200px, 15.6vw, 320px), 160px" className="object-cover" />
            </div>
          ))}
      </ImageMarquee>
    </section>
  );
}
