"use client";

import { useState } from "react";
import Approach from "./components/Approach";
import Brainstorm from "./components/Brainstorm";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import NavOverlay from "./components/NavOverlay";
import Projects from "./components/Projects";
import Punch from "./components/Punch";
import SocialGrowth from "./components/SocialGrowth";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Hero onOpenMenu={() => setMenuOpen(true)} />
      <main>
        <Intro />
        <Projects />
        <Punch />
        <Approach />
        <Testimonials />
        <Brainstorm />
        <SocialGrowth />
      </main>
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
