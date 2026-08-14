"use client";

import { useRef, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const teamVideoSrc = "/assets/amiamis_teamvideo2026.mp4";
const teamVideoPoster = "/assets/amiamis_teamvideo2026-poster.jpg";
const teamGroupPhoto = "/assets/ami-amis-team-group.webp";

const shoutTitle = "Ami Awieee?";
const shoutLetterSizes = [0.48, 0.55, 0.62, 0.3, 0.7, 0.8, 0.92, 1.05, 1.18, 1.32, 1.5];

const teamIntroLines = [
  ["Ami Amis, een team", "team-intro-static__line--opening"],
  ["enthousiaste creatievelingen", "team-intro-static__line--hero"],
  ["met een passie voor content.", "team-intro-static__line--statement"],
  ["Amicaliteit zit in ons DNA.", "team-intro-static__line--compact"],
  ["Wanneer jij belt, nemen we op.", "team-intro-static__line--callout"],
  [
    "Zelfs al zitten we in bad, staan we op een trouw of zitten we op ‘t WC.",
    "team-intro-static__line--long",
  ],
  [
    "Omdat het beste werk ontstaat wanneer mensen elkaar vertrouwen.",
    "team-intro-static__line--closing",
  ],
];

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

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <header className="team-intro-static" id="team-intro">
          <a
            className="hero__logo team-hero__logo team-intro-static__logo"
            href={assetPath("/")}
            aria-label="Ami Amis home"
          />

          <div className="team-hero__copy team-intro-static__copy">
            <h1 aria-label={shoutTitle} className="team-shout-title">
              <span aria-hidden="true" className="team-shout-title__letters">
                {[...shoutTitle].map((letter, index) => (
                  <span
                    className={`team-shout-title__letter ${letter === " " ? "is-space" : ""}`}
                    key={`${letter}-${index}`}
                    style={{
                      "--shout-delay": `${index * 62}ms`,
                      "--shout-size": `${shoutLetterSizes[index]}em`,
                    }}
                  >
                    {letter === " " ? "\u00a0" : letter}
                  </span>
                ))}
              </span>
            </h1>
            <p className="team-intro-static__lead">
              {teamIntroLines.map(([line, className]) => (
                <span className={`team-intro-static__line ${className}`} key={line}>
                  {line}
                </span>
              ))}
            </p>
            <div className="team-intro-static__columns">
              <p>
                Of het nu is voor een coole campagne, een fancy video of om samen een bank
                te overvallen - wij staan voor je klaar. Omdat het beste werk ontstaat
                wanneer mensen elkaar vertrouwen.
              </p>
              <p>
                Op zoek naar totale ontzorging? We got you! Bij ons kan je terecht voor een
                totaal (content)marketingpakket: van video, fotografie en animatie tot
                grafisch design en websitecreatie -en optimalisatie… Kom snel eens langs om
                te sparren over je marketingstrategie!
              </p>
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
