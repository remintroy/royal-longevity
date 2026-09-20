import * as React from "react"
import { cn } from "@/lib/utils"

export interface BookingCtaProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
}

export const BookingCta = React.forwardRef<HTMLAnchorElement, BookingCtaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <a 
        className={cn(
          "group inline-flex items-center gap-[14px] min-h-[54px] ps-[7px] pe-[20px] py-[6px] rounded-full bg-espresso text-ivory text-sm font-bold no-underline transition-all duration-200 ease-in-out hover:bg-[#422b1b] active:scale-[.98] focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="grid w-10 h-10 place-content-center rounded-full bg-ivory text-espresso text-[20px] transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] rtl:-scale-x-100 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] rtl:group-hover:-translate-x-[3px]" aria-hidden="true">
          ↗
        </span>
        <span>{label}</span>
      </a>
    )
  }
)
BookingCta.displayName = "BookingCta"
