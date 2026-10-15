import React from 'react';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <p className="ftr__tag">Heavy mobility <span className="nw">r<b>EIM</b>agined.</span></p>
          <a className="btn btn--teal" href="#assess"><span>Assess your fleet</span><svg><use href="#arrow" /></svg></a>
        </div>
        <div className="ftr__cols">
          <div><h4>Solutions</h4><a href="#maitryi">Maitryi model</a><a href="#ashwa">ASHWA e-tractor</a><a href="#swap">Battery swapping</a><a href="#network">Fast charging</a><a href="#proof">After-sales service</a></div>
          <div><h4>Industries</h4><a href="#industries">Ports and container terminals</a><a href="#industries">Logistics and middle-mile</a><a href="#industries">Cement, steel and mining</a></div>
          <div><h4>Knowledge</h4><a href="#swap-vs-charge">Guides</a><a href="#faq">FAQs</a><a href="#news">News and press</a><a href="#proof">Events</a></div>
          <div><h4>Company</h4><a href="#backers">About EIM</a><a href="#backers">Leadership</a><a href="#backers">Shareholders and partners</a><a href="#network">Network</a><a href="#careers">Careers</a><a href="#assess">Contact</a></div>
        </div>
        <div className="ftr__offices">
          <div><h4>Mumbai (HQ)</h4><p>1A, 1st floor, Kohinoor Square, Dadar (W), Mumbai 400028</p></div>
          <div><h4>Noida</h4><p>J M Baxi Corporate Tower, 12th Floor, Sector 136, Noida 201304</p></div>
          <div><h4>Pune</h4><p>301, Prabhavee Tech Park, Baner Main Road, Baner, Pune 411045</p></div>
          <div><h4>Nhava Sheva</h4><p>C Wing, 211 &amp; 212, NMSEZ Commercial Business Complex, Dronagiri 6, Sector 11, Navghar 400707</p></div>
          <div><h4>Factory</h4><p>Gat No. 147 &amp; 418 (Part), Opp. Talegaon MIDC Phase 5, Ambi, Pune 410507</p></div>
        </div>
        <div className="ftr__base">
          <i className="wm wm--ftr" aria-hidden="true" />
          <p>© 2026 Energy In Motion Ltd. All rights reserved.</p>
          <a href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a>
        </div>
      </div>
    </footer>
  );
}
