/* =====================================================
       ULTRA PRO TEAM SECTION — main.js
       v2.0 — چاکسازیکراو و بێ‌کێشە
===================================================== */

'use strict';

/* ─────────────────────────────────────────
   0.  LOAD NAVBAR
───────────────────────────────────────── */
(function initNavbar() {
  const base = window.location.pathname.includes('Bazari-Degital') ? '/Bazari-Degital' : '';

  fetch(base + 'assect/navbar/nav.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;

      // ── Active link ──────────────────────────────
      const navLinks   = document.querySelectorAll('.nav-link');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
          setTimeout(() => {
            link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }, 100);
        }
      });

      // ── Navbar scroll class ──────────────────────
      const navbar = document.getElementById('navbar');
      if (navbar) {
        window.addEventListener('scroll', () => {
          navbar.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
      }

      // ── Smooth hover transitions ─────────────────
      navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
          this.style.transition = 'color .3s ease, background .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease';
        });
        link.addEventListener('mouseleave', function () {
          this.style.transition = 'color .3s ease, background .3s ease, transform .3s ease, box-shadow .3s ease';
        });
      });

      // ── Drag / touch scroll (mobile navbar) ─────
      const navList = document.querySelector('.nav-links');
      if (!navList) return;

      let isDown = false, startX, scrollLeft;

      navList.addEventListener('touchstart', e => {
        isDown    = true;
        startX    = e.touches[0].pageX - navList.offsetLeft;
        scrollLeft = navList.scrollLeft;
      }, { passive: true });

      navList.addEventListener('touchend',  () => { isDown = false; }, { passive: true });

      navList.addEventListener('touchmove', e => {
        if (!isDown) return;
        const x = e.touches[0].pageX - navList.offsetLeft;
        navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
      }, { passive: true });

      navList.addEventListener('mousedown', e => {
        isDown      = true;
        startX      = e.pageX - navList.offsetLeft;
        scrollLeft  = navList.scrollLeft;
        navList.style.cursor = 'grabbing';
      });

      navList.addEventListener('mouseleave', () => { isDown = false; navList.style.cursor = 'default'; });
      navList.addEventListener('mouseup',    () => { isDown = false; navList.style.cursor = 'default'; });

      navList.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - navList.offsetLeft;
        navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
      });
    })
    .catch(err => console.warn('[Navbar] فێچ سەرکەوتوو نەبوو:', err));
})();


/* ─────────────────────────────────────────
   1.  AOS — Animate On Scroll (سووکەلەی)
───────────────────────────────────────── */
(function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = parseInt(el.dataset.aosDelay || 0, 10);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────
   2.  COUNTER — ئەنیمەیشنی ژمارەی ستات
───────────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;

  const ease = t => 1 - Math.pow(1 - t, 3); // easeOutCubic

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start    = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(ease(progress) * target).toLocaleString('ar-EG');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('ar-EG');
    };

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────
   3.  CURSOR GLOW — تەنها دێسکتۆپ
       نەرم بەدوای ماوسدا دەچێت (lerp)
───────────────────────────────────────── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (document.getElementById('cursor-glow')) return;

  const glow = document.createElement('div');
  glow.id    = 'cursor-glow';

  Object.assign(glow.style, {
    position:     'fixed',
    width:        '520px',
    height:       '520px',
    borderRadius: '50%',
    background:   'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)',
    pointerEvents:'none',
    zIndex:       '9999',
    top:          '0',
    left:         '0',
    willChange:   'transform',
    opacity:      '0',
    transition:   'opacity .4s ease',
  });

  document.body.appendChild(glow);

  let mx = window.innerWidth  / 2;
  let my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let running = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    glow.style.opacity = '1';

    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function loop() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;

    glow.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;

    if (Math.abs(mx - cx) > 0.5 || Math.abs(my - cy) > 0.5) {
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }
})();


/* ─────────────────────────────────────────
   4.  CARD TILT — 3D سووکەلەی بۆ کارتەکان
───────────────────────────────────────── */
(function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const dx    = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const dy    = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

      card.style.transition = 'transform .1s ease';
      card.style.transform  = `translateY(-16px) scale(1.015) rotateX(${dy * -6}deg) rotateY(${dx * 6}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
      card.style.transform  = '';
    });
  });
})();


/* ─────────────────────────────────────────
   5.  RIPPLE — کلیک لەسەر دوگمەکان
───────────────────────────────────────── */
(function initRipple() {
  // ── keyframe یەکجاریک زیادبکە ────────────
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }`;
    document.head.appendChild(s);
  }

  document.querySelectorAll('.btn-cta, .btn-ghost').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement('span');
      Object.assign(ripple.style, {
        position:     'absolute',
        width:        size + 'px',
        height:       size + 'px',
        left:         (e.clientX - rect.left - size / 2) + 'px',
        top:          (e.clientY - rect.top  - size / 2) + 'px',
        borderRadius: '50%',
        background:   'rgba(255,255,255,0.18)',
        transform:    'scale(0)',
        animation:    'rippleAnim .6s ease-out forwards',
        pointerEvents:'none',
      });

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();


/* ─────────────────────────────────────────
   6.  STAT PARTICLES — ئەستێرەی بچووک
       لەسەر هۆڤەری ستاتەکان
───────────────────────────────────────── */
(function initStatParticles() {
  const COLORS = ['#3b82f6', '#22d3ee', '#60a5fa', '#bfdbfe'];

  function spawnParticles(parent) {
    for (let i = 0; i < 6; i++) {
      const size  = Math.random() * 5 + 3;
      const angle = Math.random() * 360;
      const dist  = Math.random() * 60 + 30;
      const dur   = (Math.random() * 0.4 + 0.4).toFixed(2);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const rad   = angle * Math.PI / 180;

      const p = document.createElement('span');
      Object.assign(p.style, {
        position:     'absolute',
        width:        size + 'px',
        height:       size + 'px',
        borderRadius: '50%',
        background:   color,
        left:         '50%',
        top:          '40%',
        pointerEvents:'none',
        zIndex:       '10',
        opacity:      '1',
        transform:    'translate(-50%,-50%)',
        transition:   `transform ${dur}s ease-out, opacity ${dur}s ease-out`,
      });

      parent.style.overflow = 'visible';
      parent.appendChild(p);

      // یەک فریم چاوەڕوان بکە پێش ئەنیمەیشن
      requestAnimationFrame(() => requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px))`;
        p.style.opacity   = '0';
      }));

      setTimeout(() => {
        p.remove();
        parent.style.overflow = 'hidden';
      }, 750);
    }
  }

  document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', () => spawnParticles(item));
  });
})();
