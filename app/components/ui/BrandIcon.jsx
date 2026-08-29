import { assetPath } from "../../../src/lib/assetPath";

const brandIconMasks = {
  instagram: "/assets/social-icons/instagram-flaticon.png",
  linkedin: "/assets/social-icons/linkedin-flaticon.png",
  facebook: "/assets/social-icons/facebook-flaticon.png",
};

export default function BrandIcon({ className = "", name }) {
  const mask = brandIconMasks[name];

  if (!mask) {
    throw new Error(`Unknown brand icon: ${name}`);
  }

  return (
    <span
      aria-hidden="true"
      className={`brand-icon brand-icon--${name}${className ? ` ${className}` : ""}`}
      style={{ "--brand-icon-mask": `url("${assetPath(mask)}")` }}
    />
  );
}
