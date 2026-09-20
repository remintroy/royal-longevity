import Image from "next/image";
import type { Language } from "@/data/site";

export function BrandLogo({ lang, className = "" }: { lang: Language; className?: string }) {
  return <span className={`brand-logo ${className}`}>
    <Image src="/branding/icon-gold.png" width={32} height={32} alt="" />
    <span className="brand-wordmark"><Image src={lang === "ar" ? "/branding/text-arabic-black.png" : "/branding/text-english-black.png"} width={180} height={180} alt={lang === "ar" ? "رويال لونجيفيتي" : "Royal Longevity"} /></span>
  </span>;
}
