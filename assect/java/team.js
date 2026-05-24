'use strict';

/* ─────────────────────────────────────────────────
   0. NAVBAR
───────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || href === window.location.pathname) {
      link.classList.add('active');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.transition = 'color .3s ease,background .3s ease,transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease';
    });
    link.addEventListener('mouseleave', function () {
      this.style.transition = 'color .3s ease,background .3s ease,transform .3s ease,box-shadow .3s ease';
    });
  });

  const navList = document.querySelector('.nav-links');
  if (!navList) return;
  let isDown = false, startX = 0, scrollLeft = 0;

  navList.addEventListener('touchstart', e => {
    isDown = true;
    startX = e.touches[0].pageX - navList.offsetLeft;
    scrollLeft = navList.scrollLeft;
  }, { passive: true });
  navList.addEventListener('touchend', () => { isDown = false; }, { passive: true });
  navList.addEventListener('touchmove', e => {
    if (!isDown) return;
    const x = e.touches[0].pageX - navList.offsetLeft;
    navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
  }, { passive: true });

  navList.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - navList.offsetLeft;
    scrollLeft = navList.scrollLeft;
    navList.style.cursor = 'grabbing';
  });
  navList.addEventListener('mouseleave', () => { isDown = false; navList.style.cursor = 'default'; });
  navList.addEventListener('mouseup', () => { isDown = false; navList.style.cursor = 'default'; });
  navList.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - navList.offsetLeft;
    navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
})();


/* ─────────────────────────────────────────────────
   1. AOS — Animate On Scroll
───────────────────────────────────────────────── */
(function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.aosDelay || 0, 10);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────────────
   2. COUNTER ANIMATION
───────────────────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;

  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start    = performance.now();

    (function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(ease(progress) * target);
      el.textContent = value.toLocaleString('ar-EG');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('ar-EG');
    })(performance.now());
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────────────
   3. CARD TILT — 3D
───────────────────────────────────────────────── */
(function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.team-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -6;
      const tiltY = dx *  6;
      card.style.transform  = `translateY(-16px) scale(1.015) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      card.style.transition = 'transform .1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease, border-color .5s ease, background .5s ease';
    });
  });
})();


/* ─────────────────────────────────────────────────
   4. RIPPLE — دوگمەکان
───────────────────────────────────────────────── */
(function initRipple() {
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes rippleAnim { to { transform:scale(1); opacity:0; } }`;
    document.head.appendChild(s);
  }

  document.querySelectorAll('.btn-cta, .btn-ghost').forEach(btn => {
    btn.addEventListener('click', e => {
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement('span');
      Object.assign(ripple.style, {
        position:      'absolute',
        width:         size + 'px',
        height:        size + 'px',
        left:          x + 'px',
        top:           y + 'px',
        borderRadius:  '50%',
        background:    'rgba(255,255,255,0.18)',
        transform:     'scale(0)',
        animation:     'rippleAnim .6s ease-out forwards',
        pointerEvents: 'none',
      });

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
  });
})();


/* ─────────────────────────────────────────────────
   5. STAT PARTICLES
───────────────────────────────────────────────── */
(function initStatParticles() {
  const stats  = document.querySelectorAll('.stat-item');
  const colors = ['#3b82f6','#22d3ee','#60a5fa','#bfdbfe'];

  function spawnParticles(parent) {
    for (let i = 0; i < 6; i++) {
      const p     = document.createElement('span');
      const size  = Math.random() * 5 + 3;
      const angle = Math.random() * 360;
      const dist  = Math.random() * 60 + 30;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dur   = (Math.random() * 0.4 + 0.4).toFixed(2) + 's';
      const odur  = (Math.random() * 0.3 + 0.4).toFixed(2) + 's';

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
        transition:   `transform ${dur} ease-out, opacity ${odur} ease-out`,
      });

      parent.style.overflow = 'visible';
      parent.appendChild(p);

      requestAnimationFrame(() => {
        const rad = angle * Math.PI / 180;
        p.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px))`;
        p.style.opacity   = '0';
      });

      setTimeout(() => {
        p.remove();
        parent.style.overflow = 'hidden';
      }, 800);
    }
  }

  stats.forEach(item => {
    item.addEventListener('mouseenter', () => spawnParticles(item));
  });
})();
