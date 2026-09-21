import { Experience } from "@/components/experience";
import { getExperienceContent } from "@/data/experience";
import { notFound } from "next/navigation";
import { getHeroContent, getMarqueeContent } from "@/data/site";
import { IconButton } from "@/components/ui/icon-button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { BookingCta } from "@/components/ui/booking-cta";
import { Badge } from "@/components/ui/badge";
import { LaurelLeft } from "@/components/icons/laurel-left";
import { LaurelRight } from "@/components/icons/laurel-right";
import { Marquee } from "@/components/ui/marquee";
import { AnimatedTitle } from "@/components/ui/animated-title";
import { Introduction } from "@/components/introduction";
import { getIntroductionContent } from "@/data/introduction";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  const heroContent = getHeroContent(lang);
  const marqueeItems = getMarqueeContent(lang);

  const otherLang = lang === "en" ? "ar" : "en";
  const otherLangLabel = lang === "en" ? "AR" : "EN";

  return (
    <main className="min-h-[100svh] overflow-hidden">
      <div className="p-5 min-[700px]:p-[14px]">
      <div className="w-[min(100%,1730px)] mx-auto flex flex-col gap-[18px] min-[700px]:min-h-[calc(100svh-28px)] min-[700px]:grid min-[700px]:grid-cols-[minmax(0,1fr)_minmax(600px,1fr)] min-[700px]:gap-10" id="top">
        <section className="flex flex-col gap-[18px] min-[700px]:min-w-0 min-[700px]:grid min-[700px]:grid-rows-[auto_1fr_auto] min-[700px]:gap-0" aria-labelledby="hero-title">
          <nav className="flex items-center justify-between" aria-label="Primary navigation">
            <a className="inline-flex h-12 items-center border border-espresso/16 rounded-full px-[17px] py-2" href="#top" aria-label="Royal Longevity home">
              <BrandLogo lang={lang} />
            </a>
            <div className="flex gap-2">
              <IconButton href={`/${otherLang}`} aria-label={`Change language to ${otherLang}`}>
                {otherLangLabel}
              </IconButton>
              <IconButton type="button" className="gap-1" aria-label="Open menu">
                <span className="block w-[19px] h-[1px] rounded-[1px] bg-current" />
                <span className="block w-[19px] h-[1px] rounded-[1px] bg-current" />
                <span className="block w-[19px] h-[1px] rounded-[1px] bg-current" />
              </IconButton>
            </div>
          </nav>

          <div className="pt-[44px] px-3 pb-4 text-center min-[700px]:self-center min-[700px]:px-9 min-[700px]:py-0">
            <Badge variant="outline" icon="⌖" className="mb-[22px] opacity-0 animate-blur-fade-in" style={{ animationDelay: "150ms" }}>
              {heroContent.location}
            </Badge>
            <h1 className="max-w-[700px] mx-auto font-sans text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-.035em] text-balance" id="hero-title">
              <AnimatedTitle text={heroContent.title} lang={lang} />
            </h1>
            <p className="max-w-[500px] mt-[19px] mx-auto text-[#654b37] text-[15px] leading-[1.6] opacity-0 animate-blur-fade-in" style={{ animationDelay: "600ms" }}>
              {heroContent.description}
            </p>
            <div className="flex flex-col items-center gap-4 mt-[22px] opacity-0 animate-blur-fade-in" style={{ animationDelay: "750ms" }}>
              <Badge variant="ghost" icon="✦">
                {heroContent.trustSignal}
              </Badge>
              <BookingCta
                href={heroContent.bookingHref}
                label={heroContent.bookingLabel}
                target="_blank"
                rel="noreferrer"
              />
            </div>
          </div>
          <div className="w-full max-w-full overflow-hidden min-[700px]:self-end opacity-0 animate-blur-fade-in" style={{ animationDelay: "900ms" }}>
            <Marquee items={marqueeItems} />
          </div>
        </section>

        <section className="relative h-[clamp(340px,90vw,560px)] rounded-[26px] overflow-hidden bg-espresso min-[700px]:h-full min-[700px]:min-h-[600px] min-[700px]:rounded-[28px]" aria-label={heroContent.imageAlt}>
          <video
            src="/hero-video.mp4"
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            className="absolute top-1/2 left-0 w-full h-auto -translate-y-1/2 opacity-0 animate-video-zoom-out"
            aria-label={heroContent.imageAlt}
          />
        </section>
      </div>

      <div className="w-[min(100%,1730px)] mx-auto mt-[20px] min-[700px]:mt-[40px] mb-[20px] min-[700px]:mb-[40px] px-0">
        <section className="flex flex-col gap-6 px-4 py-6 border border-espresso/16 rounded-[22px] min-[700px]:flex-row min-[700px]:items-center min-[700px]:justify-between min-[700px]:px-8 min-[700px]:py-4 min-[700px]:rounded-[100px]" aria-label="Royal Longevity experience">
          <div className="flex items-center justify-center gap-3">
            <LaurelLeft className="h-[38px] min-[700px]:h-[42px] w-auto text-espresso rtl:-scale-x-100" aria-hidden="true" />
            <div className="text-center text-espresso leading-[1.1]">
              <div className="text-[17px] min-[700px]:text-[19px]">{heroContent.badgeLine1}</div>
              <div className="text-[17px] min-[700px]:text-[19px]">{heroContent.badgeLine2}</div>
            </div>
            <LaurelRight className="h-[38px] min-[700px]:h-[42px] w-auto text-espresso rtl:-scale-x-100" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-center">
            {heroContent.highlights.map((highlight, index) => (
              <div className="flex items-center" key={highlight.value}>
                {index > 0 && (
                  <div className="w-[1px] h-10 bg-espresso/14 mx-4 min-[700px]:mx-6" aria-hidden="true" />
                )}
                <div className="text-center grid gap-[2px] min-[700px]:gap-[4px]">
                  <strong className="text-[18px] font-normal min-[700px]:text-[22px] text-espresso">
                    {highlight.value}
                  </strong>
                  <span className="text-[#71522f] text-[10px] leading-[1.25] min-[700px]:text-[11px] whitespace-nowrap">
                    {highlight.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
      <Introduction content={getIntroductionContent(lang)} />
      <Experience content={getExperienceContent(lang)} bookingHref={heroContent.bookingHref} />
    </main>
  );
}
