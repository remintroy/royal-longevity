"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealHeadingProps = Omit<ComponentPropsWithoutRef<"h2">, "children"> & {
  children: string;
};

export function RevealHeading({ children, ...props }: RevealHeadingProps) {
  const heading = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const element = heading.current;
    if (!element) return;

    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 700px)",
      mobile: "(max-width: 699px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reducedMotion) return;

      const words = element.querySelectorAll<HTMLElement>("[data-reveal-word]");

      // Animate whole words so Arabic letters remain joined.
      // Content stays visible without JavaScript or with reduced motion enabled.
      gsap.fromTo(words, {
        opacity: 0,
        y: 15,
        filter: context.conditions?.desktop ? "blur(8px)" : "blur(4px)",
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
        clearProps: "opacity,transform,filter",
      });
    });

    return () => media.revert();
  }, { scope: heading, dependencies: [children], revertOnUpdate: true });

  return (
    <h2 {...props} ref={heading}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {children.split(/(\s+)/u).map((part, index) => (
          /\s/u.test(part) ? part : (
            <span key={index} data-reveal-word className="inline-block whitespace-nowrap">
              {part}
            </span>
          )
        ))}
      </span>
    </h2>
  );
}
