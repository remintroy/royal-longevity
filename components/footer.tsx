import { Location } from "@/components/location";
import { getLocationContent } from "@/data/location";
import type { Language } from "@/data/site";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { BookingCta } from "@/components/ui/booking-cta";
import type { FooterContent } from "@/data/footer";

const linkClassName =
  "inline-flex min-h-11 items-center rounded-sm text-xl leading-snug transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory min-[1000px]:text-2xl";

export function Footer({
  content,
  bookingHref,
  lang,
}: {
  content: FooterContent;
  bookingHref: string;
  lang: Language;
}) {
  return (
    <footer>
      <Location content={getLocationContent(lang)} bookingHref={bookingHref} />
      <div className="border-t border-ivory/20 bg-ink px-4 pb-4 pt-14 text-ivory min-[700px]:px-8 min-[700px]:pb-6 min-[700px]:pt-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 px-2 min-[700px]:grid-cols-2 min-[700px]:px-6 min-[1000px]:grid-cols-[2fr_1fr_1fr] min-[1000px]:gap-16">
            <div className="min-[700px]:col-span-2 min-[1000px]:col-span-1">
              <p className="mb-5 text-sm">{content.eyebrow}</p>
              <h2 className="whitespace-pre-line text-[clamp(2rem,3.8vw,4rem)] font-normal leading-[1.12] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal">
                {content.title}
              </h2>
              <BookingCta
                href={bookingHref}
                label={content.bookingLabel}
                target="_blank"
                rel="noreferrer"
                className="mt-8 bg-ivory text-espresso hover:bg-white focus-visible:outline-ivory [&>span:first-child]:bg-ink [&>span:first-child]:text-ivory"
              />
            </div>
            <nav aria-label={content.menuLabel}>
              <p className="mb-3 text-sm text-ivory/65">{content.menuLabel}</p>
              <ul>
                {content.menu.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={linkClassName}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <nav aria-label={content.exploreLabel}>
                <p className="mb-3 text-sm text-ivory/65">
                  {content.exploreLabel}
                </p>
                <ul>
                  {content.explore.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={linkClassName}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-8">
                <p className="mb-3 text-sm text-ivory/65">
                  {content.contactLabel}
                </p>
                <a
                  href={bookingHref}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClassName}
                >
                  {content.contactAction}
                </a>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ivory/65">
                  {content.contactDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-2 pb-3 text-xs min-[700px]:mt-28 min-[700px]:px-6 min-[1000px]:mt-44">
            <p>
              © {new Date().getFullYear()} {content.copyright}
            </p>
            <a
              href="#top"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory hover:text-white"
            >
              {content.backToTop}
              <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="relative isolate flex min-h-[200px] items-center justify-center overflow-hidden rounded-[24px] px-5 py-12 min-[700px]:min-h-[300px] min-[700px]:rounded-[28px] min-[700px]:px-12 min-[1200px]:min-h-[380px]">
            <Image
              src="/assets/images/introduction-lounge.webp"
              alt=""
              fill
              sizes="(min-width: 1664px) 1600px, 100vw"
              className="-z-20 object-cover"
            />
            <div
              className="absolute inset-0 -z-10 bg-ink/55"
              aria-hidden="true"
            />
            <div
              className="flex w-full items-center justify-center gap-4 min-[700px]:gap-8"
              dir="ltr"
            >
              <Image
                src="/branding/icon-white.png"
                alt=""
                width={1000}
                height={900}
                sizes="(min-width: 700px) 16vw, 18vw"
                className="h-auto w-[18%] max-w-[230px] shrink-0"
              />
              <Image
                src={content.wordmark.src}
                alt={content.brandAlt}
                width={content.wordmark.width}
                height={content.wordmark.height}
                sizes="(min-width: 1664px) 1200px, 70vw"
                className="h-auto min-w-0 w-[76%]"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
