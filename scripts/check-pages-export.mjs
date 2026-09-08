import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../out");
const origin = "https://amiamis.com";
const failures = [];
const references = new Set();
const files = readdirSync(root, { recursive: true }).filter((file) =>
  statSync(resolve(root, file)).isFile(),
);

if (readFileSync(resolve(root, "CNAME"), "utf8").trim() !== "amiamis.com") {
  failures.push("CNAME must be amiamis.com");
}
for (const path of ["index.html", "404.html", "robots.txt", "sitemap.xml"]) {
  if (!existsSync(resolve(root, path))) failures.push(`Missing ${path}`);
}

function checkReference(value, source) {
  const decoded = value.replaceAll("&amp;", "&").replaceAll("&quot;", '"');
  if (!decoded || decoded.startsWith("#")) return;
  const url = new URL(decoded, `${origin}/${source}`);
  if (url.origin !== origin) return;
  const pathname = decodeURIComponent(url.pathname);
  references.add(pathname);
  const path = resolve(root, `.${pathname}`);
  const target =
    existsSync(path) && statSync(path).isDirectory() ? resolve(path, "index.html") : path;
  if (!existsSync(target)) failures.push(`${source}: missing ${pathname}`);
}

for (const file of files.filter((file) => /\.(html|css|js|xml|txt)$/.test(file))) {
  const contents = readFileSync(resolve(root, file), "utf8");
  if (contents.includes("/ami-amis-website/")) failures.push(`${file}: old production base path`);
  if (extname(file) === ".html") {
    for (const [, value] of contents.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
      checkReference(value, file);
    }
    for (const [, value] of contents.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g)) {
      if (!value.startsWith(`${origin}/`)) failures.push(`${file}: wrong canonical ${value}`);
    }
  }
  if (extname(file) === ".css" || extname(file) === ".html") {
    for (const [, value] of contents.matchAll(/url\(["']?([^\s)'"<>]+)["']?\)/g)) {
      if (value.startsWith("/")) checkReference(value, file);
    }
  }
}

if (failures.length) throw new Error([...new Set(failures)].join("\n"));
console.log(
  `Pages export verified: amiamis.com, root path, ${files.filter((file) => file.endsWith(".html")).length} HTML files, ${references.size} local paths, no missing references or legacy prefix.`,
);
