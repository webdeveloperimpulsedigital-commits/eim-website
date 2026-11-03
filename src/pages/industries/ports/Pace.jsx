import React from 'react';

// What a port gets, row by row, each in the sources' own terms.
// NSDT release (Sept 2026): "battery swapping enables rapid turnaround, dedicated service infrastructure supports
// vehicle uptime, and driver training and simulation build the human capabilities required for large-scale electric
// fleet operations"; "Smart slot-booking systems, slot optimisation and shared operational practices are helping
// integrate electric vehicles into high-throughput freight operations". Deck slide 16: swapping in < 7 mins, one
// station caters to 100 e-tractors a day. Website: 24x7 service team. Deck slide 15: renewable energy for charging
// "to enhance Scope 3 emission compliance".
const ROWS = [
  { t: 'Rapid turnaround', d: 'A battery swap takes under 7 minutes, and one station serves 100 e-tractors a day.' },
  { t: 'Slotted into your operation', d: 'Smart slot-booking, slot optimisation and shared operating practices fit electric trucks into high-throughput freight operations.' },
  { t: 'Uptime, on site', d: 'Dedicated service infrastructure and our 24x7 service team keep the fleet available.' },
  { t: 'Drivers who are ready', d: 'Driver training and simulation build the skills a large electric fleet needs.' },
  { t: 'Cleaner energy', d: 'We charge on as much renewable energy as we can, to support your Scope 3 emission compliance.' },
];

export default function Pace() {
  return (
    <section className="pa sec" id="pace" aria-labelledby="pa-h">
      <div className="wrap pa__grid">
        <h2 className="h2 pa__h" id="pa-h">Built around port operations. <em>Not around a charger.</em></h2>
        <ol className="pa__list">
          {ROWS.map((r, i) => (
            <li className="pa__row" key={r.t}>
              <span className="pa__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="pa__t">{r.t}</h3>
              <p className="pa__d">{r.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
