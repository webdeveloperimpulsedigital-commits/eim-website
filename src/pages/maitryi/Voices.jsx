import React from 'react';
import { url } from '../../paths';

// Fleet owners, names first. Quotes verbatim from the testimonials on energyinmotion.in.
export default function Voices() {
  return (
    <section className="quotes sec" aria-labelledby="q-h">
      <div className="wrap">
        <h2 className="h2" id="q-h">Fleet owners who made the switch. <em>In their own words.</em></h2>
        <div className="quotes__grid">
          <figure className="quote">
            <figcaption>
              <img src={url('assets/img/t-vitthal.webp')} alt="" width="56" height="56" loading="lazy" />
              <span><b>Vitthal Wable</b>Director, Radiance Green Mobility Pvt. Ltd., Jyothi Transport &amp; Freight Services Pvt. Ltd.</span>
            </figcaption>
            <blockquote>“As one of the early users of EIM vehicles at JNPT Port at Navi Mumbai, I’m amazed at the way EIM has created the charging infra in the JNPT eco-system comprising of multiple Swapping-cum-Charging stations - in terms of speed &amp; scale. Looking at current oil prices, I feel lucky I switched to EV early.”</blockquote>
          </figure>
          <figure className="quote">
            <figcaption>
              <img src={url('assets/img/t-janardhan.webp')} alt="" width="56" height="56" loading="lazy" />
              <span><b>Mr. Janardhan Matre</b>Managing Director, JIVI ENTERPRISES</span>
            </figcaption>
            <blockquote>“Our transition from ICE to EIM EVs has been a well-calculated strategic move, executed with remarkable efficiency. What truly differentiates EIM is not just the product, but the strength of their aftersales ecosystem. Their team has consistently ensured high fleet uptime, swift issue resolution, and a proactive approach to maintenance. EIM has proven to be a dependable long-term partner in our journey towards sustainable mobility.”</blockquote>
          </figure>
          <figure className="quote">
            <figcaption>
              <img src={url('assets/img/t-gurjeet.webp')} alt="" width="56" height="56" loading="lazy" />
              <span><b>Gurjeet Singh Bhatia</b>AVP - Transport Operations - Delhi International Cargo Terminal Private Limited (J M Baxi Ports &amp; Logistics Private Limited)</span>
            </figcaption>
            <blockquote>“By deploying EIM vehicles in NCR region, not only do I feel proud to be contributing to a Greener Environment, but I also feel richer each time my vehicle enters into Delhi, as my EV trucks are exempted from paying Rs 4000/- NGT Tax per trip imposed by Delhi Govt for Diesel trucks.”</blockquote>
          </figure>
          <figure className="quote">
            <figcaption>
              <img src={url('assets/img/t-ajit.webp')} alt="" width="56" height="56" loading="lazy" />
              <span><b>Mr. Ajit Kumar Singh</b>CFS Head, Mumbai Container Freight Station, J M Baxi Container Holdings Pvt Ltd.</span>
            </figcaption>
            <blockquote>“Choosing Energy In Motion Ltd. for our transition from ICE to EV has proven to be the right decision. Beyond delivering reliable electric vehicles, EIM's Aftersales team has demonstrated exceptional ownership, providing timely field support, fast issue resolution, and continuous technical assistance. Their dedication has enabled us to maintain high fleet uptime while confidently embracing a cleaner and more sustainable future.”</blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
