"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const summaryItems = [
  {
    key: "question",
    number: "1.",
    label: "PROBLEEM",
    icon: "/images/cases/visit-antwerpen/visit-antwerpen-questionmarks-exact.png",
  },
  {
    key: "approach",
    number: "2.",
    label: "AANPAK",
    icon: "/images/cases/visit-antwerpen/visit-antwerpen-clapper-exact.png",
  },
  {
    key: "result",
    number: "3.",
    label: "RESULTAAT",
    icon: "/images/cases/visit-antwerpen/visit-antwerpen-spark-exact.png",
  },
];

const xOatsSummaryIcons = {
  question: "/images/cases/x-oats/icon-question.png",
  approach: "/images/cases/x-oats/icon-approach.png",
  result: "/images/cases/x-oats/icon-result.png",
};

function mediaPath(src) {
  if (!src) {
    return "";
  }

  if (src.startsWith("http")) {
    return src;
  }

  return assetPath(src);
}

function HighlightedText({ highlights = [], text }) {
  if (!highlights.length) {
    return text;
  }

  const parts = [];
  let cursor = 0;

  while (cursor < text.length) {
    const next = highlights
      .map((highlight) => ({ highlight, index: text.indexOf(highlight, cursor) }))
      .filter((item) => item.index >= 0)
      .sort((a, b) => a.index - b.index)[0];

    if (!next) {
      parts.push(text.slice(cursor));
      break;
    }

    if (next.index > cursor) {
      parts.push(text.slice(cursor, next.index));
    }

    parts.push(
      <mark key={`${next.highlight}-${next.index}`} className="va-pdf-highlight">
        {next.highlight}
      </mark>,
    );
    cursor = next.index + next.highlight.length;
  }

  return parts;
}

function getVimeoId(video) {
  if (!video) {
    return "";
  }

  if (video.type === "youtube") {
    return "";
  }

  if (video.type === "vimeo" && video.id) {
    return String(video.id);
  }

  if (video.id && String(video.id).match(/^\d+$/)) {
    return String(video.id);
  }

  const url = video.url || video.src || "";
  const match = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] || "";
}

function getYouTubeId(video) {
  if (!video) {
    return "";
  }

  if (video.type === "youtube" && video.id) {
    return String(video.id);
  }

  const url = String(video.url || video.src || "");
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/);
  return match?.[1] || "";
}

