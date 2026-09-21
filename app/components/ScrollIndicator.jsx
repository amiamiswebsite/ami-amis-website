"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "../styles/components/scroll-indicator.module.css";

// A persistent visual cue; native scrolling and keyboard controls stay available.
export default function ScrollIndicator({ count = 0, targetId }) {
  const indicatorRef = useRef(null);
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemCount, setItemCount] = useState(count);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const scroller = document.getElementById(targetId);
    if (!indicator || !scroller) return;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const viewport = scroller.clientWidth;
      const total = scroller.scrollWidth;
      const position = scroller.scrollLeft;
      const children = Array.from(scroller.children);
      const viewportCenter = position + viewport / 2;
      const closestIndex = children.reduce((closest, child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCenter - viewportCenter);
        return distance < closest.distance ? { distance, index } : closest;
      }, { distance: Number.POSITIVE_INFINITY, index: 0 }).index;

      setItemCount(children.length);
      setActiveIndex(closestIndex);
      setIsScrollable(total > viewport + 1);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(scroller);
    observer.observe(indicator);
    Array.from(scroller.children).forEach((child) => observer.observe(child));
    scroller.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    sync();
    const lateSyncTimer = window.setTimeout(sync, 320);

    return () => {
      window.clearTimeout(lateSyncTimer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      scroller.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [count, pathname, targetId]);

  const scrollToItem = (index) => {
    const scroller = document.getElementById(targetId);
    const item = scroller?.children[index];

    if (!scroller || !item) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({
      behavior: reduceMotion ? "auto" : "smooth",
      left: item.offsetLeft,
    });
  };

  return (
    <div
      aria-label="Kies een onderdeel van de aanpak"
      className={styles.indicator}
      data-scroll-indicator="horizontal"
      data-scrollable={isScrollable ? "true" : "false"}
      ref={indicatorRef}
    >
      {Array.from({ length: itemCount }, (_, index) => (
        <button
          aria-label={`Ga naar onderdeel ${index + 1}`}
          aria-pressed={activeIndex === index}
          key={`scroll-dot-${index}`}
          onClick={() => scrollToItem(index)}
          type="button"
        />
      ))}
    </div>
  );
}
