import CtaArrowIcon from "./CtaArrowIcon";

export default function HomeCtaLink({ children, className = "", showIcon = true, ...props }) {
  const iconClassName = showIcon ? "home-cta-pill--with-icon" : "home-cta-pill--iconless";

  return (
    <a className={`home-cta-pill ${iconClassName} ${className}`.trim()} {...props}>
      <span className="home-cta-pill__label">{children}</span>
      {showIcon ? (
        <span className="home-cta-pill__icon" aria-hidden="true">
          <CtaArrowIcon />
        </span>
      ) : null}
    </a>
  );
}
