"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import { assetPath } from "../../src/lib/assetPath";

const summaryItems = [
  {
    key: "question",
    number: "1.",
    label: "VRAAG",
    icon: "/images/cases/visit-antwerpen/visit-antwerpen-questionmarks-exact.png",
  },
  {
    key: "approach",
    number: "2.",
    label: "AANPAK",
    icon: "/images/cases/visit-antwerpen/visit-antwerpen-clapper-exact.png",
  },
  {
    key: "result",
    number: "3.",
    label: "RESULTAAT",
    icon: "/images/cases/visit-antwerpen/visit-antwerpen-spark-exact.png",
  },
];

function mediaPath(src) {
  if (!src) {
    return "";
  }

  if (src.startsWith("http")) {
    return src;
  }

  return assetPath(src);
}

function HighlightedText({ highlights = [], text }) {
  if (!highlights.length) {
    return text;
  }

  const parts = [];
  let cursor = 0;

  while (cursor < text.length) {
    const next = highlights
      .map((highlight) => ({ highlight, index: text.indexOf(highlight, cursor) }))
      .filter((item) => item.index >= 0)
      .sort((a, b) => a.index - b.index)[0];

    if (!next) {
      parts.push(text.slice(cursor));
      break;
    }

    if (next.index > cursor) {
      parts.push(text.slice(cursor, next.index));
    }

    parts.push(
      <mark key={`${next.highlight}-${next.index}`} className="va-pdf-highlight">
        {next.highlight}
      </mark>,
    );
    cursor = next.index + next.highlight.length;
  }

  return parts;
}

function VideoFrame({ featured = false, priority = false, video }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video?.src) {
    return null;
  }

  const togglePlayback = async () => {
    const videoNode = videoRef.current;

    if (!videoNode) {
      return;
    }

    if (videoNode.paused) {
      document.querySelectorAll(".va-pdf-video-card__screen video").forEach((otherVideo) => {
        if (otherVideo !== videoNode) {
          otherVideo.pause();
        }
      });

      try {
        await videoNode.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      videoNode.pause();
    }
  };

  const onKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    togglePlayback();
  };

  return (
    <figure className={`va-pdf-video-card${featured ? " va-pdf-video-card--hero" : ""}${isPlaying ? " is-playing" : ""}`}>
      <div
        aria-label={`${isPlaying ? "Pauzeer" : "Speel"} ${video.title} video`}
        className="va-pdf-video-card__screen"
        onClick={togglePlayback}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
      >
        <video
          aria-label={`${video.title} video`}
          muted
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          playsInline
          poster={video.poster ? mediaPath(video.poster) : undefined}
          preload={priority ? "metadata" : "none"}
          ref={videoRef}
        >
          <source src={mediaPath(video.src)} type="video/mp4" />
        </video>
      </div>
      <figcaption>{video.title}</figcaption>
    </figure>
  );
}

function ZuidvideoModal({ data, onClose, open }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    const dialog = dialogRef.current;
    const video = videoRef.current;

    closeRef.current?.focus();
    document.body.classList.add("case-modal-open");

    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusable = Array.from(dialog.querySelectorAll("button, video, [href], [tabindex]:not([tabindex='-1'])")).filter(
        (item) => !item.hasAttribute("disabled"),
      );

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

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("case-modal-open");
      video?.pause();
      previousActiveElement?.focus?.();
    };
  }, [onClose, open]);

  if (!open || !data?.src) {
    return null;
  }

  return (
    <div className="va-pdf-modal" onMouseDown={onClose} role="presentation">
      <section
        aria-label="Zuidvideo"
        aria-modal="true"
        className="va-pdf-modal__dialog"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <div className="va-pdf-modal__topline">
          <p>{data.label || "Zuidvideo"}</p>
          <button aria-label="Sluit Zuidvideo" className="va-pdf-modal__close" onClick={onClose} ref={closeRef} type="button">
            Sluit
          </button>
        </div>
        <video controls playsInline poster={data.poster ? mediaPath(data.poster) : undefined} preload="metadata" ref={videoRef}>
          <source src={mediaPath(data.src)} type="video/mp4" />
        </video>
      </section>
    </div>
  );
}

function QuoteCard({ data, onOpen }) {
  const quote = data.introQuote || "";
  const [beforeZuidvideo, afterZuidvideo = ""] = quote.split("Zuidvideo");

  return (
    <blockquote className="va-pdf-quote va-pdf-reveal">
      <p>
        “{beforeZuidvideo}
        {quote.includes("Zuidvideo") && data.media?.zuidVideo?.src ? (
          <button aria-label="Bekijk de Zuidvideo" className="va-pdf-quote__trigger" onClick={onOpen} type="button">
            Zuidvideo
          </button>
        ) : (
          "Zuidvideo"
        )}
        {afterZuidvideo}”
      </p>
    </blockquote>
  );
}

