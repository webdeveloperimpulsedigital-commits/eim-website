import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useRuntime from '../../utils/useRuntime';
import { url, PAGES } from '../../paths';

// Solutions / After-sales service. Lean on purpose: only what the sources support.
// Studied live (2026-11-02): Daimler Truck "Preventing unforeseen failures" (frame the stake: a truck only earns while
// it runs), Volvo Trucks uptime services (promise first, then the ways help arrives, 24/7), Scania service network
// (the technician at work, little text). The three ways mirror energyinmotion.in's own hover panels.
// Sources: energyinmotion.in (After-Sales Service: 24x7 team across many locations, mobile service vans, porta-cabin
// workshops with tools and spare parts; three photos; Ajit Kumar Singh and Janardhan Matre testimonials);
// presentation slide 16 (battery warranty and functionality risk on EIM; live monitoring; scheduling); EIM (pack
// replaced at about seven years); NSDT press release, September 2026 (EV Megaplex: service station, driver training
// centre, heavy-vehicle simulator).

const WAYS = [
  { k: 'team', n: '01', name: 'Service team', line: 'Committed to supporting you 24x7, working round the clock across many locations in India.', img: 'assets/img/svc/sv-team.webp', alt: 'EIM service engineers in front of ASHWA e-tractors' },
  { k: 'van', n: '02', name: 'Mobile service vans', line: 'Ready to provide support whenever fleet owners need assistance.', img: 'assets/img/svc/sv-van.webp', alt: 'An EIM mobile service van' },
  { k: 'cabin', n: '03', name: 'Porta-cabin workshops', line: 'Well equipped with specialised tools and spare parts, to keep your vehicles running.', img: 'assets/img/svc/sv-cabin.webp', alt: 'An EIM porta-cabin workshop, outside and inside' },
];

const VOICES = [
  { who: 'Vitthal Wable', role: 'Director, Radiance Green Mobility Pvt. Ltd., Jyothi Transport & Freight Services Pvt. Ltd.', img: 'assets/img/t-vitthal.webp',
    text: 'As one of the early users of EIM vehicles at JNPT Port at Navi Mumbai, I’m amazed at the way EIM has created the charging infra in the JNPT eco-system comprising of multiple Swapping-cum-Charging stations - in terms of speed & scale. Looking at current oil prices, I feel lucky I switched to EV early.' },
  { who: 'Mr. Janardhan Matre', role: 'Managing Director, JIVI ENTERPRISES', img: 'assets/img/t-janardhan.webp',
    text: 'Our transition from ICE to EIM EVs has been a well-calculated strategic move, executed with remarkable efficiency. What truly differentiates EIM is not just the product, but the strength of their aftersales ecosystem. Their team has consistently ensured high fleet uptime, swift issue resolution, and a proactive approach to maintenance. EIM has proven to be a dependable long-term partner in our journey towards sustainable mobility.' },
  { who: 'Gurjeet Singh Bhatia', role: 'AVP - Transport Operations - Delhi International Cargo Terminal Private Limited (J M Baxi Ports & Logistics Private Limited)', img: 'assets/img/t-gurjeet.webp',
    text: 'By deploying EIM vehicles in NCR region, not only do I feel proud to be contributing to a Greener Environment, but I also feel richer each time my vehicle enters into Delhi, as my EV trucks are exempted from paying Rs 4000/- NGT Tax per trip imposed by Delhi Govt for Diesel trucks.' },
  { who: 'Mr. Ajit Kumar Singh', role: 'CFS Head, Mumbai Container Freight Station, J M Baxi Container Holdings Pvt Ltd.', img: 'assets/img/t-ajit.webp',
    text: 'Choosing Energy In Motion Ltd. for our transition from ICE to EV has proven to be the right decision. Beyond delivering reliable electric vehicles, EIM\'s Aftersales team has demonstrated exceptional ownership, providing timely field support, fast issue resolution, and continuous technical assistance. Their dedication has enabled us to maintain high fleet uptime while confidently embracing a cleaner and more sustainable future.' },
];

// Hero: the headline at full width, one beat per line; under it the after-sales crew in their workwear (the website's
// own After-Sales photo), cut at the slant and running off the right edge. It arrives once and then holds still.
// The photo is 900px wide at source, so it is never shown much larger than that.
function Hero() {
  return (
    <section className="svh" id="top" aria-labelledby="svh-h">
      <div className="wrap svh__top">
        <nav className="crumb" aria-label="Breadcrumb"><ol><li>Solutions</li><li aria-current="page">After-sales service</li></ol></nav>
        <h1 className="svh__h" id="svh-h"><span className="svh__b1">A truck only earns while it runs.</span> <em className="svh__b2">We keep yours <mark>running.</mark></em></h1>
      </div>
      <div className="wrap svh__row">
        <div className="svh__copy">
          <p className="svh__sub">Our service team works around the clock, across many locations in India, with vans that come to your trucks and workshops stocked with the tools and parts to fix them.</p>
          <a className="btn btn--teal" href={url('contact-us/')}><span>Talk to our service team</span><svg><use href="#arrow" /></svg></a>
        </div>
        <figure className="svh__fig">
          <img src={url('assets/img/svc/sv-team.webp')} width="900" height="461" alt="EIM’s service team in their workwear, in front of EIM e-tractors" fetchpriority="high" />
        </figure>
      </div>
    </section>
  );
}

