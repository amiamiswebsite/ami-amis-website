import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicRoot = resolve(root, "public");
const budgetPath = resolve(root, "docs/audits/ASSET_BUDGET.json");
const mode = process.argv.includes("--write") ? "write" : "check";
const nonAssetFiles = new Set(["CNAME"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? walk(path) : path;
    }),
  );

  return files.flat();
}

const files = (await walk(publicRoot)).filter(
  (path) => !nonAssetFiles.has(relative(publicRoot, path)),
);
const inventory = await Promise.all(
  files.map(async (path) => {
    const metadata = await stat(path);
    return {
      path: relative(publicRoot, path),
      bytes: metadata.size,
      extension: extname(path).toLowerCase() || "none",
    };
  }),
);
const totalBytes = inventory.reduce((sum, item) => sum + item.bytes, 0);
const largest = [...inventory].sort((a, b) => b.bytes - a.bytes).slice(0, 30);
const extensions = Object.fromEntries(
  [...new Set(inventory.map((item) => item.extension))].sort().map((extension) => {
    const matching = inventory.filter((item) => item.extension === extension);
    return [
      extension,
      {
        count: matching.length,
        bytes: matching.reduce((sum, item) => sum + item.bytes, 0),
      },
    ];
  }),
);

if (mode === "write") {
  const baseline = {
    source: "public/",
    totalFiles: inventory.length,
    maxTotalBytes: totalBytes,
    maxSingleFileBytes: largest[0]?.bytes ?? 0,
    extensions,
    largest,
  };
  await writeFile(budgetPath, `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(`Wrote asset baseline for ${inventory.length} files (${totalBytes} bytes).`);
  process.exit(0);
}

const baseline = JSON.parse(await readFile(budgetPath, "utf8"));
const failures = [];
if (totalBytes > baseline.maxTotalBytes) {
  failures.push(
    `public/ grew by ${totalBytes - baseline.maxTotalBytes} bytes; review media and run pnpm assets:baseline only for an intentional change.`,
  );
}
if ((largest[0]?.bytes ?? 0) > baseline.maxSingleFileBytes) {
  failures.push(
    `${largest[0].path} is ${largest[0].bytes} bytes and exceeds the approved single-file baseline.`,
  );
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `Asset budget is green: ${inventory.length} files, ${totalBytes} / ${baseline.maxTotalBytes} bytes.`,
);
