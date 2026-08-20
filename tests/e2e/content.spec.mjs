import { expect, test } from "@playwright/test";
import { routeUrl } from "./test-helpers.mjs";

test("home server HTML contains real statistic end values", async ({ request }) => {
  const response = await request.get(routeUrl("/"));
  const html = await response.text();

  expect(response.ok()).toBe(true);
  expect(html).toContain("30,3k");
  expect(html).toContain("+33,5%");
  expect(html).not.toContain(">0,0k<");
  expect(html).not.toContain(">+0,0%<");
});

test("canonical namespace and metadata are stable", async ({ page }) => {
  await page.goto(routeUrl("/ons-werk/x-oats/"), { waitUntil: "domcontentloaded" });

  await expect(page).toHaveTitle(/X-Oats.*Ami Amis/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://amiamiswebsite.github.io/ami-amis-website/work/x-oats/",
  );
});

test("robots and sitemap are exported with canonical work routes", async ({ request }) => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    request.get(routeUrl("/robots.txt")),
    request.get(routeUrl("/sitemap.xml")),
  ]);
  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();

  expect(robotsResponse.ok()).toBe(true);
  expect(sitemapResponse.ok()).toBe(true);
  expect(robots).toContain("/ami-amis-website/sitemap.xml");
  expect(sitemap).toContain("/ami-amis-website/work/x-oats/");
  expect(sitemap).not.toContain("/ons-werk/x-oats/");
});
