"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
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

function ChromelessVideo({ className = "", itemLabel, video, ...figureProps }) {
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

  const handleScreenKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    togglePlayback();
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
        aria-label={`${isPlaying ? "Pauzeer" : "Speel"} ${video.title} met geluid`}
        className={styles.chromelessVideoScreen}
        onClick={togglePlayback}
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
          aria-label={`Speel ${video.title} met geluid`}
          className={styles.chromelessTrigger}
          onClick={togglePlayback}
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

function StorySection({ caseData }) {
  return (
    <section className={styles.story} aria-label="Case verhaal">
      <div className={styles.storyGrid}>
        <header className={`${styles.sectionIntro} ${styles.reveal}`}>
          <h2>{caseData.subtitle}</h2>
          <div className={styles.deliverables} aria-label="Deliverables">
            {caseData.deliverables.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
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

function MixedMediaRailSection({ caseData }) {
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mediaItems = useMemo(
    () => [
      {
        key: `video-${caseData.media.hero.id}`,
        type: "video",
        orientation: "landscape",
        label: "Videoclip",
        video: caseData.media.hero,
      },
      ...caseData.media.verticalVideos.map((video, index) => ({
        key: `video-${video.id}`,
        type: "video",
        orientation: "portrait",
        label: `Social video ${index + 1}`,
        video,
      })),
      ...caseData.imageGallery.map((image, index) => ({
        key: `photo-${image.src}`,
        type: "photo",
        orientation: image.orientation,
        label: `Foto ${index + 1}`,
        image,
      })),
    ],
    [caseData],
  );
  const totalItems = mediaItems.length;
  const activeItem = mediaItems[activeIndex] || mediaItems[0];
  const activeOrientationClass =
    activeItem?.orientation === "landscape"
      ? styles.hasLandscapeActive
      : styles.hasPortraitActive;

  const updateActiveItem = () => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const items = Array.from(rail.querySelectorAll("[data-media-rail-item]"));
    const visibleStart = rail.scrollLeft;
    const visibleEnd = visibleStart + rail.clientWidth;
    let closestIndex = 0;
    let largestVisibleRatio = -1;

    items.forEach((item, index) => {
      const itemStart = item.offsetLeft;
      const itemEnd = itemStart + item.offsetWidth;
      const visibleWidth = Math.max(0, Math.min(itemEnd, visibleEnd) - Math.max(itemStart, visibleStart));
      const visibleRatio = visibleWidth / item.offsetWidth;

      if (visibleRatio > largestVisibleRatio) {
        closestIndex = index;
        largestVisibleRatio = visibleRatio;
      }
    });

    setActiveIndex(closestIndex);
  };

  const moveToItem = (direction) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const items = Array.from(rail.querySelectorAll("[data-media-rail-item]"));
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), items.length - 1);
    const nextItem = items[nextIndex];

    if (!nextItem) {
      return;
    }

    const left = nextItem.offsetLeft - (rail.clientWidth - nextItem.offsetWidth) / 2;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    rail.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    setActiveIndex(nextIndex);
  };

  const handleRailKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveToItem(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveToItem(1);
    }
  };

  return (
    <section
      className={styles.mediaRailSection}
      id="media-overzicht-test"
      aria-labelledby="tarzan-media-rail-title"
    >
      <div className={styles.mediaRailHeader}>
        <div className={styles.mediaRailHeading}>
          <span className={styles.mediaTestLabel}>Test</span>
          <h2 id="tarzan-media-rail-title">Media-overzicht</h2>
        </div>
      </div>

      <div
        aria-label="Tarzan & Jane media"
        className={`${styles.mediaRailViewport} ${activeOrientationClass}`}
        onKeyDown={handleRailKeyDown}
        onScroll={updateActiveItem}
        ref={railRef}
        role="region"
        tabIndex={0}
      >
        <div className={styles.mediaRailTrack}>
          {mediaItems.map((item, index) => {
            const orientationClass =
              item.orientation === "landscape"
                ? styles.mediaRailLandscape
                : item.type === "video"
                  ? styles.mediaRailPortraitVideo
                  : styles.mediaRailPortraitPhoto;
            const itemLabel = `${item.label}, ${index + 1} van ${totalItems}`;

            if (item.type === "video") {
              return (
                <ChromelessVideo
                  className={`${styles.mediaRailItem} ${orientationClass}`}
                  data-media-rail-item
                  itemLabel={itemLabel}
                  key={item.key}
                  video={item.video}
                />
              );
            }

            return (
              <figure
                aria-label={itemLabel}
                className={`${styles.mediaRailItem} ${styles.mediaRailPhoto} ${orientationClass}`}
                data-media-rail-item
                key={item.key}
                role="group"
              >
                <img alt={item.image.alt} loading="lazy" src={assetPath(item.image.src)} />
              </figure>
            );
          })}
        </div>
      </div>

      <div className={styles.mediaRailProgress} aria-hidden="true">
        <span style={{ width: `${((activeIndex + 1) / totalItems) * 100}%` }} />
      </div>
    </section>
  );
}

function MixedMediaGridSection({ caseData }) {
  return (
    <section
      className={styles.mediaGridSection}
      id="media-grid-test"
      aria-labelledby="tarzan-media-grid-title"
    >
      <div className={styles.mediaGridInner}>
        <header className={styles.mediaGridHeading}>
          <span className={styles.mediaTestLabel}>Test 2</span>
          <h2 id="tarzan-media-grid-title">Media-overzicht</h2>
        </header>

        <div className={styles.mediaGrid}>
          <ChromelessVideo
            className={`${styles.mediaGridItem} ${styles.mediaGridFeature}`}
            itemLabel="Videoclip"
            video={caseData.media.hero}
          />

          {caseData.media.verticalVideos.map((video, index) => (
            <ChromelessVideo
              className={`${styles.mediaGridItem} ${styles.mediaGridPortraitVideo}`}
              itemLabel={`Social video ${index + 1}`}
              key={video.id}
              video={video}
            />
          ))}

          {caseData.imageGallery.map((image, index) => (
            <figure
              aria-label={`Foto ${index + 1}`}
              className={`${styles.mediaGridItem} ${styles.mediaGridPhoto}`}
              key={image.src}
              role="group"
            >
              <img alt={image.alt} loading="lazy" src={assetPath(image.src)} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection({ caseData }) {
  return (
    <>
      <section className={styles.closing} aria-label="Conclusie">
        <p className={styles.reveal}>{caseData.outro}</p>
      </section>

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
    </>
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
          <MixedMediaRailSection caseData={caseData} />
          <MixedMediaGridSection caseData={caseData} />
          <ClosingSection caseData={caseData} />
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay activePage="work" open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
