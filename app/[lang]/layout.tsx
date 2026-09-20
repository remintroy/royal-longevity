import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const editorial = localFont({ src: "../../branding/ROYAL LONGEVITY LOGO BOOK/ROYAL LONGEVITY BRAND FONTS/constanb.ttf", variable: "--font-editorial", display: "swap" });
const arabic = localFont({ src: "../../branding/ROYAL LONGEVITY LOGO BOOK/ROYAL LONGEVITY BRAND FONTS/AligarhArabiC.otf", variable: "--font-arabic", display: "swap" });

export function generateStaticParams() { return [{ lang: "en" }, { lang: "ar" }]; }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "رويال لونجيفيتي | عافية وجمال للسيدات" : "Royal Longevity | Wellness & Beauty for Women", description: lang === "ar" ? "وجهة للسيدات تجمع النادي الرياضي والبيلاتس واليوغا والمسبح والعناية بالبشرة والصالون والسبا." : "A women-only destination for movement, recovery and beauty. Discover gym, Pilates, yoga, pool, skin care, salon and spa experiences." };
}
export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  return <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={`${editorial.variable} ${arabic.variable}`}><body><SmoothScrollProvider>{children}</SmoothScrollProvider></body></html>;
}
