const st = {};

// ── گۆڕینی سڵاید ──
function go(id, idx) {
  const slidesEl = document.getElementById(id + '-slides');
  if (!slidesEl) return;
  const n = slidesEl.children.length;
  if (n === 0) return;
  
  if (idx >= n) idx = 0;
  if (idx < 0) idx = n - 1;
  
  st[id] = idx;
  slidesEl.style.transform = `translateX(-${idx * 100}%)`;
  const dotsEl = document.getElementById(id + '-dots');
  if (dotsEl) {
    dotsEl.querySelectorAll('.dot')
      .forEach((d, i) => d.classList.toggle('on', i === idx));
  }
}

// ── دوگمەى ئارۆ ──
document.querySelectorAll('.arr').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const id  = btn.dataset.c;
    const dir = +btn.dataset.dir;
    const currentIdx = st[id] || 0;
    go(id, currentIdx + dir);
  });
});

// ── خاڵەکان ──
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

  wrap.addEventListener('touchstart', e => {
    sx = e.touches[0].clientX;
  }, { passive: true });

  wrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    const n  = document.getElementById(id + '-slides').children.length;
    const currentIdx = st[id] || 0;
    
    if (dx < -40) go(id, currentIdx + 1);
    if (dx > 40) go(id, currentIdx - 1);
  }, { passive: true });

  wrap.addEventListener('mousedown', e => {
    sx = e.clientX;
    dragging = true;
  });
  wrap.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - sx;
    const n  = document.getElementById(id + '-slides').children.length;
    const currentIdx = st[id] || 0;
    
    if (dx < -40) go(id, currentIdx + 1);
    if (dx > 40) go(id, currentIdx - 1);
  });
  wrap.addEventListener('mouseleave', () => { dragging = false; });
});

// ── مۆداڵ ──
const modal       = document.getElementById('imageModal');
const modalSlides = document.getElementById('modalSlides');
const modalDots   = document.getElementById('modalDots');
let curCard = null;
let curIdx  = 0;

document.querySelectorAll('.img-wrap').forEach(wrap => {
  wrap.addEventListener('click', e => {
    if (e.target.classList.contains('arr') || e.target.classList.contains('dot')) return;

    const id = wrap.id.replace('-wrap', '');
    const srcSlides = Array.from(
      document.getElementById(id + '-slides').children
    );

    modalSlides.innerHTML = '';
    modalDots.innerHTML   = '';

    srcSlides.forEach((slide, i) => {
      const clone = slide.cloneNode(true);
      clone.classList.add('modal-slide');
      modalSlides.appendChild(clone);

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
  if (n === 0) return;
  
  if (idx >= n) idx = 0;
  if (idx < 0) idx = n - 1;
  
  curIdx = idx;
  modalSlides.style.transform = `translateX(-${idx * 100}%)`;
  modalDots.querySelectorAll('.modal-dot')
    .forEach((d, i) => d.classList.toggle('on', i === idx));
}

document.getElementById('modalPrev').addEventListener('click', e => {
  e.stopPropagation();
  goModal(curIdx - 1);
});
document.getElementById('modalNext').addEventListener('click', e => {
  e.stopPropagation();
  goModal(curIdx + 1);
});

document.getElementById('closeModal').addEventListener('click', () => {
  modal.classList.remove('show');
});
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('show');
});

let msx = 0;
modalSlides.addEventListener('touchstart', e => {
  msx = e.touches[0].clientX;
}, { passive: true });
modalSlides.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - msx;
  if (Math.abs(dx) > 50) goModal(dx < 0 ? curIdx + 1 : curIdx - 1);
}, { passive: true });

let mdragging = false, mmsx = 0;
modalSlides.addEventListener('mousedown', e => { 
  mmsx = e.clientX; 
  mdragging = true; 
});
modalSlides.addEventListener('mouseup', e => {
  if (!mdragging) return;
  mdragging = false;
  const dx = e.clientX - mmsx;
  if (Math.abs(dx) > 50) goModal(dx < 0 ? curIdx + 1 : curIdx - 1);
});
modalSlides.addEventListener('mouseleave', () => { mdragging = false; });

document.addEventListener('keydown', e => {
  if (!modal.classList.contains('show')) return;
  if (e.key === 'ArrowLeft')  goModal(curIdx + 1);
  if (e.key === 'ArrowRight') goModal(curIdx - 1);
  if (e.key === 'Escape')     modal.classList.remove('show');
});

// ── كڕين — واتساپ ──
function buyProduct(name, price) {
  if (confirm(`تۆ دەتەوێت "${name}" بە $${price} بكڕيت؟`)) {
    const phone   = "964XXXXXXXXX";
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

// ── ========== گەڕان و پاڵاوتن و ڕیزکردن ========== ──

function searchAccounts() {
  const searchInput = document.querySelector('.search-box input');
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.card');
  let visibleCount = 0;
  
  cards.forEach(card => {
    const title = card.querySelector('.card-title')?.innerText.toLowerCase() || '';
    const desc = card.querySelector('.card-desc')?.innerText.toLowerCase() || '';
    const tag = card.querySelector('.card-tag')?.innerText.toLowerCase() || '';
    
    if (title.includes(searchTerm) || desc.includes(searchTerm) || tag.includes(searchTerm) || searchTerm === '') {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  const resultsBadge = document.querySelector('.results-badge');
  if (resultsBadge) {
    resultsBadge.innerText = visibleCount + ' ئەكاونت';
  }
}

const searchInputElem = document.querySelector('.search-box input');
if (searchInputElem) {
  searchInputElem.addEventListener('input', searchAccounts);
}

function filterByCategory(category) {
  const cards = document.querySelectorAll('.card');
  let visibleCount = 0;
  
  cards.forEach(card => {
    const tag = card.querySelector('.card-tag')?.innerText || '';
    
    if (category === 'هەموو' || tag.includes(category)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  const resultsBadge = document.querySelector('.results-badge');
  if (resultsBadge) {
    resultsBadge.innerText = visibleCount + ' ئەكاونت';
  }
}

document.querySelectorAll('#cat-chips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#cat-chips .chip').forEach(c => c.classList.remove('active-blue'));
    chip.classList.add('active-blue');
    
    let category = chip.innerText;
    category = category.replace(/[🎮📱🎬🛡🎵]/g, '').trim();
    filterByCategory(category === 'هەموو' ? 'هەموو' : category);
  });
});

function sortCards(sortType) {
  const cardsGrid = document.querySelector('.cards');
  const cards = Array.from(document.querySelectorAll('.card'));
  
  let sortedCards = [...cards];
  
  switch(sortType) {
    case 'نوێترين':
    case 'گرانترين':
      sortedCards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price) || 0;
        const priceB = parseInt(b.dataset.price) || 0;
        return priceB - priceA;
      });
      break;
    case 'ئارزانترين':
      sortedCards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price) || 0;
        const priceB = parseInt(b.dataset.price) || 0;
        return priceA - priceB;
      });
      break;
    case 'هەڵسەنگاندن':
      sortedCards.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('.r-num')?.innerText) || 0;
        const ratingB = parseFloat(b.querySelector('.r-num')?.innerText) || 0;
        return ratingB - ratingA;
      });
      break;
  }
  
  sortedCards.forEach(card => cardsGrid.appendChild(card));
}

document.querySelectorAll('#sort-chips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#sort-chips .chip').forEach(c => c.classList.remove('active-green'));
    chip.classList.add('active-green');
    
    const sortType = chip.innerText;
    sortCards(sortType);
  });
});

console.log('JS loaded successfully!');