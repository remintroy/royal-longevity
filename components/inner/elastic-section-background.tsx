"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const straightEdge = "M 0 40 Q 500 40 1000 40 L 1000 80 L 0 80 Z";

export function ElasticSectionBackground() {
  const container = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const root = container.current;
      const path = line.current;
      if (!root || !path) return;

      // Use the usable viewport width, excluding the scrollbar, for a full-bleed line.
      const resize = () => {
        const width = document.documentElement.clientWidth;
        root.style.width = `${width}px`;
        root.style.marginInline = `calc((100% - ${width}px) / 2)`;
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(document.documentElement);

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const shape = { bend: 0 };
        const draw = () => {
          path.setAttribute(
            "d",
            `M 0 40 Q 500 ${40 + shape.bend * 2} 1000 40 L 1000 80 L 0 80 Z`,
          );
        };
        const pull = gsap.quickTo(shape, "bend", {
          duration: 0.2,
          ease: "power2.out",
          onUpdate: draw,
        });
        const release = gsap.quickTo(shape, "bend", {
          duration: 0.85,
          ease: "elastic.out(1, 0.5)",
          onUpdate: draw,
        });
        const settle = gsap
          .delayedCall(0.12, () => {
            pull.tween.pause();
            release(0);
          })
          .pause();

        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (trigger) => {
            if (!trigger.isActive) return;
            release.tween.pause();
            // Fixed ends, with a restrained centre deflection in the scroll direction.
            const limit = window.innerWidth < 600 ? 16 : 26;
            pull(
              gsap.utils.clamp(-limit, limit, trigger.getVelocity() * 0.018),
            );
            settle.restart(true);
          },
        });

        return () => path.setAttribute("d", straightEdge);
      });

      return () => {
        observer.disconnect();
        media.revert();
      };
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="pointer-events-none absolute inset-y-0 start-0 -z-10 w-full text-ink"
      aria-hidden="true"
    >
      <svg
        className="block h-20 w-full"
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path ref={line} d={straightEdge} fill="currentColor" />
      </svg>
      {/* A 1px overlap keeps the curved edge and solid surface seamless. */}
      <div className="absolute inset-x-0 top-[79px] bottom-0 bg-ink" />
    </div>
  );
}
