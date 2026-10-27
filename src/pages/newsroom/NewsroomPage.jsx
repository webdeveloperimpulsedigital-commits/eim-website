import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FleetAssessmentForm from '../../components/FleetAssessmentForm';
import useRuntime from '../../utils/useRuntime';
import { url } from '../../paths';
import { RELEASES, EVENTS, AWARDS } from './data';

// Newsroom: the latest release leads; every release opens in a reader (full text, figures, quotes, PDF);
// events run down a year ledger; awards; a press desk. Without JavaScript, release links open the PDFs.
// Press phone and email: the letterhead of EIM's press releases.
const [LEAD, ...MORE] = RELEASES;

function Hero() {
  return (
    <section className="nhero" id="top" aria-labelledby="nh-h">
      <div className="wrap nhero__grid">
        <div className="nhero__copy ihero__copy">
          <nav className="crumb" aria-label="Breadcrumb"><ol><li aria-current="page">Newsroom</li></ol></nav>
          <h1 className="ihero__h" id="nh-h">
            <span className="ln">Every milestone.</span>{' '}
            <span className="ln"><em>On the <mark>record.</mark></em></span>
          </h1>
          <p className="ihero__sub">A plant built in just over a year. Swap stations on the Delhi–Mumbai corridor. 500 electric trucks signed for three freight corridors. The latest from Energy In Motion.</p>
        </div>
        <article className="nlead">
          <a className="nlead__link" href={url(LEAD.pdf)} data-release={LEAD.id}>
            <figure className="nlead__img ihero__fig">
              <img src={url(LEAD.img)} width={LEAD.w} height={LEAD.h} alt={LEAD.alt} fetchpriority="high" />
            </figure>
            <p className="nlead__meta"><span className="nlead__tag">Latest</span>{LEAD.date} · {LEAD.place}</p>
            <h2 className="nlead__h">{LEAD.short}</h2>
            <p className="nlead__p">{LEAD.summary}</p>
            <span className="nlead__go">Read the release <svg><use href="#arrow" /></svg></span>
          </a>
        </article>
      </div>
    </section>
  );
}

