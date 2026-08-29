"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Approach from "../components/Approach";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import Icon from "../components/ui/Icon";
import { workCases } from "../../src/data/workCases";
import { assetPath } from "../../src/lib/assetPath";
import { buildServiceIntentHref, trackServiceIntent } from "../../src/lib/serviceIntent";
import styles from "./ServicesPageTwo.module.css";
import {
  serviceTwoApproachCards,
  serviceTwoFaqs,
  serviceTwoProblems,
  serviceTwoTools,
} from "./servicesTwoContent";

const CASES_BY_SLUG = new Map(workCases.map((workCase) => [workCase.slug, workCase]));
const GENERAL_INTENT = {
  source: "diensten-2",
  problemId: "algemeen",
  problemNumber: "00",
  problemTitle: "Algemeen",
};
const OTHER_PROBLEM_INTENT = {
  source: "diensten-2",
  problemId: "ander-probleem",
  problemNumber: "07",
  problemTitle: "Een ander probleem?",
};
const SERVICES_HERO_VIMEO_ID = "1220145767";
const SERVICES_HERO_VIMEO_PLAYER_ID = `services-hero-vimeo-${SERVICES_HERO_VIMEO_ID}`;
const SERVICES_HERO_VIMEO_SRC = `https://player.vimeo.com/video/${SERVICES_HERO_VIMEO_ID}?autoplay=1&loop=1&muted=1&controls=0&autopause=0&playsinline=1&title=0&byline=0&portrait=0&dnt=1&player_id=${SERVICES_HERO_VIMEO_PLAYER_ID}`;
const SHOW_APPROACH_BACKUP = false;

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.("change", updatePreference);

    return () => mediaQuery.removeEventListener?.("change", updatePreference);
  }, []);

  return reducedMotion;
}

