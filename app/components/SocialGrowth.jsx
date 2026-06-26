import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const VISIT_ANTWERPEN_CASE_URL = "/ons-werk/visit-antwerpen/";

// Optional: sync follower count via Instagram Graph API when authenticated business account access is available.
const strategyStats = [
  {
    value: "30,3k",
    target: 30.3,
    suffix: "k",
    decimals: 1,
    label: "weergaven / maand",
    type: "views",
  },
  {
    value: "+33,5%",
    target: 33.5,
    prefix: "+",
    suffix: "%",
    decimals: 1,
    label: "nieuwe volgers / maand",
    type: "growth",
  },
];

const socialBadges = [
  {
    icon: "follow",
    className: "social-icon--follow",
    type: "follow",
  },
];

function formatStatValue(stat, value) {
  const decimals = stat.decimals || 0;
  const fixed = decimals ? value.toFixed(decimals) : String(Math.round(value));
  const localized = fixed.replace(".", ",");

  return `${stat.prefix || ""}${localized}${stat.suffix || ""}`;
}

function BadgeIcon({ icon }) {
  if (icon === "follow") {
    return (
      <svg className="social-follow-icon" viewBox="0 0 122.88 114.42" aria-hidden="true">
        <path
          className="social-follow-icon__bubble"
          d="M9.32,0H113.56a9.35,9.35,0,0,1,9.32,9.32V82.94a9.37,9.37,0,0,1-9.32,9.32H83.84L67.68,111.32a8.17,8.17,0,0,1-12.82,0L39,92.26H9.32A9.36,9.36,0,0,1,0,82.94V9.32A9.34,9.34,0,0,1,9.32,0Z"
        />
        <path
          className="social-follow-icon__person"
          d="M46.47,49.89H76.41a11,11,0,0,1,11,11v4.29a1.35,1.35,0,0,1-1.35,1.34H36.83a1.35,1.35,0,0,1-1.35-1.34V60.88a11,11,0,0,1,11-11Zm15-32.33A14.22,14.22,0,1,1,47.22,31.78,14.22,14.22,0,0,1,61.44,17.56Z"
        />
      </svg>
    );
  }

  if (icon === "play") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5.8v12.4l10-6.2z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12.2a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Z" />
      <path d="M4.4 20.2c.9-4 3.5-6.2 7.6-6.2s6.7 2.2 7.6 6.2H4.4Z" />
    </svg>
  );
}

