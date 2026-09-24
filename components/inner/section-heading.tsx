type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, id }: SectionHeadingProps) {
  return (
    <>
      <p className="mb-[17px] flex items-center gap-2.5 text-[11px] leading-[1.65] tracking-[.12em] uppercase rtl:tracking-normal before:text-[9px] before:text-gold before:content-['◆']">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="max-w-[760px] text-[clamp(1.95rem,3.2vw,3.15rem)] leading-[1.13] font-normal tracking-[-.035em] text-balance rtl:leading-[1.4] rtl:tracking-normal"
      >
        {title}
      </h2>
    </>
  );
}
