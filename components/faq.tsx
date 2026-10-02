import { RevealHeading } from "@/components/ui/reveal-heading";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { BookingCta } from "@/components/ui/booking-cta";
import type { FaqContent } from "@/data/faq";
import { FaqAccordion } from "@/components/ui/faq-accordion";

export function Faq({ content, bookingHref }: { content: FaqContent; bookingHref: string }) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-border bg-ivory/50 px-4 py-16 text-espresso min-[700px]:px-8 min-[700px]:py-24 min-[1200px]:py-32"
    >
      <div className="mx-auto grid max-w-[1560px] items-start gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-12 min-[1200px]:gap-20">
        <header>
          <p className="mb-5 flex items-center gap-2.5 text-sm">
            <span className="size-[5px] shrink-0 rounded-full bg-gold" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <RevealHeading
            id="faq-title"
            className="whitespace-pre-line text-balance text-[clamp(2rem,3.8vw,4rem)] font-normal leading-[1.12] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            {content.title}
          </RevealHeading>
          <BookingCta enquiry href={bookingHref} label={content.bookingLabel} target="_blank" rel="noreferrer" className="mt-7 min-[700px]:mt-9" />
        </header>
        <FaqAccordion>
          {content.items.map((item) => (
            <details
              key={item.id}
              className="group rounded-[36px] border border-border transition-colors duration-200 open:bg-ivory/30 min-[700px]:rounded-[50px]"
            >
              <summary className="flex min-h-[72px] cursor-pointer list-none items-center gap-3 rounded-full border border-transparent bg-white p-2 pe-4 transition-colors duration-200 group-open:border-border hover:bg-ivory/40 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 min-[700px]:min-h-[100px] min-[700px]:gap-6 min-[700px]:pe-7 [&::-webkit-details-marker]:hidden">
                <Image
                  src={item.image}
                  alt=""
                  width={80}
                  height={80}
                  sizes="(min-width: 700px) 80px, 52px"
                  className="size-[52px] shrink-0 rounded-full object-cover min-[700px]:size-20"
                />
                <span className="min-w-0 flex-1 text-base leading-[1.35] min-[700px]:text-[clamp(18px,1.5vw,24px)] rtl:leading-[1.6]">
                  {item.question}
                </span>
                <ArrowDown data-faq-arrow className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              </summary>
              <div data-faq-panel>
                <p data-faq-answer className="px-6 pb-7 pt-5 text-base leading-[1.5] text-espresso/70 min-[700px]:pb-8 min-[700px]:pt-6 min-[700px]:pe-12 min-[700px]:ps-28 min-[700px]:text-[clamp(18px,1.5vw,24px)] rtl:leading-[1.9]">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </FaqAccordion>
      </div>
    </section>
  );
}
