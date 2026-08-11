"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";
import { workCases } from "../../src/data/workCases";
import {
  buildServiceIntentHref,
  trackServiceIntent,
} from "../../src/lib/serviceIntent";
import {
  problemFiles,
  serviceExpectations,
  serviceFaqs,
  serviceTools,
} from "./servicesContent";
import styles from "./ServicesPage.module.css";

const CASES_BY_SLUG = new Map(workCases.map((workCase) => [workCase.slug, workCase]));
const GENERAL_INTENT = {
  source: "diensten",
  problemId: "algemeen",
  problemNumber: "00",
  problemTitle: "Algemeen",
};
const OTHER_PROBLEM_INTENT = {
  source: "diensten",
  problemId: "ander-probleem",
  problemNumber: "07",
  problemTitle: "Een ander probleem?",
};

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

function useActiveSection(ids, options) {
  const [activeId, setActiveId] = useState(ids[0] || "");

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -46% 0px",
        threshold: [0.12, 0.24, 0.36, 0.52, 0.72],
        ...options,
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [ids, options]);

  return activeId;
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

function ServiceIntentLink({ children, className = "", intent }) {
  const normalizedIntent = {
    source: "diensten",
    ...intent,
  };

  return (
    <a
      className={className}
      data-service-source="diensten"
      data-service-problem={normalizedIntent.problemId}
      data-service-problem-title={normalizedIntent.problemTitle}
      data-service-cta={normalizedIntent.ctaLabel}
      href={buildServiceIntentHref(normalizedIntent)}
      onClick={() => trackServiceIntent(normalizedIntent)}
    >
      {children}
    </a>
  );
}

function smoothScrollTo(event, targetId, reducedMotion) {
  if (reducedMotion) {
    return;
  }

  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${targetId}`);
}

function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-title">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1 id="services-title">
            Wij creëren niet gewoon content. Wij creëren{" "}
            <span className={styles.heroAccent}>oplossingen.</span>
          </h1>
          <p>
            Je hoeft nog niet te weten of je een campagne, een video of een volledige contentflow nodig hebt. Vertel ons waar het wringt. Wij zoeken samen uit wat werkt — en maken het dan ook ;).
          </p>
          <ServiceIntentLink
            className={`${styles.primaryButton} button button--red`}
            intent={{
              ...GENERAL_INTENT,
              ctaLabel: "Vertel ons je problemen",
            }}
          >
            Vertel ons je problemen
          </ServiceIntentLink>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.problemStack}>
            <span className={styles.fileTab} />
            <span className={styles.fileShadow} />
            <div className={styles.fileCard}>
              <span>THE</span>
              <strong>PROBLEM</strong>
              <span>FILES</span>
            </div>
          </div>
          {/* TODO: replace with final Brent psychologist cut-out */}
          <div className={styles.brentPlaceholder}>
            <span className={styles.brentHead} />
            <span className={styles.brentBody} />
            <span className={styles.questionMark}>?</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpectationSection() {
  const ids = useMemo(
    () => serviceExpectations.map((_, index) => `verwachting-${index + 1}`),
    [],
  );
  const activeId = useActiveSection(ids);
  const activeIndex = Math.max(0, ids.indexOf(activeId));

  return (
    <section className={styles.expectations} aria-labelledby="expectations-title">
      <div
        className={styles.expectationScroller}
        style={{ minHeight: `${100 + (serviceExpectations.length - 1) * 72}svh` }}
      >
        <div className={styles.expectationStage}>
          <div className={styles.expectationStageInner}>
            <header className={styles.expectationHeading}>
              <span className={styles.sectionNumber}>
                {String(activeIndex + 1).padStart(2, "0")} / {String(serviceExpectations.length).padStart(2, "0")}
              </span>
              <h2 id="expectations-title">Wat kun je verwachten?</h2>
            </header>

            <div className={styles.expectationFocus}>
              <ol className={styles.expectationList}>
                {serviceExpectations.map((item, index) => {
                  const cardState =
                    index === activeIndex
                      ? styles.isActive
                      : index < activeIndex
                        ? styles.isPast
                        : styles.isNext;

                  return (
                    <li
                      aria-current={index === activeIndex ? "step" : undefined}
                      className={`${styles.expectationCard} ${cardState}`}
                      key={item.title}
                    >
                      <span className={styles.expectationNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className={styles.expectationBody}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className={styles.expectationProgress} aria-hidden="true">
                {serviceExpectations.map((item, index) => (
                  <span
                    className={index === activeIndex ? styles.isActive : ""}
                    key={item.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.expectationMarkers} aria-hidden="true">
          {ids.map((id) => (
            <span id={id} key={id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemNav({ activeProblemId, reducedMotion }) {
  return (
    <nav className={styles.problemNav} aria-label="Probleemdossiers">
      {problemFiles.map((problem) => {
        const isActive = activeProblemId === problem.id;

        return (
          <a
            aria-current={isActive ? "location" : undefined}
            className={isActive ? styles.isActive : ""}
            href={`#${problem.id}`}
            key={problem.id}
            onClick={(event) => smoothScrollTo(event, problem.id, reducedMotion)}
          >
            <span>{problem.number}</span>
            {problem.title}
          </a>
        );
      })}
    </nav>
  );
}

