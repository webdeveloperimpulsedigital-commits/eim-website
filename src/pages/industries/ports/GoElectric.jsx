import React from 'react';

// How a terminal goes electric with us: assess (the approved assess form's promise), infrastructure built and run
// by EIM (slide 16), trucks without batteries on Maitryi, 40% less capital, financing on par with diesel
// (slides 7, 9, 15), and everything kept running: batteries, charging, software, 24x7 service (slide 16, website).
const STEPS = [
  { t: 'We study your operation', d: 'Tell us your moves, shifts and routes. Our team comes back with a plan built around them: trucks, station and cost per kilometre.' },
  { t: 'We build and run the station', d: 'Swap-cum-charging infrastructure for your fleet, built, powered and run by us.' },
  { t: 'Your trucks arrive, without batteries', d: 'ASHWA e-tractors on Maitryi: 40% less capital upfront, financed on par with a diesel truck.' },
  { t: 'We keep it all running', d: 'Batteries, charging, scheduling software and 24x7 service stay with us. You run the terminal.' },
];

export default function GoElectric() {
  return (
    <section className="goel sec sec--dark" id="how" aria-labelledby="ge-h">
      <div className="wrap shead">
        <h2 className="h2" id="ge-h">From first call to first swap. <em>Four steps.</em></h2>
        <p className="lede">Going electric at a terminal is a project, not a purchase. Here is how we take it off your hands.</p>
      </div>
      <div className="wrap">
        <ol className="goel__list">
          <span className="goel__rail" aria-hidden="true"><i /></span>
          {STEPS.map((s, i) => (
            <li className="goel__s" key={s.t}>
              <span className="goel__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
