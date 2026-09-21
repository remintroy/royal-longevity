import { Star } from "lucide-react";
import { LaurelLeft } from "@/components/icons/laurel-left";
import { LaurelRight } from "@/components/icons/laurel-right";
import type { Review, ReviewsContent } from "@/data/reviews";

function ReviewCard({ review, outOfFive }: { review: Review; outOfFive: string }) {
  return (
    <li className="break-inside-avoid rounded-[24px] border border-border p-6 min-[1200px]:p-7">
      <figure>
        <figcaption className="flex items-start gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ivory text-sm text-espresso" aria-hidden="true">
            {review.initials}
          </span>
          <div className="min-w-0 flex-1 pt-1">
            <p className="text-base leading-snug">{review.name}</p>
            <p className="mt-0.5 text-sm leading-snug text-espresso/75">{review.location}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 pt-1 text-sm">
            <span dir="ltr">{review.rating}</span>
            <span className="sr-only"> {outOfFive}</span>
            <Star className="size-3.5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          </span>
        </figcaption>
        <blockquote className="mb-6 mt-6 text-base leading-[1.5] rtl:leading-[1.8]">
          <p>{review.quote}</p>
        </blockquote>
        <time dateTime={review.date} className="text-sm text-espresso/75">{review.dateLabel}</time>
      </figure>
    </li>
  );
}

export function Reviews({ content }: { content: ReviewsContent }) {
  const reviewsPerColumn = 3;
  const columnClasses = [
    "grid gap-4 min-[1000px]:pt-8",
    "hidden gap-4 min-[700px]:grid",
    "hidden gap-4 min-[1000px]:grid min-[1000px]:pt-5",
  ];
  const viewAllClassName = "inline-flex min-h-11 items-center justify-center rounded-full bg-espresso px-5 py-3 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 active:scale-[.98]";
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-white px-4 pb-20 pt-5 text-espresso min-[700px]:px-8 min-[700px]:pb-28 min-[700px]:pt-8">
      <div className="mx-auto max-w-[1560px]">
        <header className="text-center">
          <p className="flex items-center justify-center gap-2.5 text-sm">
            <span className="size-[5px] rounded-full bg-gold" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4" dir="ltr">
            <LaurelLeft className="h-12 w-auto min-[700px]:h-[54px]" aria-hidden="true" />
            <p className="text-[64px] leading-none tracking-[-.055em] min-[700px]:text-[72px]">
              <span className="sr-only">{content.ratingLabel}: </span>
              {content.rating}
              <span className="sr-only"> {content.outOfFive}</span>
            </p>
            <LaurelRight className="h-12 w-auto min-[700px]:h-[54px]" aria-hidden="true" />
          </div>
          <h2 id="reviews-title" className="mx-auto mt-7 max-w-[480px] whitespace-pre-line text-balance text-2xl font-normal leading-[1.3] text-espresso/75 min-[700px]:text-[28px] rtl:leading-[1.6]">
            {content.title}
          </h2>
          <dl className="mx-auto mt-10 grid max-w-[680px] grid-cols-2 gap-y-6 min-[700px]:mt-12 min-[700px]:grid-cols-4">
            {content.categories.map((category) => (
              <div key={category.label} className="flex flex-col-reverse gap-1 px-3 even:border-s even:border-border min-[700px]:not-first:border-s">
                <dt className="text-sm text-espresso/75">{category.label}</dt>
                <dd className="text-2xl leading-tight">
                  <span dir="ltr">{category.rating}</span>
                  <span className="sr-only"> {content.outOfFive}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs text-espresso/65">{content.demoLabel}</p>
        </header>
        <div className="mt-10 grid items-start gap-4 min-[700px]:grid-cols-2 min-[1000px]:mt-16 min-[1000px]:grid-cols-3">
          {[0, 1, 2].map((column) => (
            <ul key={column} className={columnClasses[column]}>
              {content.reviews.slice(column * reviewsPerColumn, (column + 1) * reviewsPerColumn).map((review) => (
                <ReviewCard key={review.id} review={review} outOfFive={content.outOfFive} />
              ))}
            </ul>
          ))}
        </div>
        <div className="mt-10 flex justify-center min-[700px]:mt-16">
          <a href={content.viewAllHref} className={viewAllClassName}>
            {content.viewAllLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
