import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../scripts/public-routes.mjs";
import { revealLazyContent, routeUrl } from "./test-helpers.mjs";

test.use({ viewport: { width: 390, height: 844 } });

for (const route of publicRoutes) {
  test(`axe serious/critical: ${route}`, async ({ page }) => {
    await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
    await revealLazyContent(page);
    const frameTitles = await page
      .locator("iframe")
      .evaluateAll((frames) => frames.map((frame) => frame.getAttribute("title")?.trim() || ""));
    expect(frameTitles, `${route} contains an iframe without a title`).not.toContain("");

    // Third-party players manage their own embedded DOM. Their iframe boundary
    // remains covered above; axe evaluates only the application-owned document.
    const results = await new AxeBuilder({ page }).exclude("iframe").analyze();
    const blockers = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact),
    );
    expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
  });
}
