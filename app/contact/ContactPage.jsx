"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const mail = "brent@amiamis.be";
const mailHref = `mailto:${mail}?subject=Contact%20via%20Ami%20Amis`;

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
  {
    label: "Adres",
    value: "IJzerenpoortkaai 3, 2000 Antwerpen",
    href: "https://www.google.com/maps/search/?api=1&query=IJzerenpoortkaai+3+2000+Antwerpen",
    icon: "location",
  },
];

function ContactIcon({ type }) {
  if (type === "phone") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6.3 2.2c.7-.3 1.5-.1 2 .5l2.1 3c.5.7.4 1.6-.2 2.2l-1.1 1c.8 1.7 1.9 3.1 3.2 4.4 1.3 1.3 2.8 2.4 4.5 3.1l1-1.1c.6-.6 1.5-.7 2.2-.2l3 2.1c.6.4.8 1.2.5 1.9l-.8 2c-.3.8-1.1 1.3-2 1.2-4.8-.5-9.2-2.7-12.7-6.2C4.5 12.6 2.3 8.2 1.8 3.4c-.1-.9.4-1.7 1.2-2l2.3-.9Z" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 1.8A7.2 7.2 0 0 0 4.8 9c0 5.4 7.2 12.4 7.2 12.4S19.2 14.4 19.2 9A7.2 7.2 0 0 0 12 1.8Zm0 9.7A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3.5 5h17A2.5 2.5 0 0 1 23 7.5v9A2.5 2.5 0 0 1 20.5 19h-17A2.5 2.5 0 0 1 1 16.5v-9A2.5 2.5 0 0 1 3.5 5Zm.2 3 8.3 5.4L20.3 8v-.3H3.7V8Zm16.6 2.4-7.5 4.9a1.5 1.5 0 0 1-1.6 0l-7.5-4.9v6.1h16.6v-6.1Z" />
    </svg>
  );
}

function ContactInfoList() {
  return (
    <ul className="contact-info-list" aria-label="Contactgegevens">
      {contactItems.map((item) => (
        <li className="contact-info-item" key={item.label}>
          <span className="contact-info-item__icon">
            <ContactIcon type={item.icon} />
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

function ContactForm() {
  return (
    <form className="contact-minimal__form contact-form-card" action={mailHref} method="post" encType="text/plain">
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
      <button className="contact-minimal__submit button button--red" type="submit">
        Verstuur
      </button>
    </form>
  );
}

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`site-shell contact-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="contact-page" id="contact-main">
          <section className="contact-minimal contact-redesign" aria-labelledby="contact-title">
            <a className="hero__logo contact-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />

            <div className="contact-minimal__inner">
              <div className="contact-minimal__content">
                <div className="contact-minimal__composition contact-intro">
                  <p className="contact-intro__label">Contact</p>
                  <h1 className="contact-intro__title" id="contact-title">
                    Durf jij een samenwerking aan te gaan?
                  </h1>
                  <ContactInfoList />
                </div>

                <ContactForm />
              </div>
            </div>
          </section>
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="contact" />
    </>
  );
}
