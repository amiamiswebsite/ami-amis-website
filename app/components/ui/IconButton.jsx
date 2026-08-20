import Icon from "./Icon";

export default function IconButton({ icon, label, className = "", type = "button", ...props }) {
  return (
    <button
      aria-label={label}
      className={`aa-icon-button ${className}`.trim()}
      title={label}
      type={type}
      {...props}
    >
      <Icon name={icon} />
    </button>
  );
}
