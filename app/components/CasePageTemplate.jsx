"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const pillarKeys = [
  { key: "question", fallback: "vraag", label: "Vraag" },
  { key: "approach", fallback: "aanpak", label: "Aanpak" },
  { key: "result", fallback: "resultaat", label: "Resultaat" },
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

function mediaSrc(src) {
  if (!src) {
    return "";
  }

  if (src.startsWith("http")) {
    return src;
  }

  return assetPath(src);
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

function textFrom(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.text || "";
}

function getPillar(data, item) {
  return data[item.key] || data[item.fallback] || null;
}

function getPillarTitle(block, label) {
  if (!block) {
    return "";
  }

  if (typeof block === "string") {
    return label;
  }

  return block.title || label;
}

function getHeroMedia(data) {
  if (data.heroMedia) {
    return data.heroMedia;
  }

  if (data.media?.hero) {
    return {
      type: data.media.hero.type || "video",
      src: data.media.hero.src,
      poster: data.media.hero.poster,
      aspectRatio: "9/16",
      alt: `${data.client} hero video`,
    };
  }

  if (data.hero) {
    return {
      type: data.hero.video || data.hero.heroVideo ? "video" : "image",
      src: data.hero.video || data.hero.heroVideo || data.hero.image || data.hero.sourceMediaUrl || data.hero.poster,
      poster: data.hero.poster || data.hero.image || data.hero.sourceMediaUrl,
      aspectRatio: data.mediaType === "vertical-video-grid" ? "9/16" : "16/9",
      alt: `${data.client} projectbeeld`,
    };
  }

  if (data.thumbnail || data.sourceMediaUrl) {
    return {
      type: "image",
      src: data.thumbnail || data.sourceMediaUrl,
      aspectRatio: "16/9",
      alt: `${data.client} projectbeeld`,
    };
  }

  return null;
}

function getHeroFacts(data) {
  if (data.facts?.length) {
    return data.facts.slice(0, 4);
  }

  return (data.result?.stats || data.resultaat?.stats || []).slice(0, 4);
}

function getInfoItems(data) {
  const stats = data.result?.stats || data.resultaat?.stats || [];
  const outputFromStats = stats[0] ? `${stats[0].value} ${stats[0].label}` : "";
  const periodFromStats = stats[1] ? `${stats[1].value} ${stats[1].label}` : "";
  const output = data.output || outputFromStats || data.deliverables?.slice(0, 3).join(", ") || data.services?.slice(0, 3).join(", ");
  const period = data.period || periodFromStats || data.year;

  return [
    { label: "Klant", value: data.client },
    { label: "Type", value: data.category || data.mediaType },
    { label: "Output", value: output },
    { label: data.period ? "Periode" : "Jaar", value: period },
  ].filter((item) => item.value);
}

function getOneLiner(data) {
  return data.oneLiner || data.summary || data.subtitle || data.heroIntro || "";
}

function CaseMedia({ item, client, priority = false }) {
  if (!item?.src && !item?.poster) {
    return null;
  }

  const type = item.type || (item.src?.endsWith(".mp4") ? "video" : "image");

  if (type === "video") {
    return (
      <video
        aria-label={item.alt || item.title || `${client} projectvideo`}
        controls
        muted
        playsInline
        poster={item.poster ? mediaSrc(item.poster) : undefined}
        preload={priority || !item.poster ? "metadata" : "none"}
      >
        <source src={mediaSrc(item.src)} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={mediaSrc(item.src || item.poster)}
      alt={item.alt || `${client} projectbeeld`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function VimeoFrame({ embed, index, client, featured = false }) {
  const id = typeof embed === "string" ? embed : embed.id;
  const title = typeof embed === "string" ? `${client} video ${index + 1}` : embed.title || `${client} video ${index + 1}`;

  if (!id) {
    return null;
  }

  return (
    <figure className={`case-vimeo-frame${featured ? " case-vimeo-frame--featured" : ""}`}>
      <iframe
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        loading="lazy"
        src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`}
        title={title}
      />
      <figcaption>{title}</figcaption>
    </figure>
  );
}

function CaseVideoCard({ video, index, featured = false, client }) {
  if (!video?.src) {
    return null;
  }

  return (
    <article className={`case-video-card${featured ? " case-video-card--featured" : ""}`}>
      <div className="case-video-card__media">
        <CaseMedia
          client={client}
          item={{ ...video, type: "video", aspectRatio: video.aspectRatio || "9/16" }}
          priority={featured || index === 0}
        />
      </div>
      <div className="case-video-card__meta">
        <h3>{video.title || `Video ${index + 1}`}</h3>
        {featured ? <span>meest bekeken video ooit</span> : null}
      </div>
    </article>
  );
}

function CaseHero({ data }) {
  const heroMedia = getHeroMedia(data);
  const heroFacts = getHeroFacts(data);
  const oneLiner = getOneLiner(data);

  return (
    <section className="case-portfolio-hero" aria-labelledby="case-portfolio-title">
      <a className="hero__logo case-portfolio-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />
      <div className="case-portfolio-hero__copy case-portfolio-reveal">
        <p className="case-portfolio-label">Case</p>
        <h1 id="case-portfolio-title">{data.title || data.client}</h1>
        {oneLiner ? <p className="case-portfolio-hero__line">{oneLiner}</p> : null}
        {data.categories?.length ? (
          <ul className="case-portfolio-tags" aria-label="Categorieën">
            {data.categories.slice(0, 4).map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        ) : null}
        {heroFacts.length ? (
          <dl className="case-portfolio-hero__facts" aria-label="Kerncijfers">
            {heroFacts.map((fact) => (
              <div key={`${fact.value}-${fact.label}`}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {heroMedia ? (
        <figure
          className={`case-portfolio-hero__media case-media-frame case-media-frame--${heroMedia.aspectRatio === "9/16" ? "vertical" : "wide"} case-portfolio-reveal`}
        >
          <CaseMedia client={data.client} item={heroMedia} priority />
        </figure>
      ) : null}
    </section>
  );
}

function CaseQuote({ data, onOpen }) {
  if (!data.introQuote) {
    return null;
  }

  const [beforeZuidvideo, afterZuidvideo = ""] = data.introQuote.split("Zuidvideo");

  return (
    <section className="case-quote-strip case-portfolio-reveal" aria-label="Case quote">
      <p>
        {beforeZuidvideo}
        {data.introQuote.includes("Zuidvideo") && data.media?.zuidVideo?.src ? (
          <button className="case-quote-strip__trigger" onClick={onOpen} type="button">
            Zuidvideo
          </button>
        ) : null}
        {afterZuidvideo}
      </p>
    </section>
  );
}

function CaseShowcase({ data }) {
  const heroMedia = getHeroMedia(data);
  const verticalVideos = data.media?.verticalVideos || [];
  const embeds = data.vimeoEmbeds || data.media?.vimeoEmbeds || [];
  const gallery = (data.gallery || data.media?.stills || [])
    .map((item) => normalizeMediaItem(item, `${data.client} projectbeeld`))
    .filter(Boolean);

  if (verticalVideos.length) {
    return (
      <section className="case-showcase case-showcase--vertical case-portfolio-reveal" aria-labelledby="case-showcase-title">
        <div className="case-showcase__header">
          <p className="case-portfolio-label">Output</p>
          <h2 id="case-showcase-title">Gemaakt voor het scherm in je hand.</h2>
        </div>
        <div className="case-video-strip">
          {verticalVideos.slice(0, 5).map((video, index) => (
            <CaseVideoCard client={data.client} featured={index === 0} index={index} key={video.title || video.src} video={video} />
          ))}
        </div>
      </section>
    );
  }

  if (embeds.length) {
    return (
      <section className="case-showcase case-showcase--vimeo case-portfolio-reveal" aria-labelledby="case-showcase-title">
        <div className="case-showcase__header">
          <p className="case-portfolio-label">Video</p>
          <h2 id="case-showcase-title">De content zelf.</h2>
        </div>
        <div className="case-vimeo-grid">
          {embeds.slice(0, 4).map((embed, index) => (
            <VimeoFrame client={data.client} embed={embed} featured={index === 0} index={index} key={`${typeof embed === "string" ? embed : embed.id}-${index}`} />
          ))}
        </div>
      </section>
    );
  }

  if (gallery.length) {
    return (
      <section className={`case-showcase case-showcase--${data.mediaType || "image-gallery"} case-portfolio-reveal`} aria-labelledby="case-showcase-title">
        <div className="case-showcase__header">
          <p className="case-portfolio-label">Media</p>
          <h2 id="case-showcase-title">Een blik op de output.</h2>
        </div>
        <div className="case-image-grid">
          {gallery.slice(0, 8).map((item, index) => (
            <figure className="case-image-grid__item" key={`${item.src}-${index}`}>
              <img src={mediaSrc(item.src)} alt={item.alt || `${data.client} projectbeeld`} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>
    );
  }

  if (heroMedia) {
    return (
      <section className="case-showcase case-showcase--single case-portfolio-reveal" aria-labelledby="case-showcase-title">
        <div className="case-showcase__header">
          <p className="case-portfolio-label">Output</p>
          <h2 id="case-showcase-title">De gemaakte content.</h2>
        </div>
        <figure className="case-showcase__single case-media-frame case-media-frame--wide">
          <CaseMedia client={data.client} item={heroMedia} />
        </figure>
      </section>
    );
  }

  return null;
}

function CaseInfoStrip({ data }) {
  const items = getInfoItems(data).slice(0, 4);

  if (!items.length) {
    return null;
  }

  return (
    <section className="case-info-strip case-portfolio-reveal" aria-label="Mini case-info">
      <dl>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function CaseStory({ data }) {
  const blocks = data.storyBlocks || data.introTextBlocks || [];

  if (!blocks.length) {
    return null;
  }

  return (
    <section className="case-story-compact case-portfolio-reveal" aria-label="Kort caseverhaal">
      {blocks.map((block, index) => (
        <article key={block.kicker || index}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {block.kicker ? <h2>{block.kicker}</h2> : null}
          <p>{block.text}</p>
        </article>
      ))}
    </section>
  );
}

function CasePillars({ data }) {
  const pillars = pillarKeys
    .map((item) => ({ ...item, block: getPillar(data, item) }))
    .filter((item) => item.block && (textFrom(item.block) || getPillarTitle(item.block, item.label)));

  if (!pillars.length) {
    return null;
  }

  return (
    <section className="case-pillars-compact case-portfolio-reveal" aria-label="Vraag aanpak resultaat">
      {pillars.map((item, index) => {
        const block = item.block;
        const stats = typeof block === "string" ? [] : block.stats || [];

        return (
          <article key={item.key}>
            <p>{String(index + 1).padStart(2, "0")} / {item.label}</p>
            <h2>{getPillarTitle(block, item.label)}</h2>
            {textFrom(block) ? <span>{textFrom(block)}</span> : null}
            {stats.length ? (
              <dl className="case-pillars-compact__stats">
                {stats.slice(0, 4).map((stat) => (
                  <div key={`${stat.value}-${stat.label}`}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}

function CaseExtraMedia({ data }) {
  const sections = data.extraSections || [];

  if (!sections.length) {
    return null;
  }

  return (
    <section className="case-extra-output case-portfolio-reveal" aria-label="Extra media-output">
      {sections.map((section) => (
        <article key={section.title}>
          <h2>{section.title}</h2>
          {section.text ? <p>{section.text}</p> : null}
        </article>
      ))}
    </section>
  );
}

function CaseCTA({ data }) {
  return (
    <section className="case-portfolio-cta case-portfolio-reveal" aria-label="Case afsluiting">
      <div>
        <p className="case-portfolio-label">Klaar?</p>
        <h2>Klaar om iets te maken dat blijft hangen?</h2>
      </div>
      <div className="case-portfolio-cta__actions">
        <a className="button button--red" href={assetPath("/contact/")}>
          Plan een quick call
        </a>
        <a className="case-text-link" href={assetPath("/work/")}>
          Bekijk alle cases
        </a>
      </div>

      {data.nextCase ? (
        <a className="case-next-teaser" href={internalHref(data.nextCase.href)} aria-label={`Volgende case: ${data.nextCase.title}`}>
          {data.nextCase.thumbnail ? <img src={mediaSrc(data.nextCase.thumbnail)} alt="" loading="lazy" decoding="async" /> : null}
          <span>Volgende case</span>
          <strong>{data.nextCase.title}</strong>
        </a>
      ) : null}
    </section>
  );
}

function CaseVideoModal({ data, open, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    const dialog = dialogRef.current;
    const video = videoRef.current;

    closeButtonRef.current?.focus();
    document.body.classList.add("case-modal-open");

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusable = Array.from(dialog.querySelectorAll("button, [href], video, [tabindex]:not([tabindex='-1'])")).filter(
        (item) => !item.hasAttribute("disabled"),
      );

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("case-modal-open");
      video?.pause();
      previousActiveElement?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !data?.src) {
    return null;
  }

  return (
    <div className="case-modal" onMouseDown={onClose} role="presentation">
      <section
        aria-label={`${data.label || "Case"} video`}
        aria-modal="true"
        className="case-modal__dialog"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <div className="case-modal__topline">
          <p>{data.label || "Video"}</p>
          <button aria-label="Sluit video" className="case-modal__close" onClick={onClose} ref={closeButtonRef} type="button">
            Sluit
          </button>
        </div>
        <video controls playsInline poster={data.poster ? assetPath(data.poster) : undefined} preload="metadata" ref={videoRef}>
          <source src={assetPath(data.src)} type="video/mp4" />
        </video>
      </section>
    </div>
  );
}

export default function CasePageTemplate({ caseData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll(".case-portfolio-reveal"));

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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const hasQuoteModal = useMemo(() => Boolean(caseData.media?.zuidVideo?.src), [caseData.media?.zuidVideo?.src]);

  return (
    <>
      <div className={`site-shell case-portfolio-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="case-portfolio-page">
          <CaseHero data={caseData} />
          <CaseQuote data={caseData} onOpen={() => setModalOpen(true)} />
          <CaseShowcase data={caseData} />
          <CaseInfoStrip data={caseData} />
          <CaseStory data={caseData} />
          <CasePillars data={caseData} />
          <CaseExtraMedia data={caseData} />
          {caseData.outro ? (
            <section className="case-outro-line case-portfolio-reveal" aria-label="Case outro">
              <p>{caseData.outro}</p>
            </section>
          ) : null}
          <CaseCTA data={caseData} />
        </main>
        <Footer variant="paper" />
      </div>

      {hasQuoteModal ? (
        <CaseVideoModal data={caseData.media.zuidVideo} onClose={() => setModalOpen(false)} open={modalOpen} />
      ) : null}
      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
