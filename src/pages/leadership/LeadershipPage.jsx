import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useRuntime from '../../utils/useRuntime';
import { url, PAGES } from '../../paths';

// Company / Leadership.
// Structure studied from live pages (2026-10-30): Anduril (founders only, large uniform portraits, titles, straight
// to footer), Rivian (founder through one cinematic quote), Redwood Materials (sticky section nav, dated photo
// history rail, uniform team grid), Hilco Global (labelled tiers), Form Energy (the story carries the scale).
// Sources: presentation slides 8–11 and 13; energyinmotion.in; press releases (quote, milestones). Dhruv Kotak and
// both co-founder titles: supplied by the agency, to be confirmed by EIM. Portraits are placeholders.

const FOUNDERS = [
  { id: 'narendra', name: 'Narendra Murkumbi', title: 'Co-founder, Managing Director & CEO' },
  { id: 'dhruv', name: 'Dhruv Kotak', title: 'Co-founder' },
];

const TEAM = [
  { id: 'amit', name: 'Amit Agarwal', role: 'President, Sales and Marketing' },
  { id: 'mahesh', name: 'Mahesh Keskar', role: 'SVP, Manufacturing' },
  { id: 'sachin', name: 'Sachin Gupta', role: 'SVP, National Head, Network Business' },
  { id: 'kapil', name: 'Kapil Baidya', role: 'VP and Head, Battery Technology' },
  { id: 'pankil', name: 'Pankil Shah', role: 'Chief Financial Officer' },
  { id: 'munjal', name: 'Munjal Savla', role: 'General Manager, Technology' },
  { id: 'basavaraj', name: 'Basavaraj Koraddi', role: 'Senior Sales Manager, After-sales Service' },
  { id: 'devdatta', name: 'Devdatta Deshmukh', role: 'Manager, Strategy' },
];

const ROOTS = [
  { part: 'The energy', who: 'Ravindra Energy', logo: 'assets/logos/ravindra.webp', link: 'Narendra Murkumbi is its Founder and Vice Chairman.',
    text: 'A listed renewable energy company supplying round-the-clock green power: solar, wind, battery storage and energy trading. It brings renewable power for our charging, and its experience with land, grid connections and solar plants goes into building our stations.' },
  { part: 'The freight', who: 'J M Baxi Group', logo: 'assets/brands/jmbaxi.webp', link: 'Dhruv Kotak is its Managing Director.',
    text: 'A 108-year-old ports and logistics group running container and multi-cargo terminals, CFSs, ICDs and rail logistics. It is our anchor customer, with around 2,000 55-tonne tractors across its facilities, and brings deep expertise in ports and shipping.' },
  { part: 'The truck', who: 'Foton',
    text: 'One of the largest commercial vehicle makers, with sales of over 650,000 units last year. We hold six years of exclusive rights to assemble, market and distribute Foton commercial vehicles above 18 tonnes in India.' },
];

const HISTORY = [
  { d: 'March 2024', t: 'Energy In Motion is registered', img: 'assets/img/tl-2024-03.webp' },
  { d: 'July 2025', t: 'ASHWA homologated by ARAI, in a record 7 months', img: 'assets/img/news/e-2025-07.webp' },
  { d: 'August 2025', t: 'Our first sale: the first e-tractor handed over to MICT', img: 'assets/img/news/e-2025-08.webp' },
  { d: 'September 2025', t: 'India’s first fleet of swappable-battery EV trucks, flagged off at JNPA', img: 'assets/img/news/e-2025-09.webp' },
  { d: 'October 2025', t: 'India’s first public heavy-duty swapping station, at DICT', img: 'assets/img/news/e-2025-10.webp' },
  { d: 'May 2026', t: 'India’s largest battery swapping and charging station, at JNPT', img: 'assets/img/news/e-2026-05.webp' },
  { d: 'July 2026', t: 'Swap-and-charge hubs agreed with HPCL', img: 'assets/img/news/n-hpcl.webp' },
  { d: 'August 2026', t: '500 electric trucks signed for three freight corridors', img: 'assets/img/news/n-mou.webp' },
  { d: 'September 2026', t: 'Nhava Sheva station opens: the start of the JNPT EV Megaplex', img: 'assets/img/news/n-nsdt.webp' },
  { d: 'October 2026', t: 'Our Talegaon vehicle and battery complex opens', img: 'assets/img/news/n-talegaon.webp' },
];

const SECTIONS = [['founders', 'Founders'], ['story', 'Our story'], ['history', 'History'], ['team', 'Leadership team']];
const pic = (id) => url('assets/img/lead/' + id + '.webp');

