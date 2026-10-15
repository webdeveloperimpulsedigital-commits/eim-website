import React from 'react';

export default function DieselCostCalculator() {
  return (
    <section className="cost sec sec--ink" id="cost" aria-labelledby="cost-h">
      <div className="wrap">
        <div className="cost__top">
          <h2 className="h2" id="cost-h">Diesel is now <em>the expensive choice.</em></h2>
          <p className="lede">Every truck you keep on diesel costs <mark className="cost__hl">&#8377;1,00,789</mark> more per month in finance, fuel and maintenance than an EIM tractor doing the same work.</p>
        </div>

        <div className="rig" id="rig">
          <div className="rig__ctl">
            <label className="rig__lab" htmlFor="fleetN">Trucks in your fleet</label>
            <output className="rig__n" id="fleetOut" htmlFor="fleetN">25</output>
            <input className="rig__sl" id="fleetN" type="range" min="1" max="100" defaultValue="25" step="1" aria-label="Trucks in your fleet" />
            <div className="rig__ends"><span>1</span><span>100</span></div>
          </div>

          <div className="rig__fleet" id="fleetGrid" aria-hidden="true" />

          <div className="rig__out">
            <p className="rig__big" id="fleetBig"><i>&#8377;</i>3.02 <span>crore</span></p>
            <p className="rig__say" id="fleetSay">more a year on diesel, across 25 trucks.</p>
            <p className="rig__exact" id="fleetExact">&#8377;3,02,36,700</p>
            <a className="btn btn--teal" href="#assess" data-intent="fleet"><span>See this on your routes</span><svg><use href="#arrow" /></svg></a>
          </div>
        </div>

        <div className="cost__proof">
          <div className="pf__head">
            <h3 className="h2" id="pf-h"><span>Ask the</span> <em>first movers</em></h3>
            <p className="lede">Both are running EIM tractors today. The next 500 vehicles are already signed for.</p>
          </div>
          <ul className="pf">
            <li>
              <p className="pf__who">UltraTech</p>
              <p className="pf__n"><b>45</b></p>
              <p className="pf__d">electric trucks deployed across North India</p>
            </li>
            <li>
              <p className="pf__who">Jawaharlal Nehru Port</p>
              <p className="pf__n"><b>50</b></p>
              <p className="pf__d">electric trucks flagged off at the port</p>
            </li>
            <li>
              <p className="pf__who">Oil Field Warehouse &amp; Radiance Green Mobility</p>
              <p className="pf__n"><b>500</b></p>
              <p className="pf__d">electric heavy commercial vehicles under a signed deployment MoU</p>
            </li>
          </ul>
        </div>

        <div className="cost__rule"><p className="cost__foot">Based on EIM's internal total cost of ownership model, comparing a 55-tonne diesel tractor with an EIM e-tractor over 10,000&nbsp;km a month. Actual savings vary with route, load, duty cycle and prevailing fuel and power tariffs.</p></div>
      </div>
    </section>
  );
}
