import React from 'react';

export default function MaitryiModel() {
  return (
    <section className="maitryi sec--dark" id="maitryi" aria-labelledby="mai-h">
      <div className="mai__pin" id="maiPin">
        <div className="wrap mai__grid">
          <div className="mai__copy">
            <h2 className="h2" id="mai-h"><span className="mai__word">Maitryi.</span> You own the truck. We own the battery.</h2>
            <p className="lede">You buy the ASHWA e-tractor without its battery pack. EIM owns the battery, carries its warranty and ageing risk, charges it and swaps it. You pay for battery use and charging as you go.</p>
            <ul className="mai__owns" id="maiOwns">
              <li><b>The battery</b><span>Owned, monitored and maintained by EIM.</span></li>
              <li><b>Its replacement</b><span>When a pack reaches the end of its life, it's replaced by us, not you.</span></li>
              <li><b>Swapping and charging</b><span>Stations and fast chargers, built and run by EIM.</span></li>
              <li><b>Green energy</b><span>As much renewable power as we can source, backed by Ravindra Energy.</span></li>
              <li><b>Fleet software</b><span>Swap scheduling, live e-tractor monitoring and API access.</span></li>
            </ul>
          </div>
          <figure className="mai__stage" aria-label="The ASHWA e-tractor with its battery pack lifted away: the truck is yours, the pack is EIM's">
            <div className="mai__truck">
              <img className="mai__body" src="assets/img/mai-body.webp" alt="" />
              <span className="mai__slot" id="maiSlot" />
              <img className="mai__pack" id="maiPack" src="assets/img/mai-pack.webp" alt="" />
              <span className="tag tag--you" id="tagYou"><b>Yours</b>The e-tractor</span>
              <span className="tag tag--eim" id="tagEim"><b>EIM's</b>The battery, and everything it needs</span>
            </div>
          </figure>
        </div>
        <div className="wrap mai__foot">
          <div className="mai__kpi"><b>40<span className="pct">%</span></b><span>lower upfront capital cost</span></div>
          <div className="mai__kpi"><b>Pay as you go</b><span>for battery use and charging</span></div>
          <div className="mai__kpi"><b>Financing</b><span>on par with diesel trucks, with lenders funding the truck without its battery</span></div>
          <a className="btn btn--teal" href="#assess" data-intent="maitryi"><span>Talk to us about Maitryi</span><svg><use href="#arrow" /></svg></a>
        </div>
      </div>
    </section>
  );
}
