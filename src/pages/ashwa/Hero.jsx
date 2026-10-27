import React from 'react';
import { url, PAGES } from '../../paths';

// Product hero: a dark stage inset in the white page, so the header keeps its white ground.
// The studio clip of the truck turning plays once and holds on its last frame (also the poster).
// 55 t, 536 HP, 2,500 Nm: slides 19 and 20. Swap under 7 minutes: slide 15. 40%: slide 15.
export default function Hero() {
  return (
    <section className="phero" id="top" aria-labelledby="ah-h">
      <div className="phero__stage">
        <video className="phero__media" muted playsInline preload="auto" poster={url('assets/img/ashwa/a-hero-poster.webp')} aria-hidden="true">
          <source src={url('assets/video/a-hero.mp4')} type="video/mp4" />
        </video>
        <div className="phero__copy ihero__copy">
          <nav className="crumb crumb--dark" aria-label="Breadcrumb">
            <ol>
              <li>Solutions</li>
              <li aria-current="page">ASHWA e-tractor</li>
            </ol>
          </nav>
          <h1 className="ihero__h phero__h" id="ah-h">
            <span className="ln">Pulls <mark>55 tonnes.</mark></span>{' '}
            <span className="ln"><em>Swaps in under 7 minutes.</em></span>
          </h1>
          <p className="ihero__sub">ASHWA is our battery-swappable electric prime mover, built with Foton for ports, haulage, cement and mining.</p>
          <div className="ihero__ctas">
            <a className="btn btn--teal" href="#assess"><span>Assess your fleet</span><svg><use href="#arrow" /></svg></a>
            <a className="btn btn--ghost" href="#specs"><span>See the spec sheet</span><svg><use href="#down" /></svg></a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <ul className="stats phero__stats">
          <li className="stat"><b>55<small>t</small></b><span>gross combination weight it is built to pull</span></li>
          <li className="stat"><b>536<small>HP</small></b><span>peak power, from a 400 kW electric motor</span></li>
          <li className="stat"><b>2,500<small>Nm</small></b><span>peak torque, for loaded starts on gradients</span></li>
          <li className="stat"><b><small className="pre">Under</small>7<small>min</small></b><span>to swap a drained pack for a charged one</span></li>
        </ul>
        <p className="mband">
          <span>Every ASHWA is sold on Maitryi. You buy the truck without its battery, for 40% less upfront.</span>
          <a className="link" href={url(PAGES.maitryi)}>How Maitryi works <svg><use href="#arrow" /></svg></a>
        </p>
      </div>
    </section>
  );
}
