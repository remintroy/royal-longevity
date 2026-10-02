"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Keep focus containment active until the short exit transition finishes. */
export function usePopupMotion(onClose: () => void) {
  const [overlay, setOverlay] = useState<HTMLDivElement | null>(null);
  const closing = useRef(false);
  const motion = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(() => {
    if (!overlay) return;
    closing.current = false;
    const panel = overlay.firstElementChild;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const blur = getComputedStyle(overlay).backdropFilter;
      // The backdrop leads by only 20ms. Keep text sharp and controls usable
      // throughout; animate the card as one surface rather than staggering fields.
      const timeline = gsap.timeline();
      motion.current = timeline;
      timeline.fromTo(overlay,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: blur, duration: 0.24, ease: "power2.out" },
        0,
      );
      if (panel) timeline.fromTo(panel,
        { opacity: 0, y: 6, scale: 0.99, transformOrigin: "50% 60%" },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out",
          clearProps: "transform,transformOrigin,opacity",
        },
        0.02,
      );
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(overlay, { opacity: 1 });
    });
    return () => media.revert();
  }, { dependencies: [overlay], revertOnUpdate: true });

  const close = () => contextSafe(() => {
    if (closing.current) return;
    closing.current = true;
    // Interrupt entry cleanly, including its pending cleanup, for rapid dismissal.
    motion.current?.kill();
    if (!overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    const timeline = gsap.timeline({ onComplete: onClose });
    motion.current = timeline;
    timeline.to(overlay,
      { opacity: 0, backdropFilter: "blur(0px)", duration: 0.18, ease: "power2.inOut" },
      0,
    );
    if (overlay.firstElementChild) timeline.to(overlay.firstElementChild,
      { y: 3, scale: 0.995, opacity: 0, duration: 0.16, ease: "power2.in" },
      0,
    );
  })();

  return { overlayRef: setOverlay, close };
}
