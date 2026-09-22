import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, Plus, Sparkles, UserRound, MapPin } from "lucide-react";
import type { Language } from "@/data/site";
import { getGalleryContent } from "@/data/gallery";
import { getFaqContent } from "@/data/faq";
import { getLocationContent } from "@/data/location";
import { packages, services, ui, values, type InnerPage, type Service } from "@/data/inner-pages";
import { BookingCta } from "@/components/ui/booking-cta";
import { getBookingHref } from "@/lib/booking";
import styles from "./inner.module.css";

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<span><ArrowRight size={18} aria-hidden="true" /></span></Link>;
}
export function Photo({ image, lang, hero = false }: { image: string; lang: Language; hero?: boolean }) {
  const asset = getGalleryContent(lang).images.find((item) => item.id === image)!;
  return <div className={`${styles.photo} ${hero ? styles.heroPhoto : ""}`}><Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 92vw, (max-width: 1400px) 48vw, 680px" preload={hero} /><span className={styles.photoCaption}>{ui.care[lang]}</span></div>;
}
export function Hero({ page, lang, detail = false }: { page: InnerPage; lang: Language; detail?: boolean }) {
  return <><section className={styles.hero}><div className={styles.heroCopy}><nav className={styles.breadcrumb} aria-label={ui.home[lang]}><Link href={`/${lang}`}>{ui.home[lang]}</Link><span aria-hidden="true">/</span><Link href={`/${lang}/services`}>{ui.all[lang]}</Link></nav><p className={styles.eyebrow}>{page.eyebrow[lang]}</p><h1>{page.title[lang]}</h1><p className={styles.intro}>{page.description[lang]}</p><div className={styles.heroActions}><BookingCta href="#appointment" label={ui.book[lang]} /><TextLink href={`/${lang}/${detail ? "salon" : "our-space"}`}>{detail ? ui.salon[lang] : ui.gallery[lang]}</TextLink></div><p className={styles.heroSignature}>{ui.footer[lang]}</p></div><Photo image={page.image} lang={lang} hero /></section><Values lang={lang} /></>;
}
export function Values({ lang }: { lang: Language }) {
  const icons = [Leaf, UserRound, Sparkles, Heart];
  return <div className={styles.values}>{values.map((item, index) => { const Icon = icons[index]; return <div key={item.icon}><Icon size={28} strokeWidth={1.3} aria-hidden="true" /><span><strong>{item.title[lang]}</strong><small>{item.description[lang]}</small></span></div>; })}</div>;
}
export function Story({ page, lang }: { page: InnerPage; lang: Language }) {
  return <section className={`${styles.section} ${styles.story}`}><Photo image={page.image === "salon" ? "hair" : "salon"} lang={lang} /><div><p className={styles.eyebrow}>{ui.care[lang]}</p><h2>{page.storyTitle[lang]}</h2><p className={styles.intro}>{page.story[lang]}</p><TextLink href={`/${lang}/salon`}>{ui.salon[lang]}</TextLink></div></section>;
}
export function ServiceCards({ lang, category }: { lang: Language; category?: "beauty" | "wellness" }) {
  return <section className={styles.section} id="treatments"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>{ui.serviceLabel[lang]}</p><h2>{ui.services[lang]}</h2></div><TextLink href={`/${lang}/services`}>{ui.all[lang]}</TextLink></div><nav className={styles.filters} aria-label={ui.serviceLabel[lang]}>{[{ slug: "services", label: ui.all[lang] }, ...["beauty", "wellness"].map((slug) => ({ slug, label: slug === "beauty" ? (lang === "en" ? "Beauty" : "الجمال") : (lang === "en" ? "Wellness" : "العافية") }))].map((item) => <Link key={item.slug} href={`/${lang}/${item.slug}`} aria-current={(category ?? "services") === item.slug ? "page" : undefined}>{item.label}</Link>)}</nav><div className={styles.cards}>{services.filter((item) => !category || item.category === category).map((service) => <Link className={styles.card} key={service.slug} href={`/${lang}/services/${service.slug}`}><div className={styles.cardImage}><Image src={`/assets/images/gallery/${service.image}.webp`} alt="" fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 420px" /></div><div className={styles.cardBody}><h3>{service.title[lang]}</h3><p>{service.description[lang]}</p><span className={styles.cardFoot}>{ui.explore[lang]}<ArrowRight size={20} aria-hidden="true" /></span></div></Link>)}</div><p className={styles.note}>{ui.demo[lang]}</p></section>;
}
export function TreatmentOptions({ service, lang }: { service: Service; lang: Language }) {
  return <section className={styles.section}><p className={styles.eyebrow}>{service.title[lang]}</p><h2>{ui.serviceLabel[lang]}</h2><div className={styles.cards}>{service.options.map((option, index) => <article key={option.name.en} className={styles.option}><span className={styles.optionNumber}>0{index + 1}</span><h3>{option.name[lang]}</h3><p>{option.detail[lang]}</p><TextLink href={getBookingHref(lang, `${service.title[lang]} · ${option.name[lang]}`)}>{ui.price[lang]}</TextLink></article>)}</div><p className={styles.note}>{ui.demo[lang]}</p></section>;
}
export function GalleryGrid({ lang }: { lang: Language }) {
  return <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>{ui.gallery[lang]}</p><h2>{ui.care[lang]}</h2></div></div><div className={styles.gallery}>{getGalleryContent(lang).images.map((item, index) => <figure key={item.id}><div className={styles.galleryImage}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 430px" /></div><figcaption>{item.title}<span>0{index + 1}</span></figcaption></figure>)}</div><p className={styles.note}>{ui.imageNote[lang]}</p></section>;
}
export function Questions({ lang, full = false }: { lang: Language; full?: boolean }) {
  const content = getFaqContent(lang);
  return <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>{content.eyebrow}</p><h2>{ui.faq[lang]}</h2></div>{!full && <TextLink href={`/${lang}/faq`}>{ui.allFaq[lang]}</TextLink>}</div><div className={styles.questions}>{content.items.slice(0, full ? undefined : 3).map((item) => <details key={item.id}><summary>{item.question}<Plus size={21} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>;
}
export function PackageCards({ lang }: { lang: Language }) {
  return <section className={styles.section}><p className={styles.eyebrow}>{ui.collection[lang]}</p><div className={styles.cards}>{packages.map((item) => <article key={item.slug} className={styles.card}><div className={styles.cardImage}><Image src={`/assets/images/gallery/${item.image}.webp`} alt="" fill sizes="(max-width: 600px) 90vw, 420px" /></div><div className={styles.cardBody}><h3>{item.title[lang]}</h3><p>{item.description[lang]}</p><h4>{ui.included[lang]}</h4><ul>{item.services.map((slug) => <li key={slug}><Link href={`/${lang}/services/${slug}`}>{services.find((service) => service.slug === slug)!.title[lang]}</Link></li>)}</ul><TextLink href={getBookingHref(lang, item.title[lang])}>{ui.price[lang]}</TextLink></div></article>)}</div><p className={styles.note}>{ui.demo[lang]}</p></section>;
}
export function ContactDetails({ lang }: { lang: Language }) {
  const location = getLocationContent(lang);
  return <section className={`${styles.section} ${styles.contact}`}><div><p className={styles.eyebrow}>{location.eyebrow}</p><h2>{location.title}</h2><div className={styles.locationDetails}>{location.details.map((detail) => <div key={detail.label}><h3>{detail.label}</h3><p>{detail.value}</p></div>)}</div><p className={styles.note}>{location.mapNote}</p><TextLink href={location.mapHref}>{location.mapsLabel}</TextLink></div><div className={styles.contactPanel}><MapPin size={36} strokeWidth={1.2} aria-hidden="true" /><h3>{ui.contact[lang]}</h3><p>{ui.visitBody[lang]}</p><BookingCta href={getBookingHref(lang)} label={ui.send[lang]} target="_blank" rel="noreferrer" /></div></section>;
}
