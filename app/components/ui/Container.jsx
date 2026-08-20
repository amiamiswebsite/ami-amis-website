export default function Container({ as: Element = "div", className = "", size = "content", ...props }) {
  return <Element className={`aa-container aa-container--${size} ${className}`.trim()} {...props} />;
}
