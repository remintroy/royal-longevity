import type { ReactNode } from "react";
import type { Language } from "@/data/site";
import { AnimatedTitle } from "@/components/ui/animated-title";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  lang: Language;
  title: string;
  description: string;
  eyebrow?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
};

export function PageHero({
  lang,
  title,
  description,
  eyebrow,
  navigation,
  actions,
  media,
}: PageHeroProps) {
  return (
    <section
      key={`${lang}-${title}`}
      aria-labelledby="page-title"
      className={cn(
        "grid items-center gap-8 rounded-4xl bg-[color-mix(in_srgb,var(--color-ivory)_82%,white)] p-5 min-[700px]:p-8",
        media && "min-[900px]:grid-cols-2 min-[900px]:gap-10",
      )}
    >
      <div
        className={cn(
          "min-w-0 py-5 min-[700px]:p-8",
          !media && "max-w-4xl min-[900px]:py-14",
        )}
      >
        {navigation && (
          <div className="mb-8 text-sm text-espresso/75">{navigation}</div>
        )}
        {eyebrow && (
          <div
            className="mb-6 animate-blur-fade-in text-sm opacity-0"
            style={{ animationDelay: "150ms" }}
          >
            {eyebrow}
          </div>
        )}
        <h1
          id="page-title"
          className="text-balance text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
        >
          <AnimatedTitle text={title} lang={lang} />
        </h1>
        <p
          className="mt-6 max-w-xl animate-blur-fade-in text-base leading-relaxed text-espresso/75 opacity-0"
          style={{ animationDelay: "600ms" }}
        >
          {description}
        </p>
        {actions && (
          <div
            className="mt-8 flex animate-blur-fade-in flex-wrap items-center gap-4 opacity-0"
            style={{ animationDelay: "750ms" }}
          >
            {actions}
          </div>
        )}
      </div>
      {media && (
        <div className="min-w-0 overflow-hidden rounded-3xl">
          <div className="animate-video-zoom-out opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
            {media}
          </div>
        </div>
      )}
    </section>
  );
}
