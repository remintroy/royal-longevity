import type { Language } from "@/data/site";
import { contactUi } from "@/data/inner/contact";
import { getLocationContent } from "@/data/location";
import { getBookingHref } from "@/lib/booking";
import { TextLink } from "./text-link";
import { ContactEnquiry } from "./contact-enquiry";

export function ContactDetails({ lang }: { lang: Language }) {
  const location = getLocationContent(lang);
  return (
    <div className="my-10 grid items-start gap-12 lg:my-14 lg:grid-cols-2 lg:gap-16">
      <ContactEnquiry lang={lang} />
      <section
        id="contact-location"
        aria-labelledby="contact-location-title"
        className="min-w-0 scroll-mt-6 border-t border-border pt-8 lg:border-t-0 lg:border-s lg:ps-10 lg:pt-0"
      >
        <h2
          id="contact-location-title"
          className="text-2xl font-normal sm:text-3xl"
        >
          {location.title}
        </h2>
        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm leading-relaxed text-espresso/75">
          {location.details
            .filter((detail) => !detail.enquire)
            .map((detail) => (
              <div key={detail.label}>
                <dt className="sr-only">{detail.label}</dt>
                <dd>{detail.value.replace(/\n/g, " ")}</dd>
              </div>
            ))}
        </dl>
        <div
          className="mt-6 overflow-hidden rounded-3xl border border-border bg-ivory"
          data-lenis-prevent
        >
          <iframe
            src={location.mapEmbedHref}
            title={location.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-72 w-full border-0 sm:h-96"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="text-xs leading-relaxed text-espresso/70">
            {location.mapNote}
          </p>
          <TextLink href={location.mapHref}>{location.mapsLabel}</TextLink>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-espresso/75">
          {contactUi.visitBody[lang]}
        </p>
      </section>
    </div>
  );
}

export function ContactIntro({
  lang,
  title,
  description,
  eyebrow,
}: {
  lang: Language;
  title: string;
  description: string;
  eyebrow: string;
}) {
  return (
    <header className="rounded-4xl bg-[color-mix(in_srgb,var(--color-ivory)_82%,white)] p-5 sm:p-8 lg:p-12">
      <div className="min-w-0">
        <p className="mb-5 text-xs tracking-widest text-espresso/70 rtl:tracking-normal">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-balance text-4xl leading-tight tracking-tight sm:text-5xl rtl:leading-relaxed rtl:tracking-normal">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-espresso/75">
          {description}
        </p>
        <nav
          aria-label={contactUi.quickLinks[lang]}
          className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <TextLink href={getBookingHref(lang)}>
            {contactUi.chat[lang]}
          </TextLink>
          <a
            href="#contact-location"
            className="inline-flex min-h-11 items-center rounded-sm text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold"
          >
            {contactUi.findUs[lang]}
          </a>
        </nav>
      </div>
    </header>
  );
}
