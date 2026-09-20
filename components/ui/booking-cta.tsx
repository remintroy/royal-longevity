"use client";

import { useRef, type AnchorHTMLAttributes } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export interface BookingCtaProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
}

export function BookingCta({ label, className, ...props }: BookingCtaProps) {
  const container = useRef<HTMLAnchorElement>(null);
  const circle = useRef<HTMLSpanElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const button = container.current;
    const icon = circle.current;
    const caption = text.current;
    const glyph = arrow.current;
    if (!button || !icon || !caption || !glyph) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", (context) => {
      const config = { duration: 0.65, ease: "power3.inOut", overwrite: true };

      context.add("enter", () => {
        const rtl = getComputedStyle(button).direction === "rtl";
        // Layout offsets stay stable even when a previous hover tween is still running.
        const iconDestination = rtl ? 6 : button.clientWidth - 6 - icon.offsetWidth;
        const labelDestination = rtl ? button.clientWidth - 22 - caption.offsetWidth : 22;
        gsap.to(icon, { x: iconDestination - icon.offsetLeft, ...config });
        gsap.to(caption, { x: labelDestination - caption.offsetLeft, ...config });
        gsap.to(glyph, { rotation: rtl ? -360 : 360, ...config });
      });
      context.add("leave", () => {
        gsap.to([icon, caption], { x: 0, ...config });
        gsap.to(glyph, { rotation: 0, ...config });
      });
      // Named context callbacks keep event-created tweens covered by GSAP cleanup.
      const enter = () => context.enter();
      const leave = () => context.leave();
      button.addEventListener("mouseenter", enter);
      button.addEventListener("mouseleave", leave);
      const resize = new ResizeObserver(leave);
      resize.observe(button);

      return () => {
        button.removeEventListener("mouseenter", enter);
        button.removeEventListener("mouseleave", leave);
        resize.disconnect();
      };
    });
    return () => media.revert();
  }, { scope: container });

  return (
    <a ref={container} className={cn("booking-cta", className)} {...props}>
      <span ref={circle} className="cta-circle" aria-hidden="true">
        <span className="direction-arrow"><span ref={arrow} className="cta-arrow">↗</span></span>
      </span>
      <span ref={text} className="cta-label">{label}</span>
    </a>
  );
}
