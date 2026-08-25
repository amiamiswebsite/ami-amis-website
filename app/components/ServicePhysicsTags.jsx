import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { assetPath } from "../../src/lib/assetPath";
import styles from "../styles/components/service-physics-tags.module.css";
import CtaArrowIcon from "./ui/CtaArrowIcon";

const SERVICES = [
  ["Marketing", "red"],
  ["video", "ink"],
  ["videografie", "cream"],
  ["montage", "orange"],
  ["copywriting", "ink"],
  ["campagnes", "cream"],
  ["social media content", "red"],
  ["grafisch design", "ink"],
  ["webdesign", "orange"],
  ["fotografie", "orange"],
  ["animatie", "cream"],
  ["short form content", "cream"],
  ["audio design", "red"],
  ["grading", "ink"],
  ["productie", "orange"],
  ["VFX", "cream"],
  ["reclamespot", "cream"],
  ["screenwriting", "red"],
  ["....", "ink"],
];

const STAGE_INSET = 12;
const WIN_SCORE = 5;
const BRENT_BOOKING_URL = "https://calendly.com/brent-amiamis/30min";
const SCORE_HEADING = "Met onze content ga je scoren!";
const SCORE_ACCENT_START = SCORE_HEADING.indexOf("scoren");
const SCORE_WORDS = SCORE_HEADING.split(" ").map((word, index, words) => ({
  startIndex: words.slice(0, index).join(" ").length + (index > 0 ? 1 : 0),
  word,
}));

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

