import Image from "next/image";
import { BookingCta } from "@/components/ui/booking-cta";
import type { BookingBannerContent } from "@/data/booking-banner";

export function BookingBanner({
  content,
  bookingHref,
}: {
  content: BookingBannerContent;
  bookingHref: string;
}) {
  return (
    <section
      aria-labelledby="booking-banner-title"
      className="bg-white px-4 pb-16 min-[700px]:px-8 min-[700px]:pb-24"
    >
      <div className="relative isolate mx-auto flex min-h-[400px] max-w-[1600px] items-center justify-center overflow-hidden rounded-[24px] bg-espresso px-5 py-16 min-[700px]:min-h-[480px] min-[700px]:rounded-[28px] min-[1200px]:min-h-[530px]">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes="(min-width: 1664px) 1600px, (min-width: 700px) calc(100vw - 64px), calc(100vw - 32px)"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-espresso/65" aria-hidden="true" />
        <div className="flex w-full max-w-[850px] flex-col items-center text-center text-ivory">
          <p className="mb-5 flex items-center justify-center gap-2.5 text-sm">
            <span className="size-[5px] shrink-0 rounded-full bg-current" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h2
            id="booking-banner-title"
            className="whitespace-pre-line text-balance text-[clamp(2rem,3.8vw,4rem)] font-normal leading-[1.12] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            {content.title}
          </h2>
          <BookingCta
            href={bookingHref}
            label={content.bookingLabel}
            target="_blank"
            rel="noreferrer"
            className="mt-8 bg-ivory text-espresso hover:bg-white focus-visible:outline-ivory [&>span:first-child]:bg-espresso [&>span:first-child]:text-ivory min-[700px]:mt-9"
          />
        </div>
      </div>
    </section>
  );
}
