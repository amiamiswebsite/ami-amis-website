"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import Icon from "../components/ui/Icon";
import { assetPath } from "../../src/lib/assetPath";

const teamVideoSrc = "/assets/amiamis_teamvideo2026.mp4";
const teamVideoPoster = "/assets/amiamis_teamvideo2026-poster.jpg";
const teamGroupPhoto = "/assets/ami-amis-team-group.webp";
const teamIntroTitle = "Ami Awieee?";
const teamIntroLetterSizes = [0.48, 0.55, 0.62, 0.3, 0.7, 0.8, 0.92, 1.05, 1.18, 1.32, 1.5];
const teamHeroVimeoId = "1220145767";
const teamHeroVimeoPlayerId = `team-hero-vimeo-${teamHeroVimeoId}`;
const teamHeroVimeoSrc = `https://player.vimeo.com/video/${teamHeroVimeoId}?autoplay=1&loop=1&muted=1&controls=0&autopause=0&playsinline=1&title=0&byline=0&portrait=0&dnt=1&player_id=${teamHeroVimeoPlayerId}`;
const friendsLetters = "FRIENDS".split("");
const friendsDotColors = ["red", "blue", "yellow", "red", "yellow", "blue"];

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

function TeamHeroVideo({ onPointerLeave, onPointerMove }) {
  const iframeRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      postVimeoCommand(iframeRef.current, "setMuted", true);
      postVimeoCommand(iframeRef.current, "setVolume", 0);
      postVimeoCommand(iframeRef.current, "play");
    }, 320);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleSound = () => {
    const nextSoundOn = !soundOn;

    setSoundOn(nextSoundOn);
    postVimeoCommand(iframeRef.current, "setMuted", !nextSoundOn);
    postVimeoCommand(iframeRef.current, "setVolume", nextSoundOn ? 1 : 0);
    postVimeoCommand(iframeRef.current, "play");
  };

  return (
    <figure
      className="team-intro-static__visual team-story-hero__photo team-story-hero__video"
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
    >
      <iframe
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        data-case-vimeo-player={teamHeroVimeoPlayerId}
        loading="eager"
        ref={iframeRef}
        src={teamHeroVimeoSrc}
        title="Ami Amis BTS-video"
      />
      <button
        aria-label={soundOn ? "Zet geluid uit" : "Zet geluid aan"}
        aria-pressed={soundOn}
        className="team-story-hero__sound"
        onClick={toggleSound}
        type="button"
      >
        <Icon name={soundOn ? "volume" : "volumeOff"} />
      </button>
    </figure>
  );
}

function FriendsWordmark({ id }) {
  return (
    <h2 aria-label="Meet your new friends" className="team-friends-lockup" id={id}>
      <span aria-hidden="true" className="team-friends-lockup__kicker">
        Meet your new
      </span>
      <span aria-hidden="true" className="team-friends-lockup__word">
        {friendsLetters.map((letter, index) => (
          <span className="team-friends-lockup__unit" key={letter}>
            <span className="team-friends-lockup__letter">{letter}</span>
            {index < friendsDotColors.length ? (
              <span
                className={`team-friends-lockup__dot team-friends-lockup__dot--${friendsDotColors[index]}`}
              />
            ) : null}
          </span>
        ))}
      </span>
    </h2>
  );
}

