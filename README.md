# abhishek-kun96.github.io

Portfolio of Abhishek Kuntal, CFD and simulation engineer. Static HTML, one stylesheet, one script; served by GitHub Pages from `main`.

## Layout

```
index.html, work.html, about.html, resume.html, contact.html, 404.html
projects/<slug>.html          one case study per project
assets/css/style.css          all styling; tokens for light and dark at the top
assets/js/main.js             theme toggle, work-page filter, lightbox, scroll helpers
assets/images/thumbs/         800x500 card thumbnails, one per project
assets/images/, assets/videos/ figures and clips used by the case studies
```

## Adding a project

1. Copy `projects/_template.html` to `projects/<slug>.html` and fill it in.
2. Add an 800x500 thumbnail at `assets/images/thumbs/<name>.jpg`.
3. Add a card to `work.html` (copy an existing `<a class="project-card">`; `data-category` takes `cfd`, `materials`, `automation`) and update the filter counts.
4. Point the previous project's "Next" button at the new page, and add the URL to `sitemap.xml`.

## Design

The site borrows its identity from the author's own FTLE flow renders: dark ink, violet, ember. Everything else stays quiet so the figures carry the pages.

- **Type:** Archivo (variable width) everywhere. Headings use `font-stretch` 112–125 %; labels (eyebrows, spec-sheet terms, "In short") are 0.7–0.75 rem, uppercase, letter-spaced 0.08 em.
- **Colour tokens** (top of `style.css`, light and dark): `--text`, `--text-muted`, `--text-faint` (all pass WCAG AA on `--bg` and `--bg-muted`), `--accent` (violet), `--ember` (the hero call to action only), `--ink` (dark bands).
- **Signature:** `--flow`, a 3 px stripe in the inferno colour map. It appears in exactly three places: under the home hero, under every page header, and on top of the "In short" box. Don't add more.
- **Layout:** one reading column of 800 px (`.container.reading`) for case studies, About, Résumé and Contact; header, text, figures and tables share both edges. Home and Work use the wide 1140 px container for card grids.
- **Shape:** one radius (`--radius`, 6 px) and 1 px `--border` lines; no drop shadows except the card-hover lift.
- **Components:** `.case-meta` spec sheet, `.tldr` summary (verified numbers only), `.results-grid` metric cards, `.data-table`, `.case-figures` (two-up, stacks below about 650 px), `.callout`, `.ip-note`.
- **Links:** links inside running text are always underlined.
- **Motion:** only the card-hover lift, the reveal fade and the scroll progress bar; all are disabled under `prefers-reduced-motion`.
- **Figures:** `main.js` wraps each figure image in a button that opens a native `<dialog>` (Esc, focus trap and focus return built in).
- **Charts:** inline SVG coloured by `.chart-*` classes, so they follow the theme.

## Checks before publishing

Every number on a page must trace to a source file or paper. Run the site locally and check each page in both themes at 360–1440 px, plus axe and a link check.

## Preview

```
python -m http.server 8000
```
