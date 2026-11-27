import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

const figtree = localFont({
  src: "../../public/assets/fonts/figtree-latin.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Content admin · Royal Longevity",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} antialiased`}>
      <body className="min-h-svh bg-ivory/40 font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
