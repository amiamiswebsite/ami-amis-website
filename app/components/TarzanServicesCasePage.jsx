"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";
import styles from "./TarzanServicesCasePage.module.css";

const stepConfig = [
  { key: "question", number: "01", icon: "/images/cases/x-oats/icon-question.png" },
  { key: "approach", number: "02", icon: "/images/cases/x-oats/icon-approach.png" },
  { key: "result", number: "03", icon: "/images/cases/x-oats/icon-result.png" },
];

function cleanVimeoSource(video, playerId) {
  if (!video?.id) {
    return "";
  }

  const params = new URLSearchParams({
    api: "1",
    autoplay: "0",
    autopause: "0",
    badge: "0",
    byline: "0",
    controls: "0",
    dnt: "1",
    keyboard: "0",
    muted: "0",
    pip: "0",
    playsinline: "1",
    portrait: "0",
    title: "0",
    vimeo_logo: "0",
  });

  if (video.hash || video.h) {
    params.set("h", video.hash || video.h);
  }

  params.set("player_id", playerId);
  return `https://player.vimeo.com/video/${video.id}?${params.toString()}`;
}

function lightboxVimeoSource(video) {
  if (!video?.id) {
    return "";
  }

  const params = new URLSearchParams({
    airplay: "0",
    autoplay: "1",
    autopause: "0",
    badge: "0",
    byline: "0",
    cc: "0",
    chapters: "0",
    controls: "1",
    dnt: "1",
    muted: "0",
    pip: "0",
    playsinline: "1",
    portrait: "0",
    quality_selector: "0",
    speed: "0",
    title: "0",
    transcript: "0",
    vimeo_logo: "0",
  });

  if (video.hash || video.h) {
    params.set("h", video.hash || video.h);
  }

  return `https://player.vimeo.com/video/${video.id}?${params.toString()}`;
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

function ChromelessVideo({ className = "", itemLabel, onOpen, video, ...figureProps }) {
  const iframeRef = useRef(null);
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const instanceId = useId().replaceAll(":", "");
  const playerId = `tarzan-chromeless-${video.id}-${instanceId}`;
  const src = cleanVimeoSource(video, playerId);

  useEffect(() => {
    const onOtherVimeoPlay = (event) => {
      if (event.detail?.playerId !== playerId) {
        isPlayingRef.current = false;
        setIsPlaying(false);
      }
    };
    const onVimeoMessage = (event) => {
      if (event.origin !== "https://player.vimeo.com") {
        return;
      }

      let data = event.data;

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (data?.player_id !== playerId) {
        return;
      }

      if (data.event === "play") {
        isPlayingRef.current = true;
        setIsPlaying(true);
      }

      if (data.event === "pause" || data.event === "ended") {
        isPlayingRef.current = false;
        setIsPlaying(false);
      }
    };

    window.addEventListener("case-vimeo-play", onOtherVimeoPlay);
    window.addEventListener("message", onVimeoMessage);
    return () => {
      window.removeEventListener("case-vimeo-play", onOtherVimeoPlay);
      window.removeEventListener("message", onVimeoMessage);
    };
  }, [playerId]);

  const togglePlayback = () => {
    const iframe = iframeRef.current;

    if (isPlayingRef.current) {
      sendVimeoCommand(iframe, "pause");
      isPlayingRef.current = false;
      setIsPlaying(false);
      return;
    }

    document.querySelectorAll("iframe[data-case-vimeo-player]").forEach((otherIframe) => {
      if (otherIframe !== iframe) {
        sendVimeoCommand(otherIframe, "pause");
      }
    });
    window.dispatchEvent(new CustomEvent("case-vimeo-play", { detail: { playerId } }));
    isPlayingRef.current = true;
    setIsPlaying(true);
    sendVimeoCommand(iframe, "setVolume", 1);
    sendVimeoCommand(iframe, "play");
    window.setTimeout(() => {
      sendVimeoCommand(iframe, "setVolume", 1);
      sendVimeoCommand(iframe, "play");
    }, 160);
  };

  const activateVideo = () => {
    if (onOpen) {
      onOpen();
      return;
    }

    togglePlayback();
  };

  const handleScreenKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    activateVideo();
  };

  if (!src) {
    return null;
  }

  return (
    <figure
      {...figureProps}
      aria-label={itemLabel || video.title}
      className={`${styles.chromelessVideo} ${isPlaying ? styles.isPlaying : ""} ${className}`}
      role="group"
    >
      <div
        aria-label={onOpen ? `Open ${video.title}` : `${isPlaying ? "Pauzeer" : "Speel"} ${video.title} met geluid`}
        className={styles.chromelessVideoScreen}
        onClick={activateVideo}
        onKeyDown={handleScreenKeyDown}
        role="button"
        tabIndex={0}
      >
        <iframe
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          data-case-vimeo-player={playerId}
          loading="lazy"
          ref={iframeRef}
          src={src}
          title={video.title}
        />
      </div>
      <figcaption>
        <button
          aria-label={onOpen ? `Open ${video.title}` : `Speel ${video.title} met geluid`}
          className={styles.chromelessTrigger}
          onClick={activateVideo}
          type="button"
        >
          <span className={styles.chromelessTitle}>{video.title}</span>
          <span aria-hidden="true" className={styles.chromelessPlayButton}>
            <span />
          </span>
        </button>
      </figcaption>
    </figure>
  );
}