function TeamVideoSection({ id, title, subtitle, tone = "blue" }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const playTeamVideo = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = false;
    const playPromise = video.play();

    if (playPromise?.catch) {
      playPromise.catch(() => setIsVideoPlaying(false));
    }
  };

  const titleId = `${id}-title`;

  return (
    <section
      className={`team-static-video team-static-video--${tone}`}
      id={id}
      aria-labelledby={titleId}
    >
      <div className="team-static-video__inner">
        <header className="team-static-video__header">
          <h2 id={titleId}>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </header>

        <div className={`team-static-video__frame ${isVideoPlaying ? "is-playing" : ""}`}>
          <video
            aria-label={`${title} van Ami Amis`}
            controls={isVideoPlaying}
            onEnded={() => setIsVideoPlaying(false)}
            onPause={() => setIsVideoPlaying(false)}
            onPlay={() => setIsVideoPlaying(true)}
            playsInline
            poster={assetPath(teamVideoPoster)}
            preload="metadata"
            ref={videoRef}
            src={assetPath(teamVideoSrc)}
          />
          {!isVideoPlaying ? (
            <button
              aria-label={`Speel ${title.toLowerCase()}`}
              className="team-static-video__play"
              onClick={playTeamVideo}
              type="button"
            >
              <span aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function TeamPhotoSection({ id, subtitle }) {
  const titleId = `${id}-title`;

  return (
    <section
      className="team-static-video team-static-video--yellow team-static-photo"
      id={id}
      aria-labelledby={titleId}
    >
      <div className="team-static-video__inner">
        <header className="team-static-video__header team-static-photo__header">
          <FriendsWordmark id={titleId} />
          <p>{subtitle}</p>
        </header>

        <div className="team-static-photo__frame">
          <img
            alt="Het team van Ami Amis samen voor een fontein"
            decoding="async"
            loading="eager"
            src={assetPath(teamGroupPhoto)}
          />
        </div>
      </div>
    </section>
  );
}

export default function TeamPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleIntroPhotoPointerMove = useCallback((event) => {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const frame = event.currentTarget;
    const rect = frame.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));

    frame.classList.add("is-tracking");
    frame.style.setProperty("--team-intro-photo-x", `${(x * 9).toFixed(2)}px`);
    frame.style.setProperty("--team-intro-photo-y", `${(y * 7).toFixed(2)}px`);
    frame.style.setProperty("--team-intro-photo-rx", `${(y * -1.45).toFixed(2)}deg`);
    frame.style.setProperty("--team-intro-photo-ry", `${(x * 1.9).toFixed(2)}deg`);
  }, []);

  const handleIntroPhotoPointerLeave = useCallback((event) => {
    const frame = event.currentTarget;

    frame.classList.remove("is-tracking");
    frame.style.setProperty("--team-intro-photo-x", "0px");
    frame.style.setProperty("--team-intro-photo-y", "0px");
    frame.style.setProperty("--team-intro-photo-rx", "0deg");
    frame.style.setProperty("--team-intro-photo-ry", "0deg");
  }, []);

  useEffect(() => {
    const section = document.querySelector(".team-intro-static--story");
    const footer = document.querySelector(".team-page + .site-footer");

    document.body.classList.add("collage-ready");
    footer?.classList.add("is-visible");

    const cleanup = () => {
      footer?.classList.remove("is-visible");
      document.body.classList.remove("collage-ready");
    };

    if (!section) {
      return cleanup;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return cleanup;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, []);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <header
          className="team-intro-static team-intro-static--story team-intro-static--animated"
          id="team-intro"
        >
          <a
            className="hero__logo team-hero__logo team-intro-static__logo"
            href={assetPath("/")}
            aria-label="Ami Amis home"
          />

          <div className="team-hero__copy team-intro-static__copy">
            <div className="team-intro-static__hero-grid team-story-hero">
              <section className="team-story-hero__copy" aria-labelledby="team-intro-title">
                <h1 aria-label={teamIntroTitle} id="team-intro-title">
                  <span aria-hidden="true" className="team-story-hero__title-letters">
                    {Array.from(teamIntroTitle).map((char, index) => (
                      <span
                        className={`team-story-hero__title-char ${char === " " ? "is-space" : ""}`}
                        key={`${char}-${index}`}
                        style={{
                          "--team-title-delay": `${index * 62}ms`,
                          "--team-title-size": `${teamIntroLetterSizes[index]}em`,
                        }}
                      >
                        {char === " " ? "\u00a0" : char}
                      </span>
                    ))}
                  </span>
                </h1>
                <div className="team-story-hero__body">
                  <p className="team-story-hero__lead">
                    <span className="team-story-hero__highlight">
                      Ami Amis, een team enthousiaste creatievelingen met een passie voor
                      content. Amicaliteit zit in ons DNA.
                    </span>
                  </p>
                  <p className="team-story-hero__detail">
                    Aangevuld met een goede dosis durf en humor zorgen wij voor die extra
                    “je-ne-sais-quois” in uw marketing. Onze no-bullshit mentaliteit betekent
                    dat wij tot het uiterste gaan, zonder gezever. Wij zijn er voor de
                    ondernemers die écht willen groeien, voor de marketeers die écht durven,
                    voor bedrijven met ballen.
                  </p>
                  <div className="team-story-hero__closing">
                    <p className="team-story-hero__question">
                      Dus, wilt ge samenwerken met een partner die zelfs saaie video’s sexy
                      maakt?
                    </p>
                    <p className="team-story-hero__answer">
                      <strong>Zeg dan Ami A-Oui.</strong>
                      <span>
                        Want als ge écht wilt groeien, zijn wij gewoon de logische keuze ;).
                      </span>
                    </p>
                  </div>
                </div>
              </section>

              <TeamHeroVideo
                onPointerLeave={handleIntroPhotoPointerLeave}
                onPointerMove={handleIntroPhotoPointerMove}
              />
            </div>
          </div>
        </header>

        <main className="team-page">
          <TeamVideoSection id="team-video" title="Teamvideo" />

          <TeamPhotoSection
            id="team-collage"
            subtitle="Ons team van strijders en durvers verzet bergen. Vanuit ons hoofdkwartier op dé Meir in Antwerpen smeden we de vetste plannen en produceren we de graafste content. Dikkenekken? Nee, gewoon dikke video’s 😎..."
          />

          <section
            className="team-total-care team-total-care--compact"
            aria-labelledby="team-total-care-title"
          >
            <div className="team-total-care__inner">
              <h2 id="team-total-care-title">Totale ontzorging? We’ve got you</h2>
              <a className="button team-total-care__button" href={assetPath("/contact/")}>
                Kom eens sparren
              </a>
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
