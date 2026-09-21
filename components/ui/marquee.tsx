"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Droplets, Flower2, Leaf, Sparkles, Activity, Scissors, Waves, Pause, Play } from "lucide-react";

gsap.registerPlugin(useGSAP);

interface MarqueeProps {
  items: string[];
  className?: string;
  size?: "default" | "large";
  controls?: { pause: string; play: string };
}

const marqueeIcons = [Droplets, Flower2, Leaf, Sparkles, Activity, Scissors, Waves];

export function Marquee({ items, className = "", size = "default", controls }: MarqueeProps) {
  const container = useRef<HTMLDivElement>(null);
  const tweens = useRef<gsap.core.Tween[]>([]);
  const [paused, setPaused] = useState(false);
  const large = size === "large";

  useGSAP(() => {
    const media = gsap.matchMedia();
    tweens.current = [];
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tracks = container.current?.querySelectorAll<HTMLElement>("[data-marquee-track]");
      tracks?.forEach((track, index) => {
        tweens.current.push(gsap.fromTo(track, { xPercent: index === 0 ? 0 : -50 }, {
          xPercent: index === 0 ? -50 : 0,
          ease: "none",
          duration: items.length * (large ? 9 : 6),
          repeat: -1,
        }));
      });
    });
    return () => media.revert();
  }, { scope: container, dependencies: [items, large], revertOnUpdate: true });

  useEffect(() => {
    tweens.current.forEach((tween) => tween.paused(paused));
  }, [paused]);

  return (
    <div ref={container} className={`marquee relative w-full ${className}`}>
      <ul className="sr-only">{items.map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="flex flex-col gap-2 overflow-hidden py-4 min-[700px]:gap-4 min-[700px]:py-6" dir="ltr" aria-hidden="true">
        {[items, [...items].reverse()].map((row, rowIndex) => (
          <div key={rowIndex} className="marquee-row overflow-hidden">
            <div data-marquee-track className="flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="marquee-copy flex shrink-0 items-center gap-2 pe-2 min-[700px]:gap-3 min-[700px]:pe-3">
                  {row.map((item) => {
                    const Icon = marqueeIcons[items.indexOf(item) % marqueeIcons.length];
                    return (
                      <div key={item} dir="auto" className={`flex items-center gap-3 rounded-full border border-border bg-white/50 p-2 min-[700px]:gap-4 min-[700px]:p-2.5 ${large ? "min-[700px]:gap-5" : ""}`}>
                        <span className={`flex size-12 shrink-0 items-center justify-center rounded-full bg-espresso/5 ${large ? "border border-border min-[700px]:size-[72px]" : "min-[700px]:size-[60px]"}`}>
                          <Icon className="size-5 text-gold min-[700px]:size-6" strokeWidth={1.5} />
                        </span>
                        <span className={`whitespace-nowrap pe-4 text-[#654b37] min-[700px]:pe-6 ${large ? "text-[24px] font-normal tracking-[-.035em] min-[700px]:text-[clamp(32px,3vw,48px)] rtl:tracking-normal" : "text-[18px] font-medium min-[700px]:text-[24px]"}`}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {controls && (
        <div className="mt-3 flex justify-center motion-reduce:hidden">
          <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? controls.play : controls.pause}
            className="flex min-h-11 items-center gap-2 rounded-full px-4 text-xs text-espresso/70 transition-colors hover:bg-espresso/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso">
            {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            {paused ? controls.play : controls.pause}
          </button>
        </div>
      )}
    </div>
  );
}
