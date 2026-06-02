import { assetPath } from "../../src/lib/assetPath";

const audiences = ["KMO's", "Creatieve bureaus", "Organisaties", "..."];
const rotatingWords = ["MERKEN", "KMO’S", "CREATIVES", "PARTNERS"];

export default function Punch() {
  return (
    <section className="punch" id="diensten">
      <div className="punch__inner">
        <img className="punch__crack" src={assetPath("/assets/crack.png")} alt="" />
        <img className="punch__man" src={assetPath("/assets/punch-elena.png")} alt="" />
        <div className="punch__copy">
          <h2>Content met punch</h2>
          <p className="punch__line" aria-hidden="true">
            <span className="punch__line-row">
              <span>Voor</span>
              <span className="punch__accent">alle</span>
              <span className="punch__word-window">
                <span className="punch__word-track">
                  {rotatingWords.map((word, index) => (
                    <span className="punch__word" key={`${word}-${index}`}>
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </span>
            <span className="punch__line-tail">die durven.</span>
          </p>
          <p className="sr-only">Voor alle merken die durven.</p>
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
