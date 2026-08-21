"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const teamVideoSrc = "/assets/amiamis_teamvideo2026.mp4";
const teamVideoPoster = "/assets/amiamis_teamvideo2026-poster.jpg";
const teamGroupPhoto = "/assets/ami-amis-team-group.webp";
const teamIntroPhoto = "/assets/contact-phones-portrait.jpg";
const teamIntroTitle = "Ami Awieee?";
const teamIntroTitleWords = teamIntroTitle.split(" ");

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
          <h2 id={titleId}>
            <span>Meet your</span>
            <span>new friends!</span>
          </h2>
          <p>{subtitle}</p>
        </header>

        <div className="team-static-photo__frame">
          <img
            alt="Het team van Ami Amis samen voor een fontein"
            decoding="async"
            loading="lazy"
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

    document.body.classList.add("collage-ready");

    if (!section) {
      return () => {
        document.body.classList.remove("collage-ready");
      };
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return () => {
        document.body.classList.remove("collage-ready");
      };
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
      document.body.classList.remove("collage-ready");
    };
  }, []);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <header className="team-intro-static team-intro-static--story" id="team-intro">
          <a
            className="hero__logo team-hero__logo team-intro-static__logo"
            href={assetPath("/")}
            aria-label="Ami Amis home"
          />

          <div className="team-hero__copy team-intro-static__copy">
            <div className="team-intro-static__hero-grid team-story-hero">
              <section className="team-story-hero__copy" aria-labelledby="team-intro-title">
                <h1 aria-label={teamIntroTitle} id="team-intro-title">
                  {teamIntroTitleWords.map((word, wordIndex) => {
                    const charOffset = teamIntroTitleWords
                      .slice(0, wordIndex)
                      .reduce((sum, currentWord) => sum + currentWord.length + 1, 0);

                    return (
                      <span
                        aria-hidden="true"
                        className="team-story-hero__title-word"
                        key={word}
                      >
                        {Array.from(word).map((char, index) => (
                          <span
                            className="team-story-hero__title-char"
                            key={`${char}-${index}`}
                            style={{ "--team-title-delay": `${60 + (charOffset + index) * 36}ms` }}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    );
                  })}
                </h1>
                <div className="team-story-hero__body">
                  <p>
                    Ami Amis, een team enthousiaste creatievelingen met een passie voor
                    content. Amicaliteit zit in ons DNA. Wanneer jij belt, nemen we op. Zelfs
                    al zitten we in bad, staan we op een trouw of zitten we op ‘t WC. Omdat
                    het beste werk ontstaat wanneer mensen elkaar vertrouwen.
                  </p>
                  <p>
                    Op zoek naar totale ontzorging? We got you! Bij ons kan je terecht voor
                    een totaal (content)marketingpakket: van video, fotografie en animatie tot
                    grafisch design en websitecreatie -en optimalisatie… Kom snel eens langs
                    om te sparren over je marketingstrategie!
                  </p>
                </div>
              </section>

              <figure
                className="team-intro-static__visual team-story-hero__photo"
                onPointerLeave={handleIntroPhotoPointerLeave}
                onPointerMove={handleIntroPhotoPointerMove}
              >
                <img
                  alt="Ami Amis teamfoto"
                  decoding="async"
                  fetchPriority="high"
                  src={assetPath(teamIntroPhoto)}
                />
              </figure>
            </div>
          </div>
        </header>

        <main className="team-page">
          <TeamVideoSection id="team-video" title="Teamvideo" />

          <TeamPhotoSection
            id="team-collage"
            subtitle="Ons team van strijders en durvers verzet bergen. Vanuit ons hoofdkwartier op dé Meir in Antwerpen smeden we de lijpste ideeën en produceren we de graafste content. Dikkenekken? Never. Allez, misschien soms 😎..."
          />

          <section className="team-total-care" aria-labelledby="team-total-care-title">
            <div className="team-total-care__inner">
              <p className="team-total-care__eyebrow">Op zoek naar totale ontzorging?</p>
              <h2 id="team-total-care-title">We got you!</h2>
              <p className="team-total-care__body">
                Bij ons kan je terecht voor een totaal (content)marketingpakket: van video,
                fotografie en animatie tot grafisch design en websitecreatie -en
                optimalisatie... Kom eens langs om te sparren over je marketingstrategie!
              </p>
              <a className="button team-total-care__button" href={assetPath("/contact/")}>Kom sparren</a>
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
