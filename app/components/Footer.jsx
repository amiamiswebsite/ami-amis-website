"use client";

const contactLinks = [
  { label: "Mail", value: "hello@amiamis.be", href: "mailto:hello@amiamis.be" },
  { label: "Telefoon", value: "+32 460 95 33 54", href: "tel:+32460953354" },
  { label: "Kantooruren", value: "ma - vr 8u30-17u30" },
  { label: "BTW", value: "BE0778752139" },
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
  { label: "Privacy", href: "https://www.amiamis.com/privacy-policy" },
  {
    label: "Algemene voorwaarden",
    href: "https://www.amiamis.com/s/Algemene-Voorwaarden-Ami-Amis-BV-18_08_2025.pdf",
  },
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

function SocialIcon({ type }) {
  if (type === "instagram") {
    return (
      <svg className="site-footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17" cy="7" r="1.1" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg className="site-footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.2 9.6h3.1V19H6.2z" />
        <path d="M7.8 5a1.8 1.8 0 1 1 0 3.6A1.8 1.8 0 0 1 7.8 5z" />
        <path d="M11.3 9.6h3v1.3c.6-.9 1.5-1.6 3.1-1.6 2.4 0 4 1.5 4 4.6V19h-3.1v-4.7c0-1.4-.6-2.2-1.8-2.2-1.3 0-2.1.9-2.1 2.4V19h-3.1z" />
      </svg>
    );
  }

  return (
    <svg className="site-footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.3 8.1h2.2V4.4c-.4 0-1.7-.1-3.2-.1-3.1 0-5.2 1.9-5.2 5.4v3H4.7v4.1h3.4V24h4.2v-7.2h3.4l.5-4.1h-3.9V10c0-1.2.3-1.9 2-1.9z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="site-footer__grid" aria-label="Footer contact en socials">
          <section className="site-footer__panel">
            <h3>Contact</h3>
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
            <h3>Volg ons</h3>
            <div className="site-footer__socials">
              {socialLinks.map((link) => (
                <FooterLink
                  aria-label={link.label}
                  className="site-footer__social"
                  href={link.href}
                  key={link.label}
                >
                  <span className="site-footer__social-mark" aria-hidden="true">
                    <SocialIcon type={link.icon} />
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
