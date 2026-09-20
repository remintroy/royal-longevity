import Image from "next/image";
import { getHeroContent, Language } from "@/data/site";
import { IconButton } from "@/components/ui/icon-button";
import { BookingCta } from "@/components/ui/booking-cta";
import { Badge } from "@/components/ui/badge";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const heroContent = getHeroContent(lang);
  
  const otherLang = lang === "en" ? "ar" : "en";
  const otherLangLabel = lang === "en" ? "AR" : "EN";

  return (
    <main className="min-h-[100svh] p-5 overflow-hidden min-[700px]:p-[14px]">
      <div className="w-[min(100%,1430px)] mx-auto flex flex-col gap-[18px] min-[700px]:min-h-[calc(100svh-28px)] min-[700px]:grid min-[700px]:grid-cols-[minmax(0,1fr)_minmax(600px,1fr)] min-[700px]:gap-10" id="top">
        <section className="flex flex-col gap-[18px] min-[700px]:min-w-0 min-[700px]:grid min-[700px]:grid-rows-[auto_1fr_auto] min-[700px]:gap-0" aria-labelledby="hero-title">
          <nav className="flex items-center justify-between" aria-label="Primary navigation">
            <a className="inline-flex h-12 items-center border border-espresso/16 rounded-full px-[17px] py-2 bg-ivory/72" href="#top" aria-label="Royal Longevity home">
              <Image className="w-[126px] h-auto min-[700px]:w-[156px]" src="/branding/royal-longevity-beauty-logo.png" alt="Royal Longevity Beauty" width={156} height={51} priority />
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
            <Badge variant="outline" icon="⌖" className="mb-[22px]">
              {heroContent.location}
            </Badge>
            <h1 className="max-w-[700px] mx-auto font-serif text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-.035em] text-balance" id="hero-title">
              {heroContent.title}
            </h1>
            <p className="max-w-[500px] mt-[19px] mx-auto text-[#654b37] text-[15px] leading-[1.6]">
              {heroContent.description}
            </p>
            <div className="flex flex-col items-center gap-4 mt-[22px]">
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

          <section className="grid grid-cols-3 px-2 py-[18px] border border-espresso/16 rounded-[22px] bg-ivory/60 min-[700px]:self-end min-[700px]:px-4 min-[700px]:py-6 min-[700px]:rounded-[24px]" aria-label="Royal Longevity experience">
            {heroContent.highlights.map((highlight) => (
              <div className="group grid gap-[5px] px-2 text-center border-s border-espresso/14 first:border-s-0 cursor-default transition-transform duration-300 hover:-translate-y-[2px]" key={highlight.value}>
                <strong className="font-serif text-[17px] font-normal min-[700px]:text-[21px] transition-colors duration-300 group-hover:text-gold">{highlight.value}</strong>
                <span className="text-[#71522f] text-[10px] leading-[1.25] transition-colors duration-300 group-hover:text-[#654b37]">{highlight.label}</span>
              </div>
            ))}
          </section>
        </section>

        <section className="h-[clamp(340px,90vw,560px)] rounded-[26px] overflow-hidden bg-espresso min-[700px]:h-full min-[700px]:min-h-[600px] min-[700px]:rounded-[28px]" aria-label={heroContent.imageAlt}>
          <div className="grid w-full h-full place-content-center relative isolate text-ivory/70 text-xs tracking-[.11em] uppercase before:absolute before:-z-10 before:content-[''] before:rounded-full before:blur-[5px] before:w-[55%] before:aspect-square before:-top-[18%] before:start-[6%] before:bg-[#6a4122] after:absolute after:-z-10 after:content-[''] after:rounded-full after:blur-[5px] after:w-[45%] after:aspect-square after:end-[8%] after:-bottom-[30%] after:bg-[#b38327] after:opacity-55" role="img" aria-label={heroContent.imageAlt}>
            <span>Hero image placeholder</span>
          </div>
        </section>
      </div>
    </main>
  );
}
