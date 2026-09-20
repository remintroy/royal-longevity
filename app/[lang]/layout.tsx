import type { Metadata } from "next";
import "../globals.css";
import { notFound } from "next/navigation";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
