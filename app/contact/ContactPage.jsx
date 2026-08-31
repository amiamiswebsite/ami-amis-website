"use client";

import { useEffect, useRef, useState } from "react";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import BrandIcon from "../components/ui/BrandIcon";
import Icon from "../components/ui/Icon";
import { assetPath } from "../../src/lib/assetPath";
import {
  readServiceIntentFromSearch,
  readStoredServiceIntent,
} from "../../src/lib/serviceIntent";

const mail = "brent@amiamis.be";
const mailSubject = "Contact via Ami Amis";
const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";

const contactItems = [
  {
    label: "Mail",
    value: mail,
    href: `mailto:${mail}`,
    icon: "mail",
  },
  {
    label: "Telefoon",
    value: "+32 472 65 75 95",
    href: "tel:+32472657595",
    icon: "phone",
  },
];

const practicalItems = [
  { label: "Kantooruren", value: "ma - vr 9u-18u" },
  { label: "BTW", value: "BE0786.290.512" },
];

const locations = [
  "Kantoor: Meir 78 - Stadsfeestzaal, 2000 Antwerpen",
  "Hoofdzetel: IJzerenpoortkaai 3, 2000 Antwerpen",
];

const socialLinks = [
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/amiamismedia/" },
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/company/ami-amis-malle/",
  },
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/AmiAmisMedia" },
];

const legalLinks = [
  { label: "Privacy policy", href: "https://www.amiamis.com/privacy-policy" },
  { label: "Algemene voorwaarden", href: "https://www.amiamis.com/algemene-voorwaarden" },
];

function ContactInfoList() {
  return (
    <ul className="contact-info-list" aria-label="Contactgegevens">
      {contactItems.map((item) => (
        <li className="contact-info-item" key={item.label}>
          <span className="contact-info-item__icon">
            <Icon name={item.icon} />
          </span>
          <span className="contact-info-item__text">
            <span>{item.label}</span>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={`${item.label}: ${item.value}`}
            >
              {item.value}
            </a>
          </span>
        </li>
      ))}
    </ul>
  );
}

