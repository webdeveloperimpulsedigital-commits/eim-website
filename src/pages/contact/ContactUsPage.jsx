import React, { useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useRuntime from '../../utils/useRuntime';
import { url } from '../../paths';

// Company / Contact. Sources: energyinmotion.in (offices, email, careers openings and HR address, Google Maps link
// for the head office); press release letterhead (phone lines, registered office, CIN).
// The form posts nowhere yet, like the homepage form: connect it to the CRM where marked.

const TOPICS = [
  { k: 'fleet', name: 'My fleet', line: 'Electrifying the trucks I run today', title: 'Tell us about your fleet.', ask: ['fleet', 'route'] },
  { k: 'site', name: 'A route or a station', line: 'Swapping and charging where I operate', title: 'Tell us the route or site.', ask: ['route', 'message'], routeRequired: true },
  { k: 'maitryi', name: 'The Maitryi model', line: 'Owning the truck, not the battery', title: 'Let’s work out Maitryi for you.', ask: ['fleet', 'message'] },
  { k: 'press', name: 'Press and media', line: 'Interviews, information and photographs', title: 'Writing about EIM?', ask: ['message'], org: 'Publication' },
  { k: 'careers', name: 'Careers', line: 'Joining the team building it' },
];

const ROLES = [
  { t: 'Operator', team: 'Operations', where: 'Thanjavur, Chennai' },
  { t: 'Charger Technician', team: 'Technical', where: 'Amirghadh, Gujarat' },
  { t: 'Sales Co-ordinator', team: 'Sales', where: 'Navi Mumbai' },
];

// North to south, as they sit on the map.
const OFFICES = [
  { city: 'Noida', role: 'Office', addr: 'J M Baxi Corporate Tower, 12th Floor, Sector 136, Noida, Uttar Pradesh 201304' },
  { city: 'Mumbai', role: 'Head office', addr: '1A, 1st floor, Kohinoor Square, Dadar (W), Mumbai, Maharashtra 400028' },
  { city: 'Nhava Sheva', role: 'Port office', addr: 'C Wing, 211 & 212, NMSEZ Commercial Business Complex, Dronagiri 6, Sector 11, Navghar, Maharashtra 400707' },
  { city: 'Talegaon', role: 'Factory', addr: 'Gat No. 147 & 418 (Part), Opp. Talegaon MIDC Phase 5, Ambi, Pune, Maharashtra 410507' },
  { city: 'Pune', role: 'Office', addr: '301, Prabhavee Tech Park, Baner Main Road, Baner, Pune, Maharashtra 411045' },
  { city: 'Belgaum', role: 'Registered office', addr: 'BC 105, Havelock Road, Camp, Belgaum, Karnataka 590001' },
];
const maps = (a) => 'https://maps.google.com/?q=' + encodeURIComponent(a);

function Field({ id, label, type = 'text', req = true, auto, area, ph }) {
  return (
    <div className={'f' + (area ? ' f--wide' : '')}>
      <label htmlFor={id}>{label}{!req && <em> (optional)</em>}</label>
      {area
        ? <textarea id={id} name={id.slice(2)} rows="3" placeholder={ph} required={req} />
        : <input id={id} name={id.slice(2)} type={type} autoComplete={auto} placeholder={ph} required={req} inputMode={type === 'tel' ? 'tel' : undefined} />}
    </div>
  );
}

function Console({ head }) {
  const [k, setK] = useState(() => (typeof location !== 'undefined' && location.hash === '#careers' ? 'careers' : 'fleet'));
  const [sent, setSent] = useState(null);
  const [bad, setBad] = useState(false);
  const t = TOPICS.find((x) => x.k === k);

  const pick = (key) => { setK(key); setSent(null); setBad(false); };
  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    let ok = true;
    f.querySelectorAll('input[required], textarea[required]').forEach((el) => {
      const v = el.value.trim();
      const wrong = !v || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) || (el.type === 'tel' && v.replace(/\D/g, '').length < 10);
      el.classList.toggle('is-bad', wrong); if (wrong) ok = false;
    });
    setBad(!ok);
    if (!ok) return;
    // Connect to the CRM / form endpoint here. Payload: new FormData(f), topic: k
    setSent(t.k);
  };

  return (
    <div className="ct__grid">
      <div className="ct__left">
      {head}
      <div className="ct__pick" role="tablist" aria-label="What would you like to talk about?">
        {TOPICS.map((x, i) => (
          <button key={x.k} type="button" role="tab" id={'ctt-' + x.k} aria-controls="console" aria-selected={k === x.k}
            className={'ctp' + (k === x.k ? ' is-on' : '')} onClick={() => pick(x.k)}>
            <span className="ctp__n">{String(i + 1).padStart(2, '0')}</span>
            <span className="ctp__name">{x.name}</span>
            <span className="ctp__line">{x.line}</span>
          </button>
        ))}
      </div>
      </div>

      <div className="ct__panel" id="console" role="tabpanel" aria-labelledby={'ctt-' + k}>
        <div className="ct__in" key={k + (sent ? '-sent' : '')}>
          {sent ? (
            <div className="ct__ok">
              <svg viewBox="0 0 141 48" aria-hidden="true"><use href="#eim" /></svg>
              <p><b>Thank you. It&rsquo;s with our team.</b> Expect a call or an email from us on the details you shared.</p>
              <button type="button" className="link" onClick={() => setSent(null)}>Send another message</button>
            </div>
          ) : k === 'careers' ? (
            <div className="ct__jobs">
              <h2 className="ct__h">Open roles</h2>
              <ul>
                {ROLES.map((r) => (
                  <li key={r.t}>
                    <a href={'mailto:hello.hr@energyinmotion.in?subject=' + encodeURIComponent('Application for ' + r.t)}>
                      <span className="ct__jt"><b>{r.t}</b>{r.team} · Full time</span>
                      <span className="ct__jw">{r.where}</span>
                      <svg aria-hidden="true"><use href="#arrow" /></svg>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="ct__note">Don&rsquo;t see your role? Write to <a className="link" href="mailto:hello.hr@energyinmotion.in">hello.hr@energyinmotion.in</a></p>
            </div>
          ) : (
            <form className="ct__form" noValidate onSubmit={submit}>
              <h2 className="ct__h">{t.title}</h2>
              <div className="aform__fields">
                <Field id="c-name" label="Your name" auto="name" />
                <Field id="c-co" label={t.org || 'Company'} auto="organization" />
                <Field id="c-phone" label="Mobile" type="tel" auto="tel" />
                <Field id="c-email" label="Work email" type="email" auto="email" />
                {t.ask.includes('fleet') && (
                  <div className="f f--wide">
                    <span className="f__lab" id="c-fleet-lab">Fleet size</span>
                    <div className="chips" role="radiogroup" aria-labelledby="c-fleet-lab">
                      {['1–10', '11–50', '51–200', '200+'].map((v, i) => (
                        <label key={v}><input type="radio" name="fleet" value={v} defaultChecked={i === 1} /><span>{v}</span></label>
                      ))}
                    </div>
                  </div>
                )}
                {t.ask.includes('route') && <Field id="c-route" label="Main route or site" req={!!t.routeRequired} ph="Route, port or site" area={false} />}
                {t.ask.includes('message') && <Field id="c-msg" label="Your message" req={k === 'press'} area />}
              </div>
              <button className="btn btn--teal btn--block" type="submit"><span>Send to the EIM team</span><svg><use href="#arrow" /></svg></button>
              {bad && <p className="aform__err" role="alert">Fill in the marked fields so we can reach you: a 10-digit mobile and a valid email.</p>}
              {k === 'press' && <p className="ct__note">Or call us on <a className="link" href="tel:+912246097488">+91 22 4609 7488</a></p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="ct" id="top" aria-labelledby="ct-h">
      <video className="ct__bg" muted loop playsInline autoPlay preload="auto" poster={url('assets/img/swap/s-hero-poster.webp')} aria-hidden="true">
        <source src={url('assets/video/s-hero.mp4')} type="video/mp4" />
      </video>
      <div className="ct__veil" aria-hidden="true" />
      <div className="wrap ct__wrap">
        <Console head={(
          <div className="ct__head">
            <nav className="crumb crumb--dark" aria-label="Breadcrumb"><ol><li>Company</li><li aria-current="page">Contact</li></ol></nav>
            <h1 className="ct__h1" id="ct-h">Start with a conversation. <em>We&rsquo;ll take it from <mark>there.</mark></em></h1>
          </div>
        )} />
      </div>
    </section>
  );
}

function Offices() {
  return (
    <section className="ofc sec" id="offices" aria-labelledby="ofc-h">
      <div className="wrap shead">
        <h2 className="h2" id="ofc-h">Six addresses. <em>One team.</em></h2>
        <p className="lede">From the head office in Mumbai to the factory at Talegaon. Walk in, or tell us you&rsquo;re coming.</p>
      </div>
      <div className="wrap">
        <ol className="rail">
          {OFFICES.map((o, i) => (
            <li className="stop" key={o.city} style={{ '--i': i }}>
              <span className="stop__role">{o.role}</span>
              <span className="stop__mark" aria-hidden="true" />
              <b className="stop__city">{o.city}</b>
              <span className="stop__addr">{o.addr}</span>
              <a className="stop__go" href={maps(o.addr)} target="_blank" rel="noopener">Directions <svg aria-hidden="true"><use href="#arrow" /></svg></a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Direct() {
  return (
    <section className="dl sec sec--mist" aria-labelledby="dl-h">
      <div className="wrap">
        <h2 className="h2" id="dl-h">Rather write or call? <em>Reach us directly.</em></h2>
        <dl className="dl__list">
          <div><dt>Write to us</dt><dd><a href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a></dd></div>
          <div><dt>Call us</dt><dd><a href="tel:+912246097488">+91 22 4609 7488</a><span>Also 7489 and 7490</span></dd></div>
          <div><dt>Join us</dt><dd><a href="mailto:hello.hr@energyinmotion.in">hello.hr@energyinmotion.in</a></dd></div>
        </dl>
        <p className="dl__legal">Energy In Motion Limited · CIN U29304KA2024PLC186460 · Registered office: BC 105, Havelock Road, Camp, Belgaum, Karnataka 590001</p>
      </div>
    </section>
  );
}

export default function ContactUsPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="company" onDark />
      <main id="main">
        <Hero />
        <Offices />
        <Direct />
      </main>
      <Footer />
    </>
  );
}