function Releases() {
  return (
    <section className="rels sec sec--mist" id="releases" aria-labelledby="rl-h">
      <div className="wrap shead">
        <h2 className="h2" id="rl-h">Stations opened. <em>Partnerships signed.</em></h2>
      </div>
      <div className="wrap">
        <ol className="rels__list">
          {MORE.map((r, i) => (
            <li className="rel" key={r.id}>
              <a className="rel__link" href={url(r.pdf)} data-release={r.id}>
                <span className="rel__date">{r.date}<small>{r.place}</small></span>
                <span className="rel__txt">
                  <b className="rel__h">{r.short}</b>
                  <span className="rel__p">{r.summary}</span>
                  <span className="rel__go">Read the release <svg><use href="#arrow" /></svg></span>
                </span>
                <span className="rel__img"><img src={url(r.img)} width={r.w} height={r.h} alt="" loading={i < 2 ? 'eager' : 'lazy'} /></span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Events() {
  const years = [...new Set(EVENTS.map((e) => e.year))];
  return (
    <section className="ledger sec sec--dark" id="events" aria-labelledby="ev-h">
      <div className="wrap shead">
        <h2 className="h2" id="ev-h">Events. <em>Firsts, flag-offs and openings.</em></h2>
        <p className="lede">From our first fast charger inside Jawaharlal Nehru Port to India&rsquo;s largest battery swapping and charging station.</p>
      </div>
      <div className="wrap ledger__grid">
        <nav className="ledger__years" aria-label="Events by year">
          <ol>
            {years.map((y, i) => <li key={y} className={i === 0 ? 'is-on' : undefined} data-year={y}><a href={'#events-' + y}>{y}</a></li>)}
          </ol>
        </nav>
        <ol className="ledger__list">
          {EVENTS.map((e, i) => (
            <li className="evt" key={e.date} data-year={e.year} id={i === 0 || EVENTS[i - 1].year !== e.year ? 'events-' + e.year : undefined}>
              <figure className="evt__img"><img src={url(e.img)} alt={e.alt} loading="lazy" /></figure>
              <div className="evt__txt">
                <p className="evt__date">{e.date}</p>
                <h3 className="evt__h">{e.title}</h3>
                <p className="evt__p">{e.text}</p>
                <dl className="evt__meta">
                  <div><dt>Where</dt><dd>{e.place}</dd></div>
                  <div><dt>{e.byLab}</dt><dd>{e.by}</dd></div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section className="awds sec" id="awards" aria-labelledby="aw-h">
      <div className="wrap shead">
        <h2 className="h2" id="aw-h">Awards and recognition. <em>For the work so far.</em></h2>
      </div>
      <div className="wrap">
        <ul className="awds__list" data-stagger>
          {AWARDS.map((a) => (
            <li className="awd" key={a.title}>
              <figure className="awd__img"><img src={url(a.img)} alt={a.alt} loading="lazy" /></figure>
              <h3 className="awd__h">{a.title}</h3>
              <p className="awd__p">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PressDesk() {
  return (
    <section className="desk sec sec--mist" id="press" aria-labelledby="pd-h">
      <div className="wrap desk__grid">
        <div>
          <h2 className="h2" id="pd-h">Writing about EIM? <em>Talk to us.</em></h2>
          <p className="lede">For interviews, information and photographs.</p>
        </div>
        <div className="desk__card">
          <dl className="desk__ways">
            <div><dt>Email</dt><dd><a href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a></dd></div>
            <div><dt>Phone</dt><dd><a href="tel:+912246097488">+91 22 4609 7488</a></dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

// One reader per release, hidden until opened. Linkable as #release-<id>.
function Readers() {
  return RELEASES.map((r, i) => {
    const next = RELEASES[(i + 1) % RELEASES.length];
    return (
      <div className="reader" id={'release-' + r.id} key={r.id} role="dialog" aria-modal="true" aria-labelledby={'rd-' + r.id} hidden>
        <div className="reader__veil" data-close />
        <article className="reader__panel" data-lenis-prevent>
          <div className="reader__bar">
            <p className="reader__lab">Press release · {r.date}</p>
            <button type="button" className="reader__x" data-close aria-label="Close the release"><i /><i /></button>
          </div>
          <div className="reader__in">
            <p className="reader__place">{r.place}</p>
            <h2 className="reader__h" id={'rd-' + r.id}>{r.title}</h2>
            <p className="reader__dek">{r.dek}</p>
            <ul className="reader__figs">
              {r.figures.map(([n, d]) => <li key={d}><b>{n}</b><span>{d}</span></li>)}
            </ul>
            <figure className="reader__img">
              <img src={url(r.img)} width={r.w} height={r.h} alt={r.alt} loading="lazy" />
              <figcaption>{r.caption}</figcaption>
            </figure>
            <div className="reader__body">
              {r.body.map((p, k) => <p key={k}>{p}</p>)}
            </div>
            {r.quotes.map((q) => (
              <blockquote className="reader__q" key={q.who}>
                <p>&ldquo;{q.text}&rdquo;</p>
                <footer><b>{q.who}</b>{q.role}</footer>
              </blockquote>
            ))}
            {r.gallery && (
              <div className="reader__gal">
                {r.gallery.map(([src, alt]) => <img key={src} src={url(src)} alt={alt} loading="lazy" />)}
              </div>
            )}
            <div className="reader__end">
              <a className="btn btn--teal" href={url(r.pdf)} download><span>Download the release</span><svg><use href="#down" /></svg></a>
              <a className="reader__next" href={'#release-' + next.id} data-release={next.id}><small>Next release</small>{next.short}<svg><use href="#arrow" /></svg></a>
            </div>
          </div>
        </article>
      </div>
    );
  });
}

export default function NewsroomPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="newsroom" />
      <main id="main">
        <Hero />
        <Releases />
        <Events />
        <Awards />
        <PressDesk />
        <FleetAssessmentForm />
      </main>
      <Footer />
      <Readers />
    </>
  );
}
