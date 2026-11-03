import React from 'react';
import { url } from '../../../paths';

// The proof, in one place: JNPA. Milestones from energyinmotion.in Events (15 Aug 2024 fast charger; 25 Sep 2025
// flag-off, 50 e-trucks per deck slide 30; 2 May 2026 largest station) and the NSDT release (1 Sep 2026 second
// station, EV Megaplex; nearly 150 EIM trucks within JNPA; 700+ trucks to be supported; JNPA's goal of full energy
// transition by December 2027). Beyond JNPA: Vitthal Wable's testimonial (website); port customers (deck slide 34,
// names as on the logos); J M Baxi ~2,000 55-tonne tractors (slide 10); Kandla, Mundra, Dahej by March 2027 (slide 25).
const STEPS = [
  { d: 'Aug 2024', t: 'India’s first high-capacity EV fast charger inside the port' },
  { d: 'Sep 2025', t: '50 e-trucks flagged off at JNPA' },
  { d: 'May 2026', t: 'India’s largest battery swapping and charging station' },
  { d: 'Sep 2026', t: 'Our second station, at NSDT: the first step of our EV Megaplex' },
  { d: 'Dec 2027', t: 'JNPA’s goal: full energy transition', next: true },
];
const LOGOS = [['vpa', 'Visakhapatnam Port Authority', 80], ['dpa', 'Deendayal Port Authority, Kandla', 64], ['vocpa', 'Tuticorin Port Trust', 66], ['jmbaxi', 'J M Baxi', 48]];

export default function Jnpa() {
  return (
    <section className="jp sec sec--mist" id="jnpa" aria-labelledby="jp-h">
      <div className="wrap">
        <h2 className="h2 jp__h" id="jp-h">Inside JNPA since 2024. <em>Nearly 150 of our trucks at work.</em></h2>

        <ol className="jp__rail" style={{ '--rail': '67%' }}>
          {STEPS.map((s) => (
            <li className={'jp__s' + (s.next ? ' jp__s--next' : '')} key={s.d}>
              <i className="jp__dot" aria-hidden="true" />
              <time>{s.d}</time>
              <p>{s.t}</p>
            </li>
          ))}
        </ol>

        <div className="jp__grid">
          <figure className="jp__img"><img src={url('assets/img/ind/p-flag.webp')} width="1664" height="1162" alt="Shri Sarbananda Sonowal flags off EIM e-trucks at Jawaharlal Nehru Port Authority, September 2025" loading="lazy" /></figure>
          <div className="jp__scale">
            <div className="jp__bar" role="img" aria-label="Nearly 150 EIM e-trucks operate within JNPA today; the EV Megaplex and our existing station will support 700 plus">
              <span className="jp__fill" style={{ '--w': 150 / 700 }} />
            </div>
            <div className="jp__nums">
              <p><b><small>Nearly</small>150</b><span>EIM e-trucks operating within JNPA</span></p>
              <p className="jp__to"><b>700+</b><span>heavy trucks our EV Megaplex and existing station will support</span></p>
            </div>
            <figure className="jp__q">
              <blockquote>&ldquo;I&rsquo;m amazed at the way EIM has created the charging infra in the JNPT eco-system comprising of multiple Swapping-cum-Charging stations &ndash; in terms of speed &amp; scale.&rdquo;</blockquote>
              <figcaption><b>Vitthal Wable</b>Director, Radiance Green Mobility and Jyothi Transport &amp; Freight Services</figcaption>
            </figure>
          </div>
        </div>

        <div className="jp__more">
          <p className="jp__lab">Port authorities and terminal operators among our customers</p>
          <ul className="jp__logos">
            {LOGOS.map(([k, alt, h]) => <li key={k}><img src={url('assets/brands/' + k + '.webp')} alt={alt} style={{ '--h': h + 'px' }} loading="lazy" /></li>)}
          </ul>
          <p className="jp__next">J M Baxi, our anchor customer, has about 2,000 55-tonne tractors deployed across its terminals, CFSs and ICDs. Next on our network: Kandla, Mundra and Dahej, by March 2027.</p>
        </div>
      </div>
    </section>
  );
}
