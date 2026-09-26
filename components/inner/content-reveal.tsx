"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ContentReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        root
          .querySelectorAll<HTMLElement>("[data-content-reveal]")
          .forEach((item) => {
            gsap.from(item, {
              opacity: 0,
              y: 16,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 92%", once: true },
              clearProps: "opacity,transform",
            });
          });
        root
          .querySelectorAll<HTMLElement>("[data-content-image]")
          .forEach((image) => {
            gsap.from(image, {
              scale: 1.1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image.parentElement,
                start: "top 92%",
                once: true,
              },
              clearProps: "transform",
            });
          });
      });
      return () => media.revert();
    },
    { scope: container },
  );
  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
