import React from 'react';

export default function SwapSequence() {
  return (
    <section className="swap" id="swap" aria-labelledby="swap-h">
      <div className="swap__intro wrap">
        <h2 className="h2 h2--xl" id="swap-h">In drained. <em>Out full.</em></h2>
        <p className="lede">Real footage from an EIM swap station. Scroll to move through one complete swap, from the truck rolling in to the truck rolling out.</p>
      </div>

      <div className="swap__pin" id="swapPin">
        <div className="swap__stage" id="swapStage">
          <canvas className="swap__canvas" id="swapCanvas" aria-hidden="true" />
          <img className="swap__poster" src="assets/seq/b40.webp" alt="Real footage: an EIM ASHWA truck parked in the swap bay while the overhead spreader lifts its battery pack out" id="swapPoster" />

          {/* X-ray: illustrated interior, aligned to the real container */}
          <div className="xray" id="xray" aria-hidden="true">
            <svg viewBox="0 0 1440 810" preserveAspectRatio="none">
              <defs>
                <clipPath id="xrClip"><polygon points="22,108 690,46 690,714 22,714" /><rect x="690" y="120" width="440" height="420" /></clipPath>
                <pattern id="xrGrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#0B4A75" strokeWidth="1" /></pattern>
                <symbol id="xpack" viewBox="0 0 104 196">
                  <rect x="1" y="1" width="102" height="194" rx="3" fill="#01262D" stroke="#38E0CF" strokeWidth="2" />
                  <path d="M12 30H92M12 60H92M12 90H92M12 120H92M12 150H92" stroke="#38E0CF" strokeWidth="1.5" />
                  <rect x="30" y="-8" width="44" height="9" fill="#38E0CF" />
                </symbol>
              </defs>
              <g id="xrBody" clipPath="url(#xrClip)">
                <rect width="1440" height="810" fill="#01262D" />
                <rect width="1440" height="810" fill="url(#xrGrid)" />
                <line id="xrScan" x1="0" y1="0" x2="0" y2="810" stroke="#38E0CF" strokeWidth="2" />
              </g>
              <g className="xr-lines" id="xrLines">
                <polygon points="22,108 690,46 690,714 22,714" fill="none" stroke="#38E0CF" strokeWidth="2" />
                <rect x="690" y="120" width="440" height="420" fill="none" stroke="#38E0CF" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="46" y1="176" x2="1060" y2="176" stroke="#FFFFFF" strokeWidth="3" />
                <g id="xrSlots" />
                <g id="xrDrained"><use href="#xpack" width="104" height="196" /><rect className="xlvl" x="44" y="40" width="16" height="140" fill="#0B4A75" /><rect id="xrDLvl" x="44" y="152" width="16" height="28" fill="#FFFFFF" /></g>
                <g id="xrCharged"><use href="#xpack" width="104" height="196" /><rect x="44" y="40" width="16" height="140" fill="#38E0CF" /></g>
                <g id="xrHook1"><line x1="52" y1="0" x2="52" y2="20" stroke="#FFFFFF" strokeWidth="3" /><rect x="18" y="16" width="68" height="8" fill="#FFFFFF" /></g>
              </g>
              <g className="xr-tags">
                <g id="xrTagA"><rect x="0" y="0" width="300" height="44" rx="8" fill="#FFFFFF" /><text x="16" y="28">Drained pack docks to charge</text></g>
                <g id="xrTagB"><rect x="0" y="0" width="290" height="44" rx="8" fill="#38E0CF" /><text x="16" y="28">Charged pack heads for the bay</text></g>
              </g>
            </svg>
            <span className="xray__cap">Illustration of the station interior</span>
          </div>

          <div className="swap__shade" />
          <span className="swap__src" id="swapSrc"><i />Real footage · EIM swap station</span>

          <ol className="steps" id="steps">
            <li className="step" data-step="0"><span className="step__n">01 / 05</span><h3>The truck rolls in.</h3><p>The driver lines up in the bay and parks. No cables, no plugging in.</p></li>
            <li className="step" data-step="1"><span class="step__n">02 / 05</span><h3>The drained pack lifts out.</h3><p>An overhead spreader comes down, locks onto the battery and lifts it clear of the chassis.</p></li>
            <li className="step" data-step="2"><span className="step__n">03 / 05</span><h3>It goes on charge.</h3><p>Inside the station, the drained pack docks into a rack to charge, and a fully charged pack is picked out for the truck.</p></li>
            <li className="step" data-step="3"><span className="step__n">04 / 05</span><h3>A full pack goes in.</h3><p>The charged battery is lowered onto the chassis and locked in. The spreader lifts clear.</p></li>
            <li className="step" data-step="4"><span className="step__n">05 / 05</span><h3>Back on the road.</h3><p>The truck pulls out with a full battery, trailer and all, and goes straight back to work.</p></li>
          </ol>

          <div className="sprog" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>
      </div>

      <div className="svc wrap" id="swap-vs-charge">
        <div className="svc__head">
          <h3 className="h3">Charging a truck costs you trips. <em>Swapping gives them back.</em></h3>
          <p>A plug-in e-truck with a 282 kWh battery against our ASHWA with a 350 kWh swappable pack — per truck, per month.</p>
        </div>
        <div className="svc__grid">
          <div className="svc__col">
            <p className="svc__lab">Plug-in charging · 282 kWh</p>
            <p className="svc__num"><b className="count" data-to="67">67</b> hrs</p>
            <p className="svc__cap">spent charging each month: 71 sessions of about 56 minutes</p>
            <div className="svc__bar"><i style={{ '--w': '100%' }} /></div>
          </div>
          <div className="svc__col svc__col--eim">
            <p className="svc__lab">EIM swapping · 350 kWh</p>
            <p className="svc__num"><b className="count" data-to="12">12</b> hrs</p>
            <p className="svc__cap">at the station each month: 46 swaps of about 15 minutes</p>
            <div className="svc__bar"><i style={{ '--w': '18%' }} /></div>
          </div>
          <div className="svc__col svc__col--out">
            <p className="svc__lab">The difference</p>
            <p className="svc__num"><b className="count" data-to="8">8</b><span className="pct">%</span></p>
            <p className="svc__cap">more trips possible each month, per truck</p>
            <a className="btn btn--ink" href="#network"><span>Find a station on your route</span><svg><use href="#arrow" /></svg></a>
          </div>
        </div>
      </div>
    </section>
  );
}
