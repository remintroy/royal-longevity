import { RevealHeading } from "@/components/ui/reveal-heading";
import { ArrowUpRight } from "lucide-react";
import type { LocationContent } from "@/data/location";

export function Location({
  content,
  bookingHref,
}: {
  content: LocationContent;
  bookingHref: string;
}) {
  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="bg-ink px-4 pb-8 pt-16 text-ivory min-[700px]:px-8 min-[700px]:pt-20 min-[1200px]:pt-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <header className="text-center">
          <p className="mb-5 flex items-center justify-center gap-2.5 text-sm">
            <span
              className="motion-safe:animate-section-dot-pulse size-[6px] rounded-full bg-current"
              aria-hidden="true"
            />
            {content.eyebrow}
          </p>
          <RevealHeading
            id="location-title"
            className="text-balance text-[clamp(2rem,3.8vw,4rem)] font-normal leading-[1.12] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            {content.title}
          </RevealHeading>
        </header>

        <dl className="mx-auto my-10 grid max-w-[1360px] min-[700px]:my-16 min-[700px]:grid-cols-3 min-[1200px]:my-20">
          {content.details.map((detail) => (
            <div
              key={detail.label}
              className="border-ivory/20 px-5 py-6 text-center not-first:border-t min-[700px]:py-0 min-[700px]:not-first:border-s min-[700px]:not-first:border-t-0"
            >
              <dt className="mb-3 text-sm text-ivory/65">{detail.label}</dt>
              <dd className="whitespace-pre-line text-2xl leading-[1.15] tracking-[-.025em] min-[1000px]:text-[32px] rtl:leading-[1.5] rtl:tracking-normal">
                {detail.enquire ? (
                  <a
                    href={bookingHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-sm transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
                  >
                    {detail.value}
                    <span className="sr-only"> — WhatsApp</span>
                  </a>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="relative overflow-hidden rounded-[24px] border border-gold/40 bg-ivory min-[700px]:rounded-[28px]">
          <iframe
            src={content.mapEmbedHref}
            title={content.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[380px] w-full border-0 brightness-[.85] saturate-[.4] sepia-[.2] min-[700px]:h-[500px] min-[1200px]:h-[600px]"
          />
        </div>
        <div className="mt-4 flex flex-col items-start justify-between gap-3 min-[700px]:flex-row min-[700px]:items-center">
          <p className="text-xs leading-relaxed text-ivory/65">
            {content.mapNote}
          </p>
          <a
            href={content.mapHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-ivory/20 px-4 text-sm transition-colors duration-200 hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
          >
            {content.mapsLabel}
            <ArrowUpRight
              className="size-4 rtl:-scale-x-100"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
