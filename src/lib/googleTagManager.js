export const GOOGLE_TAG_MANAGER_ID = "GTM-WZ3LC9DC";

const GOOGLE_TAG_MANAGER_SCRIPT_ID = "google-tag-manager-runtime";

export function loadGoogleTagManager() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return false;
  }

  if (document.getElementById(GOOGLE_TAG_MANAGER_SCRIPT_ID)) {
    return true;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.async = true;
  script.id = GOOGLE_TAG_MANAGER_SCRIPT_ID;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_ID}`;
  document.head.appendChild(script);
  return true;
}
