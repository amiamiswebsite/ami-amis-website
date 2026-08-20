import Container from "./Container";

export default function Section({
  as: Element = "section",
  children,
  className = "",
  container = "content",
  spacing = "default",
  surface = "canvas",
  ...props
}) {
  return (
    <Element
      className={`aa-section aa-section--${surface} aa-section--space-${spacing} ${className}`.trim()}
      {...props}
    >
      {container === "none" ? children : <Container size={container}>{children}</Container>}
    </Element>
  );
}
