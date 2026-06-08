"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const pillarKeys = [
  { key: "vraag", fallback: "problem", label: "Vraag" },
  { key: "aanpak", fallback: "approach", label: "Aanpak" },
  { key: "resultaat", fallback: "result", label: "Resultaat" },
];

function internalHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href || "#";
  }

  if (href.startsWith("http")) {
    return href;
  }

  return assetPath(href);
}

function normalizeMediaItem(item, fallbackAlt = "Projectbeeld") {
  if (!item) {
    return null;
  }

  if (typeof item === "string") {
    return {
      src: item,
      alt: fallbackAlt,
    };
  }

  return item;
}

function getPillar(data, item) {
  return data[item.key] || data[item.fallback] || null;
}

function ProjectMedia({ mediaType, hero, client, priority = false }) {
  const poster = hero?.poster || hero?.image || "";
  const video = hero?.video || hero?.heroVideo || "";
  const image = hero?.image || hero?.poster || "";
  const showVideo = mediaType === "video" || mediaType === "animation";

  if (showVideo && video) {
    return (
      <video
        aria-label={`${client} projectvideo`}
        autoPlay={mediaType === "animation"}
        controls={mediaType === "video"}
        loop={mediaType === "animation"}
        muted={mediaType === "animation"}
        playsInline
        poster={poster ? assetPath(poster) : undefined}
        preload="metadata"
      >
        <source src={assetPath(video)} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={assetPath(image || poster)}
      alt={`${client} projectvisual`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function ProjectHero({ data }) {
  const hero = data.hero || {
    video: data.media?.heroVideo,
    poster: data.media?.poster,
    image: data.media?.poster,
  };

  return (
    <section className="project-case-hero" aria-labelledby="project-case-title">
      <a className="hero__logo project-case-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />
      <div className="project-case-hero__inner">
        <div className="project-case-hero__copy project-case-reveal">
          <p className="project-case-label">Ons werk / {data.category}</p>
          <h1 id="project-case-title">{data.title}</h1>
          {data.subtitle ? <p className="project-case-hero__subtitle">{data.subtitle}</p> : null}
          <p className="project-case-hero__intro">{data.intro || data.heroIntro}</p>
          <div className="project-case-hero__actions">
            <a className="button button--red" href="#project-vraag">
              Bekijk de case
            </a>
            <a className="project-case-link" href="#project-snapshot">
              Project snapshot
            </a>
          </div>
        </div>

        <figure className={`project-case-hero__media project-case-media project-case-media--${data.mediaType || "mixed"} project-case-reveal`}>
          <ProjectMedia client={data.client} hero={hero} mediaType={data.mediaType || "mixed"} priority />
        </figure>
      </div>
    </section>
  );
}

function ProjectOverview({ data }) {
  const overview = [
    ["Klant", data.client],
    ["Type", data.category],
    ["Jaar", data.year],
    ["Deliverables", data.deliverables?.join(", ") || data.services?.join(", ")],
    ["Kanaal", data.channels?.join(", ") || "Social media"],
  ].filter(([, value]) => Boolean(value));

  return (
    <section className="project-snapshot project-case-reveal" id="project-snapshot" aria-label="Project snapshot">
      <div className="project-snapshot__summary">
        <p className="project-case-label">Case at a glance</p>
        <h2>{data.summary || data.heroIntro}</h2>
      </div>
      <dl className="project-snapshot__facts">
        {overview.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ProjectStickyNav({ data }) {
  const items = pillarKeys.filter((item) => getPillar(data, item));

  if (!items.length) {
    return null;
  }

  return (
    <nav className="project-case-nav" aria-label="Case pijlers">
      {items.map((item) => (
        <a href={`#project-${item.key}`} key={item.key}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function ProjectStats({ stats }) {
  if (!stats?.length) {
    return null;
  }

  return (
    <div className="project-stats" aria-label="Project resultaten">
      {stats.map((stat) => (
        <article className="project-stat" key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </div>
  );
}

function ProjectSection({ block, item, index }) {
  if (!block) {
    return null;
  }

  const media = normalizeMediaItem(block.media, `${item.label} beeld`);

  return (
    <section
      className={`project-pillar project-pillar--${item.key} project-case-reveal`}
      id={`project-${item.key}`}
      aria-labelledby={`project-${item.key}-title`}
    >
      <div className="project-pillar__index">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <p>{item.label}</p>
      </div>

      <div className="project-pillar__content">
        <h2 id={`project-${item.key}-title`}>{block.title}</h2>
        <p>{block.text}</p>
        {block.bullets?.length ? (
          <ul>
            {block.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
        {block.deliverables?.length ? (
          <div className="project-deliverables" aria-label="Deliverables">
            {block.deliverables.map((deliverable) => (
              <span key={deliverable}>{deliverable}</span>
            ))}
          </div>
        ) : null}
        {block.stats ? <ProjectStats stats={block.stats} /> : null}
      </div>

      {media ? (
        <figure className="project-pillar__media project-case-media">
          <img src={assetPath(media.src)} alt={media.alt || `${item.label} projectbeeld`} loading="lazy" decoding="async" />
        </figure>
      ) : null}
    </section>
  );
}

function ProjectGallery({ data }) {
  const gallery = (data.gallery || data.media?.stills || [])
    .map((item) => normalizeMediaItem(item, `${data.client} projectbeeld`))
    .filter(Boolean);

  if (!gallery.length) {
    return null;
  }

  return (
    <section className="project-gallery project-case-reveal" aria-labelledby="project-gallery-title">
      <div className="project-gallery__header">
        <p className="project-case-label">Media / Deliverables</p>
        <h2 id="project-gallery-title">Nog een paar beelden uit het dossier.</h2>
      </div>
      <div className="project-gallery__grid">
        {gallery.map((item, index) => (
          <figure className="project-gallery__item" key={`${item.src}-${index}`}>
            <img src={assetPath(item.src)} alt={item.alt || `${data.client} gallery beeld`} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function ProjectCTA({ data }) {
  return (
    <section className="project-case-cta project-case-reveal" aria-label="Project afsluiting">
      <div className="project-case-cta__copy">
        <p className="project-case-label">Ook zo'n project maken?</p>
        <h2>Heb je een verhaal dat sterker in beeld mag komen?</h2>
        <p>Dan denken we graag mee. Video, foto, design, animatie of iets daartussen: we maken er samen iets strafbaar goed van.</p>
      </div>
      <a className="button button--red" href={assetPath("/contact/")}>
        Plan een quick call →
      </a>

      {(data.previousCase || data.nextCase) ? (
        <nav className="project-case-next" aria-label="Andere projecten">
          {data.previousCase ? (
            <a href={internalHref(data.previousCase.href)}>
              <span>Vorige</span>
              {data.previousCase.title}
            </a>
          ) : null}
          {data.nextCase ? (
            <a href={internalHref(data.nextCase.href)}>
              <span>Volgende</span>
              {data.nextCase.title}
            </a>
          ) : null}
        </nav>
      ) : null}
    </section>
  );
}

export default function CasePageTemplate({ caseData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pillarItems = useMemo(
    () => pillarKeys.map((item) => ({ ...item, block: getPillar(caseData, item) })).filter((item) => item.block),
    [caseData]
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll(".project-case-reveal"));

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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`site-shell project-case-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="project-case-page">
          <ProjectHero data={caseData} />
          <ProjectOverview data={caseData} />
          <ProjectStickyNav data={caseData} />

          <div className="project-pillars" aria-label="Projectverhaal">
            {pillarItems.map((item, index) => (
              <ProjectSection block={item.block} index={index} item={item} key={item.key} />
            ))}
          </div>

          <ProjectGallery data={caseData} />
          <ProjectCTA data={caseData} />
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
