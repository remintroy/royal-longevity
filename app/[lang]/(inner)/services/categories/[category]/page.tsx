import { ExploreMore } from "@/components/inner/explore-more";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/catalogue";
import { SiteFrame } from "@/components/inner/site-frame";
import { PoolAccess } from "@/components/inner/catalogue";
import { ServiceCards } from "@/components/inner/service-cards";
import { Questions } from "@/components/inner/questions";
import { CollectionHero } from "@/components/inner/catalogue-heroes";

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
      <CollectionHero lang={lang} category={category} />
      {category.access === "both" && <PoolAccess lang={lang} />}
      <ServiceCards lang={lang} category={category.id} />
      <Questions lang={lang} />
      <ExploreMore lang={lang} category={category.id} />
    </SiteFrame>
  );
}
