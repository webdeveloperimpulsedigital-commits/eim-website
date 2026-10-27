import { useEffect } from 'react';
import { url } from '../paths';

// The motion and behaviour layer is plain JavaScript, self-hosted, loaded in order after React
// has rendered the markup it works on. Same libraries and same main.js as the homepage;
// inner pages add their own module script at the end.
const VENDOR = [
  'assets/vendor/gsap.min.js',
  'assets/vendor/ScrollTrigger.min.js',
  'assets/vendor/SplitText.min.js',
  'assets/vendor/Flip.min.js',
  'assets/vendor/DrawSVGPlugin.min.js',
  'assets/vendor/CustomEase.min.js',
  'assets/vendor/motion.js',
  'assets/vendor/lenis.min.js',
  'assets/js/main.js',
];

export default function useRuntime(extra = []) {
  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      for (const p of VENDOR.concat(extra)) {
        if (isCancelled) break;
        const src = url(p);
        if (document.querySelector(`script[src="${src}"]`)) continue;
        await new Promise((resolve) => {
          const s = document.createElement('script');
          s.src = src;
          s.async = false;
          s.onload = resolve;
          s.onerror = resolve;
          document.body.appendChild(s);
        });
      }
    };
    load();
    return () => { isCancelled = true; };
  }, []);
}
