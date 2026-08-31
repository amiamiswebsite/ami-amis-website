const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
const basePath =
  !configuredBasePath || configuredBasePath === "/"
    ? ""
    : `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`;

export function assetPath(path) {
  return `${basePath}${path}`;
}
