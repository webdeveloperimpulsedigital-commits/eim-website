import React from 'react';

// Station against station: presentation slide 17, "Swapping vs. Charging", row for row.
// The homepage compares hours per truck; this compares what each kind of station asks of a site.
const ROWS = [
  { lab: 'Time per truck', swap: 'Under 7 minutes', charge: 'About 60 minutes', bar: [7, 60] },
  { lab: 'Trucks at a time', swap: 'Swapping and charging go on together', charge: 'One truck per charging gun' },
  { lab: 'Land', swap: 'Less land for every truck served', charge: 'More land, for trucks to wait while they charge' },
  { lab: 'Grid', swap: 'An even, steady load', charge: 'A fluctuating load that can stress the grid' },
];

export default function Compare() {
  return (
    <section className="duel sec sec--dark" aria-labelledby="duel-h">
      <div className="wrap shead">
        <h2 className="h2" id="duel-h">A swap station does more. <em>Than a row of chargers.</em></h2>
        <p className="lede">Swapping cum charging against charging alone, compared station for station. The difference shows up in trips, land and power.</p>
      </div>
      <div className="wrap">
        <div className="duel__t" data-stagger role="table" aria-label="Swapping cum charging compared with charging only">
          <div className="duel__r duel__r--head" role="row">
            <span role="columnheader" className="duel__lab" />
            <span role="columnheader" className="duel__c duel__c--us">Swapping cum charging</span>
            <span role="columnheader" className="duel__c">Charging only</span>
          </div>
          {ROWS.map((r) => (
            <div className="duel__r" role="row" key={r.lab}>
              <span role="rowheader" className="duel__lab">{r.lab}</span>
              <span role="cell" className="duel__c duel__c--us">
                <b>{r.swap}</b>
                {r.bar && <i className="duel__bar" style={{ '--w': (r.bar[0] / r.bar[1]).toFixed(3) }} aria-hidden="true" />}
              </span>
              <span role="cell" className="duel__c">
                <b>{r.charge}</b>
                {r.bar && <i className="duel__bar" style={{ '--w': 1 }} aria-hidden="true" />}
              </span>
            </div>
          ))}
        </div>
        <p className="duel__foot">One swap station keeps up to 100 e-tractors a day moving.</p>
      </div>
    </section>
  );
}
