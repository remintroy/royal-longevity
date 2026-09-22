import { Language } from "@/data/site";

interface BrandLogoProps {
  lang: Language;
  className?: string;
}

export function BrandLogo({ lang, className = "" }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2 min-[700px]:gap-[10px] ${className}`}>
      <img
        src="/branding/icon-gold.png"
        alt="Royal Longevity Icon"
        className="h-[28px] w-auto min-[700px]:h-[32px]"
      />
      <img
        src={lang === "ar" ? "/branding/text-arabic-black.png" : "/branding/text-english-black.png"}
        alt="Royal Longevity"
        className="h-[138px] w-auto min-[700px]:h-[180px]"
      />
    </div>
  );
}
