import React from 'react';
import { url, PAGES } from '../../paths';

// Bento: everything around the pack that comes with Maitryi.
// Sources: slide 15 (CCS2, any brand; renewable energy and Scope 3), slide 16 (swap under 7 minutes,
// 100 e-tractors a day, software), slide 19 (charge time 60 min, 20 to 100%), slides 7 and 9 (financing),
// slide 8 (Ravindra Energy), energyinmotion.in (after-sales: 24x7 teams, service vans, workshops).
export default function Included() {
  return (
    <section className="incl sec sec--mist" id="included" aria-labelledby="incl-h">
      <div className="wrap incl__head">
        <h2 className="h2" id="incl-h">Everything the pack needs. <em>Already part of the deal.</em></h2>
        <p className="lede">Not owning the battery is half of Maitryi. The other half is everything around it: the stations, the energy, the software and the people who keep your trucks running.</p>
      </div>

      <div className="wrap">
        <ul className="bento">
          <li className="tile tile--photo tile--a">
            <figure className="tile__img"><img src={url('assets/img/mai/m-station.webp')} width="1600" height="900" alt="An EIM e-tractor inside an EIM battery swap station, the pack being lifted" loading="lazy" /></figure>
            <div className="tile__txt">
              <p className="tile__lab">Swap stations</p>
              <h3 className="tile__h">Under 7 minutes a swap. Up to 100 e-tractors a day.</h3>
              <p className="tile__p">Automated battery swapping at stations we build and run.</p>
              <a className="tile__go" href={url(PAGES.swap + '#network')}>See the network <svg><use href="#arrow" /></svg></a>
            </div>
          </li>
          <li className="tile tile--ink tile--b">
            <p className="tile__lab">Fast charging</p>
            <h3 className="tile__h">Any brand of commercial EV.</h3>
            <p className="tile__p">Our stations carry high-capacity CCS2 DC fast chargers. A pack charges from 20 to 100% in about an hour.</p>
          </li>
          <li className="tile tile--paper tile--c">
            <p className="tile__lab">Green energy</p>
            <h3 className="tile__h">As much renewable power as we can source.</h3>
            <p className="tile__p">Backed by Ravindra Energy, a listed renewable energy company and one of our shareholders. It helps your Scope 3 emissions compliance.</p>
            <img className="tile__logo" src={url('assets/logos/ravindra.webp')} alt="Ravindra Energy" loading="lazy" />
          </li>
          <li className="tile tile--paper tile--d">
            <p className="tile__lab">Fleet software</p>
            <h3 className="tile__h">Every pack and every truck, live.</h3>
            <ul className="tile__list">
              <li>Swap and charge scheduling</li>
              <li>Live e-tractor monitoring</li>
              <li>API connection to your systems</li>
              <li>Charging on Time-of-Day tariffs</li>
            </ul>
          </li>
          <li className="tile tile--ink tile--e">
            <p className="tile__lab">After-sales</p>
            <h3 className="tile__h">Service teams on call, 24x7.</h3>
            <p className="tile__p">Mobile service vans and well-equipped workshops keep your trucks running.</p>
          </li>
          <li className="tile tile--paper tile--f">
            <p className="tile__lab">Financing</p>
            <h3 className="tile__h">Financed like a diesel truck.</h3>
            <p className="tile__p">Lenders finance our e-tractors without the battery, on terms on par with diesel vehicle financing.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
