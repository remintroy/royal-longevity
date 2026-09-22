import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";
import { getGalleryContent } from "@/data/gallery";
import { Experience } from "@/components/experience";
import { getExperienceContent } from "@/data/experience";
import { notFound } from "next/navigation";
import { getHeroContent } from "@/data/site";
import { Introduction } from "@/components/introduction";
import { getIntroductionContent } from "@/data/introduction";
import { Highlights } from "@/components/highlights";
import { getHighlightsContent } from "@/data/highlights";
import { BookingBanner } from "@/components/booking-banner";
import { getBookingBannerContent } from "@/data/booking-banner";
import { Reviews } from "@/components/reviews";
import { getReviewsContent } from "@/data/reviews";
import { Faq } from "@/components/faq";
import { getFaqContent } from "@/data/faq";
import { CuratedServices } from "@/components/curated-services";
import { getCuratedServicesContent } from "@/data/curated-services";
import { Location } from "@/components/location";
import { getLocationContent } from "@/data/location";
import { Footer } from "@/components/footer";
import { getFooterContent } from "@/data/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  const heroContent = getHeroContent(lang);

  return (
    <>
      <main className="min-h-[100svh] overflow-hidden">
        <Hero content={heroContent} lang={lang} />
        <Introduction content={getIntroductionContent(lang)} />
        <Experience
          content={getExperienceContent(lang)}
          bookingHref={heroContent.bookingHref}
        />
        <Gallery
          content={getGalleryContent(lang)}
          bookingHref={heroContent.bookingHref}
        />
        <Highlights content={getHighlightsContent(lang)} />
        <BookingBanner
          content={getBookingBannerContent(lang)}
          bookingHref={heroContent.bookingHref}
        />
        <Reviews content={getReviewsContent(lang)} />
        <Faq
          content={getFaqContent(lang)}
          bookingHref={heroContent.bookingHref}
        />
        <CuratedServices
          content={getCuratedServicesContent(lang)}
          bookingHref={heroContent.bookingHref}
        />
        <Location
          content={getLocationContent(lang)}
          bookingHref={heroContent.bookingHref}
        />
      </main>
      <Footer
        content={getFooterContent(lang)}
        bookingHref={heroContent.bookingHref}
      />
    </>
  );
}