function CasePreview({ workCase }) {
  return (
    <a className={styles.casePreview} href={assetPath(workCase.href)}>
      <img
        src={assetPath(workCase.image)}
        alt={`${workCase.client} casebeeld`}
        loading="lazy"
      />
      <span>{workCase.client}</span>
    </a>
  );
}

function ProblemFileCard({ problem }) {
  const relatedCases = problem.cases.map(getCaseReference).filter(Boolean);
  const intent = {
    source: "diensten",
    problemId: problem.id,
    problemNumber: problem.number,
    problemTitle: problem.title,
    ctaLabel: problem.cta,
  };

  return (
    <article
      className={`${styles.problemCard} ${problem.open ? styles.openCard : ""}`}
      id={problem.id}
    >
      <header className={styles.problemHeader}>
        <span className={styles.problemNumber}>{Number(problem.number)}</span>
        <h3>{problem.title}</h3>
      </header>

      {problem.body ? (
        <p className={styles.problemBody}>{problem.body}</p>
      ) : (
        <>
          <p className={styles.problemQuote}>{problem.quote}</p>
          <dl className={styles.fixResult}>
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

      {relatedCases.length > 0 ? (
        <div className={styles.caseRow}>
          {relatedCases.map((workCase) => (
            <CasePreview key={workCase.slug} workCase={workCase} />
          ))}
        </div>
      ) : null}

      <ServiceIntentLink
        className={`${styles.problemButton} button button--red`}
        intent={intent}
      >
        {problem.cta}
      </ServiceIntentLink>
    </article>
  );
}

function ProblemFilesSection({ reducedMotion }) {
  const problemIds = useMemo(() => problemFiles.map((problem) => problem.id), []);
  const problemObserverOptions = useMemo(
    () => ({
      rootMargin: "-22% 0px -54% 0px",
    }),
    [],
  );
  const activeProblemId = useActiveSection(problemIds, problemObserverOptions);
  const activeProblem = problemFiles.find((problem) => problem.id === activeProblemId) || problemFiles[0];
  const activeProblemIndex = Math.max(
    0,
    problemFiles.findIndex((problem) => problem.id === activeProblem.id),
  );

  return (
    <section
      className={styles.problemFiles}
      id="probleemintake"
      aria-labelledby="problem-files-title"
    >
      <div className={styles.problemGrid}>
        <aside className={styles.problemSticky}>
          <span className={styles.sectionNumber}>
            {activeProblem.number} / {String(problemFiles.length).padStart(2, "0")}
          </span>
          <h2 id="problem-files-title">So, what’s the problem?</h2>
          <div
            className={styles.problemProgress}
            aria-hidden="true"
            style={{
              "--problem-progress": `${((activeProblemIndex + 1) / problemFiles.length) * 100}%`,
            }}
          >
            <span />
          </div>
          <ProblemNav activeProblemId={activeProblemId} reducedMotion={reducedMotion} />
        </aside>

        <div className={styles.problemList}>
          {problemFiles.map((problem) => (
            <ProblemFileCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Interstitial() {
  return (
    <section className={styles.interstitial} aria-label="Contentpartner">
      <p>
        “I got 99 problems but a <em>goeie contentpartner</em> ain’t one”
      </p>
    </section>
  );
}

function ToolPreview({ tool, active }) {
  if (!tool?.caseSlug) {
    return (
      <div className={styles.toolPreviewEmpty}>
        <span>…</span>
      </div>
    );
  }

  const workCase = getCaseReference(tool.caseSlug);

  if (!workCase) {
    return null;
  }

  return (
    <a className={styles.toolPreview} href={assetPath(workCase.href)}>
      <img
        src={assetPath(workCase.image)}
        alt={`${workCase.client} casebeeld`}
        loading={active ? "eager" : "lazy"}
      />
      <span>{workCase.client}</span>
    </a>
  );
}

function ToolsSection() {
  const [activeTool, setActiveTool] = useState(0);
  const active = serviceTools[activeTool] || serviceTools[0];

  return (
    <section className={styles.toolsSection} aria-labelledby="tools-title">
      <div className={styles.toolsGrid}>
        <div className={styles.toolsCopy}>
          <span className={styles.sectionNumber}>03</span>
          <h2 id="tools-title">Onze tools:</h2>
          <div className={styles.toolList}>
            {serviceTools.map((tool, index) => {
              const workCase = tool.caseSlug ? getCaseReference(tool.caseSlug) : null;
              const href = tool.href || workCase?.href || "/work/";

              return (
                <a
                  className={activeTool === index ? styles.isActive : ""}
                  href={assetPath(href)}
                  key={`${tool.label}-${index}`}
                  onFocus={() => setActiveTool(index)}
                  onMouseEnter={() => setActiveTool(index)}
                >
                  <span>{tool.label}</span>
                  {workCase ? (
                    <span className={styles.toolMobilePreview} aria-hidden="true">
                      <img src={assetPath(workCase.image)} alt="" loading="lazy" />
                      <span>{workCase.client}</span>
                    </span>
                  ) : null}
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.toolsPreviewWrap} aria-live="polite">
          <ToolPreview active tool={active} />
        </div>
      </div>
    </section>
  );
}

function renderFaqAnswer(text, faqIndex, paragraphIndex) {
  if (faqIndex !== 3 || paragraphIndex !== 0) {
    return text;
  }

  const [beforeWat, afterWat] = text.split("wat");
  const [betweenWatAndHoe, afterHoe] = afterWat.split("hoe");

  return (
    <>
      {beforeWat}
      <em>wat</em>
      {betweenWatAndHoe}
      <em>hoe</em>
      {afterHoe}
    </>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={styles.faqIntro}>
        <span className={styles.sectionNumber}>04</span>
        <h2 id="faq-title">FAQ:</h2>
      </div>

      <div className={styles.faqList}>
        {serviceFaqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article className={styles.faqItem} key={faq.question}>
              <h3>
                <button
                  aria-controls={`faq-panel-${index}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  type="button"
                >
                  <span>{faq.question}</span>
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
              </h3>
              <div
                aria-hidden={!isOpen}
                className={`${styles.faqPanel} ${isOpen ? styles.isOpen : ""}`}
                id={`faq-panel-${index}`}
              >
                <div className={styles.faqPanelInner}>
                  {faq.answer.map((paragraph, paragraphIndex) => (
                    <p key={paragraph}>
                      {renderFaqAnswer(paragraph, index, paragraphIndex)}
                    </p>
                  ))}

                  {faq.contactCta ? (
                    <ServiceIntentLink
                      className={styles.inlineContact}
                      intent={{
                        ...GENERAL_INTENT,
                        ctaLabel: faq.contactCta,
                      }}
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
    <section className={styles.finalCta} aria-labelledby="final-cta-title">
      <div>
        <h2 id="final-cta-title">Een ander probleem?</h2>
        <p>Laat het weten, en wij zoeken mee naar een oplossing!</p>
      </div>
      <ServiceIntentLink
        className={`${styles.primaryButton} button button--red`}
        intent={{
          ...OTHER_PROBLEM_INTENT,
          ctaLabel: "Tell us all your problems baby",
        }}
      >
        Tell us all your problems baby
      </ServiceIntentLink>
    </section>
  );
}

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const page = pageRef.current;
    const visual = page?.querySelector("[data-services-parallax]");

    if (!visual) {
      return undefined;
    }

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const rect = visual.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
      visual.style.setProperty("--parallax-y", `${progress * -28}px`);
      visual.style.setProperty("--parallax-rotate", `${progress}deg`);
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [reducedMotion]);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className={styles.servicesPage} ref={pageRef}>
          <a
            className={`hero__logo ${styles.logo}`}
            href={assetPath("/")}
            aria-label="Ami Amis home"
          />
          <ServicesHero />
          <div data-services-parallax>
            <ExpectationSection />
            <ProblemFilesSection reducedMotion={reducedMotion} />
            <Interstitial />
            <ToolsSection />
            <FaqSection />
            <FinalCta />
          </div>
        </main>
        <Footer variant="paper" />
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay activePage="services" open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
