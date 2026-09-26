import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/catalogue";
import { catalogueUi } from "@/data/catalogue/experience";
import { SiteFrame } from "@/components/inner/site-frame";
import {
  AccessLabel,
  PoolAccess,
  ServiceImage,
} from "@/components/inner/catalogue";
import { ServiceCards } from "@/components/inner/service-cards";
import { AnimatedTitle } from "@/components/ui/animated-title";
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
      <section
        key={`${lang}-${id}`}
        aria-labelledby="category-title"
        className="grid items-center gap-10 p-5 min-[900px]:p-8 min-[900px]:grid-cols-2 bg-[color-mix(in_srgb,var(--color-ivory)_82%,white)] rounded-4xl"
      >
        <div className="min-[900px]:p-12">
          <div
            className="opacity-0 animate-blur-fade-in"
            style={{ animationDelay: "150ms" }}
          >
            <AccessLabel access={category.access} lang={lang} />
          </div>
          <h1
            id="category-title"
            className="mt-6 text-balance text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            <AnimatedTitle text={category.title[lang]} lang={lang} />
          </h1>
          <p
            className="mt-6 max-w-xl leading-relaxed text-espresso/75 opacity-0 animate-blur-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            {category.description[lang]}
          </p>
          <div
            className="mt-8 opacity-0 animate-blur-fade-in"
            style={{ animationDelay: "750ms" }}
          >
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
        <div className="overflow-hidden rounded-3xl">
          <div className="opacity-0 animate-video-zoom-out motion-reduce:animate-none motion-reduce:opacity-100">
            <ServiceImage image={category.image} category={category.id} />
          </div>
        </div>
      </section>
      {category.access === "both" && <PoolAccess lang={lang} />}
      <ServiceCards lang={lang} category={category.id} />
      <Questions lang={lang} />
    </SiteFrame>
  );
}
