import { expect, test } from "@playwright/test";
import { cases } from "../../src/data/cases.js";
import { routeUrl } from "./test-helpers.mjs";

test("local video supports byte ranges for seeking", async ({ request }) => {
  const response = await request.get(routeUrl("/videos/cases/salus/spot-medicair.mp4"), {
    headers: { Range: "bytes=1024-2047" },
  });
  expect(response.status()).toBe(206);
  expect(response.headers()["content-range"]).toMatch(/^bytes 1024-2047\/\d+$/);
  expect((await response.body()).length).toBe(1024);
});

test("Medicair plays, pauses and seeks to the selected time", async ({ page }) => {
  await page.goto(routeUrl("/work/salus/"), { waitUntil: "domcontentloaded" });
  const hero = page.locator('[data-case-video="hero"]');
  const video = hero.locator("video");
  await hero.getByRole("button", { name: "Speel Spot Medicair met geluid", exact: true }).click();
  await expect.poll(() => video.evaluate((v) => v.currentTime)).toBeGreaterThan(0);
  await hero.hover();
  await hero
    .getByRole("group", { name: "Bediening voor Spot Medicair" })
    .getByRole("button", { name: "Pauzeer Spot Medicair", exact: true })
    .click();
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(true);
  const slider = hero.getByRole("slider", { name: "Voortgang van Spot Medicair" });
  await slider.focus();
  await slider.press("Home");
  await slider.press("ArrowRight");
  await slider.press("End");
  await expect.poll(() => video.evaluate((v) => v.currentTime)).toBeGreaterThan(25);
});

test("hero videos remain available once in their gallery", async ({ page }) => {
  const casesWithHeroVideo = cases.filter((item) =>
    ["video", "vimeo", "youtube"].includes(item.media?.hero?.type),
  );

  for (const { slug: route } of casesWithHeroVideo) {
    await page.goto(routeUrl(`/work/${route}/`), { waitUntil: "domcontentloaded" });
    const hero = page.locator('[data-case-video="hero"]');
    const source = await hero.locator("video, iframe").getAttribute("src");
    const videoKey = new URL(source, page.url()).pathname;
    await expect
      .poll(
        async () => {
          const gallerySources = await page
            .locator('[data-case-video^="gallery-"] video, [data-case-video^="gallery-"] iframe')
            .evaluateAll((elements) =>
              elements.map(
                (element) => new URL(element.getAttribute("src"), location.href).pathname,
              ),
            );
          return gallerySources.filter((key) => key === videoKey).length;
        },
        { message: `Hero source must appear once in the ${route} gallery` },
      )
      .toBe(1);
  }
});
