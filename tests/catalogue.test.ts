import assert from "node:assert/strict";
import test from "node:test";
import {
  categories,
  serviceCatalogue,
  services,
  getHomepageServices,
} from "../data/catalogue";
import { membershipPlans } from "../data/catalogue/experience";
import {
  mainNavigation,
  supportingNavigation,
} from "../data/catalogue/navigation";
import { pageLayouts } from "../data/catalogue/page-layouts";
import { pages } from "../data/inner-pages";
import { packages } from "../data/inner/packages";

test("the flow tree has nine unique categories and all 37 example services", () => {
  assert.equal(categories.length, 9);
  assert.equal(serviceCatalogue.length, 37);
  assert.equal(
    new Set(categories.map((item) => item.id)).size,
    categories.length,
  );
  assert.equal(
    new Set(serviceCatalogue.map((item) => item.slug)).size,
    serviceCatalogue.length,
  );
  for (const category of categories) {
    assert.ok(services.some((service) => service.category === category.id));
  }
  for (const service of serviceCatalogue) {
    const category = categories.find((item) => item.id === service.category);
    assert.ok(category, service.slug);
    assert.ok(
      category.access === "both" || service.access === category.access,
      service.slug,
    );
    for (const lang of ["en", "ar"] as const) {
      assert.ok(service.title[lang].trim(), service.slug);
      assert.ok(service.description[lang].trim(), service.slug);
    }
  }
});

test("navigation targets have a page and an explicit layout", () => {
  for (const item of [...mainNavigation, ...supportingNavigation]) {
    if (!item.slug) continue;
    assert.ok(Object.hasOwn(pages, item.slug), item.slug);
    assert.ok(Object.hasOwn(pageLayouts, item.slug), item.slug);
  }
  assert.deepEqual(Object.keys(pages).sort(), Object.keys(pageLayouts).sort());
});

test("membership and package references resolve", () => {
  for (const plan of membershipPlans) {
    for (const id of plan.categories)
      assert.ok(
        categories.some((category) => category.id === id),
        id,
      );
    assert.equal(
      plan.poolAccess === "included",
      plan.categories.includes("swimming-pool"),
    );
  }
  for (const carePackage of packages) {
    for (const slug of carePackage.services)
      assert.ok(
        services.some((service) => service.slug === slug),
        slug,
      );
  }
});

test("homepage selection excludes unselected and unpublished services and sorts selected entries", () => {
  const base = serviceCatalogue[0];
  assert.ok(base);
  const source = [
    { ...base, slug: "later", homepageOrder: 20 },
    { ...base, slug: "hidden", homepageOrder: null },
    { ...base, slug: "draft", homepageOrder: 0, published: false },
    { ...base, slug: "first", homepageOrder: 10 },
  ];
  assert.deepEqual(
    getHomepageServices(source).map((service) => service.slug),
    ["first", "later"],
  );
  assert.equal(
    source[0].slug,
    "later",
    "the selector must not reorder source data",
  );
});

test("existing five service URLs remain available", () => {
  for (const slug of ["hair", "pedicure", "skincare", "massage", "body-care"]) {
    assert.ok(
      services.some((service) => service.slug === slug),
      slug,
    );
  }
});
