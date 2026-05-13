/* ===================================================
   post.js — بازاری دیجیتال (نوێکراوەوە)
=================================================== */

'use strict';

/* ── گۆڕاوەی گلۆبال ── */
let selectedType     = '';
let selectedPlatform = '';
let uploadedFiles    = [];

/* ─────────────────────────────────
   1. هەڵبژاردنی جۆری ئەکاونت
───────────────────────────────── */
function selectType(type) {
  selectedType = type;

  document.getElementById('typeSocial').classList.toggle('active', type === 'social');
  document.getElementById('typeGame').classList.toggle('active',   type === 'game');

  const socialSec = document.getElementById('socialSection');
  const gameSec   = document.getElementById('gameSection');

  socialSec.classList.toggle('visible', type === 'social');
  gameSec.classList.toggle('visible',   type === 'game');

  /* ڕیسێتی هەڵبژاردنی پلاتفۆرم */
  selectedPlatform = '';
  document.querySelectorAll('.plat-btn').forEach(b => b.classList.remove('active'));

  clearErr('type');
  updateProgress();
}

/* ─────────────────────────────────
   2. هەڵبژاردنی پلاتفۆرم
───────────────────────────────── */
function selectPlat(el, group) {
  const containers = { social: 'socialPlatforms', game: 'gamePlatforms' };
  document
    .querySelectorAll('#' + containers[group] + ' .plat-btn')
    .forEach(b => b.classList.remove('active'));

  el.classList.add('active');
  selectedPlatform = el.dataset.plat;

  clearErr('platform');
  updateProgress();
}

/* ─────────────────────────────────
   3. تۆگڵی بەج
───────────────────────────────── */
function toggleBadge(el) {
  el.classList.toggle('active');
}

/* ─────────────────────────────────
   4. تاگەکانی نیش
───────────────────────────────── */
document.querySelectorAll('#nicheTags .tag').forEach(tag => {
  tag.addEventListener('click', () => tag.classList.toggle('active'));
});

/* ─────────────────────────────────
   5. ژمارەکەری کاراکتەر
───────────────────────────────── */
const descEl  = document.getElementById('desc');
const countEl = document.getElementById('charCount');

const MAX_DESC = 400;

descEl.addEventListener('input', () => {
  const len = descEl.value.length;

  /* کۆتاکردنی تێکست بە ماکسیمووم */
  if (len > MAX_DESC) {
    descEl.value = descEl.value.slice(0, MAX_DESC);
  }

  const current = descEl.value.length;
  countEl.textContent = `${current} / ${MAX_DESC}`;
  countEl.classList.toggle('warn', current > MAX_DESC - 20);

  clearErr('desc');
  updateProgress();
});

/* ─────────────────────────────────
   6. بارکردنی وێنە — Drag & Drop و کلیک
───────────────────────────────── */
const imgInput   = document.getElementById('imgInput');
const previewGrid = document.getElementById('previewGrid');
const uploadZone  = document.querySelector('.upload-zone');
const MAX_IMGS    = 6;

/* هاندەری فایل ── هاوبەش بۆ کلیک و drag */
function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (uploadedFiles.length >= MAX_IMGS) return;
    if (!file.type.startsWith('image/')) return;

    const idx = uploadedFiles.length;
    uploadedFiles.push(file);

    const reader = new FileReader();
    reader.onload = e => renderPreview(e.target.result, idx);
    reader.readAsDataURL(file);
  });
  updateProgress();
}

/* رێندەری پرێڤیو */
function renderPreview(src, idx) {
  const item = document.createElement('div');
  item.className = 'prev-item';
  item.dataset.idx = idx;
  item.innerHTML = `
    <img src="${src}" alt="preview" loading="lazy" />
    <span class="del-btn" title="سڕینەوە">×</span>
  `;
  item.querySelector('.del-btn').addEventListener('click', () => removeImg(item));
  previewGrid.appendChild(item);
}

/* سڕینەوەی وێنە */
function removeImg(item) {
  const idx = parseInt(item.dataset.idx, 10);
  uploadedFiles.splice(idx, 1);
  item.remove();

  /* نوێکردنەوەی ئیندێکسەکان */
  previewGrid.querySelectorAll('.prev-item').forEach((el, i) => {
    el.dataset.idx = i;
  });
  updateProgress();
}

imgInput.addEventListener('change', function () {
  handleFiles(this.files);
  this.value = '';
});

/* Drag & Drop */
['dragenter', 'dragover'].forEach(ev => {
  uploadZone.addEventListener(ev, e => {
    e.preventDefault();
    uploadZone.style.borderColor = 'var(--b500)';
    uploadZone.style.background  = 'rgba(59,142,243,.07)';
  });
});