export default function SocialGrowth() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState(strategyStats.map(() => 0));
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    const textNode = textRef.current;
    const statsNode = statsRef.current;

    if (!sectionNode || !textNode || !statsNode) {
      return undefined;
    }

    const alignStats = () => {
      if (window.innerWidth <= 1280) {
        sectionNode.style.removeProperty("--social-stats-top");
        sectionNode.style.removeProperty("--social-stats-height");
        return;
      }

      const sectionRect = sectionNode.getBoundingClientRect();
      const textRect = textNode.getBoundingClientRect();
      const statsRect = statsNode.getBoundingClientRect();
      const phoneNode = sectionNode.querySelector(".phone-scene");
      const phoneRect = phoneNode?.getBoundingClientRect();
      const textAlignedTop = textRect.bottom - sectionRect.top - statsRect.height;
      const phoneSafeTop = phoneRect ? phoneRect.bottom - sectionRect.top + 28 : 0;
      const top = Math.max(220, textAlignedTop, phoneSafeTop);

      sectionNode.style.setProperty("--social-stats-top", `${Math.round(top)}px`);
      sectionNode.style.setProperty("--social-stats-height", `${Math.round(statsRect.height)}px`);
    };

    alignStats();
    window.addEventListener("resize", alignStats, { passive: true });

    const copyNode = sectionNode.querySelector(".social-growth__copy");
    const observer = "ResizeObserver" in window ? new ResizeObserver(alignStats) : null;
    observer?.observe(sectionNode);
    observer?.observe(textNode);
    if (copyNode) {
      observer?.observe(copyNode);
    }
    observer?.observe(statsNode);

    return () => {
      window.removeEventListener("resize", alignStats);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const statsNode = statsRef.current;

    if (!statsNode) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      hasAnimated.current = true;
      setCounts(strategyStats.map((stat) => stat.target));
      setIsCounting(false);
    };

    if (reduceMotion) {
      finish();
      return undefined;
    }

    let frame = 0;
    const duration = 950;
    const easeOutBack = (value) => {
      const c1 = 1.45;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
    };

    const runCounter = () => {
      if (hasAnimated.current) {
        return;
      }

      hasAnimated.current = true;
      setIsCounting(true);
      const start = performance.now();

      const tick = (now) => {
        const rawProgress = Math.min((now - start) / duration, 1);
        const progress = Math.min(easeOutBack(rawProgress), 1);

        setCounts(
          strategyStats.map((stat) => {
            if (rawProgress === 0) {
              return 1;
            }

            const multiplier = stat.decimals ? 10 ** stat.decimals : 1;
            return Math.max(0, Math.round(stat.target * progress * multiplier) / multiplier);
          })
        );

        if (rawProgress < 1) {
          frame = window.requestAnimationFrame(tick);
        } else {
          setCounts(strategyStats.map((stat) => stat.target));
          window.setTimeout(() => setIsCounting(false), 220);
        }
      };

      frame = window.requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      runCounter();
      return () => {
        if (frame) {
          window.cancelAnimationFrame(frame);
        }
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(statsNode);

    return () => {
      observer.disconnect();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    const videoNode = videoRef.current;

    if (!videoNode) {
      return undefined;
    }

    let stopped = false;
    let retryTimer = 0;

    const playVideo = () => {
      if (stopped || !videoNode.paused) {
        return;
      }

      videoNode.muted = true;
      videoNode.playsInline = true;

      const playPromise = videoNode.play();

      if (playPromise?.catch) {
        playPromise.catch(() => {
          if (!stopped) {
            retryTimer = window.setTimeout(playVideo, 650);
          }
        });
      }
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        playVideo();
      }
    };

    videoNode.load();
    playVideo();

    window.addEventListener("pageshow", playVideo);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", playVideo, { passive: true });
    window.addEventListener("touchstart", playVideo, { passive: true });
    window.addEventListener("pointerdown", playVideo, { passive: true });

    return () => {
      stopped = true;
      window.clearTimeout(retryTimer);
      window.removeEventListener("pageshow", playVideo);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", playVideo);
      window.removeEventListener("touchstart", playVideo);
      window.removeEventListener("pointerdown", playVideo);
    };
  }, []);

  return (
    <section className="social-growth" id="groei" ref={sectionRef}>
      <div className="social-growth__copy">
        <h2>
          Organische groei.
          <span>door strategie en actie.</span>
        </h2>
        <p ref={textRef}>
          Een sterke campagne die niemand ziet? Lame! Daarom helpen we je niet
          alleen met sterke content, maar ook met de strategie erachter. We
          denken mee over wat past bij jouw merk, jouw verhaal en jouw doelgroep.
          Wij bekijken het grote plaatje en vertalen dat naar een campagne met
          sterke content die juist wordt ingezet.
        </p>
      </div>
      <div className="phone-scene">
        <a
          aria-label="Bekijk de case van Visit Antwerpen"
          className="phone-frame"
          href={assetPath(VISIT_ANTWERPEN_CASE_URL)}
        >
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            ref={videoRef}
          >
            <source src={assetPath("/assets/dianavisitthumb-loop.mp4")} type="video/mp4" />
          </video>
          <span className="social-growth__case-label">Visit Antwerpen</span>
        </a>
        <span className="social-icon social-icon--heart" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 20.2c-5.1-3.3-8.4-6.4-8.4-10.1 0-2.4 1.7-4.2 4.1-4.2 1.5 0 2.9.8 3.6 2 .7-1.2 2.1-2 3.6-2 2.4 0 4.1 1.8 4.1 4.2 0 3.7-3.3 6.8-8.4 10.1Z" />
          </svg>
        </span>
        {socialBadges.map((badge) => {
          const Tag = badge.href ? "a" : "div";

          return (
            <Tag
              className={`social-icon social-badge ${badge.className}`}
              href={badge.href}
              key={badge.type || badge.label}
              rel={badge.href ? "noopener noreferrer" : undefined}
              target={badge.href ? "_blank" : undefined}
              aria-label={badge.href ? "Bekijk Ami Amis op Instagram" : undefined}
            >
              <BadgeIcon icon={badge.icon} />
              {badge.value ? <strong>{badge.value}</strong> : null}
              {badge.label ? <span>{badge.label}</span> : null}
            </Tag>
          );
        })}
        <img className="social-icon social-icon--bell" src={assetPath("/assets/social-bell.png")} alt="" />
        <img className="social-icon social-icon--like" src={assetPath("/assets/social-like.png")} alt="" />
      </div>
      <div className={`stats${isCounting ? " is-counting" : ""}`} ref={statsRef}>
        {strategyStats.map((stat, index) => {
          return (
          <div
            className="stat"
            key={stat.label}
          >
            <strong>
              {formatStatValue(stat, counts[index])}
            </strong>
            <span>{stat.label}</span>
          </div>
          );
        })}
      </div>
    </section>
  );
}
