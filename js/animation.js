/* =====================================================================
   CHANDRU M — Premium Portfolio
   animation.js — Advanced motion (particles, typing, parallax, tilt, magnetic)
   ===================================================================== */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Typing effect (hero roles) ---------- */
  function initTyping() {
    const el = $("[data-typed]");
    if (!el) return;
    let words;
    try { words = JSON.parse(el.dataset.typed); } catch (e) { words = ["Creative Content Creator"]; }
    const out = $(".typed", el) || el;
    if (prefersReduced) { out.textContent = words[0]; return; }

    let wi = 0, ci = 0, deleting = false;
    const type = () => {
      const word = words[wi];
      out.textContent = word.slice(0, ci);
      if (!deleting) {
        if (ci < word.length) { ci++; setTimeout(type, 70 + Math.random() * 50); }
        else { deleting = true; setTimeout(type, 1500); }
      } else {
        if (ci > 0) { ci--; setTimeout(type, 35); }
        else { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 240); }
      }
    };
    type();
  }

  /* ---------- 2. Particle canvas ---------- */
  function initParticles() {
    const canvas = $("#particles");
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;
    const COUNT = window.innerWidth < 700 ? 34 : 70;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function make() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.4,
        a: Math.random() * 0.5 + 0.1,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229,9,20,${p.a})`;
        ctx.fill();
        // link nearby
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = dx * dx + dy * dy;
          if (dist < 13000) {
            ctx.strokeStyle = `rgba(229,9,20,${0.10 * (1 - dist / 13000)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    resize(); make(); draw();
    window.addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); make(); draw(); });
  }

  /* ---------- 3. Parallax (mouse + scroll) ---------- */
  function initParallax() {
    if (prefersReduced) return;
    const mouseEls = $$("[data-parallax]");
    if (mouseEls.length) {
      window.addEventListener("mousemove", (e) => {
        const cx = (e.clientX / window.innerWidth - 0.5);
        const cy = (e.clientY / window.innerHeight - 0.5);
        mouseEls.forEach((el) => {
          const depth = parseFloat(el.dataset.parallax) || 12;
          el.style.transform = `translate3d(${cx * depth}px, ${cy * depth}px, 0)`;
        });
      });
    }
    const scrollEls = $$("[data-parallax-y]");
    if (scrollEls.length) {
      window.addEventListener("scroll", () => {
        const y = window.scrollY;
        scrollEls.forEach((el) => {
          const s = parseFloat(el.dataset.parallaxY) || 0.15;
          el.style.transform = `translate3d(0, ${y * s}px, 0)`;
        });
      }, { passive: true });
    }
  }

  /* ---------- 4. Tilt cards ---------- */
  function initTilt() {
    if (prefersReduced || window.matchMedia("(hover: none)").matches) return;
    $$(".tilt").forEach((card) => {
      const strength = parseFloat(card.dataset.tilt) || 8;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- 5. Magnetic buttons ---------- */
  function initMagnetic() {
    if (prefersReduced || window.matchMedia("(hover: none)").matches) return;
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- 6. Duplicate marquee content for seamless loop ---------- */
  function initMarquee() {
    $$(".marquee-track").forEach((track) => {
      if (track.children.length === 1) track.appendChild(track.firstElementChild.cloneNode(true));
    });
  }

  function init() {
    initTyping();
    initParticles();
    initParallax();
    initTilt();
    initMagnetic();
    initMarquee();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
