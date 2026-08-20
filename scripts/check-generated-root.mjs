import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { basename, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const forbiddenEntries = new Set([
  ".nojekyll",
  "404",
  "404.html",
  "_next",
  "_not-found",
  "assets",
  "contact",
  "diensten",
  "fonts",
  "home-2",
  "images",
  "index.html",
  "index.txt",
  "ons-werk",
  "scroll-video-header-test",
  "team",
  "videos",
  "work",
]);

const onDisk = readdirSync(root)
  .filter((entry) => forbiddenEntries.has(entry) || entry.startsWith("__next"))
  .filter((entry) => existsSync(resolve(root, entry)));

const tracked = execFileSync("git", ["ls-files", "-z"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean)
  .filter((file) => {
    const first = file.split("/", 1)[0];
    return forbiddenEntries.has(first) || basename(file).startsWith("__next");
  });

if (onDisk.length || tracked.length) {
  console.error("Generated static-export output was found outside out/.");
  if (onDisk.length) console.error(`On disk: ${onDisk.join(", ")}`);
  if (tracked.length) console.error(`Tracked: ${tracked.slice(0, 20).join(", ")}`);
  console.error("Delete the root export and rebuild with `pnpm build`; never edit it.");
  process.exit(1);
}

console.log("Source/build boundary is clean: no generated root export detected.");
