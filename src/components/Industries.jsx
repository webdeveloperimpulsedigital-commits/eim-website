import React from 'react';

export default function Industries() {
  return (
    <section className="ind sec" id="industries" aria-labelledby="ind-h">
      <div className="wrap">
        <div className="ind__head">
          <h2 className="h2" id="ind-h">Built for where freight actually moves.</h2>
          <p className="lede">EIM works best on heavy, repeat routes where a truck runs all day and every hour parked is money lost.</p>
        </div>
        <div className="cards">
          <a className="card" href="#assess" data-intent="fleet">
            <figure><img src="assets/img/hapag.webp" alt="EIM trucks hauling containers at a port" loading="lazy" /></figure>
            <div className="card__txt">
              <h3>Ports and container terminals</h3>
              <p>India's first fleet of swappable-battery EV trucks went to work at JNPA in 2025, backed by swap stations inside the port.</p>
              <span className="card__go">Electrify port operations <svg><use href="#arrow" /></svg></span>
            </div>
          </a>
          <a className="card" href="#assess" data-intent="fleet">
            <figure><img src="assets/img/fleet-row.webp" alt="A row of EIM ASHWA e-tractors" loading="lazy" /></figure>
            <div className="card__txt">
              <h3>Logistics and middle-mile</h3>
              <p>Fixed lanes between terminals, CFSs, ICDs and warehouses, where swaps slot into the route instead of stopping it.</p>
              <span className="card__go">Plan a lane <svg><use href="#arrow" /></svg></span>
            </div>
          </a>
          <a className="card" href="#assess" data-intent="fleet">
            <figure><img src="assets/img/ev-ultratech.webp" alt="EIM trucks at the UltraTech deployment" loading="lazy" /></figure>
            <div className="card__txt">
              <h3>Cement, steel and mining</h3>
              <p>UltraTech has deployed 45 EIM electric trucks in North India.</p>
              <span className="card__go">Move bulk loads <svg><use href="#arrow" /></svg></span>
            </div>
          </a>
          <a className="card" href="#network">
            <figure><img src="assets/img/dusk.webp" alt="EIM truck at a port terminal at dusk" loading="lazy" /></figure>
            <div className="card__txt">
              <h3>Industrial freight corridors</h3>
              <p>Delhi–Jaipur, Jaipur–Mumbai and more corridors are being built out, one station at a time.</p>
              <span className="card__go">See the corridors <svg><use href="#arrow" /></svg></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
