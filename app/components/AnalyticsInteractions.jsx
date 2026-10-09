"use client";

import { useEffect } from "react";
import {
  appendCampaignParameters,
  captureCampaignParameters,
  clearCampaignParameters,
} from "../../src/lib/campaignTracking";
import { trackAnalyticsEvent } from "../../src/lib/analytics";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  readAnalyticsConsent,
} from "../../src/lib/consentPreferences";

function linkContext(link) {
  if (link.closest("footer")) return "footer";
  if (link.closest('[role="dialog"]')) return "navigation";
  if (window.location.pathname.includes("/contact")) return "contact_page";
  return "page";
}

function internalUrl(href) {
  try {
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin ? url : null;
  } catch {
    return null;
  }
}

export default function AnalyticsInteractions() {
  useEffect(() => {
    const captureAttributionWithConsent = () => {
      try {
        if (
          readAnalyticsConsent(
            window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY),
          ) === "granted"
        ) {
          captureCampaignParameters(window.location.search);
        } else {
          clearCampaignParameters();
        }
      } catch {
        // Attribution stays disabled when consent storage is unavailable.
      }
    };

    const handleConsentChange = (event) => {
      if (event.detail?.choice === "granted") {
        captureCampaignParameters(window.location.search);
      } else {
        clearCampaignParameters();
      }
    };

    captureAttributionWithConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, handleConsentChange);

    const handleLinkClick = (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link || link.dataset.analyticsIgnore === "true") {
        return;
      }

      const href = link.getAttribute("href") || "";
      const context = linkContext(link);
      const sourcePath = window.location.pathname;

      if (href.startsWith("mailto:")) {
        trackAnalyticsEvent("contact_click", {
          contact_method: "email",
          link_context: context,
          source_path: sourcePath,
        });
        return;
      }

      if (href.startsWith("tel:")) {
        trackAnalyticsEvent("contact_click", {
          contact_method: "phone",
          link_context: context,
          source_path: sourcePath,
        });
        return;
      }

      if (/^https:\/\/(?:www\.)?calendly\.com\//i.test(href)) {
        const campaignUrl = appendCampaignParameters(href, window.location.search);
        if (campaignUrl !== href) {
          link.href = campaignUrl;
        }

        trackAnalyticsEvent("book_meeting_click", {
          link_context: context,
          source_path: sourcePath,
        });
        return;
      }

      const url = internalUrl(href);
      if (!url) {
        return;
      }

      if (/\/contact\/?$/.test(url.pathname) && !/\/contact\/?$/.test(sourcePath)) {
        trackAnalyticsEvent("contact_intent_click", {
          link_context: context,
          source_path: sourcePath,
        });
        return;
      }

      const caseMatch = url.pathname.match(/\/work\/([^/]+)\/?$/);
      if (caseMatch) {
        trackAnalyticsEvent("select_content", {
          content_type: "case",
          item_id: caseMatch[1],
          link_context: context,
          source_path: sourcePath,
        });
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, handleConsentChange);
    };
  }, []);

  return null;
}
