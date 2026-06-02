import { assetPath } from "../../src/lib/assetPath";

const steps = [
  {
    number: "1.",
    title: "Hallo, met Brent?",
    text: "Een samenwerking met Ami Amis start bij onze sales bruur Brent. In dat eerste telefoontje probeert hij een visie te krijgen op wie jullie zijn, en wat jullie nodig hebben.",
    src: assetPath("/assets/coffee.png"),
    className: "approach-card--coffee",
  },
  {
    number: "2.",
    title: "Sparren met Creative",
    text: "Hierna zet Brent een meeting op met de juiste creative voor jouw merk. Nu begint de fun. In een brainstormmeeting leggen we al onze ideetjes voor en luisteren we naar de jouwe. Zo draaien we al onze neuzen in de juiste richting.",
    src: assetPath("/assets/spar-man.png"),
    className: "approach-card--spar",
  },
  {
    number: "3.",
    title: "Lights. Camera. Action",
    text: "Time for action. Wij werken jouw visie uit tot een video, een marketingstrategie, een campagne of iets anders.",
    src: assetPath("/assets/hand-camera.png"),
    className: "approach-card--action",
  },
  {
    number: "4.",
    title: "Watch Party",
    text: "Pak je popcorn maar bij de hand. je eindproduct is klaar! En wij verzekeren u, da's goeie shit.",
    visual: "popcorn",
    className: "approach-card--watch",
  },
  {
    number: "5.",
    title: "Hallo, Brent nog eens!",
    text: "En zoals elk mooi verhaal, eindigen we opnieuw bij het begin. Brent belt jullie nog eens op om te zien hoe jullie het Ami Amis-avontuur hebben ervaren, en hoe wij jou verder nog kunnen helpen!",
    visual: "callback",
    className: "approach-card--callback",
  },
];

export default function Approach() {
  return (
    <section className="approach" id="aanpak">
      <h2>
        Onze <span>persoonlijke</span> aanpak
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
              {step.number}
              <span>{step.title}</span>
            </h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
