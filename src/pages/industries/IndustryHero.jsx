import React from 'react';
import { url } from '../../paths';

// The industry-page hero ("three strokes"): three windows cut at the ΣIM angle, one per scene of the work.
// Focus moves between them; the matching headline word takes the teal bar and the proof below rolls over.
// Every industry page passes its own three words, scenes and proofs; behaviour lives in inner.js (strokes).
export default function IndustryHero({ crumb, words, em, sub, cta2, scenes }) {
  return (
    <section className="vh" id="top" aria-labelledby="vh-h" data-focus="0">
      <div className="vh__rails" aria-hidden="true" />

      <div className="vh__strokes">
        {scenes.map((s, i) => (
          <a className={'stk' + (i === 0 ? ' is-on' : '')} key={s.name} href={s.href} data-i={i} style={{ '--k': i }} aria-label={s.name + ': ' + s.n + ' ' + s.proof}>
            <span className="stk__clip">
              <img src={url(s.img)} width={s.w} height={s.h} alt="" style={{ objectPosition: s.pos }} fetchpriority={i === 0 ? 'high' : undefined} />
            </span>
            <svg className="stk__line" aria-hidden="true"><polygon /><line /></svg>
          </a>
        ))}
      </div>

      <ol className="vh__caps" aria-hidden="true">
        {scenes.map((s, i) => (
          <li className={'vcap' + (i === 0 ? ' is-on' : '')} key={s.name} style={{ '--k': i }} data-i={i} data-lab={s.lab} data-n={s.n} data-proof={s.proof}>
            <span className="vcap__n">{String(i + 1).padStart(2, '0')}</span>
            <b>{s.name}</b>
          </li>
        ))}
      </ol>

      <div className="vh__copy">
        <nav className="crumb crumb--dark" aria-label="Breadcrumb">
          <ol>{crumb.map((c, i) => <li key={c} aria-current={i === crumb.length - 1 ? 'page' : undefined}>{c}</li>)}</ol>
        </nav>
        <h1 className="vh__h" id="vh-h">
          <span className="vh__mk" aria-hidden="true" />
          <span className="vh__ln">
            {words.slice(0, 2).map((w, i) => <React.Fragment key={w}><span className={'vh__w' + (i === 0 ? ' is-on' : '')} data-i={i}>{w}</span>{' '}</React.Fragment>)}
          </span>{' '}
          <span className="vh__ln"><span className="vh__w" data-i="2">{words[2]}</span></span>{' '}
          <span className="vh__ln"><em>{em}</em></span>
        </h1>
        <p className="vh__sub">{sub}</p>
        <div className="vh__ctas">
          <a className="btn btn--teal" href="#assess"><span>Assess your fleet</span><svg><use href="#arrow" /></svg></a>
          <a className="btn btn--ghost" href={cta2.href}><span>{cta2.label}</span><svg><use href="#down" /></svg></a>
        </div>
      </div>

      <div className="vh__read" aria-live="polite">
        <p className="vh__lab"><span>{scenes[0].lab}</span></p>
        <p className="vh__n"><span>{scenes[0].n}</span></p>
        <p className="vh__p"><span>{scenes[0].proof}</span></p>
      </div>
    </section>
  );
}
