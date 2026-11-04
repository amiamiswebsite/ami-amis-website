import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { homeRapVideoCampaign } from "../../src/data/homeRapVideoCampaign.js";
import { routeUrl } from "./test-helpers.mjs";

test.use({ reducedMotion: "reduce" });

test("home campaign follows its switch and keeps the legacy home redirect intact", async ({
  request,
}) => {
  const [home, reference] = await Promise.all([
    request.get(routeUrl("/")),
    request.get(routeUrl("/home-2/")),
  ]);
  expect(home.ok()).toBe(true);
  expect(reference.ok()).toBe(true);
  const homeHtml = await home.text();
  expect(homeHtml.includes('id="home-rapvideo"')).toBe(homeRapVideoCampaign.enabled);
  const redirectHtml = await reference.text();
  expect(redirectHtml).not.toContain('id="home-rapvideo"');
  expect(redirectHtml).toContain("NEXT_REDIRECT");
  expect(homeHtml).toContain('id="home-two-proposal-header"');
  expect(homeHtml).not.toContain('src="https://player.vimeo.com/video/1242780771');
});

test.describe("enabled home campaign", () => {
  test.skip(!homeRapVideoCampaign.enabled, "The temporary campaign is switched off.");

  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    test(`layout and heading remain usable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });
      const section = page.locator("#home-rapvideo");
      await section.scrollIntoViewIfNeeded();
      await expect(
        section.getByRole("heading", { name: "Check onze rapvideo!", exact: true }),
      ).toBeVisible();
      await expect(section.locator("p,a")).toHaveCount(0);
      await expect(section.locator("img")).toHaveJSProperty("naturalWidth", 3840);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      ).toBe(true);
      const title = await section.getByRole("heading").boundingBox();
      const film = await section.getByRole("button").boundingBox();
      expect(title.x).toBeGreaterThanOrEqual(0);
      expect(title.x + title.width).toBeLessThanOrEqual(width + 1);
      expect(film.x + film.width).toBeLessThanOrEqual(width + 1);
      expect(Math.abs(film.width / film.height - 16 / 9)).toBeLessThan(0.02);
    });
  }

  test("section and custom dialog preserve accessible controls and focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    let vimeoRequests = 0;
    page.on("request", (request) => {
      if (request.url().startsWith("https://player.vimeo.com/")) vimeoRequests += 1;
    });
    await page.route("https://player.vimeo.com/**", (route) => route.abort());
    await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });
    const section = page.locator("#home-rapvideo");
    await section.scrollIntoViewIfNeeded();
    expect(vimeoRequests).toBe(0);
    const axe = await new AxeBuilder({ page }).include("#home-rapvideo").analyze();
    expect(axe.violations).toEqual([]);
    const trigger = section.getByRole("button", { name: "Speel Ami Amis Rapvideo af" });
    const beforeOverflow = await page.evaluate(() => document.body.style.overflow);
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Ami Amis Rapvideo" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Video sluiten" })).toBeFocused();
    await expect(dialog.locator("iframe")).toHaveAttribute("src", /controls=0/);
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement.closest("dialog")))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(beforeOverflow);
    await trigger.click();
    await page.getByRole("button", { name: "Video sluiten" }).click();
    await expect(trigger).toBeFocused();
  });
});
