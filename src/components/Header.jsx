import React from 'react';

export default function Header() {
  return (
    <>
      <header className="hdr" id="hdr">
        <div className="hdr__bar">
          <a className="hdr__logo" href="#top" aria-label="EIM, Heavy mobility reimagined, home">
            <img src="assets/img/logo-tag-ink.png" alt="EIM. Heavy mobility reimagined." width="649" height="293" />
          </a>
          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              <li className="nav__item" data-mega="solutions">
                <button className="nav__btn" aria-expanded="false" aria-controls="mega-solutions">
                  Solutions <svg><use href="#chev" /></svg>
                </button>
              </li>
              <li className="nav__item" data-mega="industries">
                <button className="nav__btn" aria-expanded="false" aria-controls="mega-industries">
                  Industries <svg><use href="#chev" /></svg>
                </button>
              </li>
              <li className="nav__item"><a className="nav__btn" href="#network">Network</a></li>
              <li className="nav__item" data-mega="knowledge">
                <button className="nav__btn" aria-expanded="false" aria-controls="mega-knowledge">
                  Knowledge <svg><use href="#chev" /></svg>
                </button>
              </li>
              <li className="nav__item" data-mega="company">
                <button className="nav__btn" aria-expanded="false" aria-controls="mega-company">
                  Company <svg><use href="#chev" /></svg>
                </button>
              </li>
              <li className="nav__item"><a className="nav__btn" href="#careers">Careers</a></li>
            </ul>
          </nav>
          <div className="hdr__right">
            <a className="hdr__mail" href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a>
            <a className="btn btn--teal btn--sm" href="#assess"><span>Assess your fleet</span></a>
            <button className="burger" id="burger" aria-expanded="false" aria-controls="mnav" aria-label="Open menu">
              <i /><i />
            </button>
          </div>
        </div>

        {/* Mega Menus */}
        <div className="mega" id="mega-solutions" hidden>
          <div className="mega__in">
            <div className="mega__lead">
              <p className="mega__big">One partner for the truck, the battery, the station and the energy.</p>
            </div>
            <ul className="mega__grid">
              <li><a href="#maitryi"><b>Maitryi model</b><span>You own the truck. We own and run the battery.</span></a></li>
              <li><a href="#ashwa"><b>ASHWA e-tractor</b><span>55-tonne battery-swappable prime mover.</span></a></li>
              <li><a href="#swap"><b>Battery swapping</b><span>A drained truck back on the road in under 7 minutes.</span></a></li>
              <li><a href="#ecosystem"><b>Fast charging</b><span>CCS2 DC fast chargers for any brand of commercial EV.</span></a></li>
              <li><a href="#proof"><b>After-sales service</b><span>Service teams, mobile vans and workshops.</span></a></li>
            </ul>
            <div className="mega__card"><img src="assets/img/bay-real.webp" alt="" loading="lazy" /></div>
          </div>
        </div>

        <div className="mega" id="mega-industries" hidden>
          <div className="mega__in">
            <div className="mega__lead">
              <p className="mega__big">Built for short, heavy, repeat routes, where uptime pays for everything.</p>
            </div>
            <ul className="mega__grid">
              <li><a href="#industries"><b>Ports and container terminals</b><span>Yard moves, CFS and ICD shuttles.</span></a></li>
              <li><a href="#industries"><b>Logistics and middle-mile</b><span>Fixed lanes between hubs.</span></a></li>
              <li><a href="#industries"><b>Cement, steel and mining</b><span>Clinker, coal and bulk haulage.</span></a></li>
            </ul>
            <div className="mega__card"><img src="assets/img/hapag.webp" alt="" loading="lazy" /></div>
          </div>
        </div>

        <div className="mega" id="mega-knowledge" hidden>
          <div className="mega__in">
            <div className="mega__lead">
              <p className="mega__big">The numbers and answers fleet owners ask for before they switch.</p>
            </div>
            <ul className="mega__grid">
              <li><a href="#swap-vs-charge"><b>Guides</b><span>Swap vs charge, financing, running costs.</span></a></li>
              <li><a href="#faq"><b>FAQs</b><span>Batteries, warranty, routes and service.</span></a></li>
              <li><a href="#news"><b>News and press</b><span>Announcements, coverage and awards.</span></a></li>
              <li><a href="#proof"><b>Events</b><span>Launches, flag-offs and inaugurations.</span></a></li>
            </ul>
            <div className="mega__card"><img src="assets/img/fleet-row.webp" alt="" loading="lazy" /></div>
          </div>
        </div>

        <div className="mega" id="mega-company" hidden>
          <div className="mega__in">
            <div className="mega__lead">
              <p className="mega__big">Renewable energy know-how and a century of ports and logistics, in one company.</p>
            </div>
            <ul className="mega__grid">
              <li><a href="#backers"><b>About EIM</b><span>What we're building and why.</span></a></li>
              <li><a href="#backers"><b>Leadership</b><span>The team running EIM.</span></a></li>
              <li><a href="#backers"><b>Shareholders and partners</b><span>Ravindra Energy, J M Baxi, Foton.</span></a></li>
              <li><a href="#assess"><b>Contact</b><span>Offices in Mumbai, Noida, Pune and Nhava Sheva.</span></a></li>
            </ul>
            <div className="mega__card"><img src="assets/img/people.webp" alt="" loading="lazy" /></div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="mnav" id="mnav" hidden>
        <div className="mnav__in">
          <details><summary>Solutions</summary>
            <a href="#maitryi">Maitryi model</a><a href="#ashwa">ASHWA e-tractor</a><a href="#swap">Battery swapping</a><a href="#ecosystem">Fast charging</a><a href="#proof">After-sales service</a>
          </details>
          <details><summary>Industries</summary>
            <a href="#industries">Ports and container terminals</a><a href="#industries">Logistics and middle-mile</a><a href="#industries">Cement, steel and mining</a>
          </details>
          <a className="mnav__top" href="#network">Network</a>
          <details><summary>Knowledge</summary>
            <a href="#swap-vs-charge">Guides</a><a href="#faq">FAQs</a><a href="#news">News and press</a><a href="#proof">Events</a>
          </details>
          <details><summary>Company</summary>
            <a href="#backers">About EIM</a><a href="#backers">Leadership</a><a href="#backers">Shareholders and partners</a><a href="#assess">Contact</a>
          </details>
          <a className="mnav__top" href="#careers">Careers</a>
          <a className="btn btn--teal" href="#assess"><span>Assess your fleet</span></a>
          <a className="mnav__mail" href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a>
        </div>
      </div>
    </>
  );
}
