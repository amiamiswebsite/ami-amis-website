import { expect, test } from "@playwright/test";
import { workCases } from "../../src/data/workCases.js";
import { routeUrl } from "./test-helpers.mjs";

const activeCases = workCases.filter((item) => item.status === "ready");

test.describe("Case navigation", () => {
  test("uses the active work-case order on every case page", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });

    for (const [index, currentCase] of activeCases.entries()) {
      const previous = activeCases[(index - 1 + activeCases.length) % activeCases.length];
      const next = activeCases[(index + 1) % activeCases.length];

      await page.goto(routeUrl(currentCase.href), { waitUntil: "domcontentloaded" });

      const navigation = page.getByRole("navigation", { name: "Navigeer tussen cases" });
      const previousCase = page.getByTestId("case-navigation-previous");
      const allCases = page.getByTestId("case-navigation-all");
      const nextCase = page.getByTestId("case-navigation-next");

      await expect(navigation).toBeVisible();
      await expect(previousCase).toContainText(previous.client);
      await expect(previousCase).toHaveAttribute("href", routeUrl(previous.href));
      await expect(allCases).toHaveAttribute("href", routeUrl("/work/"));
      await expect(nextCase).toContainText(next.client);
      await expect(nextCase).toHaveAttribute("href", routeUrl(next.href));
      await expect(previousCase.locator("img")).toHaveAttribute("src", routeUrl(previous.image));
      await expect(nextCase.locator("img")).toHaveAttribute("src", routeUrl(next.image));

      const previousName = previousCase.locator("span").filter({ hasText: previous.client }).last();
      const nextName = nextCase.locator("span").filter({ hasText: next.client }).last();
      const previousImage = previousCase.locator("figure");
      const nextImage = nextCase.locator("figure");
      const [previousNameBox, nextNameBox, previousImageBox, nextImageBox, allCasesBox] =
        await Promise.all([
          previousName.boundingBox(),
          nextName.boundingBox(),
          previousImage.boundingBox(),
          nextImage.boundingBox(),
          allCases.boundingBox(),
        ]);

      expect(previousImageBox.x + previousImageBox.width).toBeLessThanOrEqual(previousNameBox.x);
      expect(previousNameBox.x + previousNameBox.width).toBeLessThanOrEqual(allCasesBox.x);
      expect(allCasesBox.x + allCasesBox.width).toBeLessThanOrEqual(nextNameBox.x);
      expect(nextNameBox.x + nextNameBox.width).toBeLessThanOrEqual(nextImageBox.x);
      expect(await navigation.evaluate((node) => node.previousElementSibling?.id)).toBe(
        "case-contact-cta",
      );
    }
  });

  test("uses the mobile order without overflow or undersized touch targets", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(routeUrl(activeCases[0].href), { waitUntil: "domcontentloaded" });

    const navigation = page.getByRole("navigation", { name: "Navigeer tussen cases" });
    const previousCase = page.getByTestId("case-navigation-previous");
    const allCases = page.getByTestId("case-navigation-all");
    const nextCase = page.getByTestId("case-navigation-next");

    await navigation.scrollIntoViewIfNeeded();
    const geometry = await page.evaluate(() => {
      const rect = (testId) =>
        document.querySelector(`[data-testid="${testId}"]`).getBoundingClientRect();
      const previous = rect("case-navigation-previous");
      const all = rect("case-navigation-all");
      const next = rect("case-navigation-next");

      return {
        allHeight: all.height,
        nextTop: next.top,
        overflow: document.documentElement.scrollWidth - innerWidth,
        previousHeight: previous.height,
        previousTop: previous.top,
      };
    });

    expect(geometry.nextTop).toBeLessThan(geometry.previousTop);
    expect(geometry.previousHeight).toBeGreaterThanOrEqual(44);
    expect(geometry.allHeight).toBeGreaterThanOrEqual(44);
    expect(geometry.overflow).toBeLessThanOrEqual(1);
    await expect(previousCase).toContainText(activeCases.at(-1).client);
    await expect(previousCase.getByText("Vorige case", { exact: true })).toBeHidden();
    await expect(nextCase.locator("img")).toBeVisible();
  });
});
