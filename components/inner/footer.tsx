import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { BookingCta } from "@/components/ui/booking-cta";
import { footerNavigation, innerFooter } from "@/data/inner/footer";
import { ui } from "@/data/inner/ui";
import { getFooterContent } from "@/data/footer";
import type { Language } from "@/data/site";
import { getBookingHref } from "@/lib/booking";

export function InnerFooter({
  lang,
  path,
  flush = false,
}: {
  lang: Language;
  path: string;
  flush?: boolean;
}) {
  const otherLanguage = lang === "en" ? "ar" : "en";
  const { wordmark } = getFooterContent(lang);

  return (
    <footer
      className={cn("bg-ink text-ivory", !flush && "mt-16 min-[900px]:mt-20")}
    >
      <div className="mx-auto w-[min(calc(100%-40px),1370px)] min-[600px]:w-[min(calc(100%-64px),1370px)]">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-ivory/20 py-8">
          <Link
            href={`/${lang}`}
            aria-label={`${innerFooter.brand[lang]} · ${ui.home[lang]}`}
            className="inline-flex min-h-11 max-w-full items-center gap-4 rounded-sm"
          >
            <Image
              src="/branding/icon-white.svg"
              alt=""
              width={1002}
              height={902}
              className="h-10 w-auto"
              sizes="45px"
            />
            <Image
              src={wordmark.src}
              alt=""
              width={wordmark.width}
              height={wordmark.height}
              className="h-auto w-48 max-w-full min-[600px]:w-56"
              sizes="(min-width: 600px) 224px, 192px"
            />
          </Link>
          <p className="text-sm text-ivory/70">{ui.footer[lang]}</p>
        </div>

        <div className="grid gap-x-8 gap-y-10 py-10 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-[1fr_1fr_1.2fr] min-[1000px]:gap-16 min-[1000px]:py-12">
          {footerNavigation.map((group) => (
            <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
              <h2
                id={`footer-${group.id}`}
                className="mb-3 text-sm font-medium text-ivory/65"
              >
                {group.label[lang]}
              </h2>
              <ul>
                {group.links.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${lang}${item.slug ? `/${item.slug}` : ""}`}
                      aria-current={path === item.slug ? "page" : undefined}
                      className="inline-flex min-h-11 items-center rounded-sm py-2 text-sm leading-relaxed transition-colors duration-200 hover:text-white hover:underline hover:underline-offset-4 aria-[current=page]:underline aria-[current=page]:underline-offset-4 motion-reduce:transition-none"
                    >
                      {item.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="min-[600px]:col-span-2 min-[1000px]:col-span-1">
            <h2 className="text-2xl font-normal tracking-tight rtl:tracking-normal">
              {innerFooter.contact[lang]}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
              {innerFooter.contactBody[lang]}
            </p>
            <BookingCta
              href={getBookingHref(lang)}
              label={ui.book[lang]}
              target="_blank"
              rel="noreferrer"
              className="mt-6 bg-ivory text-espresso hover:bg-white"
            />
            <div className="mt-3">
              <Link
                href={`/${lang}/contact`}
                aria-current={path === "contact" ? "page" : undefined}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm hover:underline hover:underline-offset-4"
              >
                {innerFooter.contactLink[lang]}
                <ArrowUpRight
                  size={16}
                  className="rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-ivory/20 py-5 text-xs text-ivory/70">
          <p>
            © {new Date().getFullYear()} {innerFooter.brand[lang]}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href={`/${otherLanguage}/${path}`}
              hrefLang={otherLanguage}
              lang={otherLanguage}
              className="inline-flex min-h-11 items-center rounded-full border border-ivory/25 px-4 text-ivory hover:border-ivory/60"
            >
              {otherLanguage === "ar" ? "العربية" : "English"}
            </Link>
            <a
              href="#top"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm hover:text-white"
            >
              {innerFooter.backToTop[lang]}
              <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
