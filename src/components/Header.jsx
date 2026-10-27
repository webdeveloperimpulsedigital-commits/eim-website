import React, { useEffect } from 'react';
import { url, HOME, PAGES, sectionOf } from '../paths';

// Sitemap (approved 2026-10-22): Solutions has three pages, After-sales lives on the ASHWA page,
// Network is a section of the swapping and charging page, Knowledge became a single Newsroom.
// Links to pages not built yet point at the matching homepage section.
// current: the nav section this page belongs to ('solutions', 'industries', ...), marked with the teal bar
// onDark: the page opens on a dark hero, so the bar starts white-on-ink until it turns solid on scroll
// isContactPage: whether the header is rendered on the /contact-us page
export default function Header({ current, onDark = false, isContactPage }) {
  const cur = (id) => 'nav__item' + (current === id ? ' is-current' : '');
  const NETWORK = sectionOf(PAGES.swap, '#network');
  // only the ports page is built so far; the other industries still point at the homepage section
  const PORTS = sectionOf(PAGES.ports, '#top');
  const homeHref = isContactPage ? '/' : HOME;

  const handleContactClick = (e) => {
    if (isContactPage) {
      e.preventDefault();
      const el = document.getElementById('console');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Ensure header interactive functionality (mega menus, burger, scroll) works on contact page
  useEffect(() => {
    if (!isContactPage) return;

    const hdr = document.getElementById('hdr');
    const burger = document.getElementById('burger');
    const mnav = document.getElementById('mnav');
    if (!hdr || !burger || !mnav) return;

    let openId = null;
    let closeTimer = null;
    let lastY = window.scrollY || window.pageYOffset || 0;

    const megaItems = Array.from(hdr.querySelectorAll('.nav__item[data-mega]'));
    const nonMegaItems = Array.from(hdr.querySelectorAll('.nav__item:not([data-mega])'));

    function openMega(id) {
      clearTimeout(closeTimer);
      if (openId === id) return;
      megaItems.forEach((li) => {
        const megaName = li.getAttribute('data-mega');
        const on = megaName === id;
        const panel = document.getElementById(`mega-${megaName}`);
        const btn = li.querySelector('.nav__btn');
        if (btn) btn.setAttribute('aria-expanded', on ? 'true' : 'false');
        if (panel) panel.hidden = !on;
      });
      openId = id;
      hdr.classList.add('is-open');
    }

    function closeMega() {
      clearTimeout(closeTimer);
      megaItems.forEach((li) => {
        const megaName = li.getAttribute('data-mega');
        const panel = document.getElementById(`mega-${megaName}`);
        const btn = li.querySelector('.nav__btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
      });
      openId = null;
      hdr.classList.remove('is-open');
    }

    function closeMnav() {
      if (mnav.hidden) return;
      mnav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      hdr.classList.remove('is-open');
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    }

    function openMnav() {
      mnav.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      hdr.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
    }

    function onBurgerClick(e) {
      e.stopPropagation();
      if (!mnav.hidden) {
        closeMnav();
      } else {
        openMnav();
      }
    }

    function onScrollHdr() {
      const y = window.scrollY || window.pageYOffset || 0;
      if (document.documentElement.classList.contains('is-intro')) {
        hdr.classList.remove('is-solid', 'is-hidden');
        return;
      }
      hdr.classList.toggle('is-solid', y > 30);
      const isOpen = hdr.classList.contains('is-open') || !mnav.hidden;
      if (!isOpen && y > 700 && y > lastY + 2) {
        hdr.classList.add('is-hidden');
      }
      if (y < lastY - 2 || y < 700) {
        hdr.classList.remove('is-hidden');
      }
      lastY = y;
    }

    burger.addEventListener('click', onBurgerClick);
    window.addEventListener('scroll', onScrollHdr, { passive: true });
    onScrollHdr();

    const cleanups = [];

    megaItems.forEach((li) => {
      const id = li.getAttribute('data-mega');
      const btn = li.querySelector('.nav__btn');

      const onEnter = () => openMega(id);
      const onClick = (e) => {
        e.stopPropagation();
        if (openId === id) {
          closeMega();
        } else {
          openMega(id);
        }
      };

      li.addEventListener('mouseenter', onEnter);
      if (btn) btn.addEventListener('click', onClick);

      cleanups.push(() => {
        li.removeEventListener('mouseenter', onEnter);
        if (btn) btn.removeEventListener('click', onClick);
      });
    });

    const onHdrLeave = () => {
      closeTimer = setTimeout(closeMega, 180);
    };
    const onHdrEnter = () => {
      clearTimeout(closeTimer);
    };

    hdr.addEventListener('mouseleave', onHdrLeave);
    hdr.addEventListener('mouseenter', onHdrEnter);

    const onNonMegaEnter = () => closeMega();
    nonMegaItems.forEach((li) => {
      li.addEventListener('mouseenter', onNonMegaEnter);
      cleanups.push(() => li.removeEventListener('mouseenter', onNonMegaEnter));
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMega();
        closeMnav();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // Close menus when clicking any anchor
    const onAnchorClick = (e) => {
      const a = e.target.closest('a');
      if (a) {
        closeMega();
        closeMnav();
      }
    };
    hdr.addEventListener('click', onAnchorClick);
    mnav.addEventListener('click', onAnchorClick);

    return () => {
      clearTimeout(closeTimer);
      burger.removeEventListener('click', onBurgerClick);
      window.removeEventListener('scroll', onScrollHdr);
      hdr.removeEventListener('mouseleave', onHdrLeave);
      hdr.removeEventListener('mouseenter', onHdrEnter);
      document.removeEventListener('keydown', onKeyDown);
      hdr.removeEventListener('click', onAnchorClick);
      mnav.removeEventListener('click', onAnchorClick);
      cleanups.forEach((c) => c());
      document.body.style.overflow = '';
    };
  }, [isContactPage]);

  return (
    <>
      <header className={'hdr' + (onDark ? ' hdr--dark' : '')} id="hdr">
        <div className="hdr__bar">
          <a className="hdr__logo" href={homeHref} aria-label="EIM, Heavy mobility reimagined, home">
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
            <a className="btn btn--teal btn--sm" href="/contact-us" onClick={handleContactClick}>
              <span>Assess your fleet</span>
            </a>
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
              <li>
                <a href="/contact-us" onClick={handleContactClick}>
                  <b>Contact</b><span>Offices in Mumbai, Noida, Pune and Nhava Sheva.</span>
                </a>
              </li>
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
            <a href={url(PAGES.about)}>About EIM</a><a href={url('#backers')}>Leadership</a><a href={url('#backers')}>Shareholders and partners</a><a href="/contact-us" onClick={handleContactClick}>Contact</a>
          </details>
          <a className="mnav__top" href={url('#careers')}>Careers</a>
          <a className="btn btn--teal" href="/contact-us" onClick={handleContactClick}><span>Assess your fleet</span></a>
          <a className="mnav__mail" href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a>
        </div>
      </div>
    </>
  );
}
