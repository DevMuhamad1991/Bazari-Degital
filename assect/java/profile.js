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
  toast.classList.add('show');
  if (type === 'err') {
    toast.classList.add('err');
    toastIco.className = 'fa-solid fa-circle-exclamation';
  } else {
    toast.classList.remove('err');
    toastIco.className = 'fa-solid fa-circle-check';
  }
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Simulated user data (in real app, this would come from backend/localStorage)
let currentUser = {
  username: 'kurduser',
  fullName: 'کورد یوزەر',
  avatar: '',
  email: 'user@example.com'
};

// Load user data from localStorage
function loadUserData() {
  const saved = localStorage.getItem('kurdaccount_user');
  if (saved) {
    try {
      const user = JSON.parse(saved);
      currentUser = { ...currentUser, ...user };
    } catch(e) {}
  }
  
  usernameInput.value = currentUser.username;
  fullNameInput.value = currentUser.fullName;
  resetEmailInput.value = currentUser.email;
  
  if (currentUser.avatar) {
    profileAvatar.src = currentUser.avatar;
  } else {
    profileAvatar.src = `https://ui-avatars.com/api/?background=0D1525&color=38bdf8&name=${encodeURIComponent(currentUser.fullName || 'U')}&size=94&rounded=true`;
  }
}

// Save user data to localStorage
function saveUserData() {
  localStorage.setItem('kurdaccount_user', JSON.stringify(currentUser));
}

// ========== Avatar Upload ==========
avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    showToast('تکایە فایلێکی وێنە هەڵبژێرە', 'err');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (ev) => {
    const imgData = ev.target.result;
    profileAvatar.src = imgData;
    currentUser.avatar = imgData;
    saveUserData();
    showToast('وێنەکەت گۆڕا ✅');
  };
  reader.readAsDataURL(file);
});

// ========== Save Username ==========
saveUsernameBtn.addEventListener('click', () => {
  const newUsername = usernameInput.value.trim();
  if (!newUsername) {
    showToast('تکایە یوزەرنەیمێک بنووسە', 'err');
    return;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
    showToast('یوزەرنەیم دەبێت تەنها پیت، ژمارە و _ بێت', 'err');
    return;
  }
  
  currentUser.username = newUsername;
  saveUserData();
  showToast(`یوزەرنەیمەکەت گۆڕا بۆ ${newUsername}`);
});

// ========== Save Full Name ==========
saveNameBtn.addEventListener('click', () => {
  const newName = fullNameInput.value.trim();
  if (!newName) {
    showToast('تکایە ناوی تەواوت بنووسە', 'err');
    return;
  }
  
  currentUser.fullName = newName;
  saveUserData();
  showToast('ناوی تەواوت گۆڕا ✅');
});

// ========== Reset Password ==========
resetPasswordBtn.addEventListener('click', () => {
  const email = resetEmailInput.value.trim();
  if (!email || !email.includes('@')) {
    showToast('تکایە ئیمەیڵێکی دروست بنووسە', 'err');
    return;
  }
  
  // Simulate sending reset email
  showToast(`لینکی ڕیسێت پاسوۆرد بۆ ${email} نێردرا`, 'ok');
});

// ========== Logout ==========
logoutBtn.addEventListener('click', () => {
  if (confirm('دڵنیای دەتەوێ دەربچیت؟')) {
    localStorage.removeItem('kurdaccount_user');
    showToast('دەرچوویت 👋');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
});

// ========== Tabs Logic ==========
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.getAttribute('data-tab');
    
    tabs.forEach(t => t.classList.remove('tab--active'));
    tab.classList.add('tab--active');
    
    panels.forEach(panel => panel.classList.remove('panel--active'));
    document.getElementById(`panel-${tabId}`).classList.add('panel--active');
    
    if (tabId === 'listings') {
      renderListings();
    }
  });
});

// ========== Listings Data (Mock) ==========
let userPosts = [
  {
    id: '1',
    title: 'ئەکاونت فەیسبوک',
    description: 'ئەکاونتێکی کۆن و باوەرپێکراو',
    price: 25,
    status: 'available',
    platform: 'facebook',
    tags: ['فەیسبوک', 'باوەرپێکراو'],
    views: 45,
    createdAt: '2025-05-20'
  },
  {
    id: '2',
    title: 'ئەکاونت ئینستاگرام',
    description: 'ئەکاونت بە 10k فۆڵۆوەر',
    price: 120,
    status: 'available',
    platform: 'instagram',
    tags: ['ئینستاگرام', 'فۆڵۆوەر'],
    views: 128,
    createdAt: '2025-05-18'
  },
  {
    id: '3',
    title: 'ئەکاونت تویتر',
    description: 'ئەکاونتێکی چالاک',
    price: 45,
    status: 'sold',
    platform: 'twitter',
    tags: ['تویتر', 'چالاک'],
    views: 67,
    createdAt: '2025-05-10'
  }
];

