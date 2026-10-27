import React from 'react';

// With the battery, or with Maitryi: a switch flips every row between the two ways of buying.
// Sources: presentation slide 22 (TCO, 10,000 km a month) and slide 23 (battery-specific benefits).
// 54,935 = 3,78,980 - 3,24,045, the difference between slide 22's two electric total-outflow rows.
// Without JavaScript the Maitryi column shows, with the other figure written under each row.
const ROWS = [
  { label: 'Total outflow per truck, a month', a: 378980, b: 324045, pre: '₹', fmt: 'inr' },
  { label: 'Cost per kilometre, all in', a: 37.9, b: 32.4, pre: '₹', fmt: 'dec' },
  { label: 'Battery upkeep per kilometre', a: 2.5, b: 0, pre: '₹', fmt: 'dec' },
  { label: 'Hours a month spent charging or swapping', a: 67, b: 12, unit: 'hours' },
  { label: 'Range on a full pack', a: 141, b: 215, unit: 'km', up: true },
  { label: 'Ageing and replacement of the pack', a: 'Yours', b: 'Ours' },
];

// Indian digit grouping: 3,78,980
function inr(n) {
  const v = String(Math.round(n)), last = v.slice(-3), rest = v.slice(0, -3);
  return rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last : last;
}
export function show(r, k) {
  const v = r[k];
  if (typeof v === 'string') return v;
  const n = r.fmt === 'inr' ? inr(v) : r.fmt === 'dec' && v ? v.toFixed(1) : String(v);
  return (r.pre || '') + n + (r.unit ? ' ' + r.unit : '');
}

export default function Versus() {
  return (
    <section className="vs sec sec--dark" id="compare" aria-labelledby="vs-h">
      <div className="wrap vs__head">
        <h2 className="h2" id="vs-h">Buy the battery, or don't. <em>See what changes.</em></h2>
        <p className="lede">From our total cost of ownership model: an electric tractor bought with its battery, against one bought on Maitryi, both running 10,000 kilometres a month.</p>
      </div>

      <div className="wrap">
        <div className="vs__panel" data-state="b">
          <div className="vs__side">
            <div className="vs__sw" role="group" aria-label="Compare two ways of buying">
              <button type="button" className="vs__opt" data-k="a" aria-pressed="false">Bought with its battery</button>
              <button type="button" className="vs__opt is-on" data-k="b" aria-pressed="true">On Maitryi</button>
            </div>
            <div className="vs__sum">
              <p className="vs__big"><b>₹54,935</b><span>less going out per truck, every month, on Maitryi</span></p>
              <p className="vs__big"><b>8<small>%</small></b><span>more trips a month, from quick swaps and a bigger pack</span></p>
            </div>
          </div>

          <ul className="vs__rows">
            {ROWS.map((r, i) => {
              const num = typeof r.a === 'number';
              const max = num ? Math.max(r.a, r.b) : 1;
              return (
                <li className="vrow" key={i} data-a={show(r, 'a')} data-b={show(r, 'b')}
                    style={num ? { '--wa': (r.a / max).toFixed(4), '--wb': (r.b / max).toFixed(4) } : undefined}>
                  <span className="vrow__lab">{r.label}</span>
                  <b className="vrow__val"><span>{show(r, 'b')}</span></b>
                  {num ? <span className="vrow__bar" aria-hidden="true"><i /></span> : <span className="vrow__mark" aria-hidden="true" />}
                  <span className="vrow__alt"><em>Bought with its battery</em> <span>{show(r, 'a')}</span></span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="vs__rule">
          <p className="foot foot--dark">Based on EIM's internal total cost of ownership model, comparing an electric tractor bought with a 282 kWh battery and an EIM e-tractor with a 350 kWh pack on Maitryi, both running 10,000 km a month. Actual figures vary with route, load, duty cycle and prevailing power tariffs.</p>
        </div>
      </div>
    </section>
  );
}
