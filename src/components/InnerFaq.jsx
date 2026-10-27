import React from 'react';

// FAQ for inner pages: heading holds on the left while the questions scroll.
// Each page passes its own questions; answers come from the sources named on that page.
export default function InnerFaq({ id = 'questions', title, items, mist = false }) {
  return (
    <section className={'faq sec' + (mist ? ' sec--mist' : '')} id={id} aria-labelledby={id + '-h'}>
      <div className="wrap faq__grid">
        <div className="faq__side">
          <h2 className="h2" id={id + '-h'}>{title}</h2>
          <p className="lede">Anything else, write to us at <a className="link" href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a></p>
        </div>
        <div className="faq__list">
          {items.map((item, i) => (
            <details key={i}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
