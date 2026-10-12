import assert from "node:assert/strict";
import test from "node:test";
import { legalDocuments, type LegalBlock, type LegalSlug } from "../data/legal";
import { arabicLegalDocuments } from "../data/legal-ar";

function assertTranslatedBlocks(
  source: LegalBlock[],
  translated: LegalBlock[],
  context: string,
) {
  assert.equal(translated.length, source.length, `${context}: missing blocks`);
  source.forEach((block, index) => {
    const translation = translated[index];
    assert.equal(
      translation.type,
      block.type,
      `${context}: block type changed`,
    );
    if (block.type === "list" && translation.type === "list") {
      assert.equal(translation.items.length, block.items.length);
      translation.items.forEach((item) =>
        assert.match(item, /\p{Script=Arabic}/u),
      );
    } else if (translation.type !== "list") {
      assert.match(translation.text, /\p{Script=Arabic}/u);
    }
  });
}

for (const slug of Object.keys(legalDocuments) as LegalSlug[]) {
  test(`${slug} has a complete Arabic document with matching section anchors`, () => {
    const source = legalDocuments[slug];
    const translated = arabicLegalDocuments[slug];
    assert.equal(translated.dates.length, source.dates.length);
    assertTranslatedBlocks(source.introduction, translated.introduction, slug);
    assert.deepEqual(
      translated.sections.map((section) => section.id),
      source.sections.map((section) => section.id),
    );
    source.sections.forEach((section, index) => {
      const translation = translated.sections[index];
      assert.match(translation.title, /\p{Script=Arabic}/u);
      assertTranslatedBlocks(
        section.blocks,
        translation.blocks,
        `${slug}/${section.id}`,
      );
    });
  });
}