function getMailHref(intent, fields) {
  const subject = intent?.problemTitle
    ? `${mailSubject} — ${intent.problemTitle}`
    : mailSubject;
  const body = fields
    ? [
        `Naam: ${fields.naam}`,
        `E-mail: ${fields.email}`,
        `Telefoon: ${fields.telefoon || "Niet opgegeven"}`,
        "",
        fields.bericht,
      ].join("\n")
    : "";

  return `mailto:${mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ContactForm({ intent }) {
  const formRef = useRef(null);
  const [state, setState] = useState("idle");
  const [fallbackHref, setFallbackHref] = useState(getMailHref(intent));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    const mailtoHref = getMailHref(intent, fields);

    setFallbackHref(mailtoHref);

    if (!contactEndpoint) {
      setState("fallback");
      window.location.assign(mailtoHref);
      return;
    }

    setState("submitting");
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
      formRef.current?.reset();
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <form
      className="contact-minimal__form contact-form-card"
      id="contact-form"
      action={getMailHref(intent)}
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {intent ? (
        <>
          <input name="bron" type="hidden" value={intent.source} />
          <input
            name="probleem"
            type="hidden"
            value={intent.problemTitle || intent.problemId}
          />
          <input name="gekozen_cta" type="hidden" value={intent.ctaLabel} />
        </>
      ) : null}
      <label htmlFor="contact-name">
        Naam
        <input id="contact-name" name="naam" type="text" autoComplete="name" required />
      </label>
      <label htmlFor="contact-email">
        E-mail
        <input id="contact-email" name="email" type="email" autoComplete="email" required />
      </label>
      <label htmlFor="contact-phone">
        Telefoon
        <input id="contact-phone" name="telefoon" type="tel" autoComplete="tel" />
      </label>
      <label htmlFor="contact-message">
        Bericht
        <textarea id="contact-message" name="bericht" rows={5} required />
      </label>
      <button
        className="contact-minimal__submit button button--red"
        disabled={state === "submitting"}
        type="submit"
      >
        Verstuur
      </button>
      <div aria-live="polite" className="contact-form-card__status aa-visually-hidden">
        {state === "success" ? "Bedankt. Je bericht is verstuurd." : null}
        {state === "fallback" ? (
          <span>
            Je e-mailapp wordt geopend. Werkt dat niet? <a href={fallbackHref}>Open de mail opnieuw.</a>
          </span>
        ) : null}
      </div>
      {state === "error" ? (
        <p className="contact-form-card__error aa-visually-hidden" role="alert">
          Versturen lukte niet. <a href={fallbackHref}>Stuur je bericht via e-mail.</a>
        </p>
      ) : null}
    </form>
  );
}

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceIntent, setServiceIntent] = useState(null);
  const [contactChoice, setContactChoice] = useState(null);
  const [noConverted, setNoConverted] = useState(false);
  const contactFormFocusRef = useRef(null);

  useEffect(() => {
    const intentFromSearch = readServiceIntentFromSearch(window.location.search);
    const intentFromStorage = intentFromSearch ? null : readStoredServiceIntent();
    const frame = window.requestAnimationFrame(() => {
      setServiceIntent(intentFromSearch || intentFromStorage);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const focusContactForm = () => {
    const element = contactFormFocusRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    const bounds = element.getBoundingClientRect();
    const visibleHeight = Math.max(
      0,
      Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0),
    );
    const isSufficientlyVisible = visibleHeight >= Math.min(bounds.height * 0.62, 360);

    element.focus({ preventScroll: true });

    if (isMobile || !isSufficientlyVisible) {
      element.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: isMobile ? "start" : "center",
      });
    }

    if (reducedMotion || typeof element.animate !== "function") return;

    element.animate(
      [
        { boxShadow: "0 0 0 0 rgba(242, 69, 34, 0)" },
        { boxShadow: "0 0 0 6px rgba(242, 69, 34, 0.14)", offset: 0.42 },
        { boxShadow: "0 0 0 0 rgba(242, 69, 34, 0)" },
      ],
      {
        duration: 760,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );
  };

  const handleContactChoice = (choice) => {
    if (choice === "no") setNoConverted(true);
    setContactChoice(choice);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(focusContactForm);
    });
  };

  return (
    <>
      <div className={`site-shell contact-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="contact-page" id="contact-main">
          <section
            className="contact-minimal contact-redesign contact-editorial"
            aria-labelledby="contact-title"
          >
            <a className="hero__logo contact-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />

            <div className="contact-minimal__inner">
              <div className="contact-minimal__content contact-editorial__frame contact-overview">
                <div className="contact-minimal__composition contact-intro contact-editorial__lead contact-overview__lead">
                  <h1 className="contact-intro__title" id="contact-title">
                    <span>Goesting in een</span>
                    <span>samenwerking?</span>
                  </h1>
                  <div className="contact-choice" aria-label="Goesting in een samenwerking?">
                    <button
                      aria-pressed={contactChoice === "yes"}
                      className="contact-choice__button"
                      onClick={() => handleContactChoice("yes")}
                      type="button"
                    >
                      Ja
                    </button>
                    <button
                      aria-pressed={contactChoice === "no"}
                      className="contact-choice__button"
                      onClick={() => handleContactChoice("no")}
                      type="button"
                    >
                      {noConverted ? "Ja" : "Nee"}
                    </button>
                  </div>
                  <p className="aa-visually-hidden" aria-live="polite">
                    {contactChoice ? "Top. Kies Agenda Brent of vul het formulier in." : null}
                  </p>
                  <div className="contact-booking">
                    <p>
                      Heb je een vraag? Ben je benieuwd naar onze producties of andere diensten?
                      Of wil je gewoon kennismaken? Boek snel een date in Brent zijn agenda!
                    </p>
                    <a
                      className="button contact-booking__button"
                      href="https://calendly.com/brent-amiamis/30min"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>Agenda Brent</span>
                      <Icon name="calendar" />
                    </a>
                  </div>
                </div>

                <div
                  aria-label="Contactformulier"
                  className="contact-overview__form-focus"
                  ref={contactFormFocusRef}
                  tabIndex={-1}
                >
                  <ContactForm intent={serviceIntent} />
                </div>

                <figure className="contact-intro__photo contact-editorial__photo contact-overview__photo">
                  <img
                    className="contact-overview__photo-image contact-overview__photo-image--default"
                    src={assetPath("/assets/contact-phones-portrait.jpg")}
                    alt="Ami Amis-contactpersoon met een koffiemok"
                    width="2000"
                    height="1333"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <img
                    alt=""
                    aria-hidden="true"
                    className="contact-overview__photo-image contact-overview__photo-image--hover"
                    decoding="async"
                    src={assetPath("/assets/contact-phones-answer.jpg")}
                    width="2000"
                    height="1333"
                  />
                </figure>

                <section className="contact-overview__card contact-overview__contact" aria-labelledby="contact-details-title">
                  <h2 id="contact-details-title">Contact</h2>
                  <ContactInfoList />
                  <dl className="contact-overview__practical">
                    {practicalItems.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <div className="contact-overview__secondary">
                  <section className="contact-overview__card contact-overview__social" aria-labelledby="contact-social-title">
                    <h2 id="contact-social-title">Volg ons</h2>
                    <div className="contact-overview__socials">
                      {socialLinks.map((link) => (
                        <a
                          aria-label={link.label}
                          className="contact-overview__social-link"
                          href={link.href}
                          key={link.label}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <BrandIcon name={link.icon} />
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </section>

                  <section className="contact-overview__card contact-overview__locations" aria-labelledby="contact-locations-title">
                    <h2 id="contact-locations-title">Locaties</h2>
                    <div className="contact-overview__location-list">
                      {locations.map((location) => (
                        <p key={location}>
                          <Icon name="location" />
                          <span>{location}</span>
                        </p>
                      ))}
                    </div>
                    <div className="contact-overview__legal" aria-label="Juridische informatie">
                      <div className="contact-overview__legal-links">
                        {legalLinks.map((link) => (
                          <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                            {link.label}
                          </a>
                        ))}
                      </div>
                      <p>&copy; 2026 Ami Amis</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="contact" />
    </>
  );
}
