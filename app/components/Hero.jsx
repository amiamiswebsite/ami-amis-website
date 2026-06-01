import { useEffect, useRef } from "react";
import { assetPath } from "../../src/lib/assetPath";

export default function Hero({ onOpenMenu }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hero || reduceMotion) {
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.max(-1, Math.min(1, (viewport / 2 - rect.top) / viewport));
      hero.style.setProperty("--hero-drift", `${progress * 34}px`);
      hero.style.setProperty("--hero-roll", `${progress * -1.8}deg`);
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section className="hero" aria-label="Ami Amis hero" ref={heroRef}>
      <div className="hero__inner">
        <div className="hero__logo" aria-label="AMI AMIS" role="img" />
        <h1 className="hero__title" aria-label="Voor merken die durven">
          <span className="hero__line hero__line--top">Voor merken</span>
          <span className="hero__line hero__line--script">die</span>
          <span className="hero__line hero__line--bottom">Durven</span>
        </h1>
        <div className="hero__skydiver" aria-hidden="true">
          <img src={assetPath("/assets/brentskydive.png")} alt="" />
        </div>
        <button className="menu-button" type="button" onClick={onOpenMenu}>
          <span className="sr-only">Open navigatie</span>
          <span />
          <span />
          <span />
        </button>
      </div>
    </section>
  );
}
