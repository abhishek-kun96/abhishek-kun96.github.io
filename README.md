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

- Typeface: Archivo (variable width) for everything; headings use `font-stretch` 112–125%.
- Colour: violet accent `--accent` from the inferno colormap of the FTLE renders; the home hero is a dark `--ink` band with the ember `--ember` for the one call to action.
- Charts are inline SVG coloured by `.chart-*` classes, so they follow the theme.

## Preview

```
python -m http.server 8000
```