function LightboxVideo({ video }) {
  return (
    <iframe
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowFullScreen
      className={styles.mediaLightboxPlayer}
      src={lightboxVimeoSource(video)}
      title={video.title}
    />
  );
}

function MediaLightbox({ activeIndex, items, onChange, onClose }) {
  const dialogRef = useRef(null);
  const item = items[activeIndex];
  const previousIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onChange(previousIndex);
      }

      if (event.key === "ArrowRight") {
        onChange(nextIndex);
      }

      if (event.key === "Tab") {
        const focusableElements = Array.from(
          dialogRef.current?.querySelectorAll(
            "button, iframe, [href], [tabindex]:not([tabindex='-1'])",
          ) || [],
        ).filter((element) => !element.disabled);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus?.();
    };
  }, [nextIndex, onChange, onClose, previousIndex]);

  const orientationClass =
    item.orientation === "portrait"
      ? styles.mediaLightboxPortrait
      : styles.mediaLightboxLandscape;

  return createPortal(
    <div
      className={styles.mediaLightbox}
      onMouseDown={(event) => {
        const target = event.target;

        if (
          target === event.currentTarget ||
          (target instanceof Element && !target.closest("[data-media-lightbox-content], button"))
        ) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        aria-labelledby="tarzan-media-lightbox-title"
        aria-modal="true"
        className={styles.mediaLightboxDialog}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <button
          aria-label="Sluit media-overzicht"
          className={styles.mediaLightboxClose}
          onClick={onClose}
          type="button"
        >
          <span aria-hidden="true" className={styles.mediaLightboxCloseIcon} />
        </button>

        <div className={styles.mediaLightboxStage}>
          <button
            aria-label={`Vorige media: ${items[previousIndex].label}`}
            className={`${styles.mediaLightboxArrow} ${styles.mediaLightboxArrowPrevious}`}
            onClick={() => onChange(previousIndex)}
            type="button"
          >
            <span aria-hidden="true" className={styles.mediaLightboxChevron} />
          </button>

          <div
            className={`${styles.mediaLightboxContent} ${orientationClass}`}
            data-media-lightbox-content
          >
            <div className={styles.mediaLightboxVisual}>
              {item.type === "video" ? (
                <LightboxVideo key={item.key} video={item.video} />
              ) : (
                <img
                  alt={item.image.alt}
                  className={styles.mediaLightboxImage}
                  src={assetPath(item.image.src)}
                />
              )}
            </div>

            <div className={styles.mediaLightboxMeta}>
              <strong id="tarzan-media-lightbox-title">{item.label}</strong>
              <span aria-label={`${activeIndex + 1} van ${items.length}`}>
                {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button
            aria-label={`Volgende media: ${items[nextIndex].label}`}
            className={`${styles.mediaLightboxArrow} ${styles.mediaLightboxArrowNext}`}
            onClick={() => onChange(nextIndex)}
            type="button"
          >
            <span aria-hidden="true" className={styles.mediaLightboxChevron} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function StorySection({ caseData }) {
  return (
    <section className={styles.story} aria-label="Case verhaal">
      <div className={styles.storyGrid}>
        <header className={`${styles.sectionIntro} ${styles.reveal}`}>
          <h2>{caseData.subtitle}</h2>
        </header>

        <div className={`${styles.storyCopy} ${styles.reveal}`}>
          {caseData.storyBlocks.map((block, index) => (
            <p key={`${block.text.slice(0, 24)}-${index}`}>{block.text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function StaticProcessSection({ caseData }) {
  const steps = useMemo(
    () => stepConfig.map((item) => ({ ...item, ...caseData[item.key] })),
    [caseData],
  );

  return (
    <section
      className={styles.staticProcess}
      id="proces-statisch-test"
      aria-label="Statische weergave van probleem, oplossing en resultaat"
    >
      <div className={styles.staticProcessGrid}>
        {steps.map((step, index) => (
          <article className={styles.staticProcessCard} key={step.key}>
            <div className={styles.staticProcessCardTop}>
              <span className={styles.staticProcessNumber}>{index + 1}</span>
              <span
                aria-hidden="true"
                className={styles.staticProcessIcon}
                style={{ "--tarzan-service-icon": `url(${assetPath(step.icon)})` }}
              />
            </div>
            <h3>{step.label}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function VideoSection({ caseData }) {
  return (
    <section className={styles.videos} aria-labelledby="tarzan-videos-title">
      <div className={styles.videosInner}>
        <header className={`${styles.mediaHeading} ${styles.reveal}`}>
          <h2 id="tarzan-videos-title">Videogalerij</h2>
        </header>

        <div className={`${styles.phoneRow} ${styles.reveal}`}>
          {caseData.media.verticalVideos.map((video) => (
            <ChromelessVideo className={styles.phoneVideo} key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ caseData }) {
  return (
    <section className={styles.gallery} aria-labelledby="tarzan-gallery-title">
      <div className={styles.galleryInner}>
        <header className={`${styles.galleryHeading} ${styles.reveal}`}>
          <h2 id="tarzan-gallery-title">{caseData.imageGalleryTitle}</h2>
        </header>

        <div className={`${styles.galleryGrid} ${styles.reveal}`}>
          {caseData.imageGallery.map((image) => (
            <figure
              className={image.orientation === "landscape" ? styles.galleryLandscape : ""}
              key={image.src}
            >
              <img alt={image.alt} loading="lazy" src={assetPath(image.src)} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function MixedMediaGridSection({ caseData }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const mediaItems = useMemo(
    () => [
      {
        key: `video-${caseData.media.hero.id}`,
        type: "video",
        orientation: "landscape",
        label: "Videoclip",
        video: caseData.media.hero,
      },
      ...caseData.media.verticalVideos.map((video) => ({
        key: `video-${video.id}`,
        type: "video",
        orientation: "portrait",
        label: "Social video",
        video,
      })),
      ...caseData.imageGallery.map((image) => ({
        key: `photo-${image.src}`,
        type: "photo",
        orientation: image.orientation,
        label: "Fotografie",
        image,
      })),
    ],
    [caseData],
  );

  return (
    <section
      className={styles.mediaGridSection}
      id="media-grid-test"
      aria-labelledby="tarzan-media-grid-title"
    >
      <div className={styles.mediaGridInner}>
        <header className={styles.mediaGridHeading}>
          <h2 id="tarzan-media-grid-title">Media-overzicht</h2>
        </header>

        <div className={styles.mediaGrid}>
          <ChromelessVideo
            className={`${styles.mediaGridItem} ${styles.mediaGridFeature}`}
            itemLabel="Videoclip"
            onOpen={() => setActiveIndex(0)}
            video={caseData.media.hero}
          />

          {caseData.media.verticalVideos.map((video, index) => (
            <ChromelessVideo
              className={`${styles.mediaGridItem} ${styles.mediaGridPortraitVideo}`}
              itemLabel={`Social video ${index + 1}`}
              key={video.id}
              onOpen={() => setActiveIndex(index + 1)}
              video={video}
            />
          ))}

          {caseData.imageGallery.map((image, index) => (
            <button
              aria-label={`Foto ${index + 1}`}
              className={`${styles.mediaGridItem} ${styles.mediaGridPhoto}`}
              key={image.src}
              onClick={() => setActiveIndex(1 + caseData.media.verticalVideos.length + index)}
              type="button"
            >
              <img alt={image.alt} loading="lazy" src={assetPath(image.src)} />
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null ? (
        <MediaLightbox
          activeIndex={activeIndex}
          items={mediaItems}
          onChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </section>
  );
}

function ClosingSection() {
  return (
    <section className={styles.cta} aria-label="Contact">
      <img
        alt=""
        aria-hidden="true"
        src={assetPath("/images/cases/visit-antwerpen/visit-antwerpen-megaphone-exact.png")}
      />
      <div>
        <h2>Durf jij een samenwerking aan te gaan?</h2>
        <a className="button button--yellow" href={assetPath("/contact/")}>Eens afspreken?</a>
      </div>
    </section>
  );
}

export default function TarzanServicesCasePage({ caseData }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll(`.${styles.reveal}`));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add(styles.isVisible));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className={styles.page}>
          <a className={`hero__logo ${styles.logo}`} href={assetPath("/")} aria-label="Ami Amis home" />

          <section className={styles.hero} aria-labelledby="tarzan-services-title">
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.sectionNumber}>{caseData.year}</span>
                <h1 id="tarzan-services-title">{caseData.title}</h1>
                <p>{caseData.introQuote}</p>
                <div className={styles.heroTags}>
                  {caseData.categories.map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>
              </div>

              <ChromelessVideo
                className={styles.heroVideo}
                itemLabel="Tarzan & Jane videoclip"
                video={caseData.media.hero}
              />
            </div>
          </section>

          <StorySection caseData={caseData} />
          <StaticProcessSection caseData={caseData} />
          <VideoSection caseData={caseData} />
          <GallerySection caseData={caseData} />
          <MixedMediaGridSection caseData={caseData} />
          <ClosingSection />
        </main>
        <Footer variant="paper-flat" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay activePage="work" open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
