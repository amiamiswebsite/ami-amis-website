import { test } from "@playwright/test";
import { publicRoutes } from "../../scripts/public-routes.mjs";
import { expectStableRoute } from "./test-helpers.mjs";

test.use({ viewport: { width: 1440, height: 1000 } });

for (const route of publicRoutes) {
  test(`route smoke: ${route}`, async ({ page }) => {
    await expectStableRoute(page, route);
  });
}
