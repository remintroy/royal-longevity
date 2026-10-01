"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { interludeContours } from "@/data/catalogue/catalogue-art";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function OpeningArt() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top 92%",
              once: true,
            },
          })
          .from(
            "[data-opening-shape]",
            {
              opacity: 0,
              filter: "blur(6px)",
              duration: 0.7,
              ease: "power3.out",
              clearProps: "opacity,filter",
            },
            0,
          )
          .from(
            "[data-opening-extension]",
            {
              scaleX: 0,
              opacity: 0,
              duration: 1.4,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            0,
          );
      });
      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="pointer-events-none relative ms-[calc((100%-100cqw)/2)] flex h-40 w-[100cqw] items-center overflow-hidden pt-10 text-gold/35 select-none min-[700px]:h-48"
    >
      <span
        data-opening-extension
        className="h-px w-[max(24px,calc((100cqw-1370px)/2+96px))] shrink-0 origin-right bg-current rtl:origin-left"
      />
      {/* The cropped viewBox puts both path endpoints exactly on the side edges
          and on the vertical centre, so extensions stay joined at every width. */}
      <svg
        data-opening-shape
        viewBox="30 40 540 210"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="butt"
        focusable="false"
        className="h-auto w-[min(60cqw,330px)] shrink-0 rtl:-scale-x-100"
      >
        {interludeContours.opening.map((path) => (
          <path key={path} d={path} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <span
        data-opening-extension
        className="h-px min-w-0 flex-1 origin-left bg-current rtl:origin-right"
      />
    </div>
  );
}
