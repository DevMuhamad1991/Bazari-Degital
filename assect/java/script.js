


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

// ===== LOAD NAVBAR =====
const base = window.location.pathname.includes('Bazari-Degital') ? '/Bazari-Degital' : '';
fetch(base + 'index.html')
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