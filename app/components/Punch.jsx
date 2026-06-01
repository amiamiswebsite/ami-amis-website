const audiences = ["KMO's", "Creatieve bureaus", "Organisaties", "..."];

export default function Punch() {
  return (
    <section className="punch" id="diensten">
      <div className="punch__inner">
        <img className="punch__crack" src="/assets/crack.png" alt="" />
        <img className="punch__man" src="/assets/punch-man.png" alt="" />
        <div className="punch__copy">
          <h2>Content met punch</h2>
          <p>
            Voor <span>alle</span> merken
            <br />
            die durven.
          </p>
          <div className="audience-row" aria-label="Doelgroepen">
            {audiences.map((audience, index) => (
              <span className={`audience audience--${index + 1}`} key={audience}>
                {audience}
              </span>
            ))}
          </div>
          <a className="button button--red punch__button" href="#contact">
            Eens afspreken?
          </a>
        </div>
      </div>
    </section>
  );
}
