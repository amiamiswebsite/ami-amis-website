"use client";

import { useEffect, useRef, useState } from "react";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const VIDEO_SRC = "/videos/brent-skydive-scroll.mp4";
const POSTER_SRC = "/videos/brent-skydive-poster.jpg";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollVideoHeaderTest() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const durationRef = useRef(0);
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isMounted = true;

    const setProgress = (progress) => {
      section.style.setProperty("--scroll-video-progress", progress.toFixed(4));
    };

    const seekVideo = () => {
      rafRef.current = 0;

      if (!durationRef.current || mediaQuery.matches || hasVideoError) {
        return;
      }

      const target = targetTimeRef.current;
      const current = smoothTimeRef.current || video.currentTime || 0;
      const next = current + (target - current) * 0.18;

      smoothTimeRef.current = Math.abs(target - next) < 0.018 ? target : next;

      try {
        video.currentTime = smoothTimeRef.current;
      } catch {
        return;
      }

      if (Math.abs(target - smoothTimeRef.current) > 0.02) {
        rafRef.current = window.requestAnimationFrame(seekVideo);
      }
    };

    const queueSeek = () => {
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(seekVideo);
      }
    };

    const updateFromScroll = () => {
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-section.getBoundingClientRect().top / scrollRange, 0, 1);

      setProgress(progress);

      if (!durationRef.current || mediaQuery.matches || hasVideoError) {
        return;
      }

      targetTimeRef.current = clamp(progress * durationRef.current, 0.02, Math.max(durationRef.current - 0.04, 0.02));
      queueSeek();
    };

    const handleMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      durationRef.current = video.duration;
      targetTimeRef.current = 0.02;
      smoothTimeRef.current = 0.02;
      video.pause();

      try {
        video.currentTime = 0.02;
      } catch {
        // Some mobile browsers only allow seeking after more data arrives.
      }

      if (isMounted) {
        setIsReady(true);
      }

      updateFromScroll();
    };

    const handleMotionChange = () => {
      const reduced = mediaQuery.matches;
      setIsReducedMotion(reduced);
      setProgress(reduced ? 1 : 0);

      if (!reduced) {
        updateFromScroll();
      }
    };

    handleMotionChange();

    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleMetadata);
    }

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
      video.removeEventListener("loadedmetadata", handleMetadata);

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [hasVideoError]);

  const showPosterFallback = isReducedMotion || hasVideoError;

  return (
    <>
      <div className={`scroll-video-test site-shell ${menuOpen ? "menu-open" : ""}`}>
        <section
          ref={sectionRef}
          className={`scroll-video-hero${isReady ? " is-ready" : ""}${showPosterFallback ? " is-fallback" : ""}`}
          aria-label="Scroll Video Header Test"
        >
          <div className="scroll-video-hero__sticky">
            <video
              ref={videoRef}
              aria-label="Brent springt uit het vliegtuig en gaat over naar freefall."
              className="scroll-video-hero__video"
              muted
              onError={() => setHasVideoError(true)}
              playsInline
              poster={assetPath(POSTER_SRC)}
              preload="auto"
              src={assetPath(VIDEO_SRC)}
            />
            {/* Later: add WebM/mobile alternatives here with <source> tags when optimized exports are available. */}
            <div className="scroll-video-hero__poster" aria-hidden="true" />
            <div className="scroll-video-hero__shade" aria-hidden="true" />

            <div className="scroll-video-hero__status" aria-hidden="true">
              <span>Scroll om te springen</span>
              <i />
            </div>
          </div>
        </section>

        <section className="scroll-video-test__after" aria-label="Na de testheader">
          <p>Testpagina</p>
          <h2>De hero stopt hier. De rest van de site blijft onaangeraakt.</h2>
        </section>
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="landing-test" />
    </>
  );
}
