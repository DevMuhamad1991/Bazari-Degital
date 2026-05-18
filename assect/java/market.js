// دۆخی سڵایدەکانconst st = {};const st = {};

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

// ── تاچ + ماوس سوايپ ──
document.querySelectorAll('.img-wrap').forEach(wrap => {
  const id = wrap.id.replace('-wrap', '');
  st[id] = 0;
  let sx = 0, dragging = false;

  // تاچ (مۆبايل)
  wrap.addEventListener('touchstart', e => {
    sx = e.touches[0].clientX;
  }, { passive: true });

  wrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    const n  = document.getElementById(id + '-slides').children.length;
    if (dx < -40 && st[id] < n - 1) go(id, st[id] + 1);
    if (dx >  40 && st[id] > 0)     go(id, st[id] - 1);
  }, { passive: true });

  // ماوس (دێسكتۆپ)
  wrap.addEventListener('mousedown', e => {
    sx = e.clientX;
    dragging = true;
  });
  wrap.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - sx;
    const n  = document.getElementById(id + '-slides').children.length;
    if (dx < -40 && st[id] < n - 1) go(id, st[id] + 1);
    if (dx >  40 && st[id] > 0)     go(id, st[id] - 1);
  });
  wrap.addEventListener('mouseleave', () => { dragging = false; });
});

// ── مۆداڵ ──
const modal       = document.getElementById('imageModal');
const modalSlides = document.getElementById('modalSlides');
const modalDots   = document.getElementById('modalDots');
let curCard = null;
let curIdx  = 0;

// كليك لە img-wrap بۆ كردنەوەى مۆداڵ
document.querySelectorAll('.img-wrap').forEach(wrap => {
  wrap.addEventListener('click', e => {
    // ئەگەر كليك لە دوگمەى ئارۆ بوو، مۆداڵ نەكرێتەوە
    if (e.target.classList.contains('arr') || e.target.classList.contains('dot')) return;

    const id = wrap.id.replace('-wrap', '');
    const srcSlides = Array.from(
      document.getElementById(id + '-slides').children
    );

    modalSlides.innerHTML = '';
    modalDots.innerHTML   = '';

    srcSlides.forEach((slide, i) => {
      // كلۆنى سڵايد
      const clone = slide.cloneNode(true);
      clone.classList.add('modal-slide');
      modalSlides.appendChild(clone);

      // خاڵى مۆداڵ
      const dot = document.createElement('div');
      dot.className = 'modal-dot' + (i === (st[id] || 0) ? ' on' : '');
      dot.addEventListener('click', ev => {
        ev.stopPropagation();
        goModal(i);
      });
      modalDots.appendChild(dot);
    });

    curCard = id;
    curIdx  = st[id] || 0;
    goModal(curIdx);
    modal.classList.add('show');
  });
});

function goModal(idx) {
  const n = modalSlides.children.length;
  if (idx < 0 || idx >= n) return;
  curIdx = idx;
  modalSlides.style.transform = `translateX(-${idx * 100}%)`;
  modalDots.querySelectorAll('.modal-dot')
    .forEach((d, i) => d.classList.toggle('on', i === idx));
}

// دوگمەى ئارۆى مۆداڵ
document.getElementById('modalPrev').addEventListener('click', e => {
  e.stopPropagation();
  goModal(curIdx - 1);
});
document.getElementById('modalNext').addEventListener('click', e => {
  e.stopPropagation();
  goModal(curIdx + 1);
});

// داخستنى مۆداڵ
document.getElementById('closeModal').addEventListener('click', () => {
  modal.classList.remove('show');
});
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('show');
});

// سوايپ لە ناو مۆداڵ (مۆبايل)
let msx = 0;
modalSlides.addEventListener('touchstart', e => {
  msx = e.touches[0].clientX;
}, { passive: true });
modalSlides.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - msx;
  if (Math.abs(dx) > 50) goModal(dx < 0 ? curIdx + 1 : curIdx - 1);
}, { passive: true });

// ماوس سوايپ لە ناو مۆداڵ (دێسكتۆپ)
let mdragging = false, mmsx = 0;
modalSlides.addEventListener('mousedown', e => { mmsx = e.clientX; mdragging = true; });
modalSlides.addEventListener('mouseup', e => {
  if (!mdragging) return;
  mdragging = false;
  const dx = e.clientX - mmsx;
  if (Math.abs(dx) > 50) goModal(dx < 0 ? curIdx + 1 : curIdx - 1);
});
modalSlides.addEventListener('mouseleave', () => { mdragging = false; });

// كيبۆرد
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('show')) return;
  if (e.key === 'ArrowLeft')  goModal(curIdx + 1);
  if (e.key === 'ArrowRight') goModal(curIdx - 1);
  if (e.key === 'Escape')     modal.classList.remove('show');
});

// ── كڕين — واتساپ ──
function buyProduct(name, price) {
  if (confirm(`تۆ دەتەوێت "${name}" بە $${price} بكڕيت؟`)) {
    const phone   = "964XXXXXXXXX"; // ژمارەى واتساپت لێرە بنوسە
    const message = encodeURIComponent(
      `سڵاو، من حەز بە كڕينى ${name} بە $${price} دەكەم`
    );
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

// ── چيپەكان ──
document.querySelectorAll('#cat-chips .chip').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('#cat-chips .chip')
      .forEach(x => x.classList.remove('active-blue'));
    c.classList.add('active-blue');
  });
});

document.querySelectorAll('#sort-chips .chip').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('#sort-chips .chip')
      .forEach(x => x.classList.remove('active-green'));
    c.classList.add('active-green');
  });
});