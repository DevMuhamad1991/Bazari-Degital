// ── COUNTER ANIMATION
function animCount(id, end, suffix = '') {
  const el = document.getElementById(id);
  let n = 0;
  const step = end / 60;
  const t = setInterval(() => {
    n = Math.min(n + step, end);
    el.textContent = Math.floor(n).toLocaleString() + suffix;
    if (n >= end) clearInterval(t);
  }, 25);
}

setTimeout(() => {
  animCount('count1', 1247);
  animCount('count2', 5200);
  animCount('count3', 99, '%');
}, 400);

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
