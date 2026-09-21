"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function GalleryMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = container.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>("[data-gallery-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 24,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
          clearProps: "opacity,transform",
        });
      });
      root.querySelectorAll<HTMLElement>("[data-gallery-card]").forEach((card) => {
        const image = card.querySelector<HTMLImageElement>("[data-gallery-image]");
        if (!image) return;

        // Animate the photograph inside its stationary, clipped frame.
        gsap.fromTo(image, { scale: 1.12 }, {
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
          clearProps: "transform",
        });
      });
    });
    return () => media.revert();
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
