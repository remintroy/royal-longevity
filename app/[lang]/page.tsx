import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { Introduction } from "@/components/introduction";
import { Experience } from "@/components/experience";
import { Gallery } from "@/components/gallery";
import { Highlights } from "@/components/highlights";
import { BookingBanner } from "@/components/booking-banner";
import { Faq } from "@/components/faq";
import { CuratedServices } from "@/components/curated-services";
import { Footer } from "@/components/footer";
import { getLandingSection } from "@/lib/cms/landing";
import { hydrateCatalogue } from "@/lib/cms/catalogue";

// The Reviews section is disabled for now. Its component and data remain in
// components/reviews.tsx and data/reviews.ts so it can be re-enabled later.

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  // Marquee and bento read the catalogue, which may include CMS-created services.
  await hydrateCatalogue();

  const [
    heroContent,
    introductionContent,
    experienceContent,
    galleryContent,
    highlightsContent,
    bookingBannerContent,
    faqContent,
    curatedServicesContent,
    footerContent,
  ] = await Promise.all([
    getLandingSection("hero", lang),
    getLandingSection("introduction", lang),
    getLandingSection("experience", lang),
    getLandingSection("gallery", lang),
    getLandingSection("highlights", lang),
    getLandingSection("bookingBanner", lang),
    getLandingSection("faq", lang),
    getLandingSection("curatedServices", lang),
    getLandingSection("footer", lang),
  ]);

  return (
    <>
      <main className="min-h-[100svh] overflow-hidden">
        <Hero content={heroContent} lang={lang} />
        <Introduction content={introductionContent} />
        <Experience
          content={experienceContent}
          bookingHref={heroContent.bookingHref}
        />
        <Gallery
          content={galleryContent}
          bookingHref={heroContent.bookingHref}
        />
        <Highlights content={highlightsContent} />
        <BookingBanner
          content={bookingBannerContent}
          bookingHref={heroContent.bookingHref}
        />
        <Faq content={faqContent} bookingHref={heroContent.bookingHref} />
        <CuratedServices
          content={curatedServicesContent}
          bookingHref={heroContent.bookingHref}
        />
      </main>
      <Footer
        lang={lang}
        content={footerContent}
        bookingHref={heroContent.bookingHref}
      />
    </>
  );
}
