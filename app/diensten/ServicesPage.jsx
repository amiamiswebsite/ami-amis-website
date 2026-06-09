"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const services = [
  {
    number: "01",
    title: "Strategie & concept",
    line: "Eerst denken. Dan knallen.",
    tags: ["Merkstrategie", "Concept", "Positionering", "Campagneplan"],
    visual: "idea",
  },
  {
    number: "02",
    title: "Video & campagnes",
    line: "Video die blijft hangen.",
    tags: ["Campagnes", "Commercials", "Shortform", "Vertical video"],
    visual: "camera",
  },
  {
    number: "03",
    title: "Social content",
    line: "Content zonder gedoe.",
    tags: ["Shortform", "Reels", "Stories", "UGC"],
    visual: "social",
  },
  {
    number: "04",
    title: "Fotografie, design & branding",
    line: "Alles moet eruitzien alsof het klopt.",
    tags: ["Branding", "Design", "Fotografie", "Webdesign"],
    visual: "design",
  },
  {
    number: "05",
    title: "Montage, animatie & audio",
    line: "De afwerking maakt het verschil.",
    tags: ["Montage", "Animatie", "Audio", "Sound design"],
    visual: "audio",
  },
];

const craftTags = [
  "Video",
  "Social content",
  "Branding",
  "Webdesign",
  "Fotografie",
  "Animatie",
  "Audio",
  "Campagnes",
  "Shortform",
  "Vertical video",
  "Reels",
  "Stories",
  "UGC",
  "Copy",
  "Editing",
];

const processSteps = [
  { title: "Vraag scherpstellen", icon: "chat", accent: "yellow" },
  { title: "Concept bouwen", icon: "idea", accent: "red" },
  { title: "Maken", icon: "clapper", accent: "blue" },
  { title: "Verspreiden", icon: "paper", accent: "yellow" },
  { title: "Bijsturen", icon: "chart", accent: "red" },
];

function ServicesHero() {
  return (
    <section className="services-hero" aria-labelledby="services-title">
      <div className="services-hero__copy">
        <p className="services-script-label">Diensten</p>
        <h1 id="services-title">Alles wat je merk nodig heeft om gezien te worden.</h1>
        <p>
          Van strategie tot video, design, social content en distributie. Eén team,
          één lijn, één duidelijk plan.
        </p>
        <a className="button button--red services-hero__button" href={assetPath("/contact/")}>
          Plan een quick call
        </a>
      </div>

      <div className="services-hero__collage" aria-hidden="true">
        <div className="services-eye-cutout">
          <img
            src={assetPath("/images/services/services-eye.jpg")}
            alt=""
            decoding="async"
          />
        </div>
        <span className="services-collage-burst">*</span>
        <span className="services-collage-rays services-collage-rays--top" />
        <div className="services-paper-note">
          <span>Content</span>
          <span>met karakter.</span>
          <i />
        </div>
        <span className="services-smiley-sticker">:) </span>
        <span className="services-red-doodle" />
      </div>
    </section>
  );
}

function ServicesStatement() {
  return (
    <section className="services-statement" aria-labelledby="services-statement-title">
      <span className="services-statement__spark" aria-hidden="true">*</span>
      <h2 id="services-statement-title">Geen losse content. Wel een compleet plaatje.</h2>
      <p>
        Strategie, creatie en distributie in één flow. Dat is hoe we merken laten
        opvallen én groeien.
      </p>
      <span className="services-statement__doodle" aria-hidden="true" />
    </section>
  );
}

function ServiceVisual({ type }) {
  return (
    <div className={`service-visual service-visual--${type}`} aria-hidden="true">
      {type === "idea" && (
        <>
          <span className="service-visual__star" />
          <span className="service-visual__note" />
          <span className="service-visual__bulb" />
          <span className="service-visual__arrow" />
        </>
      )}
      {type === "camera" && (
        <>
          <span className="service-visual__sun" />
          <img src={assetPath("/assets/hand-camera.png")} alt="" loading="lazy" decoding="async" />
          <span className="service-visual__play" />
        </>
      )}
      {type === "social" && (
        <>
          <span className="service-visual__burst" />
          <img src={assetPath("/assets/social-phone-organic-growth.png")} alt="" loading="lazy" decoding="async" />
          <span className="service-visual__heart">♥</span>
        </>
      )}
      {type === "design" && (
        <>
          <span className="service-visual__tape" />
          <span className="service-visual__letter service-visual__letter--sans">A</span>
          <span className="service-visual__letter service-visual__letter--serif">a</span>
        </>
      )}
      {type === "audio" && (
        <>
          <span className="service-visual__circle" />
          <span className="service-visual__wave service-visual__wave--back" />
          <span className="service-visual__wave" />
        </>
      )}
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <span className="service-card__number">{service.number}</span>
      <ServiceVisual type={service.visual} />
      <div className="service-card__copy">
        <h2>{service.title}</h2>
        <p>{service.line}</p>
      </div>
      <ul className="services-tags" aria-label={`${service.title} onderdelen`}>
        {service.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}

function ServicesGrid() {
  return (
    <section className="services-grid-section" aria-label="Diensten">
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.number} service={service} />
        ))}
      </div>
    </section>
  );
}

function ServicesTagCloud() {
  return (
    <section className="services-cloud" aria-labelledby="services-cloud-title">
      <h2 id="services-cloud-title">Wat we maken</h2>
      <ul className="services-cloud__tags">
        {craftTags.map((tag) => (
          <li className="services-cloud__tag" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProcessIcon({ type }) {
  return <span className={`services-process-icon services-process-icon--${type}`} aria-hidden="true" />;
}

function ServicesProcess() {
  return (
    <section className="services-process" aria-labelledby="services-process-title">
      <h2 id="services-process-title">Van idee naar impact</h2>
      <ol className="services-process__steps">
        {processSteps.map((step, index) => (
          <li className={`services-process__step services-process__step--${step.accent}`} key={step.title}>
            <span className="services-process__number">{index + 1}</span>
            <ProcessIcon type={step.icon} />
            <h3>{step.title}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ServicesCTA() {
  return (
    <section className="services-cta" aria-labelledby="services-cta-title">
      <span className="services-cta__bubble" aria-hidden="true">let&apos;s make noise.</span>
      <div className="services-cta__copy">
        <h2 id="services-cta-title">Klaar om iets te maken dat blijft hangen?</h2>
        <a className="button button--black" href={assetPath("/contact/")}>
          Plan een quick call
        </a>
      </div>
      <span className="services-cta__hand" aria-hidden="true">V</span>
    </section>
  );
}

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="services-page">
          <a className="hero__logo services-page__logo" href={assetPath("/")} aria-label="Ami Amis home" />
          <ServicesHero />
          <ServicesStatement />
          <ServicesGrid />
          <ServicesTagCloud />
          <ServicesProcess />
          <ServicesCTA />
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="services" />
    </>
  );
}
