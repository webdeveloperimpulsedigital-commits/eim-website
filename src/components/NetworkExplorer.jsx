import React from 'react';

export default function NetworkExplorer() {
  return (
    <section className="net sec sec--ink" id="network" aria-labelledby="net-h">
      <div className="wrap">
        <div className="net__head">
          <h2 className="h2" id="net-h">Where the network stands <em>today.</em></h2>
          <p className="lede">Every swap and charging site we run today, every one we are building, and every one we have planned — zone by zone. These are the sites themselves, not a route: what is open today does not yet join up into one continuous corridor.</p>
        </div>

        <div className="net__filter" role="tablist" aria-label="Station status">
          <button role="tab" className="nf is-on" data-f="all" aria-selected="true">All sites <b>55</b></button>
          <button role="tab" className="nf" data-f="live" aria-selected="false"><i className="pip pip--live" />Existing <b>8</b></button>
          <button role="tab" className="nf" data-f="upcoming" aria-selected="false"><i className="pip pip--up" />Upcoming <b>16</b></button>
          <button role="tab" className="nf" data-f="planned" aria-selected="false"><i className="pip pip--plan" />Planned <b>31</b></button>
        </div>

        <ul className="zrows" id="zrows" />

        <div className="net__cols">
          <div className="net__open">
            <h3 className="h3">Open today</h3>
            <ol className="opens">
              <li><b>Delhi International Cargo Terminal, Ganaur, Haryana</b><span>India's first public heavy-duty battery swapping and charging station. Inaugurated October 2025 by Shri Nitin Gadkari.</span></li>
              <li><b>Nhava Sheva Distribution Terminal, Navi Mumbai</b><span>Our second heavy-duty swapping-cum-charging station, and the first step towards an EV Megaplex at JNPT.</span></li>
              <li><b>Jawaharlal Nehru Port</b><span>India's largest battery swapping and charging station. Opened May 2026 by Shri Gaurav Dayal, IAS, Chairperson, JNPA.</span></li>
            </ol>
            <p className="note">Our remaining sites are counted above but not listed individually.</p>
          </div>
          <div className="net__plan">
            <h3 className="h3">What we are building next</h3>
            <dl className="plans">
              <div><dt>By FY29</dt><dd>100 swap stations, covering the Mumbai–Nagpur, Pune–Hyderabad and Delhi–Chennai corridors.</dd></div>
              <div><dt>By March 2027</dt><dd>Expansion around Ludhiana, Delhi, Jaipur, Ahmedabad, Kandla, Mundra, Dahej, JNPT, Bengaluru and Chennai.</dd></div>
            </dl>
            <p className="note">These are targets we are working to, not stations in service today.</p>
          </div>
        </div>

        <div className="net__foot">
          <p>Tell us your route and we will tell you what is there today, what is coming, and when.</p>
          <a className="btn btn--teal" href="#assess" data-intent="site"><span>Ask about a station on your route</span><svg><use href="#arrow" /></svg></a>
        </div>
      </div>
    </section>
  );
}
