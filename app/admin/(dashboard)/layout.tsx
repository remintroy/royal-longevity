import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { requireAdmin } from "@/lib/cms/auth";
import { landingSectionIds, getSectionSchema } from "@/lib/cms/sections";
import { isDbConfigured } from "@/lib/mongodb";
import { logout } from "../actions";
import { AdminNav, type NavGroup } from "../_components/admin-nav";
import { buttonClass, Notice } from "../_components/ui";

const navGroups: NavGroup[] = [
  { links: [{ href: "/admin", label: "Overview" }] },
  {
    title: "Catalogue",
    links: [
      { href: "/admin/catalogue/services", label: "Services" },
      { href: "/admin/catalogue/categories", label: "Categories" },
    ],
  },
  {
    title: "Landing page",
    links: landingSectionIds.map((id) => ({
      href: `/admin/content/${id}`,
      label: getSectionSchema(id).label,
    })),
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto grid min-h-svh w-full max-w-7xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8 lg:px-6">
      <header className="relative flex items-center justify-between gap-3 border-b border-border bg-white px-4 py-3 sm:px-6 lg:sticky lg:top-0 lg:h-svh lg:flex-col lg:items-stretch lg:justify-start lg:gap-8 lg:overflow-y-auto lg:border-0 lg:bg-transparent lg:px-0 lg:py-8">
        <Link
          href="/admin"
          className="grid gap-1 rounded-xl focus-visible:outline-2 focus-visible:outline-gold lg:px-3"
        >
          <BrandLogo lang="en" />
          <span className="text-xs tracking-[0.14em] text-espresso/60 uppercase">
            Content admin
          </span>
        </Link>
        <AdminNav groups={navGroups} />
        <div className="hidden gap-1 lg:mt-auto lg:grid">
          <a
            href="/en"
            target="_blank"
            rel="noreferrer"
            className={buttonClass("ghost", "justify-start")}
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            View website
          </a>
          <form action={logout}>
            <button className={buttonClass("ghost", "w-full justify-start")}>
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-0 lg:py-10">
        {!isDbConfigured() && (
          <Notice tone="error" className="mb-6">
            The database is not connected (MONGODB_URI is missing). You can
            browse, but changes cannot be saved.
          </Notice>
        )}
        {children}
        <form
          action={logout}
          className="mt-10 border-t border-border pt-6 lg:hidden"
        >
          <button className={buttonClass("ghost", "-ms-3")}>
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </button>
        </form>
      </main>
    </div>
  );
}
