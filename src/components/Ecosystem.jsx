import React from 'react';

export default function Ecosystem() {
  return (
    <section className="eco sec" id="ecosystem" aria-labelledby="eco-h">
      <div className="wrap">
        <div className="eco__head">
          <h2 className="h2" id="eco-h">Drive. Energize. Charge.</h2>
          <p className="lede">Three parts, one partner.</p>
        </div>
        <div className="trio" id="trio">
          <svg className="trio__svg" viewBox="-2 -2 145 52" role="group" aria-label="The EIM mark split into Drive, Energize and Charge">
            <defs>
              <clipPath id="clipS"><path d="M40.6733 31.3168L38.7339 35.0313H26.1498L26.1538 35.0293L44.744 25.2593L46.9802 20.9749L30.0681 12.1448H50.6848L48.0291 17.2287H64.1139L73.1102 0H24.6359V0.00198088L24.6339 0L15.5189 17.4543L27.264 23.5871L6.71457 34.3189L0 47.1761L0.00198088 47.1741L0 47.1761L48.4466 47.2295L56.6058 31.6058L40.6733 31.3168Z" /></clipPath>
              <clipPath id="clipI"><path d="M76.9367 0L52.3008 47.1761H68.3837L93.0196 0H76.9367Z" /></clipPath>
              <clipPath id="clipM"><path d="M124.915 0L112.425 23.9176V0H96.9777L72.3418 47.1761H87.1562L100.281 23.2586V47.1761H112.425H113.189L125.68 23.2586V47.1761H140.999V0H124.915Z" /></clipPath>
            </defs>
            <g className="trio__g is-on" data-k="0" tabIndex="0"><g clipPath="url(#clipS)"><rect x="0" y="0" width="74" height="48" fill="#01262D" /><image href="assets/img/truck-34.webp" xlinkHref="assets/img/truck-34.webp" x="-6" y="-4" width="86" height="57" preserveAspectRatio="xMidYMid slice" /></g></g>
            <g className="trio__g" data-k="1" tabIndex="0"><g clipPath="url(#clipI)"><rect x="52" y="0" width="42" height="48" fill="#01262D" /><image href="assets/img/swap-lift-real.webp" xlinkHref="assets/img/swap-lift-real.webp" x="34" y="-2" width="92" height="52" preserveAspectRatio="xMidYMid slice" /></g></g>
            <g className="trio__g" data-k="2" tabIndex="0"><g clipPath="url(#clipM)"><rect x="72" y="0" width="70" height="48" fill="#01262D" /><image href="assets/img/station-sky.webp" xlinkHref="assets/img/station-sky.webp" x="68" y="-6" width="80" height="60" preserveAspectRatio="xMidYMid slice" /></g></g>
          </svg>
          <div className="trio__cap">
            <article className="tcap is-on"><h3>Σ <span>Drive</span></h3><p>The ASHWA 4x2 e-tractor, built for 55-tonne loads, with 536 HP, 2,500 Nm of torque, ADAS, a 360° camera and an air-conditioned cab.</p></article>
            <article className="tcap"><h3>I <span>Energize</span></h3><p>Battery-as-a-Service. CATL battery packs owned, monitored and maintained by EIM, and charged with as much renewable power as we can source.</p></article>
            <article className="tcap"><h3>M <span>Charge</span></h3><p>Swap stations that turn a truck around in under 7 minutes and serve up to 100 e-tractors a day, plus CCS2 fast chargers that work with any brand of commercial vehicle.</p></article>
          </div>
        </div>

        <div className="ashwa" id="ashwa">
          <div className="ashwa__img">
            <img src="assets/img/truck-side.webp" alt="EIM ASHWA 4x2 e-tractor side view showing the battery pack behind the cab" loading="lazy" />
            <button className="hot" style={{ '--x': '55%', '--y': '38%' }} aria-describedby="hot1"><i /><span id="hot1" role="tooltip">Swappable CATL battery pack, 282 or 350 kWh</span></button>
            <button className="hot" style={{ '--x': '79%', '--y': '40%' }} aria-describedby="hot2"><i /><span id="hot2" role="tooltip">AC cab, 4-point suspension, air-suspended seat, ADAS</span></button>
            <button className="hot" style={{ '--x': '71%', '--y': '80%' }} aria-describedby="hot3"><i /><span id="hot3" role="tooltip">400 kW peak motor, 2,500 Nm, AMT gearbox</span></button>
            <button className="hot" style={{ '--x': '13%', '--y': '80%' }} aria-describedby="hot4"><i /><span id="hot4" role="tooltip">295/80 R22.5 tyres, dual-circuit air brakes</span></button>
          </div>
          <dl className="spec">
            <div><dt>55<small>t</small></dt><dd>Gross combination weight</dd></div>
            <div><dt>536<small>HP</small></dt><dd>Peak power</dd></div>
            <div><dt>2,500<small>Nm</small></dt><dd>Peak torque</dd></div>
            <div><dt>282/350<small>kWh</small></dt><dd>Battery options, both ARAI homologated</dd></div>
            <div><dt>&lt;7<small>min</small></dt><dd>Battery swap</dd></div>
            <div><dt>60<small>min</small></dt><dd>DC charge, 20 to 100%</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
