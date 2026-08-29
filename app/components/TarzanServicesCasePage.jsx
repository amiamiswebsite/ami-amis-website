"use client";

import { Fragment, useEffect, useId, useMemo, useRef, useState } from "react";
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

const ORIGINAL_EDITORIAL_CASE_SLUGS = new Set(["k-lierse-sk", "sint-jan-berchmanscollege"]);
const VISIT_ANTWERP_SLUGS = new Set(["visitantwerp", "visit-antwerpen"]);
const VIDEO_SHOWCASE_CASE_SLUGS = new Set(["imore", "tarzan-en-jane"]);

function usesModernCaseTemplate(caseData) {
  return Boolean(caseData?.slug);
}

function usesOriginalEditorialContent(caseData) {
  return ORIGINAL_EDITORIAL_CASE_SLUGS.has(caseData?.slug);
}

function isVisitAntwerpCase(caseData) {
  return VISIT_ANTWERP_SLUGS.has(caseData?.slug);
}

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

  if (item.instanceKey) {
    return [item.type || (item.id ? "vimeo" : "media"), item.id || item.src || item.url, item.instanceKey]
      .filter(Boolean)
      .join(":");
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
    const heroFallback = caseData.hero || {};
    const isPortraitHero = caseData.mediaType === "vertical-video-grid";

    return {
      ...caseData.media.hero,
      alt: caseData.media.hero.alt || `${caseData.client} projectbeeld`,
      aspectRatio:
        caseData.media.hero.aspectRatio ||
        heroFallback.aspectRatio ||
        (isPortraitHero ? "9 / 16" : "16 / 9"),
      orientation:
        caseData.media.hero.orientation ||
        heroFallback.orientation ||
        (isPortraitHero ? "portrait" : "landscape"),
      poster:
        caseData.media.hero.poster ||
        heroFallback.poster ||
        heroFallback.image ||
        heroFallback.sourceMediaUrl,
    };
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
    ...(caseData.media?.landscapeVideos || []).map((item) => ({
      aspectRatio: "16 / 9",
      orientation: "landscape",
      ...item,
    })),
    ...(caseData.media?.verticalVideos || []).map((item) => ({
      aspectRatio: "9 / 16",
      orientation: "portrait",
      ...item,
    })),
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

function getHeroGalleryVideo(caseData, heroMedia) {
  const heroKey = mediaKey(heroMedia);

  if (!heroKey) {
    return null;
  }

  return [
    ...(caseData.media?.verticalVideos || []),
    ...(caseData.media?.landscapeVideos || []),
    ...(caseData.vimeoEmbeds || []),
    ...(caseData.media?.vimeoEmbeds || []),
  ].find((item) => mediaKey(item) === heroKey);
}

function getGalleryGroups(caseData) {
  const groups = [];
  const seenMedia = new Set([mediaKey(getHeroMedia(caseData))].filter(Boolean));

  if (caseData.campaignImages?.length) {
    groups.push({
      eyebrow: caseData.campaignGalleryEyebrow,
      title: caseData.campaignGalleryTitle || "Campagnebeelden",
      type: caseData.campaignGalleryType,
      instagramProfile: caseData.instagramProfile,
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
    api: "1",
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
  const [hasStarted, setHasStarted] = useState(false);
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
        setHasStarted(true);
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
        setHasStarted(true);
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
    setHasStarted(true);
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
          {video.poster && !hasStarted ? (
            <img
              alt=""
              aria-hidden="true"
              className={styles.customVideoPoster}
              decoding="async"
              src={mediaPath(video.poster)}
            />
          ) : null}
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

        <div
          aria-label={`Bediening voor ${video.title}`}
          className={styles.customVideoControls}
          data-copy-ignore="true"
          role="group"
        >
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

function HeroIntroText({ onOpenVideo, text, videoLabel = "Zuidvideo" }) {
  if (!text?.includes(videoLabel)) {
    return <p>{text}</p>;
  }

  const parts = text.split(videoLabel);

  return (
    <p>
      {parts.map((part, index) => (
        <span key={`${part.slice(0, 16)}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <button className={styles.heroInlineVideoTrigger} onClick={onOpenVideo} type="button">
              <span>{videoLabel}</span>
              <span aria-hidden="true" className={styles.heroInlineVideoTriggerIcon}>
                <span />
              </span>
            </button>
          ) : null}
        </span>
      ))}
    </p>
  );
}

function IntroVideoModal({ onClose, video }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const iframeRef = useRef(null);
  const [useFallbackVideo, setUseFallbackVideo] = useState(false);
  const videoSrc = video?.id ? lightboxVimeoSource(video) : "";
  const fallbackSrc = video?.fallbackSrc || "";
  const videoTitle = video?.label || video?.title || "Zuidvideo";
  const orientationClass = isPortraitMedia(video)
    ? styles.mediaLightboxPortrait
    : styles.mediaLightboxLandscape;

  useEffect(() => {
    if (!videoSrc) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    closeButtonRef.current?.focus();
    document.body.classList.add("case-modal-open");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll("button, iframe, [href], [tabindex]:not([tabindex='-1'])"),
      ).filter((element) => !element.disabled);
      const firstElement = focusable[0];
      const lastElement = focusable.at(-1);

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("case-modal-open");
      previousActiveElement?.focus?.();
    };
  }, [onClose, videoSrc]);

  useEffect(() => {
    if (!videoSrc || !fallbackSrc) {
      return undefined;
    }

    let isVimeoReady = false;

    const fallbackTimer = window.setTimeout(() => {
      if (!isVimeoReady) {
        setUseFallbackVideo(true);
      }
    }, 2600);

    const handleVimeoMessage = (event) => {
      if (event.origin !== "https://player.vimeo.com" || event.source !== iframeRef.current?.contentWindow) {
        return;
      }

      let data = event.data;

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = {};
        }
      }

      if (["ready", "loaded", "play"].includes(data?.event)) {
        isVimeoReady = true;
        window.clearTimeout(fallbackTimer);
      }
    };

    window.addEventListener("message", handleVimeoMessage);
    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("message", handleVimeoMessage);
    };
  }, [fallbackSrc, videoSrc]);

  if (!videoSrc && !fallbackSrc) {
    return null;
  }

  return createPortal(
    <div
      className={`${styles.mediaLightbox} ${styles.introVideoLightbox}`}
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
        aria-label={`${videoTitle} bekijken`}
        aria-modal="true"
        className={`${styles.mediaLightboxDialog} ${styles.introVideoDialog}`}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div
          className={`${styles.mediaLightboxContent} ${orientationClass} ${styles.introVideoContent}`}
          data-media-lightbox-content
        >
          <button
            aria-label="Sluit video"
            className={`${styles.mediaLightboxClose} ${styles.introVideoClose}`}
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <span aria-hidden="true" className={styles.mediaLightboxCloseIcon} />
          </button>
          <div className={styles.mediaLightboxVisual}>
            {useFallbackVideo && fallbackSrc ? (
              <video
                autoPlay
                className={`${styles.mediaLightboxPlayer} ${styles.introVideoFallback}`}
                controls
                playsInline
                poster={video.poster ? mediaPath(video.poster) : undefined}
              >
                <source src={mediaPath(fallbackSrc)} type="video/mp4" />
              </video>
            ) : (
              <iframe
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                className={styles.mediaLightboxPlayer}
                ref={iframeRef}
                src={videoSrc}
                title={videoTitle}
              />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
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
  const heading = caseData.storyTitle || caseData.subtitle || caseData.oneLiner || caseData.intro || caseData.summary || caseData.introQuote;

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
  const usesModernTemplate = usesModernCaseTemplate(caseData);
  const steps = useMemo(
    () => stepConfig
      .map((item) => {
        const block = caseData[item.key] || caseData[item.fallback];
        const rawStats = typeof block === "string" ? [] : block?.stats || [];
        const stats = usesModernTemplate ? [] : rawStats;

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
    [caseData, usesModernTemplate],
  );

  if (!steps.length) {
    return null;
  }

  return (
    <section
      aria-label={usesModernTemplate ? undefined : "Statische weergave van probleem, oplossing en resultaat"}
      aria-labelledby={usesModernTemplate ? "lierse-process-title" : undefined}
      className={`${styles.staticProcess} ${usesModernTemplate ? styles.lierseProcess : ""}`}
      id="proces-statisch-test"
    >
      {usesModernTemplate ? (
        <header className={`${styles.lierseSectionHeader} ${styles.reveal}`}>
          <h2 id="lierse-process-title">Aanpak</h2>
        </header>
      ) : null}

      <div className={styles.staticProcessGrid}>
        {steps.map((step, index) => (
          <article
            className={`${styles.staticProcessCard} ${usesModernTemplate ? styles.reveal : ""}`}
            key={step.key}
          >
            <div className={styles.staticProcessCardTop}>
              <span className={styles.staticProcessNumber}>
                {usesModernTemplate ? String(index + 1).padStart(2, "0") : index + 1}
              </span>
              <span
                aria-hidden="true"
                className={styles.staticProcessIcon}
                style={{ "--tarzan-service-icon": `url(${assetPath(step.icon)})` }}
              />
            </div>
            <h3>{step.label}</h3>
            {step.text ? <p>{step.text}</p> : null}
            {step.stats.length ? (
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
  const usesModernTemplate = usesModernCaseTemplate(caseData);
  const usesOriginalEditorialLayout = usesOriginalEditorialContent(caseData);
  const usesVideoShowcaseLayout = VIDEO_SHOWCASE_CASE_SLUGS.has(caseData.slug) && !usesOriginalEditorialLayout;
  const heroMedia = getHeroMedia(caseData);
  const heroIsVideo = isVimeoMedia(heroMedia) || isLocalVideoMedia(heroMedia) || Boolean(getYouTubeId(heroMedia));
  const baseVideos = usesOriginalEditorialLayout
    ? uniqueMediaItems([...(heroIsVideo ? [heroMedia] : []), ...getVideoItems(caseData)].filter(Boolean))
    : getVideoItems(caseData);
  const heroGallerySource = usesVideoShowcaseLayout && heroIsVideo
    ? getHeroGalleryVideo(caseData, heroMedia) || heroMedia
    : null;
  const heroGalleryVideo = heroGallerySource
    ? {
        ...heroMedia,
        ...heroGallerySource,
        aspectRatio:
          caseData.slug === "imore"
            ? "9 / 16"
            : heroGallerySource.aspectRatio || heroMedia.aspectRatio || "16 / 9",
        orientation:
          caseData.slug === "imore"
            ? "portrait"
            : heroGallerySource.orientation || heroMedia.orientation || "landscape",
      }
    : null;
  const videos = heroGalleryVideo && !usesOriginalEditorialLayout
    ? uniqueMediaItems([...baseVideos, heroGalleryVideo])
    : baseVideos;

  if (!videos.length) {
    return null;
  }

  if (usesModernTemplate) {
    const contentIntroBlocks = (caseData.contentIntroBlocks || [])
      .map((block) => textFrom(block))
      .filter(Boolean);
    const sectionTitle = caseData.contentTitle === false
      ? ""
      : caseData.contentTitle || (usesOriginalEditorialLayout ? "Content" : "Videogalerij");
    const showcaseLeadIndex = usesVideoShowcaseLayout
      ? videos.findIndex((video) => !isPortraitMedia(video))
      : -1;
    const showcaseLeadVideo = showcaseLeadIndex >= 0 ? videos[showcaseLeadIndex] : null;
    const showcaseSliderVideos = usesVideoShowcaseLayout
      ? videos.filter((_, index) => index !== showcaseLeadIndex)
      : [];
    const renderVideoArticle = (video, index, extraClassName = "") => {
      const isPortrait = isPortraitMedia(video);

      return (
        <article
          className={[
            styles.lierseVideoItem,
            isPortrait ? styles.lierseVideoItemPortrait : styles.lierseVideoItemLandscape,
            extraClassName,
          ].filter(Boolean).join(" ")}
          key={`${mediaKey(video)}-${index}`}
        >
          {video.title ? (
            <header className={styles.lierseVideoMeta}>
              <h3>{video.title}</h3>
            </header>
          ) : null}
          <CaseMediaVisual
            className={`${styles.lierseCaseVideo} ${isPortrait ? styles.lierseCaseVideoPortrait : styles.lierseCaseVideoLandscape}`}
            client={caseData.client}
            item={video}
            showControls
          />
        </article>
      );
    };

    return (
      <section
        className={`${styles.videos} ${styles.lierseVideos}`}
        aria-label={sectionTitle ? undefined : "Video's"}
        aria-labelledby={sectionTitle ? "tarzan-videos-title" : undefined}
      >
        <div className={styles.videosInner}>
          {sectionTitle || contentIntroBlocks.length ? (
            <header className={`${styles.lierseVideoHeader} ${styles.reveal}`}>
              {sectionTitle ? <h2 id="tarzan-videos-title">{sectionTitle}</h2> : null}
              {contentIntroBlocks.length ? (
                <div className={styles.lierseVideoIntro}>
                  {contentIntroBlocks.map((paragraph, index) => (
                    <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </header>
          ) : null}

          <div className={`${styles.lierseVideoGrid} ${usesVideoShowcaseLayout ? styles.showcaseVideoGrid : ""} ${styles.reveal}`}>
            {usesVideoShowcaseLayout ? (
              <>
                {showcaseLeadVideo ? renderVideoArticle(showcaseLeadVideo, showcaseLeadIndex, styles.showcaseLeadVideo) : null}
                {showcaseSliderVideos.length ? (
                  <div className={styles.showcaseVideoSlider} aria-label={`${caseData.client} video slider`}>
                    {showcaseSliderVideos.map((video, index) =>
                      renderVideoArticle(video, index, styles.showcaseVideoSliderItem),
                    )}
                  </div>
                ) : null}
              </>
            ) : (
              videos.map((video, index) => renderVideoArticle(video, index))
            )}
          </div>

          {caseData.contentImages?.length ? (
            <EditorialMediaGrid
              images={caseData.contentImages}
              label={`${caseData.client} behind the scenes`}
              layout={caseData.contentMediaLayout}
            />
          ) : null}
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

function PosterSeriesCarousel({ images, label }) {
  const scrollerRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const itemsPerPageRef = useRef(3);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const pages = useMemo(() => {
    const nextPages = [];

    for (let index = 0; index < images.length; index += itemsPerPage) {
      nextPages.push({
        images: images.slice(index, index + itemsPerPage),
        startIndex: index,
      });
    }

    return nextPages;
  }, [images, itemsPerPage]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      let nextItemsPerPage = 3;

      if (window.matchMedia("(max-width: 640px)").matches) {
        nextItemsPerPage = 1;
      } else if (window.matchMedia("(max-width: 900px)").matches) {
        nextItemsPerPage = 2;
      }

      if (nextItemsPerPage === itemsPerPageRef.current) {
        return;
      }

      itemsPerPageRef.current = nextItemsPerPage;
      setItemsPerPage(nextItemsPerPage);
      setActivePage(0);
      scrollerRef.current?.scrollTo({ left: 0, behavior: "auto" });
    };

    const initialFrame = window.requestAnimationFrame(updateItemsPerPage);
    window.addEventListener("resize", updateItemsPerPage, { passive: true });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(
    () => () => {
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  const scrollToPage = (nextPage) => {
    const scroller = scrollerRef.current;
    const safePage = Math.max(0, Math.min(nextPage, pages.length - 1));
    const target = scroller?.querySelector(`[data-poster-page="${safePage}"]`);

    if (!scroller || !target) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({ left: target.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const handleScroll = () => {
    if (scrollFrameRef.current) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      const slides = Array.from(scroller?.querySelectorAll("[data-poster-page]") || []);

      if (!scroller || !slides.length) {
        return;
      }

      const closestPage = slides.reduce((closest, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - scroller.scrollLeft);
        return distance < closest.distance ? { distance, index } : closest;
      }, { distance: Number.POSITIVE_INFINITY, index: 0 });

      setActivePage(closestPage.index);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    scrollToPage(activePage + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <div className={`${styles.editorialPosterCarousel} ${styles.reveal}`}>
      <div
        aria-label={`${label}, ${images.length} campagnebeelden`}
        aria-roledescription="carousel"
        className={styles.editorialPosterViewport}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        ref={scrollerRef}
        role="region"
        tabIndex={0}
      >
        <div className={styles.editorialPosterTrack}>
          {pages.map((page, pageIndex) => (
            <div
              aria-label={`Campagnebeelden ${page.startIndex + 1} tot ${page.startIndex + page.images.length} van ${images.length}`}
              className={styles.editorialPosterSlide}
              data-poster-count={page.images.length}
              data-poster-page={pageIndex}
              key={page.images[0].src}
              role="group"
            >
              {page.images.map((image, imageIndex) => (
                <InteractiveFigure
                  className={styles.editorialPosterFigure}
                  key={`${image.src}-${imageIndex}`}
                >
                  <img
                    alt={image.alt || label}
                    decoding="async"
                    height={image.height}
                    loading="lazy"
                    src={mediaPath(image.src || image.poster)}
                    width={image.width}
                  />
                </InteractiveFigure>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.editorialPosterControls}>
        <p aria-atomic="true" aria-live="polite" className={styles.editorialPosterCounter}>
          <strong>{activePage + 1}</strong>
          <span>/{pages.length}</span>
        </p>
        <div className={styles.editorialPosterButtons}>
          <button
            aria-label="Vorige campagnebeelden"
            disabled={activePage === 0}
            onClick={() => scrollToPage(activePage - 1)}
            type="button"
          >
            <Icon name="chevronLeft" />
          </button>
          <button
            aria-label="Volgende campagnebeelden"
            disabled={activePage === pages.length - 1}
            onClick={() => scrollToPage(activePage + 1)}
            type="button"
          >
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EditorialMediaGrid({ images = [], label, layout }) {
  if (!images.length) {
    return null;
  }

  const isPosterSeries = layout === "poster-series";
  const isLandscapeShowcase = layout === "landscape-showcase";
  const isPhotoTriptych = layout === "photo-triptych";

  if (isPosterSeries) {
    return <PosterSeriesCarousel images={images} label={label} />;
  }

  return (
    <div
      aria-label={label}
      className={`${styles.editorialMediaGrid} ${
        isLandscapeShowcase ? styles.editorialLandscapeShowcase : ""
      } ${
        isPhotoTriptych ? styles.editorialPhotoTriptych : ""
      } ${styles.reveal}`}
      data-count={Math.min(images.length, 4)}
      role="group"
    >
      {images.map((image, index) => {
        const imageElement = (
          <img
            alt={image.alt || label}
            decoding="async"
            height={image.height}
            loading="lazy"
            src={mediaPath(image.src || image.poster)}
            width={image.width}
          />
        );

        return (
          <InteractiveFigure
            className={[
              image.contain ? styles.editorialMediaContain : "",
              image.orientation === "portrait" ? styles.editorialMediaPortrait : "",
            ].filter(Boolean).join(" ")}
            key={`${image.src}-${index}`}
          >
            {image.href ? (
              <a
                aria-label={image.actionLabel || `Open ${image.alt || label}`}
                className={styles.editorialMediaLink}
                href={image.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {imageElement}
                <span aria-hidden="true" className={styles.editorialMediaCue}>
                  <Icon name="link" size="md" />
                </span>
              </a>
            ) : (
              imageElement
            )}
          </InteractiveFigure>
        );
      })}
    </div>
  );
}

function EditorialVideoGrid({ client, label, videos = [] }) {
  if (!videos.length) {
    return null;
  }

  return (
    <div
      aria-label={label}
      className={`${styles.lierseVideoGrid} ${styles.editorialVideoGrid} ${styles.reveal}`}
      role="group"
    >
      {videos.map((video, index) => {
        const isPortrait = isPortraitMedia(video);

        return (
          <article
            className={`${styles.lierseVideoItem} ${isPortrait ? styles.lierseVideoItemPortrait : styles.lierseVideoItemLandscape}`}
            key={`${mediaKey(video)}-${index}`}
          >
            {video.title ? (
              <header className={styles.lierseVideoMeta}>
                <h3>{video.title}</h3>
              </header>
            ) : null}
            <CaseMediaVisual
              className={`${styles.lierseCaseVideo} ${isPortrait ? styles.lierseCaseVideoPortrait : styles.lierseCaseVideoLandscape}`}
              client={client}
              item={video}
              showControls
            />
          </article>
        );
      })}
    </div>
  );
}

function EditorialSections({ caseData }) {
  const sections = (caseData.editorialSections || []).filter(
    (section) => section?.title && ((section.paragraphs || []).length || (section.images || []).length || (section.videos || []).length),
  );

  if (!sections.length) {
    return null;
  }

  const themeClasses = {
    blue: styles.editorialSectionBlue,
    paper: styles.editorialSectionPaper,
    yellow: styles.editorialSectionYellow,
  };

  return sections.map((section, index) => {
    const linkedImage = (section.images || []).find((image) => image.href);
    const isLaterWordIkSection = section.title === "‘Later word ik’-campagne";
    const hasRedTitle = isLaterWordIkSection || section.title === "Fotografie";

    return (
      <section
        className={`${styles.editorialSection} ${themeClasses[section.theme] || styles.editorialSectionPaper}`}
        key={`${section.title}-${index}`}
        style={{ "--editorial-layer": sections.length - index }}
      >
        <div className={styles.editorialSectionInner}>
          <div className={`${styles.editorialSectionHeader} ${styles.reveal}`}>
            <div
              className={`${styles.editorialSectionTitle} ${hasRedTitle ? styles.editorialSectionTitleRed : ""}`}
            >
              <h2>
                {isLaterWordIkSection ? (
                  <>
                    <span className={styles.editorialTitlePhrase}>‘Later word ik’</span>
                    -campagne
                  </>
                ) : (
                  section.title
                )}
              </h2>
              {linkedImage ? (
                <a
                  aria-label={linkedImage.actionLabel || `Open ${linkedImage.alt || section.title}`}
                  className={styles.editorialSectionAction}
                  href={linkedImage.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon name="arrowUpRight" size="lg" />
                </a>
              ) : null}
            </div>
            <div className={styles.editorialSectionCopy}>
              {(section.paragraphs || []).map((paragraph, paragraphIndex) => (
                <p key={`${paragraph.slice(0, 24)}-${paragraphIndex}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <EditorialMediaGrid
            images={section.images}
            label={section.title}
            layout={section.mediaLayout}
          />
          <EditorialVideoGrid client={caseData.client} label={section.title} videos={section.videos} />
        </div>
      </section>
    );
  });
}

function GallerySection({ group, index, total }) {
  if (!group?.images?.length) {
    return null;
  }

  const isPaperTheme = index % 2 === 1;

  return (
    <section
      className={`${styles.gallery} ${styles.modernGallery} ${isPaperTheme ? styles.modernGalleryPaper : styles.modernGalleryBlue}`}
      aria-labelledby={`tarzan-${group.id}-title`}
      style={{ "--modern-gallery-layer": total - index }}
    >
      <div className={styles.galleryInner}>
        <header className={`${styles.galleryHeading} ${styles.reveal}`}>
          <h2 id={`tarzan-${group.id}-title`}>{group.title}</h2>
        </header>

        {group.type === "instagramProfile" ? (
          <InstagramProfilePreview group={group} />
        ) : (
          <div
            className={`${styles.galleryGrid} ${styles.reveal}`}
            data-count={Math.min(group.images.length, 6)}
          >
            {group.images.map((image, index) => (
              <InteractiveFigure
                className={image.orientation === "landscape" ? styles.galleryLandscape : ""}
                key={`${image.src}-${index}`}
              >
                <img alt={image.alt || group.title} loading="lazy" src={mediaPath(image.src || image.poster)} />
              </InteractiveFigure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function InstagramProfilePreview({ group }) {
  const profile = group.instagramProfile || {};
  const profileUrl = profile.url || "#";
  const handle = profile.handle || "instagram";
  const handleParts = handle.split(".");
  const posts = (group.images || []).slice(0, 6);

  return (
    <a
      aria-label={`Open ${handle} op Instagram`}
      className={`${styles.instagramProfilePreview} ${styles.reveal}`}
      href={profileUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className={styles.instagramProfileHeader}>
        <div className={styles.instagramAvatar} aria-hidden="true">
          <strong>humgy</strong>
          <span>cowork space</span>
        </div>
        <div className={styles.instagramProfileMeta}>
          <div className={styles.instagramProfileHandleRow}>
            <p className={styles.instagramHandle} aria-label={`@${handle}`}>
              @{handleParts.map((part, index) => (
                <Fragment key={`${part}-${index}`}>
                  {part}
                  {index < handleParts.length - 1 ? (
                    <>
                      .
                      <wbr />
                    </>
                  ) : null}
                </Fragment>
              ))}
            </p>
            <span className={styles.instagramOpenCue} aria-hidden="true">
              <Icon name="arrowUpRight" size="md" />
            </span>
          </div>
          {profile.stats?.length ? (
            <div className={styles.instagramStats} aria-label="Humgy Instagram kernpunten">
              {profile.stats.map((stat) => (
                <span key={stat}>{stat}</span>
              ))}
            </div>
          ) : null}
          {profile.bio ? <p className={styles.instagramBio}>{profile.bio}</p> : null}
        </div>
      </div>

      {profile.highlights?.length ? (
        <div className={styles.instagramHighlights} aria-label="Instagram highlights">
          {profile.highlights.map((highlight, index) => (
            <span key={highlight}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {highlight}
            </span>
          ))}
        </div>
      ) : null}

      <div className={styles.instagramFeedGrid}>
        {posts.map((post, index) => (
          <figure key={`${post.src}-${index}`}>
            <img alt={post.alt || group.title} loading="lazy" src={mediaPath(post.src || post.poster)} />
            {post.type === "reel" ? (
              <span className={styles.instagramReelCue} aria-hidden="true">
                <Icon name="play" size="sm" />
              </span>
            ) : null}
          </figure>
        ))}
      </div>
    </a>
  );
}

function OutroSection({ caseData }) {
  if (!caseData.outro || !isVisitAntwerpCase(caseData)) {
    return null;
  }

  return (
    <section className={`${styles.closing} ${styles.modernClosing}`} aria-label="Case afsluiting">
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
  const title = caseData.ctaTitle || "DURF JIJ SAMEN TE WERKEN?";
  const usesModernTemplate = usesModernCaseTemplate(caseData);

  if (usesModernTemplate || caseData.ctaLinkOnly) {
    return (
      <section
        className={`${styles.cta} ${styles.ctaBlue} ${styles.ctaLinkOnly} ${usesModernTemplate || caseData.ctaCard ? styles.ctaCard : ""}`}
        id="case-contact-cta"
        aria-label="Contact"
      >
        <h2>
          <a className={styles.ctaTitleLink} href={assetPath("/contact/")}>
            <span className={styles.ctaTitleCopy}>
              <span>{title}</span>
            </span>
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
  const [introVideoOpen, setIntroVideoOpen] = useState(false);
  const heroMedia = getHeroMedia(caseData);
  const galleryGroups = getGalleryGroups(caseData).map((group, index) => ({
    ...group,
    id: `gallery-${index + 1}`,
    key: `${group.title || "gallery"}-${index}`,
  }));
  const introText = caseData.introQuote || caseData.oneLiner || caseData.summary || caseData.intro;
  const heroIsPortrait = isPortraitMedia(heroMedia);
  const isLierseCase = caseData.slug === "k-lierse-sk";
  const isSjbCase = caseData.slug === "sint-jan-berchmanscollege";
  const isImoreCase = caseData.slug === "imore";
  const isVisitCase = isVisitAntwerpCase(caseData);
  const isVideoShowcaseCase = VIDEO_SHOWCASE_CASE_SLUGS.has(caseData.slug);
  const introVideo = isVisitCase && introText?.includes("Zuidvideo") ? caseData.media?.zuidVideo : null;
  const usesModernTemplate = usesModernCaseTemplate(caseData);
  const heroTitleLength = String(caseData.title || "").replace(/\s+/g, " ").trim().length;
  const heroTitleClass = heroTitleLength > 52
    ? styles.heroTitleCompact
    : heroTitleLength > 34
      ? styles.heroTitleLong
      : "";
  const heroPageClass = heroTitleLength > 52 ? styles.compactHeroPage : "";
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
      <div className={`site-shell ${usesModernTemplate ? styles.lierseShell : ""} ${menuOpen ? "menu-open" : ""}`}>
        <main
          className={`${styles.page} ${usesModernTemplate ? styles.liersePage : ""} ${isSjbCase ? styles.sjbPage : ""} ${isImoreCase ? styles.imorePage : ""} ${isVideoShowcaseCase ? styles.videoShowcasePage : ""} ${heroPageClass}`}
        >
          <a
            className={`hero__logo ${styles.logo} ${isSjbCase ? styles.sjbLogo : ""}`}
            href={assetPath("/")}
            aria-label="Ami Amis home"
          />

          <section className={styles.hero} aria-labelledby="tarzan-services-title">
            <div
              className={`${styles.heroGrid} ${heroMedia ? "" : styles.heroGridTextOnly} ${heroIsPortrait ? styles.heroGridPortrait : ""}`}
            >
              <div className={styles.heroCopy}>
                {caseData.year ? <span className={styles.sectionNumber}>{caseData.year}</span> : null}
                <h1 className={heroTitleClass} id="tarzan-services-title">
                  <span className={styles.heroTitleHighlight}>{caseData.title}</span>
                </h1>
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
                  ) : introVideo ? (
                    <HeroIntroText
                      onOpenVideo={() => setIntroVideoOpen(true)}
                      text={introText}
                    />
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
                showControls={usesModernTemplate}
              />
            </div>
          </section>

          <StorySection caseData={caseData} />
          {caseData.videoSectionPlacement === "before-process" ? <VideoSection caseData={caseData} /> : null}
          <StaticProcessSection caseData={caseData} />
          {caseData.videoSectionPlacement === "before-process" ? null : <VideoSection caseData={caseData} />}
          <EditorialSections caseData={caseData} />
          {galleryGroups.map((group, index) => (
            <GallerySection
              group={group}
              index={index}
              key={group.key}
              total={galleryGroups.length}
            />
          ))}
          <OutroSection caseData={caseData} />
          <ClosingSection caseData={caseData} />
        </main>
        <Footer variant="paper-flat" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay activePage="work" open={menuOpen} onClose={() => setMenuOpen(false)} />
      {introVideoOpen && introVideo ? (
        <IntroVideoModal onClose={() => setIntroVideoOpen(false)} video={introVideo} />
      ) : null}
    </>
  );
}
