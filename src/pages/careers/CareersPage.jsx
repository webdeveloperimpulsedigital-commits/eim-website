import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useRuntime from '../../utils/useRuntime';
import { url } from '../../paths';

// Careers. Studied live in Chrome (2026-11-02): Rivian, Anduril, Form Energy, Redwood Materials, Linear, Stripe,
// Einride, Vercel. Taken: open roles reachable from the hero (all of them); culture shown through real people and
// people, not a values poster (Rivian, Redwood); awards as their own band (Form Energy); a scale statement
// as the reason to join (Stripe); clean role rows of title, place and action (Redwood, Linear, Vercel).
// Sources only: energyinmotion.in (People at EIM photos; Current Openings, applied for by email to hello.hr@);
// Talegaon release, 14 Oct 2026 (over 2,000 direct and indirect jobs, design, R&D and IT, first phase of ₹1,000 crore
// in Maharashtra, built in just over a year, round-the-clock efforts of the team); Rewari release, 29 Sep 2026
// (40 stations planned this FY); website timeline (India's first heavy-duty battery-swappable 55T e-tractor, ARAI
// homologation in a record 7 months); Awards & Recognition (Foton, Viksit Bharat, SAEINDIA); People at EIM photos and the
// timeline's March 2024 team photo for Life at EIM; Maitryi 40%; after-sales 24x7.

const ROLES = [
  { id: 'operator', title: 'Operator', dept: 'Operations', loc: 'Thanjavur, Chennai', subj: 'Application for Operator' },
  { id: 'charger-technician', title: 'Charger Technician', dept: 'Technical', loc: 'Amirghadh, Gujarat', subj: 'Application for Charger Technician' },
  { id: 'sales-coordinator', title: 'Sales Co-ordinator', dept: 'Sales', loc: 'Navi Mumbai', subj: 'Application for Sales Co-ordinator' },
];
const role = (id) => ROLES.find((r) => r.id === id);
const mail = (subj) => 'mailto:hello.hr@energyinmotion.in' + (subj ? '?subject=' + encodeURIComponent(subj) : '');

const STOPS = [
  { k: 'build', n: '01', name: 'Build', where: 'Talegaon, Pune',
    line: 'We assemble electric heavy trucks and their lithium-ion battery packs, and test batteries in our own independent laboratory.',
    more: 'Work in manufacturing, design, R&D and IT.',
    img: 'assets/img/news/n-talegaon.webp', pos: '36% 78%', alt: 'EIM’s electric heavy commercial vehicle complex at Talegaon, Pune' },
  { k: 'power', n: '02', name: 'Power and operations', where: 'Highways, ports and industrial complexes',
    line: 'We build megawatt-scale hubs that swap a battery in under 7 minutes and fast-charge any vehicle with a CCS-2 socket.',
    more: '40 stations planned across India this financial year.',
    img: 'assets/img/car/c-station.webp', alt: 'Two EIM e-tractors at an EIM swapping-cum-charging station', roles: ['operator', 'charger-technician'] },
  { k: 'service', n: '03', name: 'Service', where: 'Wherever our trucks run',
    line: 'Our service team works round the clock across many locations in India, with mobile service vans and porta-cabin workshops.',
    img: 'assets/img/svc/sv-team.webp', alt: 'EIM’s service team in their workwear, in front of EIM e-tractors' },
  { k: 'sales', n: '04', name: 'Sales', where: 'Ports, plants and freight corridors',
    line: 'We help fleet owners go electric with Maitryi: the battery stays ours, and the upfront cost of a truck drops by 40%.',
    img: 'assets/img/car/c-keys.webp', alt: 'Two members of the EIM team holding the key to a new EIM truck', roles: ['sales-coordinator'] },
];

