// ========== DOM Elements ==========
const avatarInput = document.getElementById('avatarInput');
const profileAvatar = document.getElementById('profileAvatar');
const usernameInput = document.getElementById('usernameInput');
const fullNameInput = document.getElementById('fullNameInput');
const saveUsernameBtn = document.getElementById('saveUsernameBtn');
const saveNameBtn = document.getElementById('saveNameBtn');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');
const resetEmailInput = document.getElementById('resetEmailInput');
const logoutBtn = document.getElementById('logoutBtn');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const toastIco = document.getElementById('toastIco');
const listingsCountSpan = document.getElementById('listingsCount');
const postsGrid = document.getElementById('postsGrid');

// ========== Helper Functions ==========
function showToast(message, type = 'ok') {
  toastMsg.innerText = message;
  toast.className = 'toast show';
  if (type === 'err') {
    toast.classList.add('err');
    toastIco.className = 'fa-solid fa-circle-exclamation';
  } else {
    toast.classList.add('ok');
    toastIco.className = 'fa-solid fa-circle-check';
  }
  setTimeout(() => {
    toast.classList.remove('show', 'err', 'ok');
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}

// ========== User Data ==========
let currentUser = {
  username: 'kurduser',
  fullName: 'کورد یوزەر',
  avatar: '',
  email: 'user@example.com'
};

function loadUserData() {
  try {
    const saved = localStorage.getItem('kurdaccount_user');
    if (saved) currentUser = { ...currentUser, ...JSON.parse(saved) };
  } catch(e) {}

  if (usernameInput) usernameInput.value = currentUser.username;
  if (fullNameInput) fullNameInput.value = currentUser.fullName;
  if (resetEmailInput) resetEmailInput.value = currentUser.email;

  if (profileAvatar) {
    profileAvatar.src = currentUser.avatar ||
      `https://ui-avatars.com/api/?background=0D1525&color=38bdf8&name=${encodeURIComponent(currentUser.fullName || 'U')}&size=94&rounded=true`;
  }
}

function saveUserData() {
  try {
    localStorage.setItem('kurdaccount_user', JSON.stringify(currentUser));
  } catch(e) {}
}

// ========== Posts Data ==========
let userPosts = [
  { id: '1', title: 'ئەکاونت فەیسبوک', description: 'ئەکاونتێکی کۆن و باوەرپێکراو', price: 25, status: 'available', platform: 'facebook', tags: ['فەیسبوک', 'باوەرپێکراو'], views: 45, createdAt: '2025-05-20' },
  { id: '2', title: 'ئەکاونت ئینستاگرام', description: 'ئەکاونت بە 10k فۆڵۆوەر', price: 120, status: 'available', platform: 'instagram', tags: ['ئینستاگرام', 'فۆڵۆوەر'], views: 128, createdAt: '2025-05-18' },
  { id: '3', title: 'ئەکاونت تویتر', description: 'ئەکاونتێکی چالاک', price: 45, status: 'sold', platform: 'twitter', tags: ['تویتر', 'چالاک'], views: 67, createdAt: '2025-05-10' }
];

let currentFilter = 'all';

function savePosts() {
  try {
    localStorage.setItem('kurdaccount_posts', JSON.stringify(userPosts));
  } catch(e) {}
}

function loadPosts() {
  try {
    const saved = localStorage.getItem('kurdaccount_posts');
    if (saved) userPosts = JSON.parse(saved);
  } catch(e) {}
}

// ========== Platform Helpers ==========
function getPlatformIcon(platform) {
  const icons = { facebook: 'fab fa-facebook-f', instagram: 'fab fa-instagram', twitter: 'fab fa-twitter', discord: 'fab fa-discord', tiktok: 'fab fa-tiktok', telegram: 'fab fa-telegram' };
  return icons[platform] || 'fas fa-gamepad';
}

function getPlatformColor(platform) {
  const colors = { facebook: '#1877f2', instagram: '#e4405f', twitter: '#1da1f2', discord: '#5865f2', tiktok: '#00f2ea', telegram: '#26a5e4' };
  return colors[platform] || '#38bdf8';
}

function getStatusBadge(status) {
  const map = {
    available: { class: 'pc-badge--ok', icon: 'fa-solid fa-circle-check', text: 'بەردەستە' },
    sold:      { class: 'pc-badge--sold', icon: 'fa-solid fa-circle-xmark', text: 'فرۆشراو' },
    pending:   { class: 'pc-badge--wait', icon: 'fa-solid fa-clock', text: 'چاوەڕوان' }
  };
  return map[status] || map.available;
}

// ========== Update Badge Count ==========
function updateListingsCount() {
  if (!listingsCountSpan) return;
  let filtered = currentFilter === 'all' ? userPosts : userPosts.filter(p => p.status === currentFilter);
  listingsCountSpan.innerText = filtered.length;
}

// ========== Render Listings ==========
function renderListings() {
  if (!postsGrid) return;

  let filtered = currentFilter === 'all' ? userPosts : userPosts.filter(p => p.status === currentFilter);
  updateListingsCount();

  if (filtered.length === 0) {
    postsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-inbox"></i>
        <p>هیچ ئەکاونتێکت نییە لەم ڕەوتە</p>
        <a href="post.html" class="btn-primary btn-sm">ئەکاونتی نوێ زیاد بکە</a>
      </div>`;
    return;
  }

  postsGrid.innerHTML = filtered.map(post => {
    const color = getPlatformColor(post.platform);
    const badge = getStatusBadge(post.status);
    const shortDesc = escapeHtml(post.description.substring(0, 40)) + (post.description.length > 40 ? '...' : '');
    return `
      <div class="post-card" data-id="${post.id}">
        <div class="pc-banner" style="background:linear-gradient(135deg,${color}22,#0a0f1f);">
          <div class="pc-ico" style="color:${color};background:${color}11;">
            <i class="${getPlatformIcon(post.platform)}"></i>
          </div>
          <div>
            <div class="pc-title">${escapeHtml(post.title)}</div>
            <div class="pc-sub">${shortDesc}</div>
          </div>
          <div class="pc-badge ${badge.class}">
            <i class="${badge.icon}"></i> ${badge.text}
          </div>
        </div>
        <div class="pc-body">
          <div class="pc-tags">
            ${post.tags.map(t => `<span class="pc-tag">#${escapeHtml(t)}</span>`).join('')}
          </div>
          <div class="pc-bottom">
            <div class="pc-price">$${post.price} <small>USD</small></div>
            <div class="pc-actions">
              <button class="pc-btn edit-post" data-id="${post.id}" title="دەستکاری"><i class="fa-regular fa-pen-to-square"></i></button>
              <button class="pc-btn del" data-id="${post.id}" title="سڕینەوە"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
          <div class="pc-footer">
            <div class="pc-stat"><i class="fa-regular fa-eye"></i> ${post.views}</div>
            <div class="pc-stat"><i class="fa-regular fa-calendar"></i> ${post.createdAt}</div>
          </div>
        </div>
      </div>`;
  }).join('');

  // Event listeners for edit/delete
  postsGrid.querySelectorAll('.edit-post').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      showToast('وێستگەی دەستکاری کردن بەم زوانە دادەخرێت', 'ok');
    });
  });

  postsGrid.querySelectorAll('.pc-btn.del').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (confirm('دڵنیای دەتەوێت ئەم ئەکاونتە بسڕیتەوە؟')) {
        userPosts = userPosts.filter(p => p.id !== id);
        savePosts();
        renderListings();
        showToast('ئەکاونتەکە سڕایەوە ✅');
      }
    });
  });
}

// ========== Avatar Upload ==========
if (avatarInput) {
  avatarInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('تکایە فایلێکی وێنە هەڵبژێرە', 'err'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      currentUser.avatar = ev.target.result;
      if (profileAvatar) profileAvatar.src = currentUser.avatar;
      saveUserData();
      showToast('وێنەکەت گۆڕا ✅');
    };
    reader.readAsDataURL(file);
  });
}

// ========== Save Username ==========
if (saveUsernameBtn) {
  saveUsernameBtn.addEventListener('click', () => {
    const val = usernameInput.value.trim();
    if (!val) { showToast('تکایە یوزەرنەیمێک بنووسە', 'err'); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(val)) { showToast('یوزەرنەیم دەبێت تەنها پیت، ژمارە و _ بێت', 'err'); return; }
    currentUser.username = val;
    saveUserData();
    showToast(`یوزەرنەیمەکەت گۆڕا بۆ ${val}`);
  });
}

// ========== Save Full Name ==========
if (saveNameBtn) {
  saveNameBtn.addEventListener('click', () => {
    const val = fullNameInput.value.trim();
    if (!val) { showToast('تکایە ناوی تەواوت بنووسە', 'err'); return; }
    currentUser.fullName = val;
    saveUserData();
    showToast('ناوی تەواوت گۆڕا ✅');
  });
}

// ========== Reset Password ==========
if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener('click', () => {
    const email = resetEmailInput.value.trim();
    if (!email || !email.includes('@')) { showToast('تکایە ئیمەیڵێکی دروست بنووسە', 'err'); return; }
    showToast(`لینکی ڕیسێت پاسوۆرد بۆ ${email} نێردرا`);
  });
}

// ========== Logout ==========
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    if (confirm('دڵنیای دەتەوێ دەربچیت؟')) {
      try { localStorage.removeItem('kurdaccount_user'); } catch(e) {}
      showToast('دەرچوویت 👋');
      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    }
  });
}

// ========== Tabs ==========
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.getAttribute('data-tab');
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
    tab.classList.add('tab--active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('panel--active'));
    const panel = document.getElementById(`panel-${tabId}`);
    if (panel) panel.classList.add('panel--active');
    if (tabId === 'listings') renderListings();
  });
});

// ========== Filter Chips ==========
document.querySelectorAll('.fc').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.fc').forEach(c => c.classList.remove('fc--on'));
    chip.classList.add('fc--on');
    currentFilter = chip.getAttribute('data-filter');
    renderListings();
  });
});

// ========== BG Canvas ==========
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight, particles = [];

  function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(W * H / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + 0.5, a: Math.random() * 0.3 + 0.1, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.2 });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#38bdf8';
    for (const p of particles) {
      ctx.globalAlpha = p.a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
    }
    requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
  resizeCanvas(); initParticles(); drawParticles();
}

// ========== Navbar Scroll ==========
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ========== Initialize ==========
loadUserData();
loadPosts();
updateListingsCount(); // badge دروست نیشان بدە بەبێ کردنەوەی listings tab
// گرفتن ئێلێمێنتەکان
const coverImage = document.getElementById('coverImage');
const coverInput = document.getElementById('coverInput');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const toastIco = document.getElementById('toastIco');

// نیشاندانی تۆاست
function showToast(message, isError = false) {
  toastMsg.innerText = message;
  toast.classList.add('show');
  
  if (isError) {
    toast.style.borderColor = '#ef4444';
    toastIco.style.color = '#ef4444';
    toastIco.className = 'fa-solid fa-circle-exclamation';
  } else {
    toast.style.borderColor = '#22c55e';
    toastIco.style.color = '#22c55e';
    toastIco.className = 'fa-solid fa-circle-check';
  }
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// کردنەوەی دیالۆگی هەڵبژاردنی وێنە
document.querySelector('.cover-cam').addEventListener('click', () => {
  coverInput.click();
});

// گۆڕینی وێنە کاتێک فایلێک هەڵبژێردرا
coverInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  
  if (!file) return;
  
  // پشکنینی جۆری فایل
  if (!file.type.startsWith('image/')) {
    showToast('تکایە فایلێکی وێنە هەڵبژێرە', true);
    return;
  }
  
  // پشکنینی قەبارە (حداکثر 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showToast('قەبارەی وێنە دەبێت کەمتر بێت لە 5MB', true);
    return;
  }
  
  // خوێندنەوە و نیشاندانی وێنە
  const reader = new FileReader();
  
  reader.onload = (event) => {
    coverImage.src = event.target.result;
    showToast('وێنەی کاڤەر بەسەرکەوتوویی گۆڕا ✓');
    
    // هەڵگرتنی وێنە لە localStorage بۆ ماوەی دواتر
    localStorage.setItem('savedCoverImage', event.target.result);
  };
  
  reader.onerror = () => {
    showToast('هەڵە لە خوێندنەوەی فایل', true);
  };
  
  reader.readAsDataURL(file);
});

// بارکردنی وێنەی پاشەکەوتکراو کە پەڕەکە بار دەبێت
window.addEventListener('DOMContentLoaded', () => {
  const savedImage = localStorage.getItem('savedCoverImage');
  if (savedImage) {
    coverImage.src = savedImage;
  }
});