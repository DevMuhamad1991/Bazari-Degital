// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== NAV ACTIVE LINK + DRAG SCROLL =====
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      setTimeout(() => {
        link.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, 100);
    }

    link.addEventListener('mouseenter', function () {
      this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
    });

    link.addEventListener('mouseleave', function () {
      this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
    });
  });

  // ===== NAVBAR DRAG SCROLL =====
  const navList = document.querySelector('.nav-links');
  if (!navList) return;

  let isDown = false, startX, scrollLeft;

  // Touch
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

  // Mouse
  navList.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - navList.offsetLeft;
    scrollLeft = navList.scrollLeft;
    navList.style.cursor = 'grabbing';
  });
  navList.addEventListener('mouseleave', () => {
    isDown = false;
    navList.style.cursor = 'default';
  });
  navList.addEventListener('mouseup', () => {
    isDown = false;
    navList.style.cursor = 'default';
  });
  navList.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - navList.offsetLeft;
    navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyASJbu_rNecyaHi9gqrE9PSOwyA7pvq92E",
  authDomain: "kurd-account.firebaseapp.com",
  projectId: "kurd-account",
  storageBucket: "kurd-account.firebasestorage.app",
  messagingSenderId: "325274297633",
  appId: "1:325274297633:web:04f9b4b209d3d0f6a90a60"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Notification ──
function showNotif(message, type = 'success') {
  const old = document.querySelector('.notif');
  if (old) {
    old.classList.remove('notif-show');
    setTimeout(() => old.remove(), 300);
  }

  const icons = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  };

  const notif = document.createElement('div');
  notif.className = `notif notif-${type}`;
  notif.innerHTML = `
    <span class="notif-icon">${icons[type]}</span>
    <span class="notif-msg">${message}</span>
    <button class="notif-close" onclick="this.parentElement.remove()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="notif-bar"></div>
  `;

  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('notif-show'), 10);
  setTimeout(() => {
    notif.classList.remove('notif-show');
    setTimeout(() => notif.remove(), 400);
  }, 3500);
}

// ── Tab Panel ──
function showPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
}
window.showPanel = showPanel;

// ── یوزەرنەیم ئۆتۆماتیکی دروست بکە ──
function generateUsername(firstName, lastName) {
  const random = Math.floor(1000 + Math.random() * 9000);
  return (firstName + lastName + random).toLowerCase().replace(/\s/g, '');
}

