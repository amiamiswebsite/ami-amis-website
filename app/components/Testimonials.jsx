const testimonials = [
  {
    quote: "Scherp in ideeën, snel in uitvoering en altijd met een frisse blik. Een samenwerking die vanzelf aanvoelde.",
    client: "X-Oats",
    href: "/work/x-oats/",
    variant: "quote--white",
  },
  {
    quote: (
      <>
        Ami Amis vertaalde onze energie naar content die meteen juist voelde. Speels, helder en helemaal <em>on-brand</em>.
      </>
    ),
    client: "Tarzan en Jane",
    href: "/work/tarzan-en-jane/",
    variant: "quote--red",
  },
  {
    quote: "Ze denken mee, stellen de juiste vragen en maken content die mensen echt in beweging zet.",
    client: "Visit Antwerpen",
    href: "/work/visit-antwerpen/",
    variant: "quote--blue",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>
        Wat <span>vrienden</span> zeggen.
      </h2>
      <div className="testimonials__stage">
        {testimonials.map((item) => (
          <a
            aria-label={`Bekijk de case van ${item.client}`}
            className={`quote ${item.variant}`}
            href={item.href}
            key={item.client}
          >
            <span className="quote-mark">"</span>
            <p>{item.quote}</p>
            <span className="quote__footer">
              <span className="quote__case-link">zie case</span>
              <strong>{item.client}</strong>
            </span>
          </a>
        ))}
        <a className="button button--black testimonials__button" href="#contact">
          Samen iets moois maken?
        </a>
      </div>
    </section>
  );
}
