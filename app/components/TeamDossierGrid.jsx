import { assetPath } from "../../src/lib/assetPath";

export function TeamDossierCard({ profile, index = 0 }) {
  const photoStyle = {
    "--dossier-photo-position": profile.objectPosition || "50% 50%",
    "--card-delay": `${Math.min(index, 8) * 42}ms`,
  };
  const favoriteFilm = profile.favoriteFilm || "Alien 2";

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

      <div className="team-dossier-card__body" aria-label={`${profile.name}, ${profile.role}, favoriete film: ${favoriteFilm}`}>
        <h3>{profile.name}</h3>
        <p className="team-dossier-card__role">{profile.role}</p>
        <p className="team-dossier-card__favorite" aria-label={`Favoriete film: ${favoriteFilm}`}>
          <span>Favoriete film:</span>
          {" "}
          {favoriteFilm}
        </p>
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
