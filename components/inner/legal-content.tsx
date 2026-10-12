import Link from "next/link";
import { LegalContents } from "./legal-contents";
import { legalDocuments, type LegalBlock, type LegalSlug } from "@/data/legal";
import { arabicLegalDocuments } from "@/data/legal-ar";
import { legalUi } from "@/data/legal-ui";
import { supportingPages } from "@/data/catalogue/supporting";
import type { Language } from "@/data/site";
import { cn } from "@/lib/utils";

function LegalBlocks({
  blocks,
  lang,
}: {
  blocks: LegalBlock[];
  lang: Language;
}) {
  return blocks.map((block, index) => {
    if (block.type === "contact") {
      return (
        <p key={index}>
          <Link
            href={`/${lang}/contact`}
            className="underline underline-offset-4"
          >
            {block.text}
          </Link>
        </p>
      );
    }
    if (block.type === "list") {
      return (
        <ul key={index} className="list-disc space-y-2 ps-6 marker:text-gold">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    if (block.type === "heading") {
      return (
        <h3 key={index} className="pt-3 text-lg font-medium text-espresso">
          {block.text}
        </h3>
      );
    }
    return <p key={index}>{block.text}</p>;
  });
}

type LegalContentProps = { lang: Language; slug: LegalSlug };

export function LegalContent({ lang, slug }: LegalContentProps) {
  const document =
    lang === "ar" ? arabicLegalDocuments[slug] : legalDocuments[slug];
  const legalSlugs = Object.keys(legalDocuments) as LegalSlug[];
  return (
    <div className="py-8 min-[900px]:py-12">
      <nav
        aria-label={legalUi.navigation[lang]}
        className="flex flex-wrap gap-3 border-b border-border pb-8"
      >
        {legalSlugs.map((destination) => (
          <Link
            key={destination}
            href={`/${lang}/${destination}`}
            aria-current={destination === slug ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-espresso",
              destination === slug && "border-espresso bg-espresso text-white",
            )}
          >
            {supportingPages[destination].title[lang]}
          </Link>
        ))}
      </nav>
      <div className="mt-8 grid items-start gap-10 min-[1000px]:grid-cols-[minmax(220px,300px)_minmax(0,1fr)] min-[1000px]:gap-16">
        <LegalContents
          key={`${slug}-${lang}`}
          lang={lang}
          title={legalUi.contents[lang]}
          sections={document.sections.map(({ id, title }) => ({ id, title }))}
        />
        <article
          lang={lang}
          dir={lang === "ar" ? "rtl" : "ltr"}
          aria-label={supportingPages[slug].title[lang]}
          className="min-w-0 max-w-3xl text-base leading-8 text-espresso/85 [overflow-wrap:anywhere]"
        >
          {document.dates.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-6 text-sm">
              {document.dates.map((date) => (
                <p key={date}>{date}</p>
              ))}
            </div>
          )}
          <div className="space-y-5">
            <LegalBlocks blocks={document.introduction} lang={lang} />
          </div>
          {document.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-40 min-[1000px]:scroll-mt-8 border-b border-border py-8 min-[700px]:py-10"
            >
              <h2
                id={`${section.id}-title`}
                className="mb-5 text-2xl font-medium leading-snug tracking-tight text-espresso"
              >
                {section.title}
              </h2>
              <div className="space-y-5">
                <LegalBlocks blocks={section.blocks} lang={lang} />
              </div>
            </section>
          ))}
          <a
            href="#legal-contents"
            lang={lang}
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="mt-8 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
          >
            {legalUi.backToContents[lang]}
          </a>
        </article>
      </div>
    </div>
  );
}
