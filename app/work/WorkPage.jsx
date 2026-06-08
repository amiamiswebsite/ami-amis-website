"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";
import { workCases } from "../../src/data/workCases";

function WorkHero() {
  return (
    <section className="work-page__hero" aria-labelledby="work-page-title">
      <h1 id="work-page-title">Ons werk</h1>
      <a className="button button--red work-page__hero-button" href={assetPath("/contact/")}>
        Samenwerken?
      </a>
    </section>
  );
}

function WorkCard({ item, index }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      className="work-card"
      href={assetPath(item.href)}
      style={{ "--work-card-delay": `${Math.min(index, 8) * 46}ms` }}
      aria-label={`Bekijk case ${item.client}`}
    >
      <figure className={`work-card__media ${imageFailed ? "is-fallback" : ""}`}>
        {!imageFailed ? (
          <img
            src={assetPath(item.image)}
            alt={`${item.client} projectbeeld`}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="work-card__fallback" aria-hidden="true">
            {item.client}
          </span>
        )}
      </figure>

      <div className="work-card__body">
        <h2>{item.client}</h2>
      </div>
    </a>
  );
}

function WorkGrid({ cases }) {
  if (!cases.length) {
    return (
      <div className="work-empty" role="status">
        Geen cases gevonden binnen deze filter. Probeer een andere categorie.
      </div>
    );
  }

  return (
    <section className="work-grid" aria-label="Cases">
      {cases.map((item, index) => (
        <WorkCard index={index} item={item} key={item.slug} />
      ))}
    </section>
  );
}

export default function WorkPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="work-page">
          <a className="hero__logo work-page__logo" href={assetPath("/")} aria-label="Ami Amis home" />
          <WorkHero />
          <WorkGrid cases={workCases} />
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
