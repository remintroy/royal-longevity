import { ContentReveal } from "./content-reveal";
import { RevealHeading } from "@/components/ui/reveal-heading";
import Link from "next/link";
import type { Language } from "@/data/site";
import { categories } from "@/data/catalogue";
import { catalogueUi, membershipPlans } from "@/data/catalogue/experience";
import { getBookingHref } from "@/lib/booking";
import { BookingCta } from "@/components/ui/booking-cta";
import { SectionHeading } from "./section-heading";

export function Memberships({ lang }: { lang: Language }) {
  return (
    <section className="my-12 min-[900px]:my-20" id="plans">
      <SectionHeading
        animate
        eyebrow={catalogueUi.membership[lang]}
        title={catalogueUi.membershipTitle[lang]}
      />
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-espresso/75">
        {catalogueUi.planNote[lang]}
      </p>
      <ContentReveal className="mt-8 grid gap-5 min-[700px]:grid-cols-2">
        {membershipPlans.map((plan) => (
          <article
            data-content-reveal
            key={plan.id}
            className="flex min-w-0 flex-col rounded-3xl border border-border bg-white p-6 min-[900px]:p-10"
          >
            <h3 className="text-2xl leading-snug">{plan.title[lang]}</h3>
            <p className="mt-4 text-sm leading-relaxed text-espresso/75">
              {plan.description[lang]}
            </p>
            <h4 className="mt-7 text-sm font-medium">
              {catalogueUi.included[lang]}
            </h4>
            <ul className="mt-3 mb-5 divide-y divide-border">
              {plan.categories.map((id) => {
                const category = categories.find((item) => item.id === id);
                return (
                  category && (
                    <li key={id}>
                      <Link
                        href={`/${lang}/services/categories/${id}`}
                        className="inline-flex min-h-11 items-center text-sm hover:underline"
                      >
                        {category.title[lang]}
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
            <p className="mb-6 text-xs leading-relaxed">
              {plan.poolAccess === "included"
                ? catalogueUi.poolIncluded[lang]
                : catalogueUi.poolSeparate[lang]}
            </p>
            <BookingCta
              className="mt-auto max-w-full self-start"
              href={getBookingHref(lang, {
                kind: "membership",
                membership: plan.title[lang],
              })}
              label={catalogueUi.membershipEnquiry[lang]}
              target="_blank"
              rel="noreferrer"
            />
          </article>
        ))}
      </ContentReveal>
    </section>
  );
}

export function Journey({
  lang,
  membership = false,
}: {
  lang: Language;
  membership?: boolean;
}) {
  const steps = membership
    ? catalogueUi.membershipSteps
    : catalogueUi.appointmentSteps;
  return (
    <section className="my-12 rounded-3xl bg-ivory/60 p-6 min-[900px]:my-20 min-[900px]:p-10">
      <RevealHeading className="text-2xl font-normal min-[900px]:text-3xl">
        {catalogueUi.next[lang]}
      </RevealHeading>
      <ol className="mt-8 grid gap-8 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.en} className="border-s border-border ps-4">
            <span className="mb-4 grid size-11 place-items-center rounded-full border border-border bg-white text-sm text-espresso">
              0{index + 1}
            </span>
            <p className="text-sm leading-relaxed">{step[lang]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
