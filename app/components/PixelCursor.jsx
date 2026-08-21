"use client";

import { useEffect, useRef } from "react";

export default function PixelCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cursor = cursorRef.current;

    if (!cursor || !mediaQuery.matches) {
      return undefined;
    }

    let animationFrame = 0;
    let clickTimer = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    const render = () => {
      cursor.style.transform = `translate3d(${Math.round(targetX)}px, ${Math.round(targetY)}px, 0)`;
      animationFrame = 0;
    };

    const showCursor = () => {
      cursor.classList.add("is-visible");
    };

    const hideCursor = () => {
      cursor.classList.remove("is-visible");
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === "touch") {
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      showCursor();

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handlePointerDown = (event) => {
      if (event.pointerType === "touch") {
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      cursor.style.transform = `translate3d(${Math.round(targetX)}px, ${Math.round(targetY)}px, 0)`;
      cursor.classList.remove("is-clicking");
      void cursor.offsetWidth;
      cursor.classList.add("is-clicking");

      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => {
        cursor.classList.remove("is-clicking");
      }, 220);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseleave", hideCursor);
      window.clearTimeout(clickTimer);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="pixel-cursor" ref={cursorRef}>
      <svg
        className="pixel-cursor__burst"
        focusable="false"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 1V6M5 5L9 9M1 14H6M5 23L9 19M23 5L19 9" />
      </svg>
    </div>
  );
}
