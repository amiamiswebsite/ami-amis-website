"use client";

import { useEffect, useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

function internalHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href || "#";
  }

  if (href.startsWith("http")) {
    return href;
  }

  return assetPath(href);
}

function resolveMediaItem(item) {
  if (!item) {
    return null;
  }

  if (typeof item === "string") {
    return {
      src: item,
      alt: "Casebeeld",
    };
  }

  return item;
}

function CaseHero({ data }) {
  const poster = assetPath(data.media.poster);
  const hasVideo = Boolean(data.media.heroVideo);

  return (
    <section className="case-hero" aria-labelledby="case-title">
      <a className="hero__logo case-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />
      <div className="case-hero__inner">
        <div className="case-hero__copy case-reveal">
          <p className="case-eyebrow">Case</p>
          <h1 id="case-title">{data.title}</h1>
          <p className="case-hero__title">{data.subtitle}</p>
          <p className="case-hero__intro">{data.heroIntro}</p>
          <div className="case-hero__actions" aria-label="Case acties">
            <a className="button button--red" href="#case-core">
              Bekijk aanpak
            </a>
            <a className="case-text-link" href="#case-gallery">
              Bekijk beelden
            </a>
          </div>
        </div>

        <figure className="case-hero__media case-paper-media case-reveal">
          <span className="case-tape" aria-hidden="true" />
          {hasVideo ? (
            <video
              aria-label={`${data.client} case video`}
              controls
              playsInline
              poster={poster}
              preload="metadata"
            >
              <source src={assetPath(data.media.heroVideo)} type="video/mp4" />
            </video>
          ) : (
            <img src={poster} alt={`${data.client} case poster`} loading="eager" decoding="async" />
          )}
        </figure>
      </div>
    </section>
  );
}

function CaseFactsBar({ data }) {
  const facts = [
    ["Klant", data.client],
    ["Type", data.category],
    ["Jaar", data.year],
    ["Services", data.services.join(", ")],
  ];

  return (
    <section className="case-facts" aria-label="Case details">
      <dl className="case-facts__grid">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function CaseStats({ stats }) {
  if (!stats?.length) {
    return null;
  }

  return (
    <div className="case-stats" aria-label="Case resultaten in cijfers">
      {stats.map((stat) => (
        <article className="case-stat" key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </div>
  );
}

function CaseContentBlock({ block, variant }) {
  return (
    <section className={`case-content-block case-content-block--${variant} case-reveal`}>
      <div className="case-content-block__label">
        <p>{block.eyebrow}</p>
      </div>
      <div className="case-content-block__body">
        <h2>{block.title}</h2>
        <p>{block.text}</p>
        {block.bullets?.length ? (
          <ul>
            {block.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {block.stats ? <CaseStats stats={block.stats} /> : null}
      </div>
    </section>
  );
}

function CaseMediaGallery({ data }) {
  const stills = data.media.stills.map(resolveMediaItem).filter(Boolean);

  if (!stills.length) {
    return null;
  }

  return (
    <section className="case-gallery case-section-pad" id="case-gallery" aria-labelledby="case-gallery-title">
      <div className="case-gallery__header case-reveal">
        <p className="case-section-label">Beelden</p>
        <h2 id="case-gallery-title">Een snelle blik op de case.</h2>
      </div>
      <div className="case-gallery__grid">
        {stills.map((item, index) => (
          <figure
            className="case-gallery-card case-reveal"
            key={`${item.src}-${index}`}
            style={{ "--case-card-rotate": `${index % 2 ? 0.8 : -0.9}deg` }}
          >
            <img src={assetPath(item.src)} alt={item.alt} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function CaseCTA({ data }) {
  return (
    <section className="case-next case-section-pad" aria-label="Case navigatie">
      <div className="case-next__cta case-reveal">
        <div>
          <p className="case-section-label">Ook zo'n case maken?</p>
          <h2>Heb je een verhaal dat sterker in beeld mag komen?</h2>
          <p>Dan denken we graag mee.</p>
        </div>
        <a className="button button--red" href={assetPath("/contact/")}>
          Plan een quick call →
        </a>
      </div>

      <nav className="case-next__nav case-reveal" aria-label="Vorige en volgende case">
        <a href={internalHref(data.previousCase.href)}>
          <span>Vorige case</span>
          {data.previousCase.title}
        </a>
        <a href={internalHref(data.nextCase.href)}>
          <span>Volgende case</span>
          {data.nextCase.title}
        </a>
      </nav>
    </section>
  );
}

export default function CasePageTemplate({ caseData }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll(".case-reveal"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={`site-shell case-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="case-page">
          <CaseHero data={caseData} />
          <CaseFactsBar data={caseData} />
          <section className="case-core case-section-pad" id="case-core" aria-label="Case aanpak">
            <CaseContentBlock block={caseData.problem} variant="problem" />
            <CaseContentBlock block={caseData.approach} variant="approach" />
            <CaseContentBlock block={caseData.result} variant="result" />
          </section>
          <CaseMediaGallery data={caseData} />
          <CaseCTA data={caseData} />
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
