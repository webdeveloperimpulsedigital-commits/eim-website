# EIM homepage — staging build

Static site. No build step, no framework, no server-side code. Everything it needs is inside this folder.

## Deploy

Copy the contents of this folder to the web root of the staging site and serve `index.html`.

```
index.html
assets/
  css/main.css          all styles
  js/main.js            all behaviour (page logic + motion layer)
  vendor/               GSAP 3.13 + plugins, Motion, Lenis (self-hosted, no CDN)
  fonts/                PP Neue Montreal woff2 (Regular, Medium, Bold)
  img/                  photography, logo lockup, wordmark, favicon
  brands/               customer logos
  logos/                Ravindra Energy logo
  seq/                  181 frames of the battery-swap footage (WebP)
```

It must be served over HTTP, not opened as a `file://` path: the swap module fetches its frames with JavaScript.

Any static host works — Nginx, Apache, S3 + CloudFront, Netlify, Vercel, GitHub Pages. No redirects or rewrites are needed; there is only one page.

## Notes for the developer

- **No network calls leave the server.** Every library and asset is local, so the page renders the same behind a firewall.
- **Cache headers:** `assets/seq/` is 14 MB of immutable frames. A long `Cache-Control: max-age` on `/assets/` is recommended; keep `index.html` short-lived.
- **Compression:** enable gzip or brotli for `.css`, `.js` and `.html`. Leave `.webp` and `.woff2` alone, they are already compressed.
- **MIME types:** make sure the server sends `image/webp` for `.webp` and `font/woff2` for `.woff2`. Most defaults are fine; older Nginx builds are not.
- **The swap module** preloads its frames in the background and scrubs them on a pinned scroll. On a slow connection the first frames appear before the rest, which is expected.
- **Reduced motion:** with the operating system's "reduce motion" setting on, the intro and all scroll animations are skipped and the page stays static and readable. Worth testing once.
- **Without JavaScript** the page still renders all its content and stays readable, just without motion.
- **Fonts** are licensed webfonts. They are included for staging; confirm the licence covers the production domain before go-live.
- The site is a single page. The header menus are deliberately not clickable: this is a showcase build, and the sub-pages do not exist yet.

## Before this goes anywhere public

Three figures come from two sources that disagree, and EIM needs to settle them:

1. **East zone stations** — the website map says 10 planned; the corporate presentation's East map shows 7. The page uses 10.
2. **Existing and upcoming totals** — the website headline says 7 and 17, its own map adds up to 8 and 16, and the presentation's North/West map shows 8 and 14. The page uses 8 and 16.
3. **"No. 2 in India"** — taken verbatim from the presentation, slide 13 ("Nov 2025 — No. 2 in India in EHDT Sale"). The slide names no measuring body and no period, so the claim cannot be attributed if anyone asks.

Slides 26 to 28 of the presentation are hidden slides. The zone coverage on the network section draws on them, so someone at EIM should confirm they are cleared to be public.

Three timeline milestones have no photograph in either source and currently use other EIM photographs as stand-ins: **No. 2 in India (Nov 2025)**, **Vehicle assembly plant, Talegaon (Jun 2026)** and **350 kWh model homologated (Jul 2026)**. They are marked in the markup with `data-placeholder` on the `<figure>`. Swap them as soon as real photographs exist.

Every other figure and claim on the page comes from the corporate presentation or energyinmotion.in. Nothing was taken from press coverage.

## Browser support

Current Chrome, Edge, Safari and Firefox, desktop and mobile. Tested at 1280, 1512 and 1920 px wide and on a 390 px phone.
