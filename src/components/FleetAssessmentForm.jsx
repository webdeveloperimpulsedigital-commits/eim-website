import React from 'react';

export default function FleetAssessmentForm() {
  return (
    <section className="assess sec sec--dark" id="assess" aria-labelledby="as-h">
      <div className="wrap assess__grid">
        <div className="assess__copy">
          <h2 className="h2" id="as-h">What do you want to electrify?</h2>
          <p className="lede">Pick one, leave a number, and our fleet team will come back with a plan built around your routes.</p>
          <ul className="assess__direct">
            <li><span>Email</span><a href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a></li>
            <li><span>Head office</span>1A, 1st floor, Kohinoor Square, Dadar (W), Mumbai 400028</li>
          </ul>
        </div>

        <form className="aform" id="aform" noValidate>
          <fieldset className="aform__intent">
            <legend>I want to talk about</legend>
            <label className="intent"><input type="radio" name="intent" id="i-fleet" value="fleet" defaultChecked /><span><b>My fleet</b>Electrifying trucks I run today</span></label>
            <label className="intent"><input type="radio" name="intent" id="i-site" value="site" /><span><b>A route or site</b>A swap or charging station where we operate</span></label>
            <label className="intent"><input type="radio" name="intent" id="i-mai" value="maitryi" /><span><b>The Maitryi model</b>How owning the truck, not the battery, works</span></label>
          </fieldset>
          <div className="aform__fields">
            <div className="f"><label htmlFor="f-name">Your name</label><input id="f-name" name="name" autoComplete="name" required /></div>
            <div className="f"><label htmlFor="f-co">Company</label><input id="f-co" name="company" autoComplete="organization" required /></div>
            <div className="f"><label htmlFor="f-phone">Mobile</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></div>
            <div className="f"><label htmlFor="f-email">Work email</label><input id="f-email" name="email" type="email" autoComplete="email" required /></div>
            <div className="f f--wide">
              <span className="f__lab" id="fleet-lab">Fleet size</span>
              <div className="chips" role="radiogroup" aria-labelledby="fleet-lab">
                <label><input type="radio" name="fleet" id="fs1" value="1-10" /><span>1–10</span></label>
                <label><input type="radio" name="fleet" id="fs2" value="11-50" defaultChecked /><span>11–50</span></label>
                <label><input type="radio" name="fleet" id="fs3" value="51-200" /><span>51–200</span></label>
                <label><input type="radio" name="fleet" id="fs4" value="200+" /><span>200+</span></label>
              </div>
            </div>
            <div className="f f--wide"><label htmlFor="f-route">Main route or site <em>(optional)</em></label><input id="f-route" name="route" placeholder="Route, port or site" /></div>
          </div>
          <button className="btn btn--teal btn--block" type="submit"><span>Send to the EIM team</span><svg><use href="#arrow" /></svg></button>
          <p className="aform__err" id="aerr" role="alert" hidden>Add your name, company, mobile and a valid work email so we can reach you.</p>
          <div className="aform__ok" id="aok" hidden>
            <svg viewBox="0 0 141 48"><use href="#eim" /></svg>
            <p><b>Thanks, it's with our fleet team.</b> Expect a call on the number you shared.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
