import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import Image from "next/image";
import Link from "next/link";
import { packages, getPackageServices } from "@/data/inner/packages";
import { getBookingHref } from "@/lib/booking";
import { TextLink } from "./text-link";

export function PackageCards({ lang }: { lang: Language }) {
  return (
    <section className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px]">
      <p className="mb-[17px] flex items-center gap-2.5 text-[11px] tracking-[.12em] uppercase before:text-[9px] before:text-gold before:content-['◆'] leading-[1.65]">
        {ui.collection[lang]}
      </p>
      <div className="mt-6 grid gap-5 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3">
        {packages.map((item) => {
          const includedServices = getPackageServices(item);

          return (
            <article
              key={item.slug}
              className="group/card min-w-0 overflow-hidden rounded-[22px] border border-border bg-white"
            >
              <div className="relative aspect-[1.65] overflow-hidden">
                <Image
                  className="object-cover"
                  src={`/assets/images/gallery/${item.image}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 600px) 90vw, 420px"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[1.22rem] leading-[1.35] font-medium">
                  {item.title[lang]}
                </h3>
                <p className="leading-[1.65] mt-2.5 text-sm opacity-75">
                  {item.description[lang]}
                </p>
                <h4 className="mt-6 text-[11px] tracking-[.08em] uppercase">
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
                <TextLink href={getBookingHref(lang, item.title[lang])}>
                  {ui.price[lang]}
                </TextLink>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-[22px] text-xs opacity-65 leading-[1.65]">
        {ui.demo[lang]}
      </p>
    </section>
  );
}
