import { useEffect, useRef, useState } from "react";
import { workItems } from "../../src/data/workItems";

const VIMEO_EMBED =
  "https://player.vimeo.com/video/1185178460?h=47641c0ebc&autoplay=1&title=0&byline=0&portrait=0";

export default function Projects() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const sectionRef = useRef(null);
  const collageRef = useRef(null);
  const fieldRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselCardRefs = useRef([]);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = collageRef.current;
    const field = fieldRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const isMobileLayout = () => mobileQuery.matches;

    if (!section || !viewport || !field) {
      return undefined;
    }

    if (isMobileLayout()) {
      field.style.removeProperty("--pan-x");
      field.style.removeProperty("--pan-y");
      return undefined;
    }

    const state = {
      active: false,
      didDrag: false,
      frame: 0,
      lastX: 0,
      lastY: 0,
      lastMoveTime: 0,
      maxX: 0,
      maxY: 0,
      momentumFrame: 0,
      originX: 0,
      originY: 0,
      pointerId: null,
      startX: 0,
      startY: 0,
      velocityX: 0,
      velocityY: 0,
      x: 0,
      y: 0,
    };

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const scheduleRender = () => {
      if (state.frame) {
        return;
      }
      state.frame = window.requestAnimationFrame(() => {
        state.frame = 0;
        field.style.setProperty("--pan-x", `${state.x}px`);
        field.style.setProperty("--pan-y", `${state.y}px`);
      });
    };

    const setPosition = (nextX, nextY) => {
      state.x = clamp(nextX, -state.maxX, state.maxX);
      state.y = clamp(nextY, -state.maxY, state.maxY);
      scheduleRender();
    };

    const stopMomentum = () => {
      if (state.momentumFrame) {
        window.cancelAnimationFrame(state.momentumFrame);
        state.momentumFrame = 0;
      }
    };

    const measureBounds = () => {
      if (isMobileLayout()) {
        stopMomentum();
        state.active = false;
        state.x = 0;
        state.y = 0;
        section.classList.remove("is-dragging");
        document.body.classList.remove("projects-dragging");
        field.style.removeProperty("--pan-x");
        field.style.removeProperty("--pan-y");
        return;
      }

      state.maxX = Math.max(0, (field.offsetWidth - viewport.clientWidth) / 2);
      state.maxY = Math.max(0, (field.offsetHeight - viewport.clientHeight) / 2);
      setPosition(state.x, state.y);
    };

    const runMomentum = (lastTime) => {
      state.momentumFrame = window.requestAnimationFrame((time) => {
        const elapsed = Math.min(32, time - lastTime);
        const decay = Math.pow(0.91, elapsed / 16);
        state.velocityX *= decay;
        state.velocityY *= decay;

        const proposedX = state.x + state.velocityX * elapsed;
        const proposedY = state.y + state.velocityY * elapsed;
        const nextX = clamp(proposedX, -state.maxX, state.maxX);
        const nextY = clamp(proposedY, -state.maxY, state.maxY);

        if (nextX !== proposedX) {
          state.velocityX = 0;
        }
        if (nextY !== proposedY) {
          state.velocityY = 0;
        }

        setPosition(nextX, nextY);

        if (Math.hypot(state.velocityX, state.velocityY) > 0.025) {
          runMomentum(time);
        } else {
          state.momentumFrame = 0;
        }
      });
    };

    const endDrag = (event) => {
      if (!state.active || event.pointerId !== state.pointerId) {
        return;
      }

      state.active = false;
      section.classList.remove("is-dragging");
      document.body.classList.remove("projects-dragging");

      if (state.didDrag) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 120);
      }

      if (!reduceMotion && state.didDrag && Math.hypot(state.velocityX, state.velocityY) > 0.045) {
        runMomentum(performance.now());
      }

      if (viewport.hasPointerCapture?.(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
    };

    const onPointerDown = (event) => {
      if (isMobileLayout()) {
        return;
      }

      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      stopMomentum();
      state.active = true;
      state.didDrag = false;
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.originX = state.x;
      state.originY = state.y;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastMoveTime = performance.now();
      state.velocityX = 0;
      state.velocityY = 0;
      if (event.pointerType !== "touch") {
        viewport.setPointerCapture?.(event.pointerId);
      }
    };

    const onPointerMove = (event) => {
      if (!state.active || event.pointerId !== state.pointerId) {
        return;
      }

      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      const distance = Math.hypot(dx, dy);
      const moveX = event.clientX - state.lastX;
      const moveY = event.clientY - state.lastY;
      const horizontalIntent = Math.abs(dx) > Math.abs(dy) * 1.15;
      const isTouch = event.pointerType === "touch";
      const now = performance.now();
      const elapsed = Math.max(8, now - state.lastMoveTime);

      if (isTouch && !horizontalIntent && Math.abs(dy) > 5) {
        return;
      }

      state.didDrag = state.didDrag || distance > 5;
      state.velocityX = (moveX / elapsed) * 0.65 + state.velocityX * 0.35;
      state.velocityY = (moveY / elapsed) * 0.65 + state.velocityY * 0.35;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastMoveTime = now;

      if (state.didDrag) {
        section.classList.add("is-dragging");
        document.body.classList.add("projects-dragging");
        event.preventDefault();
        viewport.setPointerCapture?.(event.pointerId);
      }

      setPosition(state.originX + dx, state.originY + dy);
    };

    const onWheel = (event) => {
      if (isMobileLayout() || event.ctrlKey) {
        return;
      }

      const horizontalIntent =
        event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.15;

      if (!horizontalIntent) {
        return;
      }

      event.preventDefault();
      stopMomentum();
      const wheelX = event.deltaX || (event.shiftKey ? event.deltaY : 0);
      setPosition(state.x - wheelX, state.y);
    };

    const onKeyDown = (event) => {
      if (isMobileLayout()) {
        return;
      }

      const step = event.shiftKey ? 150 : 82;
      const keyMap = {
        ArrowLeft: [state.x + step, state.y],
        ArrowRight: [state.x - step, state.y],
        ArrowUp: [state.x, state.y + step],
        ArrowDown: [state.x, state.y - step],
        Home: [0, 0],
      };

      if (!keyMap[event.key]) {
        return;
      }

      event.preventDefault();
      stopMomentum();
      setPosition(keyMap[event.key][0], keyMap[event.key][1]);
    };

    measureBounds();
    const measureFrame = window.requestAnimationFrame(measureBounds);
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("lostpointercapture", endDrag);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", measureBounds);

    return () => {
      stopMomentum();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("lostpointercapture", endDrag);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", measureBounds);
      window.cancelAnimationFrame(measureFrame);
      document.body.classList.remove("projects-dragging");
      if (state.frame) {
        window.cancelAnimationFrame(state.frame);
      }
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const cards = carouselCardRefs.current.filter(Boolean);

    if (!carousel || !cards.length) {
      return undefined;
    }

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const setCardState = () => {
      frame = 0;

      if (!mobileQuery.matches) {
        return;
      }

      const carouselRect = carousel.getBoundingClientRect();
      const carouselCenter = carouselRect.left + carouselRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }

        if (!reduceMotionQuery.matches) {
          const normalized = Math.min(1, distance / Math.max(1, carouselRect.width * 0.62));
          const direction = cardCenter < carouselCenter ? -1 : 1;
          card.style.setProperty("--spotlight-scale", (1 - normalized * 0.12).toFixed(3));
          card.style.setProperty("--spotlight-opacity", (1 - normalized * 0.26).toFixed(3));
          card.style.setProperty("--spotlight-rotate", `${(direction * normalized * 4).toFixed(2)}deg`);
          card.style.setProperty("--spotlight-y", `${(normalized * 12).toFixed(2)}px`);
        }
      });

      cards.forEach((card, index) => {
        card.classList.toggle("is-active", index === closestIndex);
      });

      setActiveProjectIndex((currentIndex) =>
        currentIndex === closestIndex ? currentIndex : closestIndex
      );
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(setCardState);
      }
    };

    setCardState();
    carousel.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobileQuery.addEventListener?.("change", schedule);
    reduceMotionQuery.addEventListener?.("change", schedule);

    return () => {
      carousel.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobileQuery.removeEventListener?.("change", schedule);
      reduceMotionQuery.removeEventListener?.("change", schedule);

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

  const handleProjectClick = (event) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setVideoOpen(true);
  };

  return (
    <section className="projects" id="werk" ref={sectionRef}>
      <div
        aria-label="Projecten in de kijker"
        className="projects__collage"
        ref={collageRef}
        role="region"
        tabIndex={0}
      >
        <div className="projects__field" ref={fieldRef}>
          {workItems.map((item, index) => (
            <button
              className={`project project--${index + 1}`}
              data-depth={item.depth}
              data-phase={index + 1}
              key={item.image}
              onClick={handleProjectClick}
              style={{ "--tilt": item.tilt }}
              type="button"
            >
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              <span className="sr-only">Open video: {item.title}</span>
            </button>
          ))}
        </div>
      </div>
      <h2>
        <span>In de kijker</span>
      </h2>
      <a className="button button--red projects__button" href="#werk">
        <span>Zie alle</span>
        <span>projecten</span>
      </a>
      <div className="projects__mobile-showcase" aria-label="Projecten carousel">
        <div className="projects__carousel" ref={carouselRef}>
          <div className="projects__carousel-track">
            {workItems.map((item, index) => (
              <button
                className={`projects__carousel-card ${index === activeProjectIndex ? "is-active" : ""}`}
                key={`mobile-${item.image}`}
                onClick={handleProjectClick}
                onFocus={() => {
                  carouselCardRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }}
                ref={(node) => {
                  carouselCardRefs.current[index] = node;
                }}
                style={{ "--tilt": item.tilt }}
                type="button"
              >
                <img src={item.image} alt={`${item.title} projectbeeld`} loading="lazy" decoding="async" />
                <span className="sr-only">Open video: {item.title}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="projects__active-title" aria-live="polite" key={workItems[activeProjectIndex]?.title}>
          {workItems[activeProjectIndex]?.title}
        </p>
      </div>
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
