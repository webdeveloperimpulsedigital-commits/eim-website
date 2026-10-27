/* EIM homepage · interactions v2
   GSAP + ScrollTrigger + Lenis. Without them the page stays fully readable and static. */
(function () {
  'use strict';
  var d = document, w = window, root = d.documentElement;
  root.classList.add('js');
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasG = !!(w.gsap && w.ScrollTrigger);
  var fine = w.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var map = function (v, a, b, c, e) { return c + (e - c) * clamp((v - a) / (b - a), 0, 1); };
  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  if (hasG) gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll ---------- */
  var lenis = null;
  if (w.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    w.__lenis = lenis;
    if (hasG) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(function (t) { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0); }
    else (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
  }
  function goTo(el) {
    if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.6 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute('href'); if (id.length < 2) return;
    var el = $(id); if (!el) return;
    e.preventDefault(); closeMega(); closeMnav();
    var intent = a.getAttribute('data-intent');
    if (intent) { var r = $('input[name=intent][value="' + intent + '"]'); if (r) r.checked = true; }
    goTo(el);
  });

  /* ---------- header + mega menu ---------- */
  var hdr = $('#hdr'), lastY = w.scrollY || w.pageYOffset || 0;
  function onScrollHdr() {
    if (!hdr) return;
    var y = w.scrollY || w.pageYOffset;
    if (root.classList.contains('is-intro')) {
      hdr.classList.remove('is-solid', 'is-hidden');
      return;
    }
    hdr.classList.toggle('is-solid', y > 30);
    var mnavEl = $('#mnav');
    var open = hdr.classList.contains('is-open') || (mnavEl && !mnavEl.hidden);
    if (!open && y > 700 && y > lastY + 2) hdr.classList.add('is-hidden');
    if (y < lastY - 2 || y < 700) hdr.classList.remove('is-hidden');
    lastY = y;
  }
  w.addEventListener('scroll', onScrollHdr, { passive: true }); onScrollHdr();
  var megaItems = $$('.nav__item[data-mega]'), openId = null, closeT;
  function openMega(id) {
    clearTimeout(closeT); if (openId === id) return;
    megaItems.forEach(function (li) {
      var on = li.getAttribute('data-mega') === id, panel = $('#mega-' + li.getAttribute('data-mega'));
      $('.nav__btn', li).setAttribute('aria-expanded', on ? 'true' : 'false'); panel.hidden = !on;
      if (on && hasG && !reduce) gsap.fromTo($('.mega__in', panel).children, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .05, ease: 'power3.out' });
    });
    openId = id; hdr.classList.add('is-open');
  }
  function closeMega() {
    megaItems.forEach(function (li) { $('.nav__btn', li).setAttribute('aria-expanded', 'false'); $('#mega-' + li.getAttribute('data-mega')).hidden = true; });
    openId = null; hdr.classList.remove('is-open');
  }
  megaItems.forEach(function (li) {
    var id = li.getAttribute('data-mega');
    li.addEventListener('mouseenter', function () { if (fine) openMega(id); });
    $('.nav__btn', li).addEventListener('click', function () { openId === id ? closeMega() : openMega(id); });
  });
  hdr.addEventListener('mouseleave', function () { closeT = setTimeout(closeMega, 180); });
  hdr.addEventListener('mouseenter', function () { clearTimeout(closeT); });
  $$('.nav__item:not([data-mega])').forEach(function (li) { li.addEventListener('mouseenter', closeMega); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMega(); closeMnav(); } });
  var burger = $('#burger'), mnav = $('#mnav');
  function closeMnav() {
    if (mnav.hidden) return;
    mnav.hidden = true; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu');
    hdr.classList.remove('is-open'); d.body.style.overflow = ''; if (lenis) lenis.start();
  }
  burger.addEventListener('click', function () {
    if (!mnav.hidden) return closeMnav();
    mnav.hidden = false; burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Close menu');
    hdr.classList.add('is-open'); d.body.style.overflow = 'hidden'; if (lenis) lenis.stop();
  });

  /* ---------- counters ---------- */
  function fmt(n, el) {
    var s = el.hasAttribute('data-sep') ? Math.round(n).toLocaleString('en-IN') : String(Math.round(n));
    var pad = +el.getAttribute('data-pad') || 0; while (s.length < pad) s = '0' + s; return s;
  }
  var countIO = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, to = +el.getAttribute('data-to'); countIO.unobserve(el); if (reduce) return;
      var t0 = performance.now(), dur = 1700;
      (function tick(t) { var k = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 4); el.textContent = fmt(to * e, el); if (k < 1) requestAnimationFrame(tick); })(t0);
    });
  }, { threshold: .6 });
  // counters are handled by the odometer in fx.js

  /* ================= HERO: ΣIM alone, the truck inside it; scroll opens it, then the copy ================= */
  (function hero() {
    var pin = $('#heroPin'), svg = $('#heroSvg'), glyph = $('#heroGlyph'), img = $('#heroImg'), ink = $('#heroInk'), copy = $('#heroCopy'), h1 = $('.hero__h');
    if (!pin) return;
    var IA = 2560 / 1440, G = { p: 0 };
    function rect(x, y, w, h) { return { x: x, y: y, w: w, h: h }; }
    function mix(a, b, t) { return rect(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.w, b.w, t), lerp(a.h, b.h, t)); }
    function contain(x, y, w, h) { var iw = Math.min(w, h * IA), ih = iw / IA; return rect(x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); }
    function layout() {
      var vw = pin.clientWidth, vh = pin.clientHeight, mob = vw < 760, top = mob ? 80 : 100, gut = mob ? 16 : Math.max(24, Math.min(56, vw * .04));
      svg.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh);
      ['#heroMaskBg', '#heroInk'].forEach(function (s) { $(s).setAttribute('width', vw); $(s).setAttribute('height', vh); });
      // 1. the mark, centred, as big as the screen allows
      var gw = Math.min(vw - gut * 2, (vh - top - 60) * 141 / 48, 1180), gh = gw * 48 / 141;
      G.vw = vw; G.vh = vh; G.k = gw / 141; G.gx = (vw - gw) / 2; G.gy = top + (vh - top - gh) / 2 - (mob ? 0 : 10);
      G.ox = G.gx + 72.5 * G.k; G.oy = G.gy + 24 * G.k;          // zoom origin: inside the I stroke
      G.K = 3.2 * Math.max(vw, vh) / (15 * G.k);
      // image while inside the mark: covers the mark, truck centred on it
      var cw = Math.max(gw * 1.12, gh * 1.12 * IA), ch = cw / IA;
      G.r0 = rect(vw / 2 - cw / 2, G.gy + gh / 2 - ch * .52, cw, ch);
      // 2. whole picture, centred
      G.r1 = contain(gut, top, vw - gut * 2, vh - top - (mob ? 24 : 32));
      // 3. copy beside (desktop) or below (mobile) the picture; sizes solved so nothing overlaps
      copy.style.width = ''; h1.style.setProperty('--hfs', '');
      if (!mob) {
        var colW = Math.max(340, Math.min(600, vw * .4)), gap = Math.max(28, vw * .03);
        var fs = Math.max(36, Math.min(76, vw * .046));
        copy.style.width = colW + 'px'; copy.style.left = gut + 'px';
        h1.style.setProperty('--hfs', fs + 'px');
        while ((h1.scrollWidth > colW + 1 || copy.offsetHeight > vh - top - 40) && fs > 26) { fs -= 1; h1.style.setProperty('--hfs', fs + 'px'); }
        copy.style.top = Math.max(top, top + (vh - top - copy.offsetHeight) / 2) + 'px';
        var ix = gut + colW + gap;
        G.r2 = contain(ix, top, vw - ix - gut, vh - top - 32);
      } else {
        copy.style.width = (vw - gut * 2) + 'px'; copy.style.left = gut + 'px';
        var fs2 = Math.min(44, vw * .1); h1.style.setProperty('--hfs', fs2 + 'px');
        var iw = vw - gut * 2, ih = iw / IA;
        while (top + ih + 20 + copy.offsetHeight > vh - 20 && fs2 > 26) { fs2 -= 2; h1.style.setProperty('--hfs', fs2 + 'px'); }
        var avail = vh - 20 - copy.offsetHeight - 20 - top;
        if (ih > avail) { ih = Math.max(120, avail); iw = ih * IA; }
        G.r2 = rect((vw - iw) / 2, top, iw, ih);
        copy.style.top = (top + ih + 20) + 'px';
      }
      set(G.p);
      if (glyph) glyph.style.visibility = 'visible';
    }
    function set(p) {
      G.p = p;
      var z = map(p, 0, .42, 0, 1), s = 1 + (G.K - 1) * Math.pow(z, 2.4);
      glyph.setAttribute('transform', 'translate(' + G.ox + ' ' + G.oy + ') scale(' + s + ') translate(' + (-G.ox) + ' ' + (-G.oy) + ') translate(' + G.gx + ' ' + G.gy + ') scale(' + G.k + ')');
      var r = p < .5 ? mix(G.r0, G.r1, ease(map(p, .3, .5, 0, 1))) : mix(G.r1, G.r2, ease(map(p, .58, .78, 0, 1)));
      img.setAttribute('x', r.x); img.setAttribute('y', r.y); img.setAttribute('width', r.w); img.setAttribute('height', r.h);
      var c = map(p, .7, .86, 0, 1);
      copy.style.opacity = c.toFixed(3); copy.style.transform = 'translateY(' + ((1 - ease(c)) * 24).toFixed(1) + 'px)';
      copy.classList.toggle('is-on', c > .01);
    }
    layout(); w.addEventListener('resize', layout);
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(layout);
    if (hasG && !reduce) {
      ScrollTrigger.create({ trigger: pin, start: 'top top', end: '+=200%', pin: true, scrub: .5, onUpdate: function (st) { set(st.progress); }, onRefresh: function (st) { set(st.progress); } });
    } else { set(1); }
  })();

  /* ---------- headings: words rise from behind an edge ---------- */
  function splitWords(el) {
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(d.createTextNode(t)); return; }
            var o = d.createElement('span'); o.className = 'wo'; var i = d.createElement('span'); i.className = 'wi'; i.textContent = t; o.appendChild(i); frag.appendChild(o);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'MARK') walk(n);
      });
    })(el);
  }
  if (hasG && !reduce) {
    $$('.h2, .svc__head .h3').forEach(function (h) {
      splitWords(h);
      gsap.from($$('.wi', h), { yPercent: 115, rotate: 4, duration: 1.1, ease: 'expo.out', stagger: .035, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
    });
    $$('.lede, .svc__head p, .tl__item, .nitem, .bcard, .spec div, .roles li, .faq__list details, .stat, .card h3, .card p').forEach(function (el) {
      gsap.from(el, { y: 32, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
    $$('.card figure, .nitem figure, .tl__item figure, .ashwa__img, .bcard--img img').forEach(function (el) {
      gsap.fromTo(el, { clipPath: 'polygon(0% 0%, 0% 0%, -30% 100%, -30% 100%)' }, { clipPath: 'polygon(0% 0%, 130% 0%, 100% 100%, -30% 100%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 88%', once: true }, onComplete: function () { el.style.clipPath = ''; } });
      var im = el.tagName === 'IMG' ? el : $('img', el);
      if (im) gsap.fromTo(im, { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
        $$('.svc__bar i').forEach(function (el) { gsap.from(el, { width: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }); });
  }

  /* ---------- relief cards: the old problem is struck through as each card arrives ---------- */
  if (hasG && !reduce && $('.relief__cards')) {
    ScrollTrigger.create({ trigger: '.relief__cards', start: 'top 75%', once: true, onEnter: function () {
      gsap.fromTo('.rc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', stagger: .08, clearProps: 'opacity,transform' });
    } });
  }

  /* ================= SWAP: real footage, scrubbed ================= */
  (function swap() {
    var pin = $('#swapPin'), cv = $('#swapCanvas'), stage = $('#swapStage');
    if (!pin || !cv || !hasG) return;
    var ctx = cv.getContext('2d'), base = 'assets/seq/', IW = 1440, IH = 810, FX = .62;
    var SEQ = { a: 33, b: 50, c: 4, d: 53, e: 41 }, imgs = {};
    function url(k, i) { return base + k + (i < 10 ? '0' : '') + i + '.webp'; }
    function load(k, i) {
      var id = k + i; if (imgs[id]) return imgs[id];
      var im = new Image(); im.decoding = 'async'; im.src = url(k, i);
      im.onload = function () { im._ok = true; draw(curP, true); };
      imgs[id] = im; return im;
    }
    function get(k, i) {
      i = clamp(i, 0, SEQ[k] - 1); var im = load(k, i); if (im._ok) return im;
      for (var s = 1; s < SEQ[k]; s++) { var a = imgs[k + (i - s)], b = imgs[k + (i + s)]; if (a && a._ok) return a; if (b && b._ok) return b; }
      return null;
    }
    // [start, end, sequence, firstFrame, lastFrame]
    var T = [[0, .13, 'a', 0, 32], [.13, .36, 'b', 0, 49], [.36, .60, 'c', 0, 3], [.60, .80, 'd', 0, 52], [.80, 1.0001, 'e', 0, 40]];
    // true timestamps (seconds) in the original, unedited clip, used for the footage clock
    function srcTime(k, f) {
      if (k === 'a') return f * .4;
      if (k === 'b') return 69 + f;
      if (k === 'c') { var C = [121, 141, 161, 200], i = Math.floor(f), t = f - i; return lerp(C[clamp(i, 0, 3)], C[clamp(i + 1, 0, 3)], t); }
      if (k === 'd') return 205 + f;
      return 296 + (16 + f) / 2.2;
    }
    var W = 0, H = 0, CW = 0, CH = 0, dpr = 1, R = { dx: 0, dy: 0, dw: 0, dh: 0 };
    function size() {
      var r = stage.getBoundingClientRect(); CW = r.width; CH = r.height; if (!CW) return;
      dpr = Math.min(w.devicePixelRatio || 1, 2); W = Math.round(CW * dpr); H = Math.round(CH * dpr); cv.width = W; cv.height = H;
      var s = Math.max(CW / IW, CH / IH); R.dw = IW * s; R.dh = IH * s; R.dx = clamp(CW / 2 - R.dw * FX, CW - R.dw, 0); R.dy = (CH - R.dh) / 2;
      var x = $('#xray'); x.style.left = R.dx + 'px'; x.style.top = R.dy + 'px'; x.style.width = R.dw + 'px'; x.style.height = R.dh + 'px';
      draw(curP, true);
    }
    function paint(im, a) { if (!im) return; ctx.globalAlpha = a; ctx.drawImage(im, R.dx * dpr, R.dy * dpr, R.dw * dpr, R.dh * dpr); }
    var curP = 0, tgtP = 0, last = -1;
    function draw(p, force) {
      if (!W || (!force && Math.abs(p - last) < .00004)) return; last = p;
      var seg = T[T.length - 1]; for (var i = 0; i < T.length; i++) if (p >= T[i][0] && p < T[i][1]) { seg = T[i]; break; }
      var t = clamp((p - seg[0]) / (seg[1] - seg[0]), 0, 1), fi = lerp(seg[3], seg[4], t), i0 = Math.floor(fi), fr = fi - i0;
      var a = get(seg[2], i0), b = fr > .02 ? get(seg[2], i0 + 1) : null;
      if (!a && !b) return;
      paint(fr < .5 ? (a || b) : (b || a), 1); ctx.globalAlpha = 1;
      root.classList.add('has-seq');
      hud(p, srcTime(seg[2], fi));
      xray(p);
    }

    var steps = $$('.step'), bars = $$('.sprog i'), src = $('#swapSrc');
    var SB = [0, .13, .36, .60, .80, 1.0001];
    var STAT = ['Truck aligning in bay', 'Spreader locked, lifting pack', 'Pack charging, full pack picked', 'Full pack lowered and locked', 'Cleared to go'];
    var curStep = -1, curState = '';
    function hud(p, sec) {
      var st = 0; for (var i = 0; i < 5; i++) if (p >= SB[i]) st = i;
      if (st !== curStep) { curStep = st; steps.forEach(function (s, i) { s.classList.toggle('is-on', i === st); }); }
      bars.forEach(function (b, i) { b.style.setProperty('--p', map(p, SB[i], SB[i + 1], 0, 1).toFixed(3)); });
      var ill = p > .37 && p < .59;
      src.classList.toggle('is-ill', ill);
      src.lastChild.textContent = ill ? 'Illustration · inside the station' : 'Real footage · EIM swap station';
    }

    // x-ray interior (illustration), locked to the real container's position in the footage
    var xr = $('#xray'), slotsG = $('#xrSlots'), D = $('#xrDrained'), C = $('#xrCharged'), hook = $('#xrHook1'), scan = $('#xrScan'), dl = $('#xrDLvl'), tA = $('#xrTagA'), tB = $('#xrTagB');
    var NS = 'http://www.w3.org/2000/svg', SX = [60, 184, 308, 432, 556], R1 = 230, R2 = 452;
    SX.forEach(function (x, k) {
      [R1, R2].forEach(function (y) {
        var r = d.createElementNS(NS, 'rect'); r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', 104); r.setAttribute('height', 196); r.setAttribute('fill', 'none'); r.setAttribute('stroke', '#38E0CF'); r.setAttribute('stroke-dasharray', '5 5'); slotsG.appendChild(r);
        if (y === R2 || k === 1 || k === 3 || k === 4) {
          var u = d.createElementNS(NS, 'use'); u.setAttribute('href', '#xpack'); u.setAttribute('x', x); u.setAttribute('y', y); u.setAttribute('width', 104); u.setAttribute('height', 196); slotsG.appendChild(u);
          var l = d.createElementNS(NS, 'rect'); l.setAttribute('x', x + 44); l.setAttribute('y', y + 40); l.setAttribute('width', 16); l.setAttribute('height', 140); l.setAttribute('fill', '#38E0CF'); slotsG.appendChild(l);
        }
      });
    });
    function place(g, x, y) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ')'); }
    function xray(p) {
      var o = Math.min(map(p, .355, .385, 0, 1), map(p, .575, .60, 1, 0));
      xr.style.opacity = o.toFixed(3); if (o <= 0) return;
      var u = map(p, .38, .58, 0, 1);
      var dx = u < .2 ? 798 : lerp(798, 308, ease(map(u, .2, .42, 0, 1)));
      var dy = u < .2 ? lerp(236, 186, ease(map(u, .04, .2, 0, 1))) : u < .42 ? 186 : lerp(186, R1, ease(map(u, .42, .52, 0, 1)));
      place(D, dx, dy);
      var lv = map(u, .52, 1, 28, 84); dl.setAttribute('height', lv.toFixed(1)); dl.setAttribute('y', (180 - lv).toFixed(1)); dl.setAttribute('fill', u > .7 ? '#38E0CF' : '#FFFFFF');
      var cx = u < .58 ? 60 : lerp(60, 798, ease(map(u, .58, .85, 0, 1)));
      var cy = u < .5 ? R1 : u < .58 ? lerp(R1, 186, ease(map(u, .5, .58, 0, 1))) : u < .85 ? 186 : lerp(186, 236, ease(map(u, .85, .96, 0, 1)));
      place(C, cx, cy);
      var hk = u < .52 ? [dx, dy] : [cx, cy]; place(hook, hk[0], hk[1] - 24);
      var sx = (u * 3 % 1) * 1440; scan.setAttribute('x1', sx); scan.setAttribute('x2', sx);
      tA.style.opacity = Math.min(map(u, .42, .5, 0, 1), map(u, .62, .7, 1, 0)); place(tA, 430, 250);
      tB.style.opacity = Math.min(map(u, .58, .64, 0, 1), map(u, .9, .98, 1, 0)); place(tB, Math.max(40, cx - 310), 96);
    }

    for (var i = 0; i < SEQ.a; i++) load('a', i);
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return; io.disconnect();
      ['b', 'c', 'd', 'e'].forEach(function (k, n) { setTimeout(function () { for (var i = 0; i < SEQ[k]; i++) load(k, i); }, n * 300); });
    }, { rootMargin: '1400px 0px' });
    io.observe(pin);
    var first = load('a', 0); first.addEventListener('load', size);
    w.addEventListener('resize', size);
    ScrollTrigger.create({ trigger: pin, start: 'top top', end: function () { return '+=' + Math.round(w.innerHeight * 7); }, pin: true, anticipatePin: 1, onUpdate: function (st) { tgtP = st.progress; }, onRefresh: size });
    gsap.ticker.add(function () { curP = reduce ? tgtP : lerp(curP, tgtP, .12); if (Math.abs(curP - tgtP) < .0002) curP = tgtP; draw(curP); });
    size();
  })();

  /* ---------- Maitryi: the battery lifts off the truck ---------- */
  (function maitryi() {
    var truck = $('.mai__truck'), items = $$('#maiOwns li'); if (!truck) return;
    function set(p) {
      truck.style.setProperty('--lift', ease(map(p, .05, .45, 0, 1)).toFixed(3));
      items.forEach(function (li, i) { li.classList.toggle('on', p > .3 + i * .11); });
    }
    if (!hasG || reduce) { set(1); return; }
    ScrollTrigger.matchMedia({
      '(min-width: 1001px)': function () { ScrollTrigger.create({ trigger: '#maiPin', start: 'top top', end: '+=110%', pin: true, scrub: .6, onUpdate: function (st) { set(st.progress); } }); },
      '(max-width: 1000px)': function () { ScrollTrigger.create({ trigger: '.mai__stage', start: 'top 80%', end: 'bottom 20%', scrub: .6, onUpdate: function (st) { set(st.progress); } }); }
    });
  })();

  /* ---------- Σ I M: Drive / Energize / Charge ---------- */
  (function trio() {
    var t = $('#trio'); if (!t) return;
    var gs = $$('.trio__g', t), caps = $$('.tcap', t), k = 0, touched = false;
    function on(n) { k = n; t.classList.add('has-on'); gs.forEach(function (g, i) { g.classList.toggle('is-on', i === n); }); caps.forEach(function (c, i) { c.classList.toggle('is-on', i === n); }); }
    gs.forEach(function (g, i) {
      g.addEventListener('mouseenter', function () { touched = true; on(i); });
      g.addEventListener('click', function () { touched = true; on(i); });
      g.addEventListener('focus', function () { touched = true; on(i); });
    });
    on(0);
    if (!reduce) setInterval(function () { if (!touched) on((k + 1) % 3); }, 3800);
    if (hasG && !reduce) gsap.fromTo(gs, { x: function (i) { return [-24, 0, 24][i]; }, y: function (i) { return [0, 30, 0][i]; }, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 1.4, ease: 'expo.out', stagger: .12, clearProps: 'opacity,visibility,transform,translate', scrollTrigger: { trigger: t, start: 'top 85%', toggleActions: 'play none none none' } });
  })();

  $$('.hot').forEach(function (h) { h.addEventListener('click', function () { var on = !h.classList.contains('is-on'); $$('.hot').forEach(function (x) { x.classList.remove('is-on'); }); h.classList.toggle('is-on', on); }); });

  /* ================= NETWORK: what exists, what is coming, what is planned ================= */
  (function network() {
    // Counts: the 'Charging Infra Network' map on energyinmotion.in (N 5/3/8, W 3/11/13, S 0/2/0, E 0/0/10).
    // Zone coverage: EIM corporate presentation, slides 26-28. No route or sequence is implied or drawn:
    // the sources describe a continuous corridor only once every planned site is built.
    var Z = [
      { name: 'North', states: 'Delhi, Haryana, Rajasthan and Uttar Pradesh', live: 5, up: 3, plan: 8 },
      { name: 'West', states: 'Gujarat and Maharashtra', live: 3, up: 11, plan: 13 },
      { name: 'South', states: 'Tamil Nadu', live: 0, up: 2, plan: 0 },
      { name: 'East', states: 'Odisha and parts of Chhattisgarh', live: 0, up: 0, plan: 10 }
    ];
    var ul = $('#zrows'); if (!ul) return;
    var filter = 'all';
    var KEY = { live: 'Existing', up: 'Upcoming', plan: 'Planned' };
    var MAXTOT = Z.reduce(function (m, z) { return Math.max(m, z.live + z.up + z.plan); }, 0);
    function render() {
      ul.innerHTML = '';
      Z.forEach(function (z) {
        var tot = z.live + z.up + z.plan, li = d.createElement('li');
        li.className = 'zrow';
        var segs = ['live', 'up', 'plan'].map(function (k) {
          if (!z[k]) return '';
          var on = filter === 'all' || (filter === 'live' && k === 'live') || (filter === 'upcoming' && k === 'up') || (filter === 'planned' && k === 'plan');
          return '<i class="zseg zseg--' + k + (on ? '' : ' is-off') + '" style="--n:' + z[k] + '" aria-hidden="true"></i>';
        }).join('');
        var nums = ['live', 'up', 'plan'].map(function (k) {
          var on = filter === 'all' || (filter === 'live' && k === 'live') || (filter === 'upcoming' && k === 'up') || (filter === 'planned' && k === 'plan');
          return '<span class="zn zn--' + k + (on ? '' : ' is-off') + '"><b>' + z[k] + '</b>' + KEY[k] + '</span>';
        }).join('');
        li.innerHTML = '<div class="zrow__head"><h3>' + z.name + '</h3><p>' + z.states + '</p></div>' +
          '<div class="zrow__bar" style="--w:' + (tot / MAXTOT * 100).toFixed(2) + '%">' + segs + '</div>' +
          '<div class="zrow__nums">' + nums + '</div>';
        ul.appendChild(li);
      });
      if (hasG && !reduce) gsap.from($$('.zseg', ul), { scaleX: 0, transformOrigin: 'left center', duration: .7, ease: 'power3.out', stagger: .04 });
    }
    $$('.nf').forEach(function (b) {
      b.addEventListener('click', function () {
        filter = b.getAttribute('data-f');
        $$('.nf').forEach(function (x) { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
        render();
      });
    });
    render();
    if (hasG && !reduce) ScrollTrigger.create({ trigger: ul, start: 'top 80%', once: true, onEnter: render });
  })();

  /* ---------- timeline: horizontal on desktop ---------- */
  if (hasG && !reduce && $('#tlTrack')) ScrollTrigger.matchMedia({
    '(min-width: 1001px)': function () {
      var track = $('#tlTrack'), dist = function () { return Math.max(0, track.scrollWidth - w.innerWidth); };
      var tp = $('#tlPin'); tp.style.minHeight = '100vh'; tp.style.paddingTop = '84px'; tp.style.paddingBottom = '24px';
      w.EIM_tl = gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: tp, start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: .8, invalidateOnRefresh: true } });
    }
  });
  if ($('#tl') && (!hasG || reduce || w.innerWidth <= 1000)) $('#tl').style.overflowX = 'auto';


  /* ---------- testimonials ---------- */
  (function voices() {
    var v = $$('.voice'), i = 0, timer; if (!v.length) return;
    function show(n) { i = (n + v.length) % v.length; v.forEach(function (x, j) { x.classList.toggle('is-on', j === i); }); $('#vCount').textContent = (i + 1) + ' / ' + v.length; }
    function auto() { clearInterval(timer); if (!reduce) timer = setInterval(function () { show(i + 1); }, 8000); }
    $('#vNext').addEventListener('click', function () { show(i + 1); auto(); });
    $('#vPrev').addEventListener('click', function () { show(i - 1); auto(); });
    auto();
  })();

  /* ---------- form ---------- */
  (function form() {
    var f = $('#aform'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true;
      ['#f-name', '#f-co', '#f-phone', '#f-email'].forEach(function (s) {
        var el = $(s), v = el.value.trim();
        var bad = !v || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) || (el.type === 'tel' && v.replace(/\D/g, '').length < 10);
        el.classList.toggle('is-bad', bad); if (bad) ok = false;
      });
      $('#aerr').hidden = ok; if (!ok) return;
      // Connect to the CRM / form endpoint here. Payload: new FormData(f)
      $('#aok').hidden = false;
    });
  })();

  /* ---------- floating CTA ---------- */


  w.addEventListener('load', function () { if (hasG) ScrollTrigger.refresh(); });
})();

