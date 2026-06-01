import { useEffect, useRef, useState } from "react";
import { workItems } from "../../src/data/workItems";

const VIMEO_EMBED =
  "https://player.vimeo.com/video/1185178460?h=47641c0ebc&autoplay=1&title=0&byline=0&portrait=0";

export default function Projects() {
  const [videoOpen, setVideoOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section || reduceMotion) {
      return undefined;
    }

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const items = Array.from(section.querySelectorAll(".project, .projects__scribbles"));

    const applyMotion = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const scrollProgress = Math.max(-1, Math.min(1, (viewport / 2 - rect.top) / viewport));
      items.forEach((item, index) => {
        const depth = Number(item.dataset.depth || 0.4);
        const phase = Number(item.dataset.phase || index) * 0.7;
        const scrollX = Math.sin(phase) * scrollProgress * 72;
        const scrollY = Math.cos(phase) * scrollProgress * -64;
        item.style.setProperty("--tx", `${(pointerX * 74 + scrollX) * depth}px`);
        item.style.setProperty("--ty", `${(pointerY * 58 + scrollY) * depth}px`);
        item.style.setProperty("--spin", `${(pointerX * 5 + scrollProgress * Math.sin(phase) * 5) * depth}deg`);
      });
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(applyMotion);
      }
    };

    const onPointerMove = (event) => {
      const rect = section.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
      schedule();
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      schedule();
    };

    applyMotion();
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    if (!videoOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
      }
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [videoOpen]);

  return (
    <section className="projects" id="werk" ref={sectionRef}>
      <div className="projects__collage">
        {workItems.map((item, index) => (
          <button
            className={`project project--${index + 1}`}
            data-depth={item.depth}
            data-phase={index + 1}
            key={item.image}
            onClick={() => setVideoOpen(true)}
            style={{ "--tilt": item.tilt }}
            type="button"
          >
            <img src={item.image} alt="" loading="lazy" decoding="async" />
            <span className="sr-only">Open video: {item.title}</span>
          </button>
        ))}
        <div className="projects__scribbles" data-depth="0.62" data-phase="5.5" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <h2>
        <span>In de kijker</span>
      </h2>
      <a className="button button--red projects__button" href="#werk">
        Zie alle projecten
      </a>
      {videoOpen ? (
        <div className="video-modal" onClick={() => setVideoOpen(false)}>
          <button
            className="video-modal__close"
            type="button"
            onClick={() => setVideoOpen(false)}
          >
            <span className="sr-only">Sluit video</span>
          </button>
          <div className="video-modal__frame" onClick={(event) => event.stopPropagation()}>
            <iframe
              src={VIMEO_EMBED}
              title="Ami Amis portfolio video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