['dragleave', 'drop'].forEach(ev => {
  uploadZone.addEventListener(ev, e => {
    e.preventDefault();
    uploadZone.style.borderColor = '';
    uploadZone.style.background  = '';
  });
});

uploadZone.addEventListener('drop', e => {
  handleFiles(e.dataTransfer.files);
});

/* ─────────────────────────────────
   7. خەتی پێشکەوتن
───────────────────────────────── */
const progressBar = document.getElementById('progressBar');
const FIELD_IDS   = ['username', 'phone', 'city', 'contact', 'price'];
const TOTAL       = FIELD_IDS.length + 3; /* +3 بۆ: جۆر، پلاتفۆرم، وەسف */

function updateProgress() {
  let filled = FIELD_IDS.filter(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== '';
  }).length;

  if (selectedType)          filled++;
  if (selectedPlatform)      filled++;
  if (descEl.value.trim())   filled++;

  const pct = Math.round((filled / TOTAL) * 100);
  progressBar.style.width = pct + '%';
}

/* گوێستن بە هەموو خانەکان */
document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', updateProgress);
});

/* ─────────────────────────────────
   8. یارمەتیدەری هەڵە
───────────────────────────────── */
function showErr(id, msg) {
  const el = document.getElementById('err-' + id);
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
}

function clearErr(id) {
  const el = document.getElementById('err-' + id);
  if (!el) return;
  el.textContent = '';
  el.classList.remove('show');
}

/* ─────────────────────────────────
   9. دابەشکردنی فۆرم
───────────────────────────────── */
const sellForm  = document.getElementById('sellForm');
const submitBtn = document.getElementById('submitBtn');

/* پشکنینی مۆبایل */
function isValidPhone(val) {
  return /^[0-9+\s\-()]{7,15}$/.test(val.trim());
}

sellForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const REQUIRED = [
    { id: 'username', msg: 'ناوی بەکارهێنەر داخڵ بکە' },
    { id: 'phone',    msg: 'ژمارەی مۆبایل داخڵ بکە'   },
    { id: 'city',     msg: 'شار هەڵبژێرە'               },
    { id: 'contact',  msg: 'ئایدی پەیوەندی داخڵ بکە'   },
    { id: 'price',    msg: 'نرخ داخڵ بکە'               },
  ];

  REQUIRED.forEach(({ id, msg }) => {
    const val = document.getElementById(id)?.value.trim();
    if (!val) { showErr(id, msg); valid = false; }
    else       clearErr(id);
  });

  /* پشکنینی تایبەتی مۆبایل */
  const phoneVal = document.getElementById('phone').value;
  if (phoneVal && !isValidPhone(phoneVal)) {
    showErr('phone', 'ژمارەی مۆبایل دروست نییە');
    valid = false;
  }

  /* پشکنینی نرخ */
  const priceVal = parseFloat(document.getElementById('price').value);
  if (!isNaN(priceVal) && priceVal < 0) {
    showErr('price', 'نرخ نابێت منفی بێت');
    valid = false;
  }

  if (!selectedType) {
    showErr('type', 'جۆری ئەکاونت هەڵبژێرە');
    valid = false;
  } else {
    clearErr('type');
  }

  if (!selectedPlatform) {
    showErr('platform', 'پلاتفۆرم هەڵبژێرە');
    valid = false;
  } else {
    clearErr('platform');
  }

  if (!descEl.value.trim()) {
    showErr('desc', 'وەسفی ئەکاونت بنووسە');
    valid = false;
  } else {
    clearErr('desc');
  }

  if (!valid) {
    /* ئاستەنگکردنی یەکەمین هەڵەی دیار */
    const firstErr = sellForm.querySelector('.err.show');
    if (firstErr) {
      firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  /* شبیەی ناردن */
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    sellForm.style.display = 'none';
    document.getElementById('successBox').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1800);
});

/* ─────────────────────────────────
   10. ڕیسێتی فۆرم
───────────────────────────────── */
document.getElementById('resetBtn').addEventListener('click', () => {
  sellForm.style.display = '';
  document.getElementById('successBox').classList.add('hidden');

  sellForm.reset();

  selectedType     = '';
  selectedPlatform = '';
  uploadedFiles    = [];

  document.querySelectorAll('.type-card, .plat-btn, .badge-check, .tag')
    .forEach(el => el.classList.remove('active'));

  document.querySelectorAll('.dynamic-section')
    .forEach(s => s.classList.remove('visible'));

  previewGrid.innerHTML = '';
  countEl.textContent = `0 / ${MAX_DESC}`;
  countEl.classList.remove('warn');
  progressBar.style.width = '0%';

  window.scrollTo({ top: 0, behavior: 'smooth' });
});





