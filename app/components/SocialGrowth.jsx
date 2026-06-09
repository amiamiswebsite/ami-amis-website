import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const INSTAGRAM_URL = "https://www.instagram.com/amiamismedia/";

// Optional: sync follower count via Instagram Graph API when authenticated business account access is available.
const strategyStats = [
  {
    value: "747",
    target: 747,
    label: "volgers",
    href: INSTAGRAM_URL,
    type: "followers",
  },
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
    icon: "user",
    value: "747",
    label: "volgers",
    href: INSTAGRAM_URL,
    className: "social-icon--comment",
  },
  {
    icon: "play",
    value: "30,3k",
    label: "weergaven / maand",
    className: "social-icon--follow",
  },
];

function formatStatValue(stat, value) {
  const decimals = stat.decimals || 0;
  const fixed = decimals ? value.toFixed(decimals) : String(Math.round(value));
  const localized = fixed.replace(".", ",");

  return `${stat.prefix || ""}${localized}${stat.suffix || ""}`;
}

function BadgeIcon({ icon }) {
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
      if (window.innerWidth <= 1180) {
        sectionNode.style.removeProperty("--social-stats-top");
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
    };

    alignStats();
    window.addEventListener("resize", alignStats, { passive: true });

    const observer = "ResizeObserver" in window ? new ResizeObserver(alignStats) : null;
    observer?.observe(sectionNode);
    observer?.observe(textNode);
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

  return (
    <section className="social-growth" id="groei" ref={sectionRef}>
      <div className="social-growth__copy">
        <h2>
          Strategie.<wbr />Actie.
          <span>Organische groei.</span>
        </h2>
        <p ref={textRef}>
          Een sterke campagne die niemand ziet? Lame! Daarom helpen we je niet
          alleen met sterke content, maar ook met de strategie erachter. We
          denken mee over wat past bij jouw merk, jouw verhaal en jouw doelgroep.
          Wij bekijken het grote plaatje en vertalen dat naar een campagne met
          sterke content die juist wordt ingezet.
        </p>
        <a
          className="social-growth__instagram"
          href={INSTAGRAM_URL}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Bekijk Ami Amis op Instagram"
        >
          @amiamis
        </a>
      </div>
      <div className="phone-scene">
        <div className="phone-frame">
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            poster={assetPath("/assets/social-phone-organic-growth.png")}
            preload="metadata"
          >
            <source src={assetPath("/assets/dianavisitthumb-loop.mp4")} type="video/mp4" />
          </video>
        </div>
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
              <strong>{badge.value}</strong>
              <span>{badge.label}</span>
            </Tag>
          );
        })}
        <img className="social-icon social-icon--bell" src={assetPath("/assets/social-bell.png")} alt="" />
        <img className="social-icon social-icon--like" src={assetPath("/assets/social-like.png")} alt="" />
      </div>
      <div className={`stats${isCounting ? " is-counting" : ""}`} ref={statsRef}>
        {strategyStats.map((stat, index) => {
          const Tag = stat.href ? "a" : "div";

          return (
          <Tag
            className="stat"
            href={stat.href}
            key={stat.label}
            rel={stat.href ? "noopener noreferrer" : undefined}
            target={stat.href ? "_blank" : undefined}
            aria-label={stat.href ? "Bekijk Ami Amis op Instagram" : undefined}
          >
            <strong>
              {formatStatValue(stat, counts[index])}
            </strong>
            <span>{stat.label}</span>
          </Tag>
          );
        })}
      </div>
    </section>
  );
}
