export default function MenuToggle({ open, onToggle }) {
  return (
    <button
      aria-expanded={open}
      aria-label={open ? "Sluit navigatie" : "Open navigatie"}
      className={`menu-toggle ${open ? "is-open" : ""}`}
      type="button"
      onClick={onToggle}
    >
      <span className="sr-only">{open ? "Sluit navigatie" : "Open navigatie"}</span>
      <span className="menu-toggle__icon" aria-hidden="true">
        <span className="menu-toggle__bar" />
        <span className="menu-toggle__bar" />
        <span className="menu-toggle__bar" />
      </span>
    </button>
  );
}
