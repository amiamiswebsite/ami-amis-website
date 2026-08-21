"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../src/lib/assetPath";

const testimonials = [
  {
    client: "X-Oats",
    href: "/ons-werk/x-oats/",
    image: "/work/x-oats-thumb-portrait.jpg",
    imageAlt: "X-Oats productbeeld",
    quote:
      "Wat ons vooral opviel, was hoe creatief én professioneel ze te werk gaan. Ze denken niet gewoon uit wat je vraagt, maar komen zelf met sterke ideeën en hooks die echt werken voor social ads.",
    tone: "x-oats",
  },
  {
    client: "Tarzan & Jane",
    href: "/work/tarzan-en-jane/",
    image: "/work/tarzan-en-jane-thumb.webp",
    imageAlt: "Tarzan & Jane projectbeeld",
    quote: "Ami Amis vertaalde onze energie naar content die meteen juist voelde. Speels, helder en helemaal on-brand.",
    tone: "tarzan-en-jane",
  },
];

const visitAntwerpenTestimonial = {
  client: "Visit Antwerpen",
  href: "/ons-werk/visit-antwerpen/",
  image: "/work/visit-antwerpen-thumb-portrait.jpg",
  imageAlt: "Visit Antwerpen projectbeeld",
  quote: "Ami Amis levert hoogwaardige video’s met mooie, kwaliteitsvolle beelden. De samenwerking verloopt steeds proactief en elke productie wordt benaderd met een aanstekelijk enthousiasme en veel inzet.",
  tone: "visit-antwerpen",
};

const friendsWord = "vrienden".split("");

export default function Testimonials({ variant = "default" }) {
  const displayedTestimonials = variant === "home2"
    ? [...testimonials, visitAntwerpenTestimonial]
    : testimonials;
  const railRef = useRef(null);
  const animationFrameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);

  const updateActiveSlide = () => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const slides = Array.from(rail.querySelectorAll("[data-testimonial-slide]"));
    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    const closest = slides.reduce((current, slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - railCenter);

      if (!current || distance < current.distance) {
        return { distance, index };
      }

      return current;
    }, null);

    if (typeof closest?.index === "number") {
      setActiveIndex(closest.index);
    }
  };

  const handleScroll = () => {
    window.cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = window.requestAnimationFrame(updateActiveSlide);
  };

  const scrollToSlide = (index) => {
    const rail = railRef.current;
    const slide = rail?.querySelector(`[data-testimonial-slide="${index}"]`);

    if (!rail || !(slide instanceof HTMLElement)) {
      return;
    }

    const left = slide.offsetLeft - (rail.clientWidth - slide.offsetWidth) / 2;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setActiveIndex(index);
  };

  const showPrevious = () => {
    scrollToSlide((activeIndex - 1 + displayedTestimonials.length) % displayedTestimonials.length);
  };

  const showNext = () => {
    scrollToSlide((activeIndex + 1) % displayedTestimonials.length);
  };

  useEffect(() => {
    if (isInteractionPaused || typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const autoplay = window.setInterval(() => {
      if (document.hidden) {
        return;
      }

      scrollToSlide((activeIndex + 1) % displayedTestimonials.length);
    }, 6500);

    return () => window.clearInterval(autoplay);
  }, [activeIndex, displayedTestimonials.length, isInteractionPaused]);

  return (
    <section
      className="testimonials friends-testimonials"
      id="vrienden"
      aria-labelledby="friends-testimonials-title"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsInteractionPaused(false);
        }
      }}
      onFocus={() => setIsInteractionPaused(true)}
      onMouseEnter={() => setIsInteractionPaused(true)}
      onMouseLeave={() => setIsInteractionPaused(false)}
    >
      <div className="friends-testimonials__inner">
        <h2 id="friends-testimonials-title" aria-label="Wat vrienden zeggen.">
          Wat{" "}
          <span className="approach-wave friends-testimonials__title-wave" aria-hidden="true">
            {friendsWord.map((letter, index) => (
              <span className="approach-wave__char" key={`${letter}-${index}`}>
                {letter}
              </span>
            ))}
          </span>{" "}
          zeggen.
        </h2>

        <div className="friends-testimonials__viewport">
          <div className="friends-testimonials__rail" onScroll={handleScroll} ref={railRef}>
            {displayedTestimonials.map((item, index) => (
              <article
                className={`friend-testimonial friend-testimonial--${item.tone}`}
                data-testimonial-slide={index}
                id={`testimonial-${item.tone}`}
                key={item.client}
              >
                <a aria-label={`Bekijk de case van ${item.client}`} className="friend-testimonial__link" href={assetPath(item.href)}>
                  <figure className="friend-testimonial__photo" aria-hidden="true">
                    <img src={assetPath(item.image)} alt={item.imageAlt} loading="lazy" decoding="async" />
                  </figure>

                  <blockquote className="friend-testimonial__note">
                    <span className="friend-testimonial__mark" aria-hidden="true">
                      “
                    </span>
                    <p>{item.quote}</p>
                    <footer>
                      <span className="friend-testimonial__case-link">zie case</span>
                      <cite>{item.client}</cite>
                    </footer>
                  </blockquote>
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="friends-testimonials__arrows" aria-label="Testimonials navigeren">
          <button
            aria-label="Vorige testimonial"
            className="friends-testimonials__arrow friends-testimonials__arrow--prev"
            onClick={showPrevious}
            type="button"
          />
          <button
            aria-label="Volgende testimonial"
            className="friends-testimonials__arrow friends-testimonials__arrow--next"
            onClick={showNext}
            type="button"
          />
        </div>

        <div className="friends-testimonials__dots" aria-label="Testimonials kiezen">
          {displayedTestimonials.map((item, index) => (
            <button
              aria-current={activeIndex === index ? "true" : undefined}
              aria-label={`Toon testimonial van ${item.client}`}
              className="friends-testimonials__dot"
              key={`dot-${item.client}`}
              onClick={() => scrollToSlide(index)}
              type="button"
            />
          ))}
        </div>

        <a className="button testimonials__button friends-testimonials__cta" href={assetPath("/contact/")}>
          VRIENDEN WORDEN?
        </a>
      </div>
    </section>
  );
}
