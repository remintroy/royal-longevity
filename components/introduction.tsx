import Image from "next/image";
import { HeartHandshake, Smile, UsersRound } from "lucide-react";
import { IntroductionMotion } from "@/components/ui/introduction-motion";
import { introductionImage, type IntroductionContent } from "@/data/introduction";

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
        items-center gap-3 border-espresso/16 py-[22px] not-first:border-t
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
        <span className="sr-only">{statistic.value}{statistic.suffix}</span>
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
        <div data-intro-parallax className="absolute -inset-y-1/2 inset-x-0 -z-20">
          <Image
            src={introductionImage}
            alt={content.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-[48%_center]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-ink/45" aria-hidden="true" />

        <header className="text-ivory">
          <p data-intro-reveal className="mb-5 flex items-center gap-2.5 text-sm">
            <span className="size-[5px] rounded-full bg-current" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h2
            data-intro-reveal
            id="introduction-title"
            className="max-w-[760px] whitespace-pre-line text-balance font-serif
              text-[clamp(2rem,3.8vw,4rem)] font-normal leading-[1.12]
              tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal"
          >
            {content.title}
          </h2>
        </header>

        <dl
          data-intro-panel
          className="m-0 rounded-3xl border border-espresso/16 bg-ivory px-5 py-2
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
