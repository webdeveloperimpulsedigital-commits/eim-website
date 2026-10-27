# EIM Brand & Design System Consistency Rules

## 1. Typography Standards
- **Font Family**: `"PP Neue Montreal", sans-serif` (always use variable `var(--f)`).
- **Available Font Weights**:
  - `400` (Regular) — Body copy, ledes, form fields, and helper text.
  - `500` (Medium) — **Mandatory weight for all Headings (H1, H2, H3), Buttons, and Navigation links.** Do NOT use `600` (Semi-Bold), as the brand uses geometric Medium `500`.
  - `700` (Bold) — Reserved for odometer numbers and highlighted emphasis.

## 2. Type Hierarchy & Fluid Scaling Tokens
- **Display / Hero Headline**: `var(--fs-d)` (`clamp(2.9rem, 6.6vw, 7rem)`), weight `500`, letter-spacing `-0.04em`, line-height `1.02`.
- **Section Headings (H2)**: `var(--fs-h2)` (`clamp(2.1rem, 4.2vw, 4.2rem)`), weight `500`, letter-spacing `-0.032em`, line-height `1.04`.
- **Card Titles & Subheadings (H3)**: `var(--fs-h3)` (`clamp(1.35rem, 1.9vw, 1.9rem)`), weight `500`, letter-spacing `-0.02em`, line-height `1.15`.
- **Lede / Subtitles**: `var(--fs-l)` (`clamp(1.08rem, 1.25vw, 1.3rem)`), weight `400`, line-height `1.5`, color `var(--ink-2)`.
- **Body Text**: `1.0625rem` (17px), line-height `1.55`, color `var(--ink)`.
- **Labels / Eyebrows**: `0.66rem`, weight `500`, letter-spacing `0.14em`, uppercase.
- **Buttons**: `1rem` (or `0.94rem` for small), weight `500`, letter-spacing `-0.005em`, parallelogram 27.5° cut.

## 3. Brand Color Palette
- **Ink (Text & Dark Accents)**: `#01262D` (`var(--ink)`)
- **Teal (Primary Brand Accent)**: `#38E0CF` (`var(--teal)`)
- **Paper (Page Background)**: `#FFFFFF` (`var(--paper)`)
- **Field / Light Mist (Secondary Background)**: `#FAFBFB` (`var(--field)`)
- **Deep Blue / Links**: `#0B4A75` (`var(--link)`)
- **Borders & Rules**: `#EBEEEE` / `#E8ECEC`

## 4. Theme & Layout Rules
- Maintain the **clean white / light mist aesthetic** matching the homepage; dark backgrounds are used selectively (e.g. footer, dark cards, overlays).
- Header and Footer must remain consistent across all routes (`/` and `/contact-us`).
- Preserve clean native routing between `/` and `/contact-us` to maintain GSAP / ScrollTrigger / Lenis animation lifecycles.

## 5. Git Policy
- **STRICT RULE**: Never run `git commit` or `git push`. Leave all staging and commits to the user.
