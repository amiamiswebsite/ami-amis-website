"use client";

import { useCallback, useEffect, useRef } from "react";
import { assetPath } from "../../src/lib/assetPath";

const tags = [
  ["Marketing", "red"],
  ["video", "yellow"],
  ["videografie", "blue"],
  ["montage", "orange"],
  ["copywriting", "sky"],
  ["campagnes", "cream"],
  ["social media content", "red"],
  ["grafisch design", "yellow"],
  ["webdesign", "blue"],
  ["fotografie", "orange"],
  ["animatie", "sky"],
  ["short form content", "cream"],
  ["audio design", "red"],
  ["grading", "blue"],
  ["productie", "orange"],
  ["VFX", "sky"],
  ["reclamespot", "cream"],
  ["screenwriting", "red"],
  ["….", "yellow"],
];

const tagRows = [
  tags.slice(0, 6),
  tags.slice(6, 12),
  tags.slice(12),
];

const homeTwoIntro = [
  "Je bedrijf doet zotte dingen… Maar weet de buitenwereld dat al?",
  "Wij zorgen ervoor dat je merk niet verloren loopt tussen kattenfilmpjes en saaie reclameblabla. Wij maken je verhaal scherper, sterker en een pak moeilijker te negeren. Want als er iets is waar wij niet tegen kunnen, dan is het slechte content!",
  "Als creatieve groeipartner denken we mee en zoeken we uit wat je merk nodig heeft voor meer visibiliteit.",
];

const problemCards = [
  {
    number: "1",
    title: "Te weinig werknemers?",
    body: "Na onze employer branding krijg je mogelijks keuzestress door al die eindbaas-sollicitanten!",
    icon: "profile",
  },
  {
    number: "2",
    title: "Blijft je merk onder de radar?",
    body: "We maken consistente social content die je zichtbaar én herkenbaar houdt.",
    icon: "eye",
  },
  {
    number: "3",
    title: "Is je product of dienst moeilijk uit te leggen?",
    body: "Wij maken je boodschap ZO duidelijk zodat zelfs Joske van café De Schele Teen er een powerpointpresentatie van kan geven.",
    icon: "mystery-box",
  },
];

const problemCardIcons = {
  eye: "/assets/problem-cards/eye.png",
  "mystery-box": "/assets/problem-cards/mystery-box.png",
  profile: "/assets/problem-cards/profile.png",
};

const homeTwoOutro = [
  "Zie ons als jouw creatieve compadre die luistert, meedenkt én jou volledig kan ontzorgen van al je marketingperikelen.",
  "Dus… Zullen we samen iets strafs van je merk maken?",
];

const homeTwoCaseVisuals = [
  {
    type: "video",
    src: "/assets/creative-growth-reel.mp4",
    poster: "/work/tarzan-en-jane-thumb.webp",
    alt: "Ami Amis showreel",
    width: 1080,
    height: 1080,
  },
  {
    src: "/work/sporthouse-group-thumb.webp",
    alt: "Sporthouse Group casebeeld",
    width: 2398,
    height: 1342,
  },
  {
    src: "/work/visit-antwerpen-thumb-portrait.jpg",
    alt: "Visit Antwerpen casebeeld",
    width: 1080,
    height: 1920,
  },
  {
    src: "/images/cases/humgy/humgy-instagram-feed.png",
    alt: "Humgy casebeeld",
    width: 950,
    height: 720,
  },
  {
    src: "/work/imore.webp",
    alt: "Imore casebeeld",
    width: 1000,
    height: 563,
  },
  {
    src: "/work/4allseasons.webp",
    alt: "4AllSeasons casebeeld",
    width: 1000,
    height: 667,
  },
  {
    src: "/images/cases/billy-bonkers/stad-gent-energiecentrale-campagnebeeld-01.jpg",
    alt: "Billy Bonkers casebeeld",
    width: 1273,
    height: 1800,
  },
];

const homeTwoCaseMotion = [
  [-14, -9],
  [18, 12],
  [-22, 15],
  [20, -18],
  [-16, -13],
  [10, 22],
  [13, -20],
];

