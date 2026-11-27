"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavGroup = {
  title?: string;
  links: { href: string; label: string; badge?: string }[];
};

function isActive(pathname: string, href: string) {
  return href === "/admin"
    ? pathname === "/admin"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  groups,
  pathname,
  onNavigate,
}: {
  groups: NavGroup[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="grid gap-6">
      {groups.map((group, index) => (
        <div key={group.title ?? index} className="grid gap-1">
          {group.title && (
            <p className="px-3 pb-1 text-xs uppercase tracking-[0.14em] text-espresso/50">
              {group.title}
            </p>
          )}
          <ul className="grid gap-0.5">
            {group.links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-10 items-center justify-between gap-2 rounded-full px-3 text-sm transition-colors duration-200",
                      "focus-visible:outline-2 focus-visible:outline-gold",
                      active
                        ? "bg-espresso text-ivory"
                        : "text-espresso/80 hover:bg-espresso/5 hover:text-espresso",
                    )}
                  >
                    <span className="truncate">{link.label}</span>
                    {link.badge && (
                      <span
                        className={cn(
                          "rounded-full px-2 text-xs tabular-nums",
                          active ? "bg-ivory/15" : "bg-ivory text-espresso/70",
                        )}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Sidebar on large screens; a menu panel on smaller ones. */
export function AdminNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav aria-label="Admin" className="hidden lg:block">
        <NavLinks groups={groups} pathname={pathname} />
      </nav>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="admin-mobile-nav"
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-espresso"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
        {open && (
          <nav
            id="admin-mobile-nav"
            aria-label="Admin"
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-30 max-h-[calc(100svh-6rem)] overflow-y-auto rounded-3xl border border-border bg-white p-3 shadow-[0_24px_64px_-24px_rgb(32_23_15/0.35)] motion-safe:animate-menu-in"
          >
            <NavLinks
              groups={groups}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </nav>
        )}
      </div>
    </>
  );
}
