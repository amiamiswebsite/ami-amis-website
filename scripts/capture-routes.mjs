import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";
import { publicRoutes, withBasePath } from "./public-routes.mjs";

const root = resolve(import.meta.dirname, "..");
const outputDirectory = resolve(
  process.env.CAPTURE_OUTPUT_DIR || resolve(root, "artifacts/screenshots/routes"),
);
const basePath = (process.env.CAPTURE_BASE_PATH || process.env.TEST_BASE_PATH || "").replace(
  /\/$/,
  "",
);
const port = Number(process.env.CAPTURE_PORT || 4399);
const suppliedBaseUrl = process.env.CAPTURE_BASE_URL;
const baseUrl = (suppliedBaseUrl || `http://127.0.0.1:${port}`).replace(/\/$/, "");
const viewports = [
  ["390x844", { width: 390, height: 844 }],
  ["768x1024", { width: 768, height: 1024 }],
  ["1440x1000", { width: 1440, height: 1000 }],
];

let server;

async function waitForServer(url) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.status < 500) return;
    } catch {
      // The preview process may still be binding its port.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(`Preview did not become available at ${url}`);
}

function routeName(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "--");
}

if (!suppliedBaseUrl) {
  server = spawn(process.execPath, ["scripts/serve-static.mjs", "--port", String(port)], {
    cwd: root,
    env: { ...process.env, TEST_BASE_PATH: basePath },
    stdio: ["ignore", "pipe", "pipe"],
  });
}

try {
  await mkdir(outputDirectory, { recursive: true });
  await waitForServer(`${baseUrl}${basePath || "/"}`);

  const browser = await chromium.launch();
  const manifest = {
    baseUrl,
    basePath,
    reducedMotion: true,
    routes: [],
    viewports: Object.fromEntries(viewports),
  };

  try {
    for (const [viewportName, viewport] of viewports) {
      const context = await browser.newContext({
        reducedMotion: "reduce",
        viewport,
      });

      for (const route of publicRoutes) {
        const page = await context.newPage();
        const ownOriginErrors = [];
        page.on("response", (response) => {
          const responseUrl = new URL(response.url());
          if (
            responseUrl.origin === new URL(baseUrl).origin &&
            ![200, 204, 206, 304].includes(response.status())
          ) {
            ownOriginErrors.push(`${response.status()} ${responseUrl.pathname}`);
          }
        });

        const url = `${baseUrl}${withBasePath(route, basePath)}`;
        const file = `${routeName(route)}--${viewportName}.jpg`;
        const entry = { route, viewport: viewportName, file, ownOriginErrors };

        try {
          const response = await page.goto(url, { waitUntil: "domcontentloaded" });
          await page.evaluate(async () => {
            for (
              let y = 0;
              y < document.documentElement.scrollHeight;
              y += Math.max(innerHeight * 0.75, 400)
            ) {
              scrollTo(0, y);
              await new Promise((resolveWait) => setTimeout(resolveWait, 35));
            }
            scrollTo(0, 0);
          });
          await page.waitForTimeout(160);
          entry.status = response?.status() ?? null;
          entry.h1Count = await page.locator("h1").count();
          entry.overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - innerWidth,
          );
          await page.screenshot({
            fullPage: true,
            path: resolve(outputDirectory, file),
            quality: 76,
            type: "jpeg",
          });
        } catch (error) {
          entry.error = error instanceof Error ? error.message : String(error);
        } finally {
          manifest.routes.push(entry);
          await page.close();
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  await writeFile(
    resolve(outputDirectory, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  const failures = manifest.routes.filter(
    (entry) =>
      entry.error ||
      entry.status >= 400 ||
      entry.h1Count !== 1 ||
      entry.overflow > 1 ||
      entry.ownOriginErrors.length,
  );
  console.log(
    `Captured ${manifest.routes.length} route/viewports in ${outputDirectory}; ${failures.length} failed checks.`,
  );
  if (failures.length) process.exitCode = 1;
} finally {
  server?.kill("SIGTERM");
}
