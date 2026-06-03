"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import TeamDossierGrid from "../components/TeamDossierGrid";
import { assetPath } from "../../src/lib/assetPath";
import { teamMembers } from "../../src/data/teamPageData";

const teamVideoSrc = "/assets/amiamis_teamvideo2026.mp4";
const teamVideoPosterTime = 0.8;

export default function TeamPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [isVideoFullyVisible, setIsVideoFullyVisible] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState("16 / 9");
  const transitionRef = useRef(null);
  const railRef = useRef(null);
  const videoRef = useRef(null);
  const audioFadeFrameRef = useRef(0);
  const hasStartedVideoRef = useRef(false);
  const hasEverStartedVideoRef = useRef(false);
  const hasAttemptedAutoplayRef = useRef(false);
  const hasUserEnabledSoundRef = useRef(false);
  const autoplayBlockedRef = useRef(false);
  const isScrollPausedRef = useRef(false);
  const savedVideoTimeRef = useRef(0);
  const savedVideoVolumeRef = useRef(1);
  const wasPlayingBeforeScrollPauseRef = useRef(false);

  const cancelAudioFade = () => {
    if (audioFadeFrameRef.current) {
      window.cancelAnimationFrame(audioFadeFrameRef.current);
      audioFadeFrameRef.current = 0;
    }
  };

  const setVideoTimeSafely = (video, time) => {
    try {
      video.currentTime = time;
    } catch {
      // Metadata may still be loading; the first frame will be available once the browser is ready.
    }
  };

  const pauseVideoForScrollOut = ({ fade = true } = {}) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isScrollPausedRef.current) {
      return;
    }

    savedVideoTimeRef.current = Number.isFinite(video.currentTime)
      ? video.currentTime
      : savedVideoTimeRef.current;
    savedVideoVolumeRef.current = Number.isFinite(video.volume)
      ? video.volume
      : savedVideoVolumeRef.current;
    wasPlayingBeforeScrollPauseRef.current = !video.paused && !video.ended;

    setIsAutoplayBlocked(false);
    setIsVideoFullyVisible(false);

    if (!wasPlayingBeforeScrollPauseRef.current && video.paused) {
      return;
    }

    isScrollPausedRef.current = true;
    hasStartedVideoRef.current = false;
    cancelAudioFade();

    if (!fade) {
      video.pause();
      video.volume = savedVideoVolumeRef.current;
      return;
    }

    const startVolume = savedVideoVolumeRef.current;
    const startedAt = window.performance.now();
    const duration = 280;

    const fadeStep = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      video.volume = Math.max(0, startVolume * (1 - progress));

      if (progress < 1) {
        audioFadeFrameRef.current = window.requestAnimationFrame(fadeStep);
        return;
      }

      audioFadeFrameRef.current = 0;
      video.pause();
      video.volume = savedVideoVolumeRef.current;
    };

    audioFadeFrameRef.current = window.requestAnimationFrame(fadeStep);
  };

  const resetVideoPlayback = ({ resetFrame = true, updateState = true } = {}) => {
    const video = videoRef.current;

    cancelAudioFade();

    if (updateState) {
      setIsAutoplayBlocked(false);
      setIsVideoFullyVisible(false);
    }

    hasStartedVideoRef.current = false;
    hasAttemptedAutoplayRef.current = false;
    autoplayBlockedRef.current = false;
    isScrollPausedRef.current = false;
    wasPlayingBeforeScrollPauseRef.current = false;

    if (!video) {
      return;
    }

    video.pause();
    video.muted = false;
    video.volume = savedVideoVolumeRef.current;

    if (resetFrame) {
      setVideoTimeSafely(video, teamVideoPosterTime);
    }
  };

  const startVideoWithSound = ({ force = false, restart = false } = {}) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (hasStartedVideoRef.current && !video.paused) {
      return;
    }

    if (!force && autoplayBlockedRef.current && !hasUserEnabledSoundRef.current) {
      setIsAutoplayBlocked(true);
      return;
    }

    cancelAudioFade();
    hasAttemptedAutoplayRef.current = true;
    hasStartedVideoRef.current = true;
    setIsAutoplayBlocked(false);

    const resumeTime =
      hasEverStartedVideoRef.current && savedVideoTimeRef.current > 0
        ? savedVideoTimeRef.current
        : 0;
    const targetTime = restart || !hasEverStartedVideoRef.current ? 0 : resumeTime;

    if (Math.abs(video.currentTime - targetTime) > 0.25) {
      setVideoTimeSafely(video, targetTime);
    }

    video.muted = false;
    video.volume = savedVideoVolumeRef.current;

    const playPromise = video.play();
    const markPlaying = () => {
      hasStartedVideoRef.current = true;
      hasEverStartedVideoRef.current = true;
      autoplayBlockedRef.current = false;
      isScrollPausedRef.current = false;
      wasPlayingBeforeScrollPauseRef.current = true;
      savedVideoVolumeRef.current = Number.isFinite(video.volume)
        ? video.volume
        : savedVideoVolumeRef.current;
    };

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.then(markPlaying).catch(() => {
        hasStartedVideoRef.current = false;
        isScrollPausedRef.current = false;
        autoplayBlockedRef.current = true;

        setIsAutoplayBlocked(true);
      });
      return;
    }

    markPlaying();
  };

  const enableSoundAndPlay = () => {
    hasUserEnabledSoundRef.current = true;
    autoplayBlockedRef.current = false;
    hasAttemptedAutoplayRef.current = false;
    startVideoWithSound({ force: true });
  };

  const scrollTowardTeamVideo = () => {
    const root = transitionRef.current;

    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootTop = root.getBoundingClientRect().top + window.scrollY;
    const targetTop = rootTop + window.innerHeight * 0.72;

    window.scrollTo({
      top: targetTop,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const root = transitionRef.current;
    const video = videoRef.current;

    if (!root) {
      return undefined;
    }

    if (video) {
      video.pause();
      video.muted = false;
      video.volume = 1;
      setVideoTimeSafely(video, teamVideoPosterTime);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;

    if (reduceMotion || mobile) {
      setIsAutoplayBlocked(Boolean(video));
      return undefined;
    }

    let frame = 0;
    let current = 0;
    let target = 0;

    const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
    const mix = (from, to, amount) => from + (to - from) * amount;
    const smooth = (value) => value * value * (3 - 2 * value);
    const phase = (value, start, end) => smooth(clamp((value - start) / (end - start)));

    const setProgress = (progress) => {
      const reveal = phase(progress, 0.06, 0.2);
      const fullscreen = phase(progress, 0.18, 0.32);
      const hold = phase(progress, 0.32, 0.7);
      const shrink = phase(progress, 0.76, 0.94);
      const videoOpacity = clamp(phase(progress, 0.05, 0.13));
      const copyFade = phase(progress, 0.22, 0.34);
      const fullyVisible = fullscreen >= 0.985 && shrink < 0.02;
      const revealScale = mix(0.14, 0.42, reveal);
      const fullScale = mix(revealScale, 1, fullscreen);
      const holdScale = mix(fullScale, 1.035, hold);
      const videoScale = mix(holdScale, 0.72, shrink);
      const videoY = `${mix(mix(11, 4, reveal), mix(0, -9, shrink), Math.max(fullscreen, shrink))}vh`;
      const clipTop = mix(mix(35, 0, fullscreen), 6, shrink);
      const clipSide = mix(mix(38, 0, fullscreen), 10, shrink);
      const radius = mix(mix(26, 22, fullscreen), 30, shrink);
      const frameScale = mix(mix(1.08, 1, fullscreen), 1.025, shrink);
      const blur = mix(7, 0, fullscreen);

      root.style.setProperty("--team-video-opacity", videoOpacity.toFixed(3));
      root.style.setProperty("--team-video-scale", videoScale.toFixed(4));
      root.style.setProperty("--team-video-y", videoY);
      root.style.setProperty("--team-video-clip-top", `${clipTop.toFixed(2)}%`);
      root.style.setProperty("--team-video-clip-side", `${clipSide.toFixed(2)}%`);
      root.style.setProperty("--team-video-radius", `${radius.toFixed(1)}px`);
      root.style.setProperty("--team-frame-scale", frameScale.toFixed(4));
      root.style.setProperty("--team-video-blur", `${blur.toFixed(2)}px`);
      root.style.setProperty("--team-copy-opacity", (1 - copyFade).toFixed(3));
      root.style.setProperty("--team-copy-scale", mix(1, 0.94, copyFade).toFixed(4));
      root.style.setProperty("--team-copy-blur", `${mix(0, 5, copyFade).toFixed(2)}px`);
      root.style.setProperty("--team-mark-drift", reveal.toFixed(3));

      setIsVideoFullyVisible((currentValue) => (currentValue === fullyVisible ? currentValue : fullyVisible));

      if (progress < 0.055 && !hasEverStartedVideoRef.current) {
        resetVideoPlayback({ resetFrame: true });
        return;
      }

      if (progress < 0.18 && hasStartedVideoRef.current) {
        pauseVideoForScrollOut({ fade: false });
        return;
      }

      if (fullyVisible && progress < 0.9) {
        startVideoWithSound();
        return;
      }

      if (progress >= 0.9) {
        pauseVideoForScrollOut({ fade: true });
      }
    };

    const calculateProgress = () => {
      const rect = root.getBoundingClientRect();
      const scrollable = Math.max(1, root.offsetHeight - window.innerHeight);
      target = clamp(-rect.top / scrollable);
    };

    const tick = () => {
      frame = 0;
      current += (target - current) * 0.14;
      setProgress(current);

      if (Math.abs(target - current) > 0.001) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      calculateProgress();

      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    calculateProgress();
    setProgress(target);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      resetVideoPlayback({ resetFrame: false, updateState: false });
    };
  }, []);

  useEffect(() => {
    const root = transitionRef.current;
    const video = videoRef.current;
    const shell = root?.querySelector(".team-transition__video-shell");

    if (!root || !video || !shell || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry?.intersectionRatio ?? 0;
        const canResumeInCurrentLayout =
          mobileQuery.matches ||
          reduceMotionQuery.matches ||
          root.classList.contains("is-video-fullscreen");

        if (ratio < 0.2) {
          pauseVideoForScrollOut({ fade: true });
          return;
        }

        if (
          ratio >= 0.45 &&
          canResumeInCurrentLayout &&
          hasEverStartedVideoRef.current &&
          wasPlayingBeforeScrollPauseRef.current
        ) {
          startVideoWithSound();
        }
      },
      { threshold: [0, 0.2, 0.45, 0.6, 1] }
    );

    observer.observe(shell);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = railRef.current;

    if (!root) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotionQuery.matches) {
      return undefined;
    }

    const track = root.querySelector(".team-rail-track");

    if (!track) {
      return undefined;
    }

    let frame = 0;
    let current = 0;
    let target = 0;

    const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
    const mix = (from, to, amount) => from + (to - from) * amount;
    const smooth = (value) => value * value * (3 - 2 * value);
    const phase = (value, start, end) => smooth(clamp((value - start) / (end - start)));

    const setProgress = (progress) => {
      const titleIn = phase(progress, 0.18, 0.34);
      const subtitleIn = phase(progress, 0.3, 0.44);
      const cardsIn = phase(progress, 0.42, 0.72);
      const titleSettle = phase(progress, 0.24, 0.44);

      root.style.setProperty("--de-amis-title-opacity", titleIn.toFixed(3));
      root.style.setProperty("--de-amis-title-y", `${mix(64, 0, titleSettle).toFixed(2)}px`);
      root.style.setProperty("--de-amis-title-scale", mix(0.96, 1, titleSettle).toFixed(4));
      root.style.setProperty("--de-amis-subtitle-opacity", subtitleIn.toFixed(3));
      root.style.setProperty("--de-amis-cards-opacity", cardsIn.toFixed(3));
      root.style.setProperty("--de-amis-cards-y", `${mix(56, 0, cardsIn).toFixed(2)}px`);
      root.style.setProperty("--de-amis-cards-scale", mix(0.965, 1, cardsIn).toFixed(4));
    };

    const calculateProgress = () => {
      const rect = root.getBoundingClientRect();
      target = clamp((window.innerHeight - rect.top) / (window.innerHeight * 1.05));
    };

    const tick = () => {
      frame = 0;
      current += (target - current) * 0.14;
      setProgress(current);

      if (Math.abs(target - current) > 0.001) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      calculateProgress();

      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const refresh = () => {
      calculateProgress();
      setProgress(target);
      schedule();
    };

    refresh();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js"
        strategy="afterInteractive"
      />
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <section
          className={`team-hero team-transition ${isAutoplayBlocked ? "is-sound-blocked" : ""} ${
            isVideoFullyVisible ? "is-video-fullscreen" : ""
          }`}
          id="team-intro"
          aria-label="Ami Amis teamintro"
          ref={transitionRef}
          style={{ "--team-video-aspect-ratio": videoAspectRatio }}
        >
          <div className="team-transition__stage">
            <a
              className="hero__logo team-hero__logo team-transition__logo"
              href={assetPath("/")}
              aria-label="Ami Amis home"
            />

            <div className="team-hero__copy team-transition__copy">
              <h1>
                Wij zijn Ami Amis: een team dat{" "}
                <span className="team-mark team-mark--blue">strategie</span>,{" "}
                <span className="team-mark team-mark--red">creativiteit</span> en{" "}
                <span className="team-mark team-mark--yellow">video</span> combineert met{" "}
                <span className="team-script">goesting</span>,{" "}
                <span className="team-underline">lef</span> en gezond verstand.
              </h1>
            </div>

            <button
              className="team-video-scroll-cue"
              type="button"
              onClick={scrollTowardTeamVideo}
              aria-label="Scroll naar onze teamvideo"
            >
              <span className="team-video-scroll-cue__label">scroll voor onze teamvideo</span>
              <span className="team-video-scroll-cue__animation" aria-hidden="true">
                <lottie-player
                  src={assetPath("/assets/arrow-arc.json")}
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                />
              </span>
            </button>

            <div className="team-transition__video-shell" aria-label="Ami Amis teamvideo">
              <div className="team-transition__video-frame">
                <video
                  ref={videoRef}
                  src={assetPath(teamVideoSrc)}
                  aria-label="Ami Amis teamvideo"
                  playsInline
                  preload="auto"
                  onLoadedMetadata={() => {
                    const video = videoRef.current;

                    if (!video) {
                      return;
                    }

                    if (video.videoWidth > 0 && video.videoHeight > 0) {
                      setVideoAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
                    }

                    if (!hasStartedVideoRef.current && !hasEverStartedVideoRef.current) {
                      setVideoTimeSafely(video, teamVideoPosterTime);
                    }
                  }}
                />
                <button
                  className="team-sound-overlay"
                  type="button"
                  onClick={enableSoundAndPlay}
                  aria-label="Speel de Ami Amis teamvideo met geluid"
                  tabIndex={isAutoplayBlocked ? 0 : -1}
                >
                  <span className="team-sound-overlay__pill">
                    <span>Geluid aan</span>
                    <small>Speel verder</small>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </section>

        <main className="team-page">
          <section
            className="de-amis-section"
            id="team-collage"
            aria-label="Ami Amis teamleden"
            ref={railRef}
          >
            <div className="de-amis-pin-stage">
              <div className="de-amis-title-lockup">
                <h2>De Amis</h2>
                <p>De gezichten achter Ami Amis</p>
              </div>

              <div className="team-rail-viewport" aria-label="Ami Amis team dossiers">
                <TeamDossierGrid profiles={teamMembers} />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="team" />
    </>
  );
}
