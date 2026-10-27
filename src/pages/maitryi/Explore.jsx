import React from 'react';
import { url, PAGES } from '../../paths';

// Index list: the rest of the system. On desktop, hovering a row shows its picture in the frame
// beside the list; on touch screens the rows are plain links.
const ITEMS = [
  { t: 'ASHWA e-tractor', d: 'The 55-tonne battery-swappable prime mover.', href: PAGES.ashwa, img: 'assets/img/mai/m-ashwa.webp' },
  { t: 'Swapping and charging', d: 'A swap in under 7 minutes, and CCS2 fast charging for any brand.', href: PAGES.swap, img: 'assets/img/mai/m-swap.webp' },
  { t: 'Network', d: 'Swap stations existing, upcoming and planned across India.', href: PAGES.swap + '#network', img: 'assets/img/station-sky.webp' },
  { t: 'After-sales service', d: 'Service teams, mobile vans and workshops, 24x7.', href: PAGES.ashwa + '#service', img: 'assets/img/truck-hall.webp' },
];

export default function Explore() {
  return (
    <section className="idx sec" aria-labelledby="idx-h">
      <div className="wrap idx__grid">
        <div className="idx__main">
          <h2 className="h2" id="idx-h">Maitryi runs on the rest of EIM. <em>See how it fits.</em></h2>
          <ul className="idx__list">
            {ITEMS.map((it, i) => (
              <li key={i}>
                <a className="idx__row" href={url(it.href)} data-i={i}>
                  <span className="idx__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="idx__t">{it.t}</span>
                  <span className="idx__d">{it.d}</span>
                  <svg className="idx__go"><use href="#arrow" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="idx__peek" aria-hidden="true">
          {ITEMS.map((it, i) => (
            <img key={i} className={i === 0 ? 'is-on' : ''} data-i={i} src={url(it.img)} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
