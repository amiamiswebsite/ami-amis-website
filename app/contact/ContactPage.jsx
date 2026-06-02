"use client";

import { useState } from "react";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const mail = "brent@amiamis.be";
const phone = "+32 472 65 75 95";
const mailHref = `mailto:${mail}?subject=Koffiedate%20met%20Ami%20Amis`;
const phoneHref = "tel:+32472657595";

const contactDetails = [
  { label: "Kantoor", value: "Meir 78 - Stadsfeestzaal, 2000 Antwerpen" },
  { label: "Hoofdzetel", value: "IJzerenpoortkaai 3, 2000 Antwerpen" },
  { label: "BTW", value: "BE0786.290.512" },
];

const legalLinks = [
  { label: "Algemene voorwaarden", href: "https://www.amiamis.com/algemene-voorwaarden" },
  { label: "Privacy policy", href: "https://www.amiamis.com/privacy-policy" },
];

function ExternalLink({ href, children, className = "" }) {
  const isExternal = href.startsWith("http");

  return (
    <a
      className={className}
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="contact-page" id="contact-main">
          <section className="contact-minimal" aria-labelledby="contact-title">
            <a className="hero__logo contact-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />

            <div className="contact-minimal__inner">
              <div className="contact-minimal__composition">
                <p className="contact-kicker">Contact</p>
                <h1 id="contact-title">
                  Laten we samen <span>iets cool</span> maken
                </h1>
                <div className="contact-minimal__reach" aria-label="Direct contact">
                  <a className="contact-pill" href={mailHref}>
                    Plan een koffiedate
                  </a>
                  <span className="contact-reach-note" aria-hidden="true">
                    Reach out
                  </span>
                </div>
                <a className="contact-mail" href={mailHref}>
                  {mail}
                </a>
              </div>

              <div className="contact-minimal__bottom" aria-label="Contactgegevens">
                <a className="contact-phone" href={phoneHref}>
                  {phone}
                </a>
                <dl className="contact-list">
                  {contactDetails.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="contact-legal">
                  {legalLinks.map((link) => (
                    <ExternalLink href={link.href} key={link.label}>
                      {link.label}
                    </ExternalLink>
                  ))}
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
