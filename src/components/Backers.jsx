import React from 'react';

export default function Backers() {
  const handleAnchorClick = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -70, duration: 1.6 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className="back sec" id="backers" aria-labelledby="back-h">
      <div className="wrap">
        <h2 className="h2" id="back-h">
          Backed by people who know energy and know ports.
        </h2>
        <div className="back__grid">
          <article className="bcard">
            <img
              className="bcard__logo"
              src="assets/logos/ravindra.webp"
              alt="Ravindra Energy Limited"
              loading="lazy"
            />
            <h3>The energy side</h3>
            <p>
              EIM is an associate company of Ravindra Energy Limited, a listed renewable energy business supplying green power to corporates through solar, wind and battery storage, and energy trading. Its experience with land, grid connections and small solar plants goes straight into building our stations.
            </p>
          </article>
          <article className="bcard">
            <img
              className="bcard__logo"
              src="assets/brands/jmbaxi.webp"
              alt="J M Baxi Group"
              loading="lazy"
            />
            <h3>The freight side</h3>
            <p>
              The J M Baxi Group is a 108-year-old ports and logistics group running container and multi-cargo terminals, CFSs, ICDs and rail logistics, with around 2,000 55-tonne tractors working across its facilities.
            </p>
          </article>
          <article className="bcard bcard--img">
            <img src="assets/img/truck-hall.webp" alt="ASHWA e-tractor in the assembly hall" loading="lazy" />
            <div>
              <h3>The truck side</h3>
              <p>
                Six years of exclusive rights to assemble, market and distribute Foton commercial vehicles above 18 tonnes in India, assembled at our Talegaon plant.
              </p>
            </div>
          </article>
        </div>
        <div className="lead">
          <img src="assets/img/narendra.webp" alt="Narendra Murkumbi" loading="lazy" />
          <p>
            <b>Led by Narendra Murkumbi, Managing Director.</b> Founder of Shree Renuka Sugars and Vice Chairman of Ravindra Energy, with a leadership team drawn from Ashok Leyland, Tata Motors, LafargeHolcim, Olectra and J M Baxi.
          </p>
          <a className="link" href="#backers" onClick={(e) => handleAnchorClick(e, '#backers')}>
            Meet the leadership <svg><use href="#arrow" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