// ── بینینی وشەی نهێنی (Toggle Password Visibility) ──
function togglePasswordVisibility(inputElement, buttonElement) {
  const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
  inputElement.setAttribute('type', type);

  if (type === 'password') {
    buttonElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
  } else {
    buttonElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
}

// ── زیادکردنی دوگمەی بینین بۆ هەموو فۆڕمەکانی وشەی نهێنی ──
function addPasswordToggles() {
  // ✅ بۆ چوونەژوورەوە
  const loginPasswordField = document.getElementById('loginPassword');
  const loginWrap = loginPasswordField.closest('.inp-wrap');

  // ✅ لابردنی ئایکۆنی کونەکەی HTML
  const loginOldIcon = loginWrap.querySelector('.inp-icon');
  if (loginOldIcon) loginOldIcon.remove();

  const loginToggleBtn = document.createElement('button');
  loginToggleBtn.type = 'button';
  loginToggleBtn.className = 'password-toggle-btn';
  loginToggleBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
  loginToggleBtn.style.cssText = `
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.2s;
    z-index: 2;
  `;
  loginToggleBtn.addEventListener('mouseenter', () => loginToggleBtn.style.color = '#3b82f6');
  loginToggleBtn.addEventListener('mouseleave', () => loginToggleBtn.style.color = 'rgba(255, 255, 255, 0.4)');
  loginToggleBtn.addEventListener('click', () => togglePasswordVisibility(loginPasswordField, loginToggleBtn));
  loginWrap.appendChild(loginToggleBtn);

  // ✅ بۆ تۆمارکردن
  const registerPasswordField = document.getElementById('registerPassword');
  const registerWrap = registerPasswordField.closest('.inp-wrap');

  // ✅ لابردنی ئایکۆنی کونەکەی HTML
  const registerOldIcon = registerWrap.querySelector('.inp-icon');
  if (registerOldIcon) registerOldIcon.remove();

  const registerToggleBtn = document.createElement('button');
  registerToggleBtn.type = 'button';
  registerToggleBtn.className = 'password-toggle-btn';
  registerToggleBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
  registerToggleBtn.style.cssText = `
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.2s;
    z-index: 2;
  `;
  registerToggleBtn.addEventListener('mouseenter', () => registerToggleBtn.style.color = '#3b82f6');
  registerToggleBtn.addEventListener('mouseleave', () => registerToggleBtn.style.color = 'rgba(255, 255, 255, 0.4)');
  registerToggleBtn.addEventListener('click', () => togglePasswordVisibility(registerPasswordField, registerToggleBtn));
  registerWrap.appendChild(registerToggleBtn);
}

// ── بانگی فانکشنەکە دوای باربوونی پەڕە ──
document.addEventListener('DOMContentLoaded', () => {
  addPasswordToggles();
});

// ── تۆماركردن ──
document.getElementById('registerBtn').addEventListener('click', async function () {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('registerEmail').value.trim();
  const password  = document.getElementById('registerPassword').value;

  if (!firstName || !lastName || !email || !password) {
    showNotif('تکایە هەموو خانەکان پڕبکەرەوە', 'warning'); return;
  }
  if (password.length < 8) {
    showNotif('وشەی نهێنی دەبێت لانی کەم ٨ پیت بێت', 'warning'); return;
  }
  
    try {
    // ١ — هەژمار دروست بکە
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ٢ — یوزەرنەیم ئۆتۆماتیکی
    const username = generateUsername(firstName, lastName);

    // ٣ — ناو لە Auth دا بنێ
    await updateProfile(user, {
      displayName: firstName + ' ' + lastName,
      photoURL: 'https://ui-avatars.com/api/?name=' + firstName + '+' + lastName + '&background=2563eb&color=fff&size=200'
    });

    // ٤ — زانیاری لە Firestore دا پاشەکەو بکە
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      photoURL: 'https://ui-avatars.com/api/?name=' + firstName + '+' + lastName + '&background=2563eb&color=fff&size=200',
      createdAt: new Date().toISOString()
    });

    showNotif('هەژمارەکەت بەسەرکەوتوویی دروستکرا ✅', 'success');
    setTimeout(() => { window.location.href = 'profile.html'; }, 1500);

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') showNotif('ئەم ئیمەیڵە پێشتر تۆماركراوە', 'error');
    else if (error.code === 'auth/invalid-email')   showNotif('ئیمەیڵەکە دروست نییە', 'error');
    else if (error.code === 'auth/weak-password')   showNotif('وشەی نهێنی قەولەیە', 'error');
    else showNotif(error.message, 'error');
  }
});

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showNotif('هەژمارەکەت بەسەرکەوتوویی دروستکرا', 'success');
    setTimeout(() => { window.location.href = 'market.html'; }, 1500);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') showNotif('ئەم ئیمەیڵە پێشتر تۆماركراوە', 'error');
    else if (error.code === 'auth/invalid-email')   showNotif('ئیمەیڵەکە دروست نییە', 'error');
    else if (error.code === 'auth/weak-password')   showNotif('وشەی نهێنی قەولەیە', 'error');
    else showNotif(error.message, 'error');
  }
});

// ── چوونەژوورەوە ──
document.getElementById('loginBtn').addEventListener('click', async function () {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showNotif('تکایە ئیمەیڵ و وشەی نهێنی بنووسە', 'warning'); return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showNotif('بەخێربێیت! 👋', 'success');
    setTimeout(() => { window.location.href = 'market.html'; }, 1500);
  } catch (error) {
    if (error.code === 'auth/user-not-found')        showNotif('ئەم بەکارهێنەرە نەدۆزرایەوە', 'error');
    else if (error.code === 'auth/wrong-password')   showNotif('وشەی نهێنی هەڵەیە', 'error');
    else if (error.code === 'auth/invalid-email')    showNotif('ئیمەیڵەکە دروست نییە', 'error');
    else if (error.code === 'auth/invalid-credential') showNotif('ئیمەیڵ یان وشەی نهێنی هەڵەیە', 'error');
    else showNotif(error.message, 'error');
  }
});