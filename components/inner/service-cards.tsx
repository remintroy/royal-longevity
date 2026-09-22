import { SectionHeading } from "./section-heading";
import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  services,
  serviceCategories,
  type Service,
} from "@/data/inner/services";
import { getBookingHref } from "@/lib/booking";
import { TextLink } from "./text-link";

type ServiceCardsProps = {
  lang: Language;
  category?: Service["category"];
};

export function ServiceCards({ lang, category }: ServiceCardsProps) {
  const visibleServices = services.filter(
    (service) => !category || service.category === category,
  );

  return (
    <section
      className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px]"
      id="treatments"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <SectionHeading
            eyebrow={ui.serviceLabel[lang]}
            title={ui.services[lang]}
          />
        </div>
        <TextLink href={`/${lang}/services`}>{ui.all[lang]}</TextLink>
      </div>
      <nav
        className="my-[26px] flex flex-wrap gap-2.5"
        aria-label={ui.serviceLabel[lang]}
      >
        {serviceCategories.map((item) => (
          <Link
            className="rounded-full border border-border px-[22px] py-[11px] text-[13px] hover:bg-espresso hover:text-ivory aria-[current=page]:bg-espresso aria-[current=page]:text-ivory"
            key={item.slug}
            href={`/${lang}/${item.slug}`}
            aria-current={
              (category ?? "services") === item.slug ? "page" : undefined
            }
          >
            {item.label[lang]}
          </Link>
        ))}
      </nav>
      <div className="mt-6 grid gap-5 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3">
        {visibleServices.map((service) => (
          <Link
            className="group/card min-w-0 overflow-hidden rounded-[22px] border border-border bg-white"
            key={service.slug}
            href={`/${lang}/services/${service.slug}`}
          >
            <div className="relative aspect-[1.65] overflow-hidden">
              <Image
                className="object-cover transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover/card:scale-[1.025] motion-reduce:group-hover/card:scale-100 motion-reduce:transition-none"
                src={`/assets/images/gallery/${service.image}.webp`}
                alt=""
                fill
                sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 420px"
              />
            </div>
            <div className="p-6">
              <h3 className="text-[1.22rem] leading-[1.35] font-medium">
                {service.title[lang]}
              </h3>
              <p className="leading-[1.65] mt-2.5 text-sm opacity-75">
                {service.description[lang]}
              </p>
              <span className="mt-[25px] flex items-center justify-between text-xs">
                {ui.explore[lang]}
                <ArrowRight
                  className="rtl:-scale-x-100 size-[38px] rounded-full border border-border p-2"
                  size={20}
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-[22px] text-xs opacity-65 leading-[1.65]">
        {ui.demo[lang]}
      </p>
    </section>
  );
}

export function TreatmentOptions({
  service,
  lang,
}: {
  service: Service;
  lang: Language;
}) {
  return (
    <section className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px]">
      <SectionHeading
        eyebrow={service.title[lang]}
        title={ui.serviceLabel[lang]}
      />
      <div className="mt-6 grid gap-5 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3">
        {service.options.map((option, index) => (
          <article
            key={option.name.en}
            className="rounded-3xl border border-border bg-white p-7"
          >
            <span className="mb-[30px] block text-[13px] text-gold">
              0{index + 1}
            </span>
            <h3 className="text-[1.22rem] leading-[1.35] font-medium">
              {option.name[lang]}
            </h3>
            <p className="leading-[1.65] mt-3 mb-5 text-sm opacity-75">
              {option.detail[lang]}
            </p>
            <TextLink
              href={getBookingHref(
                lang,
                `${service.title[lang]} · ${option.name[lang]}`,
              )}
            >
              {ui.price[lang]}
            </TextLink>
          </article>
        ))}
      </div>
      <p className="mt-[22px] text-xs opacity-65 leading-[1.65]">
        {ui.demo[lang]}
      </p>
    </section>
  );
}
