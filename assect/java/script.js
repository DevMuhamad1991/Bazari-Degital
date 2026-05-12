// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.ceil(target / 80);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 20);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(r => revealObserver.observe(r));

// ===== NAV SMOOTH EFFECT =====
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  // تەنیا بەپێی پەڕەی ئێستا active بکە، click save مەکە
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }

  link.addEventListener('mouseenter', function () {
    this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
  });

  link.addEventListener('mouseleave', function () {
    this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
  });
});


navLinks.forEach(link => {
  link.addEventListener('mouseenter', function () {
    this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
  });

  link.addEventListener('mouseleave', function () {
    this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
  });

  link.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});