/* =========================================================
   FX layer (v6). Runs after main.js.
   Libraries: GSAP 3.13 (ScrollTrigger, SplitText, Flip, DrawSVG, CustomEase),
   Motion (motion.dev, the vanilla sibling of Framer Motion), Lenis.
   ========================================================= */
(function () {
  'use strict';
  var d = document, w = window, root = d.documentElement;
  var G = w.gsap, ST = w.ScrollTrigger, M = w.Motion;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var desk = function () { return w.matchMedia('(min-width:1001px)').matches; };
  if (!G || !ST) return;
  ['SplitText', 'Flip', 'DrawSVGPlugin', 'CustomEase'].forEach(function (p) { if (w[p]) G.registerPlugin(w[p]); });
  if (w.CustomEase) CustomEase.create('eim', 'M0,0 C0.2,0.7 0.1,1 1,1');
  var EASE = w.CustomEase ? 'eim' : 'expo.out';

  /* ---------------- odometer: digits roll into place ---------------- */
  function odometer(el) {
    if (el.__odo) return; el.__odo = true;
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    var walker = d.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [], n;
    while ((n = walker.nextNode())) { if (/\d/.test(n.textContent) && !(n.parentElement && n.parentElement.closest('small'))) nodes.push(n); }
    if (!nodes.length) return;
    var reels = [];
    nodes.forEach(function (tn) {
      var frag = d.createDocumentFragment();
      tn.textContent.split('').forEach(function (ch) {
        if (!/\d/.test(ch)) { frag.appendChild(d.createTextNode(ch)); return; }
        var od = d.createElement('span'); od.className = 'od'; od.setAttribute('aria-hidden', 'true');
        var r = d.createElement('span'); r.className = 'od__r';
        for (var k = 0; k < 20; k++) { var s = d.createElement('span'); s.textContent = k % 10; r.appendChild(s); }
        od.appendChild(r); frag.appendChild(od); reels.push({ r: r, v: +ch });
      });
      tn.parentNode.replaceChild(frag, tn);
    });
    var sr = d.createElement('span'); sr.className = 'sr'; sr.textContent = label; el.appendChild(sr);
    // Each reel is as wide as its final digit, so '12' keeps its natural spacing.
    // The box is clipped, so it has to fit the glyph's ink, not just its advance:
    // with negative letter-spacing the advance is narrower than the digit and the
    // sides get shaved. Measure both, clip to the wider, and take the difference
    // back out of the margin so the laid-out advance is exactly what it was.
    function widths() {
      reels.forEach(function (o) {
        var od = o.r.parentNode;
        var m = d.createElement('span');
        m.textContent = o.v;
        m.style.cssText = 'position:absolute;visibility:hidden;white-space:pre';
        od.parentNode.insertBefore(m, od);
        var adv = m.getBoundingClientRect().width;
        m.style.letterSpacing = 'normal';
        var ink = m.getBoundingClientRect().width;
        m.remove();
        var box = Math.max(adv, ink);
        od.style.width = box + 'px';
        od.style.marginRight = (adv - box) + 'px';
      });
    }
    widths(); if (d.fonts && d.fonts.ready) d.fonts.ready.then(widths);
    if (reduce) { reels.forEach(function (o) { o.r.style.transform = 'translateY(-' + (o.v * 5) + '%)'; }); return; }
    reels.forEach(function (o) { G.set(o.r, { yPercent: 0 }); });
    ST.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () {
      reels.forEach(function (o, i) { G.to(o.r, { yPercent: -(10 + o.v) * 5, duration: 1.9 + i * .12, ease: 'expo.out', delay: i * .05 }); });
    } });
  }
  // align the reels' bottom edge with the text baseline (inline-blocks with overflow sit on their bottom edge)
  function baseFix() {
    var probe = d.createElement('span'); probe.style.cssText = 'position:absolute;visibility:hidden;font-size:100px;line-height:1;display:inline-block;height:1em;font-family:inherit;font-weight:400';
    probe.innerHTML = '0<i style="display:inline-block;width:0;height:0;vertical-align:baseline"></i>';
    var host = $('.stat b') || d.body; host.appendChild(probe);
    var r = probe.querySelector('i').offsetTop / 100; probe.remove();
    if (r > .5 && r < 1) root.style.setProperty('--odb', (-(1 - r)).toFixed(3) + 'em');
  }
  baseFix(); if (d.fonts && d.fonts.ready) d.fonts.ready.then(baseFix);
  $$('.stat b, .svc__num, .spec dt').forEach(odometer);

  /* ---------------- intro: ΣIM strokes draw, curtain lifts on the slant ---------------- */
  var seen = false; try { seen = sessionStorage.getItem('eim-intro') === '1'; } catch (e) {}
  var introDone = Promise.resolve();
  var preloaderEl = $('#eim-intro-curtain') || $('.intro');
  if (!reduce && !seen && ($('#heroGlyph') || preloaderEl)) {
    var paths = $$('#heroGlyph path').map(function (p) { return p.getAttribute('d'); });
    var ov = preloaderEl;
    if (!ov) {
      ov = d.createElement('div'); ov.className = 'intro'; ov.setAttribute('aria-hidden', 'true');
      ov.innerHTML = '<svg class="intro__mark" viewBox="-1 -1 143 50">' + paths.map(function (p) { return '<path d="' + p + '"/>'; }).join('') + '</svg><div class="intro__wm"><i class="wm"></i></div>';
      d.body.appendChild(ov);
    } else {
      ov.style.display = 'grid';
      ov.setAttribute('aria-hidden', 'true');
      if (!ov.querySelector('.intro__mark path') && paths.length) {
        ov.innerHTML = '<svg class="intro__mark" viewBox="-1 -1 143 50">' + paths.map(function (p) { return '<path d="' + p + '"/>'; }).join('') + '</svg><div class="intro__wm"><i class="wm"></i></div>';
      }
    }
    root.classList.add('is-intro'); G.set('.hg', { opacity: 0 });
    var lenis = w.__lenis; if (lenis) lenis.stop();
    introDone = new Promise(function (res) {
      var ps = $$('path', ov), tl = G.timeline({ onComplete: function () { ov.remove(); root.classList.remove('is-intro'); try { sessionStorage.setItem('eim-intro', '1'); } catch (e) {} if (lenis) lenis.start(); } });
      if (w.DrawSVGPlugin) tl.from(ps, { drawSVG: '0%', duration: 1.1, ease: 'power2.inOut', stagger: .14 });
      else tl.from(ps, { opacity: 0, duration: .8, stagger: .14 });
      var cur = { p: 0 };
      tl.to(ps, { fill: '#FFFFFF', stroke: '#FFFFFF', duration: .45, ease: 'power1.out', stagger: .06 }, '-=.25')
        .to('.intro__wm', { opacity: 1, duration: .5 }, '<')
        .to(ps, { x: function (i) { return [-6, 0, 6][i]; }, duration: .45, ease: 'power2.in' }, '+=.25')
        .to(cur, { p: 1, duration: .95, ease: 'expo.inOut', onUpdate: function () {
          // the curtain's lower edge rises on the 27.5° slant
          var s = 22, r = 100 - cur.p * (100 + s), l = r + s;
          ov.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% ' + Math.max(0, r) + '%, 0% ' + Math.max(0, Math.min(100, l)) + '%)';
        } }, '-=.15')
        .call(res, null, '<+.2');
      ov.addEventListener('click', function () { tl.progress(1); });
    });
  } else {
    if (preloaderEl) preloaderEl.remove();
    root.classList.remove('is-intro');
  }

  /* ---------------- hero: glyph pieces arrive after the intro; headline characters rise ---------------- */
  introDone.then(function () {
    if (!$('.hg')) return;
    if (reduce) {
      G.set('.hg', { opacity: 1 });
      return;
    }
    G.fromTo('.hg', { x: function (i) { return [-40, 0, 40][i]; }, y: function (i) { return [0, -70, 0][i]; }, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.4, ease: EASE, stagger: .1, clearProps: 'transform,x,y' });
  });
  (function heroChars() {
    var h = $('.hero__h'); if (!h || reduce) return;
    $$('.ln', h).forEach(function (ln) {
      ln.classList.add('hl');
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var f = d.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(function (t) {
              if (!t) return;
              if (/^\s+$/.test(t)) { f.appendChild(d.createTextNode(t)); return; }
              var word = d.createElement('span'); word.style.display = 'inline-block'; word.style.whiteSpace = 'nowrap';
              t.split('').forEach(function (ch) { var s = d.createElement('span'); s.className = 'hc'; s.textContent = ch; word.appendChild(s); });
              f.appendChild(word);
            });
            c.parentNode.replaceChild(f, c);
          } else if (c.nodeType === 1) walk(c);
        });
      })(ln);
    });
    w.dispatchEvent(new Event('resize'));
    var chars = $$('.hc', h), sub = $('.hero__sub'), ctas = $$('.hero__ctas .btn');
    var tl = G.timeline({ paused: true })
      .fromTo(chars, { yPercent: 115 }, { yPercent: 0, duration: 1, ease: EASE, stagger: .012 })
      .fromTo('.hero__h mark', { '--mk': 0 }, { '--mk': 1, duration: .7, ease: EASE }, .25)
      .fromTo(sub, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: EASE }, '-=.7')
      .fromTo(ctas, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: EASE, stagger: .08 }, '-=.6');
    var on = false;
    ST.create({ trigger: '.hero', start: 'top top', end: function () { return '+=' + (w.innerHeight * 2); }, onUpdate: function (st) {
      if (!on && st.progress > .72) { on = true; tl.timeScale(1).play(0); }
      else if (on && st.progress < .64) { on = false; tl.timeScale(2.4).reverse(); }
    } });
  })();

  /* ---------------- slanted reveals for photographs ---------------- */
  function poly(p) {
    // a wipe whose leading edge runs at the 27.5° ΣIM angle
    var s = 30, top = 100 - p * (100 + s);
    var a = Math.max(0, top), b = Math.max(0, Math.min(100, top + s));
    return 'polygon(0% ' + b + '%, 100% ' + a + '%, 100% 100%, 0% 100%)';
  }
  if (!reduce) $$('.relief__img img, .ashwa__img img, .bcard--img img, .nitem figure img, .eco figure img, .mega__card img').forEach(function (img) {
    if (img.closest('.mega')) return;
    img.setAttribute('data-rv', '');
    var o = { p: 0 };
    img.style.clipPath = poly(0);
    G.set(img, { scale: 1.18 });
    ST.create({ trigger: img.parentElement, start: 'top 85%', once: true, onEnter: function () {
      G.to(o, { p: 1, duration: 1.4, ease: EASE, onUpdate: function () { img.style.clipPath = poly(o.p); }, onComplete: function () { img.style.clipPath = ''; img.removeAttribute('data-rv'); } });
      G.to(img, { scale: 1, duration: 1.8, ease: EASE });
    } });
  });

  /* ---------------- relief: problem → answer flip, scrubbed ---------------- */
  (function relief() {
    var cards = $$('.rc__in'); if (!cards.length) return;
    if (reduce) return;
    cards.forEach(function (c) { c.style.setProperty('--ry', '0deg'); });
    var tl = G.timeline({ scrollTrigger: { trigger: '.relief__cards', start: 'top 72%', end: function () { return desk() ? 'bottom 55%' : 'bottom 45%'; }, scrub: .7 } });
    cards.forEach(function (c, i) { tl.to(c, { '--ry': '180deg', duration: 1, ease: 'power2.inOut' }, i * .45); });
    cards.forEach(function (c) { c.parentElement.addEventListener('click', function () { var v = c.style.getPropertyValue('--ry'); G.to(c, { '--ry': parseFloat(v) > 90 ? '0deg' : '180deg', duration: .8, ease: EASE }); }); });
  })();

  /* ---------------- swap vs charge: bars grow with the scroll ---------------- */
  if (!reduce) $$('.svc__bar i').forEach(function (b) {
    G.fromTo(b, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: b, start: 'top 90%', end: 'top 55%', scrub: .6 } });
  });

  /* ---------------- ASHWA: slow push-in, hotspots arrive one by one ---------------- */
  if (!reduce && $('.ashwa__img')) {
    G.from('.hot', { scale: 0, opacity: 0, duration: .7, ease: 'back.out(2.2)', stagger: .15, scrollTrigger: { trigger: '.ashwa__img', start: 'top 65%', once: true } });
  }

  /* ---------------- industries: panels open on hover (Motion springs) ---------------- */
  (function industries() {
    var cards = $$('.cards .card'); if (!cards.length) return;
    var open = 0;
    function grow(el, v) {
      var from = parseFloat(getComputedStyle(el).flexGrow) || 1; el.style.flexGrow = v;
      if (M && M.animate && !reduce && from !== v) M.animate(el, { flexGrow: [from, v] }, { type: 'spring', stiffness: 160, damping: 22 });
    }
    function set(i) {
      open = i;
      cards.forEach(function (c, j) { c.classList.toggle('is-open', j === i); if (desk()) grow(c, j === i ? 2.4 : 1); else c.style.flexGrow = ''; });
    }
    cards.forEach(function (c, i) {
      c.addEventListener('mouseenter', function () { if (desk()) set(i); });
      c.addEventListener('focus', function () { set(i); });
    });
    set(0);
    w.addEventListener('resize', function () { set(open); });
    if (!reduce) G.from(cards, { y: 60, opacity: 0, duration: 1.1, ease: EASE, stagger: .1, scrollTrigger: { trigger: '.cards', start: 'top 80%', once: true } });
  })();

  /* ---------------- network: sliding status indicator (Flip-style), travelling pulse, zone name scramble ---------------- */
  (function network() {
    var bar = $('.net__filter'); if (!bar) return;
    var ind = d.createElement('i'); ind.className = 'nf__ind'; bar.insertBefore(ind, bar.firstChild); bar.classList.add('has-ind');
    function place(anim) {
      var b = $('.nf.is-on', bar); if (!b) return;
      var r = b.getBoundingClientRect(), p = bar.getBoundingClientRect();
      var to = { x: r.left - p.left, y: r.top - p.top, width: r.width };
      if (M && M.animate) M.animate(ind, to, anim && !reduce ? { type: 'spring', stiffness: 260, damping: 26 } : { duration: 0 });
      else G.set(ind, to);
    }
    $$('.nf', bar).forEach(function (b) { b.addEventListener('click', function () { requestAnimationFrame(function () { place(true); }); }); });
    place(false); w.addEventListener('resize', function () { place(false); });
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { place(false); });

    if (!reduce) ST.create({ trigger: '.zrows', start: 'top 82%', once: true, onEnter: function () {
      G.from('.zrow', { y: 28, opacity: 0, duration: .8, ease: EASE, stagger: .08 });
      G.from('.opens li, .plans > div', { y: 20, opacity: 0, duration: .7, ease: EASE, stagger: .08, delay: .2 });
    } });
  })();

  /* ---------------- timeline: progress, year roll, image parallax, velocity skew ---------------- */
  (function timeline() {
    var tw = w.EIM_tl, items = $$('.tl__item'); if (!items.length) return;
    var yr = $('#tlYear'), barB = $('#tlBar'), cur = '2024';
    function setYear(y) {
      if (y === cur || !yr) return; var dir = +y > +cur ? 1 : -1; cur = y;
      G.timeline().to(yr, { yPercent: -100 * dir, duration: .25, ease: 'power2.in' }).set(yr, { yPercent: 100 * dir, textContent: y }).to(yr, { yPercent: 0, duration: .45, ease: EASE });
    }
    if (tw && tw.scrollTrigger && !reduce) {
      var st = tw.scrollTrigger, skew = G.quickTo('.tl__track', 'skewX', { duration: .5, ease: 'power3' });
      ST.create({ trigger: st.trigger, start: function () { return st.start; }, end: function () { return st.end; }, onUpdate: function (s) {
        if (barB) barB.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')';
        var mid = w.innerWidth * .5, best = null, bd = 1e9;
        items.forEach(function (it) { var r = it.getBoundingClientRect(), c = r.left + r.width / 2, dd = Math.abs(c - mid); if (dd < bd) { bd = dd; best = it; } });
        if (best) { var t = $('time', best); if (t) setYear(t.textContent.trim().slice(-4)); }
        skew(Math.max(-5, Math.min(5, -s.getVelocity() / 400)));
      }, onLeave: function () { skew(0); }, onLeaveBack: function () { skew(0); } });
      $$('.tl__item figure img').forEach(function (img) {
        G.fromTo(img, { xPercent: -8, scale: 1.18 }, { xPercent: 8, scale: 1.18, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
      });
    }
  })();

  /* ---------------- testimonials: words rise on each change ---------------- */
  (function voices() {
    if (reduce || !w.SplitText) return;
    (d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve()).then(function () { $$('.voice').forEach(function (v) {
      var bq = $('blockquote', v); if (!bq) return;
      var sp = new SplitText(bq, { type: 'words', wordsClass: 'vw' });
      var run = function () { G.fromTo(sp.words, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .8, ease: EASE, stagger: .018, delay: .25 }); };
      new MutationObserver(function () { if (v.classList.contains('is-on')) run(); }).observe(v, { attributes: true, attributeFilter: ['class'] });
    }); });
  })();

  /* ---------------- logos: stagger in ---------------- */
  if (!reduce && $('.logos')) G.from('.logos li', { y: 40, opacity: 0, duration: 1, ease: EASE, stagger: .06, scrollTrigger: { trigger: '.logos', start: 'top 88%', once: true } });

  /* ---------------- assess: current running down the ΣIM rails ---------------- */
  (function lines() {
    var sec = $('#assess'); if (!sec || reduce) return;
    var cv = d.createElement('canvas'); cv.className = 'fxlines'; cv.setAttribute('aria-hidden', 'true'); sec.insertBefore(cv, sec.firstChild);
    var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(2, w.devicePixelRatio || 1), vis = false, last = 0;
    var TAN = Math.tan(27.5 * Math.PI / 180);   // the angle every cut on this page is made at
    var GAP = 96, JOG = 9, rails = 0, P = [];

    function xAt(rail, y) { return rail * GAP - H * TAN * 0.5 + (H - y) * TAN; }
    function rnd(a, b) { return a + Math.random() * (b - a); }

    function spawn(p, seeded) {
      p.rail = Math.floor(rnd(0, rails));
      p.len = rnd(70, 260);
      p.sp = rnd(70, 230);
      p.wt = Math.random() < .3 ? 2 : 1;
      p.y = seeded ? rnd(-p.len, H) : -p.len - rnd(0, 400);
      p.kink = Math.random() < .3 ? 1 : 0;
      p.dir = Math.random() < .5 ? 1 : -1;
      p.ky = 0;
      return p;
    }

    function size() {
      var r = sec.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rails = Math.ceil((W + H * TAN) / GAP) + 2;
      var n = Math.max(8, Math.min(18, Math.round(W / 110)));
      P = []; for (var i = 0; i < n; i++) P.push(spawn({}, true));
    }
    size(); w.addEventListener('resize', size);
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; if (vis) { last = 0; requestAnimationFrame(draw); } }).observe(sec);

    function draw(now) {
      if (!vis) return;
      var dt = last ? Math.min(.05, (now - last) / 1000) : 0; last = now;
      ctx.fillStyle = '#01262D'; ctx.fillRect(0, 0, W, H);
      ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';

      // the fixed rails: dead straight, on the mark's angle
      ctx.strokeStyle = '#0B4A75'; ctx.lineWidth = 1;
      ctx.beginPath();
      for (var i = 0; i < rails; i++) { ctx.moveTo(xAt(i, -2), -2); ctx.lineTo(xAt(i, H + 2), H + 2); }
      ctx.stroke();

      // current travelling down them, with the occasional step across
      ctx.strokeStyle = '#38E0CF';
      for (var k = 0; k < P.length; k++) {
        var p = P[k];
        p.y += p.sp * dt;
        if (p.y - p.len > H + 40) { spawn(p, false); continue; }
        var head = p.y, tail = p.y - p.len;
        if (p.kink && !p.ky) p.ky = tail + p.len * rnd(.3, .7);
        var r2 = p.kink ? Math.max(0, Math.min(rails - 1, p.rail + p.dir)) : p.rail;
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
        // a harder leading edge, so every stroke ends on a clean cut
        ctx.lineWidth = p.wt + 1;
        ctx.beginPath();
        ctx.moveTo(xAt(r2, head - 16), head - 16); ctx.lineTo(xAt(r2, head), head);
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    }
  })();

  /* ---------------- cost: set your fleet, watch the number ---------------- */
  (function cost() {
    var sec = $('#cost'); if (!sec) return;
    var sl = $('#fleetN'), outN = $('#fleetOut'), big = $('#fleetBig'), exact = $('#fleetExact'), grid = $('#fleetGrid');
    if (!sl || !big) return;

    var PER_MONTH = 100789, MAX = +sl.max;

    // Indian grouping: 3,02,36,700
    function inr(n) {
      var v = String(Math.round(n)), last = v.slice(-3), rest = v.slice(0, -3);
      return rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last : last;
    }
    function scaled(n) {
      if (n >= 1e7) return { v: (n / 1e7).toFixed(2), u: 'crore' };
      if (n >= 1e5) return { v: (n / 1e5).toFixed(2), u: 'lakh' };
      return { v: inr(n), u: '' };
    }

    if (grid) { var f = d.createDocumentFragment(); for (var i = 0; i < MAX; i++) f.appendChild(d.createElement('i')); grid.appendChild(f); }
    var marks = grid ? $$('i', grid) : [];

    var say = $('#fleetSay');
    function paint(n, year) {
      var s = scaled(year);
      big.innerHTML = '<i>₹</i>' + s.v + (s.u ? ' <span>' + s.u + '</span>' : '');
      if (say) say.textContent = 'more a year on diesel, across ' + n + (n === 1 ? ' truck.' : ' trucks.');
      exact.textContent = '₹' + inr(year);
      if (outN) outN.textContent = n;
      sl.style.setProperty('--p', ((n - 1) / (MAX - 1) * 100).toFixed(2) + '%');
      for (var i = 0; i < marks.length; i++) marks[i].classList.toggle('on', i < n);
    }

    var intro = null;
    function apply() { var n = +sl.value; paint(n, n * PER_MONTH * 12); }
    // a hand on the slider always wins over the intro count-up
    sl.addEventListener('input', function () { if (intro) { intro.kill(); intro = null; } apply(); });
    sl.addEventListener('pointerdown', function () { if (intro) { intro.kill(); intro = null; apply(); } });
    apply();

    if (reduce) return;

    // on the way in, the fleet fills and the figure runs up to the starting number
    ST.create({ trigger: '#rig', start: 'top 78%', once: true, onEnter: function () {
      var n = +sl.value, o = { p: 0 };
      marks.forEach(function (m) { m.classList.remove('on'); });
      intro = G.to(o, { p: 1, duration: 1.5, ease: 'power3.out', onUpdate: function () {
        var k = Math.round(o.p * n);
        paint(k || 1, k * PER_MONTH * 12);
      }, onComplete: function () { intro = null; apply(); } });
    } });

    G.from('#rig', { y: 36, opacity: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: '#rig', start: 'top 86%', once: true } });

    $$('.pf__n b', sec).forEach(odometer);
    // the heading and lede are already revealed by the page-wide rule in main.js;
    // only the three cards need their own stagger
    var cards = $$('.pf li', sec);
    if (cards.length) G.from(cards, { y: 30, opacity: 0, duration: 1, ease: EASE, stagger: .13,
      scrollTrigger: { trigger: '.pf', start: 'top 86%', once: true } });
  })();

  /* ---------------- footer: rEIMagined rises letter by letter ---------------- */
  (function footer() {
    var tag = $('.ftr__tag'); if (!tag || reduce) return;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var f = d.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return; if (/^\s+$/.test(t)) { f.appendChild(d.createTextNode(t)); return; }
            var wd = d.createElement('span'); wd.className = 'wd';
            t.split('').forEach(function (ch) { var s = d.createElement('span'); s.className = 'ch'; s.textContent = ch; wd.appendChild(s); });
            f.appendChild(wd);
          });
          c.parentNode.replaceChild(f, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(tag);
    G.from($$('.ch', tag), { yPercent: 110, duration: 1.1, ease: EASE, stagger: .02, scrollTrigger: { trigger: '.ftr', start: 'top 80%', once: true } });
    G.from('.ftr__cols > div, .ftr__offices > div', { y: 30, opacity: 0, duration: .9, ease: EASE, stagger: .05, scrollTrigger: { trigger: '.ftr__cols', start: 'top 90%', once: true } });
  })();

  w.addEventListener('load', function () { ST.refresh(); });
})();
