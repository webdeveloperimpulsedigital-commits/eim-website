import React from 'react';
import { url } from '../../paths';

// One station, two ways to fill up. Swap: slides 15 and 16, energyinmotion.in ("automated battery exchange").
// Charge: slides 15 and 19; JNPT's first high-capacity fast charger (August 2024) and the HPCL partnership
// from energyinmotion.in. Quote: Vitthal Wable, energyinmotion.in testimonials, verbatim.
export default function TwoWays() {
  return (
    <section className="ways sec sec--mist" aria-labelledby="ways-h">
      <div className="wrap shead">
        <h2 className="h2" id="ways-h">Two ways to fill up. <em>One station.</em></h2>
        <p className="lede">Every station we build swaps and charges. An ASHWA swaps, any other commercial EV charges, and both are back on the road.</p>
      </div>

      <div className="wrap ways__grid" data-stagger>
        <article className="way">
          <figure className="way__img"><img src={url('assets/img/swap/s-swap.webp')} width="1600" height="1200" alt="Two ASHWA e-tractors at an EIM battery swap station" loading="lazy" /></figure>
          <p className="way__lab">Swap · for ASHWA</p>
          <h3 className="way__h">A charged pack in under 7 minutes.</h3>
          <ul className="way__pts">
            <li>Automated: the truck parks in the bay, the drained pack lifts out and a charged one goes in</li>
            <li>The drained pack charges inside the station, ready for the next truck</li>
            <li>One station keeps up to 100 e-tractors a day moving</li>
            <li>Swaps and charging scheduled through our fleet software</li>
          </ul>
        </article>
        <article className="way">
          <figure className="way__img"><img src={url('assets/img/swap/s-charge.webp')} width="900" height="600" alt="DC fast chargers at an EIM station on the day they were opened" loading="lazy" /></figure>
          <p className="way__lab">Charge · any brand</p>
          <h3 className="way__h">CCS2 DC fast charging, for every commercial EV.</h3>
          <ul className="way__pts">
            <li>High-capacity chargers on the national CCS2 standard</li>
            <li>An ASHWA pack charges from 20 to 100% in about 60 minutes</li>
            <li>We opened the first high-capacity EV fast charger inside Jawaharlal Nehru Port in August 2024</li>
            <li>With HPCL, we are setting up charging and swapping at retail outlets across India</li>
          </ul>
        </article>
      </div>

      <div className="wrap">
        <figure className="quote ways__quote">
          <figcaption>
            <img src={url('assets/img/t-vitthal.webp')} alt="" width="56" height="56" loading="lazy" />
            <span><b>Vitthal Wable</b>Director, Radiance Green Mobility and Jyothi Transport &amp; Freight Services</span>
          </figcaption>
          <blockquote>“As one of the early users of EIM vehicles at JNPT Port at Navi Mumbai, I’m amazed at the way EIM has created the charging infra in the JNPT eco-system comprising of multiple Swapping-cum-Charging stations - in terms of speed &amp; scale.”</blockquote>
        </figure>
      </div>
    </section>
  );
}
