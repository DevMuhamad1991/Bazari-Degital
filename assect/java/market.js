// ── دۆخی سڵایدەکان ──
const st = {};

// ── گۆڕینی سڵاید ──
function go(id, idx) {
  const slidesEl = document.getElementById(id + '-slides');
  if (!slidesEl) return;
  const n = slidesEl.children.length;
  if (idx < 0 || idx >= n) return;
  st[id] = idx;
  slidesEl.style.transform = `translateX(-${idx * 100}%)`;
  const dotsEl = document.getElementById(id + '-dots');
  if (dotsEl) {
    dotsEl.querySelectorAll('.dot')
      .forEach((d, i) => d.classList.toggle('on', i === idx));
  }
}

// ── دوگمەى ئارۆ چەپ و ڕاست ──
document.querySelectorAll('.arr').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const id  = btn.dataset.c;
    const dir = +btn.dataset.dir;
    go(id, (st[id] || 0) + dir);
  });
});

// ── خاڵەكان ──
document.querySelectorAll('.dot').forEach(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
    go(el.dataset.c, +el.dataset.i);
  });
});

// ── تاچ + ماوس (سوايپ + تاپ بۆ مۆداڵ) ──
document.querySelectorAll('.img-wrap').forEach(wrap => {
  const id = wrap.id.replace('-wrap', '');
  st[id] = 0;

  let startX = 0;
  let moved  = false;

  wrap.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    moved  = false;
  }, { passive: true });

  wrap.addEventListener('touchmove', e => {
    if (Math.abs(e.touches[0].clientX - startX) > 8) moved = true;
  }, { passive: true });

  wrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (!moved) {
      openModal(id);
    } else {
      const n = document.getElementById(id + '-slides').children.length;
      if (dx < -40 && st[id] < n - 1) go(id, st[id] + 1);
      if (dx >  40 && st[id] > 0)     go(id, st[id] - 1);
    }
  }, { passive: true });

  wrap.addEventListener('mousedown', e => {
    if (e.target.closest('.arr') || e.target.closest('.dot')) return;
    startX = e.clientX;
    moved  = false;
    wrap.style.userSelect = 'none';
  });

  wrap.addEventListener('mousemove', e => {
    if (Math.abs(e.clientX - startX) > 8) moved = true;
  });

  wrap.addEventListener('mouseup', e => {
    if (e.target.closest('.arr') || e.target.closest('.dot')) return;
    wrap.style.userSelect = '';
    const dx = e.clientX - startX;
    if (!moved) {
      openModal(id);
    } else {
      const n = document.getElementById(id + '-slides').children.length;
      if (dx < -40 && st[id] < n - 1) go(id, st[id] + 1);
      if (dx >  40 && st[id] > 0)     go(id, st[id] - 1);
    }
  });

  wrap.addEventListener('mouseleave', () => {
    wrap.style.userSelect = '';
  });
});

// ── مۆداڵ ──
const modal       = document.getElementById('imageModal');
const modalSlides = document.getElementById('modalSlides');
const modalDots   = document.getElementById('modalDots');
let curCard = null;
let curIdx  = 0;

function openModal(id) {
  const srcSlides = Array.from(document.getElementById(id + '-slides').children);
  modalSlides.innerHTML = '';
  modalDots.innerHTML   = '';

  srcSlides.forEach((slide, i) => {
    const clone = slide.cloneNode(true);
    clone.classList.add('modal-slide');
    modalSlides.appendChild(clone);

    const dot = document.createElement('div');
    dot.className = 'modal-dot' + (i === (st[id] || 0) ? ' on' : '');
    dot.addEventListener('click', ev => { ev.stopPropagation(); goModal(i); });
    modalDots.appendChild(dot);
  });

  curCard = id;
  curIdx  = st[id] || 0;
  goModal(curIdx);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function goModal(idx) {
  const n = modalSlides.children.length;
  if (idx < 0 || idx >= n) return;
  curIdx = idx;
  modalSlides.style.transform = `translateX(-${idx * 100}%)`;
  modalDots.querySelectorAll('.modal-dot')
    .forEach((d, i) => d.classList.toggle('on', i === idx));
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('modalPrev').addEventListener('click', e => { e.stopPropagation(); goModal(curIdx - 1); });
document.getElementById('modalNext').addEventListener('click', e => { e.stopPropagation(); goModal(curIdx + 1); });
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

// سوايپى مۆبايل لە مۆداڵ
let msx = 0;
modalSlides.addEventListener('touchstart', e => { msx = e.touches[0].clientX; }, { passive: true });
modalSlides.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - msx;
  if (Math.abs(dx) > 50) goModal(dx < 0 ? curIdx + 1 : curIdx - 1);
}, { passive: true });

