import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db   = getFirestore(app);

// ── Notification ──
function showNotif(message, type = 'success') {
  const old = document.querySelector('.notif');
  if (old) old.remove();

  const notif = document.createElement('div');
  notif.className = `notif notif-${type}`;
  notif.innerHTML = `
    <span>${message}</span>
    <div class="notif-bar"></div>
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('notif-show'), 10);
  setTimeout(() => {
    notif.classList.remove('notif-show');
    setTimeout(() => notif.remove(), 400);
  }, 3000);
}

// ── یوزەرنەیم لە ئیمەیڵ دروست بکە ──
function usernameFromEmail(email) {
  return email.split('@')[0];
}

// ── پرۆفایل بارکە ──
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'sign.html';
    return;
  }

  // زانیاری لە Firestore وەربگرە
  const userRef  = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  let userData = {};
  if (userSnap.exists()) {
    userData = userSnap.data();
  }

  // یوزەرنەیم — ئەگەر نەبوو لە ئیمەیڵ دروست بکە
  const username = userData.username || usernameFromEmail(user.email);
  const fullName = userData.firstName && userData.lastName
    ? userData.firstName + ' ' + userData.lastName
    : user.displayName || '';

  const photoURL = userData.photoURL || user.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || username)}&background=2563eb&color=fff&size=200`;

  // UI نیشان بدە
  document.getElementById('profileAvatar').src   = photoURL;
  document.getElementById('profileFullName').textContent  = fullName || username;
  document.getElementById('profileUsername').textContent  = '@' + username;
  document.getElementById('profileEmail').textContent     = user.email;
  document.getElementById('usernameInput').value          = username;
  document.getElementById('fullNameInput').value          = fullName;
});

// ── یوزەرنەیم پاشەکەو بکە ──
document.getElementById('saveUsernameBtn').addEventListener('click', async () => {
  const user = auth.currentUser;
  if (!user) return;

  const newUsername = document.getElementById('usernameInput').value.trim();
  if (!newUsername) { showNotif('یوزەرنەیم بنووسە', 'error'); return; }
  if (newUsername.length < 3) { showNotif('یوزەرنەیم کەمەی ٣ پیت بێت', 'error'); return; }
  if (/\s/.test(newUsername)) { showNotif('یوزەرنەیم مێڵی مەبێت', 'error'); return; }

  try {
    await updateDoc(doc(db, 'users', user.uid), { username: newUsername });
    document.getElementById('profileUsername').textContent = '@' + newUsername;
    showNotif('یوزەرنەیم نوێکرایەوە ✅', 'success');
  } catch (e) {
    showNotif('کێشەیەک هەبوو، دووبارە هەوڵبدەرەوە', 'error');
  }
});

// ── ناوی تەواو پاشەکەو بکە ──
document.getElementById('saveNameBtn').addEventListener('click', async () => {
  const user = auth.currentUser;
  if (!user) return;

  const newName = document.getElementById('fullNameInput').value.trim();
  if (!newName) { showNotif('ناوی تەواو بنووسە', 'error'); return; }

  try {
    await updateProfile(user, { displayName: newName });
    await updateDoc(doc(db, 'users', user.uid), { displayName: newName });
    document.getElementById('profileFullName').textContent = newName;
    showNotif('ناوەکە نوێکرایەوە ✅', 'success');
  } catch (e) {
    showNotif('کێشەیەک هەبوو، دووبارە هەوڵبدەرەوە', 'error');
  }
});

// ── وێنەی پرۆفایل گۆڕین ──
document.getElementById('avatarInput').addEventListener('change', async (e) => {
  const user = auth.currentUser;
  if (!user) return;

  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    showNotif('وێنەکە زۆر گەورەیە، لانی کەم ٢MB بێت', 'error'); return;
  }

  // وێنە بکە Base64
  const reader = new FileReader();
  reader.onload = async (ev) => {
    const base64 = ev.target.result;
    try {
      await updateProfile(user, { photoURL: base64 });
      await updateDoc(doc(db, 'users', user.uid), { photoURL: base64 });
      document.getElementById('profileAvatar').src = base64;
      showNotif('وێنەکە نوێکرایەوە ✅', 'success');
    } catch (err) {
      showNotif('کێشەیەک هەبوو', 'error');
    }
  };
  reader.readAsDataURL(file);
});

// ── دەرچوون ──
document.getElementById('logoutBtn').addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'sign.html';
});

// ── Navbar Scroll ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}
