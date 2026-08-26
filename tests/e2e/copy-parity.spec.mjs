import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../scripts/public-routes.mjs";
import { routeUrl } from "./test-helpers.mjs";

const baseline = JSON.parse(
  readFileSync(new URL("../fixtures/visible-copy-baseline.json", import.meta.url), "utf8"),
);

test.use({ reducedMotion: "reduce", viewport: { width: 1440, height: 1000 } });

async function pageCopy(page) {
  return page.evaluate(() => {
    const clone = document.body.cloneNode(true);
    const servicesRotator = clone.querySelector("#services-two-title")?.children[1];
    const servicesTypedTerm = servicesRotator?.children[1];

    if (servicesTypedTerm) {
      servicesTypedTerm.textContent = "met een plan.";
    }

    clone
      .querySelectorAll(
        '[data-copy-ignore="true"], .aa-visually-hidden, .sr-only, .aa-skip-link, script, style, noscript, template',
      )
      .forEach((element) => element.remove());

    const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
    const copy = [];
    let node = walker.nextNode();

    while (node) {
      const value = node.textContent.replace(/\s+/g, " ").trim();
      if (value) copy.push(value);
      node = walker.nextNode();
    }

    return copy;
  });
}

test("the copy baseline covers every public route", () => {
  expect(Object.keys(baseline)).toEqual(publicRoutes);
});

for (const route of publicRoutes) {
  test(`visible copy remains unchanged: ${route}`, async ({ page }) => {
    await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(250);

    expect(await pageCopy(page)).toEqual(baseline[route]);
  });
}
