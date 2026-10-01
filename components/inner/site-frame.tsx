import { HeroMenu } from "@/components/hero-menu";
import { BrandLogo } from "@/components/ui/brand-logo";
import { IconButton } from "@/components/ui/icon-button";
import { getInnerMenuContent } from "@/data/catalogue/navigation";
import { InnerFooter } from "./footer";
import Link from "next/link";
import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import { getBookingHref } from "@/lib/booking";

type SiteFrameProps = {
  lang: Language;
  path: string;
  children: React.ReactNode;
  flushFooter?: boolean;
};

export function SiteFrame({
  lang,
  path,
  children,
  flushFooter = false,
}: SiteFrameProps) {
  const otherLanguage = lang === "en" ? "ar" : "en";
  const innerMenuContent = getInnerMenuContent(lang);
  return (
    <div className="@container min-h-screen bg-[color-mix(in_srgb,var(--color-ivory)_22%,white)] text-espresso [&_:is(a,button,summary,input,select):focus-visible]:outline-2 [&_:is(a,button,summary,input,select):focus-visible]:outline-gold [&_:is(a,button,summary,input,select):focus-visible]:outline-offset-5">
      <a
        href="#page-content"
        className="fixed start-5 -top-[100px] z-100 rounded-full bg-espresso px-6 py-[15px] text-white focus:top-2.5"
      >
        {ui.skip[lang]}
      </a>
      <header
        id="top"
        className="mx-auto w-[min(calc(100%-40px),1370px)] py-5 min-[600px]:w-[min(calc(100%-64px),1370px)]"
      >
        <div className="relative z-30 flex items-center justify-between gap-2">
          <Link
            href={`/${lang}`}
            className="inline-flex h-12 shrink-0 items-center rounded-full px-[17px] py-2 max-[380px]:px-0"
            aria-label={`Royal Longevity · ${ui.home[lang]}`}
          >
            <BrandLogo lang={lang} />
          </Link>
          <div className="flex shrink-0 gap-2">
            <IconButton
              href={`/${otherLanguage}/${path}`}
              hrefLang={otherLanguage}
              lang={otherLanguage}
              aria-label={otherLanguage === "ar" ? "العربية" : "English"}
            >
              {otherLanguage.toUpperCase()}
            </IconButton>
            <HeroMenu
              content={innerMenuContent}
              bookingHref={getBookingHref(lang)}
              bookingLabel={ui.book[lang]}
            />
          </div>
        </div>
      </header>
      <main
        id="page-content"
        className="mx-auto w-[min(calc(100%-40px),1370px)] min-[600px]:w-[min(calc(100%-64px),1370px)]"
      >
        {children}
      </main>
      <InnerFooter lang={lang} path={path} flush={flushFooter} />
    </div>
  );
}
