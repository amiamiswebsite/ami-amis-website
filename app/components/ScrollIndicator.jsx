"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "../styles/components/scroll-indicator.module.css";

// A persistent visual cue; native scrolling and keyboard controls stay available.
export default function ScrollIndicator({ targetId }) {
  const indicatorRef = useRef(null);
  const pathname = usePathname();

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
      const track = indicator.clientWidth;
      const thumb = Math.min(track, Math.max(32, track * viewport / total));
      const progress = Math.min(1, Math.max(0, position / Math.max(1, total - viewport)));
      indicator.dataset.scrollable = total > viewport + 1 ? "true" : "false";
      indicator.style.setProperty("--scroll-thumb-size", `${thumb}px`);
      indicator.style.setProperty("--scroll-thumb-offset", `${progress * (track - thumb)}px`);
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

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      scroller.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, targetId]);

  return (
    <div
      aria-hidden="true"
      className={styles.indicator}
      data-scroll-indicator="horizontal"
      data-scrollable="false"
      ref={indicatorRef}
    >
      <span />
    </div>
  );
}
