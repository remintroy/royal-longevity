import Image from "next/image";
import { Clock3, Droplets, Flower2, Gem, HeartHandshake, Leaf, Scissors, Sparkles, Waves } from "lucide-react";
import type { HighlightIcon, HighlightsContent } from "@/data/highlights";

const icons = {
  beauty: Scissors,
  skin: Droplets,
  wellness: Leaf,
  care: HeartHandshake,
  detail: Gem,
  calm: Waves,
  ritual: Flower2,
  style: Sparkles,
  time: Clock3,
};

function HighlightSymbol({ name }: { name: HighlightIcon }) {
  const Icon = icons[name];
  return <Icon className="size-6 shrink-0" strokeWidth={1.5} aria-hidden="true" />;
}

export function Highlights({ content }: { content: HighlightsContent }) {
  return (
    <section id="highlights" aria-labelledby="highlights-title" className="border-t border-border bg-white px-5 py-20 text-espresso min-[700px]:px-8 min-[700px]:py-28 min-[1000px]:px-[clamp(32px,4.8vw,84px)]">
      <div className="mx-auto max-w-[1560px]">
        <header className="text-center">
          <p className="mb-5 flex items-center justify-center gap-2.5 text-sm">
            <span className="size-[5px] rounded-full bg-gold" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h2 id="highlights-title" className="text-balance text-[clamp(2.1rem,3.8vw,4rem)] font-normal leading-[1.12] tracking-[-.035em] rtl:leading-[1.4] rtl:tracking-normal">
            {content.title}
          </h2>
        </header>

        <ul className="mt-10 grid gap-4 min-[700px]:mt-16 min-[1000px]:grid-cols-3">
          {content.categories.map((category) => (
            <li key={category.id} className="flex items-center gap-5 rounded-[24px] border border-border px-6 py-7 min-[1200px]:px-8 min-[1200px]:py-8">
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl font-normal leading-snug rtl:leading-relaxed">{category.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-espresso/75">{category.description}</p>
              </div>
              <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full border border-border">
                <HighlightSymbol name={category.icon} />
              </span>
            </li>
          ))}
        </ul>

        <h3 id="highlights-details" className="mb-7 mt-14 flex items-center justify-center gap-2.5 text-center text-sm font-normal min-[700px]:mb-8 min-[700px]:mt-24">
          <span className="size-[5px] shrink-0 rounded-full bg-gold" aria-hidden="true" />
          {content.detailsLabel}
        </h3>
        <div className="grid gap-4 min-[1000px]:grid-cols-3" aria-labelledby="highlights-details">
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-6 rounded-[24px] border border-border p-8 text-center min-[1000px]:col-start-2 min-[1000px]:row-start-1">
            <Image src="/branding/icon-gold.png" alt="" width={64} height={64} className="h-16 w-auto object-contain" />
            <p className="whitespace-pre-line text-2xl leading-snug rtl:leading-relaxed">{content.centerpiece}</p>
          </div>
          {[content.details.slice(0, 3), content.details.slice(3)].map((group, index) => (
            <ul key={group[0].id} className={`grid gap-4 min-[1000px]:row-start-1 ${index === 0 ? "min-[1000px]:col-start-1" : "min-[1000px]:col-start-3"}`}>
              {group.map((detail) => (
                <li key={detail.id} className="flex min-h-[86px] items-center justify-between gap-5 rounded-[20px] border border-border px-6 py-5 min-[1200px]:px-8">
                  <span className="text-xl leading-snug min-[1200px]:text-2xl rtl:leading-relaxed">{detail.label}</span>
                  <HighlightSymbol name={detail.icon} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
