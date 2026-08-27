"use client";

import { useEffect, useState } from "react";
import Brainstorm from "./Brainstorm";
import Footer from "./Footer";
import Hero from "./Hero";
import Intro from "./Intro";
import MenuToggle from "./MenuToggle";
import NavOverlay from "./NavOverlay";
import Punch from "./Punch";
import Projects from "./Projects";
import SocialGrowth from "./SocialGrowth";
import Testimonials from "./Testimonials";

export default function HomeExperience({ variant = "default" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomeTwo = variant === "home2";

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(
      document.querySelectorAll(".hero, .collage-flow > section, .site-footer"),
    );

    document.body.classList.add("collage-ready");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return () => {
        document.body.classList.remove("collage-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.body.classList.remove("collage-ready");
    };
  }, []);

  return (
    <>
      <div className={`site-shell ${isHomeTwo ? "home-two" : ""} ${menuOpen ? "menu-open" : ""}`}>
        {isHomeTwo ? (
          <Hero id="home-two-proposal-header" proposal="new" />
        ) : (
          <Hero id="hero-new-proposal" proposal="new" />
        )}
        <main className="collage-flow">
          <Intro variant={variant} />
          <Projects />
          <SocialGrowth variant={variant} />
          <Testimonials variant={variant} />
          <Brainstorm />
          <Punch />
        </main>
        <Footer />
      </div>
      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay
        activePage="home"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
