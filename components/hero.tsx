import { HeroMenu } from "@/components/hero-menu";
import { getHeroMenuContent } from "@/data/hero-menu";
import { Star } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { BookingCta } from "@/components/ui/booking-cta";
import { Badge } from "@/components/ui/badge";
import { LaurelLeft } from "@/components/icons/laurel-left";
import { LaurelRight } from "@/components/icons/laurel-right";
import { AnimatedTitle } from "@/components/ui/animated-title";
import type { HeroContent, Language } from "@/data/site";
import { cn } from "@/lib/utils";

type HeroProps = {
  content: HeroContent;
  lang: Language;
};

export function Hero({ content, lang }: HeroProps) {
  const otherLang = lang === "en" ? "ar" : "en";
  const otherLangLabel = lang === "en" ? "AR" : "EN";

  return (
    <div className="p-5 min-[1100px]:p-[14px]">
      <div
        className="w-[min(100%,1730px)] mx-auto flex flex-col gap-[18px] min-[1100px]:min-h-[calc(100svh-28px)] min-[1100px]:grid min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(600px,1fr)] min-[1100px]:gap-10"
        id="top"
      >
        <section
          className="flex flex-col gap-[18px] min-[1100px]:min-w-0 min-[1100px]:grid min-[1100px]:grid-rows-[auto_1fr_auto] min-[1100px]:gap-0"
          aria-labelledby="hero-title"
        >
          <nav
            className="relative z-30 flex items-center justify-between"
            aria-label={getHeroMenuContent(lang).label}
          >
            <a
              className="inline-flex h-12 items-center rounded-full px-[17px] py-2"
              href="#top"
              aria-label="Royal Longevity home"
            >
              <BrandLogo lang={lang} />
            </a>
            <div className="flex gap-2">
              <IconButton
                href={`/${otherLang}`}
                aria-label={`Change language to ${otherLang}`}
              >
                {otherLangLabel}
              </IconButton>
              <HeroMenu
                content={getHeroMenuContent(lang)}
                bookingHref={content.bookingHref}
                bookingLabel={content.bookingLabel}
              />
            </div>
          </nav>

          <div className="pt-[44px] px-3 pb-4 text-center min-[700px]:self-center min-[700px]:px-9 min-[700px]:py-0">
            <Badge
              variant="outline"
              icon="⌖"
              className="mb-[22px] opacity-0 animate-blur-fade-in"
              style={{ animationDelay: "150ms" }}
            >
              {content.location}
            </Badge>
            <h1
              className="max-w-[700px] mx-auto font-sans text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-.035em] text-balance"
              id="hero-title"
            >
              <AnimatedTitle text={content.title} lang={lang} />
            </h1>
            <p
              className="max-w-[500px] mt-[19px] mx-auto text-[#654b37] text-[15px] leading-[1.6] opacity-0 animate-blur-fade-in"
              style={{ animationDelay: "600ms" }}
            >
              {content.description}
            </p>
            <div
              className="flex flex-col items-center gap-4 mt-[22px] opacity-0 animate-blur-fade-in"
              style={{ animationDelay: "750ms" }}
            >
              <Badge variant="ghost" icon="✦">
                {content.trustSignal}
              </Badge>
              <BookingCta
                href={content.bookingHref}
                label={content.bookingLabel}
                target="_blank"
                rel="noreferrer"
              />
            </div>
          </div>
          <div
            className="@container w-full max-w-full mb-6 min-[700px]:mb-8 min-[700px]:self-end opacity-0 animate-blur-fade-in"
            style={{ animationDelay: "900ms" }}
          >
            <section
              className="flex flex-col items-center justify-between gap-6 rounded-[24px] border border-border px-5 py-6 @[520px]:flex-row @[520px]:gap-4 @[520px]:px-7"
              aria-label="Royal Longevity experience"
            >
              <div className="flex shrink-0 items-center justify-center gap-2">
                <LaurelLeft
                  className="h-[38px] w-auto text-espresso rtl:-scale-x-100"
                  aria-hidden="true"
                />
                <div className="text-center text-[18px] leading-[1.35] text-espresso">
                  <div>{content.badgeLine1}</div>
                  <div>{content.badgeLine2}</div>
                </div>
                <LaurelRight
                  className="h-[38px] w-auto text-espresso rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </div>

              <div className="grid w-full grid-cols-3 items-center @[520px]:w-auto @[520px]:min-w-[300px]">
                {content.highlights.map((highlight, index) => (
                  <div
                    className={cn(
                      "grid gap-1 px-2 text-center @[520px]:px-4",
                      index > 0 && "border-s border-border",
                    )}
                    key={highlight.label}
                  >
                    <strong
                      className="text-[25px] font-normal leading-tight text-espresso"
                      dir="ltr"
                    >
                      {highlight.value}
                    </strong>
                    {highlight.stars ? (
                      <span
                        className="flex min-h-[18px] items-center justify-center gap-[2px] text-espresso"
                        role="img"
                        aria-label={highlight.label}
                      >
                        {Array.from({ length: 5 }, (_, star) => (
                          <Star
                            key={star}
                            className="size-3"
                            fill="currentColor"
                            strokeWidth={0}
                            aria-hidden="true"
                          />
                        ))}
                      </span>
                    ) : (
                      <span className="text-[14px] leading-[20px] text-[#71522f]">
                        {highlight.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section
          className="relative h-[clamp(340px,90vw,560px)] rounded-[26px] overflow-hidden bg-espresso min-[700px]:h-full min-[700px]:min-h-[600px] min-[700px]:rounded-[28px]"
          aria-label={content.imageAlt}
        >
          <video
            src="/hero-video.mp4"
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            className="absolute top-1/2 left-0 w-full h-auto -translate-y-1/2 opacity-0 animate-video-zoom-out"
            aria-label={content.imageAlt}
          />
        </section>
      </div>
    </div>
  );
}
