import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { notFound } from "next/navigation";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const figtree = localFont({
  src: "../../public/assets/fonts/figtree-latin.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  
  if (lang === "ar") {
    return {
      title: "Royal Longevity | العناية الشخصية والجمال",
      description: "تجربة جمال متقنة في دبي.",
    };
  }

  return {
    title: "Royal Longevity | Beauty & Personal Care",
    description: "A considered beauty experience in Dubai.",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
