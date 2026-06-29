# CHANDRU M — Premium Personal Portfolio

A production-ready, fully responsive, cinematic dark-theme portfolio website built with **pure HTML5, CSS3 and Vanilla JavaScript** — no frameworks, no build step, no dependencies. Just open and go.

> *Storytelling through visuals* — Creative Content Creator · Video Editor · Brand Storyteller · AI Creative Designer.

---

## ✨ Highlights

- **7 full pages** — Home, About, Projects, Logos, Gallery, Experience, Contact
- **Cinematic dark UI** with red gradient accents, glassmorphism & noise texture
- **Awwwards-style motion** — loading screen, custom cursor, particle canvas, mouse spotlight, typing effect, scroll reveals, magnetic buttons, tilt cards, counters, parallax, marquee, ripple, lightbox
- **Fully responsive** — large screens → desktop → laptop → tablet → mobile
- **Accessible & SEO-friendly** — semantic HTML, meta/Open-Graph tags, `prefers-reduced-motion` support, keyboard-dismissable overlays
- **Zero dependencies** — only Google Fonts (Poppins + Space Grotesk) loaded via CDN

---

## 📁 Project Structure

```
Chandru/
├── index.html          # Home (hero, about preview, projects, logos, skills, process, testimonials, CTA)
├── about.html          # Intro, education + career timeline, mission/vision/values, languages
├── projects.html       # Detailed project cards (role, tools, result)
├── logos.html          # Logo grid with lightbox preview
├── gallery.html        # Filterable masonry gallery + video section
├── experience.html     # Experience timeline, certifications, leadership
├── contact.html        # Animated form, contact info, map placeholder
├── README.md
├── css/
│   ├── style.css       # Core design system, layout & components
│   ├── animations.css  # Keyframes & motion utilities
│   └── responsive.css  # Breakpoints
├── js/
│   ├── script.js       # Core interactions (loader, nav, reveal, counters, form, lightbox)
│   └── animation.js    # Advanced motion (particles, typing, parallax, tilt, magnetic)
└── assets/
    ├── profile/        # chandru.jpg  ← profile photo (already added)
    ├── resume/         # Chandru-M-Resume.pdf (already added)
    ├── logos/          # ← drop logo images here
    ├── gallery/        # ← drop AI art / posters / stills here
    ├── images/         # ← general images
    ├── videos/         # ← video files / thumbnails
    └── certificates/   # ← certificate images / PDFs
```

---

## 🚀 Run it

No build tools needed.

**Option A — just open it**
Double-click `index.html`.

**Option B — local server (recommended, avoids any file:// quirks)**
```bash
# Python 3
python -m http.server 5500
# then visit http://localhost:5500
```
or use the VS Code **Live Server** extension.

---

## 🖼 Replacing the placeholders

Everything below is wired up — just swap the asset and you're done.

| What | Where | How |
|------|-------|-----|
| **Profile photo** | `assets/profile/chandru.jpg` | Replace the file (keep the name) or update the `src` in the hero / about sections. |
| **Resume PDF** | `assets/resume/Chandru-M-Resume.pdf` | Replace the file (keep the name) — all "Download Resume" links point here. |
| **Logos** | `assets/logos/` | In `logos.html`, swap each `<div class="lg-ph">XX</div>` for `<img src="assets/logos/your-logo.png" alt="Brand name">`. |
| **Gallery images** | `assets/gallery/` | In `gallery.html`, replace each `<div class="ph-box">…</div>` with `<img src="assets/gallery/your-image.jpg" alt="…">`. The lightbox auto-detects real images. |
| **Videos** | `assets/videos/` | In `gallery.html`, swap a `.video-card` for an `<iframe>` (YouTube embed) or a `<video>` element. |
| **Certificates** | `assets/certificates/` | Link from the cert cards in `experience.html` if you want downloadable proofs. |
| **Social links** | all pages (header/footer) | Update the Instagram / YouTube / Behance `href`s (LinkedIn & email are already real). |

> 💡 The gallery lightbox and logo previews already show a styled "placeholder" message until you add a real `<img>`, so nothing looks broken before you upload.

---

## 🎨 Customising the look

All design tokens live at the top of `css/style.css` under `:root`:

```css
--accent:  #e50914;   /* primary red       */
--accent-2:#ff2e63;   /* secondary pink/red */
--bg:      #050505;   /* page background    */
--card:    #101010;   /* card surface       */
```

Change those values to re-skin the entire site instantly. Fonts are set with `--font-body` (Poppins) and `--font-display` (Space Grotesk).

---

## ♿ Accessibility & performance

- Semantic landmarks (`header`, `main`, `nav`, `footer`, `article`)
- `aria-label`s on icon-only buttons & links
- Respects `prefers-reduced-motion` (disables heavy animations)
- Lazy, throttled scroll handlers and `IntersectionObserver` for reveals
- No render-blocking JS (scripts at end of `<body>`)

---

## 📇 Contact details (baked into the site)

- **Email:** chandrumurugadass03052004@gmail.com
- **Phone:** +91 79046 12672
- **LinkedIn:** linkedin.com/in/chandru-m-a85b4824b
- **Location:** Bangalore, India

---

*Designed & built as a unique, premium portfolio — inspired by cinematic creative-studio aesthetics, not copied from any template.*
