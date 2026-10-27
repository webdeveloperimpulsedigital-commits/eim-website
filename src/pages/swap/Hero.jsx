import React from 'react';
import { url } from '../../paths';

// Hero: real footage of one complete swap, the whole minute sped up into a loop.
// Under 7 minutes and CCS2 for any brand: slide 15. 100 a day: slide 16. 60 minutes, 20 to 100%: slide 19.
// 100 stations by FY29: slide 10.
export default function Hero() {
  return (
    <section className="ihero" id="top" aria-labelledby="sh-h">
      <div className="wrap ihero__grid">
        <div className="ihero__copy">
          <nav className="crumb" aria-label="Breadcrumb">
            <ol>
              <li>Solutions</li>
              <li aria-current="page">Swapping and charging</li>
            </ol>
          </nav>
          <h1 className="ihero__h ihero__h--long" id="sh-h">
            <span className="ln"><mark>7 minutes</mark> to swap.</span>{' '}
            <span className="ln"><em>Any brand can charge.</em></span>
          </h1>
          <p className="ihero__sub">
            Our stations do both. An ASHWA swaps its drained pack for a charged one in under 7 minutes, and any brand of commercial EV can charge on our high-capacity CCS2 DC chargers.
          </p>
          <div className="ihero__ctas">
            <a className="btn btn--teal" href="#assess" data-intent="site"><span>Assess your fleet</span><svg><use href="#arrow" /></svg></a>
            <a className="btn btn--ghost" href="#network"><span>See the network</span><svg><use href="#down" /></svg></a>
          </div>
        </div>
        <figure className="ihero__fig ihero__fig--wide">
          <video muted loop playsInline preload="auto" poster={url('assets/img/swap/s-hero-poster.webp')} aria-label="Real footage: an ASHWA e-tractor drives into an EIM swap station, its pack is changed, and it drives out">
            <source src={url('assets/video/s-hero.mp4')} type="video/mp4" />
          </video>
          <span className="story__src is-on"><i />Real footage · sped up</span>
        </figure>
      </div>

      <div className="wrap">
        <ul className="stats phero__stats">
          <li className="stat"><b><small className="pre">Under</small>7<small>min</small></b><span>to swap a drained pack for a charged one</span></li>
          <li className="stat"><b>100</b><span>e-tractors a day, kept moving by one swap station</span></li>
          <li className="stat"><b>60<small>min</small></b><span>to charge a pack from 20 to 100% on a DC fast charger</span></li>
          <li className="stat"><b>100</b><span>swap stations we plan to set up by FY29</span></li>
        </ul>
      </div>
    </section>
  );
}
