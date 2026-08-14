"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const steps = [
  {
    number: "1",
    title: "Hallo, met Brent?",
    text: "Alles begint met een gesprekje met Brent, ons immer goedgehumeurd aanspreekpunt. Geen stijve intake, gewoon een vlot constructief gesprek.",
    src: assetPath("/assets/approach-01-call.png"),
    className: "approach-card--coffee",
  },
  {
    number: "2",
    title: "Sparren met Creative",
    text: "Daarna zet Brent een meeting op met de juiste creatieve compadre voor jullie merk. Dan begint de fun. In een brainstorm leggen we onze ideeën op tafel en luisteren we naar die van jullie.",
    src: assetPath("/assets/approach-02-spar.png"),
    className: "approach-card--spar",
  },
  {
    number: "3",
    title: "Ons masterplan",
    text: "Tijd om het concreet te maken. Onze creatieve compadres zetten de puntjes op de i, onze producers nemen over en leiden de voorbereiding in goede banen.",
    src: assetPath("/assets/approach-03-plan.png"),
    className: "approach-card--plan",
  },
  {
    number: "4",
    title: "Lights. Camera. Action",
    text: "Time for action. Ons in-house team brengt het plan tot leven. Van video, fotografie, design, animatie, audio tot een volledige campagne.",
    src: assetPath("/assets/approach-03-camera.png"),
    className: "approach-card--action",
  },
  {
    number: "5",
    title: "Watch Party",
    text: "Na afloop kijken we wat werkte, wat beter kan en hoe we jullie verder kunnen helpen groeien.",
    src: assetPath("/assets/approach-04-watch.png"),
    className: "approach-card--watch",
  },
  {
    number: "6",
    title: "Hallo, Brent nog eens!",
    text: "Na afloop koppelt uw kapoentje Brent nog eens terug. Dat is wat Amis doen, toch?",
    src: assetPath("/assets/approach-05-callback.png"),
    className: "approach-card--callback",
  },
];

const homeTwoSteps = [
  {
    ...steps[0],
    text: "Alles begint met een gesprekje met Brent, ons immer goedgehumeurd aanspreekpunt. Hij gaat na welk probleem jullie ondervinden, en geeft aan waarmee wij jullie kunnen helpen!",
  },
  {
    ...steps[1],
    title: "Sparren met onze creative(s)",
    text: "Daarna zet Brent een meeting op met de juiste creatieve compadre(s) voor jullie merk. Nu begint de fun. Samen denken we na over marketingstrategie. Wil je daarin volledig ontzorgd worden? No worries. We got you!",
  },
  {
    ...steps[2],
    title: "Een geniaal masterplan",
    text: "Tijd om al die goeie ideeën concreet te maken. Onze creatieve compadres zetten de puntjes op de i, onze producers nemen over en leiden de voorbereiding in goede banen.",
  },
  {
    ...steps[3],
    title: "Lights. Camera. Action!",
    text: "Eèèn action. Ons in-house team brengt het plan tot leven. Van video, fotografie, design, animatie, audio tot een volledige campagne.",
  },
  {
    ...steps[4],
    text: "Opleveren die handel! Pak de popcorn want het eindproduct is klaar. En wij verzekeren jullie: da’s fire 🔥",
  },
  {
    ...steps[5],
    text: "Na afloop koppelt ons kapoentje Brent nog eens terug. Samen kijken we naar de resultaten van de samenwerking en evalueren wat de volgende keer NOG beter kan. Dat is wat Amis doen, toch?",
  },
];

const personalWord = "persoonlijke".split("");

export default function Approach({ variant = "default" }) {
  const displayedSteps = variant === "home2" ? homeTwoSteps : steps;
  const trackRef = useRef(null);
  const scrollFrameRef = useRef(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const updateActiveStep = () => {
    scrollFrameRef.current = 0;

    const track = trackRef.current;

    if (!track) {
      return;
    }

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const cards = Array.from(track.children);
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveStepIndex(closestIndex);
  };

  const handleCarouselScroll = () => {
    if (scrollFrameRef.current) {
      return;
    }

    scrollFrameRef.current = window.requestAnimationFrame(updateActiveStep);
  };

  const scrollToStep = (index) => {
    const track = trackRef.current;
    const card = track?.children[index];

    if (!track || !card) {
      return;
    }

    const trackStyles = window.getComputedStyle(track);
    const trackPaddingLeft = Number.parseFloat(trackStyles.paddingLeft) || 0;

    track.scrollTo({
      behavior: "smooth",
      left: Math.max(0, card.offsetLeft - trackPaddingLeft),
    });
  };

  const canGoBack = activeStepIndex > 0;
  const canGoForward = activeStepIndex < displayedSteps.length - 1;

  useEffect(() => {
    const resetCarousel = () => {
      if (trackRef.current) {
        trackRef.current.scrollLeft = 0;
      }

      setActiveStepIndex(0);
    };
    const resetFrame = window.requestAnimationFrame(resetCarousel);
    const resetTimer = window.setTimeout(resetCarousel, 320);
    const resetLateTimer = window.setTimeout(resetCarousel, 900);

    return () => {
      window.cancelAnimationFrame(resetFrame);
      window.clearTimeout(resetTimer);
      window.clearTimeout(resetLateTimer);

      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="approach" id="aanpak">
      <div className="approach__sticky">
        <div className="approach__header">
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
        </div>
        <div className="approach__carousel-shell">
          <div className="approach__grid" onScroll={handleCarouselScroll} ref={trackRef}>
            {displayedSteps.map((step, index) => (
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
          <div className="approach__mobile-controls" aria-label="Aanpak stappen">
            <button
              aria-label="Vorige stap"
              className="approach__mobile-button"
              disabled={!canGoBack}
              onClick={() => scrollToStep(activeStepIndex - 1)}
              type="button"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <div className="approach__mobile-dots">
              {displayedSteps.map((step, index) => (
                <button
                  aria-label={`Ga naar stap ${index + 1}: ${step.title}`}
                  className={activeStepIndex === index ? "is-active" : ""}
                  key={`approach-dot-${step.title}`}
                  onClick={() => scrollToStep(index)}
                  type="button"
                />
              ))}
            </div>
            <button
              aria-label="Volgende stap"
              className="approach__mobile-button"
              disabled={!canGoForward}
              onClick={() => scrollToStep(activeStepIndex + 1)}
              type="button"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
