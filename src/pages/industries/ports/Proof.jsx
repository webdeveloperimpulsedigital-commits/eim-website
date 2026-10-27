import React from 'react';
import { url } from '../../../paths';

// The one section with the ground reality. energyinmotion.in events and news; slide 30 (50 e-trucks at JNPA);
// slide 10 (around 2,000 55-tonne tractors across J M Baxi facilities, the anchor customer); slide 25 (expansion
// by March 2027); slide 34 (port authority customers); Vitthal Wable's testimonial.
const NUMS = [
  { n: '50', d: 'e-trucks with swappable batteries flagged off at Jawaharlal Nehru Port Authority, September 2025' },
  { n: '2024', d: 'the year we opened the first high-capacity EV fast charger inside Jawaharlal Nehru Port' },
  { n: '2,000', pre: 'Around', d: '55-tonne tractors across the terminals, CFSs and ICDs of J M Baxi, our anchor customer' },
];
const SITES = [
  ['Jawaharlal Nehru Port', 'India’s largest battery swapping and charging station, May 2026'],
  ['Nhava Sheva Distribution Terminal', 'Our second heavy-duty swapping-cum-charging station'],
  ['Mumbai International Cargo Terminal', 'Our first commercial sale, August 2025'],
  ['Delhi International Cargo Terminal', 'India’s first public heavy-duty swapping and charging station, October 2025'],
  ['Mumbai Container Freight Station', 'CFS operations moved from ICE to EV with J M Baxi'],
];

export default function Proof() {
  return (
    <section className="pproof sec" id="proof" aria-labelledby="pp-h">
      <div className="wrap shead">
        <h2 className="h2" id="pp-h">Already at work in India&rsquo;s ports. <em>Here is the ground reality.</em></h2>
        <p className="lede">Ports are where we started. Here is where we run today, who we run with, and where we go next.</p>
      </div>

      <div className="wrap">
        <ul className="stats pproof__nums">
          {NUMS.map((x) => (
            <li className="stat" key={x.n}>
              <b>{x.pre && <small className="pre">{x.pre}</small>}{x.n}</b>
              <span>{x.d}</span>
            </li>
          ))}
        </ul>

        <div className="pproof__grid">
          <figure className="pproof__img"><img src={url('assets/img/ind/p-flag.webp')} width="1664" height="1162" alt="Shri Sarbananda Sonowal flags off EIM e-trucks at Jawaharlal Nehru Port Authority, September 2025" loading="lazy" /></figure>
          <div>
            <h3 className="reg__h">Where we run today</h3>
            <dl className="pproof__sites">
              {SITES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <p className="pproof__next"><b>Next on our map:</b> Kandla, Mundra and Dahej, by March 2027.</p>
          </div>
        </div>

        <div className="pproof__foot">
          <figure className="quote">
            <figcaption>
              <img src={url('assets/img/t-vitthal.webp')} alt="" width="56" height="56" loading="lazy" />
              <span><b>Vitthal Wable</b>Director, Radiance Green Mobility and Jyothi Transport &amp; Freight Services</span>
            </figcaption>
            <blockquote>&ldquo;As one of the early users of EIM vehicles at JNPT Port at Navi Mumbai, I&rsquo;m amazed at the way EIM has created the charging infra in the JNPT eco-system&hellip; in terms of speed &amp; scale.&rdquo;</blockquote>
          </figure>
          <div className="pproof__logos">
            <p className="reg__h">Port authorities and terminal operators among our customers</p>
            <ul>
              {[['dpa', 'Deendayal Port Authority, Kandla', 64], ['vocpa', 'V.O. Chidambaranar Port Authority, Tuticorin', 66], ['vpa', 'Visakhapatnam Port Authority', 80], ['jmbaxi', 'J M Baxi', 48]].map(([k, alt, h]) => (
                <li key={k}><img src={url('assets/brands/' + k + '.webp')} alt={alt} style={{ '--h': h + 'px' }} loading="lazy" /></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
