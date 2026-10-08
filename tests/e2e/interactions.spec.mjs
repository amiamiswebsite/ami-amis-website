import { expect, test } from "@playwright/test";
import { routeUrl } from "./test-helpers.mjs";

test.use({ viewport: { width: 390, height: 844 } });

test("analytics consent is explicit, persistent and can be changed from the footer", async ({
  page,
}) => {
  await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

  const banner = page.getByTestId("cookie-consent");
  await expect(banner).toBeVisible();
  await expect(page.getByRole("heading", { name: "Koekje erbij?" })).toBeVisible();

  await banner.getByRole("button", { name: "Weigeren" }).click();
  await expect(banner).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("amiamis_cookie_consent")))
    .toBe("denied");

  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(banner).toBeHidden();

  await page.getByRole("button", { name: "Cookievoorkeuren" }).click();
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Accepteren" }).click();
  await expect(banner).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("amiamis_cookie_consent")))
    .toBe("granted");

  const analyticsConsent = await page.evaluate(() => {
    const consentCommands = window.dataLayer
      .filter((entry) => Object.prototype.toString.call(entry) === "[object Arguments]")
      .map((entry) => Array.from(entry));
    return consentCommands.at(-1);
  });

  expect(analyticsConsent).toEqual([
    "consent",
    "update",
    expect.objectContaining({
      ad_storage: "denied",
      analytics_storage: "granted",
    }),
  ]);
});

test("menu traps focus, makes the page inert and restores focus", async ({ page }) => {
  await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

  const toggle = page.getByRole("button", { name: "Open navigatie" });
  await toggle.click();

  const dialog = page.getByRole("dialog", { name: "Hoofdnavigatie" });
  await expect(dialog).toBeVisible();
  await expect(page.locator(".site-shell")).toHaveJSProperty("inert", true);

  const links = dialog.getByRole("link");
  await expect(links.first()).toBeFocused();
  await links.first().press("Shift+Tab");
  await expect(links.last()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
  await expect(page.locator(".site-shell")).toHaveJSProperty("inert", false);
});

test("FAQ keeps closed content inert and exposes opened content", async ({ page }) => {
  await page.goto(routeUrl("/diensten/"), { waitUntil: "domcontentloaded" });

  const faq = page.getByRole("region", { name: "FAQ:" });
  const closedTrigger = faq.locator('button[aria-expanded="false"]').first();
  const panelId = await closedTrigger.getAttribute("aria-controls");
  const trigger = faq.locator(`button[aria-controls="${panelId}"]`);
  const panel = page.locator(`#${panelId}`);

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toHaveJSProperty("inert", true);
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toHaveJSProperty("inert", false);
});

test("testimonial autoplay has no visible pause control", async ({ page }) => {
  await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("button", { name: /Pauzeer automatisch wisselen|Start automatisch wisselen/ }),
  ).toHaveCount(0);
});

test("contact form preserves its visible submit label and mail fallback", async ({ page }) => {
  await page.goto(routeUrl("/contact/"), { waitUntil: "domcontentloaded" });

  const form = page.locator("#contact-form");
  await expect(form).toHaveAttribute("action", /^mailto:brent@amiamis\.be/);
  await expect(form.getByRole("button", { name: "Verstuur" })).toBeVisible();
});

test("project carousel exposes one semantic set and hides loop clones", async ({ page }) => {
  await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

  const clones = page.locator('.projects__carousel-card[data-clone="true"]');
  await expect(clones).toHaveCount(18);
  await expect(clones.first()).toHaveAttribute("aria-hidden", "true");
  await expect(clones.first()).toHaveAttribute("tabindex", "-1");
  await expect(page.locator('.projects__carousel-card:not([data-clone="true"])')).toHaveCount(3);
});
