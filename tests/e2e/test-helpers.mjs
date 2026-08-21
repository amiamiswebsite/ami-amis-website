import { expect } from "@playwright/test";
import { withBasePath } from "../../scripts/public-routes.mjs";

export function routeUrl(route) {
  return withBasePath(route);
}

export async function expectStableRoute(page, route) {
  const ownOriginErrors = [];
  page.on("response", (response) => {
    const url = new URL(response.url());
    const isOwnOrigin = url.origin === new URL(page.url() || "http://127.0.0.1:4173").origin;
    if (isOwnOrigin && ![200, 204, 206, 304].includes(response.status())) {
      ownOriginErrors.push(`${response.status()} ${url.pathname}`);
    }
  });

  const response = await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
  expect(response, `No document response for ${route}`).not.toBeNull();
  expect(response.status(), `Unexpected document status for ${route}`).toBeLessThan(400);
  await expect(page.locator("body")).toBeVisible();
  await expect(page.locator("h1"), `${route} must have one page-level h1`).toHaveCount(1);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow, `${route} has horizontal overflow`).toBeLessThanOrEqual(1);
  expect(ownOriginErrors, `${route} has failing same-origin resources`).toEqual([]);
}

export async function revealLazyContent(page) {
  await page.evaluate(async () => {
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y < height; y += Math.max(innerHeight * 0.75, 400)) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    document.querySelectorAll(".collage-flow > section, .site-footer").forEach((element) => {
      element.classList.add("is-visible");
    });
    scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
}
