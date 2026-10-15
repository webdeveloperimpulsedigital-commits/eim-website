import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function IntroCurtain({ onComplete }) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem('eim-intro') === '1';
    } catch (e) {}

    if (reduce || seen) {
      if (onComplete) onComplete();
      return;
    }

    setVisible(true);
    document.documentElement.classList.add('is-intro');

    const timer = setTimeout(() => {
      const ov = containerRef.current;
      if (!ov) return;
      const ps = ov.querySelectorAll('.intro__mark path');
      if (!ps.length) {
        document.documentElement.classList.remove('is-intro');
        setVisible(false);
        if (onComplete) onComplete();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove('is-intro');
          try {
            sessionStorage.setItem('eim-intro', '1');
          } catch (e) {}
          setVisible(false);
          if (onComplete) onComplete();
        },
      });

      tlRef.current = tl;

      tl.from(ps, { opacity: 0, duration: 0.8, stagger: 0.14 });
      const cur = { p: 0 };
      tl.to(ps, { fill: '#FFFFFF', stroke: '#FFFFFF', duration: 0.45, ease: 'power1.out', stagger: 0.06 }, '-=.25')
        .to('.intro__wm', { opacity: 1, duration: 0.5 }, '<')
        .to(ps, { x: (i) => [-6, 0, 6][i], duration: 0.45, ease: 'power2.in' }, '+=.25')
        .to(
          cur,
          {
            p: 1,
            duration: 0.95,
            ease: 'expo.inOut',
            onUpdate: () => {
              if (!ov) return;
              const s = 22;
              const r = 100 - cur.p * (100 + s);
              const l = r + s;
              ov.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${Math.max(
                0,
                r
              )}%, 0% ${Math.max(0, Math.min(100, l))}%)`;
            },
          },
          '-=.15'
        );
    }, 30);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('is-intro');
    };
  }, []);

  const handleClick = () => {
    if (tlRef.current) {
      tlRef.current.progress(1);
    } else {
      document.documentElement.classList.remove('is-intro');
      setVisible(false);
    }
  };

  if (!visible) return null;

  const paths = [
    'M40.6733 31.3168L38.7339 35.0313H26.1498L26.1538 35.0293L44.744 25.2593L46.9802 20.9749L30.0681 12.1448H50.6848L48.0291 17.2287H64.1139L73.1102 0H24.6359V0.00198088L24.6339 0L15.5189 17.4543L27.264 23.5871L6.71457 34.3189L0 47.1761L0.00198088 47.1741L0 47.1761L48.4466 47.2295L56.6058 31.6058L40.6733 31.3168Z',
    'M76.9367 0L52.3008 47.1761H68.3837L93.0196 0H76.9367Z',
    'M124.915 0L112.425 23.9176V0H96.9777L72.3418 47.1761H87.1562L100.281 23.2586V47.1761H112.425H113.189L125.68 23.2586V47.1761H140.999V0H124.915Z',
  ];

  return (
    <div className="intro" aria-hidden="true" ref={containerRef} onClick={handleClick}>
      <svg className="intro__mark" viewBox="-1 -1 143 50">
        {paths.map((p, i) => (
          <path key={i} d={p} />
        ))}
      </svg>
      <div className="intro__wm">
        <i className="wm" />
      </div>
    </div>
  );
}
