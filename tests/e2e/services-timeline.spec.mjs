import { expect, test } from "@playwright/test";
import { routeUrl } from "./test-helpers.mjs";

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`service timeline headings clear their dividers at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(routeUrl("/diensten/"), { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const positions = await page
      .getByRole("list", { name: "Wat kan je verwachten, horizontaal scrollbaar" })
      .locator("li")
      .evaluateAll((items) =>
        items.map((item) => {
          const heading = item.querySelector("h3");
          const text = document.createRange();
          text.selectNodeContents(heading);
          return {
            title: heading.textContent,
            titleBottom: text.getBoundingClientRect().bottom,
            dividerTop: item.querySelector("p").getBoundingClientRect().top,
          };
        }),
      );
    expect(positions).toHaveLength(6);
    for (const item of positions)
      expect(item.dividerTop, item.title).toBeGreaterThan(item.titleBottom);
  });
}
