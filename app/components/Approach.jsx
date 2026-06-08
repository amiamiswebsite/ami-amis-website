import { assetPath } from "../../src/lib/assetPath";

const steps = [
  {
    number: "1.",
    title: "Hallo, met Brent?",
    text: "Alles begint met een gesprekje met Brent, onze immer goedgehumeurde sales-kapoen. Geen stijve intake, gewoon een vlot constructief gesprek.",
    src: assetPath("/assets/approach-01-call.png"),
    className: "approach-card--coffee",
  },
  {
    number: "2.",
    title: "Sparren met Creative",
    text: "Daarna zet Brent een meeting op met de juiste creative voor jullie merk. Dan begint de fun. In een brainstorm leggen we onze ideeën op tafel en luisteren we naar die van jullie.",
    src: assetPath("/assets/approach-02-spar.png"),
    className: "approach-card--spar",
  },
  {
    number: "3.",
    title: "Plan",
    text: "Tijd om het concreet te maken. Onze creatives zetten de puntjes op de i, onze producers nemen over en leiden de voorbereiding in goede banen.",
    src: assetPath("/assets/approach-03-plan.png"),
    className: "approach-card--plan",
  },
  {
    number: "4.",
    title: "Lights. Camera. Action",
    text: "Time for action. Video, fotografie, design, animatie, audio of een volledige campagne: ons in-house team brengt het plan tot leven.",
    src: assetPath("/assets/approach-03-camera.png"),
    className: "approach-card--action",
  },
  {
    number: "5.",
    title: "Watch Party",
    text: "Opleveren die handel! Pak de popcorn er maar bij, want het eindproduct is klaar. En wij verzekeren jullie: da’s goeie shit.",
    src: assetPath("/assets/approach-04-watch.png"),
    className: "approach-card--watch",
  },
  {
    number: "6.",
    title: "Hallo, Brent nog eens!",
    text: "Na afloop koppelt onze guitige schavuit Brent nog eens terug. Dat is wat Amis doen, toch?",
    src: assetPath("/assets/approach-05-callback.png"),
    className: "approach-card--callback",
  },
];

const personalWord = "persoonlijke".split("");

export default function Approach() {
  return (
    <section className="approach" id="aanpak">
      <h2 aria-label="Onze persoonlijke aanpak">
        <span aria-hidden="true">Onze </span>
        <span className="approach-wave" aria-hidden="true">
          {personalWord.map((letter, index) => (
            <span className="approach-wave__char" key={`${letter}-${index}`}>
              {letter}
            </span>
          ))}
        </span>
        <span aria-hidden="true"> aanpak</span>
      </h2>
      <div className="approach__grid">
        {steps.map((step) => (
          <article className={`approach-card ${step.className}`} key={step.title}>
            {step.src ? (
              <img src={step.src} alt="" />
            ) : step.visual ? (
              <span className={`approach-placeholder approach-placeholder--${step.visual}`} aria-hidden="true" />
            ) : (
              <span className="burst" aria-hidden="true" />
            )}
            <h3>
              <span className="approach-card__number">{step.number}</span>
              <span>{step.title}</span>
            </h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
