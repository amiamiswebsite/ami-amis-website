import { canonicalUrl } from "../src/lib/site";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: canonicalUrl("/sitemap.xml"),
  };
}
