"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Paired with the image layer's 50% vertical overscan in Introduction.
const PARALLAX_TRAVEL_PERCENT = 24;

function animateParallax(root: HTMLElement, image: HTMLElement) {
  gsap.fromTo(
    image,
    { yPercent: -PARALLAX_TRAVEL_PERCENT },
    {
      yPercent: PARALLAX_TRAVEL_PERCENT,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
}

function animateHeading(root: HTMLElement) {
  gsap.from(root.querySelectorAll("[data-intro-reveal]"), {
    opacity: 0,
    y: 20,
    duration: 0.7,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: root,
      start: "top 80%",
      once: true,
    },
  });
}

function animateStatistics(panel: HTMLElement) {
  // One trigger keeps the panel reveal and all counters synchronized.
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "top 90%",
      once: true,
    },
  });

  timeline.from(panel, {
    opacity: 0,
    y: 8,
    scale: 0.98,
    duration: 0.6,
    ease: "power3.out",
  });

  const counters = Array.from(
    panel.querySelectorAll<HTMLElement>("[data-intro-count]"),
    (element) => ({ element, finalText: element.textContent }),
  );

  counters.forEach(({ element, finalText }) => {
    const counter = { value: 0 };

    timeline.to(counter, {
      value: Number(element.dataset.introCount),
      duration: 1.2,
      ease: "power2.out",
      onStart: () => {
        element.textContent = "0";
      },
      onUpdate: () => {
        element.textContent = String(Math.round(counter.value));
      },
      onComplete: () => {
        element.textContent = finalText;
      },
    }, 0);
  });

  // GSAP reverts styles itself; restore text mutations separately on cleanup.
  return () => {
    counters.forEach(({ element, finalText }) => {
      element.textContent = finalText;
    });
  };
}

export function IntroductionMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = container.current;
    if (!root) return;

    const image = root.querySelector<HTMLElement>("[data-intro-parallax]");
    const panel = root.querySelector<HTMLElement>("[data-intro-panel]");
    if (!image || !panel) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      animateParallax(root, image);
      animateHeading(root);
      return animateStatistics(panel);
    });

    return () => media.revert();
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
