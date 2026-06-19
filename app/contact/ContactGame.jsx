"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const gameDuration = 20;
const catchZoneY = 76;

const mailHref = "mailto:brent@amiamis.be?subject=Hallo%20Brent";
const phoneHref = "tel:+32472657595";

const goodDrops = [
  {
    key: "briefing",
    label: "Nieuwe briefing!",
    feedback: "Nieuwe briefing!",
    asset: "phone-briefing.png",
  },
  {
    key: "shoot",
    label: "Shoot confirmed!",
    feedback: "Shoot confirmed!",
    asset: "phone-shoot-confirmed.png",
  },
  {
    key: "idea",
    label: "Nieuw idee!",
    feedback: "Nieuw idee!",
    asset: "phone-new-idea.png",
  },
  {
    key: "call",
    label: "Belletje binnen!",
    feedback: "Belletje binnen!",
    asset: "phone-call.png",
  },
  {
    key: "deadline",
    label: "Deadline? We fixen het.",
    feedback: "Deadline? We fixen het.",
    asset: "phone-deadline.png",
  },
  {
    key: "morgen",
    label: "Kan dit morgen online?",
    feedback: "Kan dit morgen online?",
    asset: "phone-kan-dit-morgen-online.png",
  },
];

const badDrops = [
  {
    key: "vague",
    label: "Vage briefing",
    feedback: "Ai. Vage briefing.",
    asset: "bad-vage-briefing.png",
  },
  {
    key: "stock",
    label: "Stockfoto zonder ziel",
    feedback: "Stockfoto zonder ziel.",
    asset: "bad-stockfoto.png",
  },
  {
    key: "chaos",
    label: "Chaos",
    feedback: "Te veel chaos.",
    asset: "bad-chaos.png",
  },
];

const brentAssets = {
  neutral: "brent-neutral.png",
  happy: "brent-happy.png",
  left: "brent-surprised.png",
  right: "brent-happy.png",
  stressed: "brent-stressed.png",
  win: "brent-win.png",
};

const comboMessages = {
  3: "Brent is wakker.",
  6: "Producer mode aan.",
  10: "Telefooncentrale.",
  15: "Amai.",
};

