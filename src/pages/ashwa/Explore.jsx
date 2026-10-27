import React from 'react';
import { url, PAGES } from '../../paths';

// Explorer: pick a part; the side-profile photograph zooms onto it (or the cab / front picture comes in).
// Zoom targets are fractions of a-side.webp (focus x, focus y, scale).
// Sources: slides 15, 19 and 20; energyinmotion.in for the homologated 282 and 350 kWh packs.
const PARTS = [
  {
    k: 'battery', name: 'Battery', img: 'side', zoom: [0.45, 0.34, 1.6],
    title: <>A pack that swaps. <em>Not one that waits.</em></>,
    points: [
      'Swappable CATL battery pack: 282 kWh, or 350 kWh, both homologated by ARAI',
      'Swapped for a charged pack in under 7 minutes at our stations',
      'DC fast charge from 20 to 100% in about 60 minutes',
      '180 km driving range on the 282 kWh pack',
    ],
    more: { text: 'Owned and replaced by us, on Maitryi', href: PAGES.maitryi },
  },
  {
    k: 'drive', name: 'Drivetrain', img: 'side', zoom: [0.72, 0.66, 2],
    title: <>536 HP. <em>More than most diesel trucks.</em></>,
    points: [
      'Electric motor: 260 kW rated, 400 kW peak',
      '1,300 Nm rated and 2,500 Nm peak torque, for loaded starts on gradients',
      'Automated manual transmission (AMT)',
      'Top speed of 80 km/h, and climbs gradients of up to 25%',
    ],
    bar: { a: ['ASHWA', 536], b: ['Most diesel trucks', 320], unit: 'HP' },
  },
  {
    k: 'chassis', name: 'Chassis', img: 'side', zoom: [0.29, 0.76, 2.4],
    title: <>Made to carry the load. <em>All 55 tonnes of it.</em></>,
    points: [
      '4x2 prime mover, rated for 55,000 kg gross combination weight',
      '295/80 R22.5 tyres, 1,140 mm, sized for the load',
      'Parabolic leaf springs front and rear, with a stabiliser bar and shock absorbers',
      'Axle loads of 6.5 tonnes front and 13 tonnes rear',
    ],
  },
  {
    k: 'cab', name: 'Cab', img: 'cab',
    title: <>A cab drivers want. <em>Shift after shift.</em></>,
    points: [
      'Air-conditioned cab',
      'Four-point suspended cab',
      'Pneumatically suspended driver’s seat with automatic vibration damping',
      'An additional spare wheel as standard',
    ],
  },
  {
    k: 'safety', name: 'Safety', img: 'front',
    title: <>Eyes all around the truck. <em>Brakes to match.</em></>,
    points: [
      'ADAS with forward collision warning and lane departure warning',
      '360-degree camera',
      'Adaptive cruise control',
      'Dual-circuit pneumatic braking',
    ],
  },
];

const IMGS = {
  side: { src: 'assets/img/ashwa/a-side.webp', w: 2400, h: 1384, alt: 'The ASHWA e-tractor in profile, its battery pack standing behind the cab' },
  cab: { src: 'assets/img/ashwa/a-cab.webp', w: 1800, h: 1200, alt: 'Inside the ASHWA cab: the driver’s seat, dashboard and the space behind' },
  front: { src: 'assets/img/ashwa/a-front34.webp', w: 1800, h: 1200, alt: 'The ASHWA e-tractor from the front three-quarter view' },
};

export default function Explore() {
  return (
    <section className="xp sec sec--dark" id="explore" aria-labelledby="xp-h">
      <div className="wrap shead">
        <h2 className="h2" id="xp-h">Look closer. <em>Every part earns its keep.</em></h2>
        <p className="lede">Pick a part of the truck to see what it does, and why it is there.</p>
      </div>

      <div className="wrap xp__grid">
        <div className="xp__frame" aria-hidden="true">
          {Object.entries(IMGS).map(([k, im]) => (
            <img key={k} className={'xp__img' + (k === 'side' ? ' is-on' : '')} data-img={k} src={url(im.src)} width={im.w} height={im.h} alt="" loading="lazy" />
          ))}
        </div>

        <div className="xp__ctl">
          <div className="xp__tabs" role="tablist" aria-label="Parts of the truck">
            {PARTS.map((p, i) => (
              <button key={p.k} type="button" role="tab" id={'xt-' + p.k} aria-controls={'xpn-' + p.k} aria-selected={i === 0 ? 'true' : 'false'} tabIndex={i === 0 ? 0 : -1}
                className={'xp__tab' + (i === 0 ? ' is-on' : '')} data-i={i} data-img={p.img} data-zoom={p.zoom ? p.zoom.join(',') : ''}>
                <span>{String(i + 1).padStart(2, '0')}</span>{p.name}
              </button>
            ))}
          </div>

          {PARTS.map((p, i) => (
            <div key={p.k} className={'xp__panel' + (i === 0 ? ' is-on' : '')} role="tabpanel" id={'xpn-' + p.k} aria-labelledby={'xt-' + p.k}>
              <h3 className="xp__h">{p.title}</h3>
              <ul className="xp__pts">
                {p.points.map((t, j) => <li key={j}>{t}</li>)}
              </ul>
              {p.bar && (
                <div className="xp__bars">
                  {[p.bar.a, p.bar.b].map(([lab, v], j) => (
                    <div key={j} className={'xp__bar' + (j === 0 ? ' xp__bar--us' : '')} style={{ '--w': (v / p.bar.a[1]).toFixed(3) }}>
                      <span>{lab}</span><b>{v} {p.bar.unit}</b><i />
                    </div>
                  ))}
                </div>
              )}
              {p.more && <a className="link xp__more" href={url(p.more.href)}>{p.more.text} <svg><use href="#arrow" /></svg></a>}
            </div>
          ))}
        </div>
      </div>
      <p className="sr">{IMGS.side.alt}</p>
    </section>
  );
}
