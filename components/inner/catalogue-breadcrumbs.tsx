import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Language } from "@/data/site";
import { catalogueHero } from "@/data/catalogue/hero";

export type BreadcrumbItem = { label: string; href?: string };

export function CatalogueBreadcrumbs({
  lang,
  items,
}: {
  lang: Language;
  items: BreadcrumbItem[];
}) {
  return (
    <nav
      aria-label={catalogueHero.breadcrumb[lang]}
      className="mb-5 text-xs leading-relaxed"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li
            key={item.href ?? item.label}
            className="flex min-w-0 items-center gap-2"
          >
            {index > 0 && (
              <ChevronRight
                aria-hidden="true"
                size={12}
                className="shrink-0 text-espresso/40 rtl:rotate-180"
              />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-sm text-espresso/65 hover:text-espresso hover:underline hover:underline-offset-4"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="inline-flex min-h-11 items-center text-espresso"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
