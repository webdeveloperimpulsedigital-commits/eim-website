// Every page sits at a different depth. Inner pages declare how far up the site root is
// with <meta name="eim-root" content="../../">; the homepage has no tag, so ROOT is ''
// and every link and asset path on it stays exactly as it was.
const meta = typeof document !== 'undefined' ? document.querySelector('meta[name="eim-root"]') : null;

export const ROOT = meta ? meta.getAttribute('content') : '';
export const url = (p) => ROOT + p;
export const HOME = ROOT || '#top';

// a link to a section of another page; on that page itself, a plain anchor so it scrolls instead of reloading
export const here = (page) => typeof location !== 'undefined' && location.pathname.endsWith('/' + page);
export const sectionOf = (page, hash) => (here(page) ? hash : url(page + hash));

export const PAGES = {
  maitryi: 'solutions/maitryi-model/',
  ashwa: 'solutions/ashwa-e-tractor/',
  swap: 'solutions/swapping-and-charging/',
  ports: 'industries/ports-and-terminals/',
  newsroom: 'newsroom/',
  about: 'about/',
};
