import { assetPath } from "../../src/lib/assetPath";

const testimonials = [
  {
    quote:
      "Wat ons vooral opviel, was hoe creatief én professioneel ze te werk gaan. Ze denken niet gewoon uit wat je vraagt, maar komen zelf met sterke ideeën en hooks die echt werken voor social ads.",
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
            href={assetPath(item.href)}
            key={item.client}
          >
            <span className="quote-mark">"</span>
            <p>{item.quote}</p>
            <span className="quote__footer">
              <span className="quote__case-link">
                <span>zie case</span>
              </span>
              <strong>{item.client}</strong>
            </span>
          </a>
        ))}
        <a className="button button--black testimonials__button" href={assetPath("/contact/")}>
          vrienden worden?
        </a>
      </div>
    </section>
  );
}
