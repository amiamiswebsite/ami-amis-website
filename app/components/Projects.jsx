"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { workCases } from "../../src/data/workCases";
import { assetPath } from "../../src/lib/assetPath";

const highlightedProjectSlugs = ["visit-antwerpen", "x-oats", "tarzan-en-jane"];
const highlightedProjects = highlightedProjectSlugs
  .map((slug) => workCases.find((item) => item.slug === slug))
  .filter(Boolean);
const featuredProjects = [
  ...highlightedProjects,
  ...workCases.filter((item) => !highlightedProjectSlugs.includes(item.slug)),
].slice(0, 12);
const initialProjectIndex = Math.min(1, featuredProjects.length - 1);
const titleWaveLetters = "In de kijker".split("");

function resolveHref(href) {
  return href.startsWith("/") ? assetPath(href) : href;
}

export default function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(initialProjectIndex);
  const carouselRef = useRef(null);
  const carouselCardRefs = useRef([]);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startScrollLeft: 0,
    startX: 0,
    suppressClick: false,
  });

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    const cards = carouselCardRefs.current.filter(Boolean);

    if (!carousel || !cards.length) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const setCardState = () => {
      frame = 0;
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
          card.style.setProperty("--spotlight-scale", (1 - normalized * 0.1).toFixed(3));
          card.style.setProperty("--spotlight-opacity", (1 - normalized * 0.2).toFixed(3));
          card.style.setProperty("--spotlight-rotate", `${(direction * normalized * 3).toFixed(2)}deg`);
          card.style.setProperty("--spotlight-y", `${(normalized * 10).toFixed(2)}px`);
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

    const endDrag = (event) => {
      if (!dragRef.current.active || event.pointerId !== dragRef.current.pointerId) {
        return;
      }

      dragRef.current.active = false;
      dragRef.current.pointerId = null;
      carousel.classList.remove("is-dragging");
      carousel.releasePointerCapture?.(event.pointerId);
    };

    const onPointerDown = (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) {
        return;
      }

      dragRef.current.active = true;
      dragRef.current.pointerId = event.pointerId;
      dragRef.current.startX = event.clientX;
      dragRef.current.startScrollLeft = carousel.scrollLeft;
      dragRef.current.suppressClick = false;
      carousel.classList.add("is-dragging");
      carousel.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!dragRef.current.active || event.pointerId !== dragRef.current.pointerId) {
        return;
      }

      const delta = event.clientX - dragRef.current.startX;

      if (Math.abs(delta) > 5) {
        dragRef.current.suppressClick = true;
      }

      carousel.scrollLeft = dragRef.current.startScrollLeft - delta;
      event.preventDefault();
    };

    const onWheel = (event) => {
      if (event.ctrlKey) {
        return;
      }

      const horizontalIntent =
        event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const scrollDelta = horizontalIntent ? event.deltaX || event.deltaY : event.deltaY;

      if (!scrollDelta) {
        return;
      }

      event.preventDefault();
      carousel.scrollBy({ left: scrollDelta, behavior: reduceMotionQuery.matches ? "auto" : "smooth" });
    };

    window.requestAnimationFrame(() => {
      const initialCard = cards[initialProjectIndex];

      if (initialCard) {
        carousel.scrollLeft =
          initialCard.offsetLeft + initialCard.offsetWidth / 2 - carousel.clientWidth / 2;
      }

      setCardState();
    });
    carousel.addEventListener("scroll", schedule, { passive: true });
    carousel.addEventListener("pointerdown", onPointerDown);
    carousel.addEventListener("pointermove", onPointerMove);
    carousel.addEventListener("pointerup", endDrag);
    carousel.addEventListener("pointercancel", endDrag);
    carousel.addEventListener("lostpointercapture", endDrag);
    carousel.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", schedule);
    reduceMotionQuery.addEventListener?.("change", schedule);

    return () => {
      carousel.removeEventListener("scroll", schedule);
      carousel.removeEventListener("pointerdown", onPointerDown);
      carousel.removeEventListener("pointermove", onPointerMove);
      carousel.removeEventListener("pointerup", endDrag);
      carousel.removeEventListener("pointercancel", endDrag);
      carousel.removeEventListener("lostpointercapture", endDrag);
      carousel.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", schedule);
      reduceMotionQuery.removeEventListener?.("change", schedule);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const handleCardClick = (event) => {
    if (!dragRef.current.suppressClick) {
      return;
    }

    event.preventDefault();
    dragRef.current.suppressClick = false;
  };

  return (
    <section className="projects projects--carousel" id="werk">
      <h2 aria-label="In de kijker">
        <span className="approach-wave" aria-hidden="true">
          {titleWaveLetters.map((letter, index) => (
            <span className="approach-wave__char" key={`${letter}-${index}`}>
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
      </h2>

      <div className="projects__mobile-showcase" aria-label="Projecten carousel">
        <div className="projects__carousel" ref={carouselRef}>
          <div className="projects__carousel-track">
            {featuredProjects.map((item, index) => (
              <a
                className={`projects__carousel-card ${index === activeProjectIndex ? "is-active" : ""}`}
                href={resolveHref(item.href)}
                key={`project-${item.slug}`}
                onClick={handleCardClick}
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
                style={{ "--tilt": `${index % 2 === 0 ? "-1.2deg" : "1.2deg"}` }}
                aria-label={`Bekijk case ${item.client}`}
              >
                <img src={assetPath(item.image)} alt={`${item.client} projectbeeld`} loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
        </div>
        <p className="projects__active-title" aria-live="polite" key={featuredProjects[activeProjectIndex]?.client}>
          {featuredProjects[activeProjectIndex]?.client}
        </p>
      </div>

      <a className="button button--red projects__button" href={assetPath("/work/")}>
        <span>Zie alle</span>
        <span>projecten</span>
      </a>
    </section>
  );
}
