import React from 'react';
import { url, HOME, PAGES, sectionOf } from '../paths';

// Sitemap (approved 2026-10-22): Solutions has three pages, After-sales lives on the ASHWA page,
// Network is a section of the swapping and charging page, Knowledge became a single Newsroom.
// Links to pages not built yet point at the matching homepage section.
// current: the nav section this page belongs to ('solutions', 'industries', ...), marked with the teal bar
// onDark: the page opens on a dark hero, so the bar starts white-on-ink until it turns solid on scroll
export default function Header({ current, onDark = false }) {
  const cur = (id) => 'nav__item' + (current === id ? ' is-current' : '');
  const NETWORK = sectionOf(PAGES.swap, '#network');
  // only the ports page is built so far; the other industries still point at the homepage section
  const PORTS = sectionOf(PAGES.ports, '#top');
  return (
    <>
      <header className={'hdr' + (onDark ? ' hdr--dark' : '')} id="hdr">
        <div className="hdr__bar">
          <a className="hdr__logo" href={HOME} aria-label="EIM, Heavy mobility reimagined, home">
            <img className="hdr__ink" src={url('assets/img/logo-tag-ink.png')} alt="EIM. Heavy mobility reimagined." width="649" height="293" />
            {onDark && <img className="hdr__white" src={url('assets/img/logo-tag-white.png')} alt="" width="649" height="293" />}
          </a>
          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              <li className={cur('solutions')} data-mega="solutions">
                <button className="nav__btn" aria-expanded="false" aria-controls="mega-solutions">
                  Solutions <svg><use href="#chev" /></svg>
                </button>
              </li>
              <li className={cur('industries')} data-mega="industries">
                <button className="nav__btn" aria-expanded="false" aria-controls="mega-industries">
                  Industries <svg><use href="#chev" /></svg>
                </button>
              </li>
              <li className={cur('network')}><a className="nav__btn" href={NETWORK}>Network</a></li>
              <li className={cur('newsroom')}><a className="nav__btn" href={url(PAGES.newsroom)}>Newsroom</a></li>
              <li className={cur('company')} data-mega="company">
                <button className="nav__btn" aria-expanded="false" aria-controls="mega-company">
                  Company <svg><use href="#chev" /></svg>
                </button>
              </li>
              <li className={cur('careers')}><a className="nav__btn" href={url('#careers')}>Careers</a></li>
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
              <li><a href={url(PAGES.maitryi)}><b>Maitryi model</b><span>You own the truck. We own and run the battery.</span></a></li>
              <li><a href={url(PAGES.ashwa)}><b>ASHWA e-tractor</b><span>55-tonne battery-swappable prime mover.</span></a></li>
              <li><a href={url(PAGES.swap)}><b>Swapping and charging</b><span>A swap in under 7 minutes. CCS2 charging for any brand.</span></a></li>
              <li><a href={url(PAGES.ashwa + '#service')}><b>After-sales service</b><span>Service teams, mobile vans and workshops.</span></a></li>
            </ul>
            <div className="mega__card"><img src={url('assets/img/bay-real.webp')} alt="" loading="lazy" /></div>
          </div>
        </div>

        <div className="mega" id="mega-industries" hidden>
          <div className="mega__in">
            <div className="mega__lead">
              <p className="mega__big">Built for short, heavy, repeat routes, where uptime pays for everything.</p>
            </div>
            <ul className="mega__grid">
              <li><a href={PORTS}><b>Ports and container terminals</b><span>Yard moves, CFS and ICD shuttles.</span></a></li>
              <li><a href={url('#industries')}><b>Logistics and middle-mile</b><span>Fixed lanes between hubs.</span></a></li>
              <li><a href={url('#industries')}><b>Cement, steel and mining</b><span>Clinker, coal and bulk haulage.</span></a></li>
            </ul>
            <div className="mega__card"><img src={url('assets/img/hapag.webp')} alt="" loading="lazy" /></div>
          </div>
        </div>

        <div className="mega" id="mega-company" hidden>
          <div className="mega__in">
            <div className="mega__lead">
              <p className="mega__big">Renewable energy know-how and a century of ports and logistics, in one company.</p>
            </div>
            <ul className="mega__grid">
              <li><a href={url(PAGES.about)}><b>About EIM</b><span>What we're building and why.</span></a></li>
              <li><a href={url('#backers')}><b>Leadership</b><span>The team running EIM.</span></a></li>
              <li><a href={url('#backers')}><b>Shareholders and partners</b><span>Ravindra Energy, J M Baxi, Foton.</span></a></li>
              <li><a href="#assess"><b>Contact</b><span>Offices in Mumbai, Noida, Pune and Nhava Sheva.</span></a></li>
            </ul>
            <div className="mega__card"><img src={url('assets/img/people.webp')} alt="" loading="lazy" /></div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="mnav" id="mnav" hidden>
        <div className="mnav__in">
          <details><summary>Solutions</summary>
            <a href={url(PAGES.maitryi)}>Maitryi model</a><a href={url(PAGES.ashwa)}>ASHWA e-tractor</a><a href={url(PAGES.swap)}>Swapping and charging</a><a href={url(PAGES.ashwa + '#service')}>After-sales service</a>
          </details>
          <details><summary>Industries</summary>
            <a href={PORTS}>Ports and container terminals</a><a href={url('#industries')}>Logistics and middle-mile</a><a href={url('#industries')}>Cement, steel and mining</a>
          </details>
          <a className="mnav__top" href={NETWORK}>Network</a>
          <a className="mnav__top" href={url(PAGES.newsroom)}>Newsroom</a>
          <details><summary>Company</summary>
            <a href={url(PAGES.about)}>About EIM</a><a href={url('#backers')}>Leadership</a><a href={url('#backers')}>Shareholders and partners</a><a href="#assess">Contact</a>
          </details>
          <a className="mnav__top" href={url('#careers')}>Careers</a>
          <a className="btn btn--teal" href="#assess"><span>Assess your fleet</span></a>
          <a className="mnav__mail" href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a>
        </div>
      </div>
    </>
  );
}
