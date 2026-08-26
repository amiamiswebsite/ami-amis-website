const iconDefinitions = {
  arrowUpRight: { paths: ["M7 17 17 7M9 7h8v8"] },
  calendar: {
    paths: ["M7 2v3M17 2v3M3.5 9h17M5.5 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm5.5 9h6m-3-3 3 3-3 3"],
  },
  close: { paths: ["M5 5l14 14M19 5 5 19"] },
  chevronLeft: { paths: ["m15 18-6-6 6-6"] },
  chevronRight: { paths: ["m9 18 6-6-6-6"] },
  link: {
    paths: [
      "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
      "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    ],
  },
  location: {
    paths: ["M12 1.8A7.2 7.2 0 0 0 4.8 9c0 5.4 7.2 12.4 7.2 12.4S19.2 14.4 19.2 9A7.2 7.2 0 0 0 12 1.8Zm0 9.7A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"],
    fill: true,
  },
  mail: {
    paths: [
      "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
      "m3 7 9 6 9-6",
    ],
  },
  maximize: { paths: ["M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5"] },
  pause: { paths: ["M8 5v14M16 5v14"] },
  phone: {
    paths: [
      "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .35 1.98.65 2.92a2 2 0 0 1-.45 2.11l-1.28 1.28a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.94.3 1.92.52 2.92.65A2 2 0 0 1 22 16.92Z",
    ],
  },
  play: { paths: ["M8 5.8v12.4l10-6.2z"], fill: true },
  volume: {
    paths: [
      "M11 5 6.4 9H3v6h3.4l4.6 4V5Z",
      "M15.4 8.6a4.8 4.8 0 0 1 0 6.8",
      "M18.8 5.2a9.6 9.6 0 0 1 0 13.6",
    ],
  },
  volumeOff: {
    paths: ["M11 5 6.4 9H3v6h3.4l4.6 4V5Z", "M18 9l5 5M23 9l-5 5"],
  },
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
