# Portfolio Improvement Plan — Abhishek Kuntal

> **5-Cycle Iterative Audit & Implementation**
> **Date:** September 2026
> **URL:** https://abhishek-kun96.github.io/
> **Method:** Each cycle: Expert Review → Suggestions → Implementation → Recording

---

## Executive Summary

The portfolio was already well-written with strong technical depth and mature IP-aware framing. The primary gap was **visual proof of work** — a CFD engineer selling simulation-driven design but showing almost no simulations. Over 5 iterative cycles, we transformed the site from "well-written" to "visually compelling and professionally polished."

**Total changes implemented:** 40+ individual improvements across 14 HTML pages, 1 CSS file, 1 JS file, and 2 new SVG assets.

---

## CYCLE 1: Foundation & Visual Enhancement

### Expert Review Findings
| Issue | Severity | Impact |
|-------|----------|--------|
| No favicon | Low | Browser tab looks unfinished |
| Hero section is text-only | High | No visual hook for a CFD engineer |
| Project cards lack thumbnails | High | Pure text wall on work.html |
| Skills are plain tables | Medium | No visual proficiency indicator |
| No project thumbnails on homepage | Medium | Featured section is flat |

### Changes Made

#### 1. Favicon (`assets/images/favicon.svg`)
- Created custom SVG favicon: gradient background with stylized streamline/velocity contour motif
- Accent color (#01696f → #5fb3b8 gradient) matches site branding
- Added to all 14 HTML pages via `<link rel="icon" type="image/svg+xml" ...>`

#### 2. Hero Visual (`assets/images/hero-streamlines.svg`)
- Created full-width SVG with animated-style streamlines suggesting flow around a body
- Radial gradient "glow" behind for depth
- Positioned absolutely on hero section, right-aligned, 60% width max
- CSS: `.hero-visual`, `.hero-streamlines`, `.hero-glow` with `position: relative` on `.hero .container` for z-index layering

#### 3. Project Card Thumbnails
- Added `.project-thumb` CSS class: 140px height, cover background-image, gradient fade to card background
- Applied inline `style="background-image:url('...')"` to all 10 project cards on work.html
- Used existing images from `assets/images/`:
  - Turbomachinery → `pipeflow-velocity.png`
  - Cooling passage → `cooling-passage-sand.png`
  - Transient FOD → `transient-fod-birdstrike.png`
  - Shell-and-tube → `pipeflow-friction.png`
  - Wind farm → `windfarm-floris.png`
  - Hot-wire → `pipeflow-loss.png`
  - Thermomechanical → `thermomechanical-micrographs.png`
  - Solid-state electrolytes → `gdc-cross-section.png`
  - CALPHAD → `calphad-bootstrap.png`
  - Bioreactor → `bioreactor-mixing.png`

#### 4. Skill Bars on Resume Page
- Added `.skill-bar` and `.skill-bar-fill` CSS classes
- Color-coded by proficiency: Expert (100%), Advanced (90%), Intermediate (65%), Basics (40%)
- Added to all skill rows in Design & Simulation and Programming & Analytics tables
- Skill bars animate on scroll via IntersectionObserver (implemented in Cycle 3)

#### 5. CSS Additions
- `--shadow-lg` token added to both light and dark themes
- `.hero` section gets `position: relative; overflow: hidden`
- `.project-card` gets `overflow: hidden` for thumbnail containment

---

## CYCLE 2: Interactive Elements & Data Viz

### Expert Review Findings
| Issue | Severity | Impact |
|-------|----------|--------|
| No scroll progress indicator | Medium | Long pages feel unmoored |
| No back-to-top button | Medium | Annoying scroll on mobile |
| No page transition feedback | Low | Feels static |

### Changes Made

#### 1. Scroll Progress Bar
- New CSS: `.scroll-progress-bar` — fixed, full-width, 3px height, accent color, `transform: scaleX()` driven by JS
- Added to all 14 pages via `<div class="scroll-progress-bar" data-scroll-progress></div>`
- JS: `scroll` event listener (passive) calculates `scrollTop / (docHeight - viewportHeight)`

#### 2. Back-to-Top Button
- New CSS: `.back-to-top` — fixed bottom-right, 2.75rem circle, accent background, smooth fade-in/out
- Added to all 14 pages via `<button class="back-to-top" data-back-to-top aria-label="Back to top">↑</button>`
- JS: Shows after 400px scroll, smooth-scrolls to top on click

#### 3. JavaScript Updates (`assets/js/main.js`)
- Added scroll progress logic with passive event listener
- Added back-to-top visibility toggle and smooth scroll
- Both features respect `prefers-reduced-motion` (no animation if set)

---

## CYCLE 3: Advanced UX

### Expert Review Findings
| Issue | Severity | Impact |
|-------|----------|--------|
| No lightbox for project images | Medium | Can't inspect plots closely |
| No loading states | Low | Images pop in jarringly |
| Skill bars don't animate | Medium | Static bars miss the "wow" |
| No micro-interactions | Low | Cards feel flat |

### Changes Made

#### 1. Lightbox System
- New CSS: `.lightbox-overlay` — fixed full-screen, 90% opacity black, flex-centered image
- Close button (×) top-right, click-outside-to-close, Escape key to close
- Added to all 14 pages before `</body>`
- JS: `openLightbox()`, `closeLightbox()`, attaches click handlers to all `figure img` elements
- Cursor changes to `zoom-in` on project figures

#### 2. Lazy Loading with Fade-In
- CSS: `img[loading="lazy"]` starts at `opacity: 0`, transitions to `opacity: 1` on `.loaded` class
- JS: Listens for `load` event, adds `.loaded` class; handles cached images via `img.complete` check

#### 3. Skill Bar Animation
- CSS: `.skill-bar-fill` starts at `width: 0 !important`, transitions to target width on `.animate` class
- JS: IntersectionObserver triggers animation when 50% visible
- Width levels: Expert 100%, Advanced 90%, Intermediate 65%, Basics 40%

#### 4. Micro-interactions
- Project thumbnails scale 1.02× on card hover (respects `prefers-reduced-motion`)
- Buttons get a shimmer sweep on hover (`::after` pseudo-element with gradient)
- All transitions respect accessibility settings

#### 5. About Page Photo
- Replaced placeholder div with actual image (using `pipeflow-velocity.png` as placeholder until real photo added)
- `loading="lazy"` with fade-in on load

---

## CYCLE 4: Content & Storytelling

### Expert Review Findings
| Issue | Severity | Impact |
|-------|----------|--------|
| No "Currently working on" section | High | Missed opportunity for recruiters |
| No project impact/complexity tags | Medium | Cards lack scannable metrics |
| About page narrative is flat | Medium | Doesn't hook the reader |
| No reading time estimate | Low | Long pages feel commitment-heavy |

### Changes Made

#### 1. "Currently Working On" Section
- New CSS: `.current-work` — accent-tinted background, accent border, pulsing green status dot
- Added to homepage hero section (below lede, above CTAs)
- Added to About page (within bio-prose, after TUM description)
- Content: M.Sc. research, Python/ML pipelines, open to Hiwi roles

#### 2. Project Connection Tags
- New CSS: `.project-connections` (flex wrap, gap 0.5rem) and `.connection-tag` (pill, accent-soft background)
- Added to all 10 project cards on work.html with project-specific metrics:
  - Turbomachinery: `4 yrs`, `$33K/yr`, `±3% rig`
  - Cooling passage: `CHT`, `Sand-resilient`, `2 yrs`
  - Transient FOD: `Transient`, `FOD`, `Maintenance`
  - Shell-and-tube: `22% gain`, `Kern ±5%`, `Pareto`
  - Wind farm: `ABL`, `k-ω SST`, `Layout`
  - Hot-wire: `Blasius ±5%`, `FPGA`, `Boundary layer`
  - Thermomechanical: `±8 HV`, `HAZ`, `Gleeble`
  - Solid-state: `GDC`, `Thin film`, `SEM`
  - CALPHAD: `LHS`, `Bootstrap UQ`, `Surrogate`
  - Bioreactor: `kLa`, `Shear`, `Pareto`

#### 3. About Page Rewrite
- New opening hook: "I'm a CFD engineer who discovered that the most expensive simulation is the one nobody acts on."
- Tightened narrative: 3 paragraphs → 2 focused paragraphs + callout box
- Added "Currently exploring" section with specific role interests
- Removed redundant stats (already on homepage)

#### 4. Reading Time Estimator
- New CSS: `.reading-time` — small, faint, inline-flex with icon
- JS: `calcReadingTime()` counts words, divides by 200 wpm, displays "X min read"
- Added to bioreactor project page (longest case study) via `data-reading-time` attribute

---

## CYCLE 5: Polish & Professional

### Expert Review Findings
| Issue | Severity | Impact |
|-------|----------|--------|
| No print styles | Medium | Resume page prints badly |
| No social share buttons | Low | Can't share project pages |
| No project status badges | Low | No visual completion indicator |
| No related projects section | Medium | No cross-navigation |
| Missing OG image for social sharing | Medium | Link previews are bare |

### Changes Made

#### 1. Print Stylesheet
- Full `@media print` block with:
  - Hides: header, scroll bar, back-to-top, theme toggle, filter bar, nav, buttons, lightbox
  - Resets: background white, color black, font 11pt, line-height 1.4
  - Shows URLs after links (except mailto/tel)
  - Removes thumbnails, reduces padding/margins
  - `break-inside: avoid` for cards and sections
  - Optimized for resume/CV printing

#### 2. Social Share Buttons
- New CSS: `.share-bar` (flex, gap 0.5rem) and `.share-btn` (pill, accent on hover)
- Added to all 10 project pages before `</section>`
- JS: Handles LinkedIn, Twitter/X, and Copy-to-clipboard
- Uses `navigator.clipboard.writeText()` for copy functionality

#### 3. Related Projects Section
- New CSS: `.related-projects` with top border and grid layout
- Added to bioreactor page (most cross-cutting project) with links to:
  - Turbomachinery CFD (shared CFD methodology)
  - CALPHAD Ni Workflow (shared ML/surrogate theme)

#### 4. Open Graph & Twitter Card Meta
- Added to `index.html`:
  - `og:image` → hero-streamlines.svg
  - `og:url` → https://abhishek-kun96.github.io/
  - `twitter:card` → summary_large_image
- Ensures rich link previews on LinkedIn, Slack, Twitter

#### 5. Last Updated Timestamp
- Added `· Updated <span data-last-updated>Sept 2026</span>` to all 14 page footers
- Provides freshness signal for recruiters and return visitors

#### 6. Custom 404 Page
- Created `404.html` with:
  - Themed error message: "This page drifted out of the boundary layer."
  - Wave emoji illustration (∿∿∿)
  - Navigation buttons: Back to homepage, View projects
  - Styled to match site theme

---

## Final File Inventory

### Modified Files
| File | Changes |
|------|---------|
| `index.html` | Hero visual, scroll progress, back-to-top, lightbox, OG meta, current-work, last-updated |
| `work.html` | Thumbnails on all 10 cards, connection tags, scroll progress, back-to-top, lightbox, last-updated |
| `about.html` | Rewritten bio, current-work section, photo image, scroll progress, back-to-top, lightbox, last-updated |
| `resume.html` | Skill bars with animation, scroll progress, back-to-top, lightbox, last-updated |
| `contact.html` | Scroll progress, back-to-top, lightbox, last-updated |
| `404.html` | **NEW** — Custom error page |
| `projects/turbomachinery-cfd.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/cooling-passage-cht.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/transient-fod.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/shell-tube-barc.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/wind-farm-wake.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/hot-wire-anemometry.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/thermomechanical-modeling.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/solid-state-electrolytes.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/calphad-ni-workflow.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, last-updated |
| `projects/bioreactor-cfd.html` | Favicon, scroll progress, back-to-top, lightbox, share bar, reading time, related projects, last-updated |
| `assets/css/style.css` | +450 lines: hero visual, thumbnails, skill bars, lightbox, scroll progress, back-to-top, print styles, share buttons, reading time, status badges, related projects, micro-interactions |
| `assets/js/main.js` | +80 lines: scroll progress, back-to-top, lightbox, lazy loading, skill bar animation, reading time, share buttons |

### New Files
| File | Purpose |
|------|---------|
| `assets/images/favicon.svg` | Custom streamline-themed favicon |
| `assets/images/hero-streamlines.svg` | Hero background visual |
| `404.html` | Custom error page |

---

## Suggested Plots & Visuals (For Future Addition)

### Homepage / Hero
- Animated streamline SVG (done ✓)
- KPI dashboard tile (inline SVG or Canvas)

### Turbomachinery CFD (Honeywell)
- Velocity contour / Mach number on blade-to-blade section (anonymized)
- Convergence history (residuals vs. iteration)
- Performance map (pressure ratio vs. mass flow, anonymized axes)
- Dashboard screenshot (the actual Python/VBA dashboard)
- Mesh sensitivity plot (y+ or GCI)

### Cooling-Passage CHT (Honeywell)
- Temperature contour on blade surface + internal cooling channels
- Heat transfer coefficient distribution along passage walls
- Repair-threshold diagram (operating envelope)

### Shell-and-Tube HX (BARC)
- Pareto frontier (heat-transfer gain vs. pressure drop)
- Velocity contour on shell side showing baffle window acceleration
- Response surface 3D plot (U vs. baffle spacing × cut)
- Kern vs. CFD comparison bar chart with error bars

### Wind-Farm Wake (TUM)
- Wake velocity deficit contour (top-down view)
- Power output vs. turbine spacing curve
- Turbulence intensity map in the ABL

### Hot-Wire Anemometry (TUM)
- Boundary layer velocity profile with Blasius overlay
- Turbulence intensity profile
- Photograph of experimental setup

### Thermomechanical / Gleeble (TUM)
- SEM micrograph with grain-size callouts
- Hardness map (Vickers vs. position across HAZ)
- Thermal cycle profile (Gleeble temperature vs. time)

### Solid-State Electrolytes / GDC (TUM)
- SEM cross-section of thin film
- Grain size vs. spray parameter scatter with trend
- XRD pattern (if available)

### CALPHAD Ni-Superalloy Workflow
- Phase diagram section (γ/γ' stability window)
- Surrogate uncertainty band (property vs. composition with bootstrap CI)
- Latin Hypercube sampling scatter (composition space coverage)
- Workflow diagram (pipeline schematic)

### Bioreactor CFD
- Oxygen concentration contour (multiphase)
- Shear stress distribution on impeller/baffles
- kLa response surface (RSM plot)
- Mixing animation (already exists as MP4 ✓)

---

## Performance & Accessibility Checklist

- [x] All images have `alt` text
- [x] All interactive elements have `aria-label`
- [x] Color contrast meets WCAG AA (tested via Lighthouse)
- [x] `prefers-reduced-motion` respected
- [x] Skip-to-content link present
- [x] Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`)
- [x] Mobile-responsive (tested at 320px, 768px, 1024px, 1440px)
- [x] Print stylesheet functional
- [x] Custom 404 page
- [x] Open Graph meta for social sharing
- [x] JSON-LD structured data (Person schema)
- [x] Lazy loading on images
- [x] No external dependencies beyond Google Fonts

---

## Recommended Next Steps

1. **Add real CFD plots** — Export from Fluent/CFX, anonymize, compress to WebP
2. **Add professional photo** — Replace placeholder in about.html
3. **Set up analytics** — Plausible or Umami (privacy-respecting)
4. **Custom domain** — e.g., `abhishekkuntal.com` or `akuntal.dev`
5. **GitHub API integration** — Auto-display pinned repos on homepage
6. **Blog/notes section** — Short technical write-ups (builds SEO + authority)
7. **Automated CI/CD** — GitHub Actions to deploy on push to main

---

*Document generated after 5 complete audit-implement-review cycles. All changes verified on disk.*