let currentFilter = 'all';

// Save posts to localStorage
function savePosts() {
  localStorage.setItem('kurdaccount_posts', JSON.stringify(userPosts));
}

// Load posts from localStorage
function loadPosts() {
  const saved = localStorage.getItem('kurdaccount_posts');
  if (saved) {
    try {
      userPosts = JSON.parse(saved);
    } catch(e) {}
  }
}

// Get platform icon
function getPlatformIcon(platform) {
  const icons = {
    facebook: 'fab fa-facebook-f',
    instagram: 'fab fa-instagram',
    twitter: 'fab fa-twitter',
    discord: 'fab fa-discord',
    tiktok: 'fab fa-tiktok',
    telegram: 'fab fa-telegram'
  };
  return icons[platform] || 'fas fa-gamepad';
}

// Get platform color
function getPlatformColor(platform) {
  const colors = {
    facebook: '#1877f2',
    instagram: '#e4405f',
    twitter: '#1da1f2',
    discord: '#5865f2',
    tiktok: '#00f2ea',
    telegram: '#26a5e4'
  };
  return colors[platform] || '#38bdf8';
}

// Get status badge
function getStatusBadge(status) {
  switch(status) {
    case 'available': return { class: 'pc-badge--ok', icon: 'fa-solid fa-circle-check', text: 'بەردەستە' };
    case 'sold': return { class: 'pc-badge--sold', icon: 'fa-solid fa-circle-xmark', text: 'فرۆشراو' };
    case 'pending': return { class: 'pc-badge--wait', icon: 'fa-solid fa-clock', text: 'چاوەڕوان' };
    default: return { class: 'pc-badge--ok', icon: 'fa-solid fa-circle-check', text: 'بەردەستە' };
  }
}

// Render listings
function renderListings() {
  if (!postsGrid) return;
  
  let filtered = userPosts;
  if (currentFilter !== 'all') {
    filtered = userPosts.filter(post => post.status === currentFilter);
  }
  
  listingsCountSpan.innerText = filtered.length;
  
  if (filtered.length === 0) {
    postsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-inbox"></i>
        <p>هیچ ئەکاونتێکت نییە لەم ڕەوتە</p>
        <a href="post.html" class="btn-primary btn-sm">ئەکاونتی نوێ زیاد بکە</a>
      </div>
    `;
    return;
  }
  
  postsGrid.innerHTML = filtered.map(post => `
    <div class="post-card" data-id="${post.id}">
      <div class="pc-banner" style="background: linear-gradient(135deg, ${getPlatformColor(post.platform)}22, #0a0f1f);">
        <div class="pc-ico" style="color: ${getPlatformColor(post.platform)}; background: ${getPlatformColor(post.platform)}11;">
          <i class="${getPlatformIcon(post.platform)}"></i>
        </div>
        <div>
          <div class="pc-title">${escapeHtml(post.title)}</div>
          <div class="pc-sub">${escapeHtml(post.description.substring(0, 40))}${post.description.length > 40 ? '...' : ''}</div>
        </div>
        <div class="pc-badge ${getStatusBadge(post.status).class}">
          <i class="${getStatusBadge(post.status).icon}"></i> ${getStatusBadge(post.status).text}
        </div>
      </div>
      <div class="pc-body">
        <div class="pc-tags">
          ${post.tags.map(tag => `<span class="pc-tag">#${escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="pc-bottom">
          <div class="pc-price">$${post.price} <small>USD</small></div>
          <div class="pc-actions">
            <button class="pc-btn edit-post" data-id="${post.id}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="pc-btn del" data-id="${post.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
        <div class="pc-footer">
          <div class="pc-stat"><i class="fa-regular fa-eye"></i> ${post.views}</div>
          <div class="pc-stat"><i class="fa-regular fa-calendar"></i> ${post.createdAt}</div>
        </div>
      </div>
    </div>
  `.trim()).join('');
  
  // Add event listeners to buttons
  document.querySelectorAll('.edit-post').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      showToast('وێستگەی دەستکاری کردن (بەم زوانە دادەخرێت)', 'ok');
    });
  });
  
  document.querySelectorAll('.pc-btn.del').forEach(btn => {
    btn.addEventListener('click', (e) => {
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

// Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Filter chips
document.querySelectorAll('.fc').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.fc').forEach(c => c.classList.remove('fc--on'));
    chip.classList.add('fc--on');
    currentFilter = chip.getAttribute('data-filter');
    renderListings();
  });
});

// ========== BG Canvas Animation ==========
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(width * height / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2
      });
    }
  }
  
  function drawParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#38bdf8';
    for (let p of particles) {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }
    requestAnimationFrame(drawParticles);
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
  
  resizeCanvas();
  initParticles();
  drawParticles();
}

// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// ========== Initialize ==========
loadUserData();
loadPosts();
renderListings();