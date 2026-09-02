import { cases } from "../src/data/cases";
import { canonicalUrl } from "../src/lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  const primaryPaths = [
    "/",
    "/algemene-voorwaarden/",
    "/diensten/",
    "/work/",
    "/team/",
    "/contact/",
    "/privacy-policy/",
  ];
  const casePaths = cases.map((item) => `/work/${item.slug}/`);

  return [...primaryPaths, ...casePaths].map((pathname) => ({
    url: canonicalUrl(pathname),
  }));
}
