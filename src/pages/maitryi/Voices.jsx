import React from 'react';
import { url } from '../../paths';

// Two fleet owners, names first. Quotes verbatim from the testimonials on energyinmotion.in.
export default function Voices() {
  return (
    <section className="quotes sec" aria-labelledby="q-h">
      <div className="wrap">
        <h2 className="h2" id="q-h">Fleet owners who made the switch. <em>In their own words.</em></h2>
        <div className="quotes__grid">
          <figure className="quote quote--lg">
            <figcaption>
              <img src={url('assets/img/t-gurjeet.webp')} alt="" width="56" height="56" loading="lazy" />
              <span><b>Gurjeet Singh Bhatia</b>AVP, Transport Operations, Delhi International Cargo Terminal (J M Baxi Ports &amp; Logistics)</span>
            </figcaption>
            <blockquote>“…I also feel richer each time my vehicle enters into Delhi, as my EV trucks are exempted from paying Rs 4000/- NGT Tax per trip imposed by Delhi Govt for Diesel trucks.”</blockquote>
          </figure>
          <figure className="quote">
            <figcaption>
              <img src={url('assets/img/t-janardhan.webp')} alt="" width="56" height="56" loading="lazy" />
              <span><b>Janardhan Matre</b>Managing Director, JIVI Enterprises</span>
            </figcaption>
            <blockquote>“Our transition from ICE to EIM EVs has been a well-calculated strategic move, executed with remarkable efficiency. What truly differentiates EIM is not just the product, but the strength of their aftersales ecosystem.”</blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
