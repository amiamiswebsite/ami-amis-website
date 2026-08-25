import CtaArrowIcon from "./CtaArrowIcon";

export default function HomeCtaLink({ children, className = "", ...props }) {
  return (
    <a className={`home-cta-pill ${className}`.trim()} {...props}>
      <span className="home-cta-pill__label">{children}</span>
      <span className="home-cta-pill__icon" aria-hidden="true">
        <CtaArrowIcon />
      </span>
    </a>
  );
}
