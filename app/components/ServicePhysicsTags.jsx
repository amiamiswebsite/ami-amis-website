import { useEffect, useRef } from "react";
import styles from "../styles/components/service-physics-tags.module.css";

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

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

function seededRandom(seed) {
  let value = seed % 2147483647;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export default function ServicePhysicsTags() {
  const stageRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    const nodes = itemRefs.current.filter(Boolean);

    if (!stage || nodes.length !== SERVICES.length) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const random = seededRandom(2211);
    let matter = null;
    let engine = null;
    let records = [];
    let walls = [];
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

    const createWalls = (width, height) => {
      const thickness = 120;
      const wallOptions = {
        isStatic: true,
        restitution: 0.15,
        friction: 0.4,
        label: "service-stage-wall",
      };

      return [
        matter.Bodies.rectangle(
          width / 2,
          STAGE_INSET - thickness / 2,
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
          height / 2,
          thickness,
          height + thickness * 2,
          wallOptions
        ),
        matter.Bodies.rectangle(
          width - STAGE_INSET + thickness / 2,
          height / 2,
          thickness,
          height + thickness * 2,
          wallOptions
        ),
      ];
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
      initialized = false;
      initializing = false;
      stageSize = { width: 0, height: 0 };
      delete stage.dataset.physicsReady;
      delete stage.dataset.dragging;

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
        const x = clamp(
          columnWidth * (column + 0.5) + (random() - 0.5) * columnWidth * 0.26,
          measurement.width / 2 + STAGE_INSET,
          rect.width - measurement.width / 2 - STAGE_INSET
        );
        const y = clamp(
          measurement.height / 2 + 10 + row * Math.max(15, measurement.height * 0.34) + random() * 12,
          measurement.height / 2 + STAGE_INSET,
          rect.height * 0.42
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
        return { body, node, ...measurement };
      });

      walls = createWalls(rect.width, rect.height);
      matter.Composite.add(engine.world, [...walls, ...records.map(({ body }) => body)]);
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

      walls.forEach((wall) => matter.Composite.remove(engine.world, wall));
      walls = createWalls(rect.width, rect.height);
      matter.Composite.add(engine.world, walls);

      records.forEach((record) => {
        const nextWidth = record.node.offsetWidth;
        const nextHeight = record.node.offsetHeight;

        if (record.width && record.height && (record.width !== nextWidth || record.height !== nextHeight)) {
          matter.Body.scale(record.body, nextWidth / record.width, nextHeight / record.height);
        }

        record.width = nextWidth;
        record.height = nextHeight;
        matter.Body.setPosition(record.body, {
          x: clamp(
            oldSize.width ? (record.body.position.x / oldSize.width) * rect.width : record.body.position.x,
            nextWidth / 2 + STAGE_INSET,
            rect.width - nextWidth / 2 - STAGE_INSET
          ),
          y: clamp(
            oldSize.height ? (record.body.position.y / oldSize.height) * rect.height : record.body.position.y,
            nextHeight / 2 + STAGE_INSET,
            rect.height - nextHeight / 2 - STAGE_INSET
          ),
        });
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

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(stage);
    } else {
      window.addEventListener("resize", handleResize, { passive: true });
    }

    return () => {
      destroyed = true;
      intersectionObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
      stage.removeEventListener("pointerdown", handlePointerDown);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerup", releaseDrag);
      stage.removeEventListener("pointercancel", releaseDrag);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
      resetSimulation();
    };
  }, []);

  return (
    <div
      className={styles.stage}
      data-testid="service-physics-stage"
      aria-label="Diensten"
      ref={stageRef}
    >
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
  );
}
