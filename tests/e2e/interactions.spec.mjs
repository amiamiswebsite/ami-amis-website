import { expect, test } from "@playwright/test";
import { routeUrl } from "./test-helpers.mjs";

test.use({ viewport: { width: 390, height: 844 } });

async function analyticsEvents(page) {
  return page.evaluate(() =>
    window.dataLayer
      .filter((entry) => Object.prototype.toString.call(entry) === "[object Arguments]")
      .map((entry) => Array.from(entry))
      .filter((entry) => entry[0] === "event"),
  );
}

async function acceptAnalytics(page) {
  const banner = page.getByTestId("cookie-consent");
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Accepteren" }).click();
  await expect(banner).toBeHidden();
}

test("analytics consent is explicit, persistent and can be changed from the footer", async ({
  page,
}) => {
  await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

  const banner = page.getByTestId("cookie-consent");
  await expect(banner).toBeVisible();
  await expect(page.getByRole("heading", { name: "Koekje erbij?" })).toBeVisible();
  await expect(page.locator("#google-tag-manager-runtime")).toHaveCount(0);

  await banner.getByRole("button", { name: "Weigeren" }).click();
  await expect(banner).toBeHidden();
  await expect
    .poll(() =>
      page.evaluate(
        () => JSON.parse(window.localStorage.getItem("amiamis_cookie_consent") || "null")?.choice,
      ),
    )
    .toBe("denied");
  await expect(page.locator("#google-tag-manager-runtime")).toHaveCount(0);

  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(banner).toBeHidden();

  await page.getByRole("button", { name: "Cookievoorkeuren" }).click();
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Accepteren" }).click();
  await expect(banner).toBeHidden();
  await expect
    .poll(() =>
      page.evaluate(
        () => JSON.parse(window.localStorage.getItem("amiamis_cookie_consent") || "null")?.choice,
      ),
    )
    .toBe("granted");
  await expect(page.locator("#google-tag-manager-runtime")).toHaveCount(1);

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

test("expired analytics consent is requested again", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "amiamis_cookie_consent",
      JSON.stringify({
        choice: "granted",
        updatedAt: "2025-01-01T00:00:00.000Z",
        version: "2026-10-09",
      }),
    );
  });

  await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });
  await expect(page.getByTestId("cookie-consent")).toBeVisible();
  await expect(page.locator("#google-tag-manager-runtime")).toHaveCount(0);
});

test("campaign attribution and Calendly intent are tracked after consent", async ({ page }) => {
  await page.goto(
    `${routeUrl("/contact/")}?utm_source=linkedin&utm_medium=paid_social&utm_campaign=herfst_2026`,
    { waitUntil: "domcontentloaded" },
  );
  await acceptAnalytics(page);

  const calendlyLink = page.getByRole("link", { name: /Agenda Brent/i });
  await calendlyLink.evaluate((link) => {
    link.addEventListener("click", (event) => event.preventDefault(), { once: true });
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });

  const calendlyUrl = new URL(await calendlyLink.getAttribute("href"));
  expect(calendlyUrl.searchParams.get("utm_source")).toBe("linkedin");
  expect(calendlyUrl.searchParams.get("utm_medium")).toBe("paid_social");
  expect(calendlyUrl.searchParams.get("utm_campaign")).toBe("herfst_2026");

  const events = await analyticsEvents(page);
  expect(events).toContainEqual([
    "event",
    "book_meeting_click",
    expect.objectContaining({
      link_context: "contact_page",
      source_path: "/contact/",
    }),
  ]);

  await page.getByRole("button", { name: "Cookievoorkeuren" }).click();
  await page.getByTestId("cookie-consent").getByRole("button", { name: "Weigeren" }).click();
  await expect
    .poll(() => page.evaluate(() => window.sessionStorage.getItem("amiamis_campaign_attribution")))
    .toBeNull();
});

test("video milestones are deduplicated and contain no personal data", async ({ page }) => {
  await page.goto(routeUrl("/team/"), { waitUntil: "domcontentloaded" });
  await acceptAnalytics(page);

  const video = page.locator(".team-static-video video");
  await video.evaluate((element) => {
    Object.defineProperty(element, "duration", { configurable: true, value: 100 });
    Object.defineProperty(element, "currentTime", { configurable: true, value: 76 });
    element.dispatchEvent(new Event("play", { bubbles: true }));
    element.dispatchEvent(new Event("play", { bubbles: true }));
    element.dispatchEvent(new Event("timeupdate", { bubbles: true }));
    element.dispatchEvent(new Event("timeupdate", { bubbles: true }));
    element.dispatchEvent(new Event("ended", { bubbles: true }));
    element.dispatchEvent(new Event("ended", { bubbles: true }));
  });

  const events = (await analyticsEvents(page)).filter((entry) =>
    ["video_start", "video_progress", "video_complete"].includes(entry[1]),
  );
  expect(events.filter((entry) => entry[1] === "video_start")).toHaveLength(1);
  expect(
    events.filter((entry) => entry[1] === "video_progress").map((entry) => entry[2].video_percent),
  ).toEqual([25, 50, 75]);
  expect(events.filter((entry) => entry[1] === "video_complete")).toHaveLength(1);
  expect(JSON.stringify(events)).not.toMatch(/@|telefoon|bericht/i);
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

test("contact form explains its mail fallback", async ({ page }) => {
  await page.goto(routeUrl("/contact/"), { waitUntil: "domcontentloaded" });

  const form = page.locator("#contact-form");
  await expect(form).toHaveAttribute("action", /^mailto:brent@amiamis\.be/);
  await expect(form.getByRole("button", { name: "Verstuur via e-mail" })).toBeVisible();
});

test("project carousel exposes one semantic set and hides loop clones", async ({ page }) => {
  await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

  const clones = page.locator('.projects__carousel-card[data-clone="true"]');
  await expect(clones).toHaveCount(18);
  await expect(clones.first()).toHaveAttribute("aria-hidden", "true");
  await expect(clones.first()).toHaveAttribute("tabindex", "-1");
  await expect(page.locator('.projects__carousel-card:not([data-clone="true"])')).toHaveCount(3);
});
