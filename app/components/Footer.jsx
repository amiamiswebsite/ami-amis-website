"use client";

import { useCallback, useEffect, useRef } from "react";
import BrandIcon from "./ui/BrandIcon";

const contactLinks = [
  { label: "Mail", value: "brent@amiamis.be", href: "mailto:brent@amiamis.be" },
  { label: "Telefoon", value: "+32 472 65 75 95", href: "tel:+32472657595" },
  { label: "Kantooruren", value: "ma - vr 9u-18u" },
  { label: "BTW", value: "BE0786.290.512" },
];

const locations = [
  "Hoofdzetel: IJzerenpoortkaai 3, 2000 Antwerpen",
  "Kantoor: Meir 78 - Stadsfeestzaal, 2000 Antwerpen",
];

const socialLinks = [
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/amiamismedia/" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/ami-amis-malle/" },
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/AmiAmisMedia" },
  // TODO: Voeg TikTok toe zodra de officiele Ami Amis URL bevestigd is.
];

const legalLinks = [
  { label: "Privacy policy", href: "https://www.amiamis.com/privacy-policy" },
  { label: "Algemene voorwaarden", href: "https://www.amiamis.com/algemene-voorwaarden" },
];

function FooterLink({ href, children, className = "", ...props }) {
  const isHttp = href.startsWith("http");

  return (
    <a
      className={className}
      href={href}
      rel={isHttp ? "noreferrer" : undefined}
      target={isHttp ? "_blank" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

export default function Footer({ variant = "dark" }) {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const frameRef = useRef(0);
  const footerClassName =
    variant === "paper-flat"
      ? "site-footer site-footer--paper site-footer--paper-flat"
      : variant === "paper"
        ? "site-footer site-footer--paper"
        : "site-footer";
  const updateFooterGradient = useCallback((event) => {
    if (event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      footerRef.current?.style.setProperty("--footer-gradient-x", `${x.toFixed(1)}%`);
      footerRef.current?.style.setProperty("--footer-gradient-y", `${y.toFixed(1)}%`);
    });
  }, []);
  const resetFooterGradient = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      footerRef.current?.style.setProperty("--footer-gradient-x", "86%");
      footerRef.current?.style.setProperty("--footer-gradient-y", "16%");
    });
  }, []);

  useEffect(
    () => () => {
      window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  return (
    <footer
      className={footerClassName}
      id="contact"
      onPointerLeave={resetFooterGradient}
      onPointerMove={updateFooterGradient}
      ref={footerRef}
    >
      <div className="site-footer__inner">
        <div className="site-footer__grid" aria-label="Footer contact en socials">
          <section className="site-footer__panel">
            <h2>Contact</h2>
            <div className="site-footer__contact-list">
              {contactLinks.map((item) => (
                <p key={item.label}>
                  <span>{item.label}</span>
                  {item.href ? (
                    <FooterLink className="site-footer__link" href={item.href}>
                      {item.value}
                    </FooterLink>
                  ) : (
                    <strong>{item.value}</strong>
                  )}
                </p>
              ))}
            </div>
            <div className="site-footer__locations">
              {locations.map((location) => (
                <p key={location}>{location}</p>
              ))}
            </div>
          </section>

          <section className="site-footer__panel site-footer__panel--social">
            <h2>Volg ons</h2>
            <div className="site-footer__socials">
              {socialLinks.map((link) => (
                <FooterLink
                  aria-label={link.label}
                  className="site-footer__social"
                  href={link.href}
                  key={link.label}
                >
                  <span className="site-footer__social-mark" aria-hidden="true">
                    <BrandIcon className="site-footer__social-icon" name={link.icon} />
                  </span>
                  <span className="site-footer__social-label">{link.label}</span>
                </FooterLink>
              ))}
            </div>
          </section>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {currentYear} Ami Amis</p>
          <div className="site-footer__legal">
            {legalLinks.map((link) => (
              <FooterLink className="site-footer__link" href={link.href} key={link.label}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
