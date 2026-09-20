import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "outline" | "ghost";
  icon?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLParagraphElement, BadgeProps>(
  ({ className, variant = "outline", icon, children, ...props }, ref) => {
    const isOutline = variant === "outline";
    
    return (
      <p 
        className={cn(
          "inline-flex items-center text-[#654b37]",
          isOutline 
            ? "gap-[7px] px-[13px] py-[9px] border border-espresso/16 rounded-full text-xs" 
            : "gap-[9px] m-0 text-[13px]",
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && (
          <span className="text-gold text-base" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </p>
    )
  }
)
Badge.displayName = "Badge"
