import { test } from "@playwright/test";
import { revealLazyContent, routeUrl } from "./test-helpers.mjs";

test.use({ reducedMotion: "reduce" });

const routes = [
  ["home", "/"],
  ["home-2", "/home-2/"],
  ["diensten", "/diensten/"],
  ["work", "/work/"],
  ["team", "/team/"],
  ["contact", "/contact/"],
  ["case-vimeo", "/work/tarzan-en-jane/"],
  ["case-local-video", "/work/x-oats/"],
];
const viewports = [
  ["mobile", { width: 390, height: 844 }],
  ["tablet", { width: 768, height: 1024 }],
  ["desktop", { width: 1440, height: 1000 }],
];

for (const [routeName, route] of routes) {
  for (const [viewportName, viewport] of viewports) {
    test(`${routeName} ${viewportName}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
      await revealLazyContent(page);
      await page.screenshot({
        path: test.info().outputPath(`${routeName}-${viewportName}.jpg`),
        fullPage: true,
        quality: 80,
        type: "jpeg",
      });
    });
  }
}
