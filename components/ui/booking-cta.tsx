"use client";

import * as React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export interface BookingCtaProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
}

export const BookingCta = React.forwardRef<HTMLAnchorElement, BookingCtaProps>(
  ({ className, label, ...props }, ref) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const circleRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!circleRef.current || !textRef.current || !arrowRef.current) return;
      
      const gap = 14;
      const extraPadding = 13;
      
      // Calculate dynamically on hover to guarantee accurate font widths
      const circleWidth = circleRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const isRtl = document.documentElement.dir === "rtl";
      const direction = isRtl ? -1 : 1;

      const circleMoveX = textWidth + gap + extraPadding;
      const textMoveX = extraPadding - (circleWidth + gap);

      const config = { duration: 0.7, ease: "power3.inOut", overwrite: true };

      gsap.to(circleRef.current, { x: circleMoveX * direction, ...config });
      gsap.to(textRef.current, { x: textMoveX * direction, ...config });
      gsap.to(arrowRef.current, { rotation: 360 * direction, ...config });
      
      props.onMouseEnter?.(e);
    });

    const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!circleRef.current || !textRef.current || !arrowRef.current) return;
      
      const config = { duration: 0.7, ease: "power3.inOut", overwrite: true };

      gsap.to(circleRef.current, { x: 0, ...config });
      gsap.to(textRef.current, { x: 0, ...config });
      gsap.to(arrowRef.current, { rotation: 0, ...config });
      
      props.onMouseLeave?.(e);
    });

    return (
      <a 
        className={cn(
          "group relative inline-flex items-center px-[7px] py-[6px] min-h-[54px] rounded-full bg-espresso text-ivory text-sm font-bold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3 hover:bg-[#422b1b]",
          className
        )}
        ref={(node) => {
          (containerRef as any).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as any).current = node;
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span 
          ref={circleRef}
          className="relative z-10 grid w-10 h-10 flex-shrink-0 place-content-center rounded-full bg-ivory text-espresso text-[20px] me-[14px]" 
          aria-hidden="true"
        >
          <span className="rtl:-scale-x-100 flex place-content-center">
            <span ref={arrowRef} className="block">↗</span>
          </span>
        </span>
        <span ref={textRef} className="relative z-0 whitespace-nowrap">
          {label}
        </span>
        <span className="w-[13px] flex-shrink-0" aria-hidden="true" />
      </a>
    )
  }
)
BookingCta.displayName = "BookingCta"
