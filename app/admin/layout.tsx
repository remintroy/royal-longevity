import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Royal Longevity — Content admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-svh bg-ivory/40 font-sans text-espresso antialiased">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
