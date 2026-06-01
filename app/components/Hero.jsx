import { useEffect, useRef } from "react";
import { assetPath } from "../../src/lib/assetPath";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hero || reduceMotion) {
      return undefined;
    }

    let frame = 0;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const getMaxFall = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        return 52;
      }

      if (width <= 1000) {
        return 72;
      }

      return 96;
    };
    const getPointerStrength = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        return { x: 0, y: 0, roll: 0 };
      }

      if (width <= 1000) {
        return { x: 54, y: 38, roll: 2.2 };
      }

      return { x: 92, y: 64, roll: 3.6 };
    };

    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const fallWindow = Math.max(1, rect.height * 0.72);
      const rawProgress = Math.max(0, Math.min(1, -rect.top / fallWindow));
      const progress = 1 - Math.pow(1 - rawProgress, 3);

      hero.style.setProperty("--hero-fall", `${progress * getMaxFall()}px`);
      hero.style.setProperty("--hero-roll", `${-1 + progress * 2.8}deg`);
    };

    const updatePointer = () => {
      pointerFrame = 0;
      const strength = getPointerStrength();

      hero.style.setProperty("--hero-pointer-x", `${pointerX * strength.x}px`);
      hero.style.setProperty("--hero-pointer-y", `${pointerY * strength.y}px`);
      hero.style.setProperty("--hero-pointer-roll", `${pointerX * strength.roll}deg`);
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    const schedulePointer = () => {
      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
    };

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect();

      pointerX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      schedulePointer();
    };

    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      schedulePointer();
    };

    update();
    updatePointer();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointer);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      if (pointerFrame) {
        window.cancelAnimationFrame(pointerFrame);
      }
    };
  }, []);

  return (
    <section className="hero" aria-label="Ami Amis hero" ref={heroRef}>
      <div className="hero__inner">
        <div className="hero__logo" aria-label="AMI AMIS" role="img" />
        <h1 className="hero__title" aria-label="Voor merken die durven">
          <span className="hero__line hero__line--top">
            <span className="hero__word">Voor</span>{" "}
            <span className="hero__word hero__word--merken">Merken</span>
          </span>
          <span className="hero__line hero__line--script">die</span>
          <span className="hero__line hero__line--bottom">Durven</span>
        </h1>
        <div className="hero__skydiver" aria-hidden="true">
          <div className="hero__skydiver-drop">
            <img src={assetPath("/assets/brentskydive.png")} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
