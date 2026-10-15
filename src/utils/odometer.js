import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function odometer(el) {
  if (!el || el.__odo) return;
  el.__odo = true;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const label = el.textContent.replace(/\s+/g, ' ').trim();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let n;

  while ((n = walker.nextNode())) {
    if (/\d/.test(n.textContent) && !(n.parentElement && n.parentElement.closest('small'))) {
      nodes.push(n);
    }
  }

  if (!nodes.length) return;

  const reels = [];
  nodes.forEach((tn) => {
    const frag = document.createDocumentFragment();
    tn.textContent.split('').forEach((ch) => {
      if (!/\d/.test(ch)) {
        frag.appendChild(document.createTextNode(ch));
        return;
      }
      const od = document.createElement('span');
      od.className = 'od';
      od.setAttribute('aria-hidden', 'true');
      const r = document.createElement('span');
      r.className = 'od__r';
      for (let k = 0; k < 20; k++) {
        const s = document.createElement('span');
        s.textContent = k % 10;
        r.appendChild(s);
      }
      od.appendChild(r);
      frag.appendChild(od);
      reels.push({ r, v: +ch });
    });
    tn.parentNode.replaceChild(frag, tn);
  });

  const sr = document.createElement('span');
  sr.className = 'sr';
  sr.textContent = label;
  el.appendChild(sr);

  function widths() {
    reels.forEach((o) => {
      const od = o.r.parentNode;
      const m = document.createElement('span');
      m.textContent = o.v;
      m.style.cssText = 'position:absolute;visibility:hidden;white-space:pre';
      od.parentNode.insertBefore(m, od);
      const adv = m.getBoundingClientRect().width;
      m.style.letterSpacing = 'normal';
      const ink = m.getBoundingClientRect().width;
      m.remove();
      const box = Math.max(adv, ink);
      od.style.width = `${box}px`;
      od.style.marginRight = `${adv - box}px`;
    });
  }

  widths();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(widths);
  }

  if (reduce) {
    reels.forEach((o) => {
      o.r.style.transform = `translateY(-${o.v * 5}%)`;
    });
    return;
  }

  reels.forEach((o) => {
    gsap.set(o.r, { yPercent: 0 });
  });

  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      reels.forEach((o, i) => {
        gsap.to(o.r, {
          yPercent: -(10 + o.v) * 5,
          duration: 1.9 + i * 0.12,
          ease: 'expo.out',
          delay: i * 0.05,
        });
      });
    },
  });
}