const LIFE = [
  { k: 'a', img: 'assets/img/car/c-first.webp', cap: 'Launch day: India’s first battery-swappable electric truck', alt: 'The EIM team in teal polos at the launch of India’s first battery-swappable electric truck' },
  { k: 'b', img: 'assets/img/car/c-cake.webp', cap: 'A celebration at the office', alt: 'The EIM team cutting a cake at the office' },
  { k: 'c', img: 'assets/img/tl-2024-03.webp', cap: 'The team in March 2024, the month EIM was registered', alt: 'The EIM team in green polos on a lawn', pos: '50% 60%' },
  { k: 'd', img: 'assets/img/car/c-handover.webp', cap: 'Handing over the keys', alt: 'An EIM team member handing over the key to a new EIM truck' },
  { k: 'e', img: 'assets/img/car/c-fast.webp', cap: 'Handover day', alt: 'The EIM team at a truck handover ceremony' },
  { k: 'f', img: 'assets/img/car/c-crew.webp', cap: 'Our crew with the fleet', alt: 'An EIM crew in hi-vis vests in front of a line of EIM trucks', pos: '50% 62%' },
  { k: 'g', img: 'assets/img/car/c-office.webp', cap: 'At our office', alt: 'The EIM team at our office', pos: '50% 55%' },
];

// energyinmotion.in, Awards & Recognition (the ARAI certificate photo is in the same set on the site); timeline for ARAI.
const AWARDS = [
  { k: 'foton', by: 'Foton · Global Partner’s Conference 2026', t: 'The Pioneer in New Energy Promotion Award', d: 'For innovation, sustainability and shaping the future of new energy mobility in India.', img: 'assets/img/news/a-foton.webp', alt: 'The Foton Pioneer in New Energy Promotion Award', pos: '50% 40%' },
  { k: 'viksit', by: 'Ease of Doing Business · #CF2026', t: 'Viksit Bharat ‘Ambassador of Change’ Award', d: 'MODINOMICS 3.0, Jury Choice for Climate Action (Future in Mobility). Presented by Smt. Meenakshi Lekhi.', img: 'assets/img/news/a-viksit.webp', alt: 'The EIM team receives the Viksit Bharat award on stage', pos: '42% 50%' },
  { k: 'sae', by: 'SAEINDIA', t: 'SAEINDIA recognition', d: 'SAEINDIA felicitated us with a memento in recognition of our valuable support.', img: 'assets/img/news/a-sae.webp', alt: 'EIM receives a memento from SAEINDIA', pos: '50% 50%' },
  { k: 'arai', by: 'ARAI · July 2025', t: 'CMVR homologation in a record 7 months', d: 'For India’s first heavy-duty, battery-swappable 55-tonne electric tractor.', img: 'assets/img/news/e-2025-07.webp', alt: 'The EIM team receives the homologation certificate at ARAI', pos: '50% 50%' },
];

