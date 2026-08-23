/* ============================================================
   DARSHAN PHOTO ART GALLERY — ANIMATIONS & INTERACTION (animations.js)
   ============================================================ */

// Custom Cursor Animation
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }

  if (window.matchMedia('(hover: hover)').matches) {
    requestAnimationFrame(animateRing);
  }
}

// Scroll Reveal with IntersectionObserver
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible), .reveal-scale:not(.visible)');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  els.forEach(el => obs.observe(el));
}

// Number Counter Animation
function initCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseFloat(el.dataset.value);
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1800, 1);
      el.textContent = Math.floor(target * progress).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// Scroll Handler (Navbar blur, scroll progress, back-to-top toggle)
function initScrollListeners() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
      if (window.scrollY > 30) {
        nav.classList.add('bg-noir-950/90', 'backdrop-blur-2xl', 'shadow-2xl', 'py-2.5');
      } else {
        nav.classList.remove('bg-noir-950/90', 'backdrop-blur-2xl', 'shadow-2xl', 'py-2.5');
      }
    }

    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
      const pct = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
      scrollProgress.style.width = pct + '%';
    }

    const btt = document.getElementById('backToTop');
    if (btt) {
      if (window.scrollY > 400) btt.style.display = 'flex';
      else btt.style.display = 'none';
    }
  });

  const bttBtn = document.getElementById('backToTop');
  if (bttBtn) {
    bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}
