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

    let scrollFrame = 0;
    let pointerFrame = 0;
    const pointer = {
      active: false,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

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
        return { x: 24, y: 18, roll: 1.4, lerp: pointer.active ? 0.16 : 0.08 };
      }

      if (width <= 1000) {
        return { x: 54, y: 38, roll: 2.2, lerp: pointer.active ? 0.17 : 0.09 };
      }

      return { x: 92, y: 64, roll: 3.6, lerp: pointer.active ? 0.18 : 0.1 };
    };

    const updateScroll = () => {
      scrollFrame = 0;
      const rect = hero.getBoundingClientRect();
      const fallWindow = Math.max(1, rect.height * 0.72);
      const rawProgress = Math.max(0, Math.min(1, -rect.top / fallWindow));
      const progress = 1 - Math.pow(1 - rawProgress, 3);
      const mobile = window.innerWidth <= 768;

      hero.style.setProperty("--hero-fall", `${progress * getMaxFall()}px`);
      hero.style.setProperty("--hero-roll", `${-1 + progress * (mobile ? 2.2 : 2.8)}deg`);
      hero.style.setProperty("--hero-scale", `${1 + progress * (mobile ? 0.035 : 0.025)}`);
      hero.style.setProperty("--hero-glow-y", `${progress * (mobile ? 7 : 10)}px`);
      hero.style.setProperty("--hero-glow-blur", `${progress * (mobile ? 7 : 10)}px`);
    };

    const updatePointer = () => {
      const strength = getPointerStrength();
      const idleDeltaX = pointer.targetX - pointer.currentX;
      const idleDeltaY = pointer.targetY - pointer.currentY;

      pointer.currentX += idleDeltaX * strength.lerp;
      pointer.currentY += idleDeltaY * strength.lerp;

      const atTarget =
        Math.abs(pointer.targetX - pointer.currentX) < 0.002 &&
        Math.abs(pointer.targetY - pointer.currentY) < 0.002;

      if (atTarget) {
        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;

        if (!pointer.active && Math.abs(pointer.targetX) < 0.002 && Math.abs(pointer.targetY) < 0.002) {
          pointer.currentX = 0;
          pointer.currentY = 0;
          pointer.targetX = 0;
          pointer.targetY = 0;
        }

        pointerFrame = 0;
      }

      hero.style.setProperty("--hero-pointer-x", `${pointer.currentX * strength.x}px`);
      hero.style.setProperty("--hero-pointer-y", `${pointer.currentY * strength.y}px`);
      hero.style.setProperty("--hero-pointer-roll", `${pointer.currentX * strength.roll}deg`);
      hero.style.setProperty("--hero-glow-x", `${pointer.currentX * strength.x * -0.32}px`);
      hero.style.setProperty("--mouse-x", pointer.currentX.toFixed(4));
      hero.style.setProperty("--mouse-y", pointer.currentY.toFixed(4));
      hero.style.setProperty("--parallax-x", `${pointer.currentX * strength.x}px`);
      hero.style.setProperty("--parallax-y", `${pointer.currentY * strength.y}px`);
      hero.style.setProperty("--hero-type-front-x", `${pointer.currentX * strength.x * 0.1}px`);
      hero.style.setProperty("--hero-type-front-y", `${pointer.currentY * strength.y * 0.085}px`);
      hero.style.setProperty("--hero-type-depth-x", `${pointer.currentX * strength.x * 0.22}px`);
      hero.style.setProperty("--hero-type-depth-y", `${pointer.currentY * strength.y * 0.18}px`);
      hero.style.setProperty("--hero-type-script-x", `${pointer.currentX * strength.x * 0.16}px`);
      hero.style.setProperty("--hero-type-script-y", `${pointer.currentY * strength.y * 0.12}px`);
      hero.style.setProperty("--hero-type-rot-x", `${pointer.currentY * -1.8}deg`);
      hero.style.setProperty("--hero-type-rot-y", `${pointer.currentX * 2.2}deg`);
      hero.style.setProperty("--hero-cloud-x", `${pointer.currentX * strength.x * -0.42}px`);
      hero.style.setProperty("--hero-cloud-y", `${pointer.currentY * strength.y * -0.3}px`);
      hero.style.setProperty("--hero-cloud-roll", `${pointer.currentX * -1.8}deg`);

      if (!atTarget) {
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
    };

    const scheduleScroll = () => {
      if (!scrollFrame) {
        scrollFrame = window.requestAnimationFrame(updateScroll);
      }
    };

    const schedulePointer = () => {
      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
    };

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect();

      hero.classList.add("is-cloud-burst");
      pointer.active = true;
      pointer.targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      pointer.targetY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
      schedulePointer();
    };

    const resetPointer = (event) => {
      if (event?.pointerType === "mouse" && event.type !== "pointerleave") {
        return;
      }

      pointer.active = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
      hero.classList.remove("is-cloud-burst");
      schedulePointer();
    };

    updateScroll();
    updatePointer();
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll);
    window.addEventListener("pointerup", resetPointer, { passive: true });
    window.addEventListener("pointercancel", resetPointer, { passive: true });
    hero.addEventListener("pointerdown", handlePointerMove, { passive: true });
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", resetPointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
      window.removeEventListener("pointerup", resetPointer);
      window.removeEventListener("pointercancel", resetPointer);
      hero.removeEventListener("pointerdown", handlePointerMove);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointer);
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
      if (pointerFrame) {
        window.cancelAnimationFrame(pointerFrame);
      }
    };
  }, []);

  return (
    <section className="hero" aria-label="Ami Amis hero" ref={heroRef}>
      <div className="hero__clouds" aria-hidden="true">
        <img src={assetPath("/assets/hero-clouds.png")} alt="" />
      </div>
      <div className="hero__inner">
        <div className="hero__logo" aria-label="AMI AMIS" role="img" />
        <h1 className="hero__title" aria-label="Voor merken die durven">
          <span className="hero__line hero__line--top">
            <span className="hero__word" data-text="Voor">
              Voor
            </span>{" "}
            <span className="hero__word hero__word--merken" data-text="Merken">
              Merken
            </span>
          </span>
          <span className="hero__line hero__line--script" data-text="die">
            die
          </span>
          <span className="hero__line hero__line--bottom" data-text="Durven">
            Durven
          </span>
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
