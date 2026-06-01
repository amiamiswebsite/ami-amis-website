import { assetPath } from "../../src/lib/assetPath";

const tags = [
  ["Marketing agency", "red"],
  ["Video agency", "yellow"],
  ["Video marketing", "blue"],
  ["Video productie", "orange"],
  ["Social media marketing", "sky"],
  ["Content marketing", "cream"],
  ["Fotografie", "red"],
  ["Grafisch design", "yellow"],
  ["Animatie", "blue"],
  ["Audio", "orange"],
  ["Copywriting", "sky"],
  ["Branding", "cream"],
  ["Campaigns", "red"],
  ["Reclamespot", "yellow"],
  ["Social content", "blue"],
  ["Vertical video", "orange"],
  ["Shortform video", "sky"],
  ["Marketingstrategie", "cream"],
  ["Contentstrategie", "red"],
  ["Postproductie", "yellow"],
  ["Montage", "blue"],
  ["VFX", "orange"],
  ["Motion design", "yellow"],
  ["Websitecreatie", "sky"],
  ["Website-optimalisatie", "cream"],
];

export default function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="intro__copy">
        <h1>
          Video first marketing,
          <span>van A tot Z.</span>
        </h1>
        <p>
          We vertrekken vanuit video, maar denken verder dan een post, een
          campagne of een format. We helpen merken met strategie, concept,
          productie, montage, fotografie, design, audio, animatie, copy, social
          content en marketing. Alles wat nodig is om je verhaal helder,
          creatief en consistent naar buiten te brengen.
        </p>
      </div>
      <div className="intro__camera-wrap" aria-hidden="true">
        <div className="intro__action-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <img className="intro__camera" src={assetPath("/assets/hand-camera.png")} alt="" />
      </div>
      <div className="tag-cloud" aria-label="Diensten">
        {tags.map(([tag, color]) => (
          <span className={`tag tag--${color}`} key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
