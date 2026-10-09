export const CAMPAIGN_PARAMETER_NAMES = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

export const CAMPAIGN_STORAGE_KEY = "amiamis_campaign_attribution";
const MAX_CAMPAIGN_VALUE_LENGTH = 100;

function sanitizeCampaignValue(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, MAX_CAMPAIGN_VALUE_LENGTH);
}

export function readCampaignParameters(search = "") {
  const searchParameters = new URLSearchParams(search);

  return Object.fromEntries(
    CAMPAIGN_PARAMETER_NAMES.flatMap((name) => {
      const value = sanitizeCampaignValue(searchParameters.get(name));
      return value ? [[name, value]] : [];
    }),
  );
}

export function readStoredCampaignParameters() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedCampaign = JSON.parse(
      window.sessionStorage.getItem(CAMPAIGN_STORAGE_KEY) || "{}",
    );

    return Object.fromEntries(
      CAMPAIGN_PARAMETER_NAMES.flatMap((name) => {
        const value = sanitizeCampaignValue(storedCampaign[name]);
        return value ? [[name, value]] : [];
      }),
    );
  } catch {
    return {};
  }
}

export function clearCampaignParameters() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(CAMPAIGN_STORAGE_KEY);
  } catch {
    // Nothing remains available to attribution when browser storage is blocked.
  }
}

export function captureCampaignParameters(search) {
  if (typeof window === "undefined") {
    return {};
  }

  const campaign = readCampaignParameters(search ?? window.location.search);
  if (!Object.keys(campaign).length) {
    return readStoredCampaignParameters();
  }

  try {
    window.sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
  } catch {
    // Attribution remains available through the current URL when storage is blocked.
  }

  return campaign;
}

export function appendCampaignParameters(destination, sourceSearch = "") {
  try {
    const url = new URL(destination);
    const currentCampaign = readCampaignParameters(sourceSearch);
    const campaign = Object.keys(currentCampaign).length
      ? currentCampaign
      : readStoredCampaignParameters();

    Object.entries(campaign).forEach(([name, value]) => {
      if (!url.searchParams.has(name)) {
        url.searchParams.set(name, value);
      }
    });

    return url.toString();
  } catch {
    return destination;
  }
}
