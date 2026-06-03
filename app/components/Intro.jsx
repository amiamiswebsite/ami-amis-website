import { assetPath } from "../../src/lib/assetPath";

const tags = [
  ["Marketing", "red"],
  ["Video", "yellow"],
  ["Screenwriting", "blue"],
  ["Productie", "orange"],
  ["Copywriting", "sky"],
  ["Webdesign", "cream"],
  ["Fotografie", "red"],
  ["Videografie", "yellow"],
  ["Montage", "blue"],
  ["Animatie", "orange"],
  ["Social media content", "sky"],
  ["Grafisch design", "cream"],
  ["Audio", "red"],
  ["Mixage", "yellow"],
  ["Grading", "blue"],
  ["Branding", "orange"],
  ["Shortform", "sky"],
  ["Vertical video", "cream"],
  ["VFX", "red"],
  ["Campagnes", "yellow"],
  ["Reclamespot", "blue"],
  ["….", "orange"],
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
          Als marketing agency weten we hoe je een boodschap doet binnenkomen.
          Storytelling is daarin onze sterkte. We vertalen ideeën naar verhalen
          die blijven hangen, overtuigen en mensen meenemen. En video speelt
          daar een grote rol in. Omdat het beeld en geluid combineert, geeft
          video je de kans om je publiek écht mee te trekken in wat je wil
          vertellen. Maar voor ons stopt het niet bij een goeie video. We denken
          mee over de strategie erachter: welke boodschap je brengt, hoe je die
          het best inzet, waar je die verspreidt, hoe je je kanalen organisch
          laat groeien en ZO VEEL MEER. Alles hier in woorden uitleggen vinden
          we daarom niet nodig. Scroll gerust verder en ontdek het zelf.
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
