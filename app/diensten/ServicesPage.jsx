"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const flowSteps = [
  {
    number: "01",
    label: "Strategie",
    text: "We bepalen wat je wil zeggen, tegen wie en waarom.",
  },
  {
    number: "02",
    label: "Content",
    text: "We vertalen dat naar formats, verhalen en campagnes.",
  },
  {
    number: "03",
    label: "Productie",
    text: "We maken video, foto, design, animatie en audio.",
  },
  {
    number: "04",
    label: "Distributie",
    text: "We denken mee over kanalen, timing en inzet.",
  },
  {
    number: "05",
    label: "Groei",
    text: "We bouwen aan zichtbaarheid die blijft hangen.",
  },
];

const services = [
  {
    number: "01",
    title: "Strategie & concept",
    line: "Eerst denken. Dan knallen.",
    tags: ["Strategie", "Concept", "Positionering", "Campagneplan"],
  },
  {
    number: "02",
    title: "Video & campagnes",
    line: "Video die blijft hangen.",
    tags: ["Campagnes", "Commercials", "Shortform", "Vertical video"],
  },
  {
    number: "03",
    title: "Social content",
    line: "Content zonder gedoe.",
    tags: ["Reels", "Stories", "UGC", "Contentplanning"],
  },
  {
    number: "04",
    title: "Fotografie, design & branding",
    line: "Alles moet eruitzien alsof het klopt.",
    tags: ["Fotografie", "Branding", "Design", "Webdesign"],
  },
  {
    number: "05",
    title: "Montage, animatie & audio",
    line: "De afwerking maakt het verschil.",
    tags: ["Montage", "Animatie", "Audio", "Sound design"],
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
  "Reels",
  "Copy",
  "Editing",
];

function ServicesHero() {
  return (
    <section className="services-hero" aria-labelledby="services-title">
      <div className="services-hero__copy">
        <p className="services-script-label">Diensten</p>
        <h1 id="services-title">
          Alles om je merk{" "}
          <span className="services-visible-word">
            zichtbaar
            <svg viewBox="0 0 260 92" aria-hidden="true">
              <path d="M18 52C35 16 217 8 244 42C269 74 61 90 20 62C7 53 9 39 32 29" />
            </svg>
          </span>{" "}
          te maken.
        </h1>
        <p>
          Strategie, content, productie en distributie. Eén team, één plan, één
          duidelijke lijn.
        </p>
        <a className="button button--red services-hero__button" href={assetPath("/contact/")}>
          Plan een quick call
        </a>
      </div>

      <div className="services-hero__collage" aria-hidden="true">
        <div className="services-eye-cutout">
          <img src={assetPath("/images/services/services-eye.jpg")} alt="" decoding="async" />
        </div>
        <span className="services-collage-burst">*</span>
        <div className="services-paper-note">
          <span>Content</span>
          <span>met karakter.</span>
          <i />
        </div>
        <span className="services-smiley-sticker">:)</span>
      </div>
    </section>
  );
}

function ServicesFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);

    if (!nodes.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveStep(Number(visible.target.dataset.stepIndex || 0));
        }
      },
      {
        rootMargin: "-34% 0px -38% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75],
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="services-flow"
      aria-labelledby="services-flow-title"
      style={{ "--services-flow-progress": `${((activeStep + 1) / flowSteps.length) * 100}%` }}
    >
      <div className="services-flow__sticky">
        <p className="services-flow__eyebrow">Van idee naar impact</p>
        <h2 id="services-flow-title">Een duidelijke flow. Geen losse flodders.</h2>
        <nav className="services-flow__nav" aria-label="Diensten flow">
          {flowSteps.map((step, index) => (
            <a
              className={index === activeStep ? "is-active" : ""}
              href={`#diensten-flow-${index + 1}`}
              key={step.label}
            >
              {step.label}
            </a>
          ))}
        </nav>
      </div>

      <ol className="services-flow__steps">
        {flowSteps.map((step, index) => (
          <li
            className={`services-flow__step${index === activeStep ? " is-active" : ""}`}
            data-step-index={index}
            id={`diensten-flow-${index + 1}`}
            key={step.label}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
          >
            <span>{step.number}</span>
            <h3>{step.label}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <span className="service-card__number">{service.number}</span>
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
    <section className="services-grid-section" aria-label="Compacte diensten">
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

function ServicesCTA() {
  return (
    <section className="services-cta" aria-labelledby="services-cta-title">
      <div className="services-cta__copy">
        <p>klaar?</p>
        <h2 id="services-cta-title">Klaar om iets te maken dat blijft hangen?</h2>
        <a className="button button--black" href={assetPath("/contact/")}>
          Plan een quick call
        </a>
      </div>
      <span className="services-cta__accent" aria-hidden="true" />
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
          <ServicesFlow />
          <ServicesGrid />
          <ServicesTagCloud />
          <ServicesCTA />
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="services" />
    </>
  );
}
