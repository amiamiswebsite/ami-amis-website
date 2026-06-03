"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const mail = "brent@amiamis.be";
const mailHref = `mailto:${mail}?subject=Contact%20via%20Ami%20Amis`;

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`site-shell contact-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="contact-page" id="contact-main">
          <section className="contact-minimal" aria-labelledby="contact-title">
            <a className="hero__logo contact-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />

            <div className="contact-minimal__inner">
              <div className="contact-minimal__content">
                <div className="contact-minimal__composition">
                  <h1 className="contact-title" id="contact-title" aria-label="Durf jij een samenwerking aan te gaan?">
                    <span className="contact-title__row contact-title__row--intro" aria-hidden="true">
                      <span className="contact-title__script">Durf</span>
                      <span>jij</span>
                    </span>
                    <span className="contact-title__row contact-title__row--wide" aria-hidden="true">
                      een samenwerking
                    </span>
                    <span className="contact-title__row" aria-hidden="true">
                      aan te gaan?
                    </span>
                  </h1>
                  <a className="contact-mail" href={mailHref}>
                    {mail}
                  </a>
                </div>

                <form className="contact-minimal__form" action={mailHref} method="post" encType="text/plain">
                  <label>
                    Naam
                    <input name="naam" autoComplete="name" required />
                  </label>
                  <label>
                    E-mail
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                  <label>
                    Telefoon
                    <input name="telefoon" type="tel" autoComplete="tel" />
                  </label>
                  <label>
                    Bericht
                    <textarea name="bericht" rows={5} required />
                  </label>
                  <button className="contact-minimal__submit button button--red" type="submit">
                    Verstuur
                  </button>
                </form>
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
