"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./AssetsPage.module.css";

export function RisoLockup({ lines, className = "", compact = false }) {
  return (
    <span
      aria-label={lines.join(" ")}
      className={`${styles.risoLockup} ${compact ? styles.risoLockupCompact : ""} ${className}`}
    >
      {lines.map((line, index) => (
        <span className={styles.risoLine} key={`${line}-${index}`}>
          <span aria-hidden="true" className={styles.risoBreakup} />
          <span className={styles.risoText}>{line}</span>
        </span>
      ))}
    </span>
  );
}

export function SpecimenLabel({ code, children, inverse = false }) {
  return (
    <div className={`${styles.specimenLabel} ${inverse ? styles.specimenLabelInverse : ""}`}>
      <span>{code}</span>
      <strong>{children}</strong>
    </div>
  );
}

export function DepthStage({ children, className = "", intensity = 1 }) {
  const stageRef = useRef(null);
  const frameRef = useRef(0);

  const setDepth = useCallback(
    (x, y) => {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        const stage = stageRef.current;

        if (!stage) return;
        stage.style.setProperty("--depth-rotate-x", `${-y * 3.2 * intensity}deg`);
        stage.style.setProperty("--depth-rotate-y", `${x * 4.2 * intensity}deg`);
        stage.style.setProperty("--depth-x", `${x * 12 * intensity}px`);
        stage.style.setProperty("--depth-y", `${y * 10 * intensity}px`);
        stage.style.setProperty("--depth-x-reverse", `${x * -8 * intensity}px`);
        stage.style.setProperty("--depth-y-reverse", `${y * -7 * intensity}px`);
      });
    },
    [intensity],
  );

  const onPointerMove = useCallback(
    (event) => {
      if (
        event.pointerType === "touch" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      setDepth(x, y);
    },
    [setDepth],
  );

  useEffect(
    () => () => {
      window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  return (
    <div
      className={`${styles.depthStage} ${className}`}
      onPointerLeave={() => setDepth(0, 0)}
      onPointerMove={onPointerMove}
      ref={stageRef}
    >
      {children}
    </div>
  );
}
