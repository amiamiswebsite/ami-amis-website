import { forwardRef } from "react";

export function ImageMedia({ alt, decoding = "async", loading = "lazy", ...props }) {
  return <img alt={alt} decoding={decoding} loading={loading} {...props} />;
}

export const VideoMedia = forwardRef(function VideoMedia(
  { "aria-label": ariaLabel, playsInline = true, preload = "none", ...props },
  ref,
) {
  return (
    <video
      aria-label={ariaLabel}
      playsInline={playsInline}
      preload={preload}
      ref={ref}
      {...props}
    />
  );
});

export function MediaFrame({
  as: Element = "figure",
  aspect = "auto",
  caption,
  children,
  className = "",
  style,
  ...props
}) {
  return (
    <Element
      className={`aa-media-frame ${className}`.trim()}
      style={{ "--aa-media-aspect": aspect, ...style }}
      {...props}
    >
      {children}
      {caption ? <figcaption className="aa-media-frame__caption">{caption}</figcaption> : null}
    </Element>
  );
}
