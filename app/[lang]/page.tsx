import Image from "next/image";
import Link from "next/link";
import { getHeroContent, Language } from "@/data/site";

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
              <Link href={`/${otherLang}`} className="grid w-12 h-12 place-content-center border border-espresso/16 rounded-full bg-ivory/72 text-ink text-xs font-bold tracking-[.08em] cursor-pointer focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3 hover:bg-[#fceedc] transition-colors" aria-label={`Change language to ${otherLang}`}>
                {otherLangLabel}
              </Link>
              <button className="grid gap-1 w-12 h-12 place-content-center border border-espresso/16 rounded-full bg-ivory/72 text-ink text-xs font-bold tracking-[.08em] cursor-pointer focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3" type="button" aria-label="Open menu">
                <span className="block w-[19px] h-[1px] rounded-[1px] bg-current" />
                <span className="block w-[19px] h-[1px] rounded-[1px] bg-current" />
                <span className="block w-[19px] h-[1px] rounded-[1px] bg-current" />
              </button>
            </div>
          </nav>

          <div className="pt-[44px] px-3 pb-4 text-center min-[700px]:self-center min-[700px]:px-9 min-[700px]:py-0">
            <p className="inline-flex items-center gap-[7px] mb-[22px] px-[13px] py-[9px] border border-espresso/16 rounded-full text-[#654b37] text-xs">
              <span className="text-gold text-base" aria-hidden="true">⌖</span>{heroContent.location}
            </p>
            <h1 className="max-w-[700px] mx-auto font-serif text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-.035em] text-balance" id="hero-title">{heroContent.title}</h1>
            <p className="max-w-[500px] mt-[19px] mx-auto text-[#654b37] text-[15px] leading-[1.6]">{heroContent.description}</p>
            <div className="flex flex-col items-center gap-4 mt-[22px]">
              <p className="inline-flex items-center gap-[9px] m-0 text-[#654b37] text-[13px]">
                <span className="text-gold text-base" aria-hidden="true">✦</span>{heroContent.trustSignal}
              </p>
              <a className="group inline-flex items-center gap-[14px] min-h-[54px] ps-[7px] pe-[20px] py-[6px] rounded-full bg-espresso text-ivory text-sm font-bold no-underline transition-all duration-200 ease-in-out hover:bg-[#422b1b] active:scale-[.98] focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3" href={heroContent.bookingHref} target="_blank" rel="noreferrer">
                <span className="grid w-10 h-10 place-content-center rounded-full bg-ivory text-espresso text-[20px] transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] rtl:-scale-x-100 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] rtl:group-hover:-translate-x-[3px]" aria-hidden="true">↗</span>
                <span>{heroContent.bookingLabel}</span>
              </a>
            </div>
          </div>

          <section className="grid grid-cols-3 px-2 py-[18px] border border-espresso/16 rounded-[22px] bg-ivory/60 min-[700px]:self-end min-[700px]:px-4 min-[700px]:py-6 min-[700px]:rounded-[24px]" aria-label="Royal Longevity experience">
            {heroContent.highlights.map((highlight) => (
              <div className="grid gap-[5px] px-2 text-center border-s border-espresso/14 first:border-s-0" key={highlight.value}>
                <strong className="font-serif text-[17px] font-normal min-[700px]:text-[21px]">{highlight.value}</strong>
                <span className="text-[#71522f] text-[10px] leading-[1.25]">{highlight.label}</span>
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
