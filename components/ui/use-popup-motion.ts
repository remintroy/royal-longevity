"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Keep the accessible overlay mounted until its close animation finishes. */
export function usePopupMotion(onClose: () => void) {
  const [overlay, setOverlay] = useState<HTMLDivElement | null>(null);
  const closing = useRef(false);
  const { contextSafe } = useGSAP(() => {
    if (!overlay) return;
    closing.current = false;
    const panel = overlay.firstElementChild;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const blur = getComputedStyle(overlay).backdropFilter;
      gsap.fromTo(overlay,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: blur, duration: 0.32, ease: "power2.out" },
      );
      if (panel) gsap.fromTo(panel,
        { opacity: 0, y: 8, scale: 0.98, filter: "blur(3px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.32, ease: "power3.out", clearProps: "transform,filter,opacity" },
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
    if (!overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    gsap.killTweensOf([overlay, overlay.firstElementChild]);
    const timeline = gsap.timeline({ onComplete: onClose });
    timeline.to(overlay, { opacity: 0, backdropFilter: "blur(0px)", duration: 0.26, ease: "power2.inOut" }, 0);
    if (overlay.firstElementChild) timeline.to(overlay.firstElementChild,
      { y: 4, scale: 0.98, opacity: 0, duration: 0.26, ease: "power2.inOut" }, 0);
  })();

  return { overlayRef: setOverlay, close };
}
