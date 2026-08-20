const iconDefinitions = {
  calendar: {
    paths: ["M7 2v3M17 2v3M3.5 9h17M5.5 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm5.5 9h6m-3-3 3 3-3 3"],
  },
  close: { paths: ["M5 5l14 14M19 5 5 19"] },
  location: {
    paths: ["M12 1.8A7.2 7.2 0 0 0 4.8 9c0 5.4 7.2 12.4 7.2 12.4S19.2 14.4 19.2 9A7.2 7.2 0 0 0 12 1.8Zm0 9.7A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"],
    fill: true,
  },
  mail: {
    paths: ["M3.5 5h17A2.5 2.5 0 0 1 23 7.5v9A2.5 2.5 0 0 1 20.5 19h-17A2.5 2.5 0 0 1 1 16.5v-9A2.5 2.5 0 0 1 3.5 5Zm.2 3 8.3 5.4L20.3 8v-.3H3.7V8Zm16.6 2.4-7.5 4.9a1.5 1.5 0 0 1-1.6 0l-7.5-4.9v6.1h16.6v-6.1Z"],
    fill: true,
  },
  pause: { paths: ["M8 5v14M16 5v14"] },
  phone: {
    paths: ["M6.3 2.2c.7-.3 1.5-.1 2 .5l2.1 3c.5.7.4 1.6-.2 2.2l-1.1 1c.8 1.7 1.9 3.1 3.2 4.4 1.3 1.3 2.8 2.4 4.5 3.1l1-1.1c.6-.6 1.5-.7 2.2-.2l3 2.1c.6.4.8 1.2.5 1.9l-.8 2c-.3.8-1.1 1.3-2 1.2-4.8-.5-9.2-2.7-12.7-6.2C4.5 12.6 2.3 8.2 1.8 3.4c-.1-.9.4-1.7 1.2-2l2.3-.9Z"],
    fill: true,
  },
  play: { paths: ["M8 5.8v12.4l10-6.2z"], fill: true },
};

const sizeMap = {
  sm: "var(--aa-icon-size-sm)",
  md: "var(--aa-icon-size-md)",
  lg: "var(--aa-icon-size-lg)",
  xl: "var(--aa-icon-size-xl)",
};

export default function Icon({ className = "", label, name, size = "md" }) {
  const definition = iconDefinitions[name];
  if (!definition) throw new Error(`Unknown UI icon: ${name}`);

  return (
    <svg
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
      className={`aa-icon ${className}`.trim()}
      focusable="false"
      role={label ? "img" : undefined}
      style={{ "--aa-icon-inline-size": sizeMap[size] || size }}
      viewBox="0 0 24 24"
    >
      {definition.paths.map((path) => (
        <path d={path} fill={definition.fill ? "currentColor" : "none"} key={path} />
      ))}
    </svg>
  );
}
