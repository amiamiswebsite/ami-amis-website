export default function BrandIcon({ className = "", name }) {
  if (name === "instagram") {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17" cy="7" r="1.1" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6.2 9.6h3.1V19H6.2z" />
        <path d="M7.8 5a1.8 1.8 0 1 1 0 3.6A1.8 1.8 0 0 1 7.8 5z" />
        <path d="M11.3 9.6h3v1.3c.6-.9 1.5-1.6 3.1-1.6 2.4 0 4 1.5 4 4.6V19h-3.1v-4.7c0-1.4-.6-2.2-1.8-2.2-1.3 0-2.1.9-2.1 2.4V19h-3.1z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14.3 8.1h2.2V4.4c-.4 0-1.7-.1-3.2-.1-3.1 0-5.2 1.9-5.2 5.4v3H4.7v4.1h3.4V24h4.2v-7.2h3.4l.5-4.1h-3.9V10c0-1.2.3-1.9 2-1.9z" />
      </svg>
    );
  }

  throw new Error(`Unknown brand icon: ${name}`);
}
