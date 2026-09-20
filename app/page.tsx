import Image from "next/image";
import { heroContent } from "@/data/site";

export default function Home() {
  return (
    <main className="hero-shell">
      <div className="hero-layout" id="top">
        <section className="hero-left" aria-labelledby="hero-title">
          <nav className="hero-nav" aria-label="Primary navigation">
            <a className="brand-mark" href="#top" aria-label="Royal Longevity home">
              <Image src="/branding/royal-longevity-beauty-logo.png" alt="Royal Longevity Beauty" width={156} height={51} priority />
            </a>
            <div className="nav-actions">
              <button className="utility-button" type="button" aria-label="Change language">EN</button>
              <button className="utility-button menu-button" type="button" aria-label="Open menu"><span /><span /><span /></button>
            </div>
          </nav>

          <div className="hero-content">
            <p className="location-tag"><span aria-hidden="true">⌖</span>{heroContent.location}</p>
            <h1 id="hero-title">{heroContent.title}</h1>
            <p className="hero-copy">{heroContent.description}</p>
            <div className="hero-actions">
              <p className="trust-signal"><span className="trust-icon" aria-hidden="true">✦</span>{heroContent.trustSignal}</p>
              <a className="booking-action" href={heroContent.bookingHref} target="_blank" rel="noreferrer">
                <span className="booking-icon" aria-hidden="true">↗</span><span>{heroContent.bookingLabel}</span>
              </a>
            </div>
          </div>

          <section className="hero-highlights" aria-label="Royal Longevity experience">
            {heroContent.highlights.map((highlight) => (
              <div className="highlight" key={highlight.value}>
                <strong>{highlight.value}</strong><span>{highlight.label}</span>
              </div>
            ))}
          </section>
        </section>

        <section className="hero-image" aria-label={heroContent.imageAlt}>
          <div className="image-placeholder" role="img" aria-label={heroContent.imageAlt}><span>Hero image placeholder</span></div>
        </section>
      </div>
    </main>
  );
}
