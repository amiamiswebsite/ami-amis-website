"use client";

import { useEffect, useState } from "react";
import Approach from "./components/Approach";
import Brainstorm from "./components/Brainstorm";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import MenuToggle from "./components/MenuToggle";
import NavOverlay from "./components/NavOverlay";
import Projects from "./components/Projects";
import Punch from "./components/Punch";
import SocialGrowth from "./components/SocialGrowth";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(
      document.querySelectorAll(".hero, .collage-flow > section, .site-footer")
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
      { rootMargin: "0px 0px -14% 0px", threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.body.classList.remove("collage-ready");
    };
  }, []);

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <Hero />
        <main className="collage-flow">
          <Intro />
          <Projects />
          <SocialGrowth />
          <Approach />
          <Testimonials />
          <Brainstorm />
          <Punch />
        </main>
        <Footer />
      </div>
      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="home" />
    </>
  );
}
