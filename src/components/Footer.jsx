import React from 'react';
import { url, PAGES, sectionOf } from '../paths';

export default function Footer({ isContactPage }) {

  const handleContactClick = (e) => {
    if (isContactPage) {
      e.preventDefault();
      const el = document.getElementById('console');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const contactHref = url('contact-us');

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <p className="ftr__tag">Heavy mobility <span className="nw">r<b>EIM</b>agined.</span></p>
          <a className="btn btn--teal" href={contactHref} onClick={handleContactClick}>
            <span>Assess your fleet</span>
            <svg><use href="#arrow" /></svg>
          </a>
        </div>
        <div className="ftr__cols">
          <div>
            <h4>Solutions</h4>
            <a href={url(PAGES.maitryi)}>Maitryi model</a>
            <a href={url(PAGES.ashwa)}>ASHWA e-tractor</a>
            <a href={url(PAGES.swap)}>Swapping and charging</a>
            <a href={url(PAGES.ashwa + '#service')}>After-sales service</a>
          </div>
          <div>
            <h4>Industries</h4>
            <a href={url(PAGES.ports)}>Ports and container terminals</a>
            <a href={url('#industries')}>Logistics and middle-mile</a>
            <a href={url('#industries')}>Cement, steel and mining</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href={url(PAGES.about)}>About EIM</a>
            <a href={url('#backers')}>Leadership</a>
            <a href={url('#backers')}>Shareholders and partners</a>
            <a href={url(PAGES.newsroom)}>Newsroom</a>
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href={sectionOf(PAGES.swap, '#network')}>Network</a>
            <a href={url('#careers')}>Careers</a>
            <a href={contactHref} onClick={handleContactClick}>Contact</a>
            <a href={contactHref} onClick={handleContactClick}>Assess your fleet</a>
          </div>
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
          <p className="ftr__credit">
            Designed and Developed by{' '}
            <a href="https://www.theimpulsedigital.com/" target="_blank" rel="noopener noreferrer">
              Impulse Digital
            </a>
          </p>
          <a href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a>
        </div>
      </div>
    </footer>
  );
}
