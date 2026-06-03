import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const stats = [
  { target: 47, suffix: "", label: "nieuwe volgers" },
  { target: 9, suffix: "k", label: "impressies" },
  { target: 750, suffix: "", label: "verkochte producten" },
];

export default function SocialGrowth() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
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
      const top = Math.max(220, textRect.bottom - sectionRect.top - statsRect.height);

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
    <section className="social-growth" id="groei" ref={sectionRef}>
      <div className="social-growth__copy">
        <h2>
          Strategie.<wbr />Actie.
          <span>Organische groei.</span>
        </h2>
        <p ref={textRef}>
          Een goeie video is niks waard als niemand hem ziet. Daarom helpen we
          je niet alleen met sterke content, maar ook met de strategie erachter.
          We denken mee over wat past bij jouw merk, jouw verhaal en jouw
          doelgroep. Die strategie vertalen we naar slimme marketing en video’s
          die niet alleen goed gemaakt zijn, maar ook juist ingezet worden. Zo
          bouwen we stap voor stap aan organische groei. Niet door blind trends
          te volgen voor snelle pieken, maar door een publiek op te bouwen dat
          gelooft in je merk, je verhaal en je product.
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
