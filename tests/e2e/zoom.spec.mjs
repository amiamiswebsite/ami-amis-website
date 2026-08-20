import { expect, test } from "@playwright/test";
import { primaryRoutes } from "../../scripts/public-routes.mjs";
import { routeUrl } from "./test-helpers.mjs";

test.use({ viewport: { width: 720, height: 1000 } });

for (const route of primaryRoutes) {
  test(`200% reflow approximation: ${route}`, async ({ page }) => {
    await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(
      overflow,
      `${route} has page-level overflow at the 200% reflow width`,
    ).toBeLessThanOrEqual(1);

    const clippedText = await page
      .locator(
        "h1:not(.sr-only, .aa-visually-hidden), h2:not(.sr-only, .aa-visually-hidden), h3:not(.sr-only, .aa-visually-hidden), p:not(.sr-only, .aa-visually-hidden), a:not(.sr-only, .aa-visually-hidden):not(:has(img, picture, video, svg)), button:not(.sr-only, .aa-visually-hidden)",
      )
      .evaluateAll((nodes) =>
        nodes
          .filter((node) => {
            const style = getComputedStyle(node);
            return (
              node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) &&
              style.overflowX === "hidden" &&
              node.scrollWidth - node.clientWidth > 1
            );
          })
          .map((node) => node.textContent?.trim())
          .filter(Boolean),
      );
    expect(clippedText, `${route} clips visible text at the 200% reflow width`).toEqual([]);
  });
}