export default function Intro({ variant = "default" }) {
  const isHomeTwo = variant === "home2";
  const ctaLabel = isHomeTwo ? "Samen jouw merk doen groeien?" : "eens afspreken?";
  const challengeStageRef = useRef(null);
  const explosionVideoRef = useRef(null);
  const introMediaMotionRef = useRef({
    active: false,
    currentX: 0,
    currentY: 0,
    frame: null,
    raf: 0,
    targetX: 0,
    targetY: 0,
  });
  const introCtaMotionRef = useRef({
    currentX: 0,
    currentY: 0,
    frame: null,
    raf: 0,
    targetX: 0,
    targetY: 0,
  });

  const updateIntroMediaMotion = useCallback(function updateIntroMediaMotionLoop() {
    const motion = introMediaMotionRef.current;
    motion.currentX += (motion.targetX - motion.currentX) * 0.16;
    motion.currentY += (motion.targetY - motion.currentY) * 0.16;

    const done =
      Math.abs(motion.targetX - motion.currentX) < 0.002 &&
      Math.abs(motion.targetY - motion.currentY) < 0.002;

    if (motion.frame) {
      const x = done ? motion.targetX : motion.currentX;
      const y = done ? motion.targetY : motion.currentY;

      motion.frame.style.setProperty("--intro-media-pointer-x", x.toFixed(4));
      motion.frame.style.setProperty("--intro-media-pointer-y", y.toFixed(4));
      motion.frame.style.setProperty("--intro-media-rotate-x", `${(y * -5.2).toFixed(3)}deg`);
      motion.frame.style.setProperty("--intro-media-rotate-y", `${(x * 7.2).toFixed(3)}deg`);
      motion.frame.style.setProperty("--intro-media-shift-x", `${(x * 5).toFixed(3)}px`);
      motion.frame.style.setProperty("--intro-media-shift-y", `${(y * 4).toFixed(3)}px`);

      homeTwoCaseMotion.forEach(([moveX, moveY], index) => {
        motion.frame.style.setProperty(`--intro-case-${index + 1}-x`, `${(x * moveX).toFixed(3)}px`);
        motion.frame.style.setProperty(`--intro-case-${index + 1}-y`, `${(y * moveY).toFixed(3)}px`);
      });
    }

    if (done) {
      motion.currentX = motion.targetX;
      motion.currentY = motion.targetY;
      motion.raf = 0;
      return;
    }

    motion.raf = requestAnimationFrame(updateIntroMediaMotionLoop);
  }, []);

  const startIntroMediaMotion = useCallback((frame) => {
    const motion = introMediaMotionRef.current;
    motion.frame = frame;

    if (!motion.raf) {
      motion.raf = requestAnimationFrame(updateIntroMediaMotion);
    }
  }, [updateIntroMediaMotion]);

  const handleIntroMediaPointerMove = useCallback((event) => {
    const frame = event.currentTarget;

    if (event.pointerType === "touch") {
      return;
    }

    const rect = frame.getBoundingClientRect();
    const pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const motion = introMediaMotionRef.current;
    motion.active = true;
    motion.targetX = Math.max(-1, Math.min(1, pointerX));
    motion.targetY = Math.max(-1, Math.min(1, pointerY));
    frame.classList.add("is-interacting");
    startIntroMediaMotion(frame);
  }, [startIntroMediaMotion]);

  const handleIntroMediaPointerLeave = useCallback((event) => {
    const frame = event.currentTarget;
    const motion = introMediaMotionRef.current;
    motion.active = false;
    motion.targetX = 0;
    motion.targetY = 0;
    frame.classList.remove("is-interacting");
    startIntroMediaMotion(frame);
  }, [startIntroMediaMotion]);

  const updateIntroCtaMotion = useCallback(function updateIntroCtaMotionLoop() {
    const motion = introCtaMotionRef.current;
    motion.currentX += (motion.targetX - motion.currentX) * 0.13;
    motion.currentY += (motion.targetY - motion.currentY) * 0.13;

    const done =
      Math.abs(motion.targetX - motion.currentX) < 0.002 &&
      Math.abs(motion.targetY - motion.currentY) < 0.002;

    if (motion.frame) {
      const x = done ? motion.targetX : motion.currentX;
      const y = done ? motion.targetY : motion.currentY;

      motion.frame.style.setProperty("--intro-cta-rotate-x", `${(y * -1.6).toFixed(3)}deg`);
      motion.frame.style.setProperty("--intro-cta-rotate-y", `${(x * 2.2).toFixed(3)}deg`);
      motion.frame.style.setProperty("--intro-cta-shift-x", `${(x * 3.5).toFixed(3)}px`);
      motion.frame.style.setProperty("--intro-cta-shift-y", `${(y * 2.5).toFixed(3)}px`);
      motion.frame.style.setProperty("--intro-cta-back-x", `${(x * -3).toFixed(3)}px`);
      motion.frame.style.setProperty("--intro-cta-back-y", `${(y * -2).toFixed(3)}px`);
      motion.frame.style.setProperty("--intro-cta-person-x", `${(x * 9).toFixed(3)}px`);
      motion.frame.style.setProperty("--intro-cta-person-y", `${(y * 6).toFixed(3)}px`);
      motion.frame.style.setProperty("--intro-cta-copy-x", `${(x * -5).toFixed(3)}px`);
      motion.frame.style.setProperty("--intro-cta-copy-y", `${(y * -3.5).toFixed(3)}px`);
    }

    if (done) {
      motion.currentX = motion.targetX;
      motion.currentY = motion.targetY;
      motion.raf = 0;
      return;
    }

    motion.raf = requestAnimationFrame(updateIntroCtaMotionLoop);
  }, []);

  const startIntroCtaMotion = useCallback((frame) => {
    const motion = introCtaMotionRef.current;
    motion.frame = frame;

    if (!motion.raf) {
      motion.raf = requestAnimationFrame(updateIntroCtaMotion);
    }
  }, [updateIntroCtaMotion]);

  const handleIntroCtaPointerMove = useCallback((event) => {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const frame = event.currentTarget;
    const rect = frame.getBoundingClientRect();
    const motion = introCtaMotionRef.current;
    motion.targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    motion.targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    frame.classList.add("is-interacting");
    startIntroCtaMotion(frame);
  }, [startIntroCtaMotion]);

  const handleIntroCtaPointerLeave = useCallback((event) => {
    const frame = event.currentTarget;
    const motion = introCtaMotionRef.current;
    motion.targetX = 0;
    motion.targetY = 0;
    frame.classList.remove("is-interacting");
    startIntroCtaMotion(frame);
  }, [startIntroCtaMotion]);

  useEffect(() => {
    const motion = introMediaMotionRef.current;

    return () => {
      if (motion.raf) {
        cancelAnimationFrame(motion.raf);
      }
    };
  }, []);

  useEffect(() => {
    const motion = introCtaMotionRef.current;

    return () => {
      if (motion.raf) {
        cancelAnimationFrame(motion.raf);
      }
    };
  }, []);

  useEffect(() => {
    if (!isHomeTwo) {
      return undefined;
    }

    const stage = challengeStageRef.current;

    if (!stage) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      stage.classList.add("is-visible");
      return undefined;
    }

    stage.classList.add("is-observed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stage.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10%", threshold: 0.16 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [isHomeTwo]);

  useEffect(() => {
    if (!isHomeTwo) {
      return undefined;
    }

    const video = explosionVideoRef.current;
    const stage = video?.closest(".intro__home-two-cta");

    if (!video || !stage) {
      return undefined;
    }

    video.muted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let hasPlayed = false;
    const playOnce = () => {
      if (hasPlayed) {
        return;
      }

      hasPlayed = true;
      video.currentTime = 0;
      void video.play().catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      playOnce();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          playOnce();
          observer.disconnect();
        }
      },
      { threshold: [0.35] },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [isHomeTwo]);

  if (isHomeTwo) {
    return (
      <section className="intro intro--home-two" id="intro">
        <div className="intro__home-two-grid">
          <div className="intro__copy">
            <h2 className="intro__title" aria-label="Creatieve groeipartner">
              <span className="intro__title-line" aria-hidden="true">
                <span className="intro__title-riso" aria-hidden="true" />
                <span className="intro__title-text">Creatieve</span>
              </span>
              <span className="intro__title-line" aria-hidden="true">
                <span className="intro__title-riso" aria-hidden="true" />
                <span className="intro__title-text">groeipartner</span>
              </span>
            </h2>
            <div className="intro__body">
              {homeTwoIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          <figure className="intro__home-two-media">
            <div
              className="intro__home-two-media-frame"
              onPointerLeave={handleIntroMediaPointerLeave}
              onPointerMove={handleIntroMediaPointerMove}
            >
              <div className="intro__case-orbit" aria-hidden="true">
                {homeTwoCaseVisuals.map(({ alt, height, poster, src, type, width }, index) => (
                  type === "video" ? (
                    <video
                      aria-label={alt}
                      autoPlay
                      className={`intro__case-card intro__case-card--video intro__case-card--${index + 1}`}
                      height={height}
                      key={src}
                      loop
                      muted
                      playsInline
                      poster={poster ? assetPath(poster) : undefined}
                      preload="metadata"
                      width={width}
                    >
                      <source src={assetPath(src)} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      alt={alt}
                      className={`intro__case-card intro__case-card--${index + 1}`}
                      decoding="async"
                      height={height}
                      key={src}
                      loading="lazy"
                      src={assetPath(src)}
                      width={width}
                    />
                  )
                ))}
              </div>
            </div>
            <figcaption className="sr-only">Zwevende collage van Ami Amis-casebeelden</figcaption>
          </figure>
        </div>

        <div className="intro__challenge-stage" ref={challengeStageRef}>
          <div className="intro__challenge-grid" aria-label="Waar we mee helpen">
            {problemCards.map(({ body, icon, number, title }, index) => (
              <article
                className={`intro__challenge intro__challenge--${icon}`}
                key={number}
                style={{ "--challenge-index": index }}
              >
                <div className="intro__challenge-topline">
                  <span className="intro__challenge-number" aria-hidden="true">
                    <span>{number}</span>
                  </span>
                  <img
                    alt=""
                    aria-hidden="true"
                    className="intro__challenge-icon"
                    decoding="async"
                    height="1254"
                    loading="lazy"
                    src={assetPath(problemCardIcons[icon])}
                    width="1254"
                  />
                </div>
                <h3>{title}</h3>
                <span className="intro__challenge-divider" aria-hidden="true" />
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>

        <div
          className="intro__home-two-cta"
          onPointerLeave={handleIntroCtaPointerLeave}
          onPointerMove={handleIntroCtaPointerMove}
        >
          <svg
            aria-hidden="true"
            className="intro__home-two-cta-swirl"
            focusable="false"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1200 560"
          >
            <path d="M-90-24C178 96 548-82 758 118c220 210 104 568-198 562C280 674 132 422 270 232c108-148 360-82 408 88 31 111-38 184-120 202" />
          </svg>
          <div className="intro__home-two-cta-media" aria-hidden="true">
            <video
              className="intro__home-two-cta-explosion"
              muted
              playsInline
              poster={assetPath("/assets/explosion-alpha-poster.png")}
              preload="metadata"
              ref={explosionVideoRef}
            >
              <source src={assetPath("/assets/explosion-alpha.webm")} type="video/webm" />
            </video>
            <img
              alt=""
              className="intro__home-two-cta-person"
              decoding="async"
              height="1254"
              loading="lazy"
              src={assetPath("/assets/creative-compadre-sunglasses.png")}
              width="1254"
            />
          </div>
          <div className="intro__home-two-cta-copy">
            <p>{homeTwoOutro[0]}</p>
            <strong className="intro__home-two-cta-title">
              <span className="sr-only">{homeTwoOutro[1]}</span>
              <span aria-hidden="true">Dus… Zullen we samen</span>
              <span aria-hidden="true">iets strafs van je merk</span>
              <span aria-hidden="true">maken?</span>
            </strong>
            <a className="button button--red" href={assetPath("/contact/")}>
              {ctaLabel}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="intro" id="intro">
      <div className="intro__copy">
        <h2 className="intro__title">
          Video first marketing,
          <span>van A tot Z.</span>
        </h2>
        <div className="intro__body">
          <p>
            Als marketing agency weten we hoe je een boodschap laat binnenkomen.
            Storytelling is our middle name. Van strategie tot productie,
            distributie en organische groei: wij denken mee over het volledige
            plaatje.
          </p>
          <p>
            Video? Grote fan! Vandaag is het een van de krachtigste manieren om
            mensen te raken, te overtuigen en in beweging te krijgen. Wil je je
            publiek bereiken via andere kanalen? No problemo, mon ami. We doen
            het allemaal.
          </p>
          <p>Scroll verder en ontdek wat we voor je kunnen doen.</p>
        </div>
      </div>
      <div className="intro__camera-wrap">
        <div className="intro__camera-art" aria-hidden="true">
          <div className="intro__action-lines">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <img
            className="intro__camera"
            src={assetPath("/assets/hand-camera.webp")}
            alt=""
            width="691"
            height="984"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <a className="button button--red intro__camera-cta" href={assetPath("/contact/")}>
        {ctaLabel}
      </a>
      <div className="tag-cloud" aria-label="Diensten">
        {tagRows.map((row, index) => (
          <div className="tag-cloud__row" key={`tag-row-${index + 1}`}>
            {row.map(([tag, color]) => (
              <span className={`tag tag--${color}`} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="intro__mobile-cta-row">
        <a className="button button--red intro__mobile-cta" href={assetPath("/contact/")}>
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
