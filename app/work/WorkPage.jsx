"use client";

import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";
import { workCases } from "../../src/data/workCases";

const workFilters = [
  "Alles",
  "Video & campagnes",
  "Social content",
  "Fotografie",
  "Design & branding",
  "Animatie & montage",
  "Audio engineering",
  "Webdesign & optimalisatie",
  "Marketingstrategie",
];

function WorkFilters({ activeFilter, count, onFilterChange }) {
  return (
    <section className="work-filters" aria-label="Filter cases">
      <div className="work-filters__topline" aria-live="polite">
        {count} {count === 1 ? "case" : "cases"}
      </div>
      <div className="work-filters__rail" role="list">
        {workFilters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              aria-pressed={isActive}
              className={`work-filter ${isActive ? "is-active" : ""}`}
              key={filter}
              onClick={() => onFilterChange(filter)}
              type="button"
            >
              {filter}
            </button>
          );
        })}
      </div>
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
  const [activeFilter, setActiveFilter] = useState("Alles");
  const filteredCases = useMemo(() => {
    if (activeFilter === "Alles") {
      return workCases;
    }

    return workCases.filter((item) => item.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="work-page">
          <a className="hero__logo work-page__logo" href={assetPath("/")} aria-label="Ami Amis home" />
          <h1 className="sr-only">Ons werk</h1>
          <WorkFilters activeFilter={activeFilter} count={filteredCases.length} onFilterChange={setActiveFilter} />
          <WorkGrid cases={filteredCases} />
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
