import {
  COOKIE_CONSENT_STORAGE_KEY,
  readAnalyticsConsent,
} from "./consentPreferences";

const EVENT_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;
const MAX_PARAMETER_LENGTH = 100;

function sanitizeString(value) {
  return value.trim().replace(/\s+/g, " ").slice(0, MAX_PARAMETER_LENGTH);
}

export function sanitizeAnalyticsParameters(parameters = {}) {
  return Object.fromEntries(
    Object.entries(parameters).flatMap(([key, value]) => {
      if (!EVENT_NAME_PATTERN.test(key) || value === null || value === undefined || value === "") {
        return [];
      }

      if (typeof value === "string") {
        const sanitizedValue = sanitizeString(value);
        return sanitizedValue ? [[key, sanitizedValue]] : [];
      }

      if (typeof value === "number" && Number.isFinite(value)) {
        return [[key, value]];
      }

      if (typeof value === "boolean") {
        return [[key, value]];
      }

      return [];
    }),
  );
}

export function trackAnalyticsEvent(eventName, parameters = {}) {
  if (
    typeof window === "undefined" ||
    typeof window.gtag !== "function" ||
    !EVENT_NAME_PATTERN.test(eventName)
  ) {
    return false;
  }

  try {
    if (
      readAnalyticsConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)) !==
      "granted"
    ) {
      return false;
    }
  } catch {
    return false;
  }

  try {
    window.gtag("event", eventName, sanitizeAnalyticsParameters(parameters));
    return true;
  } catch {
    return false;
  }
}

export function currentPagePath() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.pathname;
}
