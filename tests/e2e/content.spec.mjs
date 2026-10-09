import { expect, test } from "@playwright/test";
import { routeUrl } from "./test-helpers.mjs";

const expectedSiteUrl = (process.env.EXPECTED_SITE_URL || "https://amiamis.com").replace(/\/$/, "");

test("home server HTML contains real statistic end values", async ({ request }) => {
  const response = await request.get(routeUrl("/"));
  const html = await response.text();

  expect(response.ok()).toBe(true);
  expect(html).toContain("265k");
  expect(html).toContain("5220");
  expect(html).not.toContain(">0k<");
  expect(html).not.toContain(">0 likes<");
});

test("canonical namespace and metadata are stable", async ({ page }) => {
  await page.goto(routeUrl("/ons-werk/x-oats/"), { waitUntil: "domcontentloaded" });

  await expect(page).toHaveTitle(/X-Oats.*Ami Amis/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${expectedSiteUrl}/work/x-oats/`,
  );
});

test("commercial landing pages expose distinct service and location metadata", async ({ page }) => {
  const pages = [
    ["/", /^Videoproductie & creatieve content in Antwerpen$/i],
    ["/diensten/", /Videoproductie, social content & campagnes \| Ami Amis/i],
    ["/work/", /Cases in videoproductie, campagnes & content \| Ami Amis/i],
    ["/team/", /Creatief video- en contentbureau in Antwerpen \| Ami Amis/i],
  ];

  for (const [route, title] of pages) {
    await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /(?:Antwerpen|videoproductie|social content)/i,
    );
  }
});

test("internal case links use the canonical work namespace", async ({ request }) => {
  const routes = ["/", "/diensten/", "/team/", "/work/", "/work/x-oats/"];
  const responses = await Promise.all(routes.map((route) => request.get(routeUrl(route))));

  for (const [index, response] of responses.entries()) {
    const html = await response.text();

    expect(response.ok(), `${routes[index]} should load`).toBe(true);
    expect(html, `${routes[index]} should not link to the legacy namespace`).not.toContain(
      'href="/ons-werk/',
    );
  }
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
  expect(robots).toContain(`${expectedSiteUrl}/sitemap.xml`);
  expect(sitemap).toContain(`${expectedSiteUrl}/work/x-oats/`);
  expect(sitemap).not.toContain("/ons-werk/x-oats/");
});

test("Google verification and consent-first analytics bootstrap are present", async ({
  request,
}) => {
  const [homeResponse, verificationResponse] = await Promise.all([
    request.get(routeUrl("/")),
    request.get(routeUrl("/google8e270ecc7c32cf92.html")),
  ]);
  const html = await homeResponse.text();
  const verification = await verificationResponse.text();

  expect(homeResponse.ok()).toBe(true);
  expect(verificationResponse.ok()).toBe(true);
  expect(verification.trim()).toBe("google-site-verification: google8e270ecc7c32cf92.html");
  expect(html).toContain(
    '<meta name="google-site-verification" content="y3UjCWtW-1s3zxBBM70_hWwnyLQz4eaMuqx0z3_Rv58"',
  );
  expect(html).not.toContain("https://www.googletagmanager.com/gtm.js");
  expect(html).toContain("amiamis_cookie_consent");
  expect(html).toContain("2026-10-09");
  expect(html).toContain('analytics_storage: storedChoice === "granted" ? "granted" : "denied"');
});

test("every sitemap route loads with a matching self-canonical", async ({ request }) => {
  const sitemapResponse = await request.get(routeUrl("/sitemap.xml"));
  const sitemap = await sitemapResponse.text();
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  expect(locations.length).toBeGreaterThan(7);

  for (const location of locations) {
    const pathname = new URL(location).pathname;
    const response = await request.get(routeUrl(pathname));
    const html = await response.text();

    expect(response.ok(), `${pathname} should load`).toBe(true);
    expect(html, `${pathname} should self-canonicalize`).toContain(
      `<link rel="canonical" href="${location}"`,
    );
  }
});
