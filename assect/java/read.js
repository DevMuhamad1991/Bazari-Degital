// ===== LOAD NAVBAR =====
const base = window.location.pathname.includes('Bazari-Degital') ? '/Bazari-Degital' : '';
fetch(base + 'assect/navbar/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-placeholder').innerHTML = html;

    // Active link
    const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'read.html';
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
// ── FILTER
function filterCards(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.review-card').forEach(c => {
    if (cat === 'all' || (c.dataset.cat || '').includes(cat)) {
      c.style.display = '';
      c.style.animation = 'cardIn .4s ease';
    } else {
      c.style.display = 'none';
    }
  });
}

// ── LIKE
function likeCard(btn) {
  btn.classList.toggle('liked');
  const m = btn.textContent.match(/\((\d+)\)/);
  if (m) {
    const n = btn.classList.contains('liked') ? +m[1] + 1 : +m[1] - 1;
    btn.textContent = btn.textContent.replace(/\(\d+\)/, `(${n})`);
  }
}

// ── STARS
let selStars = 0;
function setStars(n) {
  selStars = n;
  document.querySelectorAll('#starSel span').forEach((s, i) => {
    s.classList.toggle('sel', i < n);
  });
}

// ── SUBMIT
function submitReview() {
  const txt = document.querySelector('.write-input').value.trim();
  if (!selStars) { showToast('⚠️ تکایە ئەستێرە هەڵبژێرە!'); return; }
  if (!txt)      { showToast('⚠️ تکایە رێتینگەکەت بنووسە!'); return; }
  showToast('✅ رێتینگەکەت بە سەرکەوتوویی نێردرا!');
  document.querySelector('.write-input').value = '';
  setStars(0);
}

// ── TOAST
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
