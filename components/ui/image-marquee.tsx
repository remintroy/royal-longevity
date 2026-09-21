"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Pause, Play } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function ImageMarquee({ children, controls }: {
  children: ReactNode;
  controls: { pause: string; play: string };
}) {
  const container = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const track = container.current?.querySelector<HTMLElement>("[data-image-track]");
      if (!track) return;
      const tween = gsap.fromTo(track, { xPercent: 0 }, {
        xPercent: -50,
        duration: 55,
        ease: "none",
        repeat: -1,
        paused: pausedRef.current,
      });
      animation.current = tween;
      return () => { animation.current = null; };
    });
    return () => media.revert();
  }, { scope: container });

  useEffect(() => {
    pausedRef.current = paused;
    animation.current?.paused(paused);
  }, [paused]);

  return (
    <div ref={container} className="mt-16 min-[700px]:mt-24 min-[1200px]:mt-36">
      <div className="overflow-hidden" dir="ltr" aria-hidden="true">
        <div data-image-track className="flex w-max min-w-full motion-safe:will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex min-w-[100vw] shrink-0 items-start justify-around gap-3 pe-3 min-[700px]:gap-6 min-[700px]:pe-6">
              {children}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? controls.play : controls.pause}
        </button>
      </div>
    </div>
  );
}
