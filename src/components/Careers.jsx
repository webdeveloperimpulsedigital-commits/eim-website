import React from 'react';

export default function Careers() {
  const roles = [
    { title: 'Operator', dept: 'Operations', loc: 'Thanjavur, Chennai' },
    { title: 'Charger Technician', dept: 'Technical', loc: 'Amirghadh, Gujarat' },
    { title: 'Sales Co-ordinator', dept: 'Sales', loc: 'Navi Mumbai' },
  ];

  const handleAnchorClick = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -70, duration: 1.6 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className="car sec sec--mist" id="careers" aria-labelledby="car-h">
      <div className="wrap car__grid">
        <div>
          <h2 className="h2" id="car-h">
            Build what India's freight runs on next.
          </h2>
          <p className="lede">
            Engineers, technicians, operators and sales people across ports, plants and highways. The work is heavy. The impact is too.
          </p>
          <a
            className="btn btn--ink"
            href="#careers"
            onClick={(e) => handleAnchorClick(e, '#careers')}
          >
            <span>See all open roles</span>
            <svg><use href="#arrow" /></svg>
          </a>
        </div>
        <ul className="roles">
          {roles.map((role, i) => (
            <li key={i}>
              <a href="#careers" onClick={(e) => handleAnchorClick(e, '#careers')}>
                <span className="roles__t">
                  <b>{role.title}</b>
                  {role.dept}
                </span>
                <span className="roles__l">{role.loc}</span>
                <svg><use href="#arrow" /></svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
