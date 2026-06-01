"use client";

import { useState } from "react";
import Approach from "./components/Approach";
import Brainstorm from "./components/Brainstorm";
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

  return (
    <>
      <div className={`site-shell ${menuOpen ? "menu-open" : ""}`}>
        <Hero />
        <main>
          <Intro />
          <Projects />
          <SocialGrowth />
          <Approach />
          <Testimonials />
          <Brainstorm />
          <Punch />
        </main>
      </div>
      <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activePage="home" />
    </>
  );
}
