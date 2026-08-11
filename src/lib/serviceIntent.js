import { assetPath } from "./assetPath";

export const SERVICE_INTENT_STORAGE_KEY = "amiamis_service_intent";

function toText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeServiceIntent(intent = {}) {
  const source = toText(intent.source) || "diensten";
  const problemId = toText(intent.problemId || intent.problem);
  const problemNumber = toText(intent.problemNumber);
  const problemTitle = toText(intent.problemTitle);
  const ctaLabel = toText(intent.ctaLabel || intent.cta);

  if (!problemId && !problemTitle && !ctaLabel) {
    return null;
  }

  return {
    source,
    problemId,
    problemNumber,
    problemTitle,
    ctaLabel,
  };
}

export function buildServiceIntentHref(intent, baseHref = "/contact/") {
  const normalized = normalizeServiceIntent(intent);
  const href = assetPath(baseHref);

  if (!normalized) {
    return href;
  }

  const params = new URLSearchParams();
  params.set("source", normalized.source);

  if (normalized.problemId) {
    params.set("problem", normalized.problemId);
  }

  if (normalized.problemNumber) {
    params.set("problem_number", normalized.problemNumber);
  }

  if (normalized.problemTitle) {
    params.set("problem_title", normalized.problemTitle);
  }

  if (normalized.ctaLabel) {
    params.set("cta", normalized.ctaLabel);
  }

  return `${href}?${params.toString()}`;
}

export function trackServiceIntent(intent) {
  const normalized = normalizeServiceIntent(intent);

  if (!normalized || typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage?.setItem(
      SERVICE_INTENT_STORAGE_KEY,
      JSON.stringify(normalized),
    );
  } catch {
    // Session storage can be unavailable in private browser contexts.
  }

  const eventPayload = {
    event: "service_problem_cta_click",
    source: normalized.source,
    problem_id: normalized.problemId,
    problem_number: normalized.problemNumber,
    problem_title: normalized.problemTitle,
    cta_label: normalized.ctaLabel,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "service_problem_cta_click", {
      source: normalized.source,
      problem_id: normalized.problemId,
      problem_number: normalized.problemNumber,
      problem_title: normalized.problemTitle,
      cta_label: normalized.ctaLabel,
    });
  }
}

export function readServiceIntentFromSearch(search = "") {
  const params = new URLSearchParams(search);
  const source = toText(params.get("source"));

  if (source && source !== "diensten") {
    return null;
  }

  return normalizeServiceIntent({
    source: source || "diensten",
    problemId: params.get("problem"),
    problemNumber: params.get("problem_number"),
    problemTitle: params.get("problem_title"),
    ctaLabel: params.get("cta"),
  });
}

export function readStoredServiceIntent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.sessionStorage?.getItem(SERVICE_INTENT_STORAGE_KEY);
    return storedValue ? normalizeServiceIntent(JSON.parse(storedValue)) : null;
  } catch {
    return null;
  }
}
