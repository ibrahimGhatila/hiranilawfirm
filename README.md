# Hirani Law Firm PLLC — Website

Pixel-inspired, improved React replica of the Hirani Law Firm landing page.
Houston & Katy family law and personal injury attorney site.

## Stack

- **React 18** + **Vite**
- **React Router** (multi-page ready, breadcrumbs)
- **Bootstrap 5** grid/utilities + a custom theme layer (`src/styles/theme.css`)
- **react-helmet-async** for SEO (meta, Open Graph, Twitter, JSON-LD)
- **react-icons**

## Design principles

- **Component-based** — every landing section is its own component in `src/components`.
- **Content-driven** — all copy lives in `src/data/site.json`. Edit content there, not in JSX.
- **Bigger typography + wide container** — `--hl-container: 1400px` with generous font sizes to reduce left/right whitespace.
- **Full-bleed carousel** — the testimonials carousel spans the full viewport width.
- **Mobile sidebar** — hamburger opens a right-side drawer capped at 80% width.
- **Responsive image order** — side-image sections show *heading → image → content* on mobile.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  assets/            Images (extracted) + image registry
  components/
    common/          SEO
    layout/          TopBar, Header (nav + mobile sidebar), Footer, Breadcrumbs, Layout
    home/            Hero, StatsBar, PracticeAreas, MeetAttorney, Memberships,
                     ClientsMention, Testimonials, WhyChooseUs, Resources, ContactCTA, LeadForm
  data/site.json     All site content
  pages/             Home, Placeholder
  styles/theme.css   Theme + Bootstrap overrides
public/
  robots.txt, sitemap.xml, favicon.png, og-image.png
```

## SEO

- Per-page `<title>`, meta description, canonical, Open Graph & Twitter cards.
- JSON-LD: `LegalService` (home) + `BreadcrumbList` (inner pages).
- `robots.txt` and `sitemap.xml` in `public/`.
