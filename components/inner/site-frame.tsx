import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import type { Language } from "@/data/site";
import { navigation, ui } from "@/data/inner-pages";
import { getBookingHref } from "@/lib/booking";
import { BookingCta } from "@/components/ui/booking-cta";
import styles from "./inner.module.css";

function Logo({ lang }: { lang: Language }) {
  return <Link href={`/${lang}`} className={styles.logo} aria-label={`Royal Longevity · ${ui.home[lang]}`}><Image src="/branding/icon-gold.png" alt="" width={40} height={40} className={styles.logoIcon} /><span className={styles.wordmark}><Image src={`/branding/text-${lang === "ar" ? "arabic" : "english"}-black.png`} alt="Royal Longevity" fill sizes="165px" /></span></Link>;
}

export function SiteFrame({ lang, path, children }: { lang: Language; path: string; children: React.ReactNode }) {
  const other = lang === "en" ? "ar" : "en";
  return <div className={styles.site}>
    <a href="#page-content" className={styles.skip}>{ui.skip[lang]}</a>
    <header className={styles.header}>
      <Logo lang={lang} />
      <nav className={styles.desktopNav} aria-label={ui.menu[lang]}>{navigation.map((item) => <Link key={item.slug} href={`/${lang}/${item.slug}`} aria-current={path === item.slug ? "page" : undefined}>{item.label[lang]}</Link>)}</nav>
      <div className={styles.headerActions}>
        <Link className={styles.language} href={`/${other}/${path}`} hrefLang={other} lang={other} aria-label={other === "ar" ? "العربية" : "English"}>{other.toUpperCase()}</Link>
        <details className={styles.menu}><summary aria-label={ui.menu[lang]}><Menu size={20} /></summary><nav aria-label={ui.menu[lang]}><Link href={`/${lang}`}>{ui.home[lang]}</Link>{[...navigation, { slug: "services", label: ui.all }, { slug: "salon", label: ui.salon }].map((item) => <Link key={item.slug} href={`/${lang}/${item.slug}`}>{item.label[lang]}<ArrowRight size={16} aria-hidden="true" /></Link>)}</nav></details>
        <a className={styles.headerBook} href="#appointment">{ui.book[lang]}<ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </header>
    <main id="page-content" className={styles.main}>{children}
      <section className={styles.banner}><div><h2>{ui.ready[lang]}</h2><p>{ui.readyBody[lang]}</p></div><BookingCta href={getBookingHref(lang)} label={ui.book[lang]} target="_blank" rel="noreferrer" /></section>
    </main>
    <footer className={styles.footer}><div><Logo lang={lang} /><p>{ui.footer[lang]}</p></div><nav aria-label={ui.menu[lang]}><Link href={`/${lang}`}>{ui.home[lang]}</Link>{navigation.map((item) => <Link key={item.slug} href={`/${lang}/${item.slug}`}>{item.label[lang]}</Link>)}<Link href={`/${lang}/services`}>{ui.all[lang]}</Link><Link href={`/${lang}/faq`}>{ui.allFaq[lang]}</Link></nav><p className={styles.copyright}>© Royal Longevity</p></footer>
  </div>;
}
