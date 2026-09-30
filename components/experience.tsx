import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import type { ExperienceContent } from "@/data/experience";

export function Experience({
  content,
  bookingHref,
}: {
  content: ExperienceContent;
  bookingHref: string;
}) {
  return (
    <section
      aria-labelledby="experience-title"
      className="bg-white py-20 text-espresso min-[700px]:py-[128px]"
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-center px-6 text-center">
        <h2 id="experience-title" className="sr-only">
          {content.title}
        </h2>
        <a
          href={bookingHref}
          target="_blank"
          rel="noreferrer"
          aria-label={content.contactLabel}
          className="group flex max-w-full items-center gap-4 rounded-3xl border border-border p-4 text-start transition-colors duration-200 hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border">
            <Image
              src="/branding/icon-gold.png"
              width={32}
              height={32}
              alt=""
              className="h-8 w-auto"
            />
          </span>
          <span className="text-sm leading-relaxed min-[700px]:text-base">
            {content.team}
            <span className="block text-espresso/65">{content.title}</span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition-colors duration-200 group-hover:bg-espresso group-hover:text-ivory">
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.93 11.93 0 0 0 5.79 1.48h.01c6.58 0 11.94-5.35 11.95-11.94a11.87 11.87 0 0 0-3.48-8.42ZM12.05 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.95 9.87Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
            </svg>
          </span>
        </a>
        <p className="mt-8 text-balance text-[22px] font-normal leading-[1.45] tracking-[-.02em] text-espresso/75 min-[700px]:mt-10 min-[700px]:text-[28px] rtl:leading-[1.7] rtl:tracking-normal">
          {content.message}
        </p>
      </div>
      <Marquee
        items={content.highlights}
        size="large"
        className="mt-12 min-[700px]:mt-20"
        controls={{ pause: content.pauseLabel, play: content.playLabel }}
      />
    </section>
  );
}
