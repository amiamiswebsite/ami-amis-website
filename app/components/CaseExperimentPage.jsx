"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

function resolveMediaItem(item, fallbackAlt = "Casebeeld") {
  if (!item) {
    return null;
  }

  if (typeof item === "string") {
    return {
      src: item,
      alt: fallbackAlt,
    };
  }

  return {
    src: item.src,
    alt: item.alt || fallbackAlt,
  };
}

function normalizeCaseData(data) {
  const stills = (data.media?.stills || []).map((item, index) =>
    resolveMediaItem(item, `${data.client} casebeeld ${index + 1}`)
  );

  const phases = [
    { ...data.problem, number: "01", label: "Vraag", media: stills[0]?.src },
    { ...data.approach, number: "02", label: "Aanpak", media: stills[1]?.src },
    { ...data.result, number: "03", label: "Resultaat", media: stills[2]?.src },
  ];

  return {
    ...data,
    facts: [
      { label: "Klant", value: data.client },
      { label: "Type", value: data.category },
      { label: "Jaar", value: data.year },
      { label: "Services", value: data.services.join(", ") },
    ],
    phases,
    stats: data.result?.stats || [],
    stills,
    heroMedia: {
      video: data.media?.heroVideo || "",
      poster: data.media?.poster || stills[0]?.src,
    },
  };
}

function ExperimentDivider({ number, title }) {
  return (
    <>
      <hr className="experiment-separator" />
      <div className="experiment-label experiment-reveal">
        <span>{number}</span>
        <strong>{title}</strong>
      </div>
    </>
  );
}