function Hero() {
  return (
    <section className="jnh" id="top" aria-labelledby="jnh-h">
      <div className="jnh__stage">
        <div className="jnh__win">
          <picture>
            <source media="(max-width:760px)" srcSet={url('assets/img/car/c-dusk-m.webp')} />
            <img className="jnh__img" src={url('assets/img/car/c-dusk.webp')} width="2400" height="1500" alt="An EIM electric truck hauling cargo across the port at dusk" fetchpriority="high" />
          </picture>
        </div>
        <i className="jnh__shade" aria-hidden="true" />
      </div>
      <h1 className="jnh__h" id="jnh-h">
        <span className="jnh__l jnh__l--1"><span>Heavy freight</span></span>{' '}
        <span className="jnh__l jnh__l--2"><span>is going electric.</span></span>{' '}
        <em className="jnh__b2"><span>Come <mark>build</mark> it with us.</span></em>
      </h1>
      <div className="jnh__now">
        <span className="jnh__lab">Now hiring</span>
        <ul>
          {ROLES.map((r) => (
            <li key={r.id}><a href={'#role-' + r.id}><b>{r.title}</b><span>{r.loc}</span><svg><use href="#arrow" /></svg></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Scale() {
  return (
    <section className="jns sec sec--dark" aria-labelledby="jns-h">
      <div className="wrap jns__grid">
        <h2 className="jns__h" id="jns-h"><span className="jns__n">2,000+</span> <span className="jns__t">jobs from our first plant. <em>That&rsquo;s phase one.</em></span></h2>
        <div className="jns__side">
          <p className="lede">Our Talegaon complex in Pune is expected to create over 2,000 direct and indirect jobs, with work in design, R&amp;D and IT. It is the first phase of our ₹1,000 crore investment in Maharashtra.</p>
          <dl className="jns__facts">
            <div><dt>Just over a year</dt><dd>from signing the MoU to opening Talegaon</dd></div>
            <div><dt>40 stations</dt><dd>planned across India this financial year</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="jnj" id="teams" aria-labelledby="jnj-h">
      <div className="wrap jnj__head">
        <h2 className="h2" id="jnj-h">From the plant to the highway. <em>Every stop is a team.</em></h2>
      </div>
      <div className="jnj__pin">
        <div className="wrap jnj__bar">
          <ol className="jnj__prog" aria-hidden="true">
            {STOPS.map((s) => <li key={s.k}><i /><span>{s.n} {s.name}</span></li>)}
          </ol>
        </div>
        <div className="jnj__track">
          {STOPS.map((s) => (
            <article className="jnp" key={s.k} id={'team-' + s.k} aria-labelledby={'jnp-' + s.k}>
              <figure className="jnp__img"><img src={url(s.img)} alt={s.alt} loading="lazy" style={s.pos ? { objectPosition: s.pos } : undefined} /></figure>
              <div className="jnp__txt">
                <span className="jnp__n">{s.n}<i /> {s.where}</span>
                <h3 className="jnp__name" id={'jnp-' + s.k}>{s.name}</h3>
                <p className="jnp__line">{s.line}</p>
                {s.more && <p className="jnp__more">{s.more}</p>}
                {s.roles && (
                  <div className="jnp__hire">
                    <span className="jnp__lab">Hiring now</span>
                    {s.roles.map((id) => { const r = role(id); return <a key={id} href={'#role-' + id}><span><b>{r.title}</b>{r.loc}</span><svg><use href="#arrow" /></svg></a>; })}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Life() {
  return (
    <section className="jnl sec sec--mist" id="life" aria-labelledby="jnl-h">
      <div className="wrap">
        <h2 className="h2" id="jnl-h">Life at EIM. <em>Launches, handovers and the odd cake.</em></h2>
      </div>
      <ul className="wrap jnl__grid">
        {LIFE.map((x) => (
          <li className={'jnl__t jnl__t--' + x.k} key={x.k}>
            <figure>
              <span className="jnl__img"><img src={url(x.img)} alt={x.alt} loading="lazy" style={x.pos ? { objectPosition: x.pos } : undefined} /></span>
              <figcaption>{x.cap}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Awards() {
  return (
    <section className="jna sec sec--dark" id="awards" aria-labelledby="jna-h">
      <div className="wrap">
        <h2 className="h2" id="jna-h">Awards and recognition. <em>Two years in.</em></h2>
      </div>
      <ol className="wrap jna__row">
        {AWARDS.map((a) => (
          <li className="jna__c" key={a.k}>
            <span className="jna__img"><img src={url(a.img)} alt={a.alt} loading="lazy" style={{ objectPosition: a.pos }} /></span>
            <span className="jna__txt">
              <span className="jna__by">{a.by}</span>
              <b className="jna__t">{a.t}</b>
              <span className="jna__d">{a.d}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Roles() {
  return (
    <section className="jnr sec" id="roles" aria-labelledby="jnr-h">
      <div className="wrap">
        <h2 className="h2" id="jnr-h">Open roles. <em>Your move.</em></h2>
      </div>
      <ul className="wrap jnr__list">
        {ROLES.map((r) => (
          <li className="jnr__row" id={'role-' + r.id} key={r.id}>
            <a className="jnr__a" href={mail(r.subj)}>
              <span className="jnr__dept">{r.dept}</span>
              <b className="jnr__t">{r.title}</b>
              <span className="jnr__meta"><span>{r.loc}</span><span>Full time</span></span>
              <span className="jnr__go">Apply<svg><use href="#arrow" /></svg></span>
            </a>
          </li>
        ))}
      </ul>
      <div className="wrap jnr__open">
        <p>Don&rsquo;t see your role? Send us your CV and tell us where you&rsquo;d fit.</p>
        <a className="link" href={mail()}>hello.hr@energyinmotion.in</a>
      </div>
    </section>
  );
}

export default function CareersPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="careers" onDark />
      <main id="main">
        <Hero />
        <Scale />
        <Journey />
        <Life />
        <Awards />
        <Roles />
      </main>
      <Footer />
    </>
  );
}
