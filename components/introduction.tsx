import { RevealHeading } from "@/components/ui/reveal-heading";
import { getImageProps } from "next/image";
import { HeartHandshake, Smile, UsersRound } from "lucide-react";
import { IntroductionMotion } from "@/components/ui/introduction-motion";
import {
  introductionImages,
  type IntroductionContent,
} from "@/data/introduction";

const statisticIcons = {
  smile: Smile,
  guests: UsersRound,
  care: HeartHandshake,
};

type IntroductionStatistic = IntroductionContent["statistics"][number];

function StatisticRow({ statistic }: { statistic: IntroductionStatistic }) {
  const Icon = statisticIcons[statistic.icon];

  return (
    <div
      className="grid grid-cols-[minmax(82px,.8fr)_minmax(0,1.4fr)_22px]
        items-center gap-3 border-border py-[22px] not-first:border-t
        min-[700px]:grid-cols-[minmax(110px,1fr)_minmax(0,1.4fr)_26px]
        min-[700px]:gap-6 min-[700px]:py-[30px]"
    >
      <dt
        className="col-start-2 row-start-1 whitespace-pre-line text-sm leading-[1.4]
          min-[700px]:text-[clamp(16px,1.5vw,24px)]"
      >
        {statistic.label}
      </dt>
      <dd
        className="col-start-1 row-start-1 m-0 text-[clamp(2rem,4.5vw,4rem)]
          leading-none tracking-[-.05em] tabular-nums"
      >
        <span className="sr-only">
          {statistic.value}
          {statistic.suffix}
        </span>
        <span aria-hidden="true" dir="ltr">
          <span data-intro-count={statistic.value}>{statistic.value}</span>
          {statistic.suffix}
        </span>
      </dd>
      <Icon
        size={26}
        strokeWidth={1.5}
        className="w-[22px] min-[700px]:w-[26px]"
        aria-hidden="true"
      />
    </div>
  );
}

export function Introduction({ content }: { content: IntroductionContent }) {
  const common = { alt: content.imageAlt, sizes: "100vw" };
  const { props: mobile } = getImageProps({
    ...common,
    ...introductionImages.mobile,
  });
  const { props: tablet } = getImageProps({
    ...common,
    ...introductionImages.tablet,
  });
  const { props: desktop } = getImageProps({
    ...common,
    ...introductionImages.desktop,
  });

  return (
    <IntroductionMotion>
      <section
        id="introduction"
        aria-labelledby="introduction-title"
        className="relative isolate flex min-h-[max(680px,100svh)] w-full
          flex-col justify-between gap-[180px] overflow-hidden bg-espresso px-4 pb-4 pt-7
          min-[700px]:min-h-[max(760px,100svh)] min-[700px]:gap-[220px]
          min-[700px]:p-[clamp(32px,4vw,72px)]"
      >
        {/* The overscan covers the full GSAP parallax travel at either end. */}
        <div
          data-intro-parallax
          className="absolute -inset-y-[3%] inset-x-0 -z-20 motion-reduce:inset-y-0"
        >
          <picture>
            <source
              media="(min-width: 1200px)"
              srcSet={desktop.srcSet}
              sizes={desktop.sizes}
              width={desktop.width}
              height={desktop.height}
            />
            <source
              media="(min-width: 700px)"
              srcSet={tablet.srcSet}
              sizes={tablet.sizes}
              width={tablet.width}
              height={tablet.height}
            />
            {/* Next.js art direction: one optimized image request per viewport. */}
            <img
              {...mobile}
              alt={content.imageAlt}
              className="absolute inset-0 h-full w-full object-cover object-[65%_top] min-[700px]:object-top"
            />
          </picture>
        </div>
        <div className="absolute inset-0 -z-10 bg-ink/45" aria-hidden="true" />

        {/* Keep desktop copy on the furniture side, clear of the wall sign.
            Arabic retains RTL text alignment inside this photographic safe area. */}
        <header className="text-ivory min-[1200px]:w-[45%] min-[1200px]:self-start min-[1200px]:rtl:self-end">
          <p
            data-intro-reveal
            className="mb-5 flex items-center gap-2.5 text-sm"
          >
            <span
              className="motion-safe:animate-section-dot-pulse size-[6px] rounded-full bg-current"
              aria-hidden="true"
            />
            {content.eyebrow}
          </p>
          <RevealHeading
            id="introduction-title"
            className="max-w-[760px] whitespace-pre-line text-balance font-sans
              text-[clamp(2rem,3.8vw,4rem)] font-normal leading-[1.12]
              tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            {content.title}
          </RevealHeading>
        </header>

        <dl
          data-intro-panel
          className="m-0 rounded-3xl border border-border bg-white px-5 py-2
            text-espresso min-[700px]:w-[min(65%,780px)] min-[700px]:self-end
            min-[700px]:px-[30px] min-[700px]:py-0 min-[1200px]:w-[49%]"
        >
          {content.statistics.map((statistic) => (
            <StatisticRow key={statistic.icon} statistic={statistic} />
          ))}
        </dl>
      </section>
    </IntroductionMotion>
  );
}
