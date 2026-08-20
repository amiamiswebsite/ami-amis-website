const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteUrl = configuredSiteUrl.endsWith("/")
  ? configuredSiteUrl
  : `${configuredSiteUrl}/`;

export function canonicalUrl(pathname = "/") {
  const relativePath = pathname.replace(/^\/+/, "");
  return new URL(relativePath, siteUrl).toString();
}

export function pageTitle(title) {
  return title?.replace(/\s*\|\s*Ami Amis\s*$/i, "") || "Case";
}
