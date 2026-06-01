"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";
import {
  approachKeywords,
  recordQuotes,
  studioReasons,
  teamMembers,
  timelineItems,
} from "../../src/data/teamPageData";

const contactHref = "mailto:brent@amiamis.be?subject=Kennismaking%20Ami%20Amis";

export default function TeamPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <section className="team-hero" id="team-intro" aria-label="Het Amis-team">
          <div className="team-hero__inner">
            <a className="hero__logo team-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />

            <div className="team-hero__copy">
              <p className="team-eyebrow">Het Amis-team</p>
              <h1>
                Opgepakt wegens <span>creatieve</span> overlast.
              </h1>
              <p>
                We maken video&apos;s, campagnes en content waar mensen niet
                zomaar voorbij scrollen.
              </p>
              <div className="team-hero__actions">
                <a className="button button--black" href="#mugshots">
                  Bekijk onze mugshots
                </a>
                <a className="button button--red" href={contactHref}>
                  Plan een kennismaking
                </a>
              </div>
            </div>

            <div className="team-video-card" aria-label="Placeholder voor teamvideo">
              <div className="team-video-card__screen">
                <span className="team-video-card__play" aria-hidden="true" />
                <span className="team-video-card__tag">TEAMVIDEO</span>
                <span className="team-video-card__time">00:42</span>
              </div>
              <div className="team-video-card__meta">
                <strong>Bewijsmateriaal A-01</strong>
                <span>onbewerkt enthousiasme</span>
              </div>
            </div>
          </div>
        </section>

        <main className="team-page">
          <section className="team-approach" id="aanpak">
            <div className="team-section-copy">
              <p className="team-eyebrow">Onze aanpak</p>
              <h2>We werken liever als collega&apos;s dan als leveranciers.</h2>
              <p>
                Ami Amis is de partner die mee aan tafel schuift, doorvraagt,
                durft te zeggen wat beter kan en daarna gewoon begint te maken.
                Vriendschappelijk in de omgang, direct in de feedback en allergisch
                aan opgeblazen gedoe.
              </p>
            </div>
            <div className="team-keyword-cloud" aria-label="Kernwoorden">
              {approachKeywords.map((keyword, index) => (
                <span className={`team-keyword team-keyword--${(index % 4) + 1}`} key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          <section className="mugshots" id="mugshots">
            <div className="mugshots__heading">
              <p className="team-eyebrow">Mugshot wall</p>
              <h2>
                Dossierkaarten van <span>verdachte</span> creatievelingen.
              </h2>
            </div>
            <div className="mugshot-grid">
              {teamMembers.map((member) => (
                <article className="mugshot-card" key={member.dossier} style={{ "--tilt": member.tilt }}>
                  <div className="mugshot-card__topline">
                    <span>{member.dossier}</span>
                    <span>AMI AMIS PD</span>
                  </div>
                  <div className="mugshot-card__photo">
                    <img
                      src={assetPath(member.image)}
                      alt={`${member.name} mugshot placeholder`}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: member.objectPosition }}
                    />
                    <span className="mugshot-card__height-lines" aria-hidden="true" />
                  </div>
                  <div className="mugshot-card__body">
                    <span className="mugshot-card__stamp">OPGEPAKT</span>
                    <h3>{member.name}</h3>
                    <p className="mugshot-card__role">{member.role}</p>
                    <p className="mugshot-card__label">OPGEPAKT VOOR</p>
                    <p className="mugshot-card__charge">{member.charge}</p>
                    <p className="mugshot-card__note">{member.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="team-timeline" id="geschiedenis">
            <div className="team-section-copy">
              <p className="team-eyebrow">Geschiedenis van Ami Amis</p>
              <h2>Van eenmanszaak naar collectief misdrijf.</h2>
            </div>
            <div className="team-timeline__track">
              {timelineItems.map((item) => (
                <article className="team-timeline__item" key={item.year}>
                  <span className="team-timeline__marker">{item.marker}</span>
                  <strong>{item.year}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="studio-collab" id="studios">
            <div className="team-section-copy">
              <p className="team-eyebrow">Voor studio&apos;s</p>
              <h2>Waarom studio&apos;s graag met ons samenwerken.</h2>
            </div>
            <div className="studio-collab__grid">
              {studioReasons.map((reason) => (
                <article className="studio-card" key={reason.title}>
                  <span aria-hidden="true" />
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="criminal-record" aria-label="Strafblad testimonials">
            <div className="team-section-copy">
              <p className="team-eyebrow">Strafblad</p>
              <h2>Wat er in het dossier van klanten staat.</h2>
            </div>
            <div className="criminal-record__grid">
              {recordQuotes.map((item, index) => (
                <article className={`record-card record-card--${index + 1}`} key={item.source}>
                  <span className="quote-mark">&quot;</span>
                  <p>{item.quote}</p>
                  <strong>{item.source}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="team-final-cta" id="team-contact">
            <p className="team-eyebrow">Laatste oproep</p>
            <h2>Klaar om medeplichtig te worden?</h2>
            <p>Wij zorgen voor de content. Jij voor het alibi.</p>
            <a className="button button--black" href={contactHref}>
              Plan een kennismaking
            </a>
          </section>
        </main>
        <Footer />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="team" />
    </>
  );
}
