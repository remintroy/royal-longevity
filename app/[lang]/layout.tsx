import type { Metadata } from "next";
import "../globals.css";
import type { Language } from "@/data/site";

export const metadata: Metadata = {
  title: "Royal Longevity | Beauty & Personal Care",
  description: "A considered beauty experience in Dubai.",
};

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
