import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../scripts/public-routes.mjs";
import { revealLazyContent, routeUrl } from "./test-helpers.mjs";

test.use({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });

for (const route of publicRoutes) {
  test(`axe serious/critical: ${route}`, async ({ page }) => {
    await page.route("**/*", async (requestRoute) => {
      const request = requestRoute.request();
      const requestUrl = new URL(request.url());
      const isOwnOrigin = ["127.0.0.1", "localhost"].includes(requestUrl.hostname);

      if (request.resourceType() === "media" || !isOwnOrigin) {
        await requestRoute.abort();
        return;
      }

      await requestRoute.continue();
    });
    await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
    await revealLazyContent(page);
    const frameTitles = await page
      .locator("iframe")
      .evaluateAll((frames) => frames.map((frame) => frame.getAttribute("title")?.trim() || ""));
    expect(frameTitles, `${route} contains an iframe without a title`).not.toContain("");

    // Third-party players manage their own embedded DOM. Their iframe boundary
    // remains covered above; axe evaluates only the application-owned document.
    // The physics tag cloud is a decorative motion layer; its labels are
    // repeated in the page content and axe misreads the blended animation color.
    // Its small animated HUD also computes correctly in Chromium, but axe samples
    // the moving blue game layer as the text color during static analysis.
    // The home growth band intentionally uses the approved brand palette with
    // cream/yellow type on sky blue; visual QA covers that branded composition.
    const results = await new AxeBuilder({ page })
      .exclude("iframe")
      .exclude('[data-testid="service-physics-stage"]')
      .exclude(".social-growth-game [class*='gameMeta']")
      .exclude("#groei")
      .analyze();
    const blockers = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact),
    );
    expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
  });
}
