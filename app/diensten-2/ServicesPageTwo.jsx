"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Footer from "../components/Footer";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { workCases } from "../../src/data/workCases";
import { assetPath } from "../../src/lib/assetPath";
import { buildServiceIntentHref, trackServiceIntent } from "../../src/lib/serviceIntent";
import styles from "./ServicesPageTwo.module.css";
import {
  serviceTwoExpectations,
  serviceTwoFaqs,
  serviceTwoProblems,
  serviceTwoTools,
} from "./servicesTwoContent";

const CASES_BY_SLUG = new Map([
  ...workCases.map((workCase) => [workCase.slug, workCase]),
  [
    "sint-jan-berchmanscollege",
    {
      client: "Sint-Jan Berchmanscollege",
      slug: "sint-jan-berchmanscollege",
      image: "/work/sint-jan.webp",
      href: "/work/",
      status: "ready",
    },
  ],
]);
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

function useActiveProblem(ids) {
  const [activeId, setActiveId] = useState(ids[0] || "");

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0.08, 0.2, 0.4, 0.65] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
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
      {children}
      <span aria-hidden="true">↗</span>
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

function RisoHeading({ id, lines }) {
  return (
    <h2 className={styles.risoHeading} id={id}>
      {lines.map((line) => (
        <span className={styles.risoLine} key={line}>
          <span className={styles.risoInk} aria-hidden="true" />
          <span className={styles.risoText}>{line}</span>
        </span>
      ))}
    </h2>
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
            aria-label="Wij creëren niet gewoon content. Wij creëren oplossingen."
          >
            <span>Wij creëren</span>
            <span className={styles.heroRotator} aria-hidden="true">
              <span className={styles.heroRotatorSizer}>niet gewoon content.</span>
              <span className={`${styles.heroTerm} ${styles.heroTermContent}`}>
                niet gewoon content.
              </span>
              <span className={`${styles.heroTerm} ${styles.heroTermSolution}`}>
                oplossingen.
              </span>
            </span>
          </h1>
          <p>
            Je hoeft nog niet te weten of je een campagne, een video of een volledige contentflow nodig hebt. Vertel ons waar het wringt. Wij zoeken samen uit wat werkt — en maken het dan ook ;).
          </p>
          <ServiceIntentLink
            className={styles.primaryButton}
            intent={{ ...GENERAL_INTENT, ctaLabel: "Vertel ons je problemen" }}
          >
            Vertel ons je problemen
          </ServiceIntentLink>
        </div>

        <DepthFrame className={styles.heroVisual} reducedMotion={reducedMotion}>
          <img
            src={assetPath("/images/services/services-header-brent.jpg")}
            alt=""
            width="1122"
            height="1402"
            fetchPriority="high"
            decoding="async"
          />
        </DepthFrame>
      </div>
    </section>
  );
}

function Expectations() {
  return (
    <section className={styles.expectations} aria-labelledby="services-two-expectations">
      <header className={`${styles.sectionHeading} ${styles.expectationsHeading}`}>
        <RisoHeading id="services-two-expectations" lines={["Wat kun je verwachten?"]} />
      </header>

      <ol className={styles.expectationList}>
        {serviceTwoExpectations.map((item, index) => (
          <li key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
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

function ProblemArticle({ problem, reducedMotion }) {
  const relatedCases = problem.cases.map(getCaseReference).filter(Boolean);
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
            {relatedCases.map((workCase) => (
              <CasePreview
                key={workCase.slug}
                workCase={workCase}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Problems({ reducedMotion }) {
  const ids = useMemo(() => serviceTwoProblems.map((problem) => problem.id), []);
  const activeId = useActiveProblem(ids);

  const jumpTo = (event, id) => {
    if (reducedMotion) {
      return;
    }

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <section className={styles.problems} aria-labelledby="services-two-problems">
      <div className={styles.problemLayout}>
        <aside className={styles.problemAside}>
          <div>
            <RisoHeading id="services-two-problems" lines={["Wa is uw", "probleem?!"]} />
          </div>
          <nav aria-label="Probleemdossiers">
            {serviceTwoProblems.map((problem) => (
              <a
                aria-current={activeId === problem.id ? "location" : undefined}
                className={activeId === problem.id ? styles.activeProblem : ""}
                href={`#${problem.id}`}
                key={problem.id}
                onClick={(event) => jumpTo(event, problem.id)}
              >
                <span>{problem.number}</span>
                {problem.title}
              </a>
            ))}
          </nav>
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
    <section className={styles.interstitial} aria-label="Contentpartner">
      <p>
        “I got 99 problems but a <em>goeie contentpartner</em> ain’t one”
      </p>
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
                <span aria-hidden="true">↗</span>
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
            <a className={styles.toolFallback} href={assetPath(active.href || "/work/")}>
              <span>…</span>
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
          <Expectations />
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
