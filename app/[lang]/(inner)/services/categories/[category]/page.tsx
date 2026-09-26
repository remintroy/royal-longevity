import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/catalogue";
import { catalogueUi } from "@/data/catalogue/experience";
import { ui } from "@/data/inner/ui";
import { SiteFrame } from "@/components/inner/site-frame";
import {
  AccessLabel,
  PoolAccess,
  ServiceImage,
} from "@/components/inner/catalogue";
import { ServiceCards } from "@/components/inner/service-cards";
import { TextLink } from "@/components/inner/text-link";
import { BookingCta } from "@/components/ui/booking-cta";
import { Questions } from "@/components/inner/questions";

type CategoryPageProps = {
  params: Promise<{ lang: string; category: string }>;
};
function resolveCategory(lang: string, id: string) {
  if (lang !== "en" && lang !== "ar") notFound();
  const category = categories.find((item) => item.id === id);
  if (!category) notFound();
  return { lang, category } as const;
}
export function generateStaticParams() {
  return ["en", "ar"].flatMap((lang) =>
    categories.map((category) => ({ lang, category: category.id })),
  );
}
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { lang: language, category: id } = await params;
  const { lang, category } = resolveCategory(language, id);
  return {
    title: `${category.title[lang]} | Royal Longevity`,
    description: category.description[lang],
    alternates: {
      languages: {
        en: `/en/services/categories/${id}`,
        ar: `/ar/services/categories/${id}`,
      },
    },
  };
}
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang: language, category: id } = await params;
  const { lang, category } = resolveCategory(language, id);
  return (
    <SiteFrame lang={lang} path={`services/categories/${id}`}>
      <section className="grid items-center gap-10 p-5 min-[900px]:p-8 min-[900px]:grid-cols-2 bg-[color-mix(in_srgb,var(--color-ivory)_82%,white)] rounded-4xl">
        <div className="min-[900px]:p-12">
          {/* <TextLink href={`/${lang}/services`}>{ui.all[lang]}</TextLink> */}
          <div className="">
            <AccessLabel access={category.access} lang={lang} />
          </div>
          <h1 className="mt-6 text-balance text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal">
            {category.title[lang]}
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-espresso/75">
            {category.description[lang]}
          </p>
          <div className="mt-8">
            <BookingCta
              href={
                category.access === "membership"
                  ? `/${lang}/memberships`
                  : "#treatments"
              }
              label={
                category.access === "membership"
                  ? catalogueUi.memberships[lang]
                  : catalogueUi.services[lang]
              }
            />
          </div>
        </div>
        <ServiceImage image={category.image} category={category.id} />
      </section>
      {category.access === "both" && <PoolAccess lang={lang} />}
      <ServiceCards lang={lang} category={category.id} />
      <Questions lang={lang} />
    </SiteFrame>
  );
}
