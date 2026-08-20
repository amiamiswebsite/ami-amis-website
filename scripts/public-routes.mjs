import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "src/data/cases.js"), "utf8");
const canonicalSlugs = [...source.matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map((match) => match[1]);
const aliases = [...source.matchAll(/^ {4}aliases:\s*\[([^\]]*)\]/gm)].flatMap((match) =>
  [...match[1].matchAll(/"([^"]+)"/g)].map((alias) => alias[1]),
);
const caseSlugs = [...canonicalSlugs, ...aliases];

if (caseSlugs.length !== new Set(caseSlugs).size) {
  throw new Error("Duplicate case slugs found in src/data/cases.js");
}

export const primaryRoutes = ["/", "/contact/", "/diensten/", "/home-2/", "/team/", "/work/"];
export const caseRoutes = caseSlugs.flatMap((slug) => [`/work/${slug}/`, `/ons-werk/${slug}/`]);
export const publicRoutes = [...primaryRoutes, ...caseRoutes];

export function withBasePath(route, basePath = process.env.TEST_BASE_PATH ?? "") {
  const prefix = basePath.replace(/\/$/, "");
  return `${prefix}${route}` || "/";
}