function Founders() {
  return (
    <section className="lf" id="founders" aria-labelledby="lf-h">
      <div className="wrap lf__grid">
      <div className="lf__head">
        <nav className="crumb" aria-label="Breadcrumb"><ol><li>Company</li><li aria-current="page">Leadership</li></ol></nav>
        <h1 className="lf__h" id="lf-h">The people building <em>Energy In Motion.</em></h1>
        <p className="lf__tier">Founders</p>
      </div>
      <div>
        <ul className="lf__pair">
          {FOUNDERS.map((f, i) => (
            <li className="lfp" key={f.id}>
              <figure className="lfp__img">
                {f.id === 'dhruv'
                  ? <span className="lfp__ph" role="img" aria-label={f.name + ', portrait to come'}><small>Portrait to come</small></span>
                  : <img src={pic(f.id)} data-placeholder alt={f.name} fetchpriority="high" />}
              </figure>
              <div className="lfp__txt">
                <h2 className="lfp__name">{f.name}</h2>
                <p className="lfp__title">{f.title}</p>
              </div>
              <span className="lfp__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}

function SubNav() {
  return (
    <nav className="lsub" aria-label="On this page">
      <div className="wrap lsub__in">
        {SECTIONS.map(([id, label], i) => <a key={id} href={'#' + id} className={i === 0 ? 'is-on' : undefined}><i />{label}</a>)}
      </div>
    </nav>
  );
}

function Statement() {
  return (
    <section className="lq" aria-label="From our founder">
      <div className="lq__bg" aria-hidden="true"><img src={url('assets/img/ind/i-ports-wide.webp')} alt="" loading="lazy" /></div>
      <div className="wrap lq__in">
        <blockquote className="lq__q">&ldquo;We will deliver heavy electric freight movement at a cost significantly below diesel transport costs besides the benefits of sustainability and freedom from dependence on imported oil.&rdquo;</blockquote>
        <p className="lq__by">Narendra Murkumbi <span>Co-founder, Managing Director &amp; CEO</span></p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="ls sec" id="story" aria-labelledby="ls-h">
      <div className="wrap ls__grid">
        <div className="ls__lead">
          <p className="ls__lab">Our story</p>
          <h2 className="h2" id="ls-h">Green power, real freight and a 55-tonne truck. <em>Brought together as one company.</em></h2>
          <p className="lede">Electric heavy freight needs all three at once. Energy In Motion was set up in March 2024 to bring them together: the truck, the battery, the station and the energy, from one company.</p>
        </div>
        <ol className="ls__roots">
          {ROOTS.map((r) => (
            <li key={r.who}>
              <p className="ls__part">{r.part}</p>
              <div className="ls__body">
                <p className="ls__who">{r.who}{r.logo && <img src={url(r.logo)} alt="" loading="lazy" />}</p>
                <p className="ls__text">{r.text}</p>
                {r.link && <p className="ls__link">{r.link}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function History() {
  return (
    <section className="lh sec sec--mist" id="history" aria-labelledby="lh-h">
      <div className="wrap lh__head">
        <h2 className="h2" id="lh-h">From registration to a plant. <em>In two and a half years.</em></h2>
        <div className="lh__ctl">
          <button type="button" className="lh__b lh__b--prev" aria-label="Earlier"><svg><use href="#arrow" /></svg></button>
          <button type="button" className="lh__b lh__b--next" aria-label="Later"><svg><use href="#arrow" /></svg></button>
        </div>
      </div>
      <ol className="lh__rail">
        {HISTORY.map((h) => (
          <li className="lhc" key={h.d}>
            <figure className="lhc__img"><img src={url(h.img)} alt="" loading="lazy" /></figure>
            <p className="lhc__d">{h.d}</p>
            <p className="lhc__t">{h.t}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Team() {
  return (
    <section className="lt sec" id="team" aria-labelledby="lt-h">
      <div className="wrap">
        <div className="lt__head">
          <p className="lf__tier">Leadership team</p>
          <h2 className="h2" id="lt-h">Running Energy In Motion. <em>Every day.</em></h2>
        </div>
        <ul className="lt__grid">
          {TEAM.map((p) => (
            <li className="ltp" key={p.id}>
              <figure className="ltp__img"><img src={pic(p.id)} data-placeholder alt={p.name} loading="lazy" /></figure>
              <h3 className="ltp__name">{p.name}</h3>
              <p className="ltp__role">{p.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Next() {
  return (
    <nav className="lnext" aria-label="Continue">
      <div className="wrap lnext__in">
        <a href={url(PAGES.about)}><small>Next</small><b>About EIM</b><svg><use href="#arrow" /></svg></a>
        <a href={url(PAGES.newsroom)}><small>Also</small><b>Newsroom</b><svg><use href="#arrow" /></svg></a>
      </div>
    </nav>
  );
}

export default function LeadershipPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="company" />
      <main id="main">
        <Founders />
        <SubNav />
        <Statement />
        <Story />
        <History />
        <Team />
        <Next />
      </main>
      <Footer />
    </>
  );
}
