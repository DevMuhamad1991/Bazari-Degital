




  
/* =====================================================
       ULTRA PRO TEAM SECTION — main.js
===================================================== */

'use strict';


// ===== LOAD NAVBAR =====
const base = window.location.pathname.includes('Bazari-Degital') ? '/Bazari-Degital' : '';
fetch(base + 'assect/navbar/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-placeholder').innerHTML = html;

    // Active link
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Smooth hover
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', function () {
        this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
      });
      link.addEventListener('mouseleave', function () {
        this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
      });
    });

    // Navbar drag scroll mobile
    const navList = document.querySelector('.nav-links');
    let isDown = false, startX, scrollLeft;

    navList.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - navList.offsetLeft;
      scrollLeft = navList.scrollLeft;
    });
    navList.addEventListener('touchend', () => { isDown = false; });
    navList.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - navList.offsetLeft;
      navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });

    navList.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - navList.offsetLeft;
      scrollLeft = navList.scrollLeft;
      navList.style.cursor = 'grabbing';
    });
    navList.addEventListener('mouseleave', () => { isDown = false; navList.style.cursor = 'default'; });
    navList.addEventListener('mouseup', () => { isDown = false; navList.style.cursor = 'default'; });
    navList.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - navList.offsetLeft;
      navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  });




/* ─────────────────────────────────────────
   1.  AOS — Animate On Scroll (lightweight)
───────────────────────────────────────── */
(function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseInt(el.dataset.aosDelay || 0, 10);
          setTimeout(() => el.classList.add('aos-animate'), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
})();




/* ─────────────────────────────────────────
   2.  COUNTER — عەدەدەکانی ستات ژمارەیان
       بە ئەنیمەیشن دێنە ئاست
───────────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;

  // easeOutCubic
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 2000; // ms
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(ease(progress) * target);

      el.textContent = value.toLocaleString('ar-EG'); // ئەرەبی-کوردی ژمارە
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('ar-EG');
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach((el) => observer.observe(el));
})();

/* ─────────────────────────────────────────
   3.  CURSOR GLOW — شوێنی ماوسی موبایل
       نییە، تەنها دێسکتۆپ
───────────────────────────────────────── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // touch device

  const glow = document.createElement('div');
  glow.id    = 'cursor-glow';
  Object.assign(glow.style, {
    position:      'fixed',
    width:         '520px',
    height:        '520px',
    borderRadius:  '50%',
    background:    'radial-gradient(circle, rgba(87,99,535,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex:        '9999',
    transform:     'translate(-50%,-50%)',
    transition:    'opacity .4s ease',
    opacity:       '0',
    top:           '0',
    left:          '0',
  });
  document.body.appendChild(glow);

  let raf;
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    glow.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

  function loop() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    raf = requestAnimationFrame(loop);
  }
  loop();
})();



/* ─────────────────────────────────────────
   4.  CARD TILT — کارتەکان لەگەڵ ماوس
       دەلووڕن (subtle 3D)
───────────────────────────────────────── */
(function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.team-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -6;   // درجە
      const tiltY  = dx *  6;

      card.style.transform = `
        translateY(-16px)
        scale(1.015)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
      `;
      card.style.transition = 'transform .1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
    });
  });
})();


/* ─────────────────────────────────────────
   5.  RIPPLE — کلیک لەسەر دوگمەکان
───────────────────────────────────────── */
(function initRipple() {
  const btns = document.querySelectorAll('.btn-cta, .btn-ghost');

  btns.forEach((btn) => {
    btn.style.position  = 'relative';
    btn.style.overflow  = 'hidden';

    btn.addEventListener('click', (e) => {
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement('span');
      Object.assign(ripple.style, {
        position:     'absolute',
        width:        size + 'px',
        height:       size + 'px',
        left:         x + 'px',
        top:          y + 'px',
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

  // keyframe
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }
})();


/* ─────────────────────────────────────────
   6.  STAT PARTICLE — ئەستێرەی بچووک
       لەسەر ستاتەکان دەتوپن
───────────────────────────────────────── */
(function initStatParticles() {
  const stats = document.querySelectorAll('.stat-item');

  stats.forEach((item) => {
    item.addEventListener('mouseenter', () => spawnParticles(item));
  });

  function spawnParticles(parent) {
    const colors = ['#3b82f6','#22d3ee','#60a5fa','#bfdbfe'];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('span');
      const size  = Math.random() * 5 + 3;
      const angle = Math.random() * 360;
      const dist  = Math.random() * 60 + 30;
      const color = colors[Math.floor(Math.random() * colors.length)];

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
        transition:   `transform ${Math.random()*.4+.4}s ease-out, opacity ${Math.random()*.3+.4}s ease-out`,
      });

      parent.style.overflow = 'visible';
      parent.appendChild(p);

      requestAnimationFrame(() => {
        const rad = angle * Math.PI / 180;
        p.style.transform = `translate(calc(-50% + ${Math.cos(rad)*dist}px), calc(-50% + ${Math.sin(rad)*dist}px))`;
        p.style.opacity   = '0';
      });

      setTimeout(() => { p.remove(); parent.style.overflow = 'hidden'; }, 700);
    }
  }
})();

  
