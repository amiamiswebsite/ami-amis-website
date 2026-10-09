export const COOKIE_CONSENT_STORAGE_KEY = "amiamis_cookie_consent";
export const COOKIE_CONSENT_VERSION = "2026-10-09";
export const COOKIE_CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export const COOKIE_SETTINGS_EVENT = "amiamis:open-cookie-settings";
export const COOKIE_CONSENT_CHANGED_EVENT = "amiamis:analytics-consent-changed";

export function readAnalyticsConsent(storedValue, now = Date.now()) {
  if (!storedValue) {
    return null;
  }

  try {
    const preference = JSON.parse(storedValue);
    const updatedAt = Date.parse(preference.updatedAt);
    const isChoiceValid = preference.choice === "granted" || preference.choice === "denied";
    const isCurrentVersion = preference.version === COOKIE_CONSENT_VERSION;
    const age = now - updatedAt;
    const isCurrent =
      Number.isFinite(updatedAt) && age >= 0 && age <= COOKIE_CONSENT_MAX_AGE_MS;

    return isChoiceValid && isCurrentVersion && isCurrent ? preference.choice : null;
  } catch {
    return null;
  }
}

export function createAnalyticsConsentPreference(choice, now = new Date()) {
  if (choice !== "granted" && choice !== "denied") {
    throw new TypeError("Unsupported analytics consent choice");
  }

  return JSON.stringify({
    choice,
    updatedAt: now.toISOString(),
    version: COOKIE_CONSENT_VERSION,
  });
}
