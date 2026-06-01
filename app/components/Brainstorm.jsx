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
    let visible = false;
    let scrollProgress = 0;
    const pointer = {
      active: false,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const commitMotion = () => {
      const isMobile = window.innerWidth <= 768;
      const pointerMaxX = isMobile ? 18 : 34;
      const pointerMaxY = isMobile ? 14 : 24;
      const pointerX = pointer.currentX * pointerMaxX;
      const pointerY = pointer.currentY * pointerMaxY;
      const scrollX = scrollProgress * (isMobile ? 18 : 28);
      const scrollY = Math.abs(scrollProgress) * (isMobile ? -9 : -14);
      const stormPower = clamp(Math.abs(scrollProgress) * 0.55 + Math.abs(pointer.currentX) * 0.32 + Math.abs(pointer.currentY) * 0.2, 0, 1);

      section.style.setProperty("--brainstorm-desk-x", `${scrollX * 0.38 + pointerX * 0.34}px`);
      section.style.setProperty("--brainstorm-drift", `${scrollProgress * 26 + pointerY * 0.2}px`);
      section.style.setProperty("--brainstorm-roll", `${scrollProgress * -1.15 + pointer.currentX * 1.1}deg`);
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

      const atTarget =
        Math.abs(pointer.targetX - pointer.currentX) < 0.003 &&
        Math.abs(pointer.targetY - pointer.currentY) < 0.003;

      if (atTarget) {
        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;
        pointerFrame = 0;
      }

      commitMotion();

      if (!atTarget) {
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
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
      if (!visible) {
        return;
      }

      const rect = section.getBoundingClientRect();
      pointer.active = true;
      pointer.targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      pointer.targetY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
      section.classList.add("is-wind-hover");
      schedulePointer();
    };

    const resetPointer = (event) => {
      if (event?.pointerType === "mouse" && event.type !== "pointerleave") {
        return;
      }

      pointer.active = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
      section.classList.remove("is-wind-hover");
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
          section.classList.remove("is-wind-hover");
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
    section.addEventListener("pointermove", handlePointerMove, { passive: true });
    section.addEventListener("pointerleave", resetPointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
      window.removeEventListener("pointerup", resetPointer);
      window.removeEventListener("pointercancel", resetPointer);
      section.removeEventListener("pointerdown", handlePointerMove);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", resetPointer);
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
      <img className="brainstorm__desk" src={assetPath("/assets/brainstorm-desk.png")} alt="" />
      <a className="button button--red brainstorm__button" href="#contact">
        Klik dan hier
      </a>
    </section>
  );
}
