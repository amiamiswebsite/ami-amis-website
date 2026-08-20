"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import TarzanServicesCasePage from "./TarzanServicesCasePage";
import { assetPath } from "../../src/lib/assetPath";

const pillarKeys = [
  { key: "question", fallback: "vraag", label: "Vraag" },
  { key: "approach", fallback: "aanpak", label: "Oplossing" },
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

function getProjectFacts(data) {
  return (data.projectFacts || data.caseFacts || [])
    .filter((fact) => fact?.label && fact?.value);
}

function getMediaSections(data) {
  return (data.mediaSections || [])
    .map((section) => ({
      ...section,
      items: (section.items || []).filter((item) => item && (item.src || item.poster || item.id || item.url || item.fallbackLabel)),
    }))
    .filter((section) => section.items.length);
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

function slugifyPlayerId(value) {
  return String(value || "video")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getVimeoFrameSrc({ hash = "", id, playerId }) {
  const params = new URLSearchParams({
    api: "1",
    autoplay: "0",
    autopause: "0",
    byline: "0",
    controls: "0",
    dnt: "1",
    muted: "0",
    playsinline: "1",
    portrait: "0",
    title: "0",
  });

  if (hash) {
    params.set("h", hash);
  }

  if (playerId) {
    params.set("player_id", playerId);
  }

  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}

function postVimeoCommand(iframe, method, value) {
  if (!iframe?.contentWindow) {
    return;
  }

  const message = value === undefined ? { method } : { method, value };
  const payload = JSON.stringify(message);

  try {
    iframe.contentWindow.postMessage(payload, "https://player.vimeo.com");
  } catch {
    iframe.contentWindow.postMessage(payload, "*");
  }
}

function VimeoFrame({ embed, index, client, featured = false }) {
  const iframeRef = useRef(null);
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const id = typeof embed === "string" ? embed : embed.id;
  const title = typeof embed === "string" ? `${client} video ${index + 1}` : embed.title || `${client} video ${index + 1}`;
  const hideCaption = typeof embed === "string" ? false : Boolean(embed.hideCaption || embed.hideTitle);
  const hash = typeof embed === "string" ? "" : embed.hash || embed.h || "";
  const playerId = id ? `case-vimeo-${id}-${featured ? "featured" : index}-${slugifyPlayerId(title)}` : "";
  const src = id ? getVimeoFrameSrc({ hash, id, playerId }) : "";

  useEffect(() => {
    if (!playerId) {
      return undefined;
    }

    const onOtherVimeoPlay = (event) => {
      if (event.detail?.playerId !== playerId) {
        isPlayingRef.current = false;
        setIsPlaying(false);
      }
    };

    window.addEventListener("case-vimeo-play", onOtherVimeoPlay);
    return () => window.removeEventListener("case-vimeo-play", onOtherVimeoPlay);
  }, [playerId]);

  if (!id) {
    return null;
  }

  const togglePlayback = () => {
    const iframe = iframeRef.current;

    if (isPlayingRef.current) {
      postVimeoCommand(iframe, "pause");
      isPlayingRef.current = false;
      setIsPlaying(false);
      return;
    }

    document.querySelectorAll("iframe[data-case-vimeo-player]").forEach((otherIframe) => {
      if (otherIframe !== iframe) {
        postVimeoCommand(otherIframe, "pause");
      }
    });
    document.querySelectorAll(".case-video-card video, .case-media-frame video, .case-media-hub__item video, .va-pdf-video-card__screen video").forEach((video) => {
      video.pause();
    });

    window.dispatchEvent(new CustomEvent("case-vimeo-play", { detail: { playerId } }));
    isPlayingRef.current = true;
    setIsPlaying(true);
    postVimeoCommand(iframe, "setVolume", 1);
    postVimeoCommand(iframe, "play");
    window.setTimeout(() => {
      postVimeoCommand(iframe, "setVolume", 1);
      postVimeoCommand(iframe, "play");
    }, 160);
  };

  const onScreenKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    togglePlayback();
  };

  return (
    <figure className={`case-vimeo-frame${featured ? " case-vimeo-frame--featured" : ""}${isPlaying ? " is-playing" : ""}`}>
      <div
        aria-label={`${isPlaying ? "Pauzeer" : "Speel"} ${title} met geluid`}
        className="case-vimeo-frame__screen"
        onClick={togglePlayback}
        onKeyDown={onScreenKeyDown}
        role="button"
        tabIndex={0}
      >
        <iframe
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          data-case-vimeo-player={playerId}
          loading="lazy"
          ref={iframeRef}
          src={src}
          title={title}
        />
      </div>
      <figcaption>
        <button
          aria-label={`${isPlaying ? "Pauzeer" : "Speel"} ${title} met geluid`}
          className="case-vimeo-frame__trigger"
          onClick={togglePlayback}
          type="button"
        >
          {hideCaption ? null : <span>{title}</span>}
          <span aria-hidden="true" className="case-vimeo-frame__play">
            <span />
          </span>
        </button>
      </figcaption>
    </figure>
  );
}

function CaseHeroMedia({ data, heroMedia }) {
  if (!heroMedia) {
    return null;
  }

  if (heroMedia.type === "vimeo") {
    return (
      <div className="case-portfolio-hero__media case-portfolio-hero__media--vimeo case-portfolio-reveal">
        <VimeoFrame client={data.client} embed={heroMedia} featured index={0} />
      </div>
    );
  }

  return (
    <figure
      className={`case-portfolio-hero__media case-media-frame case-media-frame--${heroMedia.aspectRatio === "9/16" ? "vertical" : "wide"} case-portfolio-reveal`}
    >
      <CaseMedia client={data.client} item={heroMedia} priority />
    </figure>
  );
}

function CaseVideoCard({ video, index, featured = false, client }) {
  if (video?.type === "vimeo" || video?.id) {
    return (
      <article className={`case-video-card case-video-card--vimeo${featured ? " case-video-card--featured" : ""}`}>
        <VimeoFrame client={client} embed={video} index={index} />
      </article>
    );
  }

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
  const hasVimeoContent = Boolean(data.vimeoEmbeds?.length || data.media?.vimeoEmbeds?.length);
  const heroClassName = [
    "case-portfolio-hero",
    heroMedia?.type === "vimeo" ? "case-portfolio-hero--vimeo" : "",
    hasVimeoContent ? "case-portfolio-hero--with-vimeo-content" : "",
    !heroMedia ? "case-portfolio-hero--text-only" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={heroClassName}
      aria-labelledby="case-portfolio-title"
    >
      <a className="hero__logo case-portfolio-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />
      <div className="case-portfolio-hero__copy case-portfolio-reveal">
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

      <CaseHeroMedia data={data} heroMedia={heroMedia} />
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
  if (data.hideShowcase) {
    return null;
  }

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
      <section className="case-showcase case-showcase--vimeo case-portfolio-reveal" aria-label="Video's">
        <div className="case-vimeo-grid">
          {embeds.slice(0, 4).map((embed, index) => (
            <VimeoFrame client={data.client} embed={embed} index={index} key={`${typeof embed === "string" ? embed : embed.id}-${index}`} />
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
  if (data.hideInfoStrip) {
    return null;
  }

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

function CaseProjectFacts({ data }) {
  const facts = getProjectFacts(data);

  if (!facts.length) {
    return null;
  }

  return (
    <section className="case-project-facts case-portfolio-reveal" aria-labelledby="case-project-facts-title">
      <div>
        <p className="case-portfolio-label">Project</p>
        <h2 id="case-project-facts-title">{data.projectFactsTitle || "Project in ’t kort"}</h2>
      </div>
      <dl>
        {facts.map((fact) => (
          <div key={`${fact.label}-${fact.value}`}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
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
    <section className="case-pillars-compact case-portfolio-reveal" aria-label="Vraag oplossing resultaat">
      {pillars.map((item, index) => {
        const block = item.block;
        const stats = typeof block === "string" ? [] : block.stats || [];

        return (
          <article key={item.key}>
            <p>{String(index + 1).padStart(2, "0")} / {block.label || item.label}</p>
            <h2>{getPillarTitle(block, block.label || item.label)}</h2>
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

function CaseMediaHubItem({ item, imageIndex, onOpenImage, client }) {
  const type = item.type || (item.id ? "vimeo" : item.src?.endsWith(".mp4") ? "video" : "image");
  const caption = item.caption || item.title || "";
  const rawOrientation = item.orientation || item.aspectRatio || "landscape";
  const orientation = rawOrientation === "4/5" || rawOrientation === "9/16"
    ? "portrait"
    : rawOrientation === "1/1"
      ? "square"
      : "landscape";

  if (type === "vimeo") {
    return (
      <div className="case-media-hub__item case-media-hub__item--video">
        <VimeoFrame client={client} embed={item} index={0} />
      </div>
    );
  }

  if (type === "instagram" || type === "external") {
    return (
      <figure className="case-media-hub__item case-media-hub__item--video">
        <a
          aria-label={`Open ${caption || item.fallbackLabel || `${client} video`}`}
          className="case-external-video"
          href={item.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="case-vimeo-frame__screen case-external-video__screen">
            <span className="case-external-video__label">{item.fallbackLabel || "Bekijk video"}</span>
            <span aria-hidden="true" className="case-vimeo-frame__play">
              <span />
            </span>
          </span>
        </a>
        {item.hideCaption ? null : caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    );
  }

  if (type === "video") {
    return (
      <figure className={`case-media-hub__item case-media-hub__item--${orientation}`}>
        {item.src ? (
          <video
            aria-label={item.alt || caption || `${client} video`}
            controls
            playsInline
            poster={item.poster ? mediaSrc(item.poster) : undefined}
            preload="none"
          >
            <source src={mediaSrc(item.src)} type="video/mp4" />
          </video>
        ) : (
          <div className="case-media-hub__placeholder">{item.fallbackLabel || "Video volgt"}</div>
        )}
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className={`case-media-hub__item case-media-hub__item--${orientation}`}>
      <button
        aria-label={`Open ${caption || item.alt || `${client} beeld`}`}
        className="case-media-hub__image-button"
        onClick={() => onOpenImage(imageIndex)}
        type="button"
      >
        <img
          src={mediaSrc(item.src || item.poster)}
          alt={item.alt || caption || `${client} projectbeeld`}
          loading="lazy"
          decoding="async"
        />
      </button>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function CaseMediaLightbox({ images, index, onClose, onMove }) {
  const closeButtonRef = useRef(null);
  const item = typeof index === "number" ? images[index] : null;

  useEffect(() => {
    if (!item) {
      return undefined;
    }

    closeButtonRef.current?.focus();
    document.body.classList.add("case-modal-open");

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onMove(-1);
      }

      if (event.key === "ArrowRight") {
        onMove(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("case-modal-open");
    };
  }, [item, onClose, onMove]);

  if (!item) {
    return null;
  }

  return (
    <div className="case-media-lightbox" onMouseDown={onClose} role="presentation">
      <section
        aria-label={item.caption || item.alt || "Casebeeld"}
        aria-modal="true"
        className="case-media-lightbox__dialog"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="case-media-lightbox__topline">
          <p>{item.caption || "Casebeeld"}</p>
          <button aria-label="Sluit beeld" className="case-media-lightbox__close" onClick={onClose} ref={closeButtonRef} type="button">
            Sluit
          </button>
        </div>
        <img src={mediaSrc(item.src || item.poster)} alt={item.alt || item.caption || "Casebeeld"} />
        {images.length > 1 ? (
          <div className="case-media-lightbox__nav">
            <button onClick={() => onMove(-1)} type="button">Vorige</button>
            <button onClick={() => onMove(1)} type="button">Volgende</button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function CaseMediaHub({ data }) {
  const sections = getMediaSections(data);
  const [activeKey, setActiveKey] = useState(sections[0]?.key || sections[0]?.title || "");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!sections.length) {
    return null;
  }

  const resolvedActiveKey = sections.some((section) => (section.key || section.title) === activeKey)
    ? activeKey
    : sections[0].key || sections[0].title;
  const activeSection = sections.find((section) => (section.key || section.title) === resolvedActiveKey) || sections[0];
  const imageItems = activeSection.items.filter((item) => (item.type || (item.id ? "vimeo" : "image")) === "image" && (item.src || item.poster));
  const layoutClass =
    activeSection.items.length === 1
      ? "case-media-hub__grid--single"
      : activeSection.items.length >= 5
        ? "case-media-hub__grid--scroll"
        : "case-media-hub__grid--mosaic";

  function moveLightbox(delta) {
    setLightboxIndex((current) => {
      if (typeof current !== "number" || !imageItems.length) {
        return current;
      }

      return (current + delta + imageItems.length) % imageItems.length;
    });
  }

  return (
    <section className="case-media-hub case-portfolio-reveal" aria-labelledby="case-media-hub-title">
      <div className="case-media-hub__header">
        <div>
          <p className="case-portfolio-label">Media</p>
          <h2 id="case-media-hub-title">{data.mediaSectionTitle || "De content zelf."}</h2>
        </div>
        {data.mediaSectionIntro ? <p>{data.mediaSectionIntro}</p> : null}
      </div>

      {sections.length > 1 ? (
        <div className="case-media-hub__tabs" aria-label="Media filters">
          {sections.map((section) => {
            const key = section.key || section.title;
            const active = key === resolvedActiveKey;

            return (
              <button aria-pressed={active} key={key} onClick={() => setActiveKey(key)} type="button">
                {section.title}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={`case-media-hub__grid ${layoutClass}`}>
        {activeSection.items.map((item, index) => {
          const imageIndex = imageItems.findIndex((image) => image === item);

          return (
            <CaseMediaHubItem
              client={data.client}
              imageIndex={imageIndex}
              item={item}
              key={`${item.src || item.id || item.caption || item.title}-${index}`}
              onOpenImage={(nextIndex) => {
                if (nextIndex >= 0) {
                  setLightboxIndex(nextIndex);
                }
              }}
            />
          );
        })}
      </div>

      <CaseMediaLightbox images={imageItems} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onMove={moveLightbox} />
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
  const ctaVariant = data.ctaVariant || "red";
  const ctaTitle = data.ctaTitle || "Klaar om iets te maken dat blijft hangen?";
  const ctaButton = data.ctaButton || "Plan een quick call";

  return (
    <section className={`case-portfolio-cta case-portfolio-cta--${ctaVariant} case-portfolio-reveal`} aria-label="Case afsluiting">
      <div>
        {ctaVariant === "blue" ? null : <p className="case-portfolio-label">Klaar?</p>}
        <h2>{ctaTitle}</h2>
      </div>
      <div className="case-portfolio-cta__actions">
        <a className="button button--red" href={assetPath("/contact/")}>
          {ctaButton}
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
  return <TarzanServicesCasePage caseData={caseData} />;
}

function GenericCasePage({ caseData }) {
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
          <CaseProjectFacts data={caseData} />
          <CasePillars data={caseData} />
          <CaseMediaHub data={caseData} />
          <CaseExtraMedia data={caseData} />
          {caseData.outro ? (
            <section className="case-outro-line case-portfolio-reveal" aria-label="Case outro">
              <p>{caseData.outro}</p>
            </section>
          ) : null}
          <CaseCTA data={caseData} />
        </main>
        <Footer variant={caseData.footerVariant === "dark" ? "dark" : "paper"} />
      </div>

      {hasQuoteModal ? (
        <CaseVideoModal data={caseData.media.zuidVideo} onClose={() => setModalOpen(false)} open={modalOpen} />
      ) : null}
      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
