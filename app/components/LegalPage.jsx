"use client";

import { useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

export default function LegalPage({ eyebrow, title, intro, sections, updatedAt }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`site-shell legal-shell ${menuOpen ? "menu-open" : ""}`}>
        <header className="legal-hero">
          <a className="hero__logo legal-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />
          <div className="legal-hero__inner">
            <p>{eyebrow}</p>
            <h1>{title}</h1>
            {intro ? <div className="legal-hero__intro">{intro}</div> : null}
          </div>
        </header>

        <main className="legal-page" id="legal-main">
          <div className="legal-page__inner">
            {sections.map((section, sectionIndex) => (
              <section className="legal-section" key={`${section.title}-${sectionIndex}`}>
                <h2>{section.title}</h2>
                <div className="legal-section__copy">
                  {(section.paragraphs || []).map((paragraph, paragraphIndex) => (
                    <p key={`${paragraph.slice(0, 36)}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                  {section.items?.length ? (
                    <ul>
                      {section.items.map((item, itemIndex) => (
                        <li key={`${item.slice(0, 36)}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
            {updatedAt ? <p className="legal-page__updated">Laatste update: {updatedAt}</p> : null}
          </div>
        </main>

        <Footer />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
