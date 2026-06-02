import { useEffect, useRef } from "react";
import { assetPath } from "../../src/lib/assetPath";

const windLines = Array.from({ length: 7 }, (_, index) => index + 1);
const paperFlakes = Array.from({ length: 6 }, (_, index) => index + 1);

export default function Brainstorm() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section || reduceMotion) {
      return undefined;
    }

    let scrollFrame = 0;
    let pointerFrame = 0;
    let burstTimer = 0;
    let visible = false;
    let scrollProgress = 0;
    const pointer = {
      active: false,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };
    const frontBurst = {
      currentScale: 1,
      targetScale: 1,
      currentGust: 0,
      targetGust: 0,
      currentOriginX: 50,
      currentOriginY: 52,
      targetOriginX: 50,
      targetOriginY: 52,
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const getBurstScales = () => {
      if (window.innerWidth < 1180) {
        return { peak: 1.32, settle: 1.24 };
      }

      if (window.innerWidth < 1500) {
        return { peak: 1.42, settle: 1.32 };
      }

      return { peak: 1.48, settle: 1.38 };
    };

    const commitMotion = () => {
      const isMobile = window.innerWidth <= 768;
      const isBursting = pointer.active && !isMobile;
      const pointerMaxX = isMobile ? 18 : 34;
      const pointerMaxY = isMobile ? 14 : 24;
      const pointerX = pointer.currentX * pointerMaxX;
      const pointerY = pointer.currentY * pointerMaxY;
      const scrollX = scrollProgress * (isMobile ? 18 : 28);
      const scrollY = Math.abs(scrollProgress) * (isMobile ? -9 : -14);
      const stormPower = clamp(
        Math.abs(scrollProgress) * 0.55 +
          Math.abs(pointer.currentX) * (isBursting ? 0.55 : 0.32) +
          Math.abs(pointer.currentY) * (isBursting ? 0.34 : 0.2) +
          frontBurst.currentGust * 0.34,
        0,
        1
      );
      const baseX = scrollX * 0.22 + pointerX * 0.16;
      const baseY = scrollProgress * (isMobile ? 9 : 16) + pointerY * 0.12;
      const frontFollowX = isBursting ? (window.innerWidth < 1180 ? 54 : 78) : pointerMaxX * 0.72;
      const frontFollowY = isBursting ? (window.innerWidth < 1180 ? 42 : 58) : pointerMaxY * 0.62;
      const frontX = scrollX * -0.46 + pointer.currentX * frontFollowX;
      const frontY = scrollProgress * (isMobile ? -20 : -35) + pointer.currentY * frontFollowY;
      const backX = scrollX * 0.36 + pointerX * -0.42;
      const backY = scrollProgress * (isMobile ? 16 : 28) + pointerY * -0.32;
      const gustDirection = pointer.currentX || pointer.targetX || 0.65;

      section.style.setProperty("--brainstorm-desk-x", `${scrollX * 0.38 + pointerX * 0.34}px`);
      section.style.setProperty("--brainstorm-drift", `${scrollProgress * 26 + pointerY * 0.2}px`);
      section.style.setProperty("--brainstorm-roll", `${scrollProgress * -1.15 + pointer.currentX * 1.1}deg`);
      section.style.setProperty("--desk-base-x", `${baseX}px`);
      section.style.setProperty("--desk-base-y", `${baseY}px`);
      section.style.setProperty("--desk-base-rotate-x", `${pointer.currentY * (isMobile ? -0.5 : -1)}deg`);
      section.style.setProperty("--desk-base-rotate-y", `${pointer.currentX * (isMobile ? 0.5 : 1)}deg`);
      section.style.setProperty("--desk-base-rotate-z", `${scrollProgress * -0.35 + pointer.currentX * 0.24}deg`);
      section.style.setProperty("--desk-assets-back-x", `${backX}px`);
      section.style.setProperty("--desk-assets-back-y", `${backY}px`);
      section.style.setProperty("--desk-assets-back-rotate-x", `${pointer.currentY * (isMobile ? 0.6 : 1.8)}deg`);
      section.style.setProperty("--desk-assets-back-rotate-y", `${pointer.currentX * (isMobile ? -0.7 : -2)}deg`);
      section.style.setProperty("--desk-assets-back-rotate-z", `${scrollProgress * 1.2 + pointer.currentX * -1.4}deg`);
      section.style.setProperty("--desk-assets-front-x", `${frontX}px`);
      section.style.setProperty("--desk-assets-front-y", `${frontY}px`);
      section.style.setProperty("--desk-assets-front-rotate-x", `${pointer.currentY * (isMobile ? -0.9 : isBursting ? -8 : -2.6)}deg`);
      section.style.setProperty("--desk-assets-front-rotate-y", `${pointer.currentX * (isMobile ? 1 : isBursting ? 8 : 3)}deg`);
      section.style.setProperty("--desk-assets-front-rotate-z", `${scrollProgress * -1.55 + pointer.currentX * (isBursting ? 6 : 2.2)}deg`);
      section.style.setProperty("--desk-assets-front-scale", frontBurst.currentScale.toFixed(3));
      section.style.setProperty("--desk-assets-front-z", `${46 + frontBurst.currentGust * 78}px`);
      section.style.setProperty("--desk-assets-front-gust-rotate", `${frontBurst.currentGust * (gustDirection > 0 ? 3.6 : -3.6)}deg`);
      section.style.setProperty("--desk-assets-front-origin-x", `${frontBurst.currentOriginX.toFixed(1)}%`);
      section.style.setProperty("--desk-assets-front-origin-y", `${frontBurst.currentOriginY.toFixed(1)}%`);
      section.style.setProperty("--desk-storm-intensity", stormPower.toFixed(3));
      section.style.setProperty("--brainstorm-title-x", `${scrollX * -0.22 + pointerX * -0.16}px`);
      section.style.setProperty("--brainstorm-title-y", `${scrollY * 0.28 + pointerY * 0.1}px`);
      section.style.setProperty("--brainstorm-title-roll", `${scrollProgress * 0.35 + pointer.currentX * -0.38}deg`);
      section.style.setProperty("--brainstorm-button-x", `${scrollX * 0.28 + pointerX * 0.2}px`);
      section.style.setProperty("--brainstorm-button-y", `${scrollY * -0.16 + pointerY * 0.12}px`);
      section.style.setProperty("--brainstorm-button-roll", `${scrollProgress * -0.28 + pointer.currentX * 0.42}deg`);
      section.style.setProperty("--brainstorm-line-x", `${scrollX + pointerX * 0.62}px`);
      section.style.setProperty("--brainstorm-line-y", `${scrollY + pointerY * 0.3}px`);
      section.style.setProperty("--brainstorm-line-roll", `${scrollProgress * -3 + pointer.currentX * 2.4}deg`);
      section.style.setProperty("--brainstorm-paper-x", `${scrollX * 0.76 + pointerX * 0.48}px`);
      section.style.setProperty("--brainstorm-paper-y", `${scrollY * 0.64 + pointerY * 0.34}px`);
      section.style.setProperty("--brainstorm-paper-roll", `${scrollProgress * 3.2 + pointer.currentX * -2.4}deg`);
      section.style.setProperty("--brainstorm-storm-opacity", `${0.36 + stormPower * 0.46}`);
    };

    const updateScroll = () => {
      scrollFrame = 0;

      if (!visible) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      scrollProgress = clamp((viewport / 2 - rect.top) / viewport, -1, 1);
      commitMotion();
    };

    const updatePointer = () => {
      pointerFrame = 0;

      if (!visible) {
        return;
      }

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.16;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.16;
      frontBurst.currentScale +=
        (frontBurst.targetScale - frontBurst.currentScale) *
        (frontBurst.targetScale > frontBurst.currentScale ? 0.34 : 0.14);
      frontBurst.currentGust += (frontBurst.targetGust - frontBurst.currentGust) * 0.2;
      frontBurst.currentOriginX += (frontBurst.targetOriginX - frontBurst.currentOriginX) * 0.18;
      frontBurst.currentOriginY += (frontBurst.targetOriginY - frontBurst.currentOriginY) * 0.18;

      const atTarget =
        Math.abs(pointer.targetX - pointer.currentX) < 0.003 &&
        Math.abs(pointer.targetY - pointer.currentY) < 0.003 &&
        Math.abs(frontBurst.targetScale - frontBurst.currentScale) < 0.003 &&
        Math.abs(frontBurst.targetGust - frontBurst.currentGust) < 0.003 &&
        Math.abs(frontBurst.targetOriginX - frontBurst.currentOriginX) < 0.04 &&
        Math.abs(frontBurst.targetOriginY - frontBurst.currentOriginY) < 0.04;

      if (atTarget) {
        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;
        frontBurst.currentScale = frontBurst.targetScale;
        frontBurst.currentGust = frontBurst.targetGust;
        frontBurst.currentOriginX = frontBurst.targetOriginX;
        frontBurst.currentOriginY = frontBurst.targetOriginY;
        pointerFrame = 0;
      }

      commitMotion();

      if (!atTarget) {
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
    };

    const updatePointerTarget = (event) => {
      const rect = section.getBoundingClientRect();
      const relativeX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const relativeY = clamp((event.clientY - rect.top) / rect.height, 0, 1);

      pointer.targetX = clamp((relativeX - 0.5) * 2, -1, 1);
      pointer.targetY = clamp((relativeY - 0.5) * 2, -1, 1);
      frontBurst.targetOriginX = clamp(relativeX * 100, 20, 80);
      frontBurst.targetOriginY = clamp(relativeY * 100, 22, 78);
    };

    const startBurst = (event) => {
      if (!visible || window.innerWidth <= 768 || event.pointerType !== "mouse") {
        return;
      }

      const { peak, settle } = getBurstScales();
      pointer.active = true;
      updatePointerTarget(event);
      section.classList.add("is-wind-hover", "is-chaos-burst");
      frontBurst.targetScale = peak;
      frontBurst.targetGust = 1;

      if (burstTimer) {
        window.clearTimeout(burstTimer);
      }

      burstTimer = window.setTimeout(() => {
        frontBurst.targetScale = settle;
        frontBurst.targetGust = 0.34;
        schedulePointer();
      }, 175);

      schedulePointer();
    };

    const scheduleScroll = () => {
      if (visible && !scrollFrame) {
        scrollFrame = window.requestAnimationFrame(updateScroll);
      }
    };

    const schedulePointer = () => {
      if (visible && !pointerFrame) {
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
    };

    const handlePointerMove = (event) => {
      if (!visible || window.innerWidth <= 768 || event.pointerType !== "mouse") {
        return;
      }

      if (!pointer.active) {
        startBurst(event);
        return;
      }

      updatePointerTarget(event);
      section.classList.add("is-wind-hover", "is-chaos-burst");
      schedulePointer();
    };

    const resetPointer = (event) => {
      if (event?.pointerType === "mouse" && event.type !== "pointerleave") {
        return;
      }

      pointer.active = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
      frontBurst.targetScale = 1;
      frontBurst.targetGust = 0;
      frontBurst.targetOriginX = 50;
      frontBurst.targetOriginY = 52;
      if (burstTimer) {
        window.clearTimeout(burstTimer);
        burstTimer = 0;
      }
      section.classList.remove("is-wind-hover", "is-chaos-burst");
      schedulePointer();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        section.classList.toggle("is-storm-active", visible);

        if (visible) {
          scheduleScroll();
          schedulePointer();
        } else {
          pointer.active = false;
          pointer.targetX = 0;
          pointer.targetY = 0;
          frontBurst.targetScale = 1;
          frontBurst.targetGust = 0;
          frontBurst.targetOriginX = 50;
          frontBurst.targetOriginY = 52;
          section.classList.remove("is-wind-hover", "is-chaos-burst");
        }
      },
      { rootMargin: "18% 0px 18% 0px", threshold: 0.05 }
    );

    observer.observe(section);
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll);
    window.addEventListener("pointerup", resetPointer, { passive: true });
    window.addEventListener("pointercancel", resetPointer, { passive: true });
    section.addEventListener("pointerdown", handlePointerMove, { passive: true });
    section.addEventListener("pointerenter", startBurst, { passive: true });
    section.addEventListener("pointermove", handlePointerMove, { passive: true });
    section.addEventListener("pointerleave", resetPointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
      window.removeEventListener("pointerup", resetPointer);
      window.removeEventListener("pointercancel", resetPointer);
      section.removeEventListener("pointerdown", handlePointerMove);
      section.removeEventListener("pointerenter", startBurst);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", resetPointer);
      if (burstTimer) {
        window.clearTimeout(burstTimer);
      }
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
      if (pointerFrame) {
        window.cancelAnimationFrame(pointerFrame);
      }
    };
  }, []);

  return (
    <section className="brainstorm" ref={sectionRef}>
      <div className="brainstorm__storm" aria-hidden="true">
        {windLines.map((line) => (
          <span className={`brainstorm__wind-line brainstorm__wind-line--${line}`} key={`wind-${line}`} />
        ))}
        {paperFlakes.map((flake) => (
          <span className={`brainstorm__paper-flake brainstorm__paper-flake--${flake}`} key={`flake-${flake}`} />
        ))}
      </div>
      <h2>brainstormen?</h2>
      <div className="desk-storm-scene" aria-hidden="true">
        <div className="desk-storm-inner">
          <div className="desk-storm-layer desk-storm-base-layer">
            <img
              className="desk-storm-image desk-storm-base"
              src={assetPath("/assets/pennydesk.png")}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="desk-storm-layer desk-storm-assets-layer desk-storm-assets-layer--back">
            <img
              className="desk-storm-image desk-storm-assets"
              src={assetPath("/assets/pennydeskassets.png")}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="desk-storm-layer desk-storm-assets-layer desk-storm-assets-layer--front">
            <img
              className="desk-storm-image desk-storm-assets"
              src={assetPath("/assets/pennydeskassets.png")}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
      <a className="button button--red brainstorm__button" href="#contact">
        Klik dan hier
      </a>
    </section>
  );
}
