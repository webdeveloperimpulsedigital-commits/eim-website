import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FleetAssessmentForm from '../../components/FleetAssessmentForm';
import useRuntime from '../../utils/useRuntime';
import { url, PAGES } from '../../paths';

// Company / About EIM.
// Sources: energyinmotion.in (overview, associate company of Ravindra Energy, events, MD bio); presentation slides 7
// (the four pillars), 8–10 (Ravindra Energy, J M Baxi, Foton exclusivity, anchor customer, lenders), 13 (journey);
// press releases Jul–Oct 2026 (Talegaon complex, technology partners, HPCL, OWS–Radiance MoU, NSDT, Rewari).

// Why we exist: presentation slide 4 ("Energy intensive & pollute disproportionately"), citing Climate Group's
// early market outlook on electrifying medium and heavy-duty trucks in India, and NITI Aayog (August 2025).
const WHY = [
  { v: 3, t: 'of the vehicles on India’s roads are medium and heavy trucks.' },
  { v: 15, t: 'of the kilometres driven on India’s roads are driven by them.' },
  { v: 35, t: 'of the fuel burnt on India’s roads is burnt by them. Eleven times their share of the fleet, and 34% of the emissions.' },
];

const PARTS = [
  { k: 'truck', n: '01', name: 'The truck', line: 'ASHWA, our 55-tonne battery-swappable prime mover, assembled at Talegaon.', img: 'assets/img/ashwa/a-side.webp', href: PAGES.ashwa },
  { k: 'battery', n: '02', name: 'The battery', line: 'CATL packs that we own, maintain and replace. You never buy one.', img: 'assets/img/mai-pack.webp', cut: true, href: PAGES.maitryi },
  { k: 'station', n: '03', name: 'The station', line: 'A swap in under 7 minutes, and CCS2 fast charging for any brand.', img: 'assets/img/station-sky.webp', href: PAGES.swap },
  { k: 'energy', n: '04', name: 'The energy', line: 'As much renewable power as we can source, backed by Ravindra Energy.' },
];

// Where we stand, as stated in our own releases (dates in the captions).
const NOW = [
  { n: '8', d: 'swap stations operational, September 2026' },
  { n: '~150', d: 'EIM electric trucks working within JNPA, September 2026' },
  { n: '500', d: 'electric heavy vehicles under our MoU with OWS and Radiance' },
  { n: '₹500', u: 'crore', d: 'invested in our Talegaon complex, opened October 2026' },
];

// The pace: every month from registration to today, the months with a milestone lit.
const MILESTONES = [
  { ym: '2024-03', t: 'EIM is registered', d: 'Set up to take heavy freight off diesel.', img: 'assets/img/tl-2024-03.webp' },
  { ym: '2024-08', t: 'Our first fast charger inside JNPT', d: 'India’s first high-capacity EV fast charging inside Jawaharlal Nehru Port.', img: 'assets/img/news/e-2024-08.webp' },
  { ym: '2025-07', t: 'ASHWA homologated in a record 7 months', d: 'ARAI certifies India’s first heavy-duty, battery-swappable 55-tonne electric tractor.', img: 'assets/img/news/e-2025-07.webp' },
  { ym: '2025-08', t: 'ASHWA launched. Our first sale', d: 'The first e-tractor handed over to Mumbai International Cargo Terminal.', img: 'assets/img/news/e-2025-08.webp' },
  { ym: '2025-09', t: 'India’s first fleet of swappable-battery EV trucks', d: 'Flagged off at Jawaharlal Nehru Port Authority.', img: 'assets/img/news/e-2025-09.webp' },
  { ym: '2025-10', t: 'India’s first public heavy-duty swap station', d: 'Inaugurated at Delhi International Cargo Terminal.', img: 'assets/img/news/e-2025-10.webp' },
  { ym: '2025-11', t: 'No. 2 in India', d: 'In electric heavy-duty truck sales.', img: 'assets/img/fleet-row.webp' },
  { ym: '2026-05', t: 'India’s largest swapping and charging station', d: 'Opened at Jawaharlal Nehru Port.', img: 'assets/img/news/e-2026-05.webp' },
  { ym: '2026-07', t: 'A 350 kWh ASHWA, and a partnership with HPCL', d: 'The bigger pack homologated; swap-and-charge hubs agreed for HPCL outlets.', img: 'assets/img/news/n-hpcl.webp' },
  { ym: '2026-08', t: '500 electric trucks for three corridors', d: 'Our MoU with Oil Field Warehouse & Services and Radiance Green Mobility.', img: 'assets/img/news/n-mou.webp' },
  { ym: '2026-09', t: 'Nhava Sheva and Rewari', d: 'Our second station at NSDT starts the JNPT EV Megaplex; Rewari opens on NH-48.', img: 'assets/img/news/n-nsdt.webp' },
  { ym: '2026-10', t: 'Our Talegaon complex opens', d: 'Vehicle assembly, battery pack assembly and battery testing, under one roof.', img: 'assets/img/news/n-talegaon.webp' },
];
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEARS = ['2024', '2025', '2026'];
const FIRST = '2024-03', LAST = '2026-10';
const label = (ym) => MONTH_NAMES[+ym.slice(5) - 1] + ' ' + ym.slice(0, 4);

