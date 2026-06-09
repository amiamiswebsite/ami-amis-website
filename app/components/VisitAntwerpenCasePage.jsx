"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

function internalHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href || "#";
  }

  if (href.startsWith("http")) {
    return href;
  }

  return assetPath(href);
}

function CaseVideo({ video, label, featured = false, tag }) {
  if (!video?.src) {
    return null;
  }

  return (
    <article className={`va-video-card ${featured ? "va-video-card--featured" : ""}`}>
      <div className="va-video-card__media">
        <video
          aria-label={`${label || video.title} video`}
          controls
          muted
          playsInline
          poster={video.poster ? assetPath(video.poster) : undefined}
          preload={featured ? "metadata" : "none"}
        >
          <source src={assetPath(video.src)} type="video/mp4" />
        </video>
      </div>
      <div className="va-video-card__meta">
        <h3>{label || video.title}</h3>
        {tag ? <span>{tag}</span> : null}
      </div>
    </article>
  );
}

function CaseQuoteModal({ data, open, onClose }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    const dialog = dialogRef.current;
    const video = videoRef.current;
    closeButtonRef.current?.focus();
    document.body.classList.add("va-modal-open");

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll("button, [href], video, [tabindex]:not([tabindex='-1'])")
      ).filter((item) => !item.hasAttribute("disabled"));

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("va-modal-open");
      video?.pause();
      previousActiveElement?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !data?.src) {
    return null;
  }

  return (
    <div className="va-modal" role="presentation" onMouseDown={onClose}>
      <section
        aria-label={`${data.label} video`}
        aria-modal="true"
        className="va-modal__dialog"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <div className="va-modal__topline">
          <p>{data.label}</p>
          <button aria-label="Sluit video" className="va-modal__close" onClick={onClose} ref={closeButtonRef} type="button">
            Sluit
          </button>
        </div>
        <video
          controls
          playsInline
          poster={data.poster ? assetPath(data.poster) : undefined}
          preload="metadata"
          ref={videoRef}
        >
          <source src={assetPath(data.src)} type="video/mp4" />
        </video>
      </section>
    </div>
  );
}

function CaseHero({ data }) {
  return (
    <section className="va-hero" aria-labelledby="va-case-title">
      <a className="hero__logo va-hero__logo" href={assetPath("/")} aria-label="Ami Amis home" />
      <div className="va-hero__inner">
        <div className="va-hero__copy va-reveal">
          <p className="va-label">Case</p>
          <h1 id="va-case-title">{data.title}</h1>
          <p className="va-hero__category">{data.category} / videoproductie</p>
          <p className="va-hero__intro">10 social video&apos;s om Antwerpen in de kijker te zetten. De eerste ging meteen viraal.</p>
        </div>

        <div className="va-hero__media-wrap va-reveal">
          <div className="va-vertical-frame va-vertical-frame--hero">
            <video
              aria-label="Visit Antwerpen frituurtour video"
              controls
              muted
              playsInline
              poster={data.media?.hero?.poster ? assetPath(data.media.hero.poster) : undefined}
              preload="metadata"
            >
              <source src={assetPath(data.media.hero.src)} type="video/mp4" />
            </video>
          </div>
          <div className="va-hero__stats" aria-label="Belangrijkste resultaat">
            <strong>43K</strong>
            <span>weergaven</span>
            <strong>1314</strong>
            <span>likes</span>
            <p>meest bekeken video ooit</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseIntroQuote({ data, onOpen }) {
  const quote = data.introQuote || "";
  const [beforeZuidvideo, afterZuidvideo = ""] = quote.split("Zuidvideo");

  return (
    <section className="va-quote va-section va-reveal" aria-labelledby="va-quote-title">
      <p className="va-label">Intro / verhaal</p>
      <h2 id="va-quote-title">
        {beforeZuidvideo}
        {quote.includes("Zuidvideo") ? (
          <button className="va-quote__video-link" onClick={onOpen} type="button">
            Zuidvideo
          </button>
        ) : null}
        {afterZuidvideo}
      </h2>
      <p>{data.intro}</p>
    </section>
  );
}

function CaseStoryBlocks({ data }) {
  const storyBlocks = data.storyBlocks || [];

  return (
    <section className="va-story va-section" aria-label="Kort caseverhaal">
      {storyBlocks.map((block) => (
        <article className="va-story-card va-reveal" key={block.kicker}>
          <span>{block.kicker}</span>
          <p>{block.text}</p>
        </article>
      ))}
    </section>
  );
}

function CaseThreePartSummary({ data }) {
  const blocks = [data.question, data.approach, data.result].filter(Boolean);

  return (
    <section className="va-three va-section" aria-label="Vraag aanpak resultaat">
      {blocks.map((block, index) => (
        <article className="va-three-card va-reveal" id={`va-${block.label.toLowerCase()}`} key={block.label}>
          <p>{String(index + 1).padStart(2, "0")} / {block.label}</p>
          <h2>{block.title}</h2>
          <span>{block.text}</span>
        </article>
      ))}
    </section>
  );
}

function CaseStats({ stats }) {
  if (!stats?.length) {
    return null;
  }

  return (
    <section className="va-stats va-section va-reveal" aria-label="Case resultaten in cijfers">
      {stats.map((stat) => (
        <article className="va-stat" key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </section>
  );
}

function CaseVideoGrid({ data }) {
  const videos = data.media?.verticalVideos || [];
  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <section className="va-videos va-section" aria-labelledby="va-videos-title">
      <div className="va-videos__header va-reveal">
        <p className="va-label">De video&apos;s</p>
        <h2 id="va-videos-title">Social video&apos;s gebouwd voor instant FOMO.</h2>
      </div>
      <div className="va-videos__grid">
        <CaseVideo featured label={featured?.title} tag="meest bekeken video ooit" video={featured} />
        <div className="va-videos__side">
          {rest.map((video) => (
            <CaseVideo key={video.title} label={video.title} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCTA() {
  return (
    <section className="va-cta va-section va-reveal" aria-label="Case afsluiting">
      <div>
        <p className="va-label">Ook zo&apos;n project?</p>
        <h2>Ook content maken die mensen goesting geeft?</h2>
      </div>
      <div className="va-cta__actions">
        <a className="button button--red" href={assetPath("/contact/")}>
          Plan een quick call
        </a>
        <a className="va-text-link" href={assetPath("/work/")}>
          Bekijk alle cases
        </a>
      </div>
    </section>
  );
}

export default function VisitAntwerpenCasePage({ caseData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll(".va-reveal"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const stats = useMemo(() => caseData.result?.stats || [], [caseData.result?.stats]);

  return (
    <>
      <div className={`site-shell va-case-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="va-case-page">
          <CaseHero data={caseData} />
          <CaseIntroQuote data={caseData} onOpen={() => setModalOpen(true)} />
          <CaseStoryBlocks data={caseData} />
          <CaseThreePartSummary data={caseData} />
          <CaseStats stats={stats} />
          <CaseVideoGrid data={caseData} />
          <section className="va-outro va-section va-reveal" aria-label="Case outro">
            <p>{caseData.outro}</p>
          </section>
          <CaseCTA />
        </main>
        <Footer variant="paper" />
      </div>

      <CaseQuoteModal data={caseData.media?.zuidVideo} onClose={() => setModalOpen(false)} open={modalOpen} />
      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
