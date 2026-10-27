import React from 'react';
import { url } from '../../paths';

// Sticky story: the life of one battery pack, chapter by chapter. On desktop the picture and the
// pack panel stay put while the chapters scroll past; below 1000px each chapter carries its own picture.
// The health meter is an illustration of ageing, not data: it carries no figures.
const CHAPTERS = [
  {
    when: 'Day one',
    title: <>You buy the truck. <em>Not the pack.</em></>,
    text: 'The e-tractor is yours, bought without its battery. That takes 40% off the capital it takes to start, and lenders finance the truck on terms on par with a diesel vehicle.',
    fact: ['40%', 'lower upfront capital cost'],
    img: 'm-day1.webp', w: 1600, h: 1067,
    alt: 'A line of new EIM e-tractors parked inside a hall',
    health: 20, state: 'New', pay: 'For the truck',
  },
  {
    when: 'Every shift',
    title: <>The pack runs low. <em>Swapped in under 7 minutes.</em></>,
    text: 'The truck rolls into one of our swap stations and a charged pack goes in automatically, instead of the truck standing on a charger for about an hour. One station keeps up to 100 e-tractors a day moving.',
    fact: ['Under 7', 'minutes to swap a drained pack for a charged one'],
    img: 'm-shift.webp', w: 1200, h: 1482, video: 'm-swap-night.mp4',
    alt: 'An EIM e-tractor inside an EIM swap station at night, its pack being changed',
    health: 19, state: 'In service', pay: 'Per use',
  },
  {
    when: 'Every month',
    title: <>You pay for what you use. <em>Nothing more.</em></>,
    text: 'Battery use and charging are billed as you go, per use or at a fixed cost. We charge the packs on Time-of-Day tariffs and with as much renewable power as we can source, to keep the cost of every kilometre down.',
    fact: ['₹32.4', 'total cost per kilometre on Maitryi, in our cost model'],
    img: 'm-month.webp', w: 1600, h: 1200,
    alt: 'Two EIM e-tractors at an EIM battery swap station by a container yard',
    health: 17, state: 'In service', pay: 'Per use or fixed',
  },
  {
    when: 'Every day',
    title: <>We watch the pack. <em>So you don't have to.</em></>,
    text: 'Our software tracks every pack and every e-tractor live, schedules swaps and charging, and connects to your own systems through an API. The pack’s warranty and its functionality risk stay with us.',
    fact: ['24x7', 'after-sales teams, service vans and workshops'],
    img: 'm-daily.webp', w: 1400, h: 1867,
    alt: 'A row of EIM e-tractors parked at a container port at night',
    health: 15, state: 'Ageing', pay: 'Per use or fixed',
  },
  {
    when: 'Around year seven',
    title: <>The pack wears out. <em>We replace it.</em></>,
    text: 'Batteries age. When a pack reaches the end of its life, at around seven years, we replace it. You never buy a second battery, and your truck keeps earning.',
    fact: ['About 7', 'years before a worn pack is replaced, by us, not you'],
    img: 'm-year7.webp', w: 1600, h: 1067,
    alt: 'An EIM e-tractor in profile with its battery pack behind the cab',
    health: 20, state: 'Replaced by EIM', pay: 'Per use, as before',
  },
];

export default function BatteryLife() {
  return (
    <section className="story sec" id="life" aria-labelledby="life-h">
      <div className="wrap story__head">
        <h2 className="h2" id="life-h">Seven years in the life of a pack. <em>None of it on your books.</em></h2>
        <p className="lede">What happens to the battery in your truck, from the day you buy the truck to the day the pack wears out, and who takes care of each part.</p>
      </div>

      <div className="wrap story__grid">
        <div className="story__stage" aria-hidden="true">
          <div className="story__frame">
            {CHAPTERS.map((c, i) => c.video ? (
              <video key={i} className={'story__media' + (i === 0 ? ' is-on' : '')} data-i={i} muted loop playsInline preload="none" poster={url('assets/img/mai/' + c.img)}>
                <source src={url('assets/video/' + c.video)} type="video/mp4" />
              </video>
            ) : (
              <img key={i} className={'story__media' + (i === 0 ? ' is-on' : '')} data-i={i} src={url('assets/img/mai/' + c.img)} width={c.w} height={c.h} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
            <p className="story__src"><i />{'Real footage · EIM swap station'}</p>
          </div>

          <div className="pack">
            <div className="pack__row">
              <span className="pack__lab">When</span>
              <b className="pack__val pack__when"><span>{CHAPTERS[0].when}</span></b>
            </div>
            <div className="pack__row">
              <span className="pack__lab">Pack health</span>
              <span className="pack__meter">
                {Array.from({ length: 20 }, (_, k) => <i key={k} className={k < CHAPTERS[0].health ? 'on' : undefined} />)}
              </span>
              <b className="pack__state">{CHAPTERS[0].state}</b>
            </div>
            <div className="pack__row pack__row--2">
              <div><span className="pack__lab">Pack owned by</span><b className="pack__val">EIM</b></div>
              <div><span className="pack__lab">You pay</span><b className="pack__val pack__pay"><span>{CHAPTERS[0].pay}</span></b></div>
            </div>
            <p className="pack__note">Illustration</p>
          </div>

          <ol className="story__prog">
            {CHAPTERS.map((c, i) => <li key={i}><i /></li>)}
          </ol>
        </div>

        <ol className="story__steps">
          {CHAPTERS.map((c, i) => (
            <li className="chap" key={i} data-when={c.when} data-health={c.health} data-state={c.state} data-pay={c.pay}>
              <figure className="chap__fig">
                <img src={url('assets/img/mai/' + c.img)} width={c.w} height={c.h} alt={c.alt} loading="lazy" />
              </figure>
              <p className="chap__n">{String(i + 1).padStart(2, '0')}<span>{c.when}</span></p>
              <h3 className="chap__h">{c.title}</h3>
              <p className="chap__p">{c.text}</p>
              <p className="chap__fact"><b>{c.fact[0]}</b><span>{c.fact[1]}</span></p>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap">
        <p className="foot">Cost per kilometre from EIM's internal total cost of ownership model, for an e-tractor running 10,000 km a month. Actual costs vary with route, load, duty cycle and prevailing power tariffs.</p>
      </div>
    </section>
  );
}
