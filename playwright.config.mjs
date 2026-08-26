import { defineConfig } from "@playwright/test";

const basePath = process.env.TEST_BASE_PATH ?? "";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  timeout: process.env.CI ? 120_000 : 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["line"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://127.0.0.1:4173${basePath}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "pnpm preview -- --port 4173",
    url: `http://127.0.0.1:4173${basePath || "/"}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
