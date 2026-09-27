import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  categories,
  getCategoryServices,
  type Category,
} from "@/data/catalogue";
import { catalogueHero } from "@/data/catalogue/hero";
import { ui } from "@/data/inner/ui";
import type { Language } from "@/data/site";
import { AnimatedTitle } from "@/components/ui/animated-title";
import { CatalogueBreadcrumbs } from "./catalogue-breadcrumbs";
import { AccessLabel } from "./catalogue";

export function ServicesDirectoryHero({ lang }: { lang: Language }) {
  return (
    <>
      <CatalogueBreadcrumbs
        lang={lang}
        items={[
          { label: ui.home[lang], href: `/${lang}` },
          { label: ui.all[lang] },
        ]}
      />
      <section
        aria-labelledby="directory-title"
        className="rounded-3xl bg-ink px-6 py-10 text-ivory min-[700px]:px-12 min-[900px]:py-16"
      >
        <p className="mb-6 text-xs tracking-[.12em] uppercase text-ivory/65 rtl:tracking-normal">
          {catalogueHero.directory[lang]}
        </p>
        <h1
          id="directory-title"
          className="max-w-4xl text-balance text-[clamp(2.6rem,6vw,5rem)] leading-[1.08] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
        >
          <AnimatedTitle text={catalogueHero.title[lang]} lang={lang} />
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/75">
          {catalogueHero.description[lang]}
        </p>
        <nav
          aria-label={catalogueHero.collections[lang]}
          className="mt-10 border-t border-ivory/20 pt-6"
        >
          <p className="mb-4 text-xs text-ivory/65">
            {catalogueHero.collections[lang]}
          </p>
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/${lang}/services/categories/${category.id}`}
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-ivory/25 px-4 py-2 text-sm transition-colors duration-200 hover:border-ivory/60 hover:bg-ivory/10 motion-reduce:transition-none"
                >
                  {category.title[lang]}
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="shrink-0 rtl:-scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
}

export function CollectionHero({
  lang,
  category,
}: {
  lang: Language;
  category: Category;
}) {
  const count = getCategoryServices(category.id).length;
  return (
    <>
      <CatalogueBreadcrumbs
        lang={lang}
        items={[
          { label: ui.home[lang], href: `/${lang}` },
          { label: ui.all[lang], href: `/${lang}/services` },
          { label: category.title[lang] },
        ]}
      />
      <section
        aria-labelledby="category-title"
        className="grid gap-8 border-y border-border py-10 min-[900px]:grid-cols-[1fr_280px] min-[900px]:gap-16 min-[900px]:py-14"
      >
        <div>
          <p className="mb-5 text-xs tracking-[.12em] uppercase text-espresso/65 rtl:tracking-normal">
            {catalogueHero.collection[lang]}
          </p>
          <h1
            id="category-title"
            className="text-balance text-[clamp(2.4rem,5vw,4rem)] leading-[1.1] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            <AnimatedTitle text={category.title[lang]} lang={lang} />
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-espresso/75">
            {category.description[lang]}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-5 min-[900px]:border-s min-[900px]:border-border min-[900px]:ps-8">
          <p className="flex items-baseline gap-3">
            <span className="text-4xl tabular-nums">
              {new Intl.NumberFormat(lang).format(count)}
            </span>
            <span className="text-sm text-espresso/65">
              {catalogueHero.count[lang]}
            </span>
          </p>
          <AccessLabel access={category.access} lang={lang} />
          <a
            href="#treatments"
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-espresso/25 px-5 py-2 text-sm hover:bg-ivory"
          >
            <span>{catalogueHero.browse[lang]}</span>
            <ArrowDown size={16} aria-hidden="true" className="shrink-0" />
          </a>
        </div>
      </section>
    </>
  );
}
