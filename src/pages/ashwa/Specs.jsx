import React from 'react';
import { url } from '../../paths';

// The full specification sheet, exactly as on presentation slide 19 (282 kWh model), with slide 20's
// features and the 350 kWh homologation from energyinmotion.in. Swap time follows EIM's under 7 minutes.
const GROUPS = [
  {
    name: 'Dimensions and mass',
    rows: [
      ['Drive type', '4x2 prime mover'],
      ['Overall length × width × height', '6,665 × 2,550 × 3,525 mm'],
      ['Wheelbase', '4,200 mm'],
      ['Ground clearance', '300 mm'],
      ['Gross combination weight', '55,000 kg'],
      ['Kerb weight', '9,500 kg'],
      ['Axle load, front | rear', '6.5 | 13 tonnes'],
    ],
  },
  {
    name: 'Performance',
    rows: [
      ['Top speed', '80 km/h'],
      ['Maximum gradability', '25%'],
      ['Turning radius', '10,023 mm'],
      ['Driving range, 282 kWh pack', '180 km'],
    ],
  },
  {
    name: 'Power',
    rows: [
      ['Battery', 'CATL, 282 kWh'],
      ['350 kWh model', 'Homologated July 2026'],
      ['Motor power, rated | peak', '260 | 400 kW'],
      ['Motor torque, rated | peak', '1,300 | 2,500 Nm'],
      ['Transmission', 'AMT'],
    ],
  },
  {
    name: 'Chassis',
    rows: [
      ['Tyres', '295/80 R22.5 18PR'],
      ['Front suspension', 'Parabolic leaf spring, 3 leaves'],
      ['Rear suspension', 'Parabolic leaf spring, 5 + 4, stabiliser bar, shock absorbers'],
      ['Brakes', 'Dual-circuit pneumatic'],
    ],
  },
  {
    name: 'Charging and swapping',
    rows: [
      ['Battery swap', 'Under 7 minutes'],
      ['DC charge time', '60 minutes, 20 to 100%'],
    ],
  },
  {
    name: 'Cab and safety',
    rows: [
      ['Driver assistance', 'ADAS: forward collision and lane departure warning'],
      ['Cameras', '360-degree camera'],
      ['Cruise', 'Adaptive cruise control'],
      ['Cab', 'Air-conditioned, four-point suspended'],
      ['Driver’s seat', 'Pneumatically suspended, automatic vibration damping'],
      ['Spare wheel', 'Additional spare wheel'],
    ],
  },
];

export default function Specs() {
  return (
    <section className="specs sec" id="specs" aria-labelledby="sp-h">
      <div className="wrap shead">
        <h2 className="h2" id="sp-h">The full spec sheet. <em>Nothing left out.</em></h2>
        <p className="lede">Everything a fleet engineer asks for, in one place. Figures are for the 282 kWh model unless marked.</p>
      </div>

      <div className="wrap specs__grid">
        <figure className="dims">
          <div className="dims__img">
            <img src={url('assets/img/ashwa/a-front.webp')} width="1200" height="1182" alt="The ASHWA e-tractor from straight ahead" loading="lazy" />
            <span className="dims__w" aria-hidden="true"><i /><b>2,550 mm</b></span>
            <span className="dims__h" aria-hidden="true"><i /><b>3,525 mm</b></span>
          </div>
          <figcaption>Width 2,550 mm · Height 3,525 mm · Length 6,665 mm</figcaption>
        </figure>

        <div className="sheet">
          {GROUPS.map((g) => (
            <div className="sheet__g" key={g.name}>
              <h3 className="sheet__h">{g.name}</h3>
              <dl>
                {g.rows.map(([k, v]) => (
                  <div className="sheet__r" key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