function CaseMediaFrame({ src, alt, video, poster, className = "", eager = false }) {
  return (
    <figure className={`case-exp-media ${className}`}>
      <span className="case-exp-media__tape" aria-hidden="true" />
      {video ? (
        <video
          controls
          playsInline
          poster={poster ? assetPath(poster) : undefined}
          preload="metadata"
          aria-label={alt}
        >
          <source src={assetPath(video)} type="video/mp4" />
        </video>
      ) : (
        <img
          src={assetPath(src || poster)}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </figure>
  );
}

function CaseHeroCompact({ data, variant = "default" }) {
  const hasVideo = Boolean(data.heroMedia.video);

  return (
    <header className={`case-exp-hero case-exp-hero--${variant} experiment-reveal`}>
      <div className="case-exp-hero__copy">
        <p className="case-exp-kicker">Case dossier / {data.category}</p>
        <h1>{data.title}</h1>
        <p className="case-exp-subtitle">{data.subtitle}</p>
        <p className="case-exp-intro">{data.heroIntro}</p>
      </div>
      <CaseMediaFrame
        video={hasVideo ? data.heroMedia.video : ""}
        poster={data.heroMedia.poster}
        src={data.heroMedia.poster}
        alt={`${data.client} case hero`}
        className="case-exp-hero__media"
        eager
      />
    </header>
  );
}

function CaseFacts({ facts, compact = false }) {
  return (
    <dl className={`case-exp-facts${compact ? " case-exp-facts--compact" : ""}`}>
      {facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseStats({ stats, className = "" }) {
  return (
    <div className={`case-exp-stats ${className}`} aria-label="Case resultaten in cijfers">
      {stats.map((stat) => (
        <article key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </div>
  );
}

function PhaseList({ phase }) {
  return (
    <ul>
      {phase.bullets.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  );
}

function CasePhaseCard({ phase, mode = "default", media = true }) {
  return (
    <article className={`case-exp-phase case-exp-phase--${mode} experiment-reveal`}>
      <div className="case-exp-phase__number">{phase.number}</div>
      <div className="case-exp-phase__body">
        <p>{phase.label}</p>
        <h3>{phase.title}</h3>
        <p className="case-exp-phase__text">{phase.text}</p>
        <PhaseList phase={phase} />
      </div>
      {media && phase.media ? (
        <CaseMediaFrame
          src={phase.media}
          alt={`${phase.label} voor Visit Antwerpen`}
          className="case-exp-phase__media"
        />
      ) : null}
    </article>
  );
}

function DesignStickyDashboard({ data }) {
  return (
    <section className="case-experiment case-experiment--01">
      <ExperimentDivider number="ONTWERP 1" title="Sticky Case Dashboard" />
      <CaseHeroCompact data={data} variant="dashboard" />
      <CaseFacts facts={data.facts} />

      <div className="case-exp-dashboard">
        <div className="case-exp-dashboard__media experiment-reveal">
          <CaseMediaFrame
            src={data.phases[0].media || data.heroMedia.poster}
            alt={`${data.client} sticky media`}
            className="case-exp-dashboard__sticky-media"
          />
          <nav className="case-exp-progress" aria-label="Case fases">
            {data.phases.map((phase) => (
              <a href={`#dashboard-${phase.number}`} key={phase.number}>
                <span>{phase.number}</span>
                {phase.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="case-exp-dashboard__content">
          {data.phases.map((phase) => (
            <article className="case-exp-dashboard-block experiment-reveal" id={`dashboard-${phase.number}`} key={phase.number}>
              <span>{phase.number} / {phase.label}</span>
              <h2>{phase.title}</h2>
              <p>{phase.text}</p>
              <PhaseList phase={phase} />
              {phase.number === "03" ? <CaseStats stats={data.stats} /> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignCaseMap({ data }) {
  return (
    <section className="case-experiment case-experiment--02">
      <ExperimentDivider number="ONTWERP 2" title="Case Map Overview" />
      <CaseHeroCompact data={data} variant="map" />
      <div className="case-exp-map experiment-reveal">
        {data.phases.map((phase) => (
          <article className="case-exp-map-card" key={phase.number}>
            <div className="case-exp-map-card__head">
              <span>{phase.number}</span>
              <p>{phase.label}</p>
            </div>
            <h2>{phase.title}</h2>
            <ul>
              {phase.bullets.slice(0, 2).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {phase.media ? (
              <img src={assetPath(phase.media)} alt={`${phase.label} thumbnail`} loading="lazy" decoding="async" />
            ) : null}
          </article>
        ))}
      </div>
      <CaseStats stats={data.stats} className="case-exp-map-stats experiment-reveal" />
    </section>
  );
}

function DesignHorizontalFlow({ data }) {
  const panels = [
    {
      key: "intro",
      number: "00",
      label: "Intro",
      title: data.subtitle,
      text: data.heroIntro,
      media: data.heroMedia.poster,
    },
    ...data.phases,
  ];

  return (
    <section className="case-experiment case-experiment--03">
      <ExperimentDivider number="ONTWERP 3" title="Horizontal Case Flow" />
      <div className="case-exp-flow-header experiment-reveal">
        <div>
          <p className="case-exp-kicker">{data.client} / {data.year}</p>
          <h2>Scroll / swipe door de case →</h2>
        </div>
        <CaseFacts facts={data.facts} compact />
      </div>
      <div className="case-exp-flow" aria-label="Horizontale caseflow">
        {panels.map((panel) => (
          <article className="case-exp-flow-panel" key={`${panel.number}-${panel.label}`}>
            <span>{panel.number}</span>
            <p>{panel.label}</p>
            <h3>{panel.title}</h3>
            <p className="case-exp-flow-panel__text">{panel.text}</p>
            {panel.bullets ? <PhaseList phase={panel} /> : null}
            {panel.media ? (
              <CaseMediaFrame src={panel.media} alt={`${panel.label} case paneel`} />
            ) : null}
          </article>
        ))}
        <article className="case-exp-flow-panel case-exp-flow-panel--stats">
          <span>04</span>
          <p>Impact</p>
          <h3>Wat bleef hangen.</h3>
          <CaseStats stats={data.stats} />
        </article>
      </div>
    </section>
  );
}

function DesignOneScreenSummary({ data }) {
  return (
    <section className="case-experiment case-experiment--04">
      <ExperimentDivider number="ONTWERP 4" title="One-screen Case Summary" />
      <div className="case-exp-summary experiment-reveal">
        <div className="case-exp-summary__copy">
          <p className="case-exp-kicker">Executive dossier / {data.category}</p>
          <h2>{data.title}</h2>
          <p className="case-exp-subtitle">{data.subtitle}</p>
          <p>{data.heroIntro}</p>
          <CaseFacts facts={data.facts} compact />
          <div className="case-exp-summary__actions">
            <a className="button button--red" href="#case-experiment-gallery">
              Bekijk video
            </a>
            <a className="case-exp-link" href={assetPath("/contact/")}>
              Plan een quick call
            </a>
          </div>
        </div>
        <CaseMediaFrame
          src={data.heroMedia.poster}
          alt={`${data.client} executive summary beeld`}
          className="case-exp-summary__media"
        />
        <div className="case-exp-summary__blocks">
          {data.phases.map((phase) => (
            <article key={phase.number}>
              <span>{phase.number} / {phase.label}</span>
              <h3>{phase.title}</h3>
              <p>{phase.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignScrollytellingTimeline({ data }) {
  return (
    <section className="case-experiment case-experiment--05">
      <ExperimentDivider number="ONTWERP 5" title="Scrollytelling Timeline" />
      <div className="case-exp-timeline-wrap">
        <aside className="case-exp-timeline experiment-reveal" aria-label="Case timeline">
          <p className="case-exp-kicker">{data.client}</p>
          {data.phases.map((phase, index) => (
            <a href={`#timeline-${phase.number}`} className={index === 0 ? "is-active" : ""} key={phase.number}>
              <span>{phase.number}</span>
              {phase.label}
            </a>
          ))}
        </aside>
        <div className="case-exp-timeline-content">
          {data.phases.map((phase, index) => (
            <article className="case-exp-timeline-card experiment-reveal" id={`timeline-${phase.number}`} key={phase.number}>
              <div>
                <span>{phase.number} / {phase.label}</span>
                <h2>{phase.title}</h2>
                <p>{phase.text}</p>
                <PhaseList phase={phase} />
                {phase.number === "03" ? <CaseStats stats={data.stats} /> : null}
              </div>
              {phase.media ? (
                <CaseMediaFrame
                  src={phase.media}
                  alt={`${phase.label} timeline beeld`}
                  className={`case-exp-timeline-card__media case-exp-timeline-card__media--${index + 1}`}
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperimentGallery({ data }) {
  return (
    <section className="case-exp-gallery" id="case-experiment-gallery" aria-labelledby="case-experiment-gallery-title">
      <div className="case-exp-gallery__head experiment-reveal">
        <p className="case-exp-kicker">Media</p>
        <h2 id="case-experiment-gallery-title">Beelden die later vervangbaar blijven.</h2>
      </div>
      <div className="case-exp-gallery__grid">
        {data.stills.map((still, index) => (
          <CaseMediaFrame
            key={`${still.src}-${index}`}
            src={still.src}
            alt={still.alt}
            className="experiment-reveal"
          />
        ))}
      </div>
    </section>
  );
}

export default function CaseExperimentPage({ caseData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useMemo(() => normalizeCaseData(caseData), [caseData]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll(".experiment-reveal"));

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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`site-shell case-experiment-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="case-experiments-page">
          <a className="hero__logo case-experiment-logo" href={assetPath("/")} aria-label="Ami Amis home" />

          <section className="case-experiments-intro">
            <p>Case layout experiments</p>
            <h1>Vijf manieren om Vraag, Aanpak en Resultaat high-end te tonen.</h1>
            <span>Visit Antwerpen / vergelijkingspagina</span>
          </section>

          <DesignStickyDashboard data={data} />
          <DesignCaseMap data={data} />
          <DesignHorizontalFlow data={data} />
          <DesignOneScreenSummary data={data} />
          <DesignScrollytellingTimeline data={data} />
          <ExperimentGallery data={data} />

          {/* Dev-note:
              Ontwerp 1 is aanbevolen als meest premium storytelling.
              Ontwerp 2 is aanbevolen als meest overzichtelijk.
              Ontwerp 4 is aanbevolen als meest business-friendly.
              Ontwerp 3 is meest experimenteel.
              Ontwerp 5 is veiligste modernisering van klassieke casepagina.
          */}
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