const PARTNERS = [
  { part: 'The truck', who: 'Foton', what: 'Six years of exclusive rights to assemble, market and distribute Foton commercial vehicles above 18 tonnes in India.', fact: 'Foton Motor is one of the largest commercial vehicle companies, with sales exceeding 650,000 units last year.' },
  { part: 'The battery', who: 'CATL', what: 'Our battery packs come from Contemporary Amperex Technology Co., Limited.', fact: 'The world’s largest battery manufacturer, with 39% of the global market.' },
  { part: 'The swap', who: 'Shanghai Enneagon', what: 'Our technology partner for robotic battery swapping systems.', fact: 'It has built over 1,600 swapping stations worldwide.' },
  { part: 'The sites', who: 'HPCL', what: 'Swap-and-charge hubs at Hindustan Petroleum retail outlets, starting on our key freight corridors.', fact: 'HPCL operates over 25,000 retail outlets, on all major highways and expressways.' },
  { part: 'The energy', who: 'Ravindra Energy', what: 'We are an associate company of Ravindra Energy Limited, listed on the NSE and BSE.', fact: 'Round-the-clock renewable energy for corporates: solar, wind, battery energy storage and energy trading.', logo: 'assets/logos/ravindra.webp' },
  { part: 'The freight', who: 'J M Baxi Group', what: 'Our anchor customer, with around 2,000 55-tonne tractors across its facilities.', fact: 'A 108-year-old group running container and multi-cargo terminals, CFSs, ICDs and rail logistics.', logo: 'assets/brands/jmbaxi.webp' },
];

function Hero() {
  return (
    <section className="abx" id="top" aria-labelledby="abx-h">
      <div className="abx__stage">
        <canvas className="abx__cv" aria-hidden="true" />
        <video className="abx__vid" muted loop playsInline preload="metadata" poster={url('assets/img/about/ab-loop-poster.webp')} aria-hidden="true">
          <source src={url('assets/video/ab-loop.mp4')} type="video/mp4" />
        </video>
        <div className="abx__shade" aria-hidden="true" />
        <div className="abx__prog" aria-hidden="true"><i className="on" /><i /><i /><i /></div>

        <div className="wrap abx__copy">
          <nav className="crumb crumb--dark" aria-label="Breadcrumb"><ol><li>Company</li><li aria-current="page">About EIM</li></ol></nav>
          <ol className="abx__beats">
            {WHY.map((b, i) => (
              <li className={'abx__beat' + (i === 0 ? ' is-on' : '')} key={b.v} data-v={b.v}>
                <p className="abx__n">{b.v}<small>%</small></p>
                <p className="abx__t">{b.t}</p>
                <span className="abx__bar" style={{ '--v': b.v }} aria-hidden="true"><i /></span>
              </li>
            ))}
          </ol>
          <div className="abx__end">
            <h1 className="abx__h" id="abx-h">The smallest slice of India&rsquo;s traffic. <em>The biggest share of its fuel.</em></h1>
            <p className="abx__sub">Heavy trucks are the part of India&rsquo;s freight that Energy In Motion was built to change. We make the trucks, own the batteries, run the stations and source the energy, so a fleet can leave diesel behind.</p>
            <a className="btn btn--teal" href="#system"><span>See how we do it</span><svg><use href="#down" /></svg></a>
          </div>
          <p className="abx__src">Source: Climate Group, early market outlook on electrifying medium and heavy-duty trucks in India; NITI Aayog, August 2025. As cited in our corporate presentation.</p>
        </div>
      </div>
    </section>
  );
}

