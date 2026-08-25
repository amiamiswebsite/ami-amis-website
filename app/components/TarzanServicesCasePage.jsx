"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import Icon from "./ui/Icon";
import { assetPath } from "../../src/lib/assetPath";
import styles from "./TarzanServicesCasePage.module.css";

const stepConfig = [
  { key: "question", fallback: "vraag", number: "01", icon: "/images/cases/x-oats/icon-question.png", label: "Vraag" },
  { key: "approach", fallback: "aanpak", number: "02", icon: "/images/cases/x-oats/icon-approach.png", label: "Oplossing" },
  { key: "result", fallback: "resultaat", number: "03", icon: "/images/cases/x-oats/icon-result.png", label: "Resultaat" },
];

function mediaPath(src) {
  if (!src) {
    return "";
  }

  const source = String(src);

  if (source.startsWith("http")) {
    return source;
  }

  return assetPath(source);
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

function mediaKey(item) {
  if (!item) {
    return "";
  }

  const youtubeId = getYouTubeId(item);

  if (youtubeId) {
    return `youtube:${youtubeId}`;
  }

  if (item.id) {
    return `vimeo:${item.id}`;
  }

  const source = String(item.src || item.url || item.poster || "")
    .trim()
    .replace(/[?#].*$/, "");

  if (source) {
    return `source:${source}`;
  }

  return [item.type, item.title, item.label].filter(Boolean).join(":");
}

function uniqueMediaItems(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = mediaKey(item);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function isPortraitMedia(item = {}) {
  const ratio = String(item.aspectRatio || "").replace(/\s/g, "");
  return item.orientation === "portrait" || ratio === "9/16" || ratio === "4/5";
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

function youtubeSource(video) {
  const id = getYouTubeId(video);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : "";
}

function isVimeoMedia(item = {}) {
  return item.type === "vimeo" || Boolean(item.id && !item.type && !getYouTubeId(item));
}

function isLocalVideoMedia(item = {}) {
  const src = String(item.src || "");
  return item.type === "video" || Boolean(src.match(/\.(mp4|webm|mov)(\?.*)?$/i));
}

function isImageMedia(item = {}) {
  const src = item.src || item.poster || "";
  return item.type === "image" || Boolean(
    src &&
    !isLocalVideoMedia(item) &&
    !isVimeoMedia(item) &&
    !getYouTubeId(item) &&
    item.type !== "external" &&
    item.type !== "instagram"
  );
}

function getHeroMedia(caseData) {
  if (caseData.heroMedia) {
    const structuredHero = caseData.media?.hero;

    if (structuredHero && mediaKey(structuredHero) === mediaKey(caseData.heroMedia)) {
      return { ...structuredHero, ...caseData.heroMedia };
    }

    return caseData.heroMedia;
  }

  if (caseData.media?.hero) {
    return caseData.media.hero;
  }

  if (caseData.hero) {
    const src = caseData.hero.video || caseData.hero.heroVideo || caseData.hero.image || caseData.hero.sourceMediaUrl || caseData.hero.poster;

    if (src) {
      return {
        type: String(src).match(/\.(mp4|webm|mov)(\?.*)?$/i) ? "video" : "image",
        src,
        poster: caseData.hero.poster || caseData.hero.image,
        title: caseData.title,
        alt: `${caseData.client} projectbeeld`,
        orientation: caseData.hero.orientation || "landscape",
        aspectRatio: caseData.hero.aspectRatio || "16 / 9",
      };
    }
  }

  return null;
}

function getVideoItems(caseData) {
  const heroKey = mediaKey(getHeroMedia(caseData));
  const sectionVideos = (caseData.mediaSections || [])
    .flatMap((section) => section.items || [])
    .filter((item) => ["external", "instagram", "video", "vimeo", "youtube"].includes(item?.type) || item?.id);

  return uniqueMediaItems([
    ...(caseData.media?.landscapeVideos || []),
    ...(caseData.media?.verticalVideos || []),
    ...(caseData.vimeoEmbeds || []),
    ...(caseData.media?.vimeoEmbeds || []),
    ...sectionVideos,
  ]).filter(
    (item) =>
      item &&
      (item.id || item.src || item.url) &&
      (!heroKey || mediaKey(item) !== heroKey),
  );
}

function getGalleryGroups(caseData) {
  const groups = [];
  const seenMedia = new Set([mediaKey(getHeroMedia(caseData))].filter(Boolean));

  if (caseData.campaignImages?.length) {
    groups.push({
      eyebrow: caseData.campaignGalleryEyebrow,
      title: caseData.campaignGalleryTitle || "Campagnebeelden",
      images: caseData.campaignImages,
    });
  }

  if (caseData.imageGallery?.length) {
    groups.push({
      eyebrow: caseData.imageGalleryEyebrow,
      title: caseData.imageGalleryTitle || "Fotogalerij",
      images: caseData.imageGallery,
    });
  }

  (caseData.mediaSections || []).forEach((section) => {
    const images = (section.items || []).filter((item) => item?.type === "image" && item.src);

    if (images.length) {
      groups.push({
        eyebrow: section.title,
        title: section.title,
        images,
      });
    }
  });

  return groups
    .map((group) => ({
      ...group,
      images: uniqueMediaItems(group.images || []).filter((image) => {
        const key = mediaKey(image);

        if (!key || seenMedia.has(key)) {
          return false;
        }

        seenMedia.add(key);
        return true;
      }),
    }))
    .filter((group) => group.images.length);
}

function usePointerDepth() {
  const frameRef = useRef(0);

  useEffect(
    () => () => {
      window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const onPointerMove = (event) => {
    if (
      event.pointerType === "touch" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--case-depth-x", `${(-vertical * 3.2).toFixed(2)}deg`);
      element.style.setProperty("--case-depth-y", `${(horizontal * 3.2).toFixed(2)}deg`);
      element.style.setProperty("--case-depth-lift", "-3px");
    });
  };

  const onPointerLeave = (event) => {
    const element = event.currentTarget;

    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--case-depth-x", "0deg");
      element.style.setProperty("--case-depth-y", "0deg");
      element.style.setProperty("--case-depth-lift", "0px");
    });
  };

  return { onPointerLeave, onPointerMove };
}

function InteractiveFigure({ children, className = "", figureRef, ...figureProps }) {
  const pointerDepthProps = usePointerDepth();

  return (
    <figure
      {...figureProps}
      {...pointerDepthProps}
      className={`${styles.pointerDepth} ${className}`}
      ref={figureRef}
    >
      {children}
    </figure>
  );
}

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

function formatPlaybackTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function ChromelessVideo({ className = "", itemLabel, onOpen, showControls = false, video, ...figureProps }) {
  const figureRef = useRef(null);
  const iframeRef = useRef(null);
  const isPlayingRef = useRef(false);
  const lastAudibleVolumeRef = useRef(1);
  const sdkPlayerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const instanceId = useId().replaceAll(":", "");
  const playerId = `tarzan-chromeless-${video.id}-${instanceId}`;
  const src = cleanVimeoSource(video, playerId);

  useEffect(() => {
    const onOtherVimeoPlay = (event) => {
      if (event.detail?.playerId !== playerId) {
        sdkPlayerRef.current?.pause().catch(() => {});
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

      const eventData = data.data || {};

      if (data.event === "play") {
        isPlayingRef.current = true;
        setIsPlaying(true);
      }

      if (data.event === "pause" || data.event === "ended") {
        isPlayingRef.current = false;
        setIsPlaying(false);
      }

      if (data.event === "ended") {
        setCurrentTime(0);
      }

      if (data.event === "timeupdate") {
        setCurrentTime(Number(eventData.seconds) || 0);
        setDuration(Number(eventData.duration) || 0);
      }

      if (data.event === "volumechange") {
        const nextVolume = eventData.muted ? 0 : Number(eventData.volume);

        if (Number.isFinite(nextVolume)) {
          setVolume(nextVolume);

          if (nextVolume > 0) {
            lastAudibleVolumeRef.current = nextVolume;
          }
        }
      }

      if (data.event === "loaded") {
        sendVimeoCommand(iframeRef.current, "getDuration");
        sendVimeoCommand(iframeRef.current, "getVolume");
        sendVimeoCommand(iframeRef.current, "getPaused");
      }

      if (data.method === "getDuration") {
        setDuration(Number(data.value) || 0);
      }

      if (data.method === "getVolume") {
        const nextVolume = Number(data.value);

        if (Number.isFinite(nextVolume)) {
          setVolume(nextVolume);
        }
      }

      if (data.method === "getPaused") {
        const nextIsPlaying = data.value === false;
        isPlayingRef.current = nextIsPlaying;
        setIsPlaying(nextIsPlaying);
      }
    };

    window.addEventListener("case-vimeo-play", onOtherVimeoPlay);
    window.addEventListener("message", onVimeoMessage);
    return () => {
      sdkPlayerRef.current?.destroy().catch(() => {});
      sdkPlayerRef.current = null;
      window.removeEventListener("case-vimeo-play", onOtherVimeoPlay);
      window.removeEventListener("message", onVimeoMessage);
    };
  }, [playerId]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === figureRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const initializeCustomControls = async () => {
    const iframe = iframeRef.current;

    if (!iframe || sdkPlayerRef.current) {
      return;
    }

    try {
      const { default: VimeoPlayer } = await import("@vimeo/player");

      if (!iframe.isConnected || sdkPlayerRef.current) {
        return;
      }

      const player = new VimeoPlayer(iframe);
      sdkPlayerRef.current = player;

      player.on("play", () => {
        isPlayingRef.current = true;
        setIsPlaying(true);
      });
      player.on("pause", () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
      });
      player.on("ended", () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
        setCurrentTime(0);
      });
      player.on("timeupdate", ({ duration: nextDuration, seconds }) => {
        setCurrentTime(Number(seconds) || 0);
        setDuration(Number(nextDuration) || 0);
      });
      player.on("volumechange", ({ muted, volume: nextVolume }) => {
        const normalizedVolume = muted ? 0 : Number(nextVolume);

        if (Number.isFinite(normalizedVolume)) {
          setVolume(normalizedVolume);

          if (normalizedVolume > 0) {
            lastAudibleVolumeRef.current = normalizedVolume;
          }
        }
      });

      await player.ready();
      const [nextDuration, nextVolume, isPaused] = await Promise.all([
        player.getDuration(),
        player.getVolume(),
        player.getPaused(),
      ]);

      if (iframeRef.current !== iframe || !iframe.isConnected) {
        return;
      }

      setDuration(Number(nextDuration) || 0);
      setVolume(Number(nextVolume) || 0);
      isPlayingRef.current = !isPaused;
      setIsPlaying(!isPaused);
    } catch {
      sendVimeoCommand(iframe, "getDuration");
      sendVimeoCommand(iframe, "getVolume");
      sendVimeoCommand(iframe, "getPaused");
    }
  };

  const togglePlayback = () => {
    const iframe = iframeRef.current;

    if (isPlayingRef.current) {
      if (sdkPlayerRef.current) {
        sdkPlayerRef.current.pause().catch(() => sendVimeoCommand(iframe, "pause"));
      } else {
        sendVimeoCommand(iframe, "pause");
      }
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

    if (sdkPlayerRef.current) {
      sdkPlayerRef.current.play().catch(() => sendVimeoCommand(iframe, "play"));
    } else {
      sendVimeoCommand(iframe, "setVolume", 1);
      sendVimeoCommand(iframe, "play");
      window.setTimeout(() => sendVimeoCommand(iframe, "play"), 160);
    }
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

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value);

    if (!Number.isFinite(nextTime)) {
      return;
    }

    setCurrentTime(nextTime);
    if (sdkPlayerRef.current) {
      sdkPlayerRef.current
        .setCurrentTime(nextTime)
        .catch(() => sendVimeoCommand(iframeRef.current, "setCurrentTime", nextTime));
    } else {
      sendVimeoCommand(iframeRef.current, "setCurrentTime", nextTime);
    }
  };

  const toggleVolume = () => {
    const nextVolume = volume > 0 ? 0 : lastAudibleVolumeRef.current || 1;
    setVolume(nextVolume);
    if (sdkPlayerRef.current) {
      sdkPlayerRef.current
        .setVolume(nextVolume)
        .catch(() => sendVimeoCommand(iframeRef.current, "setVolume", nextVolume));
    } else {
      sendVimeoCommand(iframeRef.current, "setVolume", nextVolume);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (figureRef.current?.requestFullscreen) {
        await figureRef.current.requestFullscreen();
      } else {
        sendVimeoCommand(iframeRef.current, "requestFullscreen");
      }
    } catch {
      sendVimeoCommand(iframeRef.current, "requestFullscreen");
    }
  };

  if (!src) {
    return null;
  }

  if (showControls) {
    const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

    return (
      <InteractiveFigure
        {...figureProps}
        aria-label={itemLabel || video.title}
        className={`${styles.chromelessVideo} ${styles.chromelessVideoWithControls} ${className}`}
        figureRef={figureRef}
      >
        <div className={styles.chromelessVideoScreen}>
          <iframe
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            data-case-vimeo-player={playerId}
            loading="lazy"
            onLoad={initializeCustomControls}
            ref={iframeRef}
            src={src}
            title={video.title}
          />
        </div>

        {!isPlaying ? (
          <button
            aria-label={`Start video: ${video.title}`}
            className={styles.customVideoPrimaryPlay}
            onClick={togglePlayback}
            type="button"
          >
            <Icon name="play" size="lg" />
          </button>
        ) : null}

        <div aria-label={`Bediening voor ${video.title}`} className={styles.customVideoControls} role="group">
          <button
            aria-label={isPlaying ? `Pauzeer video: ${video.title}` : `Speel video: ${video.title}`}
            className={styles.customVideoControlButton}
            onClick={togglePlayback}
            type="button"
          >
            <Icon name={isPlaying ? "pause" : "play"} size="sm" />
          </button>

          <input
            aria-label={`Voortgang van ${video.title}`}
            className={styles.customVideoTimeline}
            max={duration || 0}
            min="0"
            onChange={handleSeek}
            step="0.1"
            style={{ "--video-progress": `${progress}%` }}
            type="range"
            value={Math.min(currentTime, duration || 0)}
          />

          <span aria-hidden="true" className={styles.customVideoTime}>
            {formatPlaybackTime(currentTime)} / {formatPlaybackTime(duration)}
          </span>

          <button
            aria-label={volume > 0 ? `Demp ${video.title}` : `Zet geluid aan voor ${video.title}`}
            aria-pressed={volume <= 0}
            className={styles.customVideoControlButton}
            onClick={toggleVolume}
            type="button"
          >
            <Icon name={volume > 0 ? "volume" : "volumeOff"} size="sm" />
          </button>

          <button
            aria-label={isFullscreen ? `Sluit volledig scherm voor ${video.title}` : `Toon ${video.title} op volledig scherm`}
            aria-pressed={isFullscreen}
            className={styles.customVideoControlButton}
            onClick={toggleFullscreen}
            type="button"
          >
            <Icon name="maximize" size="sm" />
          </button>
        </div>
      </InteractiveFigure>
    );
  }

  return (
    <InteractiveFigure
      {...figureProps}
      aria-label={itemLabel || video.title}
      className={`${styles.chromelessVideo} ${isPlaying ? styles.isPlaying : ""} ${className}`}
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
    </InteractiveFigure>
  );
}

function CaseMediaVisual({ className = "", client, item, priority = false, showControls = false }) {
  if (!item) {
    return null;
  }

  const title = item.title || item.caption || item.label || item.fallbackLabel || `${client} video`;
  const caption = item.hideCaption ? "" : title;

  if (isVimeoMedia(item) && item.id) {
    return (
      <ChromelessVideo
        className={className}
        itemLabel={title}
        showControls={showControls}
        video={{ ...item, title }}
      />
    );
  }

  if (getYouTubeId(item)) {
    return (
      <InteractiveFigure className={`${styles.chromelessVideo} ${className}`}>
        <div className={`${styles.chromelessVideoScreen} ${styles.chromelessVideoScreenNoAction}`}>
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading={priority ? "eager" : "lazy"}
            src={youtubeSource(item)}
            title={title}
          />
        </div>
        {caption ? (
          <figcaption>
            <span className={styles.chromelessTrigger}>{caption}</span>
          </figcaption>
        ) : null}
      </InteractiveFigure>
    );
  }

  if (item.type === "external" || item.type === "instagram") {
    return (
      <InteractiveFigure className={`${styles.chromelessVideo} ${styles.externalMedia} ${className}`}>
        <a
          aria-label={`Open ${title}`}
          className={styles.externalMediaLink}
          href={item.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className={styles.externalMediaLabel}>{item.fallbackLabel || title}</span>
          <span aria-hidden="true" className={styles.chromelessPlayButton}>
            <span />
          </span>
        </a>
      </InteractiveFigure>
    );
  }

  if (isLocalVideoMedia(item) && item.src) {
    return (
      <InteractiveFigure className={`${styles.chromelessVideo} ${className}`}>
        <div className={`${styles.chromelessVideoScreen} ${styles.chromelessVideoScreenNoAction}`}>
          <video
            aria-label={item.alt || title}
            controls
            playsInline
            poster={item.poster ? mediaPath(item.poster) : undefined}
            preload={priority || !item.poster ? "metadata" : "none"}
          >
            <source src={mediaPath(item.src)} type="video/mp4" />
          </video>
        </div>
        {caption ? (
          <figcaption>
            <span className={styles.chromelessTrigger}>{caption}</span>
          </figcaption>
        ) : null}
      </InteractiveFigure>
    );
  }

  if (isImageMedia(item)) {
    return (
      <InteractiveFigure className={`${styles.chromelessVideo} ${styles.imageFrame} ${className}`}>
        <div className={`${styles.chromelessVideoScreen} ${styles.chromelessVideoScreenNoAction}`}>
          <img
            alt={item.alt || title || `${client} projectbeeld`}
            decoding="async"
            loading={priority ? "eager" : "lazy"}
            src={mediaPath(item.src || item.poster)}
          />
        </div>
        {caption ? (
          <figcaption>
            <span className={styles.chromelessTrigger}>{caption}</span>
          </figcaption>
        ) : null}
      </InteractiveFigure>
    );
  }

  return null;
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
    const appRoot = document.getElementById("main-content");
    const previousInert = appRoot?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (appRoot) appRoot.inert = true;
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
      if (appRoot) appRoot.inert = previousInert;
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
  const blocks = (caseData.storyBlocks || caseData.introTextBlocks || [])
    .map((block) => (typeof block === "string" ? { text: block } : block))
    .filter((block) => textFrom(block));
  const heading = caseData.subtitle || caseData.oneLiner || caseData.intro || caseData.summary || caseData.introQuote;

  if (!blocks.length) {
    return null;
  }

  return (
    <section className={styles.story} aria-label="Case verhaal">
      <div className={styles.storyGrid}>
        {heading ? (
          <header className={`${styles.sectionIntro} ${styles.reveal}`}>
            <h2>{heading}</h2>
          </header>
        ) : null}

        <div className={`${styles.storyCopy} ${styles.reveal}`}>
          {blocks.map((block, index) => (
            <p key={`${textFrom(block).slice(0, 24)}-${index}`}>{textFrom(block)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function StaticProcessSection({ caseData }) {
  const isLierseCase = caseData.slug === "k-lierse-sk";
  const steps = useMemo(
    () => stepConfig
      .map((item) => {
        const block = caseData[item.key] || caseData[item.fallback];
        const stats = typeof block === "string" ? [] : block?.stats || [];

        if (!block && !stats.length) {
          return null;
        }

        return {
          ...item,
          label: typeof block === "string" ? item.label : block?.label || block?.title || item.label,
          text: textFrom(block),
          stats,
        };
      })
      .filter(Boolean)
      .filter((step) => step.text || step.stats.length),
    [caseData],
  );

  if (!steps.length) {
    return null;
  }

  return (
    <section
      aria-label={isLierseCase ? undefined : "Statische weergave van probleem, oplossing en resultaat"}
      aria-labelledby={isLierseCase ? "lierse-process-title" : undefined}
      className={`${styles.staticProcess} ${isLierseCase ? styles.lierseProcess : ""}`}
      id="proces-statisch-test"
    >
      {isLierseCase ? (
        <header className={`${styles.lierseSectionHeader} ${styles.reveal}`}>
          <h2 id="lierse-process-title">Aanpak</h2>
        </header>
      ) : null}

      <div className={styles.staticProcessGrid}>
        {steps.map((step, index) => (
          <article
            className={`${styles.staticProcessCard} ${isLierseCase ? styles.reveal : ""}`}
            key={step.key}
          >
            <div className={styles.staticProcessCardTop}>
              <span className={styles.staticProcessNumber}>
                {isLierseCase ? String(index + 1).padStart(2, "0") : index + 1}
              </span>
              <span
                aria-hidden="true"
                className={styles.staticProcessIcon}
                style={{ "--tarzan-service-icon": `url(${assetPath(step.icon)})` }}
              />
            </div>
            <h3>{step.label}</h3>
            {step.text ? <p>{step.text}</p> : null}
            {!isLierseCase && step.stats.length ? (
              <dl className={styles.staticProcessStats}>
                {step.stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function VideoSection({ caseData }) {
  const isLierseCase = caseData.slug === "k-lierse-sk";
  const videos = isLierseCase
    ? uniqueMediaItems([getHeroMedia(caseData), ...getVideoItems(caseData)].filter(Boolean))
    : getVideoItems(caseData);

  if (!videos.length) {
    return null;
  }

  if (isLierseCase) {
    return (
      <section
        className={`${styles.videos} ${styles.lierseVideos}`}
        aria-labelledby="tarzan-videos-title"
      >
        <div className={styles.videosInner}>
          <header className={`${styles.lierseVideoHeader} ${styles.reveal}`}>
            <h2 id="tarzan-videos-title">Content</h2>
          </header>

          <div className={`${styles.lierseVideoGrid} ${styles.reveal}`}>
            {videos.map((video, index) => {
              const isPortrait = isPortraitMedia(video);

              return (
                <article
                  className={`${styles.lierseVideoItem} ${isPortrait ? styles.lierseVideoItemPortrait : styles.lierseVideoItemLandscape}`}
                  key={`${mediaKey(video)}-${index}`}
                >
                  <header className={styles.lierseVideoMeta}>
                    <h3>{video.title}</h3>
                  </header>
                  <CaseMediaVisual
                    className={`${styles.lierseCaseVideo} ${isPortrait ? styles.lierseCaseVideoPortrait : styles.lierseCaseVideoLandscape}`}
                    client={caseData.client}
                    item={video}
                    showControls
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const rowClassName = [
    styles.phoneRow,
    styles.phoneRowMixed,
    videos.length === 1 ? styles.phoneRowSingle : "",
  ].filter(Boolean).join(" ");

  return (
    <section className={styles.videos} aria-labelledby="tarzan-videos-title">
      <div className={styles.videosInner}>
        <header className={`${styles.mediaHeading} ${styles.reveal}`}>
          <h2 id="tarzan-videos-title">Videogalerij</h2>
        </header>

        <div className={`${rowClassName} ${styles.reveal}`}>
          {videos.map((video, index) => (
            <CaseMediaVisual
              className={isPortraitMedia(video) ? styles.phoneVideo : styles.landscapeVideo}
              client={caseData.client}
              item={video}
              key={`${mediaKey(video)}-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ group }) {
  if (!group?.images?.length) {
    return null;
  }

  return (
    <section className={styles.gallery} aria-labelledby={`tarzan-${group.id}-title`}>
      <div className={styles.galleryInner}>
        <header className={`${styles.galleryHeading} ${styles.reveal}`}>
          <h2 id={`tarzan-${group.id}-title`}>{group.title}</h2>
        </header>

        <div className={`${styles.galleryGrid} ${styles.reveal}`}>
          {group.images.map((image, index) => (
            <InteractiveFigure
              className={image.orientation === "landscape" ? styles.galleryLandscape : ""}
              key={`${image.src}-${index}`}
            >
              <img alt={image.alt || group.title} loading="lazy" src={mediaPath(image.src || image.poster)} />
            </InteractiveFigure>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutroSection({ caseData }) {
  if (!caseData.outro || caseData.slug === "k-lierse-sk") {
    return null;
  }

  return (
    <section className={styles.closing} aria-label="Case afsluiting">
      <p>{caseData.outro}</p>
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

function ClosingSection({ caseData }) {
  const title = caseData.ctaTitle || "Durf jij een samenwerking aan te gaan?";

  if (caseData.ctaLinkOnly) {
    return (
      <section
        className={`${styles.cta} ${styles.ctaBlue} ${styles.ctaLinkOnly} ${caseData.ctaCard ? styles.ctaCard : ""}`}
        id="case-contact-cta"
        aria-label="Contact"
      >
        <h2>
          <a className={styles.ctaTitleLink} href={assetPath("/contact/")}>
            <span>{title}</span>
            <span className={styles.ctaTitleIcon} aria-hidden="true">
              <Icon name="arrowUpRight" size="lg" />
            </span>
          </a>
        </h2>
      </section>
    );
  }

  return (
    <section className={styles.cta} id="case-contact-cta" aria-label="Contact">
      <img
        alt=""
        aria-hidden="true"
        src={assetPath("/images/cases/visit-antwerpen/visit-antwerpen-megaphone-exact.png")}
      />
      <div>
        <h2>{title}</h2>
        <a className="button button--yellow" href={assetPath("/contact/")}>Eens afspreken?</a>
      </div>
    </section>
  );
}

export default function TarzanServicesCasePage({ caseData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroMedia = getHeroMedia(caseData);
  const galleryGroups = getGalleryGroups(caseData).map((group, index) => ({
    ...group,
    id: `gallery-${index + 1}`,
    key: `${group.title || "gallery"}-${index}`,
  }));
  const introText = caseData.introQuote || caseData.oneLiner || caseData.summary || caseData.intro;
  const heroIsPortrait = isPortraitMedia(heroMedia);
  const isLierseCase = caseData.slug === "k-lierse-sk";
  const [lierseGoalText = "", ...lierseGoalSuffix] = isLierseCase && introText
    ? introText.split(" ")
    : [];

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
      <div className={`site-shell ${isLierseCase ? styles.lierseShell : ""} ${menuOpen ? "menu-open" : ""}`}>
        <main className={`${styles.page} ${isLierseCase ? styles.liersePage : ""}`}>
          <a className={`hero__logo ${styles.logo}`} href={assetPath("/")} aria-label="Ami Amis home" />

          <section className={styles.hero} aria-labelledby="tarzan-services-title">
            <div
              className={`${styles.heroGrid} ${heroMedia ? "" : styles.heroGridTextOnly} ${heroIsPortrait ? styles.heroGridPortrait : ""}`}
            >
              <div className={styles.heroCopy}>
                {caseData.year ? <span className={styles.sectionNumber}>{caseData.year}</span> : null}
                <h1 id="tarzan-services-title">{caseData.title}</h1>
                {introText ? (
                  isLierseCase ? (
                    <p className={styles.lierseGoal}>
                      <span className="aa-visually-hidden">{introText}</span>
                      <span aria-hidden="true" className={styles.lierseGoalWave}>
                        {Array.from(lierseGoalText).map((character, index) => (
                          <span
                            className={styles.lierseGoalCharacter}
                            key={`${character}-${index}`}
                            style={{ "--lierse-goal-index": index }}
                          >
                            {character}
                          </span>
                        ))}
                      </span>
                      {lierseGoalSuffix.length ? (
                        <span aria-hidden="true" className={styles.lierseGoalIcons}>
                          {` ${lierseGoalSuffix.join(" ")}`}
                        </span>
                      ) : null}
                    </p>
                  ) : (
                    <p>{introText}</p>
                  )
                ) : null}
                {caseData.categories?.length ? (
                  <div className={styles.heroTags}>
                    {caseData.categories.map((category) => (
                      <span key={category}>{category}</span>
                    ))}
                  </div>
                ) : null}
              </div>

              <CaseMediaVisual
                className={`${styles.heroVideo} ${heroIsPortrait ? styles.heroVideoPortrait : styles.heroVideoLandscape}`}
                client={caseData.client}
                item={heroMedia}
                priority
                showControls={isLierseCase}
              />
            </div>
          </section>

          <StorySection caseData={caseData} />
          <StaticProcessSection caseData={caseData} />
          <VideoSection caseData={caseData} />
          {galleryGroups.map((group) => (
            <GallerySection group={group} key={group.key} />
          ))}
          <OutroSection caseData={caseData} />
          <ClosingSection caseData={caseData} />
        </main>
        <Footer variant="paper-flat" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay activePage="work" open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
