import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import type { ExperienceContent } from "@/data/experience";

export function Experience({ content, bookingHref }: {
  content: ExperienceContent;
  bookingHref: string;
}) {
  return (
    <section aria-labelledby="experience-title" className="bg-ivory py-20 text-espresso min-[700px]:py-[128px]">
      <div className="mx-auto flex max-w-[760px] flex-col items-center px-6 text-center">
        <h2 id="experience-title" className="sr-only">{content.title}</h2>
        <a href={bookingHref} target="_blank" rel="noreferrer" aria-label={content.contactLabel}
          className="group flex max-w-full items-center gap-4 rounded-3xl border border-espresso/16 p-4 text-start transition-colors duration-200 hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-espresso/10">
            <Image src="/branding/icon-gold.png" width={32} height={32} alt="" className="h-8 w-auto" />
          </span>
          <span className="text-sm leading-relaxed min-[700px]:text-base">{content.team}<span className="block text-espresso/65">{content.title}</span></span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-espresso/16 transition-colors duration-200 group-hover:bg-espresso group-hover:text-ivory">
            <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </a>
        <p className="mt-8 text-balance text-[22px] font-normal leading-[1.45] tracking-[-.02em] text-espresso/75 min-[700px]:mt-10 min-[700px]:text-[28px] rtl:leading-[1.7] rtl:tracking-normal">{content.message}</p>
      </div>
      <Marquee items={content.highlights} size="large" className="mt-12 min-[700px]:mt-20" controls={{ pause: content.pauseLabel, play: content.playLabel }} />
    </section>
  );
}
