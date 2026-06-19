import { assetPath } from "../../src/lib/assetPath";

const tags = [
  ["Marketing", "red"],
  ["video", "yellow"],
  ["videografie", "blue"],
  ["montage", "orange"],
  ["copywriting", "sky"],
  ["campagnes", "cream"],
  ["social media content", "red"],
  ["grafisch design", "yellow"],
  ["webdesign", "blue"],
  ["fotografie", "orange"],
  ["animatie", "sky"],
  ["short form content", "cream"],
  ["audio design", "red"],
  ["audio engineering", "yellow"],
  ["grading", "blue"],
  ["productie", "orange"],
  ["VFX", "sky"],
  ["reclamespot", "cream"],
  ["screenwriting", "red"],
  ["….", "yellow"],
];

export default function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="intro__copy">
        <h1>
          Video first marketing,
          <span>van A tot Z.</span>
        </h1>
        <div className="intro__body">
          <p>
            Als marketing agency weten we hoe je een boodschap laat binnenkomen.
            Storytelling is our middle name. Van strategie tot productie,
            distributie en organische groei: wij denken mee over het volledige
            plaatje.
          </p>
          <p>
            Video? Grote fan! Vandaag is het een van de krachtigste manieren om
            mensen te raken, te overtuigen en in beweging te krijgen. Wil je je
            publiek bereiken via andere kanalen? No problemo, mon ami. We doen
            het allemaal.
          </p>
          <p>Scroll verder en ontdek wat we voor je kunnen doen.</p>
        </div>
      </div>
      <div className="intro__camera-wrap">
        <div className="intro__camera-art" aria-hidden="true">
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
        <a className="button button--red intro__camera-cta" href={assetPath("/contact/")}>
          eens samenwerken?
        </a>
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
