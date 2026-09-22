import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import type { Language } from "@/data/site";
import { navigation, ui } from "@/data/inner/ui";
import { getBookingHref } from "@/lib/booking";
import { BookingCta } from "@/components/ui/booking-cta";

function Logo({ lang }: { lang: Language }) {
  return (
    <Link
      href={`/${lang}`}
      className="flex shrink-0 items-center gap-[9px]"
      aria-label={`Royal Longevity · ${ui.home[lang]}`}
    >
      <Image
        src="/branding/icon-gold.png"
        alt=""
        width={40}
        height={40}
        className="size-9 object-contain max-[380px]:w-7"
      />
      <span className="relative h-[37px] w-[155px] overflow-hidden max-[380px]:w-32">
        <Image
          className="object-cover"
          src={`/branding/text-${lang === "ar" ? "arabic" : "english"}-black.png`}
          alt="Royal Longevity"
          fill
          sizes="165px"
        />
      </span>
    </Link>
  );
}

type SiteFrameProps = {
  lang: Language;
  path: string;
  children: React.ReactNode;
};

export function SiteFrame({ lang, path, children }: SiteFrameProps) {
  const otherLanguage = lang === "en" ? "ar" : "en";
  return (
    <div className="min-h-screen bg-[color-mix(in_srgb,var(--color-ivory)_22%,white)] text-espresso [&_:is(a,button,summary,input,select):focus-visible]:outline-2 [&_:is(a,button,summary,input,select):focus-visible]:outline-gold [&_:is(a,button,summary,input,select):focus-visible]:outline-offset-5">
      <a
        href="#page-content"
        className="fixed start-5 -top-[100px] z-100 rounded-full bg-espresso px-6 py-[15px] text-white focus:top-2.5"
      >
        {ui.skip[lang]}
      </a>
      <header className="mx-auto flex max-w-[1460px] items-center justify-between gap-5 px-6 py-5 max-[380px]:gap-2.5 max-[380px]:px-[18px] min-[1150px]:px-8 min-[1150px]:py-[22px]">
        <Logo lang={lang} />
        <nav
          className="hidden min-[1150px]:flex min-[1150px]:gap-[25px] min-[1150px]:text-xs"
          aria-label={ui.menu[lang]}
        >
          {navigation.map((item) => (
            <Link
              className="py-2.5 hover:underline hover:underline-offset-[7px] aria-[current=page]:underline aria-[current=page]:decoration-gold aria-[current=page]:underline-offset-[9px]"
              key={item.slug}
              href={`/${lang}/${item.slug}`}
              aria-current={path === item.slug ? "page" : undefined}
            >
              {item.label[lang]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-border text-xs"
            href={`/${otherLanguage}/${path}`}
            hrefLang={otherLanguage}
            lang={otherLanguage}
            aria-label={otherLanguage === "ar" ? "العربية" : "English"}
          >
            {otherLanguage.toUpperCase()}
          </Link>
          <details className="group/menu relative">
            <summary
              className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-border text-xs group-open/menu:bg-ivory [&::-webkit-details-marker]:hidden"
              aria-label={ui.menu[lang]}
            >
              <Menu size={20} />
            </summary>
            <nav
              className="absolute end-0 top-[55px] z-30 w-[min(300px,85vw)] rounded-3xl border border-border bg-[color-mix(in_srgb,var(--color-ivory)_22%,white)] p-4 shadow-[0_12px_30px_rgb(45_29_18/0.08)]"
              aria-label={ui.menu[lang]}
            >
              <Link
                className="flex items-center justify-between rounded-[10px] p-3 hover:bg-ivory"
                href={`/${lang}`}
              >
                {ui.home[lang]}
              </Link>
              {[
                ...navigation,
                { slug: "services", label: ui.all },
                { slug: "salon", label: ui.salon },
              ].map((item) => (
                <Link
                  className="flex items-center justify-between rounded-[10px] p-3 hover:bg-ivory"
                  key={item.slug}
                  href={`/${lang}/${item.slug}`}
                >
                  {item.label[lang]}
                  <ArrowRight
                    className="rtl:-scale-x-100"
                    size={16}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </details>
          <a
            className="hidden items-center gap-[18px] rounded-full bg-espresso px-5 py-[13px] text-xs text-ivory min-[600px]:flex"
            href="#appointment"
          >
            {ui.book[lang]}
            <ArrowRight
              className="rtl:-scale-x-100"
              size={17}
              aria-hidden="true"
            />
          </a>
        </div>
      </header>
      <main
        id="page-content"
        className="mx-auto w-[min(calc(100%-40px),1370px)] min-[600px]:w-[min(calc(100%-64px),1370px)]"
      >
        {children}
        <section className="my-[65px] flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-[color-mix(in_srgb,var(--color-ivory)_35%,white)] p-[30px] min-[900px]:p-10">
          <div>
            <h2 className="max-w-[760px] text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.13] font-normal tracking-[-.04em] text-balance rtl:leading-[1.4] rtl:tracking-normal">
              {ui.ready[lang]}
            </h2>
            <p className="leading-[1.65] mt-3 text-sm opacity-75">
              {ui.readyBody[lang]}
            </p>
          </div>
          <BookingCta
            href={getBookingHref(lang)}
            label={ui.book[lang]}
            target="_blank"
            rel="noreferrer"
          />
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1460px] flex-wrap items-center justify-between gap-[25px] border-t border-border px-6 pt-10 pb-[25px]">
        <div>
          <Logo lang={lang} />
          <p className="leading-[1.65] mt-3 text-xs opacity-65">
            {ui.footer[lang]}
          </p>
        </div>
        <nav
          className="flex max-w-[650px] flex-wrap gap-x-[23px] gap-y-2.5 text-xs"
          aria-label={ui.menu[lang]}
        >
          <Link
            className="py-2.5 hover:underline hover:underline-offset-[7px]"
            href={`/${lang}`}
          >
            {ui.home[lang]}
          </Link>
          {navigation.map((item) => (
            <Link
              className="py-2.5 hover:underline hover:underline-offset-[7px]"
              key={item.slug}
              href={`/${lang}/${item.slug}`}
            >
              {item.label[lang]}
            </Link>
          ))}
          <Link
            className="py-2.5 hover:underline hover:underline-offset-[7px]"
            href={`/${lang}/services`}
          >
            {ui.all[lang]}
          </Link>
          <Link
            className="py-2.5 hover:underline hover:underline-offset-[7px]"
            href={`/${lang}/faq`}
          >
            {ui.allFaq[lang]}
          </Link>
        </nav>
        <p className="mt-5 basis-full text-[11px] opacity-55 leading-[1.65]">
          © Royal Longevity
        </p>
      </footer>
    </div>
  );
}
