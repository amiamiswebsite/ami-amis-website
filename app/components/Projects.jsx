"use client";

import { useEffect, useRef, useState } from "react";
import { workCases } from "../../src/data/workCases";
import { assetPath } from "../../src/lib/assetPath";

const highlightedProjectSlugs = ["visit-antwerpen", "x-oats", "tarzan-en-jane"];
const projectLabels = {
  "visit-antwerpen": "Visit Antwerp",
  "x-oats": "X-Oats",
  "tarzan-en-jane": "Tarzan & Jane",
};
const highlightedProjects = highlightedProjectSlugs
  .map((slug) => workCases.find((item) => item.slug === slug))
  .filter(Boolean);
const titleWaveLetters = "In de kijker".split("");
const centerProjectIndex = 1;
const loopGroupCount = 7;
const centerLoopGroup = Math.floor(loopGroupCount / 2);
const loopedProjects = Array.from({ length: loopGroupCount }).flatMap((_, groupIndex) =>
  highlightedProjects.map((item, projectIndex) => ({
    item,
    projectIndex,
    loopIndex: groupIndex * highlightedProjects.length + projectIndex,
    isClone: groupIndex !== centerLoopGroup,
  }))
);

function resolveHref(href) {
  return href.startsWith("/") ? assetPath(href) : href;
}

