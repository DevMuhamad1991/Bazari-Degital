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
