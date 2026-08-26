import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const VIEWPORT = { width: 1920, height: 1080 };
const FINAL_PLAYBACK_RATE = 1.25;
const HOME_URL = "https://www.sjbmalle.be/";
const ROUTES = {
  kleuter: "https://www.sjbmalle.be/kleuter-home/",
  lager: "https://www.sjbmalle.be/home-lager/",
  secundair: "https://www.sjbmalle.be/secundair-home/",
};

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(scriptDirectory, "..");
const outputDirectory = resolve(projectDirectory, "public/images/cases/sjb");
const sourcePath = resolve(outputDirectory, "sjb-website-showcase-source.webm");
const finalPath = resolve(outputDirectory, "sjb-website-showcase.mp4");
const recordingDirectory = resolve(projectDirectory, ".artifacts/sjb-showcase-recording");
const browserUserAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

const presentationCss = `
  html {
    scrollbar-width: none !important;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  *::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  html,
  body,
  * {
    cursor: none !important;
  }
`;

async function installPresentationMode(context) {
  await context.addInitScript((css) => {
    const mountStyle = () => {
      if (document.querySelector("style[data-sjb-showcase]")) {
        return;
      }

      const style = document.createElement("style");
      style.dataset.sjbShowcase = "true";
      style.textContent = css;
      (document.head || document.documentElement).append(style);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mountStyle, { once: true });
    } else {
      mountStyle();
    }
  }, presentationCss);
}

async function waitForPageReady(page, settleMilliseconds = 250) {
  await page.waitForLoadState("domcontentloaded");

  await page
    .waitForFunction(() => !document.fonts || document.fonts.status === "loaded", null, {
      timeout: 10_000,
    })
    .catch(() => {});

  await page.evaluate(async () => {
    const visible = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 1 && rect.height > 1 && rect.bottom > 0 && rect.top < innerHeight;
    };

    const visibleImages = [...document.images].filter(visible);
    await Promise.all(
      visibleImages.map(async (image) => {
        if (!image.complete || !image.naturalWidth) {
          await new Promise((resolvePromise) => {
            const finish = () => resolvePromise();
            image.addEventListener("load", finish, { once: true });
            image.addEventListener("error", finish, { once: true });
            setTimeout(finish, 2_500);
          });
        }

        await image.decode?.().catch(() => {});
      }),
    );

    const visibleVideos = [...document.querySelectorAll("video")].filter(visible);
    await Promise.all(
      visibleVideos.map(
        (video) =>
          new Promise((resolvePromise) => {
            video.muted = true;
            video.playsInline = true;

            if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
              video.play().catch(() => {});
              resolvePromise();
              return;
            }

            const finish = () => {
              video.play().catch(() => {});
              resolvePromise();
            };

            video.addEventListener("loadeddata", finish, { once: true });
            video.addEventListener("error", finish, { once: true });
            setTimeout(finish, 3_000);
          }),
      ),
    );
  });

  await page.waitForTimeout(settleMilliseconds);
}

async function gotoWithRetry(page, url, attempts = 4) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      return;
    } catch (error) {
      lastError = error;

      if (attempt === attempts) {
        break;
      }

      const delay = 900 * attempt;
      console.warn(
        `Navigatiepoging ${attempt} voor ${url} mislukte; nieuwe poging over ${delay} ms.`,
      );
      await page.waitForTimeout(delay);
    }
  }

  throw lastError;
}

async function prewarmRoute(page, url) {
  await gotoWithRetry(page, url);
  await waitForPageReady(page, 300);

  await page.evaluate(async () => {
    const maximumScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const stops = [0.24, 0.48, 0.68];

    for (const progress of stops) {
      scrollTo(0, Math.round(maximumScroll * progress));
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 260));
    }

    scrollTo(0, 0);
  });

  await page.waitForTimeout(450);
}

