import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";

const publicRoot = path.join(process.cwd(), "public");
const imageExtensions = /\.(?:webp|png|jpe?g|avif)$/i;

/** Every image under /assets/images, as site URLs, sorted by folder. */
export async function listSiteImages(): Promise<string[]> {
  try {
    const root = path.join(publicRoot, "assets/images");
    const entries = await readdir(root, { recursive: true });
    return entries
      .filter((entry) => imageExtensions.test(entry))
      .map((entry) => `/assets/images/${entry.split(path.sep).join("/")}`)
      .sort();
  } catch {
    return [];
  }
}

const galleryPrefix = "/assets/images/gallery/";

/** Catalogue images are referenced by key: a path under the gallery folder without ".webp". */
export function galleryKeyFromUrl(url: string) {
  return url.startsWith(galleryPrefix) && url.endsWith(".webp")
    ? url.slice(galleryPrefix.length, -".webp".length)
    : null;
}
