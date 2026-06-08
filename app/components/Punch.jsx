"use client";

import { useEffect, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const audiences = ["KMO's", "Creatieve bureaus", "Organisaties", "..."];
const rotatingWords = ["KMO’S", "BEDRIJVEN", "ZELFSTANDIGEN", "PARTNERS", "CREATIVES"];

export default function Punch() {
  const [wordAnimationReady, setWordAnimationReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !window.CSS?.supports?.("animation-name", "punchWordPaperStack")) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      setWordAnimationReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`punch${wordAnimationReady ? " punch--word-animation-ready" : ""}`} id="diensten">
      <div className="punch__inner">
        <img className="punch__crack" src={assetPath("/assets/crack.png")} alt="" />
        <img className="punch__man" src={assetPath("/assets/punch-elena.png")} alt="" />
        <div className="punch__copy">
          <h2>Content met punch</h2>
          <p className="punch__line punch__line--animated" aria-hidden="true">
            <span className="punch__line-row">
              <span>Voor</span>
              <span className="punch__accent">alle</span>
              <span className="punch__word-window">
                <span className="punch__word-track">
                  {rotatingWords.map((word, index) => (
                    <span className="punch__word" key={`${word}-${index}`}>
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </span>
            <span className="punch__line-tail">die durven.</span>
          </p>
          <p className="punch__line punch__line--fallback">
            <span className="punch__line-row">
              <span>Voor</span>
              <span className="punch__accent">alle</span>
              <span>merken</span>
            </span>
            <span className="punch__line-tail">die durven.</span>
          </p>
          {wordAnimationReady ? <span className="sr-only">Voor alle merken die durven.</span> : null}
          <div className="audience-row" aria-label="Doelgroepen">
            {audiences.map((audience, index) => (
              <span className={`audience audience--${index + 1}`} key={audience}>
                {audience}
              </span>
            ))}
          </div>
          <a className="button button--red punch__button" href="#contact">
            Eens afspreken?
          </a>
        </div>
      </div>
    </section>
  );
}
