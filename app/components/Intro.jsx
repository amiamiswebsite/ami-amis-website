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
  ["grading", "blue"],
  ["productie", "orange"],
  ["VFX", "sky"],
  ["reclamespot", "cream"],
  ["screenwriting", "red"],
  ["….", "yellow"],
];

const homeTwoIntro = [
  "Je bedrijf doet zotte dingen… Maar weet de buitenwereld dat al?",
  "Wij zorgen ervoor dat je merk niet verloren loopt tussen kattenfilmpjes en saaie reclameblabla. Wij maken je verhaal scherper, sterker en een pak moeilijker te negeren. Want als er iets is waar wij niet tegen kunnen, dan is het slechte content!",
  "Als creatieve groeipartner denken we mee en zoeken we uit wat je merk nodig heeft voor meer visibiliteit.",
];

const homeTwoChallenges = [
  {
    title: "Te weinig werknemers?",
    copy: "Na onze employer branding krijg je mogelijks keuzestress door al die eindbaas-sollicitanten!",
  },
  {
    title: "Blijft je merk onder de radar?",
    copy: "We maken consistente social content die je zichtbaar én herkenbaar houdt.",
  },
  {
    title: "Is je product of dienst moeilijk uit te leggen?",
    copy: "Wij maken je boodschap ZO duidelijk zodat zelfs Joske van café De Schele Teen er een powerpointpresentatie van kan geven.",
  },
];

const homeTwoOutro = [
  "Zie ons als jouw creatieve compadre die luistert, meedenkt én jou volledig kan ontzorgen van al je marketingperikelen.",
  "Dus… Zullen we samen iets strafs van je merk maken?",
];

export default function Intro({ variant = "default" }) {
  const isHomeTwo = variant === "home2";
  const ctaLabel = isHomeTwo ? "Samen jouw merk doen groeien?" : "eens afspreken?";

  return (
    <section className={`intro ${isHomeTwo ? "intro--home-two" : ""}`} id="intro">
      <div className="intro__copy">
        <h1>
          {isHomeTwo ? (
            "Creatieve groeipartner"
          ) : (
            <>
              Video first marketing,
              <span>van A tot Z.</span>
            </>
          )}
        </h1>
        <div className="intro__body">
          {isHomeTwo ? (
            <>
              {homeTwoIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {homeTwoChallenges.map(({ title, copy }) => (
                <p className="intro__challenge" key={title}>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </p>
              ))}
              {homeTwoOutro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <div className={`intro__camera-wrap ${isHomeTwo ? "intro__globe-wrap" : ""}`}>
        {isHomeTwo ? (
          <div className="intro__globe-art" aria-hidden="true">
            <img
              className="intro__globe"
              src={assetPath("/assets/ami-amis-globe.svg")}
              alt=""
            />
          </div>
        ) : (
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
        )}
      </div>
      <a className="button button--red intro__camera-cta" href={assetPath("/contact/")}>
        {ctaLabel}
      </a>
      {!isHomeTwo ? (
        <div className="tag-cloud" aria-label="Diensten">
          {tags.map(([tag, color]) => (
            <span className={`tag tag--${color}`} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className="intro__mobile-cta-row">
        <a className="button button--red intro__mobile-cta" href={assetPath("/contact/")}>
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
