import { SectionHeading } from "./section-heading";
import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import { Plus } from "lucide-react";
import { catalogueQuestions } from "@/data/catalogue/questions";
import { TextLink } from "./text-link";

export function Questions({
  lang,
  full = false,
}: {
  lang: Language;
  full?: boolean;
}) {
  const visibleQuestions = full
    ? catalogueQuestions
    : catalogueQuestions.slice(0, 3);
  return (
    <section className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <SectionHeading eyebrow={ui.allFaq[lang]} title={ui.faq[lang]} />
        </div>
        {!full && <TextLink href={`/${lang}/faq`}>{ui.allFaq[lang]}</TextLink>}
      </div>
      <div className="grid gap-2.5">
        {visibleQuestions.map((item) => (
          <details
            className="group/question rounded-[25px] border border-border px-[23px]"
            key={item.id}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-[19px] text-[15px] [&::-webkit-details-marker]:hidden">
              {item.question[lang]}
              <Plus
                className="shrink-0 group-open/question:rotate-45"
                size={21}
                aria-hidden="true"
              />
            </summary>
            <p className="leading-[1.65] max-w-[850px] pb-6 text-sm opacity-75">
              {item.answer[lang]}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