function usePointerDepth(disabled = false, intensity = 4.5) {
  const ref = useRef(null);
  const frameRef = useRef(0);

  const update = useCallback(
    (x, y, lift) => {
      if (disabled || !ref.current) {
        return;
      }

      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        ref.current?.style.setProperty("--tilt-x", `${-y * intensity}deg`);
        ref.current?.style.setProperty("--tilt-y", `${x * intensity}deg`);
        ref.current?.style.setProperty("--depth-x", `${x * 10}px`);
        ref.current?.style.setProperty("--depth-y", `${y * 10}px`);
        ref.current?.style.setProperty("--depth-lift", `${lift}px`);
      });
    },
    [disabled, intensity],
  );

  const onPointerMove = useCallback(
    (event) => {
      if (disabled || event.pointerType === "touch") {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      update(x, y, -5);
    },
    [disabled, update],
  );

  const onPointerLeave = useCallback(() => update(0, 0, 0), [update]);

  useEffect(
    () => () => {
      window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  return { ref, onPointerMove, onPointerLeave };
}

function getCaseReference(reference) {
  const slug = typeof reference === "string" ? reference : reference.slug;
  const workCase = CASES_BY_SLUG.get(slug);

  if (!workCase || workCase.status !== "ready" || !workCase.href || !workCase.image) {
    return null;
  }

  return {
    ...workCase,
    client: typeof reference === "string" ? workCase.client : reference.displayName,
  };
}

function resolveCaseReference(reference) {
  if (typeof reference === "object" && reference.placeholder) {
    return {
      type: "placeholder",
      displayName: reference.displayName,
      placeholderText: reference.placeholderText,
    };
  }

  const workCase = getCaseReference(reference);
  return workCase ? { type: "case", workCase } : null;
}

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

function ButtonArrow({ className = "" }) {
  return (
    <span className={`${styles.buttonArrow} ${className}`.trim()} aria-hidden="true">
      <svg className={styles.buttonArrowIcon} viewBox="0 0 24 24" focusable="false">
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </svg>
    </span>
  );
}

function ServiceIntentLink({ children, className = "", intent }) {
  const normalizedIntent = { source: "diensten-2", ...intent };

  return (
    <a
      className={className}
      data-service-source={normalizedIntent.source}
      data-service-problem={normalizedIntent.problemId}
      data-service-problem-title={normalizedIntent.problemTitle}
      data-service-cta={normalizedIntent.ctaLabel}
      href={buildServiceIntentHref(normalizedIntent)}
      onClick={() => trackServiceIntent(normalizedIntent)}
    >
      <span className={styles.textLinkLabel}>{children}</span>
      <ButtonArrow />
    </a>
  );
}

function DepthFrame({ children, className = "", href, reducedMotion, label }) {
  const depth = usePointerDepth(reducedMotion);
  const sharedProps = {
    className: `${styles.depthFrame} ${className}`,
    onPointerLeave: depth.onPointerLeave,
    onPointerMove: depth.onPointerMove,
    ref: depth.ref,
  };

  if (href) {
    return (
      <a {...sharedProps} aria-label={label} href={assetPath(href)}>
        {children}
      </a>
    );
  }

  return <div {...sharedProps}>{children}</div>;
}

function RisoHeading({ ariaLabel, className = "", id, lines }) {
  return (
    <h2 aria-label={ariaLabel} className={`${styles.risoHeading} ${className}`.trim()} id={id}>
      {lines.map((line) => (
        <span className={styles.risoLine} key={line}>
          <span className={styles.risoInk} aria-hidden="true" />
          <span className={styles.risoText}>{line}</span>
        </span>
      ))}
    </h2>
  );
}

function TypingRotator({ reducedMotion }) {
  const phrases = useMemo(() => ["niet gewoon met een video.", "met een plan."], []);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [phase, setPhase] = useState("hold");

  useEffect(() => {
    if (reducedMotion) return undefined;

    const target = phrases[phraseIndex];
    let timer;

    if (phase === "hold") {
      timer = window.setTimeout(() => setPhase("select"), 1250);
    } else if (phase === "select") {
      timer = window.setTimeout(() => setPhase("delete"), 320);
    } else if (phase === "delete") {
      if (text.length > 0) {
        timer = window.setTimeout(
          () => setText((value) => value.slice(0, -1)),
          28,
        );
      } else {
        timer = window.setTimeout(() => {
          setPhraseIndex((value) => (value + 1) % phrases.length);
          setPhase("type");
        }, 90);
      }
    } else if (phase === "type") {
      if (text.length < target.length) {
        timer = window.setTimeout(
          () => setText(target.slice(0, text.length + 1)),
          46,
        );
      } else {
        timer = window.setTimeout(() => setPhase("hold"), 180);
      }
    }

    return () => window.clearTimeout(timer);
  }, [phase, phraseIndex, phrases, reducedMotion, text]);

  return (
    <span className={styles.heroRotator} aria-hidden="true">
      <span className={styles.heroRotatorSizer}>niet gewoon met een video.</span>
      <span
        className={`${styles.heroTypedTerm} ${
          phase === "select" ? styles.heroTypedTermSelected : ""
        }`}
      >
        {reducedMotion ? "met een plan." : text}
      </span>
    </span>
  );
}

function ServicesHeroVideo({ reducedMotion }) {
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
    <DepthFrame className={`${styles.heroVisual} ${styles.heroVideoFrame}`} reducedMotion={reducedMotion}>
      <iframe
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        data-case-vimeo-player={SERVICES_HERO_VIMEO_PLAYER_ID}
        ref={iframeRef}
        src={SERVICES_HERO_VIMEO_SRC}
        title="Ami Amis dienstenvideo"
      />
      <button
        aria-label={soundOn ? "Zet geluid uit" : "Zet geluid aan"}
        aria-pressed={soundOn}
        className={styles.heroSoundButton}
        onClick={toggleSound}
        type="button"
      >
        <Icon name={soundOn ? "volume" : "volumeOff"} />
      </button>
    </DepthFrame>
  );
}

function ServicesHero({ reducedMotion }) {
  return (
    <section className={styles.hero} aria-labelledby="services-two-title">
      <div className={styles.topBar}>
        <a
          className={`hero__logo ${styles.logo}`}
          href={assetPath("/")}
          aria-label="Ami Amis home"
        />
      </div>

      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <h1
            id="services-two-title"
            aria-label="Wij komen niet gewoon met een video. Wij komen met een plan."
          >
            <span>Wij komen</span>
            <TypingRotator reducedMotion={reducedMotion} />
          </h1>
          <p>
            Je hoeft nog niet te weten of je een campagne, een video of een volledige contentflow nodig hebt. Vertel ons jouw ambities. Wij maken die waar.
          </p>
          <ServiceIntentLink
            className={styles.primaryButton}
            intent={{ ...GENERAL_INTENT, ctaLabel: "Vertel ons je ambities" }}
          >
            Vertel ons je ambities
          </ServiceIntentLink>
        </div>

        <ServicesHeroVideo reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}

function ServicesApproach() {
  return (
    <div className={styles.servicesApproach}>
      <Approach variant="home2" />
    </div>
  );
}

function ApproachTimelinePreview() {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const frameRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  const syncTimeline = useCallback(() => {
    if (frameRef.current) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;

      const track = trackRef.current;
      const items = itemRefs.current.filter(Boolean);

      if (!track || items.length === 0) {
        return;
      }

      const snapportCenter = track.scrollLeft + track.clientWidth / 2;
      let closestStep = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - snapportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestStep = index;
        }
      });

      setActiveStep(closestStep);
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    syncTimeline();
    track.addEventListener("scroll", syncTimeline, { passive: true });
    window.addEventListener("resize", syncTimeline);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      track.removeEventListener("scroll", syncTimeline);
      window.removeEventListener("resize", syncTimeline);
    };
  }, [syncTimeline]);

  const scrollToStep = useCallback((index) => {
    const track = trackRef.current;
    const item = itemRefs.current[index];

    if (!track || !item) {
      return;
    }

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const centeredScroll = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
    const targetScroll = Math.min(maxScroll, Math.max(0, centeredScroll));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollTo({
      behavior: reducedMotion ? "auto" : "smooth",
      left: targetScroll,
    });
  }, []);

  const handleTimelineKeyDown = useCallback(
    (event) => {
      let nextStep = activeStep;

      if (event.key === "ArrowRight") {
        nextStep = Math.min(serviceTwoApproachCards.length - 1, activeStep + 1);
      } else if (event.key === "ArrowLeft") {
        nextStep = Math.max(0, activeStep - 1);
      } else if (event.key === "Home") {
        nextStep = 0;
      } else if (event.key === "End") {
        nextStep = serviceTwoApproachCards.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      scrollToStep(nextStep);
    },
    [activeStep, scrollToStep],
  );

  return (
    <section
      className={styles.approachTimeline}
      aria-labelledby="services-two-approach-timeline"
      id="aanpak"
    >
      <div className={styles.approachTimelineInner}>
        <header className={styles.approachTimelineHeader}>
          <h2 aria-label="Wat kan je verwachten?" id="services-two-approach-timeline">
            <span>Wat kan je</span>
            <span>verwachten?</span>
          </h2>
          <span
            aria-atomic="true"
            aria-label={`Stap ${activeStep + 1} van ${serviceTwoApproachCards.length}`}
            aria-live="polite"
            className={styles.approachTimelineStatus}
            key={`timeline-status-${activeStep}`}
            role="status"
          >
            <strong aria-hidden="true">{activeStep + 1}</strong>
            <span aria-hidden="true">/{serviceTwoApproachCards.length}</span>
          </span>
        </header>

        <ol
          aria-label="Onze aanpak in zes stappen"
          className={styles.approachTimelineList}
          onKeyDown={handleTimelineKeyDown}
          ref={trackRef}
          tabIndex={0}
        >
          {serviceTwoApproachCards.map((item, index) => {
            const isActive = index === activeStep;

            return (
              <li
                aria-current={index === activeStep ? "step" : undefined}
                className={`${styles.approachTimelineStep} ${
                  isActive ? styles.approachTimelineStepActive : ""
                }`}
                data-step-number={index + 1}
                data-timeline-step={index}
                key={item.title}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
              >
                <div className={styles.approachTimelineCard}>
                  <div className={styles.approachTimelineCopy}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>

                  {item.image ? (
                    <figure className={styles.approachTimelineImage}>
                      <img
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                        loading="lazy"
                        src={assetPath(item.image)}
                      />
                    </figure>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function ApproachTimelineOpen() {
  const handleOpenTimelineScroll = useCallback((event) => {
    const rail = event.currentTarget;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const progress = maxScroll > 0 ? rail.scrollLeft / maxScroll : 1;

    rail.style.setProperty("--open-timeline-progress", `${Math.round(18 + progress * 82)}%`);
  }, []);

  return (
    <section
      className={styles.approachOpenTimeline}
      aria-labelledby="services-two-approach-open"
    >
      <div className={styles.approachOpenTimelineInner}>
        <header className={styles.approachOpenTimelineHeader}>
          <h2 aria-label="Wat kan je verwachten?" id="services-two-approach-open">
            <span>Wat kan je</span>
            <span>verwachten?</span>
          </h2>
        </header>

        <ol
          aria-label="Wat kan je verwachten, horizontaal scrollbaar"
          className={styles.approachOpenTimelineList}
          onScroll={handleOpenTimelineScroll}
        >
          {serviceTwoApproachCards.map((item, index) => (
            <li className={styles.approachOpenTimelineStep} key={item.title}>
              <span className={styles.approachOpenTimelineNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.approachOpenTimelineCopy}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <figure className={styles.approachOpenTimelineImage}>
                <img
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  loading="lazy"
                  src={assetPath(item.image)}
                />
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CasePreview({ workCase, reducedMotion }) {
  return (
    <DepthFrame
      className={styles.casePreview}
      href={workCase.href}
      label={`${workCase.client} bekijken`}
      reducedMotion={reducedMotion}
    >
      <img src={assetPath(workCase.image)} alt={`${workCase.client} casebeeld`} loading="lazy" />
      <span>{workCase.client}</span>
    </DepthFrame>
  );
}

function CasePlaceholder({ displayName, placeholderText }) {
  return (
    <div className={styles.casePlaceholder} aria-label={`${displayName}, toekomstige case`}>
      <span>{placeholderText}</span>
      <small>case volgt</small>
    </div>
  );
}

function ProblemArticle({ problem, reducedMotion }) {
  const relatedCases = problem.cases.map(resolveCaseReference).filter(Boolean);
  const intent = {
    source: "diensten-2",
    problemId: problem.id,
    problemNumber: problem.number,
    problemTitle: problem.title,
    ctaLabel: problem.cta,
  };

  return (
    <article className={styles.problemArticle} id={problem.id}>
      <header>
        <span>{problem.number}</span>
        <h3>{problem.title}</h3>
      </header>

      <div className={styles.problemContent}>
        <div className={styles.problemCopy}>
          {problem.body ? (
            <p className={styles.problemBody}>{problem.body}</p>
          ) : (
            <>
              <p className={styles.problemQuote}>{problem.quote}</p>
              <dl>
                <div>
                  <dt>Onze fix:</dt>
                  <dd>{problem.fix}</dd>
                </div>
                <div>
                  <dt>Wat het oplevert:</dt>
                  <dd>{problem.result}</dd>
                </div>
              </dl>
            </>
          )}

          <ServiceIntentLink className={styles.textLink} intent={intent}>
            {problem.cta}
          </ServiceIntentLink>
        </div>

        {relatedCases.length > 0 ? (
          <div className={`${styles.caseGrid} ${relatedCases.length > 1 ? styles.caseGridDouble : ""}`}>
            {relatedCases.map((caseReference) =>
              caseReference.type === "case" ? (
                <CasePreview
                  key={caseReference.workCase.slug}
                  workCase={caseReference.workCase}
                  reducedMotion={reducedMotion}
                />
              ) : (
                <CasePlaceholder
                  displayName={caseReference.displayName}
                  key={`placeholder-${caseReference.displayName}`}
                  placeholderText={caseReference.placeholderText}
                />
              ),
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Problems({ reducedMotion }) {
  return (
    <section className={styles.problems} aria-labelledby="services-two-problems">
      <div className={styles.problemLayout}>
        <aside className={styles.problemAside}>
          <RisoHeading
            ariaLabel="Wa is uw probleem, gast?!"
            className={styles.problemTitle}
            id="services-two-problems"
            lines={["Wa is uw", "probleem,", "gast?!"]}
          />
          <p className={styles.problemSubtitle}>
            Resoneert één van onderstaande uitspraken bij jou?
          </p>
        </aside>

        <div className={styles.problemList}>
          {serviceTwoProblems.map((problem) => (
            <ProblemArticle key={problem.id} problem={problem} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Interstitial() {
  return (
    <section className={styles.interstitial} aria-labelledby="services-two-partner">
      <div className={styles.partnerStatement}>
        <h2
          id="services-two-partner"
          aria-label="I got 99 problems but a goeie contentpartner ain’t one"
        >
          <span aria-hidden="true">I got 99 problems</span>
          <span aria-hidden="true">but a goeie</span>
          <em aria-hidden="true">contentpartner</em>
          <span aria-hidden="true">ain’t one</span>
        </h2>
      </div>
    </section>
  );
}

function Tools({ reducedMotion }) {
  const [activeTool, setActiveTool] = useState(0);
  const active = serviceTwoTools[activeTool] || serviceTwoTools[0];
  const activeCase = active.caseSlug ? getCaseReference(active.caseSlug) : null;

  return (
    <section className={styles.tools} aria-labelledby="services-two-tools">
      <header className={styles.sectionHeading}>
        <RisoHeading id="services-two-tools" lines={["Onze tools:"]} />
      </header>

      <div className={styles.toolsGrid}>
        <div className={styles.toolList}>
          {serviceTwoTools.map((tool, index) => {
            const workCase = tool.caseSlug ? getCaseReference(tool.caseSlug) : null;
            const href = tool.href || workCase?.href || "/work/";

            return (
              <a
                className={activeTool === index ? styles.activeTool : ""}
                href={assetPath(href)}
                key={`${tool.label}-${index}`}
                onFocus={() => setActiveTool(index)}
                onMouseEnter={() => setActiveTool(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {tool.label}
                <ButtonArrow />
              </a>
            );
          })}
        </div>

        <div className={styles.toolPreview} aria-live="polite">
          {activeCase ? (
            <DepthFrame
              href={activeCase.href}
              label={`${activeCase.client} bekijken`}
              reducedMotion={reducedMotion}
            >
              <img
                src={assetPath(activeCase.image)}
                alt={`${activeCase.client} casebeeld`}
                loading="lazy"
              />
              <span>{activeCase.client}</span>
            </DepthFrame>
          ) : (
            <a
              className={`${styles.toolFallback} ${active.placeholder ? styles.toolPlaceholder : ""}`}
              href={assetPath(active.href || "/work/")}
            >
              <span>{active.placeholder || "…"}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.faq} aria-labelledby="services-two-faq">
      <header className={styles.sectionHeading}>
        <RisoHeading id="services-two-faq" lines={["FAQ:"]} />
      </header>

      <div className={styles.faqList}>
        {serviceTwoFaqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article key={faq.question}>
              <h3>
                <button
                  aria-controls={`services-two-faq-panel-${index}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  type="button"
                >
                  <span>{faq.question}</span>
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
              </h3>
              <div
                className={`${styles.faqPanel} ${isOpen ? styles.openFaq : ""}`}
                id={`services-two-faq-panel-${index}`}
                inert={!isOpen}
              >
                <div>
                  {faq.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {faq.contactCta ? (
                    <ServiceIntentLink
                      className={styles.faqLink}
                      intent={{ ...GENERAL_INTENT, ctaLabel: faq.contactCta }}
                    >
                      {faq.contactCta}
                    </ServiceIntentLink>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className={styles.finalCta} aria-labelledby="services-two-final-title">
      <div>
        <h2 id="services-two-final-title">Een ander probleem?</h2>
        <p>Laat het weten, en wij zoeken mee naar een oplossing!</p>
      </div>
      <ServiceIntentLink
        className={styles.finalButton}
        intent={{ ...OTHER_PROBLEM_INTENT, ctaLabel: "Tell us all your problems baby" }}
      >
        Tell us all your problems baby
      </ServiceIntentLink>
    </section>
  );
}

export default function ServicesPageTwo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className={styles.page}>
          <ServicesHero reducedMotion={reducedMotion} />
          <ApproachTimelineOpen />
          {SHOW_APPROACH_BACKUP ? <ServicesApproach /> : null}
          <Problems reducedMotion={reducedMotion} />
          <Interstitial />
          <Tools reducedMotion={reducedMotion} />
          <Faq />
          <FinalCta />
        </main>
        <Footer variant="paper-flat" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay activePage="services" open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
