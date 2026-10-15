import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGlobalAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    function splitWords(el) {
      if (!el || el.getAttribute('data-split') === 'true') return;
      el.setAttribute('data-split', 'true');
      (function walk(node) {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((t) => {
              if (!t) return;
              if (/^\s+$/.test(t)) {
                frag.appendChild(document.createTextNode(t));
                return;
              }
              const o = document.createElement('span');
              o.className = 'wo';
              const i = document.createElement('span');
              i.className = 'wi';
              i.textContent = t;
              o.appendChild(i);
              frag.appendChild(o);
            });
            n.parentNode.replaceChild(frag, n);
          } else if (n.nodeType === 1 && n.tagName !== 'MARK') {
            walk(n);
          }
        });
      })(el);
    }

    // 1. Headings split-words rise
    document.querySelectorAll('.h2, .svc__head .h3').forEach((h) => {
      splitWords(h);
      const words = h.querySelectorAll('.wi');
      if (words.length) {
        gsap.from(words, {
          yPercent: 115,
          rotate: 4,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.035,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: h,
            start: 'top 92%',
            once: true,
          },
        });
      }
    });

    // 2. Fade up elements
    document
      .querySelectorAll(
        '.lede, .svc__head p, .nitem, .bcard, .roles li, .faq__list details, .card h3, .card p'
      )
      .forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 96%',
            once: true,
          },
        });
      });

    // 3. Photo slanted reveals
    const poly = (p) => {
      const s = 30;
      const top = 100 - p * (100 + s);
      const a = Math.max(0, top);
      const b = Math.max(0, Math.min(100, top + s));
      return `polygon(0% ${b}%, 100% ${a}%, 100% 100%, 0% 100%)`;
    };

    document
      .querySelectorAll(
        '.relief__img img, .ashwa__img img, .bcard--img img, .nitem figure img, .eco figure img, .mega__card img'
      )
      .forEach((img) => {
        if (img.closest('.mega') || img.getAttribute('data-rv-init') === 'true') return;
        img.setAttribute('data-rv-init', 'true');
        const o = { p: 0 };
        img.style.clipPath = poly(0);
        gsap.set(img, { scale: 1.18 });

        ScrollTrigger.create({
          trigger: img.parentElement,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(o, {
              p: 1,
              duration: 1.4,
              ease: 'expo.out',
              onUpdate: () => {
                img.style.clipPath = poly(o.p);
              },
              onComplete: () => {
                img.style.clipPath = '';
              },
            });
            gsap.to(img, { scale: 1, duration: 1.8, ease: 'expo.out' });
          },
        });
      });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(refreshTimer);
  }, []);
}
