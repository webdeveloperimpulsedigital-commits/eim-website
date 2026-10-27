import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const [activeIntent, setActiveIntent] = useState('fleet'); // 'fleet' | 'site' | 'maitryi'
  const [fleetSize, setFleetSize] = useState('11–50');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const heroTitleRef = useRef(null);
  const markRef = useRef(null);
  const showcaseRef = useRef(null);
  const canvasRef = useRef(null);
  const rootRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    route: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Contact Us · EIM (Energy In Motion)';
    document.body.classList.add('is-contact-page');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx;
    if (!reduce) {
      ctx = gsap.context(() => {
        // 1. Hero Title Editorial Split-Words Rise (identical to homepage headings)
        const heroWords = heroTitleRef.current?.querySelectorAll('.wi');
        if (heroWords && heroWords.length) {
          gsap.from(heroWords, {
            yPercent: 115,
            rotate: 4,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.035,
            clearProps: 'transform,opacity',
          });
        }

        // 2. Signature Slanted Brand Mark Sweep
        if (markRef.current) {
          gsap.fromTo(
            markRef.current,
            { '--mk': 0 },
            { '--mk': 1, duration: 0.9, delay: 0.45, ease: 'expo.out' }
          );
        }

        // 3. Showcase Truck Photo zoom entrance (matches homepage photo reveal)
        const showcaseImg = showcaseRef.current?.querySelector('.v3-showcase-img');
        if (showcaseImg) {
          gsap.fromTo(
            showcaseImg,
            { scale: 1.15 },
            { scale: 1, duration: 1.6, ease: 'expo.out' }
          );
        }

      }, rootRef);
    }

    return () => {
      document.body.classList.remove('is-contact-page');
      if (ctx) ctx.revert();
    };
  }, []);

  // Animated 27.5° energy lines canvas effect (exact replication of homepage #assess)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sec = canvas.parentElement;
    if (!sec) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let W = 0;
    let H = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let last = 0;
    const TAN = Math.tan((27.5 * Math.PI) / 180); // 27.5° angle
    const GAP = 96;
    const JOG = 9;
    let startRail = 0;
    let endRail = 0;
    let P = [];

    function xAt(rail, y) {
      return rail * GAP - H * TAN * 0.5 + (H - y) * TAN;
    }

    function rnd(a, b) {
      return a + Math.random() * (b - a);
    }

    function spawn(p, seeded) {
      p.rail = Math.floor(rnd(startRail, endRail + 1));
      p.len = rnd(70, 260);
      p.sp = rnd(70, 230);
      p.wt = Math.random() < 0.3 ? 2 : 1;
      p.y = seeded ? rnd(-p.len, H) : -p.len - rnd(0, 400);
      p.kink = Math.random() < 0.3 ? 1 : 0;
      p.dir = Math.random() < 0.5 ? 1 : -1;
      p.ky = 0;
      return p;
    }

    function size() {
      const r = sec.getBoundingClientRect();
      W = r.width;
      H = r.height;
      if (W === 0 || H === 0) return;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rails cover the entire canvas across the 27.5° diagonal
      startRail = -Math.ceil((H * TAN) / GAP) - 2;
      endRail = Math.ceil((W + H * TAN) / GAP) + 2;

      const n = Math.max(12, Math.min(24, Math.round(W / 90)));
      P = [];
      for (let i = 0; i < n; i++) {
        P.push(spawn({}, true));
      }
    }

    size();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => size());
      ro.observe(sec);
    }
    window.addEventListener('resize', size);

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            last = 0;
            animationFrameId = requestAnimationFrame(draw);
          }
        } else {
          isVisible = false;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(sec);

    function draw(now) {
      if (!isVisible) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;

      // Dark petrol background
      ctx.fillStyle = '#01262D';
      ctx.fillRect(0, 0, W, H);
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';

      // 1. The fixed rails: dead straight, on the 27.5° angle
      ctx.strokeStyle = '#0B4A75';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = startRail; i <= endRail; i++) {
        ctx.moveTo(xAt(i, -4), -4);
        ctx.lineTo(xAt(i, H + 4), H + 4);
      }
      ctx.stroke();

      // 2. Cyan current travelling down them, with the occasional step across (kinks)
      ctx.strokeStyle = '#38E0CF';
      for (let k = 0; k < P.length; k++) {
        const p = P[k];
        p.y += p.sp * dt;
        if (p.y - p.len > H + 40) {
          spawn(p, false);
          continue;
        }
        const head = p.y;
        const tail = p.y - p.len;
        if (p.kink && !p.ky) p.ky = tail + p.len * rnd(0.3, 0.7);
        const r2 = p.kink ? Math.max(startRail, Math.min(endRail, p.rail + p.dir)) : p.rail;

        ctx.lineWidth = p.wt;
        ctx.beginPath();
        if (p.kink && p.ky > tail && p.ky + JOG < head) {
          ctx.moveTo(xAt(p.rail, tail), tail);
          ctx.lineTo(xAt(p.rail, p.ky), p.ky);
          ctx.lineTo(xAt(r2, p.ky + JOG), p.ky + JOG);
          ctx.lineTo(xAt(r2, head), head);
        } else {
          ctx.moveTo(xAt(p.rail, tail), tail);
          ctx.lineTo(xAt(p.rail, head), head);
        }
        ctx.stroke();

        // Harder leading edge, so every stroke ends on a clean cut
        ctx.lineWidth = p.wt + 1;
        ctx.beginPath();
        ctx.moveTo(xAt(r2, head - 16), head - 16);
        ctx.lineTo(xAt(r2, head), head);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', size);
      if (ro) ro.disconnect();
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.phone || !formData.email) {
      setFormError(true);
      return;
    }
    setFormError(false);
    setFormSubmitted(true);
  };

  return (
    <div className="contact-v3-page" ref={rootRef}>
      {/* ================= 1. HERO SECTION (CLEAN WHITE) ================= */}
      <section className="v3-hero">
        <div className="v3-wide-wrap">
          <div className="v3-hero__header">
            <h1 className="v3-hero__h" ref={heroTitleRef}>
              <span className="wo"><span className="wi">Let&apos;s</span></span>{' '}
              <span className="wo"><span className="wi">Electrify</span></span>{' '}
              <span className="wo"><span className="wi">Your</span></span>
              <br />
              <span className="wo"><span className="wi">Freight</span></span>{' '}
              <span className="wo">
                <span className="wi">
                  Corr<span className="v3-highlight-mark" ref={markRef}>idor</span>
                </span>
              </span>
            </h1>
          </div>

          <div className="v3-showcase-card" ref={showcaseRef}>
            <img
              src="/assets/img/contact-hero-factory.jpg"
              alt="EIM Electric Heavy Truck Fleet - Talegaon Assembly Hall"
              className="v3-showcase-img"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Note: Brands strip removed per user instruction */}

      {/* ================= 2. ASSESSMENT & CONTACT SECTION (DARK THEME FULL-WIDTH) ================= */}
      <section className="assess sec sec--dark" id="assess" aria-labelledby="as-h">
        <canvas ref={canvasRef} className="fxlines" aria-hidden="true" />
        <div className="wrap assess__grid">
          <div className="assess__copy">
            <h2 className="h2" id="as-h">
              What do you want to electrify?
            </h2>
            <p className="lede">
              Pick one, leave a number, and our fleet team will come back with a plan built around your routes.
            </p>
            <ul className="assess__direct">
              <li>
                <span>Email</span>
                <a href="mailto:powerup@energyinmotion.in">powerup@energyinmotion.in</a>
              </li>
              <li>
                <span>Head office</span>
                1A, 1st floor, Kohinoor Square, Dadar (W), Mumbai 400028
              </li>
            </ul>
          </div>

          <form className="aform" id="aform" onSubmit={handleSubmit} noValidate>
            <fieldset className="aform__intent">
              <legend>I want to talk about</legend>
              <label className="intent">
                <input
                  type="radio"
                  name="intent"
                  id="i-fleet"
                  value="fleet"
                  checked={activeIntent === 'fleet'}
                  onChange={() => setActiveIntent('fleet')}
                />
                <span>
                  <b>My fleet</b>
                  Electrifying trucks I run today
                </span>
              </label>
              <label className="intent">
                <input
                  type="radio"
                  name="intent"
                  id="i-site"
                  value="site"
                  checked={activeIntent === 'site'}
                  onChange={() => setActiveIntent('site')}
                />
                <span>
                  <b>A route or site</b>
                  A swap or charging station where we operate
                </span>
              </label>
              <label className="intent">
                <input
                  type="radio"
                  name="intent"
                  id="i-mai"
                  value="maitryi"
                  checked={activeIntent === 'maitryi'}
                  onChange={() => setActiveIntent('maitryi')}
                />
                <span>
                  <b>The Maitryi model</b>
                  How owning the truck, not the battery, works
                </span>
              </label>
            </fieldset>

            <div className="aform__fields">
              <div className="f">
                <label htmlFor="f-name">Your name</label>
                <input
                  id="f-name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="f">
                <label htmlFor="f-co">Company</label>
                <input
                  id="f-co"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="f">
                <label htmlFor="f-phone">Mobile</label>
                <input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="f">
                <label htmlFor="f-email">Work email</label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="f f--wide">
                <span className="f__lab" id="fleet-lab">
                  Fleet size
                </span>
                <div className="chips" role="radiogroup" aria-labelledby="fleet-lab">
                  {['1–10', '11–50', '51–200', '200+'].map((sz) => (
                    <label key={sz}>
                      <input
                        type="radio"
                        name="fleet"
                        value={sz}
                        checked={fleetSize === sz}
                        onChange={() => setFleetSize(sz)}
                      />
                      <span>{sz}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="f f--wide">
                <label htmlFor="f-route">
                  Main route or site <em>(optional)</em>
                </label>
                <input
                  id="f-route"
                  name="route"
                  placeholder="Route, port or site"
                  value={formData.route}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button className="btn btn--teal btn--block" type="submit">
              <span>Send to the EIM team</span>
              <svg><use href="#arrow" /></svg>
            </button>

            {formError && (
              <p className="aform__err" role="alert">
                Add your name, company, mobile and a valid work email so we can reach you.
              </p>
            )}

            {formSubmitted && (
              <div className="aform__ok">
                <svg viewBox="0 0 141 48"><use href="#eim" /></svg>
                <p>
                  <b>Thanks, it&apos;s with our fleet team.</b> Expect a call on the number you shared.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

