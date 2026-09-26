"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ServiceCardsMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      // Hero media finishes at 2s; let the collection title lead the cards.
      const readyAt = performance.now() + 2400;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const columns =
          getComputedStyle(root).gridTemplateColumns.split(" ").length;

        // Each card reveals on entry, so later rows wait until they are visible.
        root
          .querySelectorAll<HTMLElement>("[data-service-card]")
          .forEach((card, index) => {
            const timeline = gsap.timeline({
              paused: true,
            });
            timeline.from(card, {
              opacity: 0,
              y: 16,
              duration: 0.65,
              ease: "power3.out",
              clearProps: "opacity,transform",
            });

            const image = card.querySelector<HTMLImageElement>(
              "[data-service-image]",
            );
            if (image) {
              // Match the hero's 10% zoom-out inside a stationary image frame.
              timeline.from(
                image,
                {
                  scale: 1.1,
                  duration: 2,
                  ease: "expo.out",
                  clearProps: "transform",
                },
                0,
              );
            }
            ScrollTrigger.create({
              trigger: card,
              start: "top 92%",
              once: true,
              onEnter: () => {
                const remaining = Math.max(
                  0,
                  (readyAt - performance.now()) / 1000,
                );
                timeline.delay(remaining + (index % columns) * 0.1).play();
              },
            });
          });
      });

      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mt-8 grid w-full grid-cols-1 items-stretch gap-5 min-[600px]:grid-cols-2"
    >
      {children}
    </div>
  );
}