function Hero({ data, onOpen }) {
  return (
    <section className="va-pdf-hero" aria-labelledby="va-pdf-title">
      <a className="hero__logo va-pdf-logo" href={assetPath("/")} aria-label="Ami Amis home" />
      <div className="va-pdf-hero__inner">
        <div className="va-pdf-hero__copy">
          <h1 className="va-pdf-reveal" id="va-pdf-title">
            {data.title}
          </h1>
          <QuoteCard data={data} onOpen={onOpen} />
        </div>
        <div className="va-pdf-hero__media va-pdf-reveal">
          <img
            alt=""
            aria-hidden="true"
            className="va-pdf-hero__cathedral-collage"
            src={assetPath("/images/cases/visit-antwerpen/visit-antwerpen-cathedral-exact.png")}
          />
          <VideoFrame featured priority video={{ ...data.media?.hero, title: data.media?.verticalVideos?.[0]?.title || "frituurtour" }} />
        </div>
      </div>
    </section>
  );
}

function Story({ data }) {
  const blocks = data.storyBlocks || [];

  return (
    <section className="va-pdf-story" aria-label="Case verhaal">
      <div className="va-pdf-story__inner va-pdf-reveal">
        {blocks[0]?.text ? (
          <p>
            <HighlightedText highlights={["10 social media video’s", "4 maanden"]} text={blocks[0].text} />
          </p>
        ) : null}
        {blocks[1]?.text ? <p>{blocks[1].text}</p> : null}
        {blocks[2]?.text ? (
          <p>
            <HighlightedText highlights={["43K", "1314"]} text={blocks[2].text} />
          </p>
        ) : null}
      </div>
    </section>
  );
}

function StatsRow({ stats }) {
  if (!stats?.length) {
    return null;
  }

  return (
    <section className="va-pdf-stats va-pdf-reveal" aria-label="Resultaten">
      <dl>
        {stats.map((stat) => (
          <div key={`${stat.value}-${stat.label}`}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function VideoGrid({ videos }) {
  if (!videos?.length) {
    return null;
  }

  return (
    <section className="va-pdf-video-grid va-pdf-reveal" aria-label="Video's">
      {videos.map((video, index) => (
        <VideoFrame key={video.title || video.src} priority={index === 0} video={video} />
      ))}
    </section>
  );
}

function Outro({ text }) {
  if (!text) {
    return null;
  }

  return (
    <section className="va-pdf-outro va-pdf-reveal" aria-label="Outro">
      <p>
        {text.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </section>
  );
}

function ThreeColumnSummary({ data }) {
  return (
    <section className="va-pdf-summary va-pdf-reveal" aria-label="Vraag aanpak resultaat">
      {summaryItems.map((item) => {
        const block = data[item.key];

        if (!block?.text) {
          return null;
        }

        return (
          <article key={item.key}>
            <img alt="" aria-hidden="true" src={assetPath(item.icon)} />
            <h2>
              <span>{item.number}</span> {item.label}
            </h2>
            <p>{block.text}</p>
          </article>
        );
      })}
    </section>
  );
}

function CaseCTA() {
  return (
    <section className="va-pdf-cta va-pdf-reveal" aria-label="Contact">
      <img
        alt=""
        aria-hidden="true"
        className="va-pdf-cta__megaphone"
        src={assetPath("/images/cases/visit-antwerpen/visit-antwerpen-megaphone-exact.png")}
      />
      <div>
        <h2>Durf jij een samenwerking aan te gaan?</h2>
        <a className="button button--yellow" href={assetPath("/contact/")}>
          Eens afspreken?
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
    const items = Array.from(document.querySelectorAll(".va-pdf-reveal"));

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`site-shell va-pdf-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className="va-pdf-page">
          <Hero data={caseData} onOpen={() => setModalOpen(true)} />
          <Story data={caseData} />
          <StatsRow stats={caseData.result?.stats} />
          <VideoGrid videos={caseData.media?.verticalVideos} />
          <Outro text={caseData.outro} />
          <ThreeColumnSummary data={caseData} />
          <CaseCTA />
        </main>
        <Footer />
      </div>
      <ZuidvideoModal data={caseData.media?.zuidVideo} onClose={() => setModalOpen(false)} open={modalOpen} />
      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="work" />
    </>
  );
}
