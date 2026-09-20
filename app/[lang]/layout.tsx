import type { Metadata } from "next";
import "../globals.css";
import type { Language } from "@/data/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }): Promise<Metadata> {
  const { lang } = await params;
  
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
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
