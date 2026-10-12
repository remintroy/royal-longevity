type PhotoSize = { width: number; height: number };

type GalleryTile = { width: number; height: number };

/** Fit ordered photos into equal-height rows without cropping their composition. */
export function justifiedGallery(
  images: readonly PhotoSize[],
  containerWidth: number,
  targetHeight: number,
  gap: number,
): GalleryTile[] {
  if (containerWidth <= 0 || targetHeight <= 0) return [];

  const tiles: GalleryTile[] = [];
  let start = 0;
  let previousHeight = targetHeight;

  while (start < images.length) {
    let end = start;
    let ratioSum = images[start].width / images[start].height;
    let height = containerWidth / ratioSum;

    // Stop when another photo would take the row farther from its target height.
    while (end + 1 < images.length) {
      const nextRatio = images[end + 1].width / images[end + 1].height;
      const nextHeight =
        (containerWidth - gap * (end - start + 1)) / (ratioSum + nextRatio);
      if (
        nextHeight <= 0 ||
        Math.abs(nextHeight - targetHeight) >= Math.abs(height - targetHeight)
      )
        break;
      end += 1;
      ratioSum += nextRatio;
      height = nextHeight;
    }

    // A sparse final row follows the previous row instead of enlarging leftovers.
    if (end === images.length - 1) {
      height = Math.min(height, previousHeight, targetHeight * 1.15);
    }

    for (let index = start; index <= end; index += 1) {
      tiles.push({
        width: height * (images[index].width / images[index].height),
        height,
      });
    }
    previousHeight = height;
    start = end + 1;
  }

  return tiles;
}
