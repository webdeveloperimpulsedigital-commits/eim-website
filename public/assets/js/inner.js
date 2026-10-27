/* EIM inner pages · module behaviour
   Runs after main.js, which already handles the header, smooth scroll, the page-wide reveals
   (.h2 words, .lede, FAQ rows), odometers and the rails behind the form. Nothing here animates
   those elements again. Each module looks for its own markup and returns if the page lacks it.
   Without GSAP, or with reduced motion, every module stays in its complete static state. */
(function () {
  'use strict';
  var d = document, w = window, root = d.documentElement;
  var G = w.gsap, ST = w.ScrollTrigger, M = w.Motion;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var anim = !!(G && ST) && !reduce;
  var fine = w.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var EASE = w.CustomEase ? 'eim' : 'expo.out';

  // a wipe whose leading edge runs at the 27.5° ΣIM angle (same as the homepage's photographs)
  function poly(p) {
    var s = 30, top = 100 - p * (100 + s);
    var a = Math.max(0, top), b = Math.max(0, Math.min(100, top + s));
    return 'polygon(0% ' + b + '%, 100% ' + a + '%, 100% 100%, 0% 100%)';
  }
  // photograph arriving in view: slanted wipe, settling from 1.18
  function reveal(img, trigger) {
    if (!anim || !img) return;
    var o = { p: 0 };
    img.style.clipPath = poly(0); G.set(img, { scale: 1.18 });
    ST.create({ trigger: trigger || img.parentElement, start: 'top 85%', once: true, onEnter: function () {
      G.to(o, { p: 1, duration: 1.4, ease: EASE, onUpdate: function () { img.style.clipPath = poly(o.p); }, onComplete: function () { img.style.clipPath = ''; } });
      G.to(img, { scale: 1, duration: 1.8, ease: EASE });
    } });
  }
  // swap one stacked picture for the next with the slanted wipe; the previous one stays under it until covered
  function swapIn(list, next, done, keepScale) {
    list.forEach(function (x) { x.style.zIndex = x === next ? 2 : (x.classList.contains('is-on') ? 1 : 0); });
    next.classList.add('is-on');
    var finish = function () { list.forEach(function (x) { if (x !== next) x.classList.remove('is-on'); }); next.style.clipPath = ''; };
    if (!anim) { finish(); return null; }
    var o = { p: 0 }; next.style.clipPath = poly(0);
    if (!keepScale) G.fromTo(next, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: EASE });
    return G.to(o, { p: 1, duration: 1.05, ease: 'expo.inOut', onUpdate: function () { next.style.clipPath = poly(o.p); }, onComplete: function () { finish(); if (done) done(); } });
  }
  // a value that changes rolls up out of its slot and the new one rolls in under it
  function roll(box, text) {
    if (!box) return;
    var spans = $$('span', box), last = spans[spans.length - 1];
    if (last && last.textContent === text) return;
    if (!anim) { box.innerHTML = ''; var s0 = d.createElement('span'); s0.textContent = text; box.appendChild(s0); return; }
    spans.slice(0, -1).forEach(function (s) { G.killTweensOf(s); s.remove(); });
    if (last) { G.killTweensOf(last); G.set(last, { yPercent: 0 }); }
    var nx = d.createElement('span'); nx.textContent = text; box.appendChild(nx);
    G.fromTo(last ? [last, nx] : [nx], { yPercent: 0 }, { yPercent: -100, duration: .55, ease: EASE, onComplete: function () { if (last) last.remove(); G.set(nx, { yPercent: 0 }); } });
  }

  /* ---------------- hero: lines rise, the mark sweeps in, the picture wipes on the slant ---------------- */
  (function hero() {
    var h = $('.ihero__h');
    if (!h || !anim) { root.classList.remove('is-pre'); return; }
    var lines = $$('.ln', h).map(function (ln) {
      var r = d.createElement('span'); r.className = 'lr';
      while (ln.firstChild) r.appendChild(ln.firstChild);
      ln.appendChild(r); ln.classList.add('is-split'); return r;
    });
    var img = $('.ihero__fig img, .ihero__fig video') || $('.phero__media'), o = { p: 0 };
    var tl = G.timeline({ delay: .1 })
      .from('.crumb', { y: 14, opacity: 0, duration: .7, ease: EASE }, 0)
      .fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 1.1, ease: EASE, stagger: .12 }, .05)
      .fromTo('.ihero__h mark', { '--mk': 0 }, { '--mk': 1, duration: .7, ease: EASE }, .6)
      .from('.ihero__sub', { y: 18, opacity: 0, duration: .8, ease: EASE }, .45)
      ;
    if ($('.ihero__ctas .btn')) tl.from('.ihero__ctas .btn', { y: 18, opacity: 0, duration: .7, ease: EASE, stagger: .08 }, .55);
    if ($('.ptag')) tl.from('.ptag', { y: 16, opacity: 0, duration: .7, ease: EASE, stagger: .14 }, 1.15);
    if (img && img.tagName === 'VIDEO') tl.call(function () { try { img.currentTime = 0; } catch (e) {} var pr = img.play(); if (pr && pr.catch) pr.catch(function () {}); }, null, .35);
    if (img) {
      img.style.clipPath = poly(0); G.set(img, { scale: 1.18 });
      tl.to(o, { p: 1, duration: 1.4, ease: 'expo.inOut', onUpdate: function () { img.style.clipPath = poly(o.p); }, onComplete: function () { img.style.clipPath = ''; } }, .1)
        .to(img, { scale: 1, duration: 1.8, ease: EASE }, .1);
    }
    root.classList.remove('is-pre');
    if ($('.terms')) G.from('.term', { y: 32, opacity: 0, duration: 1, ease: EASE, stagger: .1, scrollTrigger: { trigger: '.terms', start: 'top 94%', once: true } });
  })();

  /* ---------------- manifesto: the paragraph lights up word by word as it is read ---------------- */
  (function manifesto() {
    var t = $('.mani__t'); if (!t || !anim) return;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var f = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (s) {
            if (!s) return;
            if (/^\s+$/.test(s)) { f.appendChild(d.createTextNode(s)); return; }
            var o = d.createElement('span'); o.className = 'mw'; o.textContent = s; f.appendChild(o);
          });
          n.parentNode.replaceChild(f, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(t);
    G.fromTo($$('.mw', t), { opacity: .22 }, { opacity: 1, ease: 'none', stagger: .1, scrollTrigger: { trigger: t, start: 'top 80%', end: 'bottom 50%', scrub: .6 } });
    G.from('.mani__lbl', { y: 20, opacity: 0, duration: .9, ease: EASE, scrollTrigger: { trigger: '.mani__lbl', start: 'top 90%', once: true } });
  })();

  /* ---------------- story: the picture and the pack panel follow whichever chapter is being read ---------------- */
  (function story() {
    var sec = $('.story'); if (!sec) return;
    var chaps = $$('.chap', sec), media = $$('.story__media', sec), frame = $('.story__frame', sec);
    var segs = $$('.pack__meter i', sec), when = $('.pack__when', sec), pay = $('.pack__pay', sec), state = $('.pack__state', sec);
    var bars = $$('.story__prog i', sec);
    var cur = 0, hv = { v: +chaps[0].getAttribute('data-health') }, gt = null, mt = null;

    function meter(n) { segs.forEach(function (s, k) { s.classList.toggle('on', k < n); }); }
    // the gauge steps segment by segment, like an instrument, never fades
    function gauge(to, dur) { return G.to(hv, { v: to, duration: dur, ease: 'power2.inOut', onUpdate: function () { meter(Math.round(hv.v)); } }); }
    function play(v) { if (!v || reduce) return; if (v.preload === 'none') v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }

    function show(i) {
      if (i === cur) return; cur = i;
      var c = chaps[i];
      chaps.forEach(function (x, k) { x.classList.toggle('is-on', k === i); });
      roll(when, c.getAttribute('data-when'));
      roll(pay, c.getAttribute('data-pay'));

      var m = media[i];
      media.forEach(function (x) { if (x.tagName === 'VIDEO' && x !== m) x.pause(); });
      if (mt) mt.progress(1);
      if (m && !m.classList.contains('is-on')) mt = swapIn(media, m);
      var vid = m && m.tagName === 'VIDEO';
      frame.classList.toggle('is-video', vid);
      if (vid) play(m);

      // the last chapter: the pack wears down, then a new one fills the gauge
      if (gt) gt.kill();
      var to = +c.getAttribute('data-health');
      if (!anim) { meter(to); state.textContent = c.getAttribute('data-state'); return; }
      if (i === chaps.length - 1) {
        state.textContent = 'Worn';
        gt = G.timeline().add(gauge(10, .7)).add(function () { state.textContent = c.getAttribute('data-state'); }, '+=.15').add(gauge(to, 1));
      } else {
        state.textContent = c.getAttribute('data-state');
        gt = gauge(to, .6);
      }
    }

    if (!G || !ST) return;
    ST.matchMedia({
      '(min-width: 1001px)': function () {
        sec.classList.add('is-live');
        chaps[0].classList.add('is-on');
        chaps.forEach(function (c, i) {
          ST.create({ trigger: c, start: 'top 58%', end: 'bottom 58%',
            onToggle: function (s) { if (s.isActive) show(i); },
            onUpdate: function (s) { if (bars[i]) bars[i].style.setProperty('--p', s.progress.toFixed(3)); } });
        });
        return function () { sec.classList.remove('is-live'); media.forEach(function (x) { if (x.tagName === 'VIDEO') x.pause(); }); };
      }
    });
    if (anim) $$('.chap__fig img', sec).forEach(function (img) { if (!w.matchMedia('(min-width:1001px)').matches) reveal(img); });
  })();

  /* ---------------- versus: one switch flips every row; on the way in it starts from the usual way ---------------- */
  (function versus() {
    var panel = $('.vs__panel'); if (!panel) return;
    var sw = $('.vs__sw', panel), opts = $$('.vs__opt', panel), rows = $$('.vrow', panel), touched = false;
    var LABEL = { a: 'Bought with its battery', b: 'On Maitryi' };
    var ind = d.createElement('i'); ind.className = 'vs__ind'; ind.setAttribute('aria-hidden', 'true');
    sw.insertBefore(ind, sw.firstChild); sw.classList.add('has-ind');

    function place(spring) {
      var b = $('.vs__opt.is-on', sw); if (!b) return;
      var r = b.getBoundingClientRect(), p = sw.getBoundingClientRect();
      var to = { x: r.left - p.left, y: r.top - p.top, width: r.width, height: r.height };
      if (M && M.animate) M.animate(ind, to, spring && !reduce ? { type: 'spring', stiffness: 260, damping: 26 } : { duration: 0 });
      else { ind.style.transform = 'translate(' + to.x + 'px,' + to.y + 'px)'; ind.style.width = to.width + 'px'; ind.style.height = to.height + 'px'; }
    }
    function set(k, spring) {
      var other = k === 'a' ? 'b' : 'a';
      panel.setAttribute('data-state', k);
      opts.forEach(function (o) { var on = o.getAttribute('data-k') === k; o.classList.toggle('is-on', on); o.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      rows.forEach(function (r) {
        roll($('.vrow__val', r), r.getAttribute('data-' + k));
        $('.vrow__alt em', r).textContent = LABEL[other];
        $('.vrow__alt span', r).textContent = r.getAttribute('data-' + other);
      });
      place(spring);
    }
    opts.forEach(function (o) { o.addEventListener('click', function () { touched = true; set(o.getAttribute('data-k'), true); }); });
    w.addEventListener('resize', function () { place(false); });
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { place(false); });
    place(false);

    if (!anim) return;
    set('a', false);
    ST.create({ trigger: panel, start: 'top 62%', once: true, onEnter: function () { setTimeout(function () { if (!touched) set('b', true); }, 900); } });
    G.from(panel, { y: 40, opacity: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: panel, start: 'top 88%', once: true } });
  })();

  /* ---------------- bento: tiles stagger up, the big photograph wipes in ---------------- */
  (function bento() {
    var grid = $('.bento'); if (!grid || !anim) return;
    G.from($$('.tile', grid), { y: 60, opacity: 0, duration: 1.1, ease: EASE, stagger: .1, scrollTrigger: { trigger: grid, start: 'top 80%', once: true } });
    reveal($('.tile--photo img', grid), grid);
  })();

  /* ---------------- quotes ---------------- */
  if (anim) $$('.quote').forEach(function (q, i) { G.from(q, { y: 32, opacity: 0, duration: 1, ease: EASE, delay: (i % 2) * .12, scrollTrigger: { trigger: q, start: 'top 88%', once: true } }); });

  /* ---------------- index: hovering a row puts its picture in the frame ---------------- */
  (function index() {
    var peek = $('.idx__peek'), rows = $$('.idx__row'); if (!peek || !rows.length) return;
    var imgs = $$('img', peek), cur = 0, tw = null;
    if (anim) G.from(rows, { y: 28, opacity: 0, duration: .9, ease: EASE, stagger: .08, scrollTrigger: { trigger: '.idx__list', start: 'top 88%', once: true } });
    if (!fine) return;
    rows[0].classList.add('is-on');
    function show(i) {
      if (i === cur) return; cur = i;
      rows.forEach(function (r, k) { r.classList.toggle('is-on', k === i); });
      if (tw) tw.progress(1);
      tw = swapIn(imgs, imgs[i]);
    }
    rows.forEach(function (r, i) {
      r.addEventListener('mouseenter', function () { show(i); });
      r.addEventListener('focus', function () { show(i); });
    });
    reveal(imgs[0], peek);
  })();

  /* ---------------- explorer: a tab brings its part of the truck to the centre of the frame ---------------- */
  (function explore() {
    var sec = $('.xp'); if (!sec) return;
    var tabs = $$('.xp__tab', sec), panels = $$('.xp__panel', sec), imgs = $$('.xp__img', sec);
    var side = $('.xp__img[data-img="side"]', sec), cur = 0, tw = null;
    function zoomOf(t) { var z = t.getAttribute('data-zoom'); return z ? z.split(',').map(Number) : null; }
    // focus point to the centre of the frame, never showing past the photograph's edges
    function zoomTo(z, dur) {
      var s = z ? z[2] : 1, fx = z ? z[0] : .5, fy = z ? z[1] : .5;
      var tx = Math.min(0, Math.max(1 - s, .5 - fx * s)), ty = Math.min(0, Math.max(1 - s, .5 - fy * s));
      var to = { xPercent: tx * 100, yPercent: ty * 100, scale: s, transformOrigin: '0 0' };
      if (!G) { side.style.transform = 'translate(' + tx * 100 + '%,' + ty * 100 + '%) scale(' + s + ')'; return; }
      if (!anim || !dur) G.set(side, to); else G.to(side, Object.assign({ duration: dur, ease: 'expo.inOut', overwrite: true }, to));
    }
    function show(i) {
      if (i === cur) return; cur = i;
      tabs.forEach(function (t, k) { var on = k === i; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; });
      panels.forEach(function (p, k) { p.classList.toggle('is-on', k === i); });
      var key = tabs[i].getAttribute('data-img'), next = $('.xp__img[data-img="' + key + '"]', sec);
      if (key === 'side') zoomTo(zoomOf(tabs[i]), 1.3);
      if (!next.classList.contains('is-on')) { if (tw) tw.progress(1); tw = swapIn(imgs, next, null, key === 'side'); }
      if (!anim) return;
      G.fromTo($$('.xp__h, .xp__pts li, .xp__bars, .xp__more', panels[i]), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: EASE, stagger: .05, overwrite: true });
      $$('.xp__bar', panels[i]).forEach(function (b) { var v = parseFloat(b.style.getPropertyValue('--w')) || 1; G.fromTo(b, { '--w': 0 }, { '--w': v, duration: 1.1, ease: EASE, delay: .2 }); });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!k) return; e.preventDefault(); var n = (i + k + tabs.length) % tabs.length; show(n); tabs[n].focus();
      });
    });
    // the whole truck first; on the way in the frame moves onto the first part
    if (!anim) { zoomTo(zoomOf(tabs[0]), 0); return; }
    ST.create({ trigger: sec, start: 'top 55%', once: true, onEnter: function () { if (cur === 0) zoomTo(zoomOf(tabs[0]), 1.6); } });
  })();

  /* ---------------- spec sheet: the dimension lines draw out from their centres ---------------- */
  (function specs() {
    var dims = $('.dims'); if (!dims || !anim) return;
    reveal($('.dims__img img'), dims);
    var tl = G.timeline({ scrollTrigger: { trigger: dims, start: 'top 70%', once: true }, delay: .6 });
    tl.from('.dims__w i', { scaleX: 0, duration: 1, ease: EASE })
      .from('.dims__h i', { scaleY: 0, duration: 1, ease: EASE }, .15)
      .from('.dims b', { opacity: 0, y: 8, duration: .6, ease: EASE, stagger: .1 }, .6);
    G.from('.sheet__g', { y: 32, opacity: 0, duration: 1, ease: EASE, stagger: .08, scrollTrigger: { trigger: '.sheet', start: 'top 85%', once: true } });
  })();

  /* ---------------- lists marked data-stagger: items rise in order ---------------- */
  if (anim) $$('[data-stagger]').forEach(function (c) {
    G.from(c.children, { y: 40, opacity: 0, duration: 1, ease: EASE, stagger: .1, scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
  });
  if (anim && $('.made__img img')) reveal($('.made__img img'));
  if (anim && $('.duel__bar')) G.from('.duel__bar', { scaleX: 0, duration: 1.4, ease: EASE, stagger: .15, scrollTrigger: { trigger: '.duel__t', start: 'top 70%', once: true } });
  if (anim) $$('.way__img img').forEach(function (im) { reveal(im); });

  /* ---------------- industries hero: three strokes; focus moves between them, the headline and proof follow ---------------- */
  (function strokes() {
    var hero = $('.vh'); if (!hero) return;
    var items = $$('.stk', hero), caps = $$('.vcap', hero), words = $$('.vh__w', hero), mk = $('.vh__mk', hero), h1 = $('.vh__h', hero);
    var lab = $('.vh__lab', hero), num = $('.vh__n', hero), txt = $('.vh__p', hero), imgs = $$('.stk__clip img', hero);
    var TAN = Math.tan(27.5 * Math.PI / 180), cur = 0, held = false, inView = true, timer = null, started = false;
    var desk = function () { return w.matchMedia('(min-width:1001px)').matches; };

    // the outline and the travelling segment sit exactly on each stroke's slanted edges
    function geom() {
      items.forEach(function (it) {
        var W = it.offsetWidth, H = it.offsetHeight, S = H * TAN, svg = $('.stk__line', it), pg = $('polygon', svg), ln = $('line', svg);
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        pg.setAttribute('points', S + ',0 ' + W + ',0 ' + (W - S) + ',' + H + ' 0,' + H); pg.setAttribute('pathLength', 100);
        ln.setAttribute('x1', 0); ln.setAttribute('y1', H); ln.setAttribute('x2', S); ln.setAttribute('y2', 0); ln.setAttribute('pathLength', 100);
      });
      placeMark(false);
    }
    // the teal bar sits behind the focused word, slanted like every highlight on the site
    function placeMark(animate) {
      var wd = words[cur]; if (!wd || !mk || !started) return;
      var r = wd.getBoundingClientRect(), p = h1.getBoundingClientRect(), px = r.height * .16;
      var to = { x: r.left - p.left - px, y: r.top - p.top + r.height * .1, width: r.width + px * 2, height: r.height * .86 };
      if (G && animate && !reduce) G.to(mk, Object.assign({ duration: .9, ease: 'expo.inOut', overwrite: 'auto' }, to));
      else if (G) G.set(mk, to);
    }
    function swapText(el, text) {
      var sp = $('span', el); if (!sp || sp.textContent === text) return;
      if (!anim) { sp.textContent = text; return; }
      G.to(sp, { y: -12, opacity: 0, duration: .25, ease: 'power2.in', onComplete: function () { sp.textContent = text; G.fromTo(sp, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .55, ease: EASE }); } });
    }
    function show(i) {
      if (i === cur && hero.classList.contains('has-focus')) return; cur = i;
      hero.classList.add('has-focus'); hero.setAttribute('data-focus', i);
      items.forEach(function (x, k) { x.classList.toggle('is-on', k === i); });
      caps.forEach(function (x, k) { x.classList.toggle('is-on', k === i); });
      words.forEach(function (x, k) { x.classList.toggle('is-on', k === i); });
      placeMark(true);
      var c = caps[i];
      // numbers roll like an odometer; words swap
      var n = c.getAttribute('data-n');
      roll(lab, c.getAttribute('data-lab')); (/^[\d,.<~₹%]+$/.test(n) ? roll : swapText)(num, n); swapText(txt, c.getAttribute('data-proof'));
    }
    function cycle() {
      clearInterval(timer); if (reduce || !desk()) return;
      timer = setInterval(function () { if (!held && inView) show((cur + 1) % items.length); }, 4800);
    }

    hero.classList.add('is-live');
    items.forEach(function (it, i) {
      it.addEventListener('mouseenter', function () { if (desk()) { held = true; show(i); } });
      it.addEventListener('focus', function () { held = true; show(i); });
      it.addEventListener('blur', function () { held = false; });
    });
    $('.vh__strokes', hero).addEventListener('mouseleave', function () { held = false; });
    new IntersectionObserver(function (e) { inView = e[0].isIntersecting; }).observe(hero);
    // phones: the strokes scroll sideways; whichever is most in view takes the focus
    var row = $('.vh__strokes', hero);
    var io = new IntersectionObserver(function (ents) {
      if (desk()) return;
      ents.forEach(function (en) { if (en.isIntersecting && en.intersectionRatio > .6) show(+en.target.getAttribute('data-i')); });
    }, { root: row, threshold: [.6] });
    items.forEach(function (it) { io.observe(it); });

    function begin() { started = true; hero.classList.add('has-mark'); geom(); show(0); cycle(); }
    w.addEventListener('resize', geom);
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(geom);
    geom();
    if (!G || !ST) { begin(); return; }
    G.set(mk, { skewX: -27.5 });
    if (!anim) { begin(); return; }

    // entrance: rails, then the outlines draw, then each photograph fills its stroke on the slant
    var lrs = $$('.vh__ln', hero).map(function (ln) { var r = d.createElement('span'); r.className = 'lr'; while (ln.firstChild) r.appendChild(ln.firstChild); ln.appendChild(r); ln.classList.add('is-split'); return r; });
    words = $$('.vh__w', hero);
    // the captions' own opacity transition would turn this into a visible fade-out, so it is off until they arrive
    G.set(caps.concat($$('.vh__read', hero)), { opacity: 0, y: 16, transition: 'none' });
    var tl = G.timeline({ delay: .1 });
    tl.from('.vh__rails', { opacity: 0, duration: 1.4, ease: 'power1.out' }, 0);
    if (w.DrawSVGPlugin) tl.from($$('.stk__line polygon', hero), { drawSVG: '0%', duration: 1.3, ease: 'power2.inOut', stagger: .14 }, .15);
    imgs.forEach(function (im, k) {
      var o = { p: 0 }; im.style.clipPath = poly(0);
      tl.to(o, { p: 1, duration: 1.3, ease: 'expo.inOut', onUpdate: function () { im.style.clipPath = poly(o.p); }, onComplete: function () { im.style.clipPath = ''; } }, .75 + k * .16)
        .fromTo(im, { scale: 1.28 }, { scale: 1.06, duration: 2, ease: EASE, clearProps: 'transform' }, .75 + k * .16);
    });
    tl.from('.vh .crumb', { y: 14, opacity: 0, duration: .7, ease: EASE }, .35)
      .fromTo(lrs, { yPercent: 112 }, { yPercent: 0, duration: 1.1, ease: EASE, stagger: .1 }, .45)
      .from('.vh__sub, .vh__ctas .btn', { y: 18, opacity: 0, duration: .8, ease: EASE, stagger: .08 }, .9)
      .to(caps, { y: 0, opacity: 1, duration: .8, ease: EASE, stagger: .1, clearProps: 'opacity,transform,transition' }, 1.35)
      .to('.vh__read', { y: 0, opacity: 1, duration: .8, ease: EASE, clearProps: 'opacity,transform,transition' }, 1.45)
      .call(function () { begin(); G.fromTo(mk, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: .7, ease: EASE }); }, null, 1.55);
    root.classList.remove('is-pre');

    // leaving: the strokes slide away along their own angle, each a little further than the last
    ST.matchMedia({ '(min-width: 1001px)': function () {
      items.forEach(function (it, k) {
        var dist = [90, 170, 250][k] || 250;
        G.to(it, { x: dist * Math.sin(.48), y: -dist * Math.cos(.48), ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 } });
      });
    } });
  })();

  /* ---------------- terminal plan: trucks circle the route; the zone being read lights up ---------------- */
  (function terminal() {
    var sec = $('.tm'); if (!sec) return;
    var zones = $$('.tm-zone', sec), tags = $$('.tm-tag', sec), items = $$('.tmz', sec), route = $('#tmRoute', sec), trucks = $$('.tm-truck', sec);
    function zone(i) {
      zones.forEach(function (z, k) { z.classList.toggle('is-on', k === i); });
      tags.forEach(function (t, k) { t.classList.toggle('is-on', k === i); });
      items.forEach(function (t, k) { t.classList.toggle('is-on', k === i); });
    }
    // trucks: evenly spaced along the loop; they slow down through the swap station
    var L = route.getTotalLength(), pos = trucks.map(function (t, i) { return L * i / trucks.length; }), vis = false, last = 0;
    function inStation(pt) { return pt.x > 850 && pt.x < 1080 && Math.abs(pt.y - 365) < 4; }
    function place() {
      trucks.forEach(function (t, i) {
        var a = route.getPointAtLength(pos[i] % L), b = route.getPointAtLength((pos[i] + 2) % L);
        var ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
        t.setAttribute('transform', 'translate(' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ')');
      });
    }
    function tick(now) {
      if (!vis) return;
      var dt = last ? Math.min(.05, (now - last) / 1000) : 0; last = now;
      trucks.forEach(function (t, i) { var pt = route.getPointAtLength(pos[i] % L); pos[i] += (inStation(pt) ? 22 : 95) * dt; });
      place(); requestAnimationFrame(tick);
    }
    place();
    if (!reduce) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; if (vis) { last = 0; requestAnimationFrame(tick); } }).observe(sec);
    if (!G || !ST) return;
    ST.matchMedia({
      '(min-width: 1001px)': function () {
        sec.classList.add('is-live'); zone(0);
        items.forEach(function (it, i) { ST.create({ trigger: it, start: 'top 58%', end: 'bottom 58%', onToggle: function (st) { if (st.isActive) zone(i); } }); });
        return function () { sec.classList.remove('is-live'); zone(-1); };
      }
    });
  })();

  /* ---------------- four steps: the rail fills as the steps arrive ---------------- */
  if (anim && $('.goel__list')) {
    G.fromTo('.goel__rail i', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.goel__list', start: 'top 80%', end: 'bottom 70%', scrub: .6 } });
    G.from('.goel__s', { y: 40, opacity: 0, duration: 1, ease: EASE, stagger: .14, scrollTrigger: { trigger: '.goel__list', start: 'top 80%', once: true } });
  }
  if (anim && $('.pproof__img img')) reveal($('.pproof__img img'));

  /* ---------------- newsroom reader: a release opens in a panel; linkable as #release-<id> ---------------- */
  (function reader() {
    var readers = $$('.reader'); if (!readers.length) return;
    var open = null, opener = null;
    function show(id, from) {
      var r = $('#release-' + id); if (!r) return false;
      if (open && open !== r) hide(true);
      opener = from || opener; open = r;
      r.hidden = false; root.classList.add('has-reader');
      if (w.__lenis) w.__lenis.stop();
      $('.reader__panel', r).scrollTop = 0;
      requestAnimationFrame(function () { requestAnimationFrame(function () { r.classList.add('is-open'); }); });
      $('.reader__x', r).focus({ preventScroll: true });
      if (location.hash !== '#release-' + id) history.replaceState(null, '', '#release-' + id);
      return true;
    }
    function hide(swap) {
      if (!open) return;
      var r = open; open = null; r.classList.remove('is-open');
      var done = function () { r.hidden = true; };
      if (swap || reduce) done(); else setTimeout(done, 700);
      if (swap) return;
      root.classList.remove('has-reader');
      if (w.__lenis) w.__lenis.start();
      history.replaceState(null, '', location.pathname + location.search);
      if (opener) opener.focus({ preventScroll: true });
    }
    // every link carrying data-release opens its reader instead of the PDF
    d.addEventListener('click', function (e) {
      var a = e.target.closest('[data-release]');
      if (a) { if (show(a.getAttribute('data-release'), open ? opener : a)) { e.preventDefault(); e.stopPropagation(); } return; }
      if (open && e.target.closest('[data-close]')) hide();
    }, true);
    d.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') { hide(); return; }
      if (e.key !== 'Tab') return;
      // keep focus inside the open reader
      var f = $$('a[href], button', open).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && d.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
    // a release link in the address bar opens it, on load or when the link changes
    function fromHash() {
      var m = location.hash.match(/^#release-([\w-]+)$/);
      if (m) show(m[1]); else if (open) hide();
    }
    w.addEventListener('hashchange', fromHash);
    if (location.hash) setTimeout(fromHash, 300);
  })();

  /* ---------------- events ledger: the year holds and rolls over as its events pass ---------------- */
  (function ledger() {
    var years = $$('.ledger__years li'), evts = $$('.evt'); if (!years.length || !evts.length) return;
    function on(y) { years.forEach(function (li) { li.classList.toggle('is-on', li.getAttribute('data-year') === y); }); }
    if (G && ST) evts.forEach(function (ev) {
      ST.create({ trigger: ev, start: 'top 60%', end: 'bottom 60%', onToggle: function (st) { if (st.isActive) on(ev.getAttribute('data-year')); } });
    });
    if (!anim) return;
    evts.forEach(function (ev) {
      G.from(ev.children, { y: 36, opacity: 0, duration: 1, ease: EASE, stagger: .1, scrollTrigger: { trigger: ev, start: 'top 85%', once: true } });
      reveal($('.evt__img img', ev));
    });
  })();

  /* ---------------- release list ---------------- */
  if (anim) $$('.rel').forEach(function (r) {
    G.from(r, { y: 36, opacity: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: r, start: 'top 90%', once: true } });
  });

  /* ---------------- about hero: three numbers on a grid of 100 marks, then the lit marks open onto the footage ----------------
     Pinned on desktop only. Phones, reduced motion and no-JS get the stacked static version from the markup. */
  (function whyHero() {
    var sec = $('.abx'); if (!sec || !G || !ST || reduce) return;
    var stage = $('.abx__stage', sec), cv = $('.abx__cv', sec), vid = $('.abx__vid', sec);
    var beats = $$('.abx__beat', sec), prog = $$('.abx__prog i', sec);
    var ctx = cv.getContext('2d'), TAN = Math.tan(27.5 * Math.PI / 180), COLS = 10, ROWS = 10, N = COLS * ROWS;
    var TARGET = [3, 15, 35], st = { lit: 0, intro: 0 }, open = 0, beat = -1, W = 0, H = 0, dpr = 1, R = null, vis = true, raf = 0;
    var poster = new Image(); poster.src = vid.getAttribute('poster');
    var lerp = function (a, b, t) { return a + (b - a) * t; };
    var map = function (v, a, b) { return Math.min(1, Math.max(0, (v - a) / (b - a))); };
    var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

    function layout() {
      W = cv.clientWidth; H = cv.clientHeight; if (!W) return;
      dpr = Math.min(2, w.devicePixelRatio || 1); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      var gut = Math.max(16, Math.min(56, W * .04)), left = Math.max(gut, (W - 1440) / 2 + gut);
      var x0 = left + Math.min(560, W * .4) + W * .05, x1 = W - gut - W * .02;
      var top = 88 + H * .1, bottom = H - H * .14, side = Math.min(x1 - x0, (bottom - top) * 1.25);
      R = { x: x1 - side, y: top + ((bottom - top) - side / 1.25) / 2, w: side, h: side / 1.25 };
    }
    function cell(i, r, g, sf) {
      // filled row by row from the bottom: the share rises like a gauge
      var c = i % COLS, row = ROWS - 1 - Math.floor(i / COLS);
      var cw = (r.w - g * (COLS - 1)) / COLS, ch = (r.h - g * (ROWS - 1)) / ROWS, s = Math.min(ch * TAN, cw * .6) * sf;
      var x = r.x + c * (cw + g), y = r.y + row * (ch + g);
      ctx.moveTo(x + s, y); ctx.lineTo(x + cw, y); ctx.lineTo(x + cw - s, y + ch); ctx.lineTo(x, y + ch); ctx.closePath();
    }
    function source() { return vid.readyState >= 2 ? vid : (poster.complete && poster.naturalWidth ? poster : null); }
    function cover(src) {
      var iw = src.videoWidth || src.naturalWidth, ih = src.videoHeight || src.naturalHeight, k = Math.max(W / iw, H / ih);
      ctx.drawImage(src, (W - iw * k) / 2 + W * .08, (H - ih * k) / 2, iw * k, ih * k);
    }
    function draw() {
      if (!R) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#01262D'; ctx.fillRect(0, 0, W, H);
      var e = ease(map(open, .25, 1));
      var r = { x: lerp(R.x, 0, e), y: lerp(R.y, 0, e), w: lerp(R.w, W, e), h: lerp(R.h, H, e) };
      var g = lerp(Math.max(4, R.w * .012), 0, e), sf = 1 - e;
      var tA = 1 - map(open, 0, .22), u = map(open, .12, .55), src = open > 0 ? source() : null;
      if (src) {
        ctx.save(); ctx.beginPath(); for (var i = 0; i < N; i++) cell(i, r, g, sf); ctx.clip(); cover(src); ctx.restore();
      }
      var lit = st.lit, shown = st.intro * N * 1.15;
      for (var k = 0; k < N; k++) {
        var a = Math.max(0, Math.min(1, shown - k));          // the grid sweeps in on arrival
        if (a <= 0) continue;
        var f = Math.max(0, Math.min(1, lit - k));            // how lit this mark is
        ctx.beginPath(); cell(k, r, g, sf);
        // lit marks become clear windows first; the rest follow
        var cover1 = src ? (1 - u) * (1 - f * (1 - tA)) : 1;
        if (cover1 > 0) { ctx.globalAlpha = a * cover1; ctx.fillStyle = '#01262D'; ctx.fill(); ctx.fillStyle = 'rgba(11,74,117,.62)'; ctx.fill(); }
        if (f > 0 && tA > 0) { ctx.globalAlpha = a * f * tA; ctx.fillStyle = '#38E0CF'; ctx.fill(); }
      }
      ctx.globalAlpha = 1;
    }
    function loop() { raf = 0; draw(); if (vis && (open > 0 || G.isTweening(st))) raf = requestAnimationFrame(loop); }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    function setBeat(b) {
      if (b === beat) return; beat = b;
      beats.forEach(function (x, k) { x.classList.toggle('is-on', k === Math.min(b, 2)); });
      prog.forEach(function (x, k) { x.classList.toggle('on', k <= b); });
      sec.classList.toggle('is-end', b === 3);
      G.to(st, { lit: TARGET[Math.min(b, 2)], duration: .9, ease: 'power2.out', overwrite: 'auto', onUpdate: kick });
    }
    ST.matchMedia({
      '(min-width: 1001px)': function () {
        sec.classList.add('is-live'); layout();
        var onRs = function () { layout(); kick(); }; w.addEventListener('resize', onRs);
        var io = new IntersectionObserver(function (en) { vis = en[0].isIntersecting; if (vis) kick(); }); io.observe(stage);
        G.to(st, { intro: 1, duration: 1.4, ease: 'power2.out', delay: .2, onUpdate: kick });
        beat = -1; setBeat(0);
        var trig = ST.create({ trigger: stage, start: 'top top', end: '+=320%', pin: true, scrub: true, onUpdate: function (s) {
          var p = s.progress;
          setBeat(p < .2 ? 0 : p < .4 ? 1 : p < .6 ? 2 : 3);
          open = map(p, .62, .94);
          sec.style.setProperty('--open', map(open, .45, .9).toFixed(3));
          if (open > 0) { if (vid.paused) { try { vid.currentTime = 0; } catch (e) {} var pr = vid.play(); if (pr && pr.catch) pr.catch(function () {}); } } else if (!vid.paused) vid.pause();
          kick();
        } });
        return function () { trig.kill(); io.disconnect(); w.removeEventListener('resize', onRs); sec.classList.remove('is-live', 'is-end'); vid.pause(); };
      }
    });
  })();

  /* ---------------- about: the four parts close into one band as the section arrives ---------------- */
  (function assemble() {
    var band = $('.asm__band'); if (!band || !anim) return;
    ST.matchMedia({ '(min-width: 1001px)': function () {
      var ps = $$('.asm__p', band), Y = [70, -40, 50, -60];
      var tl = G.timeline({ scrollTrigger: { trigger: band, start: 'top 92%', end: 'top 30%', scrub: .7 } });
      ps.forEach(function (p, k) { tl.fromTo(p, { x: (k - 1.5) * 90, y: Y[k] }, { x: 0, y: 0, ease: 'none' }, 0); });
      tl.from('.asm__caps li', { opacity: 0, y: 24, stagger: .08, ease: 'none' }, .35);
    } });
  })();

  /* ---------------- about: partner names; the one in focus tells its story ---------------- */
  (function partners() {
    var rows = $$('.gl__r'), cards = $$('.gl__c'); if (!rows.length) return;
    function on(i) { rows.forEach(function (r, k) { r.classList.toggle('is-on', k === i); }); cards.forEach(function (c, k) { c.classList.toggle('is-on', k === i); }); }
    rows.forEach(function (r, i) { r.addEventListener('mouseenter', function () { on(i); }); r.addEventListener('focus', function () { on(i); }); });
    if (G && ST) ST.matchMedia({ '(min-width: 1001px)': function () {
      rows.forEach(function (r, i) { ST.create({ trigger: r, start: 'top 58%', end: 'bottom 58%', onToggle: function (s) { if (s.isActive) on(i); } }); });
    } });
    if (anim) G.from(rows, { y: 40, opacity: 0, duration: 1, ease: EASE, stagger: .08, scrollTrigger: { trigger: '.gl__names', start: 'top 85%', once: true } });
  })();
  if (anim && $('.tf__frame>img')) reveal($('.tf__frame>img'), $('.tf__frame'));

  /* ---------------- about: the month calendar replays the pace, then answers to the pointer ---------------- */
  (function pace() {
    var cal = $('.cal'); if (!cal) return;
    var cells = $$('.cal__m', cal), ms = $$('.cal__m.is-ms', cal), list = $$('.pace__list li');
    var imgs = $$('.pace__img img'), when = $('.pace__when'), title = $('.pace__t'), desc = $('.pace__d');
    var cur = ms.length - 1, played = false;
    function set(el, text) {
      var sp = $('span', el); if (sp.textContent === text) return;
      if (!anim) { sp.textContent = text; return; }
      G.killTweensOf(sp);
      G.to(sp, { y: -10, opacity: 0, duration: .2, ease: 'power2.in', onComplete: function () { sp.textContent = text; G.fromTo(sp, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: EASE }); } });
    }
    function show(k) {
      cur = k;
      ms.forEach(function (b) { b.classList.toggle('is-on', +b.getAttribute('data-k') === k); });
      imgs.forEach(function (im) { im.classList.toggle('is-on', +im.getAttribute('data-k') === k); });
      var li = list[k];
      set(when, li.getAttribute('data-when')); set(title, li.getAttribute('data-t')); set(desc, li.getAttribute('data-d'));
    }
    ms.forEach(function (b) {
      var k = +b.getAttribute('data-k');
      b.addEventListener('mouseenter', function () { if (played) show(k); });
      b.addEventListener('focus', function () { show(k); });
      b.addEventListener('click', function () { show(k); });
    });
    if (!anim) return;
    // on the way in: the months fill one by one; each milestone takes the card as the sweep passes it
    var live = cells.filter(function (c) { return !c.classList.contains('is-out'); });
    ST.create({ trigger: cal, start: 'top 70%', once: true, onEnter: function () {
      cal.classList.add('is-sweep');
      var tl = G.timeline({ onComplete: function () { cal.classList.remove('is-sweep'); played = true; } });
      live.forEach(function (c, i) {
        tl.call(function () { c.classList.add('lit'); if (c.classList.contains('is-ms')) show(+c.getAttribute('data-k')); }, null, i * .11);
      });
      tl.call(function () { show(ms.length - 1); }, null, live.length * .11 + .4);
    } });
  })();

  w.addEventListener('load', function () { if (ST) ST.refresh(); });
})();
