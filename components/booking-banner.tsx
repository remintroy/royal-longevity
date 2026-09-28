import { getImageProps } from "next/image";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { BookingCta } from "@/components/ui/booking-cta";
import type { BookingBannerContent } from "@/data/booking-banner";

export function BookingBanner({
  content,
  bookingHref,
}: {
  content: BookingBannerContent;
  bookingHref: string;
}) {
  const sizes =
    "(min-width: 1664px) 1600px, (min-width: 1024px) calc(100vw - 64px), (min-width: 632px) 600px, calc(100vw - 32px)";
  const { props: desktop } = getImageProps({
    src: content.image.src,
    alt: content.image.alt,
    width: 2170,
    height: 725,
    sizes,
  });
  const { props: mobile } = getImageProps({
    src: content.image.mobileSrc,
    alt: content.image.alt,
    width: 1024,
    height: 1536,
    sizes,
  });

  return (
    <section
      aria-labelledby="booking-banner-title"
      className="bg-white px-4 pb-16 min-[700px]:px-8 min-[700px]:pb-24"
    >
      <div className="relative isolate mx-auto flex aspect-[2/3] min-h-[640px] w-full min-w-0 max-w-[600px] flex-col overflow-hidden rounded-[24px] bg-espresso px-6 py-12 min-[700px]:rounded-[28px] lg:aspect-auto lg:min-h-[360px] lg:max-w-[1600px] lg:justify-center lg:px-12 lg:py-12 xl:min-h-[440px] xl:px-16 2xl:min-h-[530px]">
        <picture className="absolute inset-0 -z-20">
          <source
            media="(min-width: 1024px)"
            srcSet={desktop.srcSet}
            sizes={sizes}
            width={2170}
            height={725}
          />
          {/* Next.js generates optimized sources; picture selects the composition without client JavaScript. */}
          <img
            {...mobile}
            alt={content.image.alt}
            className="h-full w-full object-cover object-bottom lg:object-center"
          />
        </picture>
        <div
          className="absolute inset-0 -z-10 bg-espresso/20"
          aria-hidden="true"
        />
        <div className="flex w-full flex-col items-center text-center text-ivory lg:w-[56%] lg:items-start lg:text-start lg:rtl:self-end">
          <p className="mb-5 flex items-center gap-2.5 text-sm">
            <span
              className="size-[5px] shrink-0 rounded-full bg-current"
              aria-hidden="true"
            />
            {content.eyebrow}
          </p>
          <RevealHeading
            id="booking-banner-title"
            className="whitespace-pre-line text-balance text-[clamp(1.875rem,3.2vw,3.25rem)] font-normal leading-[1.16] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            {content.title}
          </RevealHeading>
          <BookingCta
            href={bookingHref}
            label={content.bookingLabel}
            target="_blank"
            rel="noreferrer"
            className="mt-7 bg-ivory text-espresso hover:bg-white focus-visible:outline-ivory [&>span:first-child]:bg-espresso [&>span:first-child]:text-ivory lg:mt-9"
          />
        </div>
      </div>
    </section>
  );
}
