import { useEffect, useRef } from "react";

export default function Brainstorm() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section || reduceMotion) {
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.max(-1, Math.min(1, (viewport / 2 - rect.top) / viewport));
      section.style.setProperty("--brainstorm-drift", `${progress * 26}px`);
      section.style.setProperty("--brainstorm-roll", `${progress * -1.15}deg`);
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
    <section className="brainstorm" ref={sectionRef}>
      <h2>brainstormen?</h2>
      <img className="brainstorm__desk" src="/assets/brainstorm-desk.png" alt="" />
      <a className="button button--red brainstorm__button" href="#contact">
        Klik dan hier
      </a>
    </section>
  );
}
