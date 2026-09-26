import { ArrowDown } from "lucide-react";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SectionHeading } from "./section-heading";
import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
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
    <section
      aria-labelledby="questions-title"
      className="my-[65px] grid scroll-mt-[25px] items-start gap-8 min-[900px]:my-[85px] min-[900px]:grid-cols-[0.8fr_1.2fr] min-[900px]:gap-16"
    >
      <header>
        <SectionHeading
          id="questions-title"
          animate
          eyebrow={ui.allFaq[lang]}
          title={ui.faq[lang]}
        />
        {!full && (
          <TextLink className="mt-6" href={`/${lang}/faq`}>
            {ui.allFaq[lang]}
          </TextLink>
        )}
      </header>
      <FaqAccordion key={lang}>
        {visibleQuestions.map((item) => (
          <details
            className="group/question rounded-3xl border border-border bg-white transition-colors duration-200 open:bg-ivory/30 motion-reduce:transition-none"
            key={item.id}
          >
            <summary className="flex min-h-[76px] cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-5 py-4 text-base leading-snug transition-colors duration-200 hover:bg-ivory/40 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 min-[700px]:px-6 min-[700px]:text-lg rtl:leading-relaxed motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1">{item.question[lang]}</span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-white">
                <ArrowDown
                  data-faq-arrow
                  className="size-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
            </summary>
            <div data-faq-panel>
              <p
                data-faq-answer
                className="max-w-[850px] px-5 pt-1 pb-6 text-sm leading-relaxed text-espresso/75 min-[700px]:px-6 min-[700px]:pe-20 min-[700px]:text-base rtl:leading-[1.9]"
              >
                {item.answer[lang]}
              </p>
            </div>
          </details>
        ))}
      </FaqAccordion>
    </section>
  );
}