function seededRandom(seed) {
  let value = seed % 2147483647;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function WinModal({ closeButtonRef, onClose, phase }) {
  const copyFeedbackTimerRef = useRef(0);
  const [copyState, setCopyState] = useState("idle");

  useEffect(
    () => () => {
      window.clearTimeout(copyFeedbackTimerRef.current);
    },
    []
  );

  const copyRewardCode = async () => {
    let didCopy = false;

    try {
      await navigator.clipboard.writeText("AMIS4EVER");
      didCopy = true;
    } catch {
      const fallbackInput = document.createElement("textarea");
      fallbackInput.value = "AMIS4EVER";
      fallbackInput.setAttribute("readonly", "");
      fallbackInput.style.position = "fixed";
      fallbackInput.style.opacity = "0";
      document.body.append(fallbackInput);
      fallbackInput.select();
      didCopy = document.execCommand("copy");
      fallbackInput.remove();
    }

    setCopyState(didCopy ? "copied" : "failed");
    window.clearTimeout(copyFeedbackTimerRef.current);
    copyFeedbackTimerRef.current = window.setTimeout(() => setCopyState("idle"), 1800);
  };

  return (
    <div
      className={`${styles.modalOverlay}${phase === "closing" ? ` ${styles.modalClosing}` : ""}`}
      data-testid="service-win-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-describedby="service-win-description"
        aria-labelledby="service-win-title"
        aria-modal="true"
        className={styles.modalPanel}
        data-testid="service-win-modal"
        role="dialog"
      >
        <button
          aria-label="Sluit de beloning"
          className={styles.modalClose}
          data-testid="service-win-close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <span />
          <span />
        </button>

        <div className={styles.rewardVisual}>
          <img
            alt="Brent als Ami Amis-engel"
            className={styles.rewardImage}
            decoding="async"
            src={assetPath("/assets/brentvalentijn.png")}
          />
        </div>

        <div className={styles.rewardCopy}>
          <h2 id="service-win-title" tabIndex={-1}>
            Proficiat, je hebt gewonnen!
          </h2>
          <p className={styles.rewardDescription} id="service-win-description">
            Met deze code krijg je een <strong>gratis marketingscan van je bedrijf!</strong>
          </p>
          <button
            aria-label="Kopieer promocode AMIS4EVER"
            className={styles.rewardCode}
            data-testid="service-reward-code"
            onClick={copyRewardCode}
            type="button"
          >
            <code>AMIS4EVER</code>
            <span className={styles.rewardCodeAction}>
              {copyState === "copied" ? "Gekopieerd" : copyState === "failed" ? "Probeer opnieuw" : "Kopieer"}
            </span>
          </button>
          <span className="aa-visually-hidden" aria-live="polite">
            {copyState === "copied" ? "Promocode AMIS4EVER is gekopieerd." : ""}
          </span>
          <a
            className={styles.rewardCta}
            href={BRENT_BOOKING_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>
              <strong>Boek snel een date met Brent</strong>
              <small>en geef bovenstaande code in!</small>
            </span>
            <span className={styles.rewardCtaIcon} aria-hidden="true">
              <CtaArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ServicePhysicsTags() {
  const gameRef = useRef(null);
  const headingRef = useRef(null);
  const stageRef = useRef(null);
  const itemRefs = useRef([]);
  const scoreStatusRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeTimerRef = useRef(0);
  const lastFocusedElementRef = useRef(null);
  const modalPhaseRef = useRef("closed");
  const scoreRef = useRef(0);
  const winOpenedRef = useRef(false);
  const [modalPhase, setModalPhase] = useState("closed");
  const [score, setScore] = useState(0);

  const closeWinModal = useCallback(() => {
    if (modalPhaseRef.current !== "open") {
      return;
    }

    modalPhaseRef.current = "closing";
    setModalPhase("closing");
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      modalPhaseRef.current = "closed";
      setModalPhase("closed");
    }, 220);
  }, []);

  const registerGoal = useCallback(() => {
    if (scoreRef.current >= WIN_SCORE) {
      return;
    }

    const nextScore = scoreRef.current + 1;
    scoreRef.current = nextScore;
    setScore(nextScore);

    if (nextScore === WIN_SCORE && !winOpenedRef.current) {
      winOpenedRef.current = true;
      modalPhaseRef.current = "open";
      setModalPhase("open");
    }
  }, []);

  const isWinModalMounted = modalPhase !== "closed";

  useEffect(() => {
    if (!isWinModalMounted) {
      return undefined;
    }

    const bodyAlreadyLocked = document.body.classList.contains("modal-open");
    lastFocusedElementRef.current = document.activeElement;
    document.body.classList.add("modal-open");

    const focusFrame = window.requestAnimationFrame(() => {
      document.getElementById("service-win-title")?.focus({ preventScroll: true });
    });
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeWinModal();
        return;
      }

      if (event.key !== "Tab" || modalPhaseRef.current !== "open") {
        return;
      }

      const panel = closeButtonRef.current?.closest('[role="dialog"]');
      const focusableElements = panel
        ? [...panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        : [];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        return;
      }

      if (
        event.shiftKey &&
        (document.activeElement === firstElement || document.activeElement?.id === "service-win-title")
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);

      if (!bodyAlreadyLocked) {
        document.body.classList.remove("modal-open");
      }

      if (lastFocusedElementRef.current instanceof HTMLElement) {
        lastFocusedElementRef.current.focus({ preventScroll: true });
      }
    };
  }, [closeWinModal, isWinModalMounted]);

  useEffect(
    () => () => {
      window.clearTimeout(closeTimerRef.current);
    },
    []
  );

  useEffect(() => {
    const game = gameRef.current;
    const heading = headingRef.current;

    if (!game || !heading) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      heading.dataset.revealed = "true";
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        heading.dataset.revealed = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -5%", threshold: 0.15 }
    );

    observer.observe(game);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const game = gameRef.current;
    const heading = headingRef.current;
    const stage = stageRef.current;
    const nodes = itemRefs.current.filter(Boolean);

    if (!game || !heading || !stage || nodes.length !== SERVICES.length) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const random = seededRandom(2211);
    let matter = null;
    let engine = null;
    let records = [];
    let walls = [];
    let hoopBodies = [];
    let hoopGeometry = null;
    let scoreTimer = 0;
    let activeConstraint = null;
    let activePointerId = null;
    let activeRecord = null;
    let frameId = 0;
    let resizeTimer = 0;
    let lastFrameTime = 0;
    let initialized = false;
    let initializing = false;
    let destroyed = false;
    let isInView = false;
    let stageSize = { width: 0, height: 0 };
    let stageCeilingY = STAGE_INSET;
    let pointerHistory = [];
    let resizeObserver = null;

    const renderBodies = () => {
      records.forEach(({ body, node }) => {
        node.style.transform = `translate3d(${(body.position.x - node.offsetWidth / 2).toFixed(2)}px, ${(body.position.y - node.offsetHeight / 2).toFixed(2)}px, 0) rotate(${body.angle.toFixed(4)}rad)`;
      });
    };

    const stopLoop = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const step = (time) => {
      if (!engine || !isInView || document.hidden || reducedMotion.matches) {
        stopLoop();
        return;
      }

      const elapsed = lastFrameTime ? time - lastFrameTime : 1000 / 60;
      lastFrameTime = time;
      matter.Engine.update(engine, clamp(elapsed, 1000 / 120, 1000 / 30));
      detectHoopScore();
      renderBodies();
      frameId = window.requestAnimationFrame(step);
    };

    const syncLoop = () => {
      const shouldRun = initialized && isInView && !document.hidden && !reducedMotion.matches;

      if (shouldRun && !frameId) {
        lastFrameTime = performance.now();
        frameId = window.requestAnimationFrame(step);
      } else if (!shouldRun) {
        stopLoop();
      }
    };

    const getStageCeilingY = () => {
      const gameRect = game?.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const ceilingY = gameRect ? gameRect.top - stageRect.top + STAGE_INSET : STAGE_INSET;

      stage.style.setProperty("--service-stage-ceiling-y", `${ceilingY}px`);
      return ceilingY;
    };

    const createWalls = (width, height, ceilingY) => {
      const thickness = 120;
      const verticalWallTop = ceilingY - thickness;
      const verticalWallBottom = height + thickness;
      const verticalWallHeight = verticalWallBottom - verticalWallTop;
      const wallOptions = {
        isStatic: true,
        restitution: 0.15,
        friction: 0.4,
        label: "service-stage-wall",
      };

      return [
        matter.Bodies.rectangle(
          width / 2,
          ceilingY - thickness / 2,
          width + thickness * 2,
          thickness,
          wallOptions
        ),
        matter.Bodies.rectangle(
          width / 2,
          height - STAGE_INSET + thickness / 2,
          width + thickness * 2,
          thickness,
          wallOptions
        ),
        matter.Bodies.rectangle(
          STAGE_INSET - thickness / 2,
          verticalWallTop + verticalWallHeight / 2,
          thickness,
          verticalWallHeight,
          wallOptions
        ),
        matter.Bodies.rectangle(
          width - STAGE_INSET + thickness / 2,
          verticalWallTop + verticalWallHeight / 2,
          thickness,
          verticalWallHeight,
          wallOptions
        ),
      ];
    };

    const createHoop = (width, height) => {
      const ringWidth = clamp(width * 0.19, 150, 228);
      const sideClearance = clamp(width * 0.012, 16, 20);
      const preferredX = width - ringWidth / 2 - ringWidth * 0.06 - sideClearance;
      const x = clamp(preferredX, ringWidth * 0.65, width - ringWidth * 0.55 - STAGE_INSET);
      const topClearance = STAGE_INSET + ringWidth * 0.4;
      const preferredY = height * (width < 520 ? 0.2 : 0.16);
      const y = clamp(preferredY, topClearance, height * 0.38);
      const rimRadius = clamp(ringWidth * 0.045, 7, 10);
      const rimOptions = {
        isStatic: true,
        restitution: 0.48,
        friction: 0.22,
        label: "service-hoop-rim",
      };

      hoopGeometry = { ringWidth, x, y };
      stage.style.setProperty("--service-hoop-x", `${x}px`);
      stage.style.setProperty("--service-hoop-y", `${y}px`);
      stage.style.setProperty("--service-hoop-width", `${ringWidth}px`);

      return [
        matter.Bodies.circle(x - ringWidth / 2, y, rimRadius, rimOptions),
        matter.Bodies.circle(x + ringWidth / 2, y, rimRadius, rimOptions),
        matter.Bodies.rectangle(
          x + ringWidth / 2 + ringWidth * 0.08,
          y - ringWidth * 0.2,
          clamp(ringWidth * 0.04, 7, 10),
          ringWidth * 0.42,
          {
            isStatic: true,
            restitution: 0.35,
            friction: 0.3,
            label: "service-hoop-backboard",
          }
        ),
      ];
    };

    const celebrateScore = (record) => {
      if (!record.scoreArmed) {
        return;
      }

      record.scoreArmed = false;
      registerGoal();
      window.clearTimeout(scoreTimer);
      stage.dataset.hoopScore = "true";
      if (scoreStatusRef.current) {
        scoreStatusRef.current.textContent = "";
        window.requestAnimationFrame(() => {
          if (scoreStatusRef.current) {
            scoreStatusRef.current.textContent = "Goaaal!";
          }
        });
      }
      scoreTimer = window.setTimeout(() => {
        delete stage.dataset.hoopScore;
        if (scoreStatusRef.current) {
          scoreStatusRef.current.textContent = "";
        }
      }, 720);
    };

    const detectHoopScore = () => {
      if (!hoopGeometry) {
        return;
      }

      const { ringWidth, x, y } = hoopGeometry;

      records.forEach((record) => {
        const previousY = record.previousY ?? record.body.position.y;
        const halfWidth = record.width / 2;
        const insideOpening = Math.abs(record.body.position.x - x) < ringWidth / 2 - halfWidth * 0.5;

        if (record.body.position.y < y - Math.max(18, record.height * 0.3)) {
          record.wasAboveHoop = true;
        }

        if (
          record.wasAboveHoop &&
          insideOpening &&
          previousY <= y + 8 &&
          record.body.position.y > y + 8 &&
          record.body.velocity.y > 0.2
        ) {
          record.wasAboveHoop = false;
          celebrateScore(record);
        } else if (record.body.position.y > y + 110) {
          record.wasAboveHoop = false;
        }

        record.previousY = record.body.position.y;
      });
    };

    const releaseDrag = (event) => {
      if (!activeConstraint || !engine || !matter) {
        return;
      }

      matter.Composite.remove(engine.world, activeConstraint);

      const recent = pointerHistory.filter((point) => performance.now() - point.time < 110);
      const first = recent[0];
      const last = recent.at(-1);

      if (activeRecord && first && last && last.time > first.time) {
        const factor = 16.667 / (last.time - first.time);
        const velocity = {
          x: clamp((last.x - first.x) * factor, -20, 20),
          y: clamp((last.y - first.y) * factor, -20, 20),
        };

        matter.Body.setVelocity(activeRecord.body, velocity);
        matter.Body.setAngularVelocity(
          activeRecord.body,
          clamp(activeRecord.body.angularVelocity + velocity.x * 0.006, -0.18, 0.18)
        );
      }

      if (activeRecord) {
        activeRecord.node.style.removeProperty("z-index");
      }

      if (activePointerId !== null && stage.hasPointerCapture(activePointerId)) {
        stage.releasePointerCapture(activePointerId);
      }

      activeConstraint = null;
      activePointerId = null;
      activeRecord = null;
      pointerHistory = [];
      delete stage.dataset.dragging;

      if (event?.type === "pointercancel") {
        renderBodies();
      }
    };

    const resetSimulation = () => {
      stopLoop();
      releaseDrag();

      if (engine && matter) {
        matter.Composite.clear(engine.world, false, true);
        matter.Engine.clear(engine);
      }

      engine = null;
      records = [];
      walls = [];
      hoopBodies = [];
      hoopGeometry = null;
      initialized = false;
      initializing = false;
      stageSize = { width: 0, height: 0 };
      stageCeilingY = STAGE_INSET;
      delete stage.dataset.physicsReady;
      delete stage.dataset.dragging;
      delete stage.dataset.hoopScore;
      window.clearTimeout(scoreTimer);
      stage.style.removeProperty("--service-hoop-x");
      stage.style.removeProperty("--service-hoop-y");
      stage.style.removeProperty("--service-hoop-width");
      stage.style.removeProperty("--service-stage-ceiling-y");

      nodes.forEach((node) => {
        node.style.removeProperty("transform");
        node.style.removeProperty("z-index");
      });
    };

    const initialize = async () => {
      if (initialized || initializing || destroyed || reducedMotion.matches) {
        return;
      }

      initializing = true;
      await document.fonts?.ready;
      await new Promise((resolve) => {
        window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
      });

      if (destroyed || reducedMotion.matches) {
        initializing = false;
        return;
      }

      const importedMatter = await import("matter-js");
      matter = importedMatter.default || importedMatter;

      if (destroyed || reducedMotion.matches) {
        initializing = false;
        return;
      }

      const rect = stage.getBoundingClientRect();
      stageSize = { width: rect.width, height: rect.height };
      stageCeilingY = getStageCeilingY();
      engine = matter.Engine.create({
        positionIterations: 8,
        velocityIterations: 6,
        constraintIterations: 3,
      });
      engine.gravity.y = 0.9;
      engine.gravity.scale = 0.001;

      const columns = rect.width < 520 ? 2 : rect.width < 900 ? 4 : 7;
      const measurements = nodes.map((node) => ({
        width: node.offsetWidth,
        height: node.offsetHeight,
      }));

      records = nodes.map((node, index) => {
        const measurement = measurements[index];
        const column = index % columns;
        const row = Math.floor(index / columns);
        const columnWidth = rect.width / columns;
        const spawnTop = rect.height * (rect.width < 520 ? 0.46 : 0.52);
        const rowSpacing = clamp(measurement.height * 0.34, 14, 22);
        const x = clamp(
          columnWidth * (column + 0.5) + (random() - 0.5) * columnWidth * 0.26,
          measurement.width / 2 + STAGE_INSET,
          rect.width - measurement.width / 2 - STAGE_INSET
        );
        const y = clamp(
          spawnTop + row * rowSpacing + random() * 10,
          measurement.height / 2 + STAGE_INSET,
          rect.height - measurement.height / 2 - STAGE_INSET
        );
        const body = matter.Bodies.rectangle(x, y, measurement.width, measurement.height, {
          chamfer: { radius: Math.min(measurement.height / 2, 28) },
          restitution: 0.27,
          friction: 0.3,
          frictionStatic: 0.6,
          frictionAir: 0.017,
          density: 0.0012,
          slop: 0.02,
          label: `service-tag-${index + 1}`,
        });

        matter.Body.setAngle(body, (random() - 0.5) * 0.13);
        matter.Body.setAngularVelocity(body, (random() - 0.5) * 0.012);
        return {
          body,
          node,
          previousY: y,
          scoreArmed: false,
          wasAboveHoop: false,
          ...measurement,
        };
      });

      walls = createWalls(rect.width, rect.height, stageCeilingY);
      hoopBodies = createHoop(rect.width, rect.height);
      matter.Composite.add(engine.world, [...walls, ...hoopBodies, ...records.map(({ body }) => body)]);
      renderBodies();
      stage.dataset.physicsReady = "true";
      initialized = true;
      initializing = false;
      syncLoop();
    };

    const resizeSimulation = () => {
      if (!initialized || !engine || !matter) {
        return;
      }

      releaseDrag();
      const rect = stage.getBoundingClientRect();
      const oldSize = stageSize;
      stageSize = { width: rect.width, height: rect.height };
      stageCeilingY = getStageCeilingY();

      walls.forEach((wall) => matter.Composite.remove(engine.world, wall));
      hoopBodies.forEach((body) => matter.Composite.remove(engine.world, body));
      walls = createWalls(rect.width, rect.height, stageCeilingY);
      hoopBodies = createHoop(rect.width, rect.height);
      matter.Composite.add(engine.world, [...walls, ...hoopBodies]);

      records.forEach((record) => {
        const nextWidth = record.node.offsetWidth;
        const nextHeight = record.node.offsetHeight;

        if (record.width && record.height && (record.width !== nextWidth || record.height !== nextHeight)) {
          matter.Body.scale(record.body, nextWidth / record.width, nextHeight / record.height);
        }

        record.width = nextWidth;
        record.height = nextHeight;
        record.wasAboveHoop = false;
        matter.Body.setPosition(record.body, {
          x: clamp(
            oldSize.width ? (record.body.position.x / oldSize.width) * rect.width : record.body.position.x,
            nextWidth / 2 + STAGE_INSET,
            rect.width - nextWidth / 2 - STAGE_INSET
          ),
          y: clamp(
            oldSize.height ? (record.body.position.y / oldSize.height) * rect.height : record.body.position.y,
            stageCeilingY + nextHeight / 2,
            rect.height - nextHeight / 2 - STAGE_INSET
          ),
        });
        record.previousY = record.body.position.y;
      });

      renderBodies();
      syncLoop();
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeSimulation, 120);
    };

    const pointerInStage = (event) => {
      const rect = stage.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const handlePointerDown = (event) => {
      if (!initialized || !engine || !matter || activeConstraint) {
        return;
      }

      const item = event.target instanceof Element ? event.target.closest("[data-physics-tag]") : null;
      const index = Number(item?.getAttribute("data-physics-index"));
      const record = Number.isInteger(index) ? records[index] : null;

      if (!record) {
        return;
      }

      const point = pointerInStage(event);
      const offsetX = point.x - record.body.position.x;
      const offsetY = point.y - record.body.position.y;
      const cosine = Math.cos(-record.body.angle);
      const sine = Math.sin(-record.body.angle);

      activeConstraint = matter.Constraint.create({
        pointA: point,
        bodyB: record.body,
        pointB: {
          x: offsetX * cosine - offsetY * sine,
          y: offsetX * sine + offsetY * cosine,
        },
        stiffness: 0.2,
        damping: 0.11,
        length: 0,
        render: { visible: false },
      });
      activePointerId = event.pointerId;
      activeRecord = record;
      pointerHistory = [{ ...point, time: performance.now() }];
      record.scoreArmed = true;
      record.node.style.zIndex = "2";
      stage.dataset.dragging = "true";
      stage.setPointerCapture(event.pointerId);
      matter.Composite.add(engine.world, activeConstraint);
      event.preventDefault();
    };

    const handlePointerMove = (event) => {
      if (!initialized || !matter) {
        return;
      }

      const point = pointerInStage(event);

      if (activeConstraint && event.pointerId === activePointerId) {
        activeConstraint.pointA = point;
        pointerHistory.push({ ...point, time: performance.now() });
        pointerHistory = pointerHistory.slice(-6);
        event.preventDefault();
        return;
      }

      if (!finePointer.matches || event.pointerType === "touch") {
        return;
      }

      const influenceRadius = 170;
      records.forEach(({ body }) => {
        const deltaX = body.position.x - point.x;
        const deltaY = body.position.y - point.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 8 && distance < influenceRadius) {
          const strength = (1 - distance / influenceRadius) * body.mass * 0.0000028;
          matter.Body.applyForce(body, body.position, {
            x: (deltaX / distance) * strength,
            y: (deltaY / distance) * strength,
          });
        }
      });
    };

    const handleReducedMotionChange = () => {
      if (reducedMotion.matches) {
        resetSimulation();
      } else if (isInView) {
        initialize();
      }
    };

    const handleVisibilityChange = () => syncLoop();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting && entry.intersectionRatio >= 0.1;

        if (isInView) {
          initialize();
        }

        syncLoop();
      },
      { threshold: [0, 0.1, 0.2] }
    );

    intersectionObserver.observe(stage);
    stage.addEventListener("pointerdown", handlePointerDown);
    stage.addEventListener("pointermove", handlePointerMove, { passive: false });
    stage.addEventListener("pointerup", releaseDrag);
    stage.addEventListener("pointercancel", releaseDrag);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleReducedMotionChange);
    window.addEventListener("scroll", handleResize, { passive: true });

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(stage);
      resizeObserver.observe(game);
      resizeObserver.observe(heading);
    } else {
      window.addEventListener("resize", handleResize, { passive: true });
    }

    return () => {
      destroyed = true;
      intersectionObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
      window.clearTimeout(resizeTimer);
      stage.removeEventListener("pointerdown", handlePointerDown);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerup", releaseDrag);
      stage.removeEventListener("pointercancel", releaseDrag);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
      resetSimulation();
    };
  }, [registerGoal]);

  return (
    <section className={`social-growth-game ${styles.game}`} aria-labelledby="social-growth-game-title" ref={gameRef}>
      <div className={styles.titleZone}>
        <h2
          className={styles.scoreHeading}
          id="social-growth-game-title"
          aria-label={SCORE_HEADING}
          ref={headingRef}
        >
          {SCORE_WORDS.map(({ startIndex, word }) => (
            <span className={styles.scoreWord} key={word}>
              {[...word].map((character, index) => {
                const characterIndex = startIndex + index;

                return (
                  <span
                    aria-hidden="true"
                    className={`${styles.scoreCharacter}${characterIndex >= SCORE_ACCENT_START ? ` ${styles.scoreAccent}` : ""}`}
                    key={`${character}-${characterIndex}`}
                    style={{ "--score-character-index": characterIndex }}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>
        <div className={styles.gameMeta}>
          <p>Probeer het zelf!</p>
          <div
            aria-atomic="true"
            aria-label={`Score: ${score} van ${WIN_SCORE}`}
            aria-live="polite"
            className={styles.scoreCounter}
            data-testid="service-score-counter"
            key={`score-${score}`}
          >
            <strong aria-hidden="true">{score}</strong>
            <span aria-hidden="true">/{WIN_SCORE}</span>
          </div>
        </div>
      </div>
      <div
        className={styles.stage}
        data-testid="service-physics-stage"
        aria-label="Diensten"
        ref={stageRef}
      >
        <div className={styles.hoop} aria-hidden="true">
          <span className={styles.goalCallout}>GOAAAL!</span>
          <span className={styles.backboard} />
          <span className={styles.rim} />
          <svg className={styles.net} viewBox="0 0 180 104" focusable="false">
            <path d="M8 4 28 96M49 4 58 100M90 4v98M131 4l-9 96M172 4l-20 92M18 36h144M25 68h130" />
          </svg>
          <span className={`${styles.actionLine} ${styles.actionLineOne}`} />
          <span className={`${styles.actionLine} ${styles.actionLineTwo}`} />
          <span className={`${styles.actionLine} ${styles.actionLineThree}`} />
        </div>
        <span className="aa-visually-hidden" aria-live="polite" ref={scoreStatusRef} />
        <ul className={styles.list}>
          {SERVICES.map(([label, tone], index) => (
            <li
              className={`${styles.tag} ${styles[tone]}`}
              data-physics-index={index}
              data-physics-tag
              key={label}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
      {isWinModalMounted && typeof document !== "undefined"
        ? createPortal(
            <WinModal
              closeButtonRef={closeButtonRef}
              onClose={closeWinModal}
              phase={modalPhase}
            />,
            document.body
          )
        : null}
    </section>
  );
}
