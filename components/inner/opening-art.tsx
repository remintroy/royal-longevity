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
          .from("[data-opening-shape]", {
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
            clearProps: "opacity",
          })
          .from("[data-opening-extension]", {
            scaleX: 0,
            duration: 0.65,
            ease: "power3.out",
            clearProps: "transform",
          });
      });
      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="pointer-events-none relative -my-6 ms-[calc((100%-100cqw)/2)] flex h-24 w-[100cqw] items-center overflow-hidden text-gold/35 select-none min-[700px]:-my-4 min-[700px]:h-32"
      dir="ltr"
    >
      <span
        data-opening-extension
        className="h-px min-w-0 flex-1 origin-right bg-current"
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
        className="h-auto w-[min(72cqw,330px)] shrink-0"
      >
        {interludeContours.opening.map((path) => (
          <path key={path} d={path} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <span
        data-opening-extension
        className="h-px min-w-0 flex-1 origin-left bg-current"
      />
    </div>
  );
}
