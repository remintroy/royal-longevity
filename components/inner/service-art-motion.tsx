"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import type { ServiceArtAnimation } from "@/data/catalogue/service-art-motion";

gsap.registerPlugin(useGSAP);

export function ServiceArtMotion({
  children,
  animation,
  className,
}: {
  children: ReactNode;
  animation: ServiceArtAnimation;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-service-art-line]", {
          opacity: animation.fromOpacity,
          y: animation.offsetY,
          duration: animation.duration,
          stagger: { amount: animation.staggerAmount },
          ease: animation.ease,
          clearProps: "opacity,transform",
        });
      });
      return () => media.revert();
    },
    {
      scope: container,
      dependencies: [
        animation.fromOpacity,
        animation.offsetY,
        animation.duration,
        animation.staggerAmount,
        animation.ease,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={container}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 select-none overflow-hidden text-gold opacity-[0.13] min-[700px]:h-64 min-[700px]:opacity-[0.18] min-[900px]:top-auto min-[900px]:bottom-0 rtl:-scale-x-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
