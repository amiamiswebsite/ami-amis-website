"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "../../src/lib/assetPath";

const highlightProjects = [
  {
    title: "Tarzan en Jane",
    client: "Tarzan en Jane",
    type: "Video & campagnes",
    image: "/work/cosy-trendy.webp",
    href: "/work/tarzan-en-jane/",
    alt: "Projectbeeld van Tarzan en Jane",
  },
  {
    title: "Visit Antwerpen",
    client: "Visit Antwerpen",
    type: "Fotografie",
    image: "/work/sint-jan.webp",
    href: "/work/visitantwerp/",
    alt: "Videostill van de Visit Antwerpen case",
  },
  {
    title: "Humgy",
    client: "Humgy",
    type: "Social content",
    image: "/work/pluginvest.webp",
    href: "/work/humgy/",
    alt: "Projectbeeld van Humgy",
  },
  {
    title: "imore",
    client: "imore",
    type: "Social content",
    image: "/work/imore.webp",
    href: "/work/imore/",
    alt: "Videostill van imore project",
  },
  {
    title: "VDAB",
    client: "VDAB",
    type: "Campagnevideo",
    image: "/work/vdab.webp",
    href: "#werk",
    alt: "Videostill van VDAB project",
  },
  {
    title: "PlugInvest",
    client: "PlugInvest",
    type: "Content",
    image: "/work/pluginvest.webp",
    href: "#werk",
    alt: "Videostill van PlugInvest project",
  },
  {
    title: "K. Lierse S.K.",
    client: "K. Lierse S.K.",
    type: "Social content",
    image: "/work/lierse.webp",
    href: "#werk",
    alt: "Videostill van K. Lierse S.K. project",
  },
  {
    title: "FRISK",
    client: "FRISK",
    type: "Brand film",
    image: "/work/frisk.webp",
    href: "#werk",
    alt: "Videostill van FRISK project",
  },
];

function resolveHref(href) {
  return href.startsWith("/") ? assetPath(href) : href;
}

function FilmrollProjectFrame({ project, index, onSuppressClick }) {
  return (
    <a
      className="filmroll-frame"
      href={resolveHref(project.href)}
      onClick={onSuppressClick}
      onFocus={(event) => {
        event.currentTarget.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }}
      style={{ "--frame-index": index }}
    >
      <span className="filmroll-frame__image">
        <img src={assetPath(project.image)} alt={project.alt} loading="lazy" decoding="async" />
      </span>
      <span className="filmroll-frame__meta">
        <span className="filmroll-frame__info">
          <strong>{project.client}</strong>
          <span className="filmroll-frame__type">{project.type}</span>
        </span>
        <span className="filmroll-frame__cta">Bekijk</span>
      </span>
    </a>
  );
}

export default function FilmrollHighlights() {
  const scrollerRef = useRef(null);
  const dragRef = useRef({
    active: false,
    didHint: false,
    pointerId: null,
    startScrollLeft: 0,
    startX: 0,
    suppressClick: false,
  });

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return undefined;
    }

    const state = dragRef.current;
    let hintTimer = 0;
    let observer;

    const endDrag = (event) => {
      if (!state.active || event.pointerId !== state.pointerId) {
        return;
      }

      state.active = false;
      state.pointerId = null;
      scroller.classList.remove("is-dragging");
      scroller.releasePointerCapture?.(event.pointerId);
    };

    const onPointerDown = (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) {
        return;
      }

      state.active = true;
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startScrollLeft = scroller.scrollLeft;
      state.suppressClick = false;
      scroller.classList.add("is-dragging");
      scroller.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!state.active || event.pointerId !== state.pointerId) {
        return;
      }

      const delta = event.clientX - state.startX;

      if (Math.abs(delta) > 5) {
        state.suppressClick = true;
      }

      scroller.scrollLeft = state.startScrollLeft - delta;
      event.preventDefault();
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) && event.deltaX === 0) {
        return;
      }

      event.preventDefault();
      scroller.scrollLeft += event.deltaY + event.deltaX;
    };

    const onKeyDown = (event) => {
      const step = event.shiftKey ? scroller.clientWidth * 0.82 : scroller.clientWidth * 0.46;
      const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

      if (!direction) {
        return;
      }

      event.preventDefault();
      scroller.scrollBy({ left: step * direction, behavior: "smooth" });
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || state.didHint) {
            return;
          }

          state.didHint = true;
          hintTimer = window.setTimeout(() => {
            scroller.scrollBy({ left: Math.min(260, scroller.clientWidth * 0.32), behavior: "smooth" });
          }, 420);
        },
        { threshold: 0.35 }
      );
      observer.observe(scroller);
    }

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointercancel", endDrag);
    scroller.addEventListener("lostpointercapture", endDrag);
    scroller.addEventListener("keydown", onKeyDown);

    return () => {
      observer?.disconnect();
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", endDrag);
      scroller.removeEventListener("pointercancel", endDrag);
      scroller.removeEventListener("lostpointercapture", endDrag);
      scroller.removeEventListener("keydown", onKeyDown);

      if (hintTimer) {
        window.clearTimeout(hintTimer);
      }
    };
  }, []);

  const handleSuppressClick = (event) => {
    if (!dragRef.current.suppressClick) {
      return;
    }

    event.preventDefault();
    dragRef.current.suppressClick = false;
  };

  return (
    <section className="filmroll-highlights" id="filmroll-highlights" aria-labelledby="filmroll-title">
      <div className="filmroll-highlights__inner">
        <div className="filmroll-highlights__header">
          <h2 id="filmroll-title">In de kijker</h2>
        </div>

        <div className="filmroll-shell">
          <div
            className="filmroll-scroll"
            ref={scrollerRef}
            role="region"
            tabIndex={0}
            aria-label="In de kijker projecten filmrol"
          >
            <div className="filmroll-strip">
              <div className="filmroll-track">
                {highlightProjects.map((project, index) => (
                  <FilmrollProjectFrame
                    index={index}
                    key={`${project.client}-${project.type}`}
                    onSuppressClick={handleSuppressClick}
                    project={project}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <a className="button button--red filmroll-highlights__cta" href={assetPath("/work/")}>
          Zie alle projecten
        </a>
      </div>
    </section>
  );
}
