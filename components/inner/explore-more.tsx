import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { exploreMoreUi, getExploreMore } from "@/data/catalogue/explore-more";
import type { CategoryId } from "@/data/catalogue";
import type { Language } from "@/data/site";
import { CategoryIcon } from "./category-icon";
import { ExploreCarousel } from "./explore-carousel";
import { SectionHeading } from "./section-heading";

export function ExploreMore({
  lang,
  category,
}: {
  lang: Language;
  category: CategoryId;
}) {
  const items = getExploreMore(category);
  return (
    <section
      aria-labelledby="explore-more-title"
      className="relative isolate mt-16 py-12 min-[900px]:mt-20 min-[900px]:py-16"
    >
      {/* The site frame is the query container: span its width without
          viewport scrollbar overflow or changing the aligned content width. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-1/2 -z-10 w-[100cqw] -translate-x-1/2 border-y border-border bg-ivory/60 rtl:translate-x-1/2"
      />
      <SectionHeading
        id="explore-more-title"
        eyebrow={exploreMoreUi.eyebrow[lang]}
        title={exploreMoreUi.title[lang]}
      />
      <ExploreCarousel
        key={`${lang}-${category}`}
        lang={lang}
        labels={{
          previous: exploreMoreUi.previous[lang],
          next: exploreMoreUi.next[lang],
          pause: exploreMoreUi.pause[lang],
          play: exploreMoreUi.play[lang],
        }}
      >
        {[false, true].flatMap((duplicate) =>
          items.map((item) => (
            <li
              key={`${item.id}-${duplicate}`}
              data-loop-copy={duplicate ? "" : undefined}
              aria-hidden={duplicate || undefined}
              className={`w-[82%] max-w-sm shrink-0 min-[600px]:w-[45%] min-[1000px]:w-[calc((100%-60px)/4)] ${duplicate ? "motion-reduce:hidden" : ""}`}
            >
              <Link
                href={`/${lang}/${item.path}`}
                tabIndex={duplicate ? -1 : undefined}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-colors duration-200 hover:border-espresso/30 motion-reduce:transition-none"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-ivory">
                  {item.image ? (
                    <Image
                      src={`/assets/images/gallery/${item.image}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 1000px) 330px, (min-width: 600px) 45vw, 82vw"
                      className="object-cover"
                    />
                  ) : (
                    <CategoryIcon
                      category={item.category}
                      className="size-16 text-espresso/45"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-3 text-xs text-espresso/60">
                    {exploreMoreUi[item.kind][lang]}
                  </p>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg leading-snug">{item.title[lang]}</h3>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </li>
          )),
        )}
      </ExploreCarousel>
    </section>
  );
}