export default function Projects() {
  const initialProjectIndex = highlightedProjects[centerProjectIndex] ? centerProjectIndex : 0;
  const initialLoopIndex = centerLoopGroup * highlightedProjects.length + initialProjectIndex;
  const carouselRef = useRef(null);
  const dragStateRef = useRef({
    isActive: false,
    moved: false,
    pointerId: null,
    startScrollLeft: 0,
    startX: 0,
  });
  const suppressClickRef = useRef(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(initialProjectIndex);
  const [activeLoopIndex, setActiveLoopIndex] = useState(initialLoopIndex);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || highlightedProjects.length === 0) {
      return undefined;
    }

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const projectCount = highlightedProjects.length;
    let resizeFrame = 0;
    let scrollFrame = 0;
    let settleTimer = 0;

    const getCards = () => Array.from(carousel.querySelectorAll("[data-loop-index]"));

    const getCenteredCard = () => {
      const cards = getCards();
      const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;

      return cards.reduce((closest, card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (!closest || distance < closest.distance) {
          return { card, distance };
        }

        return closest;
      }, null)?.card;
    };

    const scrollToLoopIndex = (loopIndex, behavior = "smooth") => {
      const target = carousel.querySelector(`[data-loop-index="${loopIndex}"]`);

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const left = target.offsetLeft - (carousel.clientWidth - target.offsetWidth) / 2;

      if (behavior === "auto" || reduceMotionQuery.matches) {
        const previousScrollBehavior = carousel.style.scrollBehavior;
        const previousScrollSnapType = carousel.style.scrollSnapType;

        carousel.style.scrollBehavior = "auto";
        carousel.style.scrollSnapType = "none";
        carousel.scrollLeft = left;

        window.requestAnimationFrame(() => {
          carousel.style.scrollBehavior = previousScrollBehavior;
          carousel.style.scrollSnapType = previousScrollSnapType;
        });

        return;
      }

      carousel.scrollTo({ left, behavior });
    };

    const updateActiveFromCenter = () => {
      const centeredCard = getCenteredCard();
      const projectIndex = Number(centeredCard?.getAttribute("data-project-index"));
      const loopIndex = Number(centeredCard?.getAttribute("data-loop-index"));

      if (Number.isFinite(projectIndex)) {
        setActiveProjectIndex(projectIndex);
      }

      if (Number.isFinite(loopIndex)) {
        setActiveLoopIndex(loopIndex);
      }
    };

    const normalizeLoopPosition = () => {
      if (!mobileQuery.matches) {
        return;
      }

      const centeredCard = getCenteredCard();
      const loopIndex = Number(centeredCard?.getAttribute("data-loop-index"));

      if (!Number.isFinite(loopIndex)) {
        return;
      }

      const groupIndex = Math.floor(loopIndex / projectCount);

      if (groupIndex > 1 && groupIndex < loopGroupCount - 2) {
        return;
      }

      const projectIndex = ((loopIndex % projectCount) + projectCount) % projectCount;
      const normalizedLoopIndex = centerLoopGroup * projectCount + projectIndex;

      if (loopIndex !== normalizedLoopIndex) {
        scrollToLoopIndex(normalizedLoopIndex, "auto");
        window.requestAnimationFrame(updateActiveFromCenter);
      }
    };

    const alignInitialSlide = () => {
      const targetLoopIndex = centerLoopGroup * projectCount + centerProjectIndex;

      if (mobileQuery.matches) {
        scrollToLoopIndex(targetLoopIndex, "auto");
      }

      setActiveProjectIndex(centerProjectIndex);
      setActiveLoopIndex(targetLoopIndex);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(scrollFrame);
      window.clearTimeout(settleTimer);

      scrollFrame = window.requestAnimationFrame(() => {
        updateActiveFromCenter();
        settleTimer = window.setTimeout(normalizeLoopPosition, 180);
      });
    };

    const handleScrollEnd = () => {
      updateActiveFromCenter();
      normalizeLoopPosition();
    };

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(alignInitialSlide);
    };

    window.requestAnimationFrame(alignInitialSlide);
    carousel.addEventListener("scroll", handleScroll, { passive: true });
    carousel.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("resize", handleResize);
    mobileQuery.addEventListener?.("change", handleResize);

    return () => {
      window.cancelAnimationFrame(resizeFrame);
      window.cancelAnimationFrame(scrollFrame);
      window.clearTimeout(settleTimer);
      carousel.removeEventListener("scroll", handleScroll);
      carousel.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("resize", handleResize);
      mobileQuery.removeEventListener?.("change", handleResize);
    };
  }, []);

  const scrollToProject = (projectIndex) => {
    const carousel = carouselRef.current;
    const target = carousel?.querySelector(
      `[data-loop-index="${centerLoopGroup * highlightedProjects.length + projectIndex}"]`
    );

    if (!(carousel instanceof HTMLElement) || !(target instanceof HTMLElement)) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = target.offsetLeft - (carousel.clientWidth - target.offsetWidth) / 2;
    carousel.scrollTo({ left, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setActiveProjectIndex(projectIndex);
    setActiveLoopIndex(centerLoopGroup * highlightedProjects.length + projectIndex);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    const carousel = carouselRef.current;

    if (!(carousel instanceof HTMLElement)) {
      return;
    }

    dragStateRef.current = {
      isActive: true,
      moved: false,
      pointerId: event.pointerId,
      startScrollLeft: carousel.scrollLeft,
      startX: event.clientX,
    };
    setIsDragging(true);
    carousel.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const carousel = carouselRef.current;
    const dragState = dragStateRef.current;

    if (!(carousel instanceof HTMLElement) || !dragState.isActive) {
      return;
    }

    const distance = event.clientX - dragState.startX;

    if (Math.abs(distance) > 4) {
      dragState.moved = true;
      carousel.scrollLeft = dragState.startScrollLeft - distance;
      event.preventDefault();
    }
  };

  const finishPointerDrag = (event) => {
    const carousel = carouselRef.current;
    const dragState = dragStateRef.current;

    if (!dragState.isActive) {
      return;
    }

    if (dragState.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);

      if (carousel instanceof HTMLElement) {
        window.requestAnimationFrame(() => {
          const cards = Array.from(carousel.querySelectorAll("[data-loop-index]"));
          const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
          const closest = cards.reduce((current, card) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - viewportCenter);

            if (!current || distance < current.distance) {
              return { card, distance };
            }

            return current;
          }, null);

          if (closest?.card instanceof HTMLElement) {
            const left = closest.card.offsetLeft - (carousel.clientWidth - closest.card.offsetWidth) / 2;
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            carousel.scrollTo({ left, behavior: prefersReducedMotion ? "auto" : "smooth" });
          }
        });
      }
    }

    dragStateRef.current = {
      isActive: false,
      moved: false,
      pointerId: null,
      startScrollLeft: 0,
      startX: 0,
    };
    setIsDragging(false);
    carousel?.releasePointerCapture?.(event.pointerId);
  };

  const handleCarouselClickCapture = (event) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    }
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

      <div className="projects__mobile-showcase" aria-label="Uitgelichte projecten">
        <div
          className={`projects__carousel${isDragging ? " is-dragging" : ""}`}
          ref={carouselRef}
          onClickCapture={handleCarouselClickCapture}
          onPointerCancel={finishPointerDrag}
          onPointerDown={handlePointerDown}
          onPointerLeave={finishPointerDrag}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerDrag}
        >
          <div className="projects__carousel-track">
            {loopedProjects.map(({ item, projectIndex, loopIndex, isClone }) => (
              <a
                className={`projects__carousel-card ${loopIndex === activeLoopIndex ? "is-active" : ""}`}
                data-clone={isClone ? "true" : undefined}
                data-loop-index={loopIndex}
                data-project-index={projectIndex}
                data-project-slug={item.slug}
                draggable={false}
                href={resolveHref(item.href)}
                key={`project-${loopIndex}-${item.slug}`}
                onDragStart={(event) => event.preventDefault()}
                style={{ "--tilt": `${projectIndex % 2 === 0 ? "-1.2deg" : "1.2deg"}` }}
                aria-label={`Bekijk case ${projectLabels[item.slug] ?? item.client}`}
              >
                <img
                  src={assetPath(item.image)}
                  alt={`${projectLabels[item.slug] ?? item.client} projectbeeld`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className="projects__card-title">{projectLabels[item.slug] ?? item.client}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="projects__carousel-dots" aria-label="Uitgelicht project kiezen">
          {highlightedProjects.map((item, index) => (
            <button
              aria-label={`Toon ${projectLabels[item.slug] ?? item.client}`}
              aria-pressed={index === activeProjectIndex}
              className="projects__carousel-dot"
              key={`dot-${item.slug}`}
              onClick={() => scrollToProject(index)}
              type="button"
            />
          ))}
        </div>
      </div>

      <a className="button projects__button projects__button--yellow" href={assetPath("/work/")}>
        <span>Zie alle</span>
        <span>projecten</span>
      </a>
    </section>
  );
}
