/* =====================================================================
   CHANDRU M — Premium Portfolio
   script.js — Core interactions (UI, navigation, reveal, forms)
   ===================================================================== */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Loading screen ---------- */
  function initLoader() {
    const loader = $("#loader");
    if (!loader) {
      document.body.classList.add("page-loaded");
      return;
    }
    const bar = $(".loader-bar i", loader);
    const pct = $(".loader-pct", loader);
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 16 + 6;
      if (p >= 100) { p = 100; clearInterval(tick); finish(); }
      if (bar) bar.style.width = p + "%";
      if (pct) pct.textContent = String(Math.floor(p)).padStart(3, "0") + " %";
    }, 130);

    function finish() {
      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.classList.add("page-loaded");
      }, 350);
    }
    // Safety fallback
    window.addEventListener("load", () => {
      setTimeout(() => {
        if (!loader.classList.contains("hidden")) {
          clearInterval(tick);
          if (bar) bar.style.width = "100%";
          finish();
        }
      }, 1600);
    });
  }

  /* ---------- 2. Header scroll state ---------- */
  function initHeader() {
    const header = $(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. Mobile menu ---------- */
  function initMenu() {
    const toggle = $(".menu-toggle");
    const links = $(".nav-links");
    if (!toggle || !links) return;
    const close = () => { toggle.classList.remove("open"); links.classList.remove("open"); document.body.style.overflow = ""; };
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".nav-links a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- 4. Scroll progress bar ---------- */
  function initProgress() {
    const bar = $(".scroll-progress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = (scrolled * 100).toFixed(2) + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------- 5. Custom cursor ---------- */
  function initCursor() {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    if (!dot || !ring) return;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    const hoverSel = "a, button, .btn, .project-card, .logo-card, .skill-card, .social-ico, .filter-btn, input, textarea, .m-item, .video-card";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverSel)) { ring.classList.add("hover"); dot.classList.add("hover"); }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverSel)) { ring.classList.remove("hover"); dot.classList.remove("hover"); }
    });
  }

  /* ---------- 6. Mouse spotlight ---------- */
  function initSpotlight() {
    const spot = $(".fx-spotlight");
    if (!spot || prefersReduced) return;
    document.addEventListener("mousemove", (e) => {
      spot.style.setProperty("--mx", e.clientX + "px");
      spot.style.setProperty("--my", e.clientY + "px");
    });
  }

  /* ---------- 7. Scroll reveal (IntersectionObserver) ---------- */
  function initReveal() {
    const els = $$("[data-reveal]");
    if (!("IntersectionObserver" in window) || prefersReduced) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- 8. Counter animations ---------- */
  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split(".")[1] || "").length;
      const dur = 1600; const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = el.dataset.count;
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { counters.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------- 9. Skill bars ---------- */
  function initBars() {
    const bars = $$(".bar .fill");
    if (!bars.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.style.width = (en.target.dataset.val || 0) + "%"; io.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    bars.forEach((b) => io.observe(b));
  }

  /* ---------- 10. Button ripple ---------- */
  function initRipple() {
    $$(".btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const rect = btn.getBoundingClientRect();
        const r = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        r.className = "ripple";
        r.style.width = r.style.height = size + "px";
        r.style.left = e.clientX - rect.left - size / 2 + "px";
        r.style.top = e.clientY - rect.top - size / 2 + "px";
        btn.appendChild(r);
        setTimeout(() => r.remove(), 650);
      });
    });
  }

  /* ---------- 11. Active nav link ---------- */
  function initActiveNav() {
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$(".nav-links a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === page || (page === "" && href === "index.html")) a.classList.add("active");
    });
  }

  /* ---------- 12. Back to top ---------- */
  function initToTop() {
    const btn = $(".to-top");
    if (!btn) return;
    window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 600), { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- 13. Gallery filters ---------- */
  function initFilters() {
    const btns = $$(".filter-btn");
    const items = $$("[data-cat]");
    if (!btns.length) return;
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        items.forEach((it) => {
          const show = f === "all" || it.dataset.cat === f;
          it.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- 14. Lightbox ---------- */
  function initLightbox() {
    const triggers = $$("[data-lightbox]");
    const videoCards = $$(".video-card[data-video-src]");
    if (!triggers.length && !videoCards.length) return;
    
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><div class="lb-body"></div><div class="lb-cap"></div>';
    document.body.appendChild(box);
    const body = $(".lb-body", box), cap = $(".lb-cap", box);
    
    const close = () => {
      const video = body.querySelector("video");
      if (video) video.pause();
      box.classList.remove("open");
      document.body.style.overflow = "";
      body.innerHTML = "";
    };
    
    triggers.forEach((t) => {
      t.addEventListener("click", () => {
        const img = t.querySelector("img");
        const title = t.dataset.lightbox || "";
        body.innerHTML = img && img.getAttribute("src")
          ? `<img src="${img.src}" alt="${img.alt || ""}">`
          : `<div class="lb-ph">Image placeholder — replace in /assets</div>`;
        cap.textContent = title;
        box.classList.add("open"); document.body.style.overflow = "hidden";
      });
    });

    videoCards.forEach((card) => {
      card.addEventListener("click", () => {
        const src = card.dataset.videoSrc || "";
        const title = card.dataset.videoTitle || "";
        if (src) {
          body.innerHTML = `<video id="modal-video" src="${src}" controls autoplay playsinline style="max-width: 100%; max-height: 80vh; display: block; margin: 0 auto; border-radius: var(--radius); box-shadow: var(--shadow-lg);"></video>`;
          cap.textContent = title;
          box.classList.add("open"); document.body.style.overflow = "hidden";

          // Add error listener to fallback if the video returns 404/fails to load
          const videoEl = $("#modal-video", body);
          if (videoEl) {
            videoEl.addEventListener("error", () => {
              console.warn("Video failed to load. Falling back to public sample backdrop video.");
              videoEl.src = "https://assets.mixkit.co/videos/preview/mixkit-dancing-in-the-street-light-under-the-rain-40018-large.mp4";
            });
          }
        }
      });
    });
    
    box.addEventListener("click", (e) => { if (e.target === box || e.target.closest(".lb-close")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- 15. Contact form (demo handler) ---------- */
  function initForm() {
    const form = $("#contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = $(".form-note", form.parentNode) || $(".form-note");
      const btn = $("button[type=submit]", form);
      if (btn) { btn.disabled = true; btn.dataset.txt = btn.textContent; btn.textContent = "Sending…"; }
      setTimeout(() => {
        if (note) { note.classList.add("ok"); note.textContent = "✓ Thanks! Your message has been noted. Chandru will get back to you soon."; }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.txt || "Send Message"; }
      }, 900);
    });
  }

  /* ---------- 16. Footer year ---------- */
  function initYear() { $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear())); }

  /* ---------- 17. Smooth in-page anchors ---------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = $(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });
  }

  /* ---------- 18. Video file loading error fallbacks ---------- */
  function initVideoFallbacks() {
    const fallbackUrl = "https://assets.mixkit.co/videos/preview/mixkit-dancing-in-the-street-light-under-the-rain-40018-large.mp4";
    $$("video").forEach((video) => {
      if (video.error) {
        useFallback(video);
      }
      video.addEventListener("error", () => useFallback(video));
    });
    
    function useFallback(el) {
      if (el.src !== fallbackUrl) {
        console.warn("Falling back video source for element:", el.src);
        el.src = fallbackUrl;
        el.load();
        el.play().catch(() => {});
      }
    }
  }

  /* ---------- init ---------- */
  function init() {
    initLoader();
    initHeader();
    initMenu();
    initProgress();
    initCursor();
    initSpotlight();
    initReveal();
    initCounters();
    initBars();
    initRipple();
    initActiveNav();
    initToTop();
    initFilters();
    initLightbox();
    initForm();
    initYear();
    initAnchors();
    initVideoFallbacks();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
