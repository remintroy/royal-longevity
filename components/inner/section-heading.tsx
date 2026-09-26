import { RevealHeading } from "@/components/ui/reveal-heading";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id?: string;
  animate?: boolean;
  startAfter?: number;
};

export function SectionHeading({
  eyebrow,
  title,
  id,
  animate = false,
  startAfter = 0,
}: SectionHeadingProps) {
  const Heading = animate ? RevealHeading : "h2";
  return (
    <>
      <p className="mb-[17px] flex items-center gap-2.5 text-[11px] leading-[1.65] tracking-[.12em] uppercase rtl:tracking-normal before:text-[9px] before:text-gold before:content-['◆']">
        {eyebrow}
      </p>
      <Heading
        {...(animate ? { startAfter } : {})}
        id={id}
        className="max-w-[760px] text-[clamp(1.95rem,3.2vw,3.15rem)] leading-[1.13] font-normal tracking-[-.035em] text-balance rtl:leading-[1.4] rtl:tracking-normal"
      >
        {title}
      </Heading>
    </>
  );
}
