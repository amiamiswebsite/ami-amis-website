"use client";

import { useCallback, useEffect, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";
import styles from "./ConsentAnalytics.module.css";

export const COOKIE_CONSENT_STORAGE_KEY = "amiamis_cookie_consent";
export const COOKIE_SETTINGS_EVENT = "amiamis:open-cookie-settings";

function updateGoogleConsent(choice) {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: choice === "granted" ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  });
}

export default function ConsentAnalytics() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let storedChoice = null;

    try {
      storedChoice = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    } catch {
      // The default consent state remains denied when storage is unavailable.
    }

    const openBannerFrame = window.requestAnimationFrame(() => {
      setIsOpen(storedChoice !== "granted" && storedChoice !== "denied");
    });

    const openSettings = () => setIsOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);

    return () => {
      window.cancelAnimationFrame(openBannerFrame);
      window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const saveChoice = useCallback((choice) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    } catch {
      // Consent still applies to this page view when storage is unavailable.
    }

    updateGoogleConsent(choice);
    setIsOpen(false);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <section
      aria-labelledby="cookie-consent-title"
      className={styles.banner}
      data-testid="cookie-consent"
      role="region"
    >
      <div className={styles.copy}>
        <h2 id="cookie-consent-title">Koekje erbij?</h2>
        <p>
          Met jouw toestemming gebruiken we Google Analytics om te zien wat werkt op onze site.
          We gebruiken geen advertentiecookies. Lees meer in ons{" "}
          <a href={assetPath("/privacy-policy/")}>privacybeleid</a>.
        </p>
      </div>
      <div className={styles.actions}>
        <button className={`${styles.button} ${styles.accept}`} onClick={() => saveChoice("granted")} type="button">
          Accepteren
        </button>
        <button className={styles.button} onClick={() => saveChoice("denied")} type="button">
          Weigeren
        </button>
      </div>
    </section>
  );
}