async function smoothScrollTo(page, targetY, duration, easing = "cinematic") {
  await page.evaluate(
    ({ destination, durationMilliseconds, easingName }) =>
      new Promise((resolvePromise) => {
        const startY = scrollY;
        const maximumScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        const endY = Math.max(0, Math.min(destination, maximumScroll));
        const distance = endY - startY;
        const startTime = performance.now();

        const ease = (progress) => {
          if (easingName === "quint") {
            return progress < 0.5 ? 16 * progress ** 5 : 1 - (-2 * progress + 2) ** 5 / 2;
          }

          return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        };

        const animate = (now) => {
          const progress = Math.min(1, (now - startTime) / durationMilliseconds);
          scrollTo(0, startY + distance * ease(progress));

          if (progress < 1) {
            requestAnimationFrame(animate);
            return;
          }

          resolvePromise();
        };

        requestAnimationFrame(animate);
      }),
    {
      destination: targetY,
      durationMilliseconds: duration,
      easingName: easing,
    },
  );
}

async function scrollHeadingIntoFrame(page, headingPattern, offset, duration, easing) {
  const targetY = await page.evaluate(
    ({ pattern, targetOffset }) => {
      const normalizedPattern = pattern.trim().replace(/\s+/g, " ").toLocaleLowerCase("nl-BE");
      const heading = [...document.querySelectorAll("h1, h2")].find((element) => {
        const normalizedHeading = (element.textContent || "")
          .trim()
          .replace(/\s+/g, " ")
          .toLocaleLowerCase("nl-BE");

        return normalizedHeading.includes(normalizedPattern);
      });

      if (!heading) {
        throw new Error(`Kon scrollanker niet vinden: ${pattern}`);
      }

      return heading.getBoundingClientRect().top + scrollY - targetOffset;
    },
    { pattern: headingPattern, targetOffset: offset },
  );

  await smoothScrollTo(page, targetY, duration, easing);
}

async function openFromHomepage(page, destination) {
  const link = page.locator(`a[href="${destination}"]`).first();
  await link.waitFor({ state: "visible", timeout: 10_000 });

  try {
    await Promise.all([
      page.waitForURL(destination, { timeout: 60_000, waitUntil: "domcontentloaded" }),
      link.click(),
    ]);
  } catch {
    console.warn(`Kaartnavigatie naar ${destination} mislukte; directe retry wordt gebruikt.`);
    await gotoWithRetry(page, destination);
  }

  await waitForPageReady(page, 220);
}

async function returnHome(page) {
  await gotoWithRetry(page, HOME_URL);
  await waitForPageReady(page, 180);
}

async function animateHomepageCards(page) {
  for (const destination of Object.values(ROUTES)) {
    const card = page.locator(`a[href="${destination}"]`).first();
    await card.hover();
    await page.waitForTimeout(260);
  }

  await page.mouse.move(VIEWPORT.width - 6, VIEWPORT.height - 6);
  await page.waitForTimeout(120);
}

