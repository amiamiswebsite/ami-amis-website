"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import TeamDossierGrid from "../components/TeamDossierGrid";
import { assetPath } from "../../src/lib/assetPath";
import { teamMembers } from "../../src/data/teamPageData";

const teamVideoSrc = "/assets/amiamis_teamvideo2026.mp4";
const teamVideoPoster = "/assets/amiamis_teamvideo2026-poster.jpg";

export default function TeamPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const teamSectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = teamSectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      section?.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        section.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
            <h1>
              Wij zijn Ami Amis, een team{" "}
              <span className="team-mark team-mark--blue">enthousiaste creatievelingen</span>{" "}
              met een passie voor <span className="team-mark team-mark--red">content</span>.{" "}
              <span className="team-script">Amicaliteit</span> zit in ons DNA. Wanneer jij
              belt, nemen we op. Of het nu is voor een{" "}
              <span className="team-mark team-mark--blue">coole campagne</span>, een{" "}
              <span className="team-mark team-mark--red">fancy video</span> of om samen een
              bank te overvallen - wij staan voor je klaar.
            </h1>
          </div>
        </header>

        <main className="team-page">
          <section className="team-static-video" id="team-video" aria-labelledby="team-video-title">
            <div className="team-static-video__inner">
              <header className="team-static-video__header">
                <h2 id="team-video-title">Teamvideo</h2>
              </header>

              <div className={`team-static-video__frame ${isVideoPlaying ? "is-playing" : ""}`}>
                <video
                  aria-label="Ami Amis teamvideo"
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
                    aria-label="Speel de Ami Amis teamvideo"
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

          <section
            className="de-amis-section"
            id="team-collage"
            aria-label="Ami Amis teamleden"
            ref={teamSectionRef}
          >
            <div className="de-amis-pin-stage">
              <div className="de-amis-title-lockup">
                <h2>De Amis</h2>
                <p>
                  Ami awie? Ami Amis. Ons team van strijders en durvers verzet
                  bergen. Vanuit ons hoofdkwartier op de drukste winkelstraat
                  van Antwerpen smeden we de lijpste ideeën en produceren we de
                  graafste content.
                </p>
              </div>

              <div className="team-rail-viewport" aria-label="Ami Amis team dossiers">
                <TeamDossierGrid profiles={teamMembers} />
              </div>
            </div>
          </section>

          <section className="team-total-care" aria-labelledby="team-total-care-title">
            <div className="team-total-care__inner">
              <p className="team-total-care__eyebrow">Op zoek naar totale ontzorging?</p>
              <h2 id="team-total-care-title">We got you!</h2>
              <p className="team-total-care__body">
                Bij ons kan je terecht voor een totaal (content)marketingpakket: van video,
                fotografie en animatie tot grafisch design en websitecreatie -en
                optimalisatie... Kom eens langs om te sparren over je marketingstrategie!
              </p>
              <a className="button button--yellow" href={assetPath("/contact/")}>Kom sparren</a>
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