// ماوس سوايپ لە مۆداڵ
let mdragging = false, mmsx = 0;
modalSlides.addEventListener('mousedown',  e => { mmsx = e.clientX; mdragging = true; });
modalSlides.addEventListener('mouseup',    e => {
  if (!mdragging) return; mdragging = false;
  const dx = e.clientX - mmsx;
  if (Math.abs(dx) > 50) goModal(dx < 0 ? curIdx + 1 : curIdx - 1);
});
modalSlides.addEventListener('mouseleave', () => { mdragging = false; });

// كيبۆرد
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('show')) return;
  if (e.key === 'ArrowLeft')  goModal(curIdx + 1);
  if (e.key === 'ArrowRight') goModal(curIdx - 1);
  if (e.key === 'Escape')     closeModal();
});

// ── كڕين — واتساپ ──
function buyProduct(name, price) {
  if (confirm(`تۆ دەتەوێت "${name}" بە $${price} بكڕيت؟`)) {
    const phone   = "964XXXXXXXXX";
    const message = encodeURIComponent(`سڵاو، من حەز بە كڕينى ${name} بە $${price} دەكەم`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }
}

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const card = btn.closest('.card');
    if (card) buyProduct(card.dataset.product, card.dataset.price);
  });
});

// ── فلتەر + ريزكردن ──
let activeCategory = 'all';
let activeSort     = 'none';

function allCards() { return Array.from(document.querySelectorAll('.card')); }

function applyFilters() {
  const grid = document.querySelector('.cards');

  allCards().forEach(card => {
    const cat   = (card.dataset.category || '').toLowerCase();
    const catOk = activeCategory === 'all' || cat === activeCategory;
    card.style.display = catOk ? '' : 'none';
  });

  if (activeSort !== 'none' && grid) {
    const visible = allCards().filter(c => c.style.display !== 'none');
    visible.sort((a, b) => {
      const pa = parseFloat(a.dataset.price) || 0;
      const pb = parseFloat(b.dataset.price) || 0;
      return activeSort === 'asc' ? pa - pb : pb - pa;
    });
    visible.forEach(c => grid.appendChild(c));
  }

  const countEl = document.getElementById('results-count');
  if (countEl) countEl.textContent = allCards().filter(c => c.style.display !== 'none').length;
}

// دوگمەكانى [data-filter]
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('active', 'active-blue'));
    btn.classList.add('active', 'active-blue');
    activeCategory = btn.dataset.filter;
    applyFilters();
  });
});

// دوگمەكانى [data-sort]
document.querySelectorAll('[data-sort]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-sort]').forEach(x => x.classList.remove('active', 'active-green', 'sort-active'));
    btn.classList.add('active', 'sort-active');
    activeSort = btn.dataset.sort;
    applyFilters();
  });
});

// ── گەڕان ──
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    allCards().forEach(card => {
      const title = (card.dataset.product || card.querySelector('.card-title')?.textContent || '').toLowerCase();
      const cat   = (card.dataset.category || '').toLowerCase();
      const catOk = activeCategory === 'all' || cat === activeCategory;
      card.style.display = (catOk && (!q || title.includes(q))) ? '' : 'none';
    });
    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = allCards().filter(c => c.style.display !== 'none').length;
  });
}
