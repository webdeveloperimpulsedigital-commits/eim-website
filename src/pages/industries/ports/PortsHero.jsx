import React from 'react';
import { url } from '../../../paths';

// Ports hero. Full bleed: seven EIM e-tractors lined up under the port cranes (Creative Assets, EIM 4x2 E-Tractor
// Images, IMG_20250924_155136517). After Volvo's electric range (the fleet line-up, full bleed), Hermeus and SpaceX
// (one cinematic real picture, little else) and Rivian (one giant line).
// The promise answers a port's worry about going electric, in the NSDT release's own terms (September 2026):
// "battery swapping enables rapid turnaround, dedicated service infrastructure supports vehicle uptime, and driver
// training and simulation build the human capabilities"; slot-booking "helping integrate electric vehicles into
// high-throughput freight operations".
export default function PortsHero() {
  return (
    <section className="ph" id="top" aria-labelledby="ph-h">
      <div className="ph__bg" aria-hidden="true">
        <picture>
          <source media="(max-width:760px)" srcSet={url('assets/img/ind/p-lineup-hero-m.webp')} />
          <img className="ph__img" src={url('assets/img/ind/p-lineup-hero.webp')} width="2400" height="1350" alt="" fetchpriority="high" />
        </picture>
      </div>
      <div className="ph__in">
        <div className="ph__copy">
          <nav className="crumb crumb--dark" aria-label="Breadcrumb"><ol><li>Industries</li><li aria-current="page">Ports and container terminals</li></ol></nav>
          <h1 className="ph__h" id="ph-h">
            <span className="ph__l"><span>Take your port electric.</span></span>{' '}
            <em className="ph__l"><span>Keep its pace.</span></em>
          </h1>
          <p className="ph__sub">Electric trucks, battery swapping, on-site service and trained drivers, built into high-throughput port operations.</p>
          <div className="ph__ctas">
            <a className="btn btn--teal" href="#assess"><span>Assess your fleet</span><svg><use href="#arrow" /></svg></a>
            <a className="btn btn--ghost" href="#jnpa"><span>See it at JNPA</span><svg><use href="#down" /></svg></a>
          </div>
        </div>
      </div>
    </section>
  );
}
