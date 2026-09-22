import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      className={cn(
        "group/link inline-flex min-h-11 items-center gap-3.5 text-[13px]",
        className,
      )}
      href={href}
    >
      {children}
      <span className="grid size-11 place-items-center rounded-full border border-border transition-colors duration-200 group-hover/link:bg-ivory motion-reduce:transition-none">
        <ArrowRight className="rtl:-scale-x-100" size={18} aria-hidden="true" />
      </span>
    </Link>
  );
}
