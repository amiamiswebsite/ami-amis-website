import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../scripts/public-routes.mjs";
import { routeUrl } from "./test-helpers.mjs";

test.use({ viewport: { width: 390, height: 844 } });

for (const route of publicRoutes) {
  test(`reduced motion: ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    const state = await page.evaluate(() => ({
      preferenceMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
      smoothScroll: getComputedStyle(document.documentElement).scrollBehavior === "smooth",
      playingVideos: [...document.querySelectorAll("video")]
        .filter((video) => !video.paused)
        .map((video) => video.currentSrc || video.getAttribute("src") || "inline video"),
    }));

    expect(state.preferenceMatches, `${route} test context must emulate reduced motion`).toBe(true);
    expect(state.smoothScroll, `${route} keeps smooth scrolling in reduced motion`).toBe(false);
    expect(state.playingVideos, `${route} autoplays video in reduced motion`).toEqual([]);
  });
}
