import { assetPath } from "../../src/lib/assetPath";

export function TeamDossierCard({ profile, index = 0 }) {
  const photoStyle = {
    "--dossier-photo-position": profile.objectPosition || "50% 50%",
    "--dossier-photo-rotate": profile.tilt || (index % 2 === 0 ? "-2deg" : "2deg"),
    "--mugshot-plaque-rotate": index % 2 === 0 ? "-3.2deg" : "2.6deg",
    "--card-delay": `${Math.min(index, 8) * 42}ms`,
  };

  return (
    <article className="team-dossier-card" id={profile.slug} style={photoStyle}>
      <figure className="team-dossier-card__photo-wrap">
        <img
          className="team-dossier-card__photo"
          src={assetPath(profile.image)}
          alt={profile.alt || profile.name}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
        />
      </figure>

      <div className="team-dossier-card__body" aria-label={`${profile.name}, ${profile.role}, ${profile.line || profile.charge}`}>
        <h3>{profile.name}</h3>
        <p className="team-dossier-card__role">{profile.role}</p>
        <p className="team-dossier-card__line">{profile.line || profile.charge}</p>
      </div>
    </article>
  );
}

export default function TeamDossierGrid({ profiles }) {
  return (
    <div className="team-dossier-grid team-rail-track">
      {profiles.map((profile, index) => (
        <TeamDossierCard index={index} key={profile.slug || profile.name} profile={profile} />
      ))}
    </div>
  );
}
