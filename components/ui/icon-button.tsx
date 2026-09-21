import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type IconButtonProps = {
  className?: string;
  children: React.ReactNode;
} & (
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
);

export const IconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
  (props, ref) => {
    const { className, children } = props;
    const baseClasses = cn(
      "grid place-content-center w-12 h-12 border border-border rounded-full text-ink text-xs font-bold tracking-[.08em] cursor-pointer focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3 hover:bg-ivory hover:border-espresso/30 active:scale-95 transition-all duration-300",
      className
    );

    if (props.href !== undefined) {
      const { href, ...linkProps } = props;
      return (
        <Link {...linkProps} href={href} className={baseClasses} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      );
    }

    return (
      <button {...props} className={baseClasses} ref={ref as React.Ref<HTMLButtonElement>}>
        {children}
      </button>
    );
  }
)
IconButton.displayName = "IconButton"
