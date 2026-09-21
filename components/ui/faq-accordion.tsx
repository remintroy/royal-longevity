"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function FaqAccordion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  const handleClick = contextSafe((event: MouseEvent<HTMLDivElement>) => {
    const summary = (event.target as Element).closest("summary");
    const selected = summary?.parentElement;
    if (!(selected instanceof HTMLDetailsElement)) return;
    event.preventDefault();

    // During a closing tween, `open` stays set so the answer can animate out.
    const shouldOpen = (summary?.getAttribute("aria-expanded") ?? String(selected.open)) === "false";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    event.currentTarget.querySelectorAll<HTMLDetailsElement>("details").forEach((card) => {
      const trigger = card.querySelector("summary");
      const panel = card.querySelector<HTMLElement>("[data-faq-panel]");
      const answer = card.querySelector<HTMLElement>("[data-faq-answer]");
      const arrow = card.querySelector<SVGElement>("[data-faq-arrow]");
      if (!trigger || !panel || !answer || !arrow) return;

      const expand = card === selected && shouldOpen;
      if (card !== selected && !card.open) return;
      gsap.killTweensOf([panel, answer, arrow]);
      trigger.setAttribute("aria-expanded", String(expand));

      if (reducedMotion) {
        card.open = expand;
        gsap.set(panel, { clearProps: "height,overflow" });
        gsap.set(answer, { clearProps: "opacity,transform" });
        gsap.set(arrow, { rotation: expand ? 180 : 0 });
        return;
      }

      if (expand && !card.open) {
        card.open = true;
        gsap.set(panel, { height: 0 });
        gsap.set(answer, { opacity: 0, y: -6 });
      }

      // Height is intentional: the expanding answer pushes subsequent cards down.
      gsap.set(panel, { height: panel.getBoundingClientRect().height, overflow: "hidden" });
      gsap.to(panel, {
        height: expand ? panel.scrollHeight : 0,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          card.open = expand;
          gsap.set(panel, { clearProps: "height,overflow" });
        },
      });
      gsap.to(answer, { opacity: expand ? 1 : 0, y: expand ? 0 : -6, duration: 0.5, ease: "power3.out" });
      gsap.to(arrow, { rotation: expand ? 180 : 0, duration: 0.6, ease: "power3.out" });
    });
  });

  return <div ref={container} onClick={handleClick} className="grid min-w-0 gap-3 min-[700px]:gap-4">{children}</div>;
}
