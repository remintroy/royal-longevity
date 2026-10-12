import { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";

interface BrandLogoProps {
  lang: Language;
  className?: string;
}

export function BrandLogo({ lang, className = "" }: BrandLogoProps) {
  return (
    <div
      className={`flex items-center gap-2 min-[700px]:gap-[10px] ${className}`}
    >
      <img
        src="/branding/icon-gold.png"
        alt=""
        className="h-[28px] w-auto min-[700px]:h-[32px]"
      />
      <img
        src={
          lang === "ar"
            ? "/branding/text-arabic-black-cropped.png"
            : "/branding/text-english-black-cropped.png"
        }
        alt={ui.brand[lang]}
        className={
          lang === "ar"
            ? "h-8 w-auto shrink-0 min-[700px]:h-9"
            : "h-4 w-auto shrink-0 min-[400px]:h-[18px] min-[700px]:h-[22px]"
        }
      />
    </div>
  );
}
