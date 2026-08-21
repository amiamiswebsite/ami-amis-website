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
  const sectionRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(initialProjectIndex);
  const [activeLoopIndex, setActiveLoopIndex] = useState(initialLoopIndex);

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

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerQuery.matches || reduceMotionQuery.matches) {
      return undefined;
    }

    const cards = Array.from(
      section.querySelectorAll('.projects__carousel-card:not([data-clone="true"])')
    );
    const depth = [
      { x: 7, y: 4, rotateX: 0.55, rotateY: 0.8 },
      { x: 12, y: 6.5, rotateX: 0.85, rotateY: 1.2 },
      { x: 8.5, y: 4.8, rotateX: 0.65, rotateY: 0.95 },
    ];
    const pointer = {
      active: false,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };
    let animationFrame = 0;

    const renderPointer = () => {
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.13;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.13;

      cards.forEach((card, index) => {
        const strength = depth[index] ?? depth[1];
        card.style.setProperty("--project-parallax-x", `${(pointer.currentX * strength.x).toFixed(3)}px`);
        card.style.setProperty("--project-parallax-y", `${(pointer.currentY * strength.y).toFixed(3)}px`);
        card.style.setProperty(
          "--project-parallax-rotate-x",
          `${(-pointer.currentY * strength.rotateX).toFixed(3)}deg`
        );
        card.style.setProperty(
          "--project-parallax-rotate-y",
          `${(pointer.currentX * strength.rotateY).toFixed(3)}deg`
        );
        card.style.setProperty(
          "--project-image-x",
          `${(-pointer.currentX * strength.x * 0.38).toFixed(3)}px`
        );
        card.style.setProperty(
          "--project-image-y",
          `${(-pointer.currentY * strength.y * 0.38).toFixed(3)}px`
        );
        card.style.setProperty(
          "--project-print-x",
          `${(pointer.currentX * 2.2).toFixed(3)}px`
        );
        card.style.setProperty(
          "--project-print-y",
          `${(pointer.currentY * 1.7).toFixed(3)}px`
        );
      });

      const settled =
        Math.abs(pointer.targetX - pointer.currentX) < 0.002 &&
        Math.abs(pointer.targetY - pointer.currentY) < 0.002;

      if (settled) {
        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;
        animationFrame = 0;
        return;
      }

      animationFrame = window.requestAnimationFrame(renderPointer);
    };

    const queueRender = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(renderPointer);
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const rect = section.getBoundingClientRect();
      pointer.active = true;
      pointer.targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      pointer.targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      queueRender();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
      queueRender();
    };

    section.addEventListener("pointermove", handlePointerMove, { passive: true });
    section.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      cards.forEach((card) => {
        card.style.removeProperty("--project-parallax-x");
        card.style.removeProperty("--project-parallax-y");
        card.style.removeProperty("--project-parallax-rotate-x");
        card.style.removeProperty("--project-parallax-rotate-y");
        card.style.removeProperty("--project-image-x");
        card.style.removeProperty("--project-image-y");
        card.style.removeProperty("--project-print-x");
        card.style.removeProperty("--project-print-y");
      });
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

  return (
    <section className="projects projects--carousel" id="werk" ref={sectionRef}>
      <h2 className="projects__title-lockup" aria-label="In de kijker">
        <span className="projects__title-line" aria-hidden="true">
          <span className="projects__title-riso" aria-hidden="true" />
          <span className="projects__title-text">In de kijker</span>
        </span>
      </h2>

      <div className="projects__mobile-showcase" aria-label="Uitgelichte projecten">
        <div className="projects__carousel" ref={carouselRef}>
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
                aria-hidden={isClone ? "true" : undefined}
                aria-label={isClone ? undefined : `Bekijk case ${projectLabels[item.slug] ?? item.client}`}
                tabIndex={isClone ? -1 : undefined}
              >
                <span className="projects__print-mat">
                  <span className="projects__print-media">
                    <img
                      src={assetPath(item.homeImage ?? item.image)}
                      alt={`${projectLabels[item.slug] ?? item.client} projectbeeld`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <span className="projects__print-ink" aria-hidden="true" />
                    <span className="projects__print-halftone" aria-hidden="true" />
                    <span className="projects__print-registration" aria-hidden="true" />
                  </span>
                </span>
                <span className="projects__card-caption">
                  <img
                    className="projects__card-starburst"
                    src={assetPath("/assets/project-card-starburst.svg")}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                  />
                  <span className="projects__card-title">
                    {projectLabels[item.slug] ?? item.client}
                  </span>
                </span>
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
