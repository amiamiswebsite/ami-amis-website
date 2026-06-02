import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const stats = [
  { target: 47, suffix: "", label: "nieuwe volgers" },
  { target: 9, suffix: "k", label: "impressies" },
  { target: 750, suffix: "", label: "verkochte producten" },
];

export default function SocialGrowth() {
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const statsNode = statsRef.current;

    if (!statsNode) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      hasAnimated.current = true;
      setCounts(stats.map((stat) => stat.target));
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
          stats.map((stat) => {
            if (rawProgress === 0) {
              return 1;
            }
            return Math.max(1, Math.round(stat.target * progress));
          })
        );

        if (rawProgress < 1) {
          frame = window.requestAnimationFrame(tick);
        } else {
          setCounts(stats.map((stat) => stat.target));
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
    <section className="social-growth" id="groei">
      <div className="social-growth__copy">
        <h2>
          Strategie.<wbr />Actie.
          <span>Organische groei.</span>
        </h2>
        <p>
          Three days of strategic insight and collaborative workshops designed
          for leaders shaping the future.
        </p>
      </div>
      <div className="phone-scene">
        <div className="phone-frame">
          <img src={assetPath("/assets/social-phone-organic-growth.png")} alt="" />
        </div>
        <img className="social-icon social-icon--heart" src={assetPath("/assets/social-heart.png")} alt="" />
        <img className="social-icon social-icon--comment" src={assetPath("/assets/social-comment.png")} alt="" />
        <img className="social-icon social-icon--follow" src={assetPath("/assets/social-follow.png")} alt="" />
        <img className="social-icon social-icon--bell" src={assetPath("/assets/social-bell.png")} alt="" />
        <img className="social-icon social-icon--like" src={assetPath("/assets/social-like.png")} alt="" />
      </div>
      <div className={`stats${isCounting ? " is-counting" : ""}`} ref={statsRef}>
        {stats.map((stat, index) => (
          <div className="stat" key={stat.label}>
            <strong>
              {counts[index]}
              {stat.suffix}
              <span aria-hidden="true">+</span>
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
