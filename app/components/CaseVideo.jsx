"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";
import styles from "./CaseVideo.module.css";
import Icon from "./ui/Icon";

const CONTROLS_HIDE_DELAY = 2200;
const FEEDBACK_DURATION = 520;
const PLAYBACK_TICK = 250;
const CASE_VIDEO_PLAY_EVENT = "ami-amis:case-video-play";

let youtubeApiPromise;

function mediaPath(src) {
  if (!src) return "";
  const source = String(src);
  return /^(?:https?:|data:|blob:)/i.test(source) ? source : assetPath(source);
}

function getYouTubeId(video) {
  if (!video) return "";
  if (video.type === "youtube" && video.id) return String(video.id);

  const url = String(video.url || video.src || "");
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube(?:-nocookie)?\.com\/embed\/)([A-Za-z0-9_-]+)/,
  );
  return match?.[1] || "";
}

function getVideoProvider(video) {
  if (getYouTubeId(video)) return "youtube";

  const source = String(video?.src || "");
  if (video?.type === "video" || /\.(?:mp4|webm|mov)(?:[?#].*)?$/i.test(source)) {
    return "local";
  }

  if (video?.type === "vimeo" || video?.id) return "vimeo";
  return "";
}

function getVimeoSource(video, playerId) {
  if (!video?.id) return "";

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

  if (video.hash || video.h) params.set("h", video.hash || video.h);
  params.set("player_id", playerId);
  return `https://player.vimeo.com/video/${video.id}?${params.toString()}`;
}

function getYouTubeSource(video) {
  const id = getYouTubeId(video);
  if (!id) return "";

  const params = new URLSearchParams({
    autoplay: "0",
    controls: "0",
    disablekb: "1",
    enablejsapi: "1",
    fs: "1",
    iv_load_policy: "3",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
  });

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    const timeout = window.setTimeout(() => reject(new Error("YouTube API timed out")), 15000);

    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      window.clearTimeout(timeout);
      resolve(window.YT);
    };

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.youtube.com/iframe_api";
    script.addEventListener("error", () => {
      window.clearTimeout(timeout);
      reject(new Error("YouTube API failed to load"));
    });
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

function formatPlaybackTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export default function CaseVideo({
  className = "",
  poster,
  priority = false,
  variant = "hero",
  video,
}) {
  const figureRef = useRef(null);
  const iframeRef = useRef(null);
  const localVideoRef = useRef(null);
  const playerPromiseRef = useRef(null);
  const isMountedRef = useRef(true);
  const hasStartedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const lastAudibleVolumeRef = useRef(1);
  const controlsTimerRef = useRef(0);
  const feedbackTimerRef = useRef(0);
  const playbackTimerRef = useRef(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [volume, setVolume] = useState(1);
  const instanceId = useId().replaceAll(":", "");
  const provider = getVideoProvider(video);
  const playerId = `case-video-${provider}-${video?.id || instanceId}-${instanceId}`;
  const source = provider === "vimeo"
    ? getVimeoSource(video, playerId)
    : provider === "youtube"
      ? getYouTubeSource(video)
      : mediaPath(video?.src);
  const resolvedPoster = mediaPath(
    poster ||
      video?.poster ||
      (provider === "youtube" ? `https://i.ytimg.com/vi/${getYouTubeId(video)}/hqdefault.jpg` : ""),
  );

  const clearControlsTimer = useCallback(() => {
    window.clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = 0;
  }, []);

  const clearPlaybackTimer = useCallback(() => {
    window.clearInterval(playbackTimerRef.current);
    playbackTimerRef.current = 0;
  }, []);

  const scheduleControlsHide = useCallback(
    (delay = CONTROLS_HIDE_DELAY) => {
      clearControlsTimer();
      if (!isPlayingRef.current) return;

      controlsTimerRef.current = window.setTimeout(() => {
        if (isMountedRef.current && isPlayingRef.current) setControlsVisible(false);
      }, delay);
    },
    [clearControlsTimer],
  );

  const revealControls = useCallback(() => {
    if (!hasStartedRef.current) return;
    setControlsVisible(true);
    scheduleControlsHide();
  }, [scheduleControlsHide]);

  const showFeedback = useCallback((iconName) => {
    window.clearTimeout(feedbackTimerRef.current);
    setFeedback({ iconName, key: `${iconName}-${Date.now()}` });
    feedbackTimerRef.current = window.setTimeout(() => {
      if (isMountedRef.current) setFeedback(null);
    }, FEEDBACK_DURATION);
  }, []);

  const markPlaying = useCallback(() => {
    if (!isMountedRef.current) return;

    hasStartedRef.current = true;
    isPlayingRef.current = true;
    setHasStarted(true);
    setIsPlaying(true);
    setIsStarting(false);
    setControlsVisible(true);
    scheduleControlsHide();
    window.dispatchEvent(new CustomEvent(CASE_VIDEO_PLAY_EVENT, { detail: { playerId } }));
  }, [playerId, scheduleControlsHide]);

  const markPaused = useCallback(() => {
    if (!isMountedRef.current) return;

    isPlayingRef.current = false;
    setIsPlaying(false);
    setIsStarting(false);
    clearControlsTimer();
    clearPlaybackTimer();
    setControlsVisible(true);
  }, [clearControlsTimer, clearPlaybackTimer]);

  const markEnded = useCallback(() => {
    markPaused();
    setCurrentTime(0);
  }, [markPaused]);

  const syncTime = useCallback((seconds, nextDuration) => {
    if (!isMountedRef.current) return;
    setCurrentTime(Number(seconds) || 0);
    setDuration(Number(nextDuration) || 0);
  }, []);

  const syncVolume = useCallback((nextVolume, muted = false) => {
    if (!isMountedRef.current) return;

    const normalizedVolume = muted ? 0 : Number(nextVolume);
    if (!Number.isFinite(normalizedVolume)) return;

    setVolume(normalizedVolume);
    if (normalizedVolume > 0) lastAudibleVolumeRef.current = normalizedVolume;
  }, []);

  const ensurePlayer = useCallback(async () => {
    if (playerPromiseRef.current) return playerPromiseRef.current;

    if (provider === "vimeo") {
      if (!iframeRef.current) throw new Error("Vimeo frame is not mounted");

      const iframe = iframeRef.current;
      playerPromiseRef.current = import("@vimeo/player").then(async ({ default: VimeoPlayer }) => {
        const player = new VimeoPlayer(iframe);

        player.on("play", markPlaying);
        player.on("pause", markPaused);
        player.on("ended", markEnded);
        player.on("timeupdate", ({ duration: nextDuration, seconds }) => syncTime(seconds, nextDuration));
        player.on("volumechange", ({ muted, volume: nextVolume }) => syncVolume(nextVolume, muted));
        player.on("fullscreenchange", ({ fullscreen }) => {
          if (isMountedRef.current) setIsFullscreen(Boolean(fullscreen));
        });

        await player.ready();
        const [nextDuration, nextVolume, paused] = await Promise.all([
          player.getDuration(),
          player.getVolume(),
          player.getPaused(),
        ]);

        if (isMountedRef.current) {
          setDuration(Number(nextDuration) || 0);
          syncVolume(nextVolume);
          isPlayingRef.current = !paused;
          setIsPlaying(!paused);
        }

        return player;
      });
    } else if (provider === "local") {
      const element = localVideoRef.current;
      if (!element) throw new Error("Local video is not mounted");

      const handleTimeUpdate = () => syncTime(element.currentTime, element.duration);
      const handleVolumeChange = () => syncVolume(element.volume, element.muted);
      const handleLoadedMetadata = () => syncTime(element.currentTime, element.duration);
      element.addEventListener("play", markPlaying);
      element.addEventListener("pause", markPaused);
      element.addEventListener("ended", markEnded);
      element.addEventListener("timeupdate", handleTimeUpdate);
      element.addEventListener("volumechange", handleVolumeChange);
      element.addEventListener("loadedmetadata", handleLoadedMetadata);

      playerPromiseRef.current = Promise.resolve({
        destroy() {
          element.removeEventListener("play", markPlaying);
          element.removeEventListener("pause", markPaused);
          element.removeEventListener("ended", markEnded);
          element.removeEventListener("timeupdate", handleTimeUpdate);
          element.removeEventListener("volumechange", handleVolumeChange);
          element.removeEventListener("loadedmetadata", handleLoadedMetadata);
        },
        getDuration: async () => Number(element.duration) || 0,
        getPaused: async () => element.paused,
        getVolume: async () => (element.muted ? 0 : element.volume),
        pause: async () => element.pause(),
        play: () => element.play(),
        requestFullscreen: async () => {
          const requestFullscreen = element.requestFullscreen || element.webkitRequestFullscreen;
          if (requestFullscreen) return requestFullscreen.call(element);
          return element.webkitEnterFullscreen?.();
        },
        setCurrentTime: async (nextTime) => {
          element.currentTime = nextTime;
        },
        setVolume: async (nextVolume) => {
          element.muted = nextVolume <= 0;
          element.volume = Math.max(0, Math.min(1, nextVolume));
        },
      });

      handleLoadedMetadata();
      handleVolumeChange();
    } else if (provider === "youtube") {
      if (!iframeRef.current) throw new Error("YouTube frame is not mounted");

      const iframe = iframeRef.current;
      playerPromiseRef.current = loadYouTubeApi().then(
        (YT) =>
          new Promise((resolve) => {
            let player;

            const syncYouTubeTime = () => {
              if (!player || !isMountedRef.current) return;
              syncTime(player.getCurrentTime(), player.getDuration());
            };
            const startTimeSync = () => {
              clearPlaybackTimer();
              syncYouTubeTime();
              playbackTimerRef.current = window.setInterval(syncYouTubeTime, PLAYBACK_TICK);
            };

            player = new YT.Player(iframe, {
              events: {
                onReady: ({ target }) => {
                  const adapter = {
                    destroy: () => {
                      clearPlaybackTimer();
                      target.destroy();
                    },
                    getDuration: async () => Number(target.getDuration()) || 0,
                    getPaused: async () => target.getPlayerState() !== YT.PlayerState.PLAYING,
                    getVolume: async () => (target.isMuted() ? 0 : target.getVolume() / 100),
                    pause: async () => target.pauseVideo(),
                    play: async () => target.playVideo(),
                    requestFullscreen: async () => {
                      const frame = target.getIframe();
                      const requestFullscreen = frame.requestFullscreen || frame.webkitRequestFullscreen;
                      return requestFullscreen?.call(frame);
                    },
                    setCurrentTime: async (nextTime) => {
                      target.seekTo(nextTime, true);
                      syncYouTubeTime();
                    },
                    setVolume: async (nextVolume) => {
                      if (nextVolume <= 0) {
                        target.mute();
                      } else {
                        target.unMute();
                        target.setVolume(Math.round(nextVolume * 100));
                      }
                    },
                  };

                  syncTime(target.getCurrentTime(), target.getDuration());
                  syncVolume(target.getVolume() / 100, target.isMuted());
                  resolve(adapter);
                },
                onStateChange: ({ data }) => {
                  if (data === YT.PlayerState.PLAYING) {
                    markPlaying();
                    startTimeSync();
                  } else if (data === YT.PlayerState.PAUSED) {
                    markPaused();
                    syncYouTubeTime();
                  } else if (data === YT.PlayerState.ENDED) {
                    markEnded();
                    syncYouTubeTime();
                  }
                },
              },
            });
          }),
      );
    } else {
      throw new Error("Unsupported case video provider");
    }

    return playerPromiseRef.current;
  }, [
    clearPlaybackTimer,
    markEnded,
    markPaused,
    markPlaying,
    provider,
    syncTime,
    syncVolume,
  ]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(fullscreenElement === figureRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const pauseOtherVideo = (event) => {
      if (event.detail?.playerId === playerId || !hasStartedRef.current || !isPlayingRef.current) return;
      void ensurePlayer().then((player) => player.pause()).catch(() => {});
    };

    window.addEventListener(CASE_VIDEO_PLAY_EVENT, pauseOtherVideo);
    return () => window.removeEventListener(CASE_VIDEO_PLAY_EVENT, pauseOtherVideo);
  }, [ensurePlayer, playerId]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      clearControlsTimer();
      clearPlaybackTimer();
      window.clearTimeout(feedbackTimerRef.current);
      playerPromiseRef.current?.then((player) => player.destroy()).catch(() => {});
      playerPromiseRef.current = null;
    };
  }, [clearControlsTimer, clearPlaybackTimer]);

  const playVideo = async ({ withFeedback = false } = {}) => {
    setIsStarting(true);

    try {
      const player = await ensurePlayer();

      if (!hasStartedRef.current) {
        await player.setVolume(1);
        lastAudibleVolumeRef.current = 1;
      }

      await player.play();
      if (withFeedback) showFeedback("play");
    } catch {
      if (isMountedRef.current) {
        setIsStarting(false);
        setControlsVisible(true);
      }
    }
  };

  const togglePlayback = async () => {
    revealControls();

    try {
      const player = await ensurePlayer();

      if (isPlayingRef.current) {
        await player.pause();
        showFeedback("pause");
      } else {
        await playVideo({ withFeedback: true });
      }
    } catch {
      setIsStarting(false);
    }
  };

  const handleSeek = async (event) => {
    const nextTime = Number(event.currentTarget.value);
    if (!Number.isFinite(nextTime)) return;

    setCurrentTime(nextTime);
    revealControls();

    try {
      const player = await ensurePlayer();
      await player.setCurrentTime(nextTime);
    } catch {
      // Keep the visible range value while the remote player reconnects.
    }
  };

  const toggleVolume = async () => {
    const nextVolume = volume > 0 ? 0 : lastAudibleVolumeRef.current || 1;
    setVolume(nextVolume);
    revealControls();

    try {
      const player = await ensurePlayer();
      await player.setVolume(nextVolume);
    } catch {
      setVolume(volume);
    }
  };

  const toggleFullscreen = async () => {
    revealControls();

    try {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

      if (fullscreenElement) {
        const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
        await exitFullscreen?.call(document);
        return;
      }

      const requestFullscreen =
        figureRef.current?.requestFullscreen || figureRef.current?.webkitRequestFullscreen;

      if (requestFullscreen) {
        await requestFullscreen.call(figureRef.current);
        return;
      }

      const player = await ensurePlayer();
      await player.requestFullscreen();
    } catch {
      try {
        const player = await ensurePlayer();
        await player.requestFullscreen();
      } catch {
        // Some mobile browsers intentionally expose no programmatic fullscreen API.
      }
    }
  };

  if (!source) return null;

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <figure
      aria-label={video.title}
      className={`${styles.caseVideo} ${className}`.trim()}
      data-case-video={variant}
      data-video-provider={provider}
      onFocusCapture={() => {
        clearControlsTimer();
        if (hasStartedRef.current) setControlsVisible(true);
      }}
      onMouseLeave={() => scheduleControlsHide(500)}
      onPointerMove={revealControls}
      ref={figureRef}
    >
      <div className={styles.screen}>
        {provider === "local" ? (
          <video
            aria-label={video.alt || video.title}
            onLoadedMetadata={() => void ensurePlayer().catch(() => {})}
            playsInline
            preload={priority ? "auto" : "metadata"}
            ref={localVideoRef}
            src={source}
          />
        ) : (
          <iframe
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            data-case-video-player={playerId}
            loading={priority ? "eager" : "lazy"}
            onLoad={() => void ensurePlayer().catch(() => {})}
            ref={iframeRef}
            src={source}
            title={video.title}
          />
        )}
        {resolvedPoster && !hasStarted ? (
          <img
            alt=""
            aria-hidden="true"
            className={styles.poster}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            src={resolvedPoster}
          />
        ) : null}
      </div>

      {!hasStarted ? (
        <button
          aria-busy={isStarting}
          aria-label={`Speel ${video.title} met geluid`}
          className={styles.primaryPlay}
          disabled={isStarting}
          onClick={() => void playVideo()}
          type="button"
        >
          <Icon name="play" size="lg" />
        </button>
      ) : (
        <button
          aria-label={`${isPlaying ? "Pauzeer" : "Speel"} ${video.title}`}
          className={styles.toggleSurface}
          onClick={() => void togglePlayback()}
          type="button"
        />
      )}

      {feedback ? (
        <span aria-hidden="true" className={styles.feedback} key={feedback.key}>
          <Icon name={feedback.iconName} size="lg" />
        </span>
      ) : null}

      {hasStarted ? (
        <div
          aria-label={`Bediening voor ${video.title}`}
          className={`${styles.controls} ${controlsVisible ? styles.controlsVisible : ""}`}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) scheduleControlsHide();
          }}
          onPointerDown={clearControlsTimer}
          onPointerUp={revealControls}
          role="group"
        >
          <button
            aria-label={isPlaying ? `Pauzeer ${video.title}` : `Speel ${video.title}`}
            className={styles.controlButton}
            onClick={() => void togglePlayback()}
            type="button"
          >
            <Icon name={isPlaying ? "pause" : "play"} size="sm" />
          </button>

          <input
            aria-label={`Voortgang van ${video.title}`}
            className={styles.timeline}
            max={duration || 0}
            min="0"
            onChange={handleSeek}
            step="0.1"
            style={{ "--case-video-progress": `${progress}%` }}
            type="range"
            value={Math.min(currentTime, duration || 0)}
          />

          <span aria-hidden="true" className={styles.time}>
            {formatPlaybackTime(currentTime)} / {formatPlaybackTime(duration)}
          </span>

          <button
            aria-label={volume > 0 ? `Demp ${video.title}` : `Zet geluid aan voor ${video.title}`}
            aria-pressed={volume <= 0}
            className={styles.controlButton}
            onClick={() => void toggleVolume()}
            type="button"
          >
            <Icon name={volume > 0 ? "volume" : "volumeOff"} size="sm" />
          </button>

          <button
            aria-label={isFullscreen ? `Sluit volledig scherm voor ${video.title}` : `Toon ${video.title} op volledig scherm`}
            aria-pressed={isFullscreen}
            className={styles.controlButton}
            onClick={() => void toggleFullscreen()}
            type="button"
          >
            <Icon name="maximize" size="sm" />
          </button>
        </div>
      ) : null}
    </figure>
  );
}
