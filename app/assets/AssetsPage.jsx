"use client";

import { useEffect, useState } from "react";
import MenuToggle from "../components/MenuToggle";
import NavOverlay from "../components/NavOverlay";
import { assetPath } from "../../src/lib/assetPath";
import { DepthStage, RisoLockup, SpecimenLabel } from "./AssetPrimitives";
import styles from "./AssetsPage.module.css";

const categories = [
  ["print", "Print"],
  ["paper", "Papier"],
  ["frames", "Frames"],
  ["shapes", "Vormen"],
  ["motion", "Motion"],
];

const frameImages = [
  {
    src: "/work/visit-antwerpen-thumb-portrait.jpg",
    alt: "Campagnebeeld uit de Visit Antwerpen-case",
    className: styles.framePortrait,
  },
  {
    src: "/images/cases/humgy/humgy-reading.jpg",
    alt: "Beeld uit de Humgy-case",
    className: styles.frameLandscape,
  },
  {
    src: "/work/x-oats-thumb-portrait.jpg",
    alt: "Campagnebeeld uit de X-Oats-case",
    className: styles.frameSquare,
  },
  {
    src: "/work/imore.webp",
    alt: "Beeld uit de iMore-case",
    className: styles.frameWide,
  },
  {
    src: "/images/cases/billy-bonkers/stad-gent-energiecentrale-campagnebeeld-01.jpg",
    alt: "Campagnebeeld voor Stad Gent",
    className: styles.frameTicket,
  },
];

export default function AssetsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = [...document.querySelectorAll("[data-asset-reveal]")];

    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add(styles.isVisible));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.isVisible);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <main className={styles.page}>
          <a className={styles.logo} href={assetPath("/")} aria-label="Ami Amis home" />

          <header className={styles.hero}>
            <div className={styles.heroMeta}>
              <span>AMI AMIS / VISUAL SYSTEM</span>
              <span>LIBRARY 01</span>
            </div>

            <div className={styles.heroGrid}>
              <h1>
                <RisoLockup lines={["ASSET"]} compact />
                <span className={styles.heroLibrary}>library</span>
              </h1>
              <div className={styles.heroIndex} aria-label="Assetcategorieën">
                {categories.map(([id, label], index) => (
                  <a href={`#${id}`} key={id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </header>

          <section className={`${styles.section} ${styles.printSection}`} id="print" data-asset-reveal>
            <header className={styles.sectionHeader}>
              <SpecimenLabel code="PRINT-01">Riso lockups</SpecimenLabel>
              <span className={styles.sectionCount}>01 / 05</span>
            </header>

            <div className={styles.printGrid}>
              <div className={styles.printHero}>
                <RisoLockup lines={["MAKE", "IT BOLD"]} />
                <span aria-hidden="true" className={styles.registrationMark}>+</span>
              </div>

              <div className={styles.printSamples}>
                <div className={styles.overprintSample}>
                  <span>AA</span>
                  <span>AA</span>
                </div>
                <div className={styles.halftoneSample}>
                  <span>50</span>
                </div>
                <div className={styles.inkSample}>
                  <span>INK</span>
                  <i aria-hidden="true" />
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.paperSection}`} id="paper" data-asset-reveal>
            <header className={styles.sectionHeader}>
              <SpecimenLabel code="PAPER-02">Torn notes</SpecimenLabel>
              <span className={styles.sectionCount}>02 / 05</span>
            </header>

            <DepthStage className={styles.paperStage} intensity={0.72}>
              <div className={styles.paperSheet}>
                <span className={styles.paperTape} aria-hidden="true" />
                <small>NOTE 02-A</small>
                <strong>IDEAS<br />WITH EDGES</strong>
                <span className={styles.paperUnderline} aria-hidden="true" />
              </div>
              <div className={styles.paperStrip}>
                VIDEO-FIRST CONTENT / ANTWERPEN
              </div>
              <div className={styles.paperTicket}>
                <span>TEAR HERE</span>
                <strong>AMICALITEIT</strong>
              </div>
              <div className={styles.paperClip} aria-hidden="true" />
            </DepthStage>
          </section>

          <section className={`${styles.section} ${styles.framesSection}`} id="frames" data-asset-reveal>
            <header className={styles.sectionHeader}>
              <SpecimenLabel code="FRAME-03">Cut-out depth</SpecimenLabel>
              <span className={styles.sectionCount}>03 / 05</span>
            </header>

            <DepthStage className={styles.framesStage} intensity={0.9}>
              <span className={styles.frameOrbit} aria-hidden="true" />
              {frameImages.map((image, index) => (
                <figure className={`${styles.floatingFrame} ${image.className}`} key={image.src}>
                  <img
                    alt={image.alt}
                    decoding="async"
                    loading="lazy"
                    src={assetPath(image.src)}
                  />
                  <figcaption>{`FRAME 03-${String.fromCharCode(65 + index)}`}</figcaption>
                </figure>
              ))}
            </DepthStage>
          </section>

          <section className={`${styles.section} ${styles.shapesSection}`} id="shapes" data-asset-reveal>
            <header className={styles.sectionHeader}>
              <SpecimenLabel code="SHAPE-04" inverse>Bold forms</SpecimenLabel>
              <span className={styles.sectionCount}>04 / 05</span>
            </header>

            <div className={styles.shapeGrid}>
              <div className={styles.shapeBurst}><span>NEW</span></div>
              <div className={styles.shapeArrow} aria-hidden="true" />
              <div className={styles.shapeTicket}><span>04-B</span><strong>GO</strong></div>
              <div className={styles.shapeRings} aria-hidden="true"><span /><span /><span /></div>
              <div className={styles.shapeSlash}><span>AMI / AMIS</span></div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.motionSection}`} id="motion" data-asset-reveal>
            <header className={styles.sectionHeader}>
              <SpecimenLabel code="MOTION-05" inverse>Kinetic strips</SpecimenLabel>
              <span className={styles.sectionCount}>05 / 05</span>
            </header>

            <div className={styles.motionWindow}>
              <div className={`${styles.motionRail} ${styles.motionRailForward}`}>
                <span>MAKE IT MOVE / MAKE IT MOVE / MAKE IT MOVE /</span>
                <span aria-hidden="true">MAKE IT MOVE / MAKE IT MOVE / MAKE IT MOVE /</span>
              </div>
              <div className={`${styles.motionRail} ${styles.motionRailReverse}`}>
                <span>PRINT / PAPER / DEPTH / CUT-OUT /</span>
                <span aria-hidden="true">PRINT / PAPER / DEPTH / CUT-OUT /</span>
              </div>
              <div className={styles.motionBadge}>
                <span>AA</span>
                <small>LOOP 05</small>
              </div>
            </div>
          </section>

          <footer className={styles.libraryFooter}>
            <span>AMI AMIS</span>
            <span>ASSET LIBRARY / 2026</span>
          </footer>
        </main>
      </div>

      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay activePage="assets" open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
