import assert from "node:assert/strict";
import test from "node:test";
import { justifiedGallery } from "../lib/justified-gallery";

const photos = [
  { width: 1672, height: 941 },
  { width: 941, height: 1672 },
  { width: 941, height: 1672 },
  { width: 1672, height: 941 },
  { width: 1200, height: 1200 },
  { width: 1672, height: 941 },
  { width: 941, height: 1672 },
];

test("mixed orientations retain proportions and fill rows at responsive widths", () => {
  for (const width of [280, 343, 390, 650, 700, 1024, 1392]) {
    const gap = width < 700 ? 8 : 12;
    const tiles = justifiedGallery(photos, width, width < 700 ? 220 : 330, gap);
    assert.equal(tiles.length, photos.length);
    let rowWidth = 0;
    let rowHeight = tiles[0].height;

    tiles.forEach((tile, index) => {
      assert.ok(tile.width > 0 && tile.height > 0);
      assert.ok(
        Math.abs(
          tile.width / tile.height - photos[index].width / photos[index].height,
        ) < 0.0001,
      );
      if (rowWidth > 0 && rowWidth + gap + tile.width > width + 0.001) {
        assert.ok(Math.abs(rowWidth - width) < 0.001);
        rowWidth = 0;
        rowHeight = tile.height;
      }
      assert.equal(tile.height, rowHeight);
      rowWidth += (rowWidth ? gap : 0) + tile.width;
      assert.ok(rowWidth <= width + 0.001);
    });
  }
});

test("a single portrait stays at the target height instead of filling the width", () => {
  const [tile] = justifiedGallery([photos[1]], 1200, 280, 12);
  assert.equal(tile.height, 280);
  assert.ok(tile.width < 200);
});

test("empty or unmeasured galleries return no tiles", () => {
  assert.deepEqual(justifiedGallery([], 1200, 280, 12), []);
  assert.deepEqual(justifiedGallery(photos, 0, 280, 12), []);
});
