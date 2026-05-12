/* ===========================
   بازاری دیجیتال — JS
=========================== */

let selectedType = '';
let selectedPlatform = '';
let uploadedFiles = [];

/* ===========================
   هەڵبژاردنی جۆری ئەکاونت
=========================== */
function selectType(type) {
  selectedType = type;

  document.getElementById('typeSocial').classList.toggle('active', type === 'social');
  document.getElementById('typeGame').classList.toggle('active', type === 'game');

  document.getElementById('socialSection').classList.toggle('visible', type === 'social');
  document.getElementById('gameSection').classList.toggle('visible', type === 'game');

  // ڕیسێتی پلاتفۆرم
  selectedPlatform = '';
  document.querySelectorAll('.plat-btn').forEach(b => b.classList.remove('active'));

  clearErr('type');
  updateProgress();
}

/* ===========================
   هەڵبژاردنی پلاتفۆرم
=========================== */
function selectPlat(el, group) {
  const containers = { social: 'socialPlatforms', game: 'gamePlatforms' };
  document.querySelectorAll('#' + containers[group] + ' .plat-btn')
    .forEach(b => b.classList.remove('active'));

  el.classList.add('active');
  selectedPlatform = el.dataset.plat;

  clearErr('platform');
  updateProgress();
}

/* ===========================
   تۆگڵی بەج
=========================== */
function toggleBadge(el) {
  el.classList.toggle('active');
}

/* ===========================
   تاگەکانی نیش
=========================== */
document.querySelectorAll('#nicheTags .tag').forEach(tag => {
  tag.addEventListener('click', () => tag.classList.toggle('active'));
});

/* ===========================
   ژمارەکەری کاراکتەر
=========================== */
const descEl   = document.getElementById('desc');
const countEl  = document.getElementById('charCount');

descEl.addEventListener('input', () => {
  const len = descEl.value.length;
  countEl.textContent = len + ' / 400';
  countEl.classList.toggle('warn', len > 380);
  updateProgress();
});

/* ===========================
   بارکردنی وێنە
=========================== */
document.getElementById('imgInput').addEventListener('change', function () {
  Array.from(this.files).forEach(file => {
    if (uploadedFiles.length >= 6) return;
    uploadedFiles.push(file);

    const reader = new FileReader();
    reader.onload = e => {
      const grid = document.getElementById('previewGrid');
      const item = document.createElement('div');
      item.className = 'prev-item';
      const idx = uploadedFiles.length - 1;
      item.innerHTML = `
        <img src="${e.target.result}" alt="preview" />
        <span class="del-btn" onclick="removeImg(${idx}, this)">×</span>
      `;
      grid.appendChild(item);
    };
    reader.readAsDataURL(file);
  });

  this.value = '';
  updateProgress();
});

function removeImg(idx, btn) {
  uploadedFiles.splice(idx, 1);
  btn.closest('.prev-item').remove();
}

/* ===========================
   خەتی پێشکەوتن
=========================== */
function updateProgress() {
  const fieldIds = ['username', 'phone', 'city', 'contact', 'price'];
  let filled = fieldIds.filter(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== '';
  }).length;

  if (selectedType)     filled++;
  if (selectedPlatform) filled++;
  if (descEl.value.trim()) filled++;

  const total = fieldIds.length + 3;
  const pct   = Math.round((filled / total) * 100);
  document.getElementById('progressBar').style.width = pct + '%';
}

// گوێستن بە هەموو ئینپوتەکان بۆ پێشکەوتن
document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', updateProgress);
});

/* ===========================
   یارمەتیدەری هەڵە
=========================== */
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

/* ===========================
   دابەشکردنی فۆرم
=========================== */
document.getElementById('sellForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  // فیلدە پێویستەکان
  const required = [
    { id: 'username', msg: 'ناوی بەکارهێنەر داخڵ بکە' },
    { id: 'phone',    msg: 'ژمارەی مۆبایل داخڵ بکە'  },
    { id: 'city',     msg: 'شار هەڵبژێرە'              },
    { id: 'contact',  msg: 'ئایدی پەیوەندی داخڵ بکە'  },
    { id: 'price',    msg: 'نرخ داخڵ بکە'              },
  ];

  required.forEach(({ id, msg }) => {
    const val = document.getElementById(id)?.value.trim();
    if (!val) { showErr(id, msg); valid = false; }
    else        clearErr(id);
  });

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
    showErr('desc', 'وەسف بنووسە');
    valid = false;
  } else {
    clearErr('desc');
  }

  if (!valid) return;

  // شبیەی ناردن
  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove('loading');
    btn.disabled = false;
    document.getElementById('sellForm').style.display = 'none';
    document.getElementById('successBox').classList.remove('hidden');
  }, 1800);
});

/* ===========================
   ڕیسێتی فۆرم
=========================== */
document.getElementById('resetBtn').addEventListener('click', () => {
  // نیشاندانەوەی فۆرم
  document.getElementById('sellForm').style.display = '';
  document.getElementById('successBox').classList.add('hidden');

  // ڕیسێتی هەموو فیلدەکان
  document.getElementById('sellForm').reset();

  // ڕیسێتی گۆڕاوەکان
  selectedType     = '';
  selectedPlatform = '';
  uploadedFiles    = [];

  // ڕیسێتی کلاسەکان
  document.querySelectorAll('.type-card, .plat-btn, .badge-check, .tag')
    .forEach(el => el.classList.remove('active'));

  // شاردنەوەی بەشە دینامیکییەکان
  document.querySelectorAll('.dynamic-section')
    .forEach(s => s.classList.remove('visible'));

  // ڕیسێتی وێنەکان و ژمارەکەر
  document.getElementById('previewGrid').innerHTML = '';
  countEl.textContent = '0 / 400';
  countEl.classList.remove('warn');

  // ڕیسێتی خەتی پێشکەوتن
  document.getElementById('progressBar').style.width = '0%';
});
