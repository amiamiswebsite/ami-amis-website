import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";
import HomeCtaLink from "./ui/HomeCtaLink";

const welcomeStickerWords = [
  { text: "DURVEN", start: 0, mobileWidth: "min(70vw, 16.8rem)", svgWidth: 500 },
  { text: "SPRINGEN", start: 6, mobileWidth: "min(83.5vw, 20.2rem)", svgWidth: 610 },
];

export default function Hero({
  variant = "default",
  proposal = "single",
  id,
  scrollTargetId = "intro",
  semanticHeading = true,
}) {
  const isHomeTwo = variant === "home2";
  const heroRef = useRef(null);
  const [reduceHeroMotion, setReduceHeroMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncQueries = () => {
      setReduceHeroMotion(motionQuery.matches);
    };

    syncQueries();
    motionQuery.addEventListener("change", syncQueries);

    return () => {
      motionQuery.removeEventListener("change", syncQueries);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hero || reduceMotion) {
      return undefined;
    }

    let scrollFrame = 0;
    let pointerFrame = 0;
    const pointer = {
      active: false,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const smoothStep = (value) => {
      const t = clamp(value, 0, 1);
      return t * t * (3 - 2 * t);
    };
    const phase = (value, start, end) => smoothStep((value - start) / (end - start));

    const getMaxFall = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        return 52;
      }

      if (width <= 1000) {
        return 72;
      }

      return 96;
    };
    const getPointerStrength = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        return { x: 24, y: 18, roll: 1.4, lerp: pointer.active ? 0.16 : 0.08 };
      }

      if (width <= 1000) {
        return { x: 54, y: 38, roll: 2.2, lerp: pointer.active ? 0.17 : 0.09 };
      }

      return { x: 92, y: 64, roll: 3.6, lerp: pointer.active ? 0.18 : 0.1 };
    };
    const getWelcomePointerStrength = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        return { x: 10, y: 7, roll: 0.35 };
      }

      if (width <= 767) {
        return { x: 15, y: 10, roll: 0.55 };
      }

      if (width <= 900) {
        return { x: 22, y: 14, roll: 0.9 };
      }

      if (width <= 1000) {
        return { x: 30, y: 18, roll: 1.1 };
      }

      if (width <= 1279) {
        return { x: 38, y: 22, roll: 1.35 };
      }

      if (width <= 1680) {
        return { x: 42, y: 24, roll: 1.45 };
      }

      return { x: 50, y: 28, roll: 1.6 };
    };

    const updateScroll = () => {
      scrollFrame = 0;
      const rect = hero.getBoundingClientRect();
      const fallWindow = Math.max(1, rect.height * 0.72);
      const rawProgress = Math.max(0, Math.min(1, -rect.top / fallWindow));
      const progress = 1 - Math.pow(1 - rawProgress, 3);
      const mobile = window.innerWidth <= 768;

      if (mobile) {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
        const mobileWindow = Math.max(1, viewportHeight * 0.78);
        const mobileRawProgress = Math.max(0, Math.min(1, -rect.top / mobileWindow));
        const mobileProgress = smoothStep(mobileRawProgress);
        const bridgeProgress = phase(mobileRawProgress, 0.22, 0.88);
        const skyY = 13 - bridgeProgress * 13;
        const sceneY = bridgeProgress * 5;

        hero.style.setProperty("--hero-mobile-progress", mobileProgress.toFixed(4));
        hero.style.setProperty("--hero-mobile-scene-y", `${sceneY.toFixed(2)}svh`);
        hero.style.setProperty("--hero-mobile-sky-y", `${skyY.toFixed(2)}svh`);
        hero.style.setProperty("--hero-mobile-sky-opacity", "1");
        hero.style.setProperty("--hero-mobile-sky-scale", `${(0.96 + bridgeProgress * 0.035).toFixed(4)}`);
        hero.style.setProperty("--hero-mobile-sky-rotate", `${(-1.8 + bridgeProgress * 1.2).toFixed(2)}deg`);
        hero.style.setProperty("--hero-mobile-cloud-y", `${(-6 * mobileProgress + sceneY * 0.16).toFixed(2)}svh`);
        hero.style.setProperty("--hero-mobile-cloud-opacity", `${(0.28 - bridgeProgress * 0.1).toFixed(4)}`);
      } else {
        hero.style.setProperty("--hero-mobile-progress", "1");
        hero.style.setProperty("--hero-mobile-scene-y", "0svh");
        hero.style.setProperty("--hero-mobile-sky-y", "0svh");
        hero.style.setProperty("--hero-mobile-sky-opacity", "1");
        hero.style.setProperty("--hero-mobile-sky-scale", "1");
        hero.style.setProperty("--hero-mobile-sky-rotate", "0deg");
        hero.style.setProperty("--hero-mobile-cloud-y", "0px");
        hero.style.setProperty("--hero-mobile-cloud-opacity", "0.52");
      }

      hero.style.setProperty("--hero-fall", `${progress * getMaxFall()}px`);
      hero.style.setProperty("--hero-roll", `${-1 + progress * (mobile ? 2.2 : 2.8)}deg`);
      hero.style.setProperty("--hero-scale", `${1 + progress * (mobile ? 0.035 : 0.025)}`);
      hero.style.setProperty("--hero-glow-y", `${progress * (mobile ? 7 : 10)}px`);
      hero.style.setProperty("--hero-glow-blur", `${progress * (mobile ? 7 : 10)}px`);
    };

    const updatePointer = () => {
      const strength = getPointerStrength();
      const idleDeltaX = pointer.targetX - pointer.currentX;
      const idleDeltaY = pointer.targetY - pointer.currentY;

      pointer.currentX += idleDeltaX * strength.lerp;
      pointer.currentY += idleDeltaY * strength.lerp;

      const atTarget =
        Math.abs(pointer.targetX - pointer.currentX) < 0.002 &&
        Math.abs(pointer.targetY - pointer.currentY) < 0.002;

      if (atTarget) {
        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;

        if (!pointer.active && Math.abs(pointer.targetX) < 0.002 && Math.abs(pointer.targetY) < 0.002) {
          pointer.currentX = 0;
          pointer.currentY = 0;
          pointer.targetX = 0;
          pointer.targetY = 0;
        }

        pointerFrame = 0;
      }

      hero.style.setProperty("--hero-pointer-x", `${pointer.currentX * strength.x}px`);
      hero.style.setProperty("--hero-pointer-y", `${pointer.currentY * strength.y}px`);
      hero.style.setProperty("--hero-pointer-roll", `${pointer.currentX * strength.roll}deg`);
      const welcomeStrength = getWelcomePointerStrength();
      hero.style.setProperty("--welcome-person-pointer-x", `${pointer.currentX * welcomeStrength.x}px`);
      hero.style.setProperty("--welcome-person-pointer-y", `${pointer.currentY * welcomeStrength.y}px`);
      hero.style.setProperty("--welcome-person-pointer-roll", `${pointer.currentX * welcomeStrength.roll}deg`);
      hero.style.setProperty("--hero-glow-x", `${pointer.currentX * strength.x * -0.32}px`);
      hero.style.setProperty("--mouse-x", pointer.currentX.toFixed(4));
      hero.style.setProperty("--mouse-y", pointer.currentY.toFixed(4));
      hero.style.setProperty("--parallax-x", `${pointer.currentX * strength.x}px`);
      hero.style.setProperty("--parallax-y", `${pointer.currentY * strength.y}px`);
      hero.style.setProperty("--hero-type-front-x", `${pointer.currentX * strength.x * 0.1}px`);
      hero.style.setProperty("--hero-type-front-y", `${pointer.currentY * strength.y * 0.085}px`);
      hero.style.setProperty("--hero-type-depth-x", `${pointer.currentX * strength.x * 0.22}px`);
      hero.style.setProperty("--hero-type-depth-y", `${pointer.currentY * strength.y * 0.18}px`);
      hero.style.setProperty("--hero-type-script-x", `${pointer.currentX * strength.x * 0.16}px`);
      hero.style.setProperty("--hero-type-script-y", `${pointer.currentY * strength.y * 0.12}px`);
      hero.style.setProperty("--hero-type-rot-x", `${pointer.currentY * -1.8}deg`);
      hero.style.setProperty("--hero-type-rot-y", `${pointer.currentX * 2.2}deg`);
      hero.style.setProperty("--hero-cloud-x", `${pointer.currentX * strength.x * -0.42}px`);
      hero.style.setProperty("--hero-cloud-y", `${pointer.currentY * strength.y * -0.3}px`);
      hero.style.setProperty("--hero-cloud-roll", `${pointer.currentX * -1.8}deg`);

      if (!atTarget) {
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
    };

    const scheduleScroll = () => {
      if (!scrollFrame) {
        scrollFrame = window.requestAnimationFrame(updateScroll);
      }
    };

    const schedulePointer = () => {
      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
    };

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect();

      hero.classList.add("is-cloud-burst");
      pointer.active = true;
      pointer.targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      pointer.targetY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
      schedulePointer();
    };

    const resetPointer = (event) => {
      if (event?.pointerType === "mouse" && event.type !== "pointerleave") {
        return;
      }

      pointer.active = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
      hero.classList.remove("is-cloud-burst");
      schedulePointer();
    };

    updateScroll();
    updatePointer();
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll);
    window.addEventListener("pointerup", resetPointer, { passive: true });
    window.addEventListener("pointercancel", resetPointer, { passive: true });
    hero.addEventListener("pointerdown", handlePointerMove, { passive: true });
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", resetPointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
      window.removeEventListener("pointerup", resetPointer);
      window.removeEventListener("pointercancel", resetPointer);
      hero.removeEventListener("pointerdown", handlePointerMove);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointer);
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
      if (pointerFrame) {
        window.cancelAnimationFrame(pointerFrame);
      }
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero || hero.classList.contains("hero--home-two")) {
      return undefined;
    }

    const handleInitialWheel = (event) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.deltaY <= 0 ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        window.scrollY > 1
      ) {
        return;
      }

      if (event.target instanceof Element && !hero.contains(event.target)) {
        return;
      }

      const initialScrollY = window.scrollY;
      const deltaY = event.deltaY;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (window.scrollY <= initialScrollY + 1) {
            window.scrollBy({ top: deltaY, left: 0, behavior: "auto" });
          }
        });
      });
    };

    window.addEventListener("wheel", handleInitialWheel, { capture: true, passive: true });

    return () => {
      window.removeEventListener("wheel", handleInitialWheel, { capture: true });
    };
  }, []);

  const scrollToIntro = () => {
    const target = document.getElementById(scrollTargetId);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    target?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const proposalClass = !isHomeTwo && proposal !== "single" ? `hero--proposal-${proposal}` : "";

  return (
    <>
      <section
        className={`hero ${isHomeTwo ? "hero--home-two" : ""} ${proposalClass}`}
        aria-label="Ami Amis hero"
        id={id}
        ref={heroRef}
      >
        <div className="hero__clouds" aria-hidden="true">
          <img
            src={assetPath("/assets/hero-clouds.webp")}
            alt=""
            width="1920"
            height="710"
            fetchPriority="high"
          />
        </div>
        <div className="hero__inner">
          <div className="hero__logo" aria-label="AMI AMIS" role="img" />
          {!isHomeTwo ? (
            <div className="hero__layout">
              <div className="hero__copy">
                <p className="hero__agency-label hero__agency-label--paper">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="hero__agency-label-paper"
                    src={assetPath("/assets/hero-paper-label.webp")}
                    width="2140"
                    height="624"
                  />
                  <span>Dé video-first marketing agency in Antwerpen</span>
                </p>

                {semanticHeading ? (
                  <h1 className="sr-only">Voor merken die durven springen</h1>
                ) : null}

                <p className="welcome-hero__title-fragment welcome-hero__title-fragment--top" aria-hidden="true">
                  <span>VOOR</span>
                  <span className="welcome-hero__merken-word">
                    <span className="welcome-hero__merken-riso" aria-hidden="true" />
                    <span className="welcome-hero__merken-text">MERKEN</span>
                  </span>
                  <span>DIE</span>
                </p>

                <div className="welcome-hero__media-stage" aria-hidden="true">
                  <div className="welcome-hero__video-window">
                    {reduceHeroMotion ? (
                      <img
                        className="welcome-hero__video-poster"
                        src={assetPath("/assets/welcome-hero-clouds-tablet-poster.jpg")}
                        alt=""
                        width="1440"
                        height="810"
                      />
                    ) : (
                      <video
                        className="welcome-hero__video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={assetPath("/assets/welcome-hero-clouds-tablet-poster.jpg")}
                        tabIndex={-1}
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate noremoteplayback"
                      >
                        <source src={assetPath("/assets/welcome-hero-clouds-tablet.webm")} type="video/webm" />
                        <source src={assetPath("/assets/welcome-hero-clouds-tablet.mp4")} type="video/mp4" />
                      </video>
                    )}
                  </div>
                  <div className="welcome-hero__person-anchor">
                    <div className="welcome-hero__person-motion">
                      <img
                        className="welcome-hero__person"
                        src={assetPath("/assets/brentskydive.webp")}
                        alt=""
                        width="1308"
                        height="760"
                      />
                    </div>
                  </div>
                </div>

                <div className="welcome-hero__message-stack">
                  <p className="welcome-hero__title-fragment welcome-hero__title-fragment--bottom" aria-hidden="true">
                    {welcomeStickerWords.map(({ text, start, mobileWidth, svgWidth }) => (
                      <span
                        className={`welcome-hero__sticker-word${text === "DURVEN" ? " welcome-hero__sticker-word--wave" : ""}`}
                        data-text={text}
                        key={text}
                        style={{ "--welcome-sticker-mobile-width": mobileWidth }}
                      >
                        <svg
                          className="welcome-hero__sticker-svg"
                          viewBox={`0 0 ${svgWidth} 150`}
                          aria-hidden="true"
                          focusable="false"
                          style={{ "--welcome-wave-delay": `${620 + start * 34}ms` }}
                          >
                          <text
                            className="welcome-hero__sticker-svg-text"
                            x={svgWidth / 2}
                            y="119"
                            textAnchor="middle"
                            stroke="none"
                            strokeWidth="0"
                            fill="#fffae5"
                          >
                            {text}
                          </text>
                        </svg>
                        <span className="welcome-hero__sticker-letters" aria-hidden="true">
                          {[...text].map((letter, index) => (
                            <span
                              className="welcome-hero__sticker-char"
                              key={`${text}-${letter}-${index}`}
                              style={{ "--welcome-wave-delay": `${620 + (start + index) * 34}ms` }}
                            >
                              {letter}
                            </span>
                          ))}
                        </span>
                      </span>
                    ))}
                  </p>

                  <div className="welcome-hero__conversion-stack">
                    <p className="welcome-hero__descriptor">
                      <span className="welcome-hero__descriptor-riso" aria-hidden="true" />
                      <span className="welcome-hero__descriptor-text">
                        Dé video-first marketing agency in Antwerpen
                      </span>
                    </p>

                    <div className="hero__actions" aria-label="Hero acties">
                      <HomeCtaLink className="hero__cta hero__cta--primary" href={assetPath("/contact/")}>
                        Eens afspreken
                      </HomeCtaLink>
                      <HomeCtaLink className="hero__cta hero__cta--secondary" href={assetPath("/work/")}>
                        Bekijk ons werk
                      </HomeCtaLink>
                    </div>
                  </div>
                </div>
                <button
                  className="welcome-hero__scroll-cue"
                  type="button"
                  onClick={scrollToIntro}
                  aria-label="Scroll naar de volgende sectie"
                >
                  <span className="hero__scroll-cue-animation" aria-hidden="true" />
                </button>
              </div>

              <div className="hero__visual" aria-hidden="true">
                <div className="hero__skydiver">
                  <div className="hero__skydiver-drop">
                    <img src={assetPath("/assets/brentskydive.webp")} alt="" width="1308" height="760" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {semanticHeading ? (
                <h1 className="hero__title" aria-label="Voor merken die durven springen">
                  <span className="hero__line hero__line--top">
                    <span className="hero__word" data-text="Voor">
                      Voor
                    </span>{" "}
                    <span className="hero__word hero__word--merken" data-text="Merken">
                      Merken
                    </span>
                  </span>
                  <span className="hero__line hero__line--script" data-text="die">
                    die
                  </span>{" "}
                  <span className="hero__line hero__line--bottom" data-text="Durven springen">
                    <span>Durven</span>
                    <span>Springen</span>
                  </span>
                  <span className="hero__mobile-lockup" aria-hidden="true">
                    <span className="hero__mobile-line hero__mobile-line--top">VOOR MERKEN</span>
                    <span className="hero__mobile-line hero__mobile-line--middle">
                      <span>DIE</span>
                      <em>durven</em>
                    </span>
                    <span className="hero__mobile-line hero__mobile-line--bottom">SPRINGEN</span>
                  </span>
                </h1>
              ) : (
                <div className="hero__title" aria-hidden="true">
                  <span className="hero__line hero__line--top">
                    <span className="hero__word" data-text="Voor">
                      Voor
                    </span>{" "}
                    <span className="hero__word hero__word--merken" data-text="Merken">
                      Merken
                    </span>
                  </span>
                  <span className="hero__line hero__line--script" data-text="die">
                    die
                  </span>{" "}
                  <span className="hero__line hero__line--bottom" data-text="Durven springen">
                    <span>Durven</span>
                    <span>Springen</span>
                  </span>
                  <span className="hero__mobile-lockup" aria-hidden="true">
                    <span className="hero__mobile-line hero__mobile-line--top">VOOR MERKEN</span>
                    <span className="hero__mobile-line hero__mobile-line--middle">
                      <span>DIE</span>
                      <em>durven</em>
                    </span>
                    <span className="hero__mobile-line hero__mobile-line--bottom">SPRINGEN</span>
                  </span>
                </div>
              )}
              <p className="hero__agency-label">Dé video-first marketing agency in Antwerpen</p>
              <div className="hero__skydiver" aria-hidden="true">
                <div className="hero__skydiver-drop">
                  <img src={assetPath("/assets/brentskydive.webp")} alt="" width="1308" height="760" />
                </div>
              </div>
            </>
          )}
          <button className="hero__scroll-cue" type="button" onClick={scrollToIntro} aria-label="Scroll verder">
            <span className="hero__scroll-cue-animation" aria-hidden="true" />
          </button>
        </div>
      </section>
    </>
  );
}
