import { expect, test } from "@playwright/test";
import { routeUrl } from "./test-helpers.mjs";

const serviceLabels = [
  "Marketing",
  "video",
  "videografie",
  "montage",
  "copywriting",
  "campagnes",
  "social media content",
  "grafisch design",
  "webdesign",
  "fotografie",
  "animatie",
  "short form content",
  "audio design",
  "grading",
  "productie",
  "VFX",
  "reclamespot",
  "screenwriting",
  "....",
];

async function expectTagsInsideStage(stage) {
  const overflow = await stage.evaluate((node) => {
    const stageRect = node.getBoundingClientRect();

    return [...node.querySelectorAll("[data-physics-tag]")].reduce((maximum, tag) => {
      const rect = tag.getBoundingClientRect();
      return Math.max(
        maximum,
        stageRect.left - rect.left,
        stageRect.top - rect.top,
        rect.right - stageRect.right,
        rect.bottom - stageRect.bottom,
      );
    }, 0);
  });

  expect(overflow).toBeLessThanOrEqual(2);
}

test.describe("homepage service physics tags", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("keeps every tag in bounds and supports direct drag with inertia", async ({ page }) => {
    await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

    const stage = page.getByTestId("service-physics-stage");
    await stage.scrollIntoViewIfNeeded();
    await expect(stage).toHaveAttribute("data-physics-ready", "true");
    await expect(stage.locator("[data-physics-tag]")).toHaveText(serviceLabels);
    await page.waitForTimeout(1_400);
    await expectTagsInsideStage(stage);

    const tag = stage.getByText("Marketing", { exact: true });
    const stageBox = await stage.boundingBox();
    const before = await tag.boundingBox();
    expect(stageBox).not.toBeNull();
    expect(before).not.toBeNull();

    const start = {
      x: before.x + before.width / 2,
      y: before.y + before.height / 2,
    };
    const target = {
      x: Math.min(stageBox.x + stageBox.width - 110, start.x + 260),
      y: Math.max(stageBox.y + 100, start.y - 180),
    };

    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(target.x, target.y, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(180);

    const afterThrow = await tag.boundingBox();
    const displacement = Math.hypot(afterThrow.x - before.x, afterThrow.y - before.y);
    expect(displacement).toBeGreaterThan(40);

    await page.waitForTimeout(1_300);
    await expectTagsInsideStage(stage);
  });

  test("uses a stable DOM layout when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

    const stage = page.getByTestId("service-physics-stage");
    await stage.scrollIntoViewIfNeeded();
    await expect(stage.locator("[data-physics-tag]")).toHaveText(serviceLabels);
    await page.waitForTimeout(500);

    await expect(stage).not.toHaveAttribute("data-physics-ready", "true");
    const state = await stage.evaluate((node) => ({
      listDisplay: getComputedStyle(node.querySelector("ul")).display,
      touchAction: getComputedStyle(node).touchAction,
      transforms: [...node.querySelectorAll("[data-physics-tag]")].map(
        (tag) => getComputedStyle(tag).transform,
      ),
    }));

    expect(state.listDisplay).toBe("flex");
    expect(state.touchAction).toBe("pan-y");
    expect(new Set(state.transforms)).toEqual(new Set(["none"]));
  });
});