function Ways() {
  return (
    <section className="ways3 sec sec--dark" id="ways" aria-labelledby="ways3-h">
      <div className="wrap shead">
        <h2 className="h2" id="ways3-h">Three ways we reach your truck. <em>Wherever it stops.</em></h2>
        <p className="lede">A team on call, vans ready to roll and workshops equipped for the job.</p>
      </div>
      <div className="wrap">
        <ul className="w3">
          {WAYS.map((w, i) => (
            <li className={'w3p' + (i === 0 ? ' is-on' : '')} key={w.k} tabIndex={0}>
              <span className="w3p__img"><img src={url(w.img)} alt={w.alt} loading="lazy" /></span>
              <span className="w3p__txt">
                <span className="w3p__n">{w.n}</span>
                <b className="w3p__name">{w.name}</b>
                <span className="w3p__line">{w.line}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Less() {
  return (
    <section className="less sec" aria-labelledby="less-h">
      <div className="wrap less__grid">
        <div>
          <h2 className="h2" id="less-h">The hardest part to service? <em>Not yours to worry about.</em></h2>
          <p className="lede">The battery is the most critical part of an electric truck. On every EIM truck, it stays ours.</p>
          <a className="link less__more" href={url(PAGES.maitryi)}>How Maitryi works <svg><use href="#arrow" /></svg></a>
        </div>
        <ol className="less__list">
          <li><span className="less__k">Warranty and risk</span><b>The battery&rsquo;s warranty and functionality risk stay with us.</b></li>
          <li><span className="less__k">Ageing</span><b>When a pack wears out, at around seven years, we replace it.</b></li>
          <li><span className="less__k">Watching</span><b>Our software tracks every e-tractor live, and schedules its swaps and charging.</b></li>
        </ol>
      </div>
    </section>
  );
}

function Megaplex() {
  return (
    <section className="mgx sec sec--mist" aria-labelledby="mgx-h">
      <div className="wrap mgx__grid">
        <figure className="mgx__img"><img src={url('assets/img/news/n-nsdt-station.webp')} alt="EIM’s swapping-cum-charging station at Nhava Sheva Distribution Terminal" loading="lazy" /></figure>
        <div className="mgx__copy">
          <p className="mgx__lab">JNPT EV Megaplex · Nhava Sheva</p>
          <h2 className="h2" id="mgx-h">Service built into the network. <em>Not added on later.</em></h2>
          <p className="lede">The EV Megaplex we are setting up at JNPT brings three swap-cum-charging stations together with:</p>
          <ul className="mgx__list">
            <li>A dedicated service station</li>
            <li>A driver training centre</li>
            <li>A heavy-vehicle simulator</li>
          </ul>
          <p className="mgx__note">Service keeps the trucks up; training builds the people who drive them.</p>
          <a className="link" href={url(PAGES.newsroom + '#release-nsdt')}>Read the announcement <svg><use href="#arrow" /></svg></a>
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="svv sec" aria-labelledby="svv-h">
      <div className="wrap">
        <h2 className="svv__lab" id="svv-h">What fleet operators say</h2>
        <div className="svv__stage">
          {VOICES.map((v, i) => (
            <figure className={'svq' + (i === 0 ? ' is-on' : '')} key={v.who}>
              <blockquote>&ldquo;{v.text}&rdquo;</blockquote>
              <figcaption><img src={url(v.img)} alt="" width="56" height="56" loading="lazy" /><span><b>{v.who}</b>{v.role}</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="svv__nav">
          {VOICES.map((v, i) => <button key={v.who} type="button" className={'svv__dot' + (i === 0 ? ' is-on' : '')} aria-label={'Quote from ' + v.who} data-i={i}><i /></button>)}
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="svc2 sec sec--mist" aria-labelledby="svc2-h">
      <div className="wrap svc2__in">
        <h2 className="h2" id="svc2-h">Running EIM trucks? <em>Our service team is a message away.</em></h2>
        <div className="svc2__go">
          <a className="btn btn--teal" href={url('contact-us/')}><span>Talk to our service team</span><svg><use href="#arrow" /></svg></a>
          <a className="link" href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a>
        </div>
      </div>
    </section>
  );
}

export default function ServicePage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="solutions" />
      <main id="main">
        <Hero />
        <Ways />
        <Less />
        <Megaplex />
        <Voices />
        <Close />
      </main>
      <Footer />
    </>
  );
}
