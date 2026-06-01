const items = [
  { label: "Welkom", href: "#intro", active: true },
  { label: "Het ami-team", href: "#aanpak" },
  { label: "Ons werk", href: "#werk" },
  { label: "Diensten", href: "#diensten" },
  { label: "Contact", href: "#contact", blue: true },
];

export default function NavOverlay({ open, onClose }) {
  return (
    <div className={`nav-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="nav-overlay__close" type="button" onClick={onClose}>
        <span className="sr-only">Sluit navigatie</span>
      </button>
      <nav className="nav-overlay__menu" aria-label="Hoofdnavigatie">
        {items.map((item) => (
          <a
            className={`nav-overlay__link ${item.active ? "is-active" : ""} ${
              item.blue ? "is-blue" : ""
            }`}
            href={item.href}
            key={item.label}
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
