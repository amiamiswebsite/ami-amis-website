import { assetPath } from "../../src/lib/assetPath";

const highlightedCases = [
  {
    client: "Visit Antwerpen",
    type: "Videocampagne",
    title: "Cultuur in 12 uur",
    description: "Een cultuurroute door Antwerpen, snel gemonteerd en social-first gebracht.",
    image: "/work/sint-jan.webp",
    href: "/work/visitantwerp/",
    accent: "blue",
    rotate: "-1.4deg",
  },
  {
    client: "VDAB",
    type: "Social content",
    title: "Content zonder gedoe",
    description: "Een aanpak die snel schakelt en toch helder blijft hangen.",
    image: "/work/vdab.webp",
    href: "#werk",
    accent: "yellow",
    rotate: "1.2deg",
  },
  {
    client: "PlugInvest",
    type: "Marketingstrategie",
    title: "Een verhaal met vertrouwen",
    description: "Van losse boodschap naar een plan dat mensen durven volgen.",
    image: "/work/pluginvest.webp",
    href: "#werk",
    accent: "red",
    rotate: "-0.7deg",
  },
  {
    client: "K.Lierse S.K.",
    type: "Brand film",
    title: "Clubgevoel op beeld",
    description: "Content die supporters meeneemt zonder het verhaal te verliezen.",
    image: "/work/lierse.webp",
    href: "#werk",
    accent: "blue",
    rotate: "1.6deg",
  },
  {
    client: "FRISK",
    type: "Branding",
    title: "Een merk met karakter",
    description: "Een visuele richting die fris voelt, maar niet braaf wordt.",
    image: "/work/frisk.webp",
    href: "#werk",
    accent: "yellow",
    rotate: "-1deg",
  },
  {
    client: "Konligo",
    type: "B2B video",
    title: "Techniek met goesting",
    description: "Een technisch verhaal vertaald naar beeld dat meteen klikt.",
    image: "/work/konligo.webp",
    href: "#werk",
    accent: "red",
    rotate: "0.9deg",
  },
];

const accentColors = {
  blue: "var(--blue)",
  red: "var(--red)",
  yellow: "var(--yellow)",
};

function caseHref(href) {
  if (href.startsWith("#") || href.startsWith("http")) {
    return href;
  }

  return assetPath(href);
}

function HighlightDossierCard({ item, index }) {
  const href = caseHref(item.href);

  return (
    <article
      className={`highlight-dossier-card highlight-dossier-card--${item.accent}`}
      style={{
        "--case-accent": accentColors[item.accent] || "var(--blue)",
        "--case-photo-rotate": item.rotate,
        "--case-delay": `${Math.min(index, 5) * 70}ms`,
      }}
    >
      <a className="highlight-dossier-card__photo" href={href} aria-label={`Bekijk case van ${item.client}`}>
        <span className="highlight-dossier-card__tape" aria-hidden="true" />
        <img src={assetPath(item.image)} alt={`${item.client} projectbeeld`} loading="lazy" decoding="async" />
      </a>
      <div className="highlight-dossier-card__body">
        <p className="highlight-dossier-card__type">{item.type}</p>
        <h3>{item.client}</h3>
        <p className="highlight-dossier-card__description">{item.description}</p>
        <a className="highlight-dossier-card__cta" href={href}>
          Bekijk case <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </article>
  );
}

export default function HighlightDossierSection() {
  return (
    <>
      {/* Start highlight dossier experiment */}
      <section className="highlight-dossier-experiment" id="highlight-dossier-experiment">
        <div className="highlight-dossier-experiment__inner">
          <div className="highlight-dossier-experiment__header">
            <p className="highlight-dossier-experiment__label">Nieuwe versie / test</p>
            <span>IN DE KIJKER</span>
            <h2>Werk dat bleef hangen.</h2>
            <p>
              Een selectie van campagnes, video&apos;s en content die we met plezier hebben
              vastgepakt.
            </p>
          </div>

          <div className="highlight-dossier-grid" aria-label="Nieuwe portfolio highlight test">
            {highlightedCases.map((item, index) => (
              <HighlightDossierCard item={item} index={index} key={item.client} />
            ))}
          </div>
        </div>
      </section>
      {/* End highlight dossier experiment */}
    </>
  );
}
