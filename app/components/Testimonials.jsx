export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>
        Wat <span>vrienden</span> zeggen.
      </h2>
      <div className="testimonials__stage">
        <article className="quote quote--red">
          <span className="quote-mark">"</span>
          <p>
            Ami Amis vertaalde onze energie naar content die meteen juist
            voelde. Speels, helder en helemaal <em>on-brand</em>.
          </p>
          <strong>Tarzan en Jane</strong>
          <small>Binnenspeeltuin, Heusden-Zolder</small>
        </article>
        <article className="quote quote--white">
          <span className="quote-mark">"</span>
          <p>
            Scherp in ideeën, snel in uitvoering en altijd met een frisse blik.
            Een samenwerking die vanzelf aanvoelde.
          </p>
          <strong>X-Oats</strong>
        </article>
        <article className="quote quote--blue">
          <span className="quote-mark">"</span>
          <p>
            Ze denken mee, stellen de juiste vragen en maken content die mensen
            echt in beweging zet.
          </p>
          <strong>Stad Antwerpen</strong>
        </article>
        <a className="button button--black testimonials__button" href="#contact">
          Samen iets moois maken?
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </section>
  );
}
