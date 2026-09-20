"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Droplets, Flower2, Leaf, Sparkles, Activity, Scissors, Waves } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface MarqueeProps {
  items: string[];
  className?: string;
}

const marqueeIcons = [
  Droplets, // Skin Care
  Flower2,  // Spa
  Leaf,     // Wellness
  Sparkles, // Beauty
  Activity, // Treatment
  Scissors, // Salon
  Waves     // Relaxation
];

const Pill = ({ text, icon: Icon }: { text: string; icon: React.ElementType }) => (
  <div className="flex items-center gap-3 min-[700px]:gap-4 border border-espresso/16 rounded-full p-2 min-[700px]:p-2.5 bg-white/50 hover:bg-white/90 transition-colors">
    <div className="w-[48px] h-[48px] min-[700px]:w-[60px] min-[700px]:h-[60px] rounded-full bg-espresso/5 flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 min-[700px]:w-6 min-[700px]:h-6" stroke="url(#goldGradient)" />
    </div>
    <span className="text-[18px] min-[700px]:text-[24px] text-[#654b37] whitespace-nowrap pr-4 min-[700px]:pr-6 rtl:pr-0 rtl:pl-4 rtl:min-[700px]:pl-6 font-medium">
      {text}
    </span>
  </div>
);

export function Marquee({ items, className = "" }: MarqueeProps) {
  const container = useRef<HTMLDivElement>(null);
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);
  const tween1 = useRef<gsap.core.Tween | null>(null);
  const tween2 = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // Calculate a consistent duration based on items count
    const duration = items.length * 6; // Slower, smoother speed

    if (track1.current) {
      tween1.current = gsap.to(track1.current, {
        xPercent: -50,
        ease: "none",
        duration: duration,
        repeat: -1,
      });
    }

    if (track2.current) {
      tween2.current = gsap.fromTo(track2.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: duration,
          repeat: -1,
        }
      );
    }
  }, { scope: container });

  const handleMouseEnter = () => {
    if (tween1.current) gsap.to(tween1.current, { timeScale: 0.15, duration: 0.8, ease: "power2.out" });
    if (tween2.current) gsap.to(tween2.current, { timeScale: 0.15, duration: 0.8, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (tween1.current) gsap.to(tween1.current, { timeScale: 1, duration: 0.8, ease: "power2.out" });
    if (tween2.current) gsap.to(tween2.current, { timeScale: 1, duration: 0.8, ease: "power2.out" });
  };

  // Create a reversed array for the second row to offset the text visually
  const reversedItems = [...items].reverse();

  return (
    <div 
      ref={container} 
      className={`overflow-hidden relative w-full flex flex-col gap-2 min-[700px]:gap-4 py-4 min-[700px]:py-6 ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A57426" />
            <stop offset="5.93%" stopColor="#BB8A36" />
            <stop offset="13.01%" stopColor="#CE9D44" />
            <stop offset="20.31%" stopColor="#D9A84C" />
            <stop offset="28.09%" stopColor="#DDAC4F" />
            <stop offset="66.85%" stopColor="#C79534" />
            <stop offset="88.76%" stopColor="#F5C769" />
            <stop offset="100%" stopColor="#B38327" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top Row - Scrolls Left */}
      <div 
        ref={track1} 
        className="flex w-max items-center gap-2 min-[700px]:gap-3 pl-4"
      >
        {items.map((item, idx) => (
          <Pill key={`t1-s1-${idx}`} text={item} icon={marqueeIcons[idx % marqueeIcons.length]} />
        ))}
        {items.map((item, idx) => (
          <Pill key={`t1-s2-${idx}`} text={item} icon={marqueeIcons[idx % marqueeIcons.length]} />
        ))}
      </div>

      {/* Bottom Row - Scrolls Right */}
      <div 
        ref={track2} 
        className="flex w-max items-center gap-2 min-[700px]:gap-3 pr-4"
      >
        {reversedItems.map((item, idx) => {
          // Find original index to assign the correct icon
          const originalIdx = items.length - 1 - idx;
          return <Pill key={`t2-s1-${idx}`} text={item} icon={marqueeIcons[originalIdx % marqueeIcons.length]} />;
        })}
        {reversedItems.map((item, idx) => {
          const originalIdx = items.length - 1 - idx;
          return <Pill key={`t2-s2-${idx}`} text={item} icon={marqueeIcons[originalIdx % marqueeIcons.length]} />;
        })}
      </div>
    </div>
  );
}
