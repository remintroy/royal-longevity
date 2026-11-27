import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import { getAdminCatalogue } from "@/lib/cms/catalogue";
import { listSiteImages } from "@/lib/cms/images";
import { getSectionState } from "@/lib/cms/section-content";
import { getSectionSchema, isLandingSectionId } from "@/lib/cms/sections";
import {
  Badge,
  buttonClass,
  Notice,
  PageHeader,
} from "../../../_components/ui";
import { SectionEditor } from "./section-editor";

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  return {
    title: isLandingSectionId(section)
      ? `${getSectionSchema(section).label} · Content admin`
      : "Content admin",
  };
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Dubai",
});

/** Site paths offered when editing a link field. */
async function getLinkSuggestions() {
  const { categories, services } = await getAdminCatalogue();
  return [
    "/",
    "/services",
    ...categories.map((category) => `/services/categories/${category.id}`),
    ...services
      .filter((service) => service.published)
      .map((service) => `/services/${service.slug}`),
  ];
}

export default async function SectionPage({ params }: Props) {
  await requireAdmin();
  const { section: sectionId } = await params;
  if (!isLandingSectionId(sectionId)) notFound();

  const schema = getSectionSchema(sectionId);
  const [state, images, linkSuggestions] = await Promise.all([
    getSectionState(sectionId),
    listSiteImages(),
    getLinkSuggestions(),
  ]);

  let status = <Badge tone="muted">Original text</Badge>;
  if (state.source === "saved") {
    status = (
      <Badge tone="gold">
        Edited
        {state.updatedAt &&
          ` · ${dateFormat.format(new Date(state.updatedAt))}`}
      </Badge>
    );
  } else if (state.source === "legacy") {
    status = <Badge tone="gold">Edited</Badge>;
  }

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex items-center gap-2">Landing page {status}</span>
        }
        title={schema.label}
        description={schema.description}
        actions={
          <a
            href="/en"
            target="_blank"
            rel="noreferrer"
            className={buttonClass("secondary")}
          >
            View site
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        }
      />
      <Notice tone="info" className="mb-5">
        Each field has English and Arabic side by side. Changes go live on the
        site as soon as you save.
      </Notice>
      <SectionEditor
        sectionId={sectionId}
        schema={schema}
        initialValue={state.value}
        defaults={state.defaults}
        images={images}
        linkSuggestions={linkSuggestions}
      />
    </>
  );
}
