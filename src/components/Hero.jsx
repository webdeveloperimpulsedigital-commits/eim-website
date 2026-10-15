import React from 'react';

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-h">
      <div className="hero__pin" id="heroPin">
        <svg className="hero__svg" id="heroSvg" role="img" aria-label="EIM">
          <defs>
            <mask id="heroMask" maskUnits="userSpaceOnUse">
              <rect id="heroMaskBg" x="0" y="0" width="100%" height="100%" fill="#000" />
              <g id="heroGlyph" fill="#fff" style={{ visibility: 'hidden' }}>
                <path className="hg hg--s" d="M40.6733 31.3168L38.7339 35.0313H26.1498L26.1538 35.0293L44.744 25.2593L46.9802 20.9749L30.0681 12.1448H50.6848L48.0291 17.2287H64.1139L73.1102 0H24.6359V0.00198088L24.6339 0L15.5189 17.4543L27.264 23.5871L6.71457 34.3189L0 47.1761L0.00198088 47.1741L0 47.1761L48.4466 47.2295L56.6058 31.6058L40.6733 31.3168Z" />
                <path className="hg hg--i" d="M76.9367 0L52.3008 47.1761H68.3837L93.0196 0H76.9367Z" />
                <path className="hg hg--m" d="M124.915 0L112.425 23.9176V0H96.9777L72.3418 47.1761H87.1562L100.281 23.2586V47.1761H112.425H113.189L125.68 23.2586V47.1761H140.999V0H124.915Z" />
              </g>
            </mask>
          </defs>
          <g mask="url(#heroMask)">
            <rect id="heroInk" x="0" y="0" width="100%" height="100%" fill="#01262D" />
            <image id="heroImg" href="assets/img/hero-ashwa-v2.webp" xlinkHref="assets/img/hero-ashwa-v2.webp" x="0" y="0" width="1536" height="1024" preserveAspectRatio="none" />
          </g>
        </svg>
        <div className="hero__copy" id="heroCopy">
          <h1 className="hero__h" id="hero-h"><span className="ln">Keep your trucks earning.</span> <span className="ln">Leave the <mark>battery</mark> to&nbsp;us.</span></h1>
          <p className="hero__sub">EIM puts 55-tonne electric tractors on India's freight routes, owns and looks after every battery, and swaps a drained pack for a full one in under 7 minutes.</p>
          <div className="hero__ctas">
            <a className="btn btn--teal" href="#assess"><span>Assess your fleet</span><svg><use href="#arrow" /></svg></a>
            <a className="btn btn--ghost" href="#swap"><span>Watch a real swap</span><svg><use href="#down" /></svg></a>
          </div>
        </div>
      </div>
    </section>
  );
}
