import React from 'react';

// The four applications on presentation slide 19, each with the deployment that proves it, names first.
// Ports: slide 30 and energyinmotion.in (flag-off, 25 September 2025). Cement: slide 32.
// Haulage: energyinmotion.in (MoU for 500 vehicles). Mining has no named deployment in the sources, so it gets words.
const USES = [
  { name: 'Port operations', who: 'Jawaharlal Nehru Port Authority', n: '50', what: 'e-trucks flagged off at JNPA in September 2025' },
  { name: 'Cement', who: 'UltraTech Cement', n: '45', what: 'electric trucks deployed across North India' },
  { name: 'Haulage', who: 'Oil Field Warehouse and Radiance Green Mobility', n: '500', what: 'electric heavy commercial vehicles under a deployment MoU' },
  { name: 'Mining', who: 'Mine to plant', what: 'Heavy, fixed runs between mine and plant, where a quick swap keeps the trucks turning.' },
];

export default function BuiltFor() {
  return (
    <section className="uses sec sec--dark" aria-labelledby="uses-h">
      <div className="wrap shead">
        <h2 className="h2" id="uses-h">Four kinds of heavy. <em>One truck for all of them.</em></h2>
        <p className="lede">ASHWA was engineered for port operations, haulage, cement and mining. Here is where it is already at work, or signed up to be.</p>
      </div>
      <div className="wrap">
        <ul className="uses__list" data-stagger>
          {USES.map((u) => (
            <li className="use" key={u.name}>
              <p className="use__name">{u.name}</p>
              <p className="use__who">{u.who}</p>
              {u.n ? <p className="use__n">{u.n}</p> : null}
              <p className="use__what">{u.what}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
