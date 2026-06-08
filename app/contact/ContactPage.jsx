"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const mail = "brent@amiamis.be";
const mailHref = `mailto:${mail}?subject=Contact%20via%20Ami%20Amis`;

export default function ContactPage() {
  const contactRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const section = contactRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const pointer = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      active: false,
    };
    let frame = 0;

    const updatePointer = () => {
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.12;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.12;

      section.style.setProperty("--mouse-x", pointer.currentX.toFixed(4));
      section.style.setProperty("--mouse-y", pointer.currentY.toFixed(4));
      section.style.setProperty("--contact-type-front-x", `${pointer.currentX * 10}px`);
      section.style.setProperty("--contact-type-front-y", `${pointer.currentY * 7}px`);
      section.style.setProperty("--contact-type-script-x", `${pointer.currentX * 15}px`);
      section.style.setProperty("--contact-type-script-y", `${pointer.currentY * 10}px`);
      section.style.setProperty("--contact-type-rot-x", `${pointer.currentY * -1.6}deg`);
      section.style.setProperty("--contact-type-rot-y", `${pointer.currentX * 2}deg`);

      if (
        Math.abs(pointer.targetX - pointer.currentX) > 0.001 ||
        Math.abs(pointer.targetY - pointer.currentY) > 0.001
      ) {
        frame = window.requestAnimationFrame(updatePointer);
      } else {
        frame = 0;
      }
    };

    const schedulePointer = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updatePointer);
      }
    };

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pointer.active = true;
      schedulePointer();
    };

    const handlePointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.active = false;
      schedulePointer();
    };

    section.addEventListener("pointermove", handlePointerMove, { passive: true });
    section.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <>
      <div className={`site-shell contact-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="contact-page" id="contact-main">
          <section className="contact-minimal" aria-labelledby="contact-title" ref={contactRef}>
            <a className="hero__logo contact-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />

            <div className="contact-minimal__inner">
              <div className="contact-minimal__content">
                <div className="contact-minimal__composition">
                  <h1 className="contact-title" id="contact-title" aria-label="Durf jij een samenwerking aan te gaan?">
                    <span className="contact-title__row contact-title__word" data-text="DURF JIJ" aria-hidden="true">
                      DURF JIJ
                    </span>
                    <span className="contact-title__row contact-title__word" data-text="EEN SAMENWERKING" aria-hidden="true">
                      EEN SAMENWERKING
                    </span>
                    <span className="contact-title__row contact-title__word" data-text="AAN TE GAAN?" aria-hidden="true">
                      AAN TE GAAN?
                    </span>
                  </h1>
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
