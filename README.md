# abhishek-kun96.github.io

Personal portfolio for Abhishek Kuntal — CFD simulation engineer &amp; TUM M.Sc. Materials Science student.

**Live URL (once deployed):** <https://abhishek-kun96.github.io>

---

## 1. One-time setup — publish to GitHub Pages

1. On github.com, create a new **public** repository named **exactly** `abhishek-kun96.github.io`. Do **not** initialise it with a README.
2. On your computer:
   ```bash
   git clone https://github.com/abhishek-kun96/abhishek-kun96.github.io.git
   cd abhishek-kun96.github.io
   ```
3. Copy every file and folder from this `outputs/` directory into the cloned repo folder.
4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial portfolio scaffold"
   git push origin main
   ```
5. On github.com, go to **Settings → Pages**. Under *Build and deployment*, set the source to **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**. Save.
6. Wait ~1–2 minutes. Your site is live at <https://abhishek-kun96.github.io>.

---

## 2. File map

```
.
├── index.html                        ← Landing / hero
├── work.html                         ← Project gallery with filters
├── about.html                        ← Bio + career timeline
├── resume.html                       ← Skills matrices + CV download
├── contact.html                      ← Email / LinkedIn / GitHub / phone
├── README.md
│
├── projects/
│   ├── turbomachinery-cfd.html       ← FULL case study (template)
│   ├── cooling-passage-cht.html      ← Stub — fill in using the template
│   ├── transient-fod.html            ← Stub
│   ├── shell-tube-barc.html          ← Stub
│   ├── wind-farm-wake.html           ← Stub
│   ├── hot-wire-anemometry.html      ← Stub
│   ├── thermomechanical-modeling.html ← Stub
│   ├── solid-state-electrolytes.html ← Stub
│   └── _template.html                ← Copy this for new projects
│
└── assets/
    ├── css/style.css                 ← All styling (both themes)
    ├── js/main.js                    ← Theme toggle, reveal, filter
    ├── images/                       ← Put all figures here
    └── pdfs/                         ← Put CV PDF here as abhishek-kuntal-cv.pdf
```

---

## 3. How to add a new project

1. Duplicate `projects/_template.html` and rename to `projects/my-new-project.html`.
2. Open the new file and replace every `[[PLACEHOLDER]]` with real content.
3. Drop figures into `assets/images/` and swap each `<div class="figure-placeholder">` for an `<img>` tag.
4. Open `work.html` and add a new `<a class="project-card" …>` block for the new project. Copy the style of the existing cards. Set `data-category="cfd"` (or `materials`, `automation`) to make the filter bar work.
5. Commit &amp; push. GitHub Pages redeploys automatically.

---

## 4. How to fill in each stub page

Six of the seven project pages are stubs that link back to the turbomachinery case study as a reference. For each one:

1. Open the file in `projects/`.
2. Use `projects/turbomachinery-cfd.html` as the structural guide.
3. Replace the `<div class="figure-placeholder">` block with real `case-section` blocks: **Problem → Approach → Tools → Results → Validation → Lessons → Artifacts**.
4. Keep the `<dl class="case-meta">` block at the top updated with the right context, role, duration, and stack.

---

## 5. Where to put your CV &amp; photo

- **CV:** save the PDF as `assets/pdfs/abhishek-kuntal-cv.pdf` (exact filename). The "Download CV" buttons already point there.
- **Profile photo:** save as `assets/images/abhishek.jpg`, then in `about.html` replace
  ```html
  <div class="bio-photo" aria-hidden="true">Photo</div>
  ```
  with
  ```html
  <img class="bio-photo" src="assets/images/abhishek.jpg" alt="Abhishek Kuntal" />
  ```

---

## 6. Customising the look

All colours and spacing live as CSS variables at the top of `assets/css/style.css`:

```css
:root, [data-theme="light"] {
  --bg:            #f7f6f2;
  --accent:        #01696f;   /* the single teal accent */
  ...
}
[data-theme="dark"] {
  --bg:            #0e1214;
  --accent:        #5fb3b8;
  ...
}
```

Change the accent colour in **two** places (light + dark) and the whole site updates.

---

## 7. Linking conventions

- Top-level pages link with just the filename, e.g. `work.html`.
- Project pages live in `projects/` and reference assets and other pages with `../`, e.g. `../assets/css/style.css`, `../about.html`.
- External links open in a new tab with `target="_blank" rel="noopener"`.

---

## 8. Local preview

To preview before pushing:

```bash
# any of these from the repo root:
python3 -m http.server 8000
# or
npx serve .
```

Then open <http://localhost:8000>.

---

## 9. Custom domain (optional)

If you want a domain like `abhishekkuntal.dev` instead of the default:

1. Buy the domain.
2. In **Settings → Pages → Custom domain**, enter it and save.
3. Create a DNS record at your registrar (CNAME to `abhishek-kun96.github.io`, or `A`/`AAAA` records to GitHub's IPs).
4. Wait for DNS propagation; enable **Enforce HTTPS** once certified.

---

## 10. Known next steps

- Add the CV PDF at `assets/pdfs/abhishek-kuntal-cv.pdf`.
- Add a profile photo at `assets/images/abhishek.jpg`.
- Fill in the 6 stub project pages with real content (figures, metrics, validation).
- Update the LinkedIn URL in the footer if your handle isn't `abhishek-kuntal` — search-and-replace `abhishek-kuntal` across the repo.
- Optional: add a favicon (`favicon.ico` at the repo root).