function System() {
  return (
    <section className="asm sec" id="system" aria-labelledby="asm-h">
      <div className="wrap shead">
        <h2 className="h2" id="asm-h">One company. <em>The whole system.</em></h2>
        <p className="lede">Electric freight fails when the truck, the battery, the station and the power come from four different places. We bring all four, so a fleet owner deals with one partner from the day the truck arrives.</p>
      </div>
      <div className="wrap">
        <ol className="asm__band">
          {PARTS.map((p, i) => (
            <li className={'asm__p asm__p--' + p.k} key={p.k} style={{ '--k': i }}>
              {p.href ? (
                <a href={url(p.href)} aria-label={p.name + ': ' + p.line}>
                  <span className="asm__img">{p.img && <img src={url(p.img)} alt="" loading="lazy" />}</span>
                </a>
              ) : (
                <span className="asm__img asm__img--energy"><b>Solar</b><b>Wind</b><b>Storage</b></span>
              )}
            </li>
          ))}
        </ol>
        <ol className="asm__caps">
          {PARTS.map((p) => (
            <li key={p.k}><span className="asm__n">{p.n}</span><b>{p.name}</b><span className="asm__line">{p.line}</span></li>
          ))}
        </ol>
        <ul className="stats ab-now">
          {NOW.map((x) => (
            <li className="stat" key={x.d}><b>{x.n}{x.u && <small>{x.u}</small>}</b><span>{x.d}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Pace() {
  const byYm = Object.fromEntries(MILESTONES.map((m, i) => [m.ym, i]));
  const last = MILESTONES[MILESTONES.length - 1];
  return (
    <section className="pace sec sec--dark" id="journey" aria-labelledby="pace-h">
      <div className="wrap shead">
        <h2 className="h2" id="pace-h">From registration to a plant. <em>In under three years.</em></h2>
        <p className="lede">Registered in March 2024. Homologated in a record seven months. A plant of our own by October 2026.</p>
      </div>
      <div className="wrap pace__grid">
        <div className="cal" role="group" aria-label="Milestones by month">
          <div className="cal__row cal__row--head" aria-hidden="true"><span />{MONTHS.map((m, i) => <span key={i}>{m}</span>)}</div>
          {YEARS.map((y) => (
            <div className="cal__row" key={y}>
              <span className="cal__y">{y}</span>
              {MONTHS.map((_, i) => {
                const ym = y + '-' + String(i + 1).padStart(2, '0');
                const k = byYm[ym];
                const out = ym < FIRST || ym > LAST;
                if (k !== undefined) {
                  return <button type="button" key={ym} className={'cal__m is-ms' + (k === MILESTONES.length - 1 ? ' is-on' : '')} data-k={k} aria-label={label(ym) + ': ' + MILESTONES[k].t}><i /></button>;
                }
                return <span key={ym} className={'cal__m' + (out ? ' is-out' : '')} aria-hidden="true"><i /></span>;
              })}
            </div>
          ))}
        </div>

        <div className="pace__card" aria-live="polite">
          <figure className="pace__img">
            {MILESTONES.map((m, i) => <img key={m.ym} className={i === MILESTONES.length - 1 ? 'is-on' : undefined} data-k={i} src={url(m.img)} alt="" loading="lazy" />)}
          </figure>
          <p className="pace__when"><span>{label(last.ym)}</span></p>
          <h3 className="pace__t"><span>{last.t}</span></h3>
          <p className="pace__d"><span>{last.d}</span></p>
        </div>
      </div>

      {/* the same milestones as a list: shown on phones, and to screen readers */}
      <div className="wrap">
        <ol className="pace__list">
          {MILESTONES.map((m, i) => (
            <li key={m.ym} data-k={i} data-when={label(m.ym)} data-t={m.t} data-d={m.d}><span>{label(m.ym)}</span><b>{m.t}</b>{m.d}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="gl sec" id="partners" aria-labelledby="gl-h">
      <div className="wrap shead">
        <h2 className="h2" id="gl-h">Every part of the system. <em>Backed by someone who knows it.</em></h2>
        <p className="lede">The truck, the battery, the swap, the sites, the energy and the freight: each one has a partner that leads its field.</p>
      </div>
      <div className="wrap gl__grid">
        <ol className="gl__names">
          {PARTNERS.map((p, i) => (
            <li className={'gl__r' + (i === 0 ? ' is-on' : '')} key={p.who} data-i={i} tabIndex={0}>
              <span className="gl__part">{p.part}</span>
              <span className="gl__who">{p.who}</span>
              <span className="gl__det"><span>{p.what}</span><span>{p.fact}</span></span>
            </li>
          ))}
        </ol>
        <div className="gl__card" aria-hidden="true">
          {PARTNERS.map((p, i) => (
            <div className={'gl__c' + (i === 0 ? ' is-on' : '')} key={p.who} data-i={i}>
              <p className="gl__cpart">{p.part}</p>
              <p className="gl__cwho">{p.who}</p>
              <p className="gl__cwhat">{p.what}</p>
              <p className="gl__cfact">{p.fact}</p>
              {p.logo && <img className="gl__logo" src={url(p.logo)} alt="" loading="lazy" />}
            </div>
          ))}
        </div>
      </div>
      <div className="wrap"><p className="gl__foot">And the lenders who finance our e-tractors without the battery, on terms on par with diesel trucks.</p></div>
    </section>
  );
}

function Talegaon() {
  return (
    <section className="tf sec sec--mist" id="talegaon" aria-labelledby="tf-h">
      <div className="wrap">
        <figure className="tf__frame">
          <img src={url('assets/img/news/n-talegaon.webp')} width="1210" height="592" alt="Our complex at Talegaon, Pune, with an ASHWA e-tractor in front" loading="lazy" />
          <figcaption className="tf__over">
            <p className="tf__lab">Talegaon, Pune · Opened October 2026</p>
            <h2 className="tf__h" id="tf-h">The truck and its battery. <em>Built under one roof.</em></h2>
          </figcaption>
        </figure>
        <div className="tf__row">
          <ol className="tf__three">
            <li><span>01</span>Electric heavy commercial vehicle assembly</li>
            <li><span>02</span>Lithium-ion battery pack assembly</li>
            <li><span>03</span>An independent battery testing laboratory</li>
          </ol>
          <ul className="tf__facts">
            <li><b>₹1,000<small>crore</small></b><span>our planned investment in Maharashtra; Talegaon is its first phase</span></li>
            <li><b>5,000</b><span>vehicles a shift a year, initial capacity</span></li>
            <li><b>2,000+</b><span>direct and indirect jobs expected</span></li>
          </ul>
        </div>
        <a className="link tf__link" href={url(PAGES.newsroom + '#release-talegaon')}>Read about the opening <svg><use href="#arrow" /></svg></a>
      </div>
    </section>
  );
}

function Leader() {
  return (
    <section className="mdl sec" id="leadership" aria-labelledby="md-h">
      <div className="wrap mdl__grid">
        <div className="mdl__who">
          <img className="mdl__pic" src={url('assets/img/narendra.webp')} width="249" height="257" alt="Narendra Murkumbi" loading="lazy" />
          <p className="mdl__lab">Managing Director &amp; CEO</p>
          <h2 className="h2" id="md-h">Narendra Murkumbi. <em>A builder of industries.</em></h2>
          <ul className="mdl__cv">
            <li>Co-founded Shree Renuka Sugars in 1998, now one of the largest sugar manufacturers globally</li>
            <li>Founder and Vice Chairman of Ravindra Energy</li>
            <li>Independent Director, ICICI Bank (2006–2010); board member, NCDEX (2010–2014)</li>
            <li>Electronics engineer, Karnataka University; MBA, IIM Ahmedabad (1994)</li>
            <li>&lsquo;The Entrepreneur of the Year&rsquo;, Economic Times Awards, 2010</li>
          </ul>
        </div>
        <figure className="mdl__q">
          <blockquote>&ldquo;We now focus on building out a nationwide network of megawatt scale charging and battery swapping stations to enable India&rsquo;s speedy transition from diesel to electric heavy goods transportation.&rdquo;</blockquote>
          <figcaption>Narendra Murkumbi, at the opening of our Talegaon complex, October 2026</figcaption>
          <img className="mdl__team" src={url('assets/img/about/ab-team.webp')} width="900" height="600" alt="The EIM team at the launch of India’s first battery-swappable electric truck" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

export default function AboutPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="company" onDark />
      <main id="main">
        <Hero />
        <System />
        <Pace />
        <Partners />
        <Talegaon />
        <Leader />
        <FleetAssessmentForm
          title={<>Ready to go electric? <em>Start with one conversation.</em></>}
          lede="Tell us about your fleet and routes. Our team will come back with the trucks, the stations and the cost per kilometre."
        />
      </main>
      <Footer />
    </>
  );
}
