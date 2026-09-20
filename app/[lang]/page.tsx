import { notFound } from "next/navigation";
import { landingContent } from "@/data/landing";
import { getBookingHref } from "@/lib/booking";
import { SiteHeader } from "@/components/landing/site-header";
import { ImagePlaceholder } from "@/components/landing/image-placeholder";
import { BrandLogo } from "@/components/ui/brand-logo";
import { BookingCta } from "@/components/ui/booking-cta";
import { AnimatedTitle } from "@/components/ui/animated-title";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  const c = landingContent[lang];
  const bookingHref = getBookingHref(lang);
  return <>
    <a className="skip-link" href="#main">{c.skip}</a>
    <SiteHeader lang={lang} items={c.nav} menuLabel={c.menu} closeLabel={c.close} languageLabel={c.language} />
    <main id="main">
      <section className="hero wrap" id="top" aria-labelledby="hero-title">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 id="hero-title"><AnimatedTitle text={c.title?.toUpperCase?.()} lang={lang} /></h1>
        <p className="hero-statement">{c.statement}</p>
        <div className="hero-action"><BookingCta href={bookingHref} label={c.booking} /></div>
        <div className="hero-media"><ImagePlaceholder label={c.imagePlaceholder} caption={c.heroImage} /><p>{c.heroCaption}</p><a href="#intro" className="circle-control" aria-label={c.intro.eyebrow}>↓</a></div>
      </section>
      <section id="intro" className="intro section wrap" aria-labelledby="intro-title">
        <p className="eyebrow">{c.intro.eyebrow}</p><div className="section-heading"><h2 id="intro-title">{c.intro.title}</h2><p>{c.intro.description}</p></div>
        <ul className="values">{c.intro.values.map(value => <li key={value}><span aria-hidden="true">✧</span>{value}</li>)}</ul>
      </section>
      <section id="wellness" className="section wrap" aria-labelledby="wellness-title">
        <div className="section-heading"><div><p className="eyebrow">{c.wellness.eyebrow}</p><h2 id="wellness-title">{c.wellness.title}</h2></div><p>{c.wellness.description}</p></div>
        <div className="wellness-grid">{c.wellness.items.map((item, i) => <article key={item.title} className="offering"><ImagePlaceholder label={c.imagePlaceholder} caption={item.title} className={`tone-${i}`} /><div className="offering-heading"><span className="index" aria-hidden="true">0{i + 1}</span><h3>{item.title}</h3></div><p>{item.description}</p><ul className="tags">{item.services.map(service => <li key={service}>{service}</li>)}</ul></article>)}</div>
        <a className="text-link" href="#memberships">{c.explore}<span aria-hidden="true" className="direction-arrow">↗</span></a>
      </section>
      <section id="beauty" className="beauty-section section" aria-labelledby="beauty-title"><div className="wrap">
        <div className="section-heading"><div><p className="eyebrow">{c.beauty.eyebrow}</p><h2 id="beauty-title">{c.beauty.title}</h2></div><p>{c.beauty.description}</p></div>
        <div className="beauty-layout"><ImagePlaceholder label={c.imagePlaceholder} caption={c.beauty.items[3].title} /><div className="beauty-list">{c.beauty.items.map((item, i) => <details key={item.title} open={i === 0}><summary><span className="index">0{i + 1}</span><h3>{item.title}</h3><span className="expand-icon" aria-hidden="true">+</span></summary><div className="treatment-content"><p>{item.description}</p><ul className="tags">{item.services.map(service => <li key={service}>{service}</li>)}</ul><a className="text-link" href={getBookingHref(lang, item.title)}>{c.enquire} {item.title}<span className="direction-arrow" aria-hidden="true">↗</span></a></div></details>)}</div></div>
      </div></section>
      <section id="spaces" className="section wrap" aria-labelledby="spaces-title">
        <div className="section-heading"><div><p className="eyebrow">{c.spaces.eyebrow}</p><h2 id="spaces-title">{c.spaces.title}</h2></div><p>{c.spaces.description}</p></div>
        <div className="spaces-grid">{c.spaces.items.map((space, i) => <figure key={space.title}><ImagePlaceholder label={c.imagePlaceholder} caption={space.title} className={`tone-${i % 3}`} /><figcaption><h3>{space.title}</h3><p>{space.description}</p></figcaption></figure>)}</div>
      </section>
      <section id="memberships" className="membership-section section" aria-labelledby="membership-title"><div className="wrap membership-layout"><div><p className="eyebrow">{c.memberships.eyebrow}</p><h2 id="membership-title">{c.memberships.title}</h2><p>{c.memberships.description}</p><p className="membership-note">{c.memberships.note}</p></div><div className="membership-cards">{c.memberships.items.map((item, i) => <article key={item.title}><span className="index">0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p><ul>{item.services.map(service => <li key={service}>{service}</li>)}</ul><BookingCta href={getBookingHref(lang, item.title)} label={`${c.enquire} ${item.title}`} /></article>)}</div></div></section>
      <section className="section wrap ritual" aria-labelledby="ritual-title"><p className="eyebrow">{c.ritual.eyebrow}</p><h2 id="ritual-title">{c.ritual.title}</h2><div className="ritual-grid">{c.ritual.steps.map((step, i) => <div key={step.title}><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div></section>
      <section className="section wrap faq" aria-labelledby="faq-title"><h2 id="faq-title">{c.faq.title}</h2><div>{c.faq.items.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true" className="expand-icon">+</span></summary><p>{item.answer}</p></details>)}</div></section>
      <section id="visit" className="section visit-section" aria-labelledby="visit-title"><div className="wrap visit-layout"><div><p className="eyebrow">{c.visit.eyebrow}</p><h2 id="visit-title">{c.visit.title}</h2><p>{c.visit.description}</p>{bookingHref !== "#visit" ? <BookingCta href={bookingHref} label={c.booking} /> : <p className="contact-pending">{c.visit.availability}</p>}<dl><div><dt>{c.visit.location}</dt><dd>{c.visit.locationValue}</dd></div><div><dt>{c.visit.hours}</dt><dd>{c.visit.hoursValue}</dd></div></dl></div><ImagePlaceholder label={c.imagePlaceholder} caption={c.heroImage} /></div></section>
    </main>
    <footer className="wrap site-footer"><div><BrandLogo lang={lang} /><p>{c.footer}</p></div><nav aria-label={c.menu}>{c.nav.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div className="footer-bottom"><small>© {new Date().getFullYear()} Royal Longevity</small><a href="#top">{c.backToTop} <span aria-hidden="true">↑</span></a></div></footer>
  </>;
}
