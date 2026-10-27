import React from 'react';
import { url } from '../../paths';

// Inner-page hero: two-beat headline beside the cut-corner image, then the deal in three lines.
// 40%: presentation slide 15. Pay as you go, per use or fixed cost: slides 15 and 16.
// Replacement at around seven years: EIM meeting notes, confirmed by EIM.
export default function Hero() {
  return (
    <section className="ihero" id="top" aria-labelledby="mh-h">
      <div className="wrap ihero__grid">
        <div className="ihero__copy">
          <nav className="crumb" aria-label="Breadcrumb">
            <ol>
              <li>Solutions</li>
              <li aria-current="page">Maitryi model</li>
            </ol>
          </nav>
          <h1 className="ihero__h" id="mh-h">
            <span className="ln">Buy the truck.</span>{' '}
            <span className="ln"><em>Not the <mark>battery.</mark></em></span>
          </h1>
          <p className="ihero__sub">
            Maitryi is how we sell every EIM e-tractor. You buy the truck without its battery pack. We own the pack, swap it, charge it and replace it when it wears out. You pay as you go for battery use and charging.
          </p>
          <div className="ihero__ctas">
            <a className="btn btn--teal" href="#assess" data-intent="maitryi"><span>Assess your fleet</span><svg><use href="#arrow" /></svg></a>
            <a className="btn btn--ghost" href="#life"><span>See how it works</span><svg><use href="#down" /></svg></a>
          </div>
        </div>
        <figure className="ihero__fig">
          <img
            src={url('assets/img/mai/m-hero.webp')}
            width="1122"
            height="910"
            alt="An EIM e-tractor standing on its own, its battery pack standing apart from it"
            fetchpriority="high"
          />
          <span className="ptag ptag--you" style={{ '--x': '7%', '--y': '17%' }}><b>Yours</b>The e-tractor</span>
          <span className="ptag ptag--eim" style={{ '--x': '61%', '--y': '24%' }}><b>Ours</b>The battery pack</span>
        </figure>
      </div>

      <div className="wrap">
        <dl className="terms">
          <div className="term">
            <dt>You pay once</dt>
            <dd>For the truck, without its pack. <b>40% less capital upfront.</b></dd>
          </div>
          <div className="term">
            <dt>You pay as you go</dt>
            <dd>For battery use and charging, <b>per use or at a fixed cost.</b></dd>
          </div>
          <div className="term">
            <dt>You never pay</dt>
            <dd>For a new pack. <b>At around seven years, we replace it.</b></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
