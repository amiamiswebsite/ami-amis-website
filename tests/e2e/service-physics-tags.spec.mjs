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

async function scoreThroughHoop(page, stage, label, expectedScore) {
  const tag = stage.getByText(label, { exact: true });
  const scoreCounter = page.getByTestId("service-score-counter");
  const expectedLabel = `Score: ${expectedScore} van 5`;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    if ((await scoreCounter.getAttribute("aria-label")) === expectedLabel) return;

    await tag.evaluate((node) => {
      node.style.zIndex = "20";
    });

    const stageBox = await stage.boundingBox();
    const tagBox = await tag.boundingBox();
    const hoop = await stage.evaluate((node) => {
      const styles = getComputedStyle(node);
      return {
        x: Number.parseFloat(styles.getPropertyValue("--service-hoop-x")),
        y: Number.parseFloat(styles.getPropertyValue("--service-hoop-y")),
      };
    });

    expect(stageBox).not.toBeNull();
    expect(tagBox).not.toBeNull();

    await page.mouse.move(tagBox.x + tagBox.width / 2, tagBox.y + tagBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(stageBox.x + hoop.x, stageBox.y + hoop.y - 92, { steps: 14 });
    await page.mouse.move(stageBox.x + hoop.x, stageBox.y + hoop.y + 34, { steps: 18 });
    await page.mouse.up();

    for (let poll = 0; poll < 9; poll += 1) {
      if ((await scoreCounter.getAttribute("aria-label")) === expectedLabel) return;
      await page.waitForTimeout(100);
    }
  }

  await expect(scoreCounter).toHaveAttribute("aria-label", expectedLabel);
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

  test("scores through the responsive hoop position", async ({ page }) => {
    await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

    const stage = page.getByTestId("service-physics-stage");
    await stage.scrollIntoViewIfNeeded();
    await expect(stage).toHaveAttribute("data-physics-ready", "true");
    await page.waitForTimeout(1_000);

    await expect(page.getByTestId("service-score-counter")).toHaveAttribute(
      "aria-label",
      "Score: 0 van 5",
    );
    await scoreThroughHoop(page, stage, "Marketing", 1);
  });

  test("opens one accessible Brent reward after five real goals", async ({ page }) => {
    await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

    const stage = page.getByTestId("service-physics-stage");
    await stage.scrollIntoViewIfNeeded();
    await expect(stage).toHaveAttribute("data-physics-ready", "true");
    await page.waitForTimeout(1_000);

    for (const [index, label] of serviceLabels.slice(0, 5).entries()) {
      await scoreThroughHoop(page, stage, label, index + 1);
    }

    const modal = page.getByTestId("service-win-modal");
    const closeButton = page.getByTestId("service-win-close");
    const bookingLink = modal.getByRole("link", { name: /Boek snel een date met Brent/i });

    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute("role", "dialog");
    await expect(modal).toHaveAttribute("aria-modal", "true");
    await expect(
      modal.getByRole("heading", { name: "Proficiat, je hebt gewonnen!" }),
    ).toBeVisible();
    await expect(modal.getByText("Niets dan net.", { exact: true })).toHaveCount(0);
    await expect(modal.getByText("5/5", { exact: true })).toHaveCount(0);
    await expect(modal.getByText("AMIS4EVER", { exact: true })).toBeVisible();
    await expect(bookingLink).toHaveAttribute("href", "https://calendly.com/brent-amiamis/30min");
    await expect(bookingLink).toHaveAttribute("target", "_blank");
    await expect(
      modal.getByRole("heading", { name: "Proficiat, je hebt gewonnen!" }),
    ).toBeFocused();

    await page.getByTestId("service-reward-code").click();
    await expect(page.getByTestId("service-reward-code")).toContainText("Gekopieerd");
    await expect(modal).toBeVisible();
    await closeButton.click();
    await expect(modal).toBeHidden();
    await expect(page.getByTestId("service-score-counter")).toHaveAttribute(
      "aria-label",
      "Score: 5 van 5",
    );
    await expect(page.locator("body")).not.toHaveClass(/modal-open/);
    await page.waitForTimeout(900);
    await expect(page.getByTestId("service-win-modal")).toBeHidden();
  });

  test("uses the section top as the tag ceiling", async ({ page }) => {
    await page.goto(routeUrl("/"), { waitUntil: "domcontentloaded" });

    const stage = page.getByTestId("service-physics-stage");
    await stage.scrollIntoViewIfNeeded();
    await expect(stage).toHaveAttribute("data-physics-ready", "true");

    const readGeometry = () =>
      stage.evaluate((node) => {
        const section = node.closest(".social-growth-game");
        const stageRect = node.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const ceilingY = Number.parseFloat(
          getComputedStyle(node).getPropertyValue("--service-stage-ceiling-y"),
        );

        return {
          ceilingTop: stageRect.top + ceilingY,
          sectionTop: sectionRect.top,
          stageTop: stageRect.top,
        };
      });

    await expect
      .poll(async () => {
        const current = await readGeometry();
        return current.ceilingTop - current.sectionTop;
      })
      .toBeGreaterThanOrEqual(-2);
    await expect
      .poll(async () => {
        const current = await readGeometry();
        return current.ceilingTop - current.sectionTop;
      })
      .toBeLessThanOrEqual(16);

    const geometry = await readGeometry();
    expect(geometry.ceilingTop).toBeLessThan(geometry.stageTop - 40);

    await page.waitForTimeout(1_000);
    const tag = stage.getByText("Marketing", { exact: true });
    const tagBox = await tag.boundingBox();
    const stageBox = await stage.boundingBox();

    await page.mouse.move(tagBox.x + tagBox.width / 2, tagBox.y + tagBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(
      stageBox.x + stageBox.width * 0.4,
      geometry.ceilingTop + tagBox.height / 2 + 8,
      { steps: 16 },
    );
    await page.waitForTimeout(120);

    const airborneTag = await tag.boundingBox();
    expect(airborneTag.y).toBeLessThan(geometry.stageTop - 24);
    await page.mouse.up();
    await page.waitForTimeout(350);

    const containedTag = await tag.boundingBox();
    expect(containedTag.y).toBeGreaterThanOrEqual(geometry.sectionTop + 6);
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
