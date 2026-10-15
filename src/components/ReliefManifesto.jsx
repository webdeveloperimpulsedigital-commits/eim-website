import React from 'react';

export default function ReliefManifesto() {
  return (
    <section className="relief sec" id="relief" aria-labelledby="relief-h">
      <div className="wrap relief__top">
        <h2 className="h2" id="relief-h">Everything taken care of. <em>When does your fleet go electric?</em></h2>
        <a className="btn btn--ink" href="#maitryi"><span>See who owns what</span><svg><use href="#arrow" /></svg></a>
      </div>
      <div className="wrap relief__grid">
        <figure className="relief__img"><img src="assets/img/station-2trucks.webp" alt="Two EIM e-tractors at an EIM battery swap station" loading="lazy" /></figure>
        <ul className="relief__cards">
          <li className="rc"><div className="rc__in"><div className="rc__f" aria-hidden="true"><span>The capital it takes to start</span></div><div className="rc__b"><s>The capital it takes to start</s><b>40% less&nbsp;upfront</b></div></div></li>
          <li className="rc"><div className="rc__in"><div className="rc__f" aria-hidden="true"><span>An hour parked on a charger</span></div><div className="rc__b"><s>An hour parked on a charger</s><b>Swapped in under 7&nbsp;minutes</b></div></div></li>
          <li className="rc"><div className="rc__in"><div className="rc__f" aria-hidden="true"><span>A battery that ages on your books</span></div><div className="rc__b"><s>A battery that ages on your books</s><b>The pack is ours, not&nbsp;yours</b></div></div></li>
          <li className="rc"><div className="rc__in"><div className="rc__f" aria-hidden="true"><span>Paying to replace a worn-out pack</span></div><div className="rc__b"><s>Paying to replace a worn-out pack</s><b>Replacement is on&nbsp;us</b></div></div></li>
          <li className="rc"><div className="rc__in"><div className="rc__f" aria-hidden="true"><span>Nowhere to charge on your route</span></div><div class="rc__b"><s>Nowhere to charge on your route</s><b>Stations on your&nbsp;corridors</b></div></div></li>
          <li className="rc"><div className="rc__in"><div className="rc__f" aria-hidden="true"><span>Being stranded with no one to call</span></div><div className="rc__b"><s>Being stranded with no one to call</s><b>24x7 service across&nbsp;India</b></div></div></li>
        </ul>
      </div>
    </section>
  );
}
