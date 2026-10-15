import React from 'react';

export default function TimelineProof() {
  return (
    <section className="proof sec" id="proof" aria-labelledby="proof-h">
      <div className="tl-pin" id="tlPin">
        <div className="wrap proof__head">
          <h2 className="h2" id="proof-h">From registration to No. 2 in India.</h2>
          <p className="lede">The milestones that got us here, on ports, highways and at the test centre.</p>
        </div>
        <div className="tl" id="tl">
          <ol className="tl__track" id="tlTrack">
            <li className="tl__item"><figure><img src="assets/img/tl-2024-03.webp" alt="The EIM team" loading="lazy" /></figure><time>Mar 2024</time><h3>EIM is registered</h3><p>Set up to take heavy freight off diesel at a competitive cost.</p></li>
            <li className="tl__item"><figure><img src="assets/img/ev2-2024-08.webp" alt="" loading="lazy" /></figure><time>Aug 2024</time><h3>First high-capacity EV fast charger inside JNPT</h3><p>Inaugurated by Shri Unmesh Wagh, Chairman, JNPA.</p></li>
            <li className="tl__item"><figure><img src="assets/img/tl-2025-07.webp" alt="EIM receives the CMVR type approval certificate at ARAI" loading="lazy" /></figure><time>Jul 2025</time><h3>ARAI homologation in 7 months</h3><p>CMVR certification for India's first heavy-duty, battery-swappable 55-tonne e-tractor.</p></li>
            <li className="tl__item"><figure><img src="assets/img/tl-2025-08.webp" alt="Keys to the first EIM e-tractor handed over to MICT" loading="lazy" /></figure><time>Aug 2025</time><h3>First commercial sale</h3><p>The first truck handed over to Mumbai International Cargo Terminal.</p></li>
            <li className="tl__item"><figure><img src="assets/img/ev-jnpa-flag.webp" alt="" loading="lazy" /></figure><time>Sep 2025</time><h3>India's first swappable-battery EV truck fleet</h3><p>Flagged off at JNPA by Shri Sarbananda Sonowal, Union Minister.</p></li>
            <li className="tl__item"><figure><img src="assets/img/ev-dict.webp" alt="" loading="lazy" /></figure><time>Oct 2025</time><h3>India's first public heavy-duty swap station</h3><p>Inaugurated at DICT by Shri Nitin Gadkari. ASHWA flagged off by Shri H. D. Kumaraswamy.</p></li>
            <li className="tl__item"><figure data-placeholder><img src="assets/img/fleet-row.webp" alt="A row of EIM ASHWA e-tractors" loading="lazy" /></figure><time>Nov 2025</time><h3>No. 2 in India</h3><p>In electric heavy-duty truck sales.</p></li>
            <li className="tl__item"><figure><img src="assets/img/ev2-2026-05.webp" alt="" loading="lazy" /></figure><time>May 2026</time><h3>India's largest battery swapping and charging station</h3><p>Opened at Jawaharlal Nehru Port by Shri Gaurav Dayal, IAS, Chairperson, JNPA.</p></li>
            <li className="tl__item"><figure data-placeholder><img src="assets/img/truck-hall.webp" alt="An EIM ASHWA e-tractor indoors" loading="lazy" /></figure><time>Jun 2026</time><h3>Vehicle assembly plant, Talegaon</h3><p>Our own vehicle assembly plant opens near Pune.</p></li>
            <li className="tl__item"><figure data-placeholder><img src="assets/img/truck-side.webp" alt="An EIM ASHWA e-tractor" loading="lazy" /></figure><time>Jul 2026</time><h3>350 kWh model homologated</h3><p>More range, more applications.</p></li>
          </ol>
        </div>
        <div className="wrap tl__prog" aria-hidden="true"><span className="tl__yr"><span id="tlYear">2024</span></span><i className="tl__bar"><b id="tlBar" /></i><span className="tl__end">2026</span></div>
      </div>

      <div className="wrap voices">
        <div className="voices__slides" id="voices">
          <figure className="voice is-on">
            <blockquote>“By deploying EIM vehicles in NCR region, not only do I feel proud to be contributing to a Greener Environment, but I also feel richer each time my vehicle enters into Delhi, as my EV trucks are exempted from paying Rs 4000/- NGT Tax per trip…”</blockquote>
            <figcaption><img src="assets/img/t-gurjeet.webp" alt="" loading="lazy" /><span><b>Gurjeet Singh Bhatia</b>AVP, Transport Operations, Delhi International Cargo Terminal (J M Baxi Ports &amp; Logistics)</span></figcaption>
          </figure>
          <figure className="voice">
            <blockquote>“As one of the early users of EIM vehicles at JNPT Port… I'm amazed at the way EIM has created the charging infra in the JNPT eco-system… in terms of speed &amp; scale. Looking at current oil prices, I feel lucky I switched to EV early.”</blockquote>
            <figcaption><img src="assets/img/t-vitthal.webp" alt="" loading="lazy" /><span><b>Vitthal Wable</b>Director, Radiance Green Mobility and Jyothi Transport &amp; Freight Services</span></figcaption>
          </figure>
          <figure className="voice">
            <blockquote>“What truly differentiates EIM is not just the product, but the strength of their aftersales ecosystem. Their team has consistently ensured high fleet uptime, swift issue resolution, and a proactive approach to maintenance.”</blockquote>
            <figcaption><img src="assets/img/t-janardhan.webp" alt="" loading="lazy" /><span><b>Janardhan Matre</b>Managing Director, JIVI Enterprises</span></figcaption>
          </figure>
          <figure className="voice">
            <blockquote>“…EIM's Aftersales team has demonstrated exceptional ownership, providing timely field support, fast issue resolution, and continuous technical assistance. Their dedication has enabled us to maintain high fleet uptime.”</blockquote>
            <figcaption><img src="assets/img/t-ajit.webp" alt="" loading="lazy" /><span><b>Ajit Kumar Singh</b>CFS Head, Mumbai Container Freight Station, J M Baxi Container Holdings</span></figcaption>
          </figure>
        </div>
        <div className="voices__nav" role="group" aria-label="Testimonials">
          <button className="vbtn" id="vPrev" aria-label="Previous testimonial"><svg style={{ transform: 'scaleX(-1)' }}><use href="#arrow" /></svg></button>
          <span className="voices__count" id="vCount">1 / 4</span>
          <button className="vbtn" id="vNext" aria-label="Next testimonial"><svg><use href="#arrow" /></svg></button>
        </div>
      </div>

      <div className="wrap news" id="news">
        <h3 className="h3">In the news</h3>
        <div className="news__grid">
          <article className="nitem"><figure><img src="assets/img/news-nsdt.webp" alt="" loading="lazy" /></figure><p>EIM opens its second heavy-duty swapping-cum-charging station at Nhava Sheva Distribution Terminal, the first step towards an EV Megaplex at JNPT.</p></article>
          <article className="nitem"><figure><img src="assets/img/news-ofw.webp" alt="" loading="lazy" /></figure><p>MoU with Oil Field Warehouse &amp; Services and Radiance Green Mobility to deploy 500 electric heavy commercial vehicles.</p></article>
          <article className="nitem"><figure><img src="assets/img/news-hpcl.webp" alt="" loading="lazy" /></figure><p>Partnership with HPCL to set up charging and battery swapping at retail outlets across India.</p></article>
        </div>
        <ul className="awards">
          <li><b>Viksit Bharat 'Ambassador of Change'</b><span>Jury Choice for Climate Action, #CF2026</span></li>
          <li><b>Foton 'Pioneer in New Energy Promotion'</b><span>Global Partner's Conference 2026</span></li>
          <li><b>SAEINDIA recognition</b><span>For support to mobility engineering</span></li>
        </ul>
      </div>
    </section>
  );
}
