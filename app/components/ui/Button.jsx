export function Button({ className = "", tone = "primary", type = "button", ...props }) {
  return (
    <button
      className={`aa-button aa-button--${tone} ${className}`.trim()}
      type={type}
      {...props}
    />
  );
}

export function ButtonLink({ className = "", tone = "primary", ...props }) {
  return <a className={`aa-button aa-button--${tone} ${className}`.trim()} {...props} />;
}