function gameAsset(filename) {
  return assetPath(`/assets/contact-game/${filename}`);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function getDifficulty(elapsed, isMobile) {
  if (elapsed < 5) {
    return {
      badChance: 0,
      speedMin: isMobile ? 15 : 17,
      speedMax: isMobile ? 21 : 24,
      spawnEvery: isMobile ? 1.25 : 1.05,
    };
  }

  if (elapsed < 12) {
    return {
      badChance: 0.18,
      speedMin: isMobile ? 20 : 23,
      speedMax: isMobile ? 28 : 32,
      spawnEvery: isMobile ? 1.02 : 0.82,
    };
  }

  return {
    badChance: 0.24,
    speedMin: isMobile ? 24 : 29,
    speedMax: isMobile ? 34 : 40,
    spawnEvery: isMobile ? 0.9 : 0.66,
  };
}

function createDrop(id, isMobile, elapsed = 0, forceCenter = false) {
  const difficulty = getDifficulty(elapsed, isMobile);
  const isGood = forceCenter || Math.random() > difficulty.badChance;
  const pool = isGood ? goodDrops : badDrops;
  const item = pool[Math.floor(Math.random() * pool.length)];

  return {
    ...item,
    id,
    type: isGood ? "good" : "bad",
    x: forceCenter ? randomBetween(45, 55) : randomBetween(isMobile ? 14 : 9, isMobile ? 86 : 91),
    y: -12,
    speed: randomBetween(difficulty.speedMin, difficulty.speedMax),
    rotation: randomBetween(-8, 8),
    scale: randomBetween(isGood ? 0.88 : 0.8, isGood ? 1.08 : 1),
  };
}

function AssetImage({ filename, alt, className, fallback }) {
  const [failed, setFailed] = useState(false);

  if (failed || !filename) {
    return <span className={`${className || ""} contact-game__asset-fallback`}>{fallback || alt}</span>;
  }

  return (
    <img
      alt={alt}
      className={className}
      draggable="false"
      loading="lazy"
      onError={() => setFailed(true)}
      src={gameAsset(filename)}
    />
  );
}

function ContactGameActions({ onDropIdea }) {
  return (
    <div className="contact-game__actions" aria-label="Contacteer Brent">
      <a className="button button--red" href={mailHref}>
        Mail Brent
      </a>
      <a className="button button--black" href={phoneHref}>
        Bel Brent
      </a>
      <button className="button contact-game__idea-button" type="button" onClick={onDropIdea}>
        Drop je idee
      </button>
    </div>
  );
}

function getEndCopy(score) {
  if (score < 6) {
    return {
      title: "Brent had net iets meer koffie nodig.",
      text: "Maar jouw oproep neemt hij sowieso op.",
    };
  }

  if (score < 14) {
    return {
      title: "Netjes. Brent is wakker.",
      text: "Tijd om jouw idee te droppen?",
    };
  }

  return {
    title: "Amai. Brent is on fire.",
    text: "Die van jou mag erbij.",
  };
}

export default function ContactGame({ onDropIdea = () => {} }) {
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [drops, setDrops] = useState([]);
  const [snaps, setSnaps] = useState([]);
  const [playerX, setPlayerX] = useState(50);
  const [brentMood, setBrentMood] = useState("neutral");
  const [feedback, setFeedback] = useState(null);
  const [combo, setCombo] = useState(0);
  const [comboFeedback, setComboFeedback] = useState(null);
  const [scorePulse, setScorePulse] = useState(false);
  const [zoneShake, setZoneShake] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const arenaRef = useRef(null);
  const frameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const spawnRef = useRef(0);
  const nextDropIdRef = useRef(1);
  const endAtRef = useRef(0);
  const dropsRef = useRef([]);
  const snapTimersRef = useRef([]);
  const playerXRef = useRef(50);
  const feedbackTimerRef = useRef(null);
  const comboTimerRef = useRef(null);
  const pulseTimerRef = useRef(null);
  const shakeTimerRef = useRef(null);
  const moodTimerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(feedbackTimerRef.current);
      window.clearTimeout(comboTimerRef.current);
      window.clearTimeout(pulseTimerRef.current);
      window.clearTimeout(shakeTimerRef.current);
      window.clearTimeout(moodTimerRef.current);
      snapTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const movePlayerTo = useCallback((clientX) => {
    const arena = arenaRef.current;

    if (!arena) {
      return;
    }

    const rect = arena.getBoundingClientRect();
    const nextX = clamp(((clientX - rect.left) / rect.width) * 100, 8, 92);
    playerXRef.current = nextX;
    setPlayerX(nextX);
  }, []);

  const nudgePlayer = useCallback((direction) => {
    const nextX = clamp(playerXRef.current + direction * 6, 8, 92);
    playerXRef.current = nextX;
    setPlayerX(nextX);
  }, []);

  const showFeedback = useCallback((drop) => {
    const direction = drop.x < playerXRef.current ? "left" : "right";
    const nextMood = drop.type === "good" ? direction : "stressed";
    const snapId = `${drop.id}-${Date.now()}`;

    setSnaps((currentSnaps) => [
      ...currentSnaps.slice(-5),
      {
        ...drop,
        id: snapId,
        catchX: playerXRef.current,
        catchY: catchZoneY,
      },
    ]);
    const snapTimer = window.setTimeout(() => {
      setSnaps((currentSnaps) => currentSnaps.filter((snap) => snap.id !== snapId));
    }, 220);
    snapTimersRef.current.push(snapTimer);

    setFeedback({ id: `${drop.id}-${Date.now()}`, type: drop.type, text: drop.feedback });
    setBrentMood(nextMood);
    setScorePulse(true);

    if (drop.type === "good") {
      setCombo((currentCombo) => {
        const nextCombo = currentCombo + 1;
        const comboMessage = comboMessages[nextCombo];

        if (comboMessage) {
          setComboFeedback(comboMessage);
          window.clearTimeout(comboTimerRef.current);
          comboTimerRef.current = window.setTimeout(() => setComboFeedback(null), 1050);
        }

        return nextCombo;
      });

      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(8);
      }
    } else {
      setCombo(0);
      setZoneShake(true);
      window.clearTimeout(shakeTimerRef.current);
      shakeTimerRef.current = window.setTimeout(() => setZoneShake(false), 260);
    }

    window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(() => setFeedback(null), 780);

    window.clearTimeout(pulseTimerRef.current);
    pulseTimerRef.current = window.setTimeout(() => setScorePulse(false), 260);

    window.clearTimeout(moodTimerRef.current);
    moodTimerRef.current = window.setTimeout(() => setBrentMood("neutral"), 420);
  }, []);

  const endGame = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current);
    dropsRef.current = [];
    setDrops([]);
    setSnaps([]);
    setTimeLeft(0);
    setBrentMood("win");
    setStatus("ended");
  }, []);

  const startGame = useCallback(() => {
    if (reducedMotion) {
      return;
    }

    window.cancelAnimationFrame(frameRef.current);
    window.clearTimeout(feedbackTimerRef.current);
    window.clearTimeout(comboTimerRef.current);
    window.clearTimeout(pulseTimerRef.current);
    window.clearTimeout(shakeTimerRef.current);
    window.clearTimeout(moodTimerRef.current);
    snapTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    snapTimersRef.current = [];

    playerXRef.current = 50;
    const isMobile = window.matchMedia("(max-width: 680px)").matches;
    const firstDrop = createDrop(1, isMobile, 0, true);
    dropsRef.current = [firstDrop];
    lastFrameRef.current = 0;
    spawnRef.current = 0;
    nextDropIdRef.current = 2;
    endAtRef.current = Date.now() + gameDuration * 1000;

    setPlayerX(50);
    setDrops([firstDrop]);
    setSnaps([]);
    setScore(0);
    setCombo(0);
    setComboFeedback(null);
    setScorePulse(false);
    setZoneShake(false);
    setTimeLeft(gameDuration);
    setFeedback(null);
    setBrentMood("neutral");
    setStatus("playing");
  }, [reducedMotion]);

  useEffect(() => {
    if (status !== "playing") {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        nudgePlayer(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nudgePlayer(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nudgePlayer, status]);

  useEffect(() => {
    if (status !== "playing" || reducedMotion) {
      return undefined;
    }

    const tick = (time) => {
      const lastFrame = lastFrameRef.current || time;
      const delta = Math.min((time - lastFrame) / 1000, 0.065);
      const isMobile = window.matchMedia("(max-width: 680px)").matches;
      const remaining = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000));
      const elapsed = gameDuration - remaining;
      const difficulty = getDifficulty(elapsed, isMobile);
      const catchDistance = isMobile ? 19 : 15.5;
      const catchHeight = isMobile ? 7.5 : 6.2;

      lastFrameRef.current = time;
      spawnRef.current += delta;
      setTimeLeft(remaining);

      if (remaining <= 0) {
        endGame();
        return;
      }

      let nextDrops = dropsRef.current.map((drop) => ({
        ...drop,
        y: drop.y + drop.speed * delta,
      }));

      while (spawnRef.current >= difficulty.spawnEvery) {
        spawnRef.current -= difficulty.spawnEvery;
        nextDrops.push(createDrop(nextDropIdRef.current, isMobile, elapsed));
        nextDropIdRef.current += 1;
      }

      const caught = [];
      nextDrops = nextDrops.filter((drop) => {
        const inCatchZone = Math.abs(drop.y - catchZoneY) < catchHeight;
        const closeEnough = Math.abs(drop.x - playerXRef.current) < catchDistance;

        if (inCatchZone && closeEnough) {
          caught.push(drop);
          return false;
        }

        return drop.y < 114;
      });

      if (caught.length) {
        caught.forEach((drop) => {
          setScore((currentScore) => Math.max(0, currentScore + (drop.type === "good" ? 1 : -1)));
          showFeedback(drop);
        });
      }

      dropsRef.current = nextDrops;
      setDrops(nextDrops);
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [endGame, reducedMotion, showFeedback, status]);

  const endCopy = getEndCopy(score);
  const brentAsset = brentAssets[brentMood] || brentAssets.neutral;

  if (reducedMotion) {
    return (
      <section className="contact-game-section contact-game-section--static" aria-labelledby="contact-game-title">
        <div className="contact-game-section__inner">
          <div className="contact-game-section__copy">
            <h2 id="contact-game-title">Hallo, met Brent?</h2>
            <p>Vang de oproepen. Of neem gewoon meteen contact op.</p>
          </div>
          <div className="contact-game-static">
            <AssetImage filename="brent-neutral.png" alt="Brent neemt op" fallback="Brent" />
            <div>
              <p>Brent neemt op.</p>
              <strong>No worries.</strong>
            </div>
          </div>
          <ContactGameActions onDropIdea={onDropIdea} />
        </div>
      </section>
    );
  }

  return (
    <section className="contact-game-section" aria-labelledby="contact-game-title">
        <div className="contact-game-section__inner">
          <div className="contact-game-section__copy">
            <h2 id="contact-game-title">Hallo, met Brent?</h2>
            <p>Vang de oproepen. Of neem gewoon meteen contact op.</p>
          </div>

        <div className={`contact-game is-${status}`} aria-label="Mini-game: Hallo, met Brent?">
          <div className="contact-game__topbar" aria-live="polite">
            <span className={scorePulse ? "is-pulsing" : ""}>
              Oproepen opgenomen: <strong>{score}</strong>
            </span>
            <span>
              Tijd: <strong>{timeLeft}</strong>
            </span>
            <span className={`contact-game__combo ${combo > 1 ? "is-active" : ""}`}>
              Combo: <strong>{combo}</strong>
            </span>
          </div>

          <div
            className={`contact-game__arena is-${status}`}
            onPointerDown={(event) => {
              if (status !== "playing") {
                return;
              }
              event.currentTarget.setPointerCapture?.(event.pointerId);
              movePlayerTo(event.clientX);
            }}
            onPointerMove={(event) => {
              if (status === "playing") {
                movePlayerTo(event.clientX);
              }
            }}
            ref={arenaRef}
            role="application"
            tabIndex={status === "playing" ? 0 : -1}
            aria-label="Beweeg Brent met de muis, je vinger of de pijltjestoetsen."
          >
            <img aria-hidden="true" className="contact-game__burst contact-game__burst--orange" src={gameAsset("burst-orange.png")} alt="" />
            <img aria-hidden="true" className="contact-game__burst contact-game__burst--blue" src={gameAsset("burst-blue.png")} alt="" />

            {status === "idle" ? (
              <div className="contact-game__overlay contact-game__start">
                <div className="contact-game__demo" aria-hidden="true">
                  <div className="contact-game__demo-phone">
                    <AssetImage filename="phone-call.png" alt="" fallback="GSM" />
                  </div>
                  <div className="contact-game__demo-catcher">
                    <span>VANG HIER</span>
                    <AssetImage filename="brent-neutral.png" alt="" fallback="Brent" />
                  </div>
                  <strong>OPGENOMEN! +1</strong>
                </div>
                <h3>Brent neemt op.</h3>
                <p>Beweeg Brent. Vang de gsm&apos;s in de oranje zone.</p>
                <button className="button button--red" type="button" onClick={startGame}>
                  Start spel
                </button>
              </div>
            ) : null}

            {drops.map((drop) => (
              <div
                aria-label={drop.label}
                className={`contact-game__drop contact-game__drop--${drop.type}`}
                key={drop.id}
                style={{
                  "--drop-rotate": `${drop.rotation}deg`,
                  "--drop-scale": drop.scale,
                  "--drop-x": `${drop.x}%`,
                  "--drop-y": `${drop.y}%`,
                }}
              >
                <AssetImage filename={drop.asset} alt="" fallback={drop.label} />
              </div>
            ))}

            {snaps.map((snap) => (
              <div
                aria-hidden="true"
                className={`contact-game__snap contact-game__snap--${snap.type}`}
                key={snap.id}
                style={{
                  "--snap-from-x": `${snap.x}%`,
                  "--snap-from-y": `${snap.y}%`,
                  "--snap-to-x": `${snap.catchX}%`,
                  "--snap-to-y": `${snap.catchY}%`,
                }}
              >
                <AssetImage filename={snap.asset} alt="" fallback={snap.label} />
              </div>
            ))}

            {feedback ? (
              <div className={`contact-game__feedback contact-game__feedback--${feedback.type}`} key={feedback.id} role="status">
                {feedback.type === "good" ? "OPGENOMEN! +1" : feedback.text}
              </div>
            ) : null}

            {comboFeedback ? (
              <div className="contact-game__combo-pop" role="status">
                {comboFeedback}
              </div>
            ) : null}

            {status === "ended" ? (
              <div className="contact-game__overlay contact-game__end">
                <AssetImage filename="sticker-opgenomen.png" alt="" fallback="Opgenomen!" />
                <strong className="contact-game__final-score">{score}</strong>
                <p>Brent heeft {score} oproepen opgenomen.</p>
                <h3>{endCopy.title}</h3>
                <span>{endCopy.text}</span>
                <ContactGameActions onDropIdea={onDropIdea} />
                <button className="contact-game__replay" type="button" onClick={startGame}>
                  Speel opnieuw
                </button>
              </div>
            ) : null}

            {status === "playing" ? (
              <>
                <div
                  className={`contact-game__catch-zone ${zoneShake ? "is-shaking" : ""} ${
                    status === "playing" && timeLeft > gameDuration - 4 ? "is-labeled" : ""
                  }`}
                  style={{ "--player-x": `${playerX}%`, "--catch-y": `${catchZoneY}%` }}
                  aria-hidden="true"
                >
                  <span>VANG HIER</span>
                </div>
                <div
                  className={`contact-game__player contact-game__player--${brentMood}`}
                  style={{ "--player-x": `${playerX}%` }}
                  aria-hidden="true"
                >
                  <div className="contact-game__player-crop">
                    <AssetImage filename={brentAsset} alt="" fallback="Brent" />
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {status !== "ended" ? <ContactGameActions onDropIdea={onDropIdea} /> : null}
        </div>
      </div>
    </section>
  );
}
