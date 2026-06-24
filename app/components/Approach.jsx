"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const steps = [
  {
    number: "1.",
    title: "Hallo, met Brent?",
    text: "Alles begint met een gesprekje met Brent, ons immer goedgehumeurd aanspreekpunt. Geen stijve intake, gewoon een vlot constructief gesprek.",
    src: assetPath("/assets/approach-01-call.png"),
    className: "approach-card--coffee",
  },
  {
    number: "2.",
    title: "Sparren met Creative",
    text: "Daarna zet Brent een meeting op met de juiste creatieve compadre voor jullie merk. Dan begint de fun. In een brainstorm leggen we onze ideeën op tafel en luisteren we naar die van jullie.",
    src: assetPath("/assets/approach-02-spar.png"),
    className: "approach-card--spar",
  },
  {
    number: "3.",
    title: "Ons masterplan",
    text: "Tijd om het concreet te maken. Onze creatieve compadres zetten de puntjes op de i, onze producers nemen over en leiden de voorbereiding in goede banen.",
    src: assetPath("/assets/approach-03-plan.png"),
    className: "approach-card--plan",
  },
  {
    number: "4.",
    title: "Lights. Camera. Action",
    text: "Time for action. Ons in-house team brengt het plan tot leven. Van video, fotografie, design, animatie, audio tot een volledige campagne.",
    src: assetPath("/assets/approach-03-camera.png"),
    className: "approach-card--action",
  },
  {
    number: "5.",
    title: "Watch Party",
    text: "Na afloop kijken we wat werkte, wat beter kan en hoe we jullie verder kunnen helpen groeien.",
    src: assetPath("/assets/approach-04-watch.png"),
    className: "approach-card--watch",
  },
  {
    number: "6.",
    title: "Hallo, Brent nog eens!",
    text: "Na afloop koppelt uw kapoentje Brent nog eens terug. Dat is wat Amis doen, toch?",
    src: assetPath("/assets/approach-05-callback.png"),
    className: "approach-card--callback",
  },
];

const personalWord = "persoonlijke".split("");

export default function Approach() {
  const sectionRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof window === "undefined") {
      return undefined;
    }

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastActiveStep = 0;

    const clearStepStyles = () => {
      section.classList.remove("approach--mobile-scroll");
      section.style.removeProperty("--approach-mobile-progress");
      section.querySelectorAll(".approach-card").forEach((card) => {
        card.style.removeProperty("--step-opacity");
        card.style.removeProperty("--step-y");
        card.style.removeProperty("--step-scale");
        card.style.removeProperty("--step-z");
      });
      setActiveStepIndex(0);
      lastActiveStep = 0;
    };

    const updateScrollState = () => {
      frame = 0;

      if (!mobileQuery.matches || reducedMotionQuery.matches) {
        clearStepStyles();
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const scrollableDistance = Math.max(1, section.offsetHeight - viewportHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
      const scaledStep = progress * Math.max(steps.length - 1, 1);
      const nextActiveStep = Math.min(steps.length - 1, Math.max(0, Math.round(scaledStep)));

      section.classList.add("approach--mobile-scroll");
      section.style.setProperty("--approach-mobile-progress", progress.toFixed(4));

      section.querySelectorAll(".approach-card").forEach((card, index) => {
        const offset = index - scaledStep;
        const distance = Math.abs(offset);
        const isFarAway = distance > 1.32;
        const opacity = isFarAway ? 0 : Math.max(0.16, 1 - distance * 0.68);
        const y = Math.max(-74, Math.min(74, offset * 54));
        const scale = 1 - Math.min(distance, 1) * 0.055;
        const z = Math.round(60 - distance * 10);

        card.style.setProperty("--step-opacity", opacity.toFixed(3));
        card.style.setProperty("--step-y", `${y.toFixed(1)}px`);
        card.style.setProperty("--step-scale", scale.toFixed(3));
        card.style.setProperty("--step-z", `${z}`);
      });

      if (nextActiveStep !== lastActiveStep) {
        lastActiveStep = nextActiveStep;
        setActiveStepIndex(nextActiveStep);
      }
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateScrollState);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mobileQuery.addEventListener("change", scheduleUpdate);
    reducedMotionQuery.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mobileQuery.removeEventListener("change", scheduleUpdate);
      reducedMotionQuery.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <section
      className="approach"
      id="aanpak"
      ref={sectionRef}
      style={{
        "--approach-step-count": steps.length,
        "--approach-scroll-height": `${steps.length * 100}svh`,
      }}
    >
      <div className="approach__sticky">
        <h2 aria-label="Onze persoonlijke aanpak">
          <span aria-hidden="true">Onze </span>
          <span className="approach-wave" aria-hidden="true">
            {personalWord.map((letter, index) => (
              <span className="approach-wave__char" key={`${letter}-${index}`}>
                {letter}
              </span>
            ))}
          </span>
          <span aria-hidden="true"> aanpak</span>
        </h2>
        <div className="approach__grid">
          {steps.map((step, index) => (
            <article
              className={`approach-card ${step.className}${activeStepIndex === index ? " is-active" : ""}`}
              key={step.title}
              aria-current={activeStepIndex === index ? "step" : undefined}
            >
              {step.src ? (
                <img src={step.src} alt="" />
              ) : step.visual ? (
                <span className={`approach-placeholder approach-placeholder--${step.visual}`} aria-hidden="true" />
              ) : (
                <span className="burst" aria-hidden="true" />
              )}
              <h3>
                <span className="approach-card__number">{step.number}</span>
                <span>{step.title}</span>
              </h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="approach__mobile-progress" aria-hidden="true">
          {steps.map((step, index) => (
            <span className={activeStepIndex === index ? "is-active" : ""} key={`approach-progress-${step.title}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
