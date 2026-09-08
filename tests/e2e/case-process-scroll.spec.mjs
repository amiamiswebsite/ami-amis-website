import { expect, test } from "@playwright/test";
import { routeUrl } from "./test-helpers.mjs";

test.use({ reducedMotion: "reduce" });

for (const width of [360, 390, 640, 768, 900, 901, 1024, 1440, 1920]) {
  test(`case process headings and copy align at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(routeUrl("/work/x-oats/"));
    await page.evaluate(() => document.fonts.ready);
    const steps = page.getByRole("region", { name: "Vraag, oplossing en resultaat" });
    await steps.scrollIntoViewIfNeeded();
    const positions = await steps.locator("article").evaluateAll((cards) =>
      cards.map((card) => {
        const heading = card.querySelector("h3");
        const number = card.querySelector("span");
        return {
          numberY: number.getBoundingClientRect().top,
          headingY: heading.getBoundingClientRect().top,
          bodyY: card.querySelector("p").getBoundingClientRect().top,
          numberColor: getComputedStyle(number).color,
          headingColor: getComputedStyle(heading).color,
        };
      }),
    );
    expect(positions).toHaveLength(3);
    for (const item of positions) {
      expect(Math.abs(item.numberY - item.headingY)).toBeLessThan(1);
      expect(item.numberColor).toBe(item.headingColor);
    }
    if (width <= 640 || width > 900) {
      const starts = positions.map((item) => item.bodyY);
      expect(Math.max(...starts) - Math.min(...starts)).toBeLessThan(1);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
  });
}

test("horizontal process indicator persists, follows keyboard scrolling and adapts to resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto(routeUrl("/work/x-oats/"));
  const steps = page.getByRole("region", { name: "Vraag, oplossing en resultaat" });
  const indicator = page.locator('[data-scroll-indicator="horizontal"]');
  await steps.scrollIntoViewIfNeeded();
  await expect(indicator).toBeVisible();
  const initial = await indicator.locator("span").boundingBox();
  await steps.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(async () => (await indicator.locator("span").boundingBox()).x)
    .toBeGreaterThan(initial.x);
  await page.waitForTimeout(1200);
  await expect(indicator).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(indicator).toBeHidden();
  await page.setViewportSize({ width: 390, height: 1000 });
  await expect(indicator).toBeVisible();
});