function slugifyId(value) {
  return String(value || "video")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getVimeoEmbedSrc({ hash = "", id, playerId }) {
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

function sendVimeoCommand(iframe, method, value) {
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

function VideoFrame({ featured = false, priority = false, video }) {
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const isVimeoPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const vimeoId = getVimeoId(video);
  const youTubeId = getYouTubeId(video);
  const isVimeo = video?.type === "vimeo" || Boolean(vimeoId);
  const isYouTube = video?.type === "youtube" || Boolean(youTubeId);
  const isEmbed = isVimeo || isYouTube;
  const rawSrc = video?.src || video?.poster || "";
  const isImage =
    video?.type === "image" ||
    (!isEmbed && rawSrc && !String(rawSrc).match(/\.(mp4|webm|mov)(\?.*)?$/i));

  const hash = video?.hash || video?.h || "";
  const vimeoPlayerId = vimeoId ? `va-pdf-vimeo-${vimeoId}-${featured ? "hero" : "card"}-${slugifyId(video?.title)}` : "";
  const vimeoSrc = vimeoId ? getVimeoEmbedSrc({ hash, id: vimeoId, playerId: vimeoPlayerId }) : "";
  const youTubeSrc = youTubeId ? `https://www.youtube.com/embed/${youTubeId}?rel=0&modestbranding=1` : "";
  const orientation = video.orientation || (video.wide ? "landscape" : "portrait");

  useEffect(() => {
    if (!isVimeo || !vimeoPlayerId) {
      return undefined;
    }

    const onOtherVimeoPlay = (event) => {
      if (event.detail?.playerId !== vimeoPlayerId) {
        isVimeoPlayingRef.current = false;
        setIsPlaying(false);
      }
    };

    window.addEventListener("case-vimeo-play", onOtherVimeoPlay);
    return () => window.removeEventListener("case-vimeo-play", onOtherVimeoPlay);
  }, [isVimeo, vimeoPlayerId]);

  if (!rawSrc && !vimeoId && !youTubeId) {
    return null;
  }

  const toggleVimeoPlayback = () => {
    if (!isVimeo) {
      return;
    }

    const iframe = iframeRef.current;

    if (isVimeoPlayingRef.current) {
      sendVimeoCommand(iframe, "pause");
      isVimeoPlayingRef.current = false;
      setIsPlaying(false);
      return;
    }

    document.querySelectorAll("iframe[data-case-vimeo-player]").forEach((otherIframe) => {
      if (otherIframe !== iframe) {
        sendVimeoCommand(otherIframe, "pause");
      }
    });
    document.querySelectorAll(".va-pdf-video-card__screen video, .case-video-card video, .case-media-frame video, .case-media-hub__item video").forEach((otherVideo) => {
      otherVideo.pause();
    });

    window.dispatchEvent(new CustomEvent("case-vimeo-play", { detail: { playerId: vimeoPlayerId } }));
    isVimeoPlayingRef.current = true;
    setIsPlaying(true);
    sendVimeoCommand(iframe, "setVolume", 1);
    sendVimeoCommand(iframe, "play");
    window.setTimeout(() => {
      sendVimeoCommand(iframe, "setVolume", 1);
      sendVimeoCommand(iframe, "play");
    }, 160);
  };

  const togglePlayback = async () => {
    if (isVimeo) {
      toggleVimeoPlayback();
      return;
    }

    if (isEmbed || isImage) {
      return;
    }

    const videoNode = videoRef.current;

    if (!videoNode) {
      return;
    }

    if (videoNode.paused) {
      document.querySelectorAll(".va-pdf-video-card__screen video").forEach((otherVideo) => {
        if (otherVideo !== videoNode) {
          otherVideo.pause();
        }
      });
      document.querySelectorAll("iframe[data-case-vimeo-player]").forEach((otherIframe) => {
        sendVimeoCommand(otherIframe, "pause");
      });

      try {
        videoNode.muted = false;
        videoNode.volume = 1;
        await videoNode.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      videoNode.pause();
    }
  };

  const onKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    togglePlayback();
  };

  const isLongTitle = (video.title || "").length > 10;

  return (
    <figure
      className={`va-pdf-video-card va-pdf-video-card--${orientation}${featured ? " va-pdf-video-card--hero" : ""}${video.wide ? " va-pdf-video-card--wide" : ""}${isEmbed ? " va-pdf-video-card--vimeo" : ""}${isImage ? " va-pdf-video-card--image" : ""}${isLongTitle ? " va-pdf-video-card--long-title" : ""}${isPlaying ? " is-playing" : ""}`}
      style={{ "--va-video-aspect": video.aspectRatio || (video.wide ? "16 / 9" : "9 / 16") }}
    >
      <div
        aria-label={`${isPlaying ? "Pauzeer" : "Speel"} ${video.title} video`}
        className="va-pdf-video-card__screen"
        onClick={isImage || isYouTube ? undefined : togglePlayback}
        onKeyDown={isImage || isYouTube ? undefined : onKeyDown}
        role={isImage || isYouTube ? undefined : "button"}
        tabIndex={isImage || isYouTube ? undefined : 0}
      >
        {isEmbed ? (
          <iframe
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            data-case-vimeo-player={isVimeo ? vimeoPlayerId : undefined}
            loading={priority ? "eager" : "lazy"}
            ref={isVimeo ? iframeRef : undefined}
            src={vimeoSrc || youTubeSrc}
            title={video.title || (isYouTube ? "YouTube video" : "Vimeo video")}
          />
        ) : isImage ? (
          <img alt={video.alt || video.title || "Casebeeld"} src={mediaPath(rawSrc)} loading={priority ? "eager" : "lazy"} decoding="async" />
        ) : (
          <video
            aria-label={`${video.title} video`}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            playsInline
            poster={video.poster ? mediaPath(video.poster) : undefined}
            preload={priority || !video.poster ? "metadata" : "none"}
            ref={videoRef}
          >
            <source src={mediaPath(video.src)} type="video/mp4" />
          </video>
        )}
      </div>
      <figcaption>
        {isVimeo ? (
          <button
            aria-label={`${isPlaying ? "Pauzeer" : "Speel"} ${video.title} met geluid`}
            className="va-pdf-video-card__trigger"
            onClick={toggleVimeoPlayback}
            type="button"
          >
            <span className="va-pdf-video-card__title">{video.title}</span>
            <span aria-hidden="true" className="va-pdf-video-card__play">
              <span />
            </span>
          </button>
        ) : (
          <>
            <span className="va-pdf-video-card__title">{video.title}</span>
            {isImage ? null : (
              <span aria-hidden="true" className="va-pdf-video-card__play">
                <span />
              </span>
            )}
          </>
        )}
      </figcaption>
    </figure>
  );
}

function ZuidvideoModal({ data, onClose, open }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    const dialog = dialogRef.current;
    const video = videoRef.current;

    closeRef.current?.focus();
    document.body.classList.add("case-modal-open");

    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusable = Array.from(dialog.querySelectorAll("button, video, [href], [tabindex]:not([tabindex='-1'])")).filter(
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

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("case-modal-open");
      video?.pause();
      previousActiveElement?.focus?.();
    };
  }, [onClose, open]);

  if (!open || !data?.src) {
    return null;
  }

  return (
    <div className="va-pdf-modal" onMouseDown={onClose} role="presentation">
      <section
        aria-label="Zuidvideo"
        aria-modal="true"
        className="va-pdf-modal__dialog"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <div className="va-pdf-modal__topline">
          <p>{data.label || "Zuidvideo"}</p>
          <button aria-label="Sluit Zuidvideo" className="va-pdf-modal__close" onClick={onClose} ref={closeRef} type="button">
            Sluit
          </button>
        </div>
        <video controls playsInline poster={data.poster ? mediaPath(data.poster) : undefined} preload="metadata" ref={videoRef}>
          <source src={mediaPath(data.src)} type="video/mp4" />
        </video>
      </section>
    </div>
  );
}

function QuoteCard({ data, onOpen }) {
  const quote = data.introQuote || "";
  const hasZuidvideoTrigger = quote.includes("Zuidvideo") && data.media?.zuidVideo?.src;
  const [beforeZuidvideo, afterZuidvideo = ""] = hasZuidvideoTrigger ? quote.split("Zuidvideo") : [quote, ""];
  const shouldWrapQuote = quote.trim() && !quote.trim().startsWith("“") && !quote.trim().startsWith('"');
  const isLongQuote = quote.length > 150;

  return (
    <blockquote className={`va-pdf-quote${isLongQuote ? " va-pdf-quote--long" : ""} va-pdf-reveal`}>
      <p>
        {shouldWrapQuote ? <span className="sr-only">“</span> : null}
        {beforeZuidvideo}
        {hasZuidvideoTrigger ? (
          <button aria-label="Bekijk de Zuidvideo" className="va-pdf-quote__trigger" onClick={onOpen} type="button">
            Zuidvideo
          </button>
        ) : null}
        {afterZuidvideo}
        {shouldWrapQuote ? "”" : ""}
      </p>
    </blockquote>
  );
}

function Hero({ data, onOpen, showVideo = true }) {
  const heroCollage = data.heroCollage?.src
    ? data.heroCollage
    : data.slug === "visitantwerp"
      ? {
          src: "/images/cases/visit-antwerpen/visit-antwerpen-cathedral-exact.png",
          className: "va-pdf-hero__cathedral-collage",
        }
      : null;
  const heroVideo = data.media?.hero ? { ...data.media.hero, title: data.media.hero.title || data.media?.verticalVideos?.[0]?.title || data.title } : null;
  const heroSticker = data.heroSticker?.src ? data.heroSticker : null;
  const hasHeroMedia = Boolean(heroCollage || heroSticker || (showVideo && heroVideo));

  return (
    <section className={`va-pdf-hero${heroCollage ? "" : " va-pdf-hero--plain"}${heroSticker ? " va-pdf-hero--has-sticker" : ""}${hasHeroMedia ? "" : " va-pdf-hero--no-media"}`} aria-labelledby="va-pdf-title">
      <a className="hero__logo va-pdf-logo" href={assetPath("/")} aria-label="Ami Amis home" />
      <div className="va-pdf-hero__inner">
        <div className="va-pdf-hero__copy">
          <h1 className="va-pdf-reveal" id="va-pdf-title">
            {data.heroTitle || data.title}
          </h1>
          <QuoteCard data={data} onOpen={onOpen} />
        </div>
        {hasHeroMedia ? (
          <div className="va-pdf-hero__media va-pdf-reveal">
            {heroCollage ? <img alt="" aria-hidden="true" className={heroCollage.className || "va-pdf-hero__cathedral-collage"} src={assetPath(heroCollage.src)} /> : null}
            {heroSticker ? <img alt="" aria-hidden="true" className="va-pdf-hero__sticker" src={assetPath(heroSticker.src)} /> : null}
            {showVideo ? <VideoFrame featured priority video={heroVideo} /> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Story({ data }) {
  const blocks = data.storyBlocks || [];
  const highlights = data.storyHighlights || [["10 social media video’s", "4 maanden"], [], ["43K", "1314"]];

  return (
    <section className="va-pdf-story" aria-label="Case verhaal">
      <div className="va-pdf-story__inner va-pdf-reveal">
        {blocks.map((block, index) =>
          block?.text ? (
            <p key={`${block.text.slice(0, 24)}-${index}`}>
              <HighlightedText highlights={highlights[index] || []} text={block.text} />
            </p>
          ) : null,
        )}
      </div>
    </section>
  );
}

function StatsRow({ stats }) {
  if (!stats?.length) {
    return null;
  }

  return (
    <section className="va-pdf-stats va-pdf-reveal" aria-label="Resultaten">
      <dl>
        {stats.map((stat, index) => (
          <div className={String(stat.value).length > 5 ? "va-pdf-stat--long" : undefined} key={`${stat.value}-${stat.label}-${index}`}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function VideoGrid({ videos }) {
  if (!videos?.length) {
    return null;
  }

  const normalizedVideos = videos.map((video) => ({
    ...video,
    aspectRatio: video.aspectRatio || (video.orientation === "landscape" || video.wide ? "16 / 9" : "9 / 16"),
    orientation: video.orientation || (video.wide ? "landscape" : "portrait"),
    wide: typeof video.wide === "boolean" ? video.wide : video.orientation === "landscape",
  }));

  return (
    <section
      className={`va-pdf-video-grid va-pdf-video-grid--count-${normalizedVideos.length} va-pdf-reveal`}
      aria-label="Video's"
    >
      {normalizedVideos.map((video, index) => (
        <VideoFrame key={`${video.id || video.src || video.title}-${index}`} priority={index === 0} video={video} />
      ))}
    </section>
  );
}

function FeaturedVideo({ video }) {
  if (!video) {
    return null;
  }

  return (
    <section className="va-pdf-featured-video va-pdf-reveal" aria-label={video.title || "Video"}>
      <VideoFrame priority video={video} />
    </section>
  );
}

function CampaignImagesGallery({ eyebrow = "Output", images, title = "Campagnebeelden", variant = "campaign" }) {
  if (!images?.length) {
    return null;
  }

  const headingId = `va-pdf-${variant}-gallery-title`;

  return (
    <section className={`va-pdf-campaign-gallery va-pdf-campaign-gallery--${variant} va-pdf-reveal`} aria-labelledby={headingId}>
      <div className="va-pdf-campaign-gallery__header">
        <p className="va-pdf-campaign-gallery__eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
      </div>
      <div className="va-pdf-campaign-gallery__grid">
        {images.map((image, index) => {
          const orientation = image.orientation || "portrait";

          return (
            <figure
              className={`va-pdf-campaign-gallery__item va-pdf-campaign-gallery__item--${orientation}`}
              key={`${image.src}-${index}`}
            >
              <img alt={image.alt || title} decoding="async" loading="lazy" src={mediaPath(image.src)} />
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function Outro({ text }) {
  if (!text) {
    return null;
  }

  return (
    <section className="va-pdf-outro va-pdf-reveal" aria-label="Outro">
      <p>
        {text.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </section>
  );
}

function getSummaryBlocks(data) {
  return summaryItems
    .map((item, index) => {
      const block = data[item.key];

      if (!block?.text) {
        return null;
      }

      return {
        ...item,
        icon: xOatsSummaryIcons[item.key] || item.icon,
        index,
        label: item.label,
        title: block.title || item.label,
        text: block.text,
      };
    })
    .filter(Boolean);
}

function SummaryVariantCard({ block, compact = false }) {
  return (
    <article className={`x-oats-var-card x-oats-var-card--${block.key}${compact ? " x-oats-var-card--compact" : ""}`}>
      <span
        className="x-oats-var-card__icon"
        style={{ "--x-oats-icon-url": `url(${assetPath(block.icon)})` }}
        aria-hidden="true"
      />
      <div className="x-oats-var-card__heading">
        <span>{block.number}</span>
        <h3>{block.label}</h3>
      </div>
      <p>{block.text}</p>
    </article>
  );
}

function CaseSummaryCards({ data }) {
  const blocks = getSummaryBlocks(data);

  if (blocks.length < 3) {
    return null;
  }

  return (
    <section className="x-oats-final-summary va-pdf-reveal" aria-label="Vraag aanpak resultaat">
      <div className="x-oats-final-summary__grid">
        {blocks.map((block) => (
          <SummaryVariantCard block={block} compact key={`x-oats-final-${block.key}`} />
        ))}
      </div>
    </section>
  );
}

function CaseCTA() {
  return (
    <section className="va-pdf-cta va-pdf-reveal" aria-label="Contact">
      <img
        alt=""
        aria-hidden="true"
        className="va-pdf-cta__megaphone"
        src={assetPath("/images/cases/visit-antwerpen/visit-antwerpen-megaphone-exact.png")}
      />
      <div>
        <h2>Durf jij een samenwerking aan te gaan?</h2>
        <a className="button button--yellow" href={assetPath("/contact/")}>
          Eens afspreken?
        </a>
      </div>
    </section>
  );
}

export default function VisitAntwerpenCasePage({ caseData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const showHeroBeforeStats = caseData.media?.heroPlacement === "before-stats";
  const showVideoGridBeforeStats = caseData.media?.videoGridPlacement === "before-stats";

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll(".va-pdf-reveal"));

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`site-shell va-pdf-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className={`va-pdf-page va-pdf-page--${caseData.slug}`}>
          <Hero data={caseData} onOpen={() => setModalOpen(true)} />
          <Story data={caseData} />
          {showHeroBeforeStats ? <FeaturedVideo video={caseData.media?.hero} /> : null}
          {showVideoGridBeforeStats ? <VideoGrid videos={caseData.media?.verticalVideos} /> : null}
          <StatsRow stats={caseData.result?.stats} />
          {showVideoGridBeforeStats ? null : <VideoGrid videos={caseData.media?.verticalVideos} />}
          <CampaignImagesGallery images={caseData.campaignImages} />
          <CampaignImagesGallery
            eyebrow={caseData.imageGalleryEyebrow || "Beelden"}
            images={caseData.imageGallery}
            title={caseData.imageGalleryTitle || "Fotogalerij"}
            variant="photos"
          />
          <Outro text={caseData.outro} />
          <CaseSummaryCards data={caseData} />
          <CaseCTA />
        </main>
        <Footer />
      </div>
      <ZuidvideoModal data={caseData.media?.zuidVideo} onClose={() => setModalOpen(false)} open={modalOpen} />
      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
