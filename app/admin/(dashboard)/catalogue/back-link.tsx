import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-4 inline-flex min-h-10 items-center gap-1.5 rounded-full pe-3 text-sm text-espresso/70 hover:text-espresso focus-visible:outline-2 focus-visible:outline-gold"
    >
      <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
      {label}
    </Link>
  );
}
