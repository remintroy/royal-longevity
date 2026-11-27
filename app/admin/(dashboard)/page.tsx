import Link from "next/link";
import { ArrowRight, FolderTree, Plus, Sparkles } from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import { getAdminCatalogue } from "@/lib/cms/catalogue";
import { getSectionState } from "@/lib/cms/section-content";
import { getSectionSchema, landingSectionIds } from "@/lib/cms/sections";
import { Badge, buttonClass, PageHeader, panelClass } from "../_components/ui";

export default async function AdminOverview() {
  await requireAdmin();
  const [{ categories, services }, sectionStates] = await Promise.all([
    getAdminCatalogue(),
    Promise.all(landingSectionIds.map((id) => getSectionState(id))),
  ]);

  const publishedCount = services.filter((service) => service.published).length;
  const hiddenCount = services.length - publishedCount;
  const sections = landingSectionIds.map((id, index) => ({
    id,
    schema: getSectionSchema(id),
    edited: sectionStates[index].source !== "default",
  }));

  const stats = [
    {
      label: "Services",
      value: services.length,
      detail: hiddenCount
        ? `${publishedCount} live · ${hiddenCount} hidden`
        : "All live",
      href: "/admin/catalogue/services",
      icon: Sparkles,
    },
    {
      label: "Categories",
      value: categories.length,
      detail: `${categories.filter((category) => category.origin === "custom").length} added in the admin`,
      href: "/admin/catalogue/categories",
      icon: FolderTree,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Welcome back"
        description="Manage your services and categories, and edit every section of the landing page in English and Arabic."
        actions={
          <>
            <Link
              href="/admin/catalogue/services/new"
              className={buttonClass("primary")}
            >
              <Plus className="size-4" aria-hidden="true" />
              New service
            </Link>
            <Link
              href="/admin/catalogue/categories/new"
              className={buttonClass("secondary")}
            >
              <Plus className="size-4" aria-hidden="true" />
              New category
            </Link>
          </>
        }
      />

      <section aria-labelledby="catalogue-heading" className="mb-10">
        <h2 id="catalogue-heading" className="mb-3 text-lg text-ink">
          Catalogue
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {stats.map((stat) => (
            <li key={stat.label}>
              <Link
                href={stat.href}
                className={`${panelClass} group flex items-center gap-4 p-5 transition-colors duration-200 hover:border-espresso/30 focus-visible:outline-2 focus-visible:outline-gold`}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ivory text-espresso">
                  <stat.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="grid flex-1 gap-0.5">
                  <span className="text-sm text-espresso/65">{stat.label}</span>
                  <span className="text-2xl tabular-nums text-ink">
                    {stat.value}
                  </span>
                  <span className="text-xs text-espresso/60">
                    {stat.detail}
                  </span>
                </span>
                <ArrowRight
                  className="size-4 text-espresso/50 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="mb-1 text-lg text-ink">
          Landing page sections
        </h2>
        <p className="mb-3 text-sm text-espresso/65">
          In page order, from the top of the homepage.
        </p>
        <ol className={`${panelClass} divide-y divide-border overflow-hidden`}>
          {sections.map((section, index) => (
            <li key={section.id}>
              <Link
                href={`/admin/content/${section.id}`}
                className="group flex items-center gap-4 px-4 py-4 transition-colors duration-200 hover:bg-ivory/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold sm:px-5"
              >
                <span className="w-6 shrink-0 text-xs tabular-nums text-espresso/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid min-w-0 flex-1 gap-0.5">
                  <span className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
                    {section.schema.label}
                    {section.edited && <Badge tone="gold">Edited</Badge>}
                  </span>
                  <span className="truncate text-xs text-espresso/60">
                    {section.schema.description}
                  </span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-espresso/40 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