async function runFfmpeg(argumentsList) {
  await new Promise((resolvePromise, rejectPromise) => {
    const ffmpeg = spawn(process.env.FFMPEG_PATH || "ffmpeg", argumentsList, {
      stdio: ["ignore", "inherit", "inherit"],
    });

    ffmpeg.once("error", (error) => {
      if (error.code === "ENOENT") {
        rejectPromise(new Error("FFmpeg niet gevonden. Installeer FFmpeg of stel FFMPEG_PATH in."));
        return;
      }

      rejectPromise(error);
    });
    ffmpeg.once("exit", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      rejectPromise(new Error(`FFmpeg stopte met exitcode ${code}`));
    });
  });
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  await rm(recordingDirectory, { recursive: true, force: true });
  await mkdir(recordingDirectory, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--autoplay-policy=no-user-gesture-required", "--hide-scrollbars", "--mute-audio"],
  });

  let context;

  try {
    context = await browser.newContext({
      deviceScaleFactor: 1,
      ignoreHTTPSErrors: true,
      locale: "nl-BE",
      recordVideo: {
        dir: recordingDirectory,
        size: VIEWPORT,
      },
      userAgent: browserUserAgent,
      viewport: VIEWPORT,
    });

    await installPresentationMode(context);

    const prewarmPage = await context.newPage();
    const prewarmVideo = prewarmPage.video();

    for (const url of [HOME_URL, ...Object.values(ROUTES)]) {
      console.log(`Prewarm: ${url}`);
      await prewarmRoute(prewarmPage, url);
      await prewarmPage.waitForTimeout(900);
    }

    await prewarmPage.close();

    if (prewarmVideo) {
      const prewarmVideoPath = await prewarmVideo.path();
      await rm(prewarmVideoPath, { force: true });
    }

    const recordingStartedAt = Date.now();
    const page = await context.newPage();
    const video = page.video();

    await gotoWithRetry(page, HOME_URL);
    await waitForPageReady(page, 350);

    const showcaseStartedAt = Date.now();
    console.log("Showcase: homepage");
    await page.waitForTimeout(2_000);
    await animateHomepageCards(page);

    console.log("Showcase: kleuterschool");
    await openFromHomepage(page, ROUTES.kleuter);
    await page.waitForTimeout(850);
    await scrollHeadingIntoFrame(
      page,
      "Neem hier een kijkje in onze kleuterschool",
      170,
      1_650,
      "cinematic",
    );
    await page.waitForTimeout(300);
    await scrollHeadingIntoFrame(page, "Wandel mee door onze kleuterschool", 210, 1_850, "quint");
    await page.waitForTimeout(550);

    console.log("Showcase: terug naar homepage");
    await returnHome(page);
    await page.waitForTimeout(380);

    console.log("Showcase: lagere school");
    await openFromHomepage(page, ROUTES.lager);
    await page.waitForTimeout(700);
    await scrollHeadingIntoFrame(
      page,
      "Neem hier een kijkje in onze lagere school",
      180,
      1_550,
      "cinematic",
    );
    await page.waitForTimeout(400);

    console.log("Showcase: terug naar homepage");
    await returnHome(page);
    await page.waitForTimeout(320);

    console.log("Showcase: secundair onderwijs");
    await openFromHomepage(page, ROUTES.secundair);
    await page.waitForTimeout(850);
    await scrollHeadingIntoFrame(page, "WELKOM OP SINT-JAN", 190, 1_500, "cinematic");
    await page.waitForTimeout(300);
    await scrollHeadingIntoFrame(page, "Onderwijsconcept", 220, 2_000, "quint");
    await page.waitForTimeout(1_000);

    const showcaseEndedAt = Date.now();
    const sourceLeadSeconds = (showcaseStartedAt - recordingStartedAt) / 1_000;
    const showcaseDurationSeconds = (showcaseEndedAt - showcaseStartedAt) / 1_000;

    await page.close();

    if (!video) {
      throw new Error("Playwright heeft geen bronvideo aangemaakt.");
    }

    await video.saveAs(sourcePath);

    console.log(
      `Bronopname klaar: ${sourcePath} (${showcaseDurationSeconds.toFixed(2)} s showcase)`,
    );

    await runFfmpeg([
      "-y",
      "-i",
      sourcePath,
      "-ss",
      sourceLeadSeconds.toFixed(3),
      "-t",
      showcaseDurationSeconds.toFixed(3),
      "-an",
      "-vf",
      `scale=1920:1080:flags=lanczos,setpts=${(1 / FINAL_PLAYBACK_RATE).toFixed(6)}*PTS`,
      "-r",
      "25",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "17",
      "-profile:v",
      "high",
      "-level",
      "4.2",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      finalPath,
    ]);

    console.log(`Finale video klaar: ${finalPath}`);
  } finally {
    await context?.close().catch(() => {});
    await browser.close();
    await rm(recordingDirectory, { recursive: true, force: true });
  }
}

await main();
