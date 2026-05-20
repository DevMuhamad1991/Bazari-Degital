'use strict';

/* ── Firebase Imports — دەبێت لە سەرەوەی فایل بێت ── */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ── گۆڕاوەی گلۆبال ── */
let selectedType     = '';
let selectedPlatform = '';
let uploadedFiles    = [];

/* ── Firebase Setup ── */
const firebaseConfig = {
  apiKey: "AIzaSyASJbu_rNecyaHi9gqrE9PSOwyA7pvq92E",
  authDomain: "kurd-account.firebaseapp.com",
  projectId: "kurd-account",
  storageBucket: "kurd-account.firebasestorage.app",
  messagingSenderId: "325274297633",
  appId: "1:325274297633:web:04f9b4b209d3d0f6a90a60"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const signupLink = document.querySelector('a[href="sign.html"]');
  if (!signupLink) return;
  if (user) {
    signupLink.href = 'profile.html';
    signupLink.textContent = 'Profile';
  } else {
    signupLink.href = 'sign.html';
    signupLink.textContent = 'SignUp';
  }
});

// ===== LOAD NAVBAR =====
const base = window.location.pathname.includes('Bazari-Degital') ? '/Bazari-Degital' : '';
fetch(base + 'assect/navbar/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-placeholder').innerHTML = html;

    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        setTimeout(() => {
          link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }, 100);
      }
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    navLinks.forEach(link => {
      link.addEventListener('mouseenter', function () {
        this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
      });
      link.addEventListener('mouseleave', function () {
        this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
      });
    });

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

/* ─────────────────────────────────
   1. هەڵبژاردنی جۆری ئەکاونت
───────────────────────────────── */
function selectType(type) {
  selectedType = type;
  document.getElementById('typeSocial').classList.toggle('active', type === 'social');
  document.getElementById('typeGame').classList.toggle('active',   type === 'game');
  document.getElementById('socialSection').classList.toggle('visible', type === 'social');
  document.getElementById('gameSection').classList.toggle('visible',   type === 'game');
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
  document.querySelectorAll('#' + containers[group] + ' .plat-btn')
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

/* ── فانكشنەكان گلۆبال بكە ── */
window.selectType  = selectType;
window.selectPlat  = selectPlat;
window.toggleBadge = toggleBadge;

/* ─────────────────────────────────
   4. تاگەکانی نیش
───────────────────────────────── */
document.querySelectorAll('#nicheTags .tag').forEach(tag => {
  tag.addEventListener('click', () => tag.classList.toggle('active'));
});

/* ─────────────────────────────────
   5. ژمارەکەری کاراکتەر
───────────────────────────────── */
const descEl   = document.getElementById('desc');
const countEl  = document.getElementById('charCount');
const MAX_DESC = 400;

descEl.addEventListener('input', () => {
  if (descEl.value.length > MAX_DESC) descEl.value = descEl.value.slice(0, MAX_DESC);
  const current = descEl.value.length;
  countEl.textContent = `${current} / ${MAX_DESC}`;
  countEl.classList.toggle('warn', current > MAX_DESC - 20);
  clearErr('desc');
  updateProgress();
});

/* ─────────────────────────────────
   6. بارکردنی وێنە
───────────────────────────────── */
const imgInput    = document.getElementById('imgInput');
const previewGrid = document.getElementById('previewGrid');
const uploadZone  = document.querySelector('.upload-zone');
const MAX_IMGS    = 6;

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

function removeImg(item) {
  const idx = parseInt(item.dataset.idx, 10);
  uploadedFiles.splice(idx, 1);
  item.remove();
  previewGrid.querySelectorAll('.prev-item').forEach((el, i) => { el.dataset.idx = i; });
  updateProgress();
}

imgInput.addEventListener('change', function () { handleFiles(this.files); this.value = ''; });

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
uploadZone.addEventListener('drop', e => { handleFiles(e.dataTransfer.files); });

/* ─────────────────────────────────
   7. خەتی پێشکەوتن
───────────────────────────────── */
const progressBar = document.getElementById('progressBar');
const FIELD_IDS   = ['username', 'phone', 'city', 'contact', 'price'];
const TOTAL       = FIELD_IDS.length + 3;

function updateProgress() {
  let filled = FIELD_IDS.filter(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== '';
  }).length;
  if (selectedType)        filled++;
  if (selectedPlatform)    filled++;
  if (descEl.value.trim()) filled++;
  progressBar.style.width = Math.round((filled / TOTAL) * 100) + '%';
}

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

function isValidPhone(val) {
  return /^[0-9+\s\-()]{7,15}$/.test(val.trim());
}

sellForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const REQUIRED = [
    { id: 'username', msg: 'ناوی بەکارهێنەر داخڵ بکە' },
    { id: 'phone',    msg: 'ژمارەی مۆبایل داخڵ بکە'   },
    { id: 'city',     msg: 'شار هەڵبژێرە'              },
    { id: 'contact',  msg: 'ئایدی پەیوەندی داخڵ بکە'  },
    { id: 'price',    msg: 'نرخ داخڵ بکە'              },
  ];

  REQUIRED.forEach(({ id, msg }) => {
    const val = document.getElementById(id)?.value.trim();
    if (!val) { showErr(id, msg); valid = false; }
    else        clearErr(id);
  });

  const phoneVal = document.getElementById('phone').value;
  if (phoneVal && !isValidPhone(phoneVal)) {
    showErr('phone', 'ژمارەی مۆبایل دروست نییە');
    valid = false;
  }

  const priceVal = parseFloat(document.getElementById('price').value);
  if (!isNaN(priceVal) && priceVal < 0) {
    showErr('price', 'نرخ نابێت منفی بێت');
    valid = false;
  }

  if (!selectedType) { showErr('type', 'جۆری ئەکاونت هەڵبژێرە'); valid = false; }
  else clearErr('type');

  if (!selectedPlatform) { showErr('platform', 'پلاتفۆرم هەڵبژێرە'); valid = false; }
  else clearErr('platform');

  if (!descEl.value.trim()) { showErr('desc', 'وەسفی ئەکاونت بنووسە'); valid = false; }
  else clearErr('desc');

  if (!valid) {
    const firstErr = sellForm.querySelector('.err.show');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

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
  selectedType = '';
  selectedPlatform = '';
  uploadedFiles = [];
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