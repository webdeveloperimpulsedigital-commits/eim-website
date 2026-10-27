import React from 'react';
import { url } from '../../paths';

// After-sales. All of it from energyinmotion.in: the service team (24x7), mobile service vans,
// porta-cabin workshops, and Ajit Kumar Singh's testimonial.
const ITEMS = [
  { t: 'A service team, 24x7', d: 'Our service team works around the clock, across many locations in India.' },
  { t: 'Mobile service vans', d: 'Ready to reach your trucks whenever you need help.' },
  { t: 'Porta-cabin workshops', d: 'Well equipped with specialised tools and spare parts, to keep your trucks running.' },
];

export default function Care() {
  return (
    <section className="care sec" id="service" aria-labelledby="care-h">
      <div className="wrap shead">
        <h2 className="h2" id="care-h">Kept running. <em>Around the clock.</em></h2>
        <p className="lede">An electric truck should never mean waiting for help. Our service team, vans and workshops keep yours on the road.</p>
      </div>
      <div className="wrap care__grid">
        <ol className="care__items" data-stagger>
          {ITEMS.map((it, i) => (
            <li key={it.t}>
              <span className="care__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </li>
          ))}
        </ol>
        <figure className="quote care__quote">
          <figcaption>
            <img src={url('assets/img/t-ajit.webp')} alt="" width="56" height="56" loading="lazy" />
            <span><b>Ajit Kumar Singh</b>CFS Head, Mumbai Container Freight Station, J M Baxi Container Holdings</span>
          </figcaption>
          <blockquote>“…EIM's Aftersales team has demonstrated exceptional ownership, providing timely field support, fast issue resolution, and continuous technical assistance. Their dedication has enabled us to maintain high fleet uptime.”</blockquote>
        </figure>
      </div>
    </section>
  );
}
