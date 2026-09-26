import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import Image from "next/image";
import Link from "next/link";
import { packages, getPackageServices } from "@/data/inner/packages";
import { getBookingHref } from "@/lib/booking";
import { BookingCta } from "@/components/ui/booking-cta";
import { ContentReveal } from "./content-reveal";

export function PackageCards({ lang }: { lang: Language }) {
  return (
    <section className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px]">
      <p className="mb-[17px] flex items-center gap-2.5 text-[11px] tracking-[.12em] uppercase rtl:tracking-normal before:text-[9px] before:text-gold before:content-['◆'] leading-[1.65]">
        {ui.collection[lang]}
      </p>
      <ContentReveal className="mt-6 grid gap-5 min-[700px]:grid-cols-2">
        {packages.map((item) => {
          const includedServices = getPackageServices(item);

          return (
            <article
              data-content-reveal
              key={item.slug}
              className="group/card flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-white"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  data-content-image
                  className="object-cover"
                  src={`/assets/images/gallery/${item.image}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 699px) 92vw, (max-width: 1434px) 46vw, 675px"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 min-[900px]:p-8">
                <h3 className="text-2xl leading-snug font-normal">
                  {item.title[lang]}
                </h3>
                <p className="leading-[1.65] mt-2.5 text-sm opacity-75">
                  {item.description[lang]}
                </p>
                <h4 className="mt-6 text-[11px] tracking-[.08em] uppercase rtl:tracking-normal">
                  {ui.included[lang]}
                </h4>
                <ul className="mt-3 mb-5 list-disc ps-5 text-sm">
                  {includedServices.map((service) => (
                    <li className="leading-[1.65]" key={service.slug}>
                      <Link
                        className="hover:underline"
                        href={`/${lang}/services/${service.slug}`}
                      >
                        {service.title[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
                <BookingCta
                  className="mt-auto self-start"
                  href={getBookingHref(lang, item.title[lang])}
                  label={ui.price[lang]}
                  target="_blank"
                  rel="noreferrer"
                />
              </div>
            </article>
          );
        })}
      </ContentReveal>
      <p className="mt-[22px] text-xs opacity-65 leading-[1.65]">
        {ui.demo[lang]}
      </p>
    </section>
  );
}
