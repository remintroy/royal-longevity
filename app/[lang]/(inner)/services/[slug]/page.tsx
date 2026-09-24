import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService, categories } from "@/data/catalogue";
import { catalogueUi } from "@/data/catalogue/experience";
import { ui } from "@/data/inner/ui";
import { SiteFrame } from "@/components/inner/site-frame";
import { Questions } from "@/components/inner/questions";
import { ServiceCards } from "@/components/inner/service-cards";
import { AppointmentEnquiry } from "@/components/inner/appointment-enquiry";
import {
  AccessLabel,
  PoolAccess,
  ServiceImage,
} from "@/components/inner/catalogue";
import { Journey } from "@/components/inner/memberships";
import { BookingCta } from "@/components/ui/booking-cta";
import { TextLink } from "@/components/inner/text-link";
import { getBookingHref } from "@/lib/booking";

type ServicePageProps = { params: Promise<{ lang: string; slug: string }> };
function resolveService(lang: string, slug: string) {
  if (lang !== "en" && lang !== "ar") notFound();
  const service = getService(slug);
  if (!service) notFound();
  const category = categories.find((item) => item.id === service.category);
  if (!category) notFound();
  return { lang, service, category } as const;
}
export function generateStaticParams() {
  return ["en", "ar"].flatMap((lang) =>
    services.map(({ slug }) => ({ lang, slug })),
  );
}
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { lang: language, slug } = await params;
  const { lang, service } = resolveService(language, slug);
  return {
    title: `${service.title[lang]} | Royal Longevity`,
    description: service.description[lang],
    alternates: {
      languages: { en: `/en/services/${slug}`, ar: `/ar/services/${slug}` },
    },
  };
}
export default async function ServicePage({ params }: ServicePageProps) {
  const { lang: language, slug } = await params;
  const { lang, service, category } = resolveService(language, slug);
  const membership = service.access === "membership";
  return (
    <SiteFrame lang={lang} path={`services/${slug}`}>
      <section className="grid items-center gap-10 py-12 min-[900px]:grid-cols-2 min-[900px]:py-20">
        <div>
          <nav
            aria-label={ui.home[lang]}
            className="mb-8 flex flex-wrap items-center gap-3 text-sm"
          >
            <Link href={`/${lang}/services`} className="hover:underline">
              {ui.all[lang]}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/${lang}/services/categories/${category.id}`}
              className="hover:underline"
            >
              {category.title[lang]}
            </Link>
          </nav>
          <AccessLabel access={service.access} lang={lang} />
          <h1 className="mt-6 text-balance text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal">
            {service.title[lang]}
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-espresso/75">
            {service.description[lang]}
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <BookingCta
              href={membership ? `/${lang}/memberships` : "#appointment"}
              label={
                membership
                  ? catalogueUi.memberships[lang]
                  : catalogueUi.appointments[lang]
              }
            />
            <TextLink
              href={getBookingHref(
                lang,
                `${category.title[lang]} · ${service.title[lang]}`,
              )}
            >
              {catalogueUi.enquiry[lang]}
            </TextLink>
          </div>
        </div>
        <ServiceImage image={service.image} category={category.id} />
      </section>
      <section className="my-12 max-w-3xl border-y border-border py-8">
        <h2 className="text-2xl">{catalogueUi.pricing[lang]}</h2>
        <p className="mt-4 leading-relaxed text-espresso/75">
          {catalogueUi.pricingBody[lang]}
        </p>
      </section>
      <Journey lang={lang} membership={membership} />
      {service.access === "both" && <PoolAccess lang={lang} />}
      {!membership && <AppointmentEnquiry lang={lang} initialService={slug} />}
      <ServiceCards lang={lang} category={category.id} />
      <Questions lang={lang} />
    </SiteFrame>
  );
}
