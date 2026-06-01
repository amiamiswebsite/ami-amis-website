const steps = [
  {
    number: "1.",
    title: "Koffie",
    src: "/assets/coffee.png",
    className: "approach-card--coffee",
  },
  {
    number: "2.",
    title: "Sparren",
    src: "/assets/spar-man.png",
    className: "approach-card--spar",
  },
  {
    number: "3.",
    title: "Actie",
    src: null,
    className: "approach-card--action",
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
            ) : (
              <span className="burst" aria-hidden="true" />
            )}
            <h3>
              {step.number}
              <span>{step.title}</span>
            </h3>
            <p>aan te leveren</p>
          </article>
        ))}
      </div>
    </section>
  );
}
