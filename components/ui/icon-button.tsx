import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
  ({ className, href, children, ...props }, ref) => {
    const baseClasses = cn(
      "grid place-content-center w-12 h-12 border border-espresso/16 rounded-full bg-ivory/72 text-ink text-xs font-bold tracking-[.08em] cursor-pointer focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3 hover:bg-ivory hover:border-espresso/30 active:scale-95 transition-all duration-300",
      className
    );

    if (href) {
      return (
        <Link href={href} className={baseClasses} ref={ref as React.Ref<HTMLAnchorElement>} {...(props as any)}>
          {children}
        </Link>
      );
    }

    return (
      <button className={baseClasses} ref={ref as React.Ref<HTMLButtonElement>} {...props}>
        {children}
      </button>
    );
  }
)
IconButton.displayName = "IconButton"
