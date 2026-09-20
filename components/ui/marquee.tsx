"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!track.current) return;
    
    // We animate the track to -50% of its width, which corresponds to exactly one set of items.
    tween.current = gsap.to(track.current, {
      xPercent: -50,
      ease: "none",
      duration: items.length * 4, // Adjust duration based on number of items for a smooth speed
      repeat: -1,
    });
  }, { scope: container });

  const handleMouseEnter = () => {
    if (tween.current) {
      gsap.to(tween.current, { timeScale: 0.2, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (tween.current) {
      gsap.to(tween.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <div 
      ref={container} 
      className={`overflow-hidden relative w-full ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={track} 
        className="flex w-max items-center py-6 min-[700px]:py-8"
      >
        {/* First set */}
        {items.map((item, idx) => (
          <div key={`set1-${idx}`} className="flex items-center">
            <span className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-espresso whitespace-nowrap px-8 min-[700px]:px-12">
              {item}
            </span>
            <span className="text-espresso/40 px-2">✦</span>
          </div>
        ))}
        {/* Second set for seamless loop */}
        {items.map((item, idx) => (
          <div key={`set2-${idx}`} className="flex items-center">
            <span className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-espresso whitespace-nowrap px-8 min-[700px]:px-12">
              {item}
            </span>
            {/* Omit the last star if desired, but we need identical sets for seamless looping */}
            <span className="text-espresso/40 px-2">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
