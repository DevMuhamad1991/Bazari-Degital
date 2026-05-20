import { initializeApp } from “https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js”;
import { getAuth, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail } from “https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js”;
import { getFirestore, doc, getDoc, updateDoc } from “https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js”;

const firebaseConfig = {
apiKey: “AIzaSyASJbu_rNecyaHi9gqrE9PSOwyA7pvq92E”,
authDomain: “kurd-account.firebaseapp.com”,
projectId: “kurd-account”,
storageBucket: “kurd-account.firebasestorage.app”,
messagingSenderId: “325274297633”,
appId: “1:325274297633:web:04f9b4b209d3d0f6a90a60”
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── Navbar Scroll ──
const navbar = document.getElementById(‘navbar’);
if (navbar) {
window.addEventListener(‘scroll’, () => {
navbar.classList.toggle(‘scrolled’, window.scrollY > 40);
});
}

// ── Notification ──
function showNotif(message, type = ‘success’) {
const old = document.querySelector(’.notif’);
if (old) { old.classList.remove(‘notif-show’); setTimeout(() => old.remove(), 300); }
const notif = document.createElement(‘div’);
notif.className = `notif notif-${type}`;
notif.innerHTML = `<span>${message}</span><div class="notif-bar"></div>`;
document.body.appendChild(notif);
setTimeout(() => notif.classList.add(‘notif-show’), 10);
setTimeout(() => { notif.classList.remove(‘notif-show’); setTimeout(() => notif.remove(), 400); }, 3500);
}

// ── Profile Redirect ──
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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


// ── یوزەرنەیم لە ئیمەیڵ ──
function usernameFromEmail(email) {
return email.split(’@’)[0];
}

// ── پرۆفایل بارکە ──
onAuthStateChanged(auth, async (user) => {
if (!user) { window.location.href = ‘sign.html’; return; }

const userSnap = await getDoc(doc(db, ‘users’, user.uid));
const userData = userSnap.exists() ? userSnap.data() : {};

const username = userData.username || usernameFromEmail(user.email);
const fullName = userData.firstName && userData.lastName
? userData.firstName + ’ ’ + userData.lastName
: user.displayName || ‘’;
const photoURL = userData.photoURL || user.photoURL ||
`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || username)}&background=2563eb&color=fff&size=200`;

document.getElementById(‘profileAvatar’).src            = photoURL;
document.getElementById(‘profileFullName’).textContent  = fullName || username;
document.getElementById(‘profileUsername’).textContent  = ‘@’ + username;
document.getElementById(‘profileEmail’).textContent     = user.email;
document.getElementById(‘usernameInput’).value          = username;
document.getElementById(‘fullNameInput’).value          = fullName;
document.getElementById(‘resetEmailInput’).value        = user.email;
});

// ── یوزەرنەیم پاشەکەوبکە ──
document.getElementById(‘saveUsernameBtn’).addEventListener(‘click’, async () => {
const user = auth.currentUser;
if (!user) return;
const val = document.getElementById(‘usernameInput’).value.trim();
if (!val)        { showNotif(‘یوزەرنەیم بنووسە’, ‘error’); return; }
if (val.length < 3) { showNotif(‘لانی کەم ٣ پیت بێت’, ‘error’); return; }
if (/\s/.test(val)) { showNotif(‘مێڵ مەبێت تێدا’, ‘error’); return; }
try {
await updateDoc(doc(db, ‘users’, user.uid), { username: val });
document.getElementById(‘profileUsername’).textContent = ‘@’ + val;
showNotif(‘یوزەرنەیم نوێکرایەوە ✅’, ‘success’);
} catch { showNotif(‘کێشەیەک هەبوو’, ‘error’); }
});

// ── ناوی تەواو پاشەکەوبکە ──
document.getElementById(‘saveNameBtn’).addEventListener(‘click’, async () => {
const user = auth.currentUser;
if (!user) return;
const val = document.getElementById(‘fullNameInput’).value.trim();
if (!val) { showNotif(‘ناوی تەواو بنووسە’, ‘error’); return; }
try {
await updateProfile(user, { displayName: val });
await updateDoc(doc(db, ‘users’, user.uid), { displayName: val });
document.getElementById(‘profileFullName’).textContent = val;
showNotif(‘ناوەکە نوێکرایەوە ✅’, ‘success’);
} catch { showNotif(‘کێشەیەک هەبوو’, ‘error’); }
});

// ── وێنەی پرۆفایل گۆڕین ──
document.getElementById(‘avatarInput’).addEventListener(‘change’, async (e) => {
const user = auth.currentUser;
if (!user) return;
const file = e.target.files[0];
if (!file) return;
if (file.size > 2 * 1024 * 1024) { showNotif(‘وێنەکە زۆر گەورەیە، لانی کەم ٢MB’, ‘error’); return; }
const reader = new FileReader();
reader.onload = async (ev) => {
const base64 = ev.target.result;
try {
await updateProfile(user, { photoURL: base64 });
await updateDoc(doc(db, ‘users’, user.uid), { photoURL: base64 });
document.getElementById(‘profileAvatar’).src = base64;
showNotif(‘وێنەکە نوێکرایەوە ✅’, ‘success’);
} catch { showNotif(‘کێشەیەک هەبوو’, ‘error’); }
};
reader.readAsDataURL(file);
});

// ── Forgot Password ──
document.getElementById(‘resetPasswordBtn’).addEventListener(‘click’, async () => {
const email = document.getElementById(‘resetEmailInput’).value.trim();
if (!email) { showNotif(‘ئیمەیڵ بنووسە’, ‘error’); return; }
try {
await sendPasswordResetEmail(auth, email);
showNotif(‘ئیمەیڵی ڕیسێت نێردرا ✅ سەیری ئیمەیڵەکەت بکە’, ‘success’);
} catch (error) {
if (error.code === ‘auth/user-not-found’) showNotif(‘ئەم ئیمەیڵە تۆمارنەکراوە’, ‘error’);
else if (error.code === ‘auth/invalid-email’) showNotif(‘ئیمەیڵەکە دروست نییە’, ‘error’);
else showNotif(‘کێشەیەک هەبوو’, ‘error’);
}
});

// ── دەرچوون ──
document.getElementById(‘logoutBtn’).addEventListener(‘click’, async () => {
await signOut(auth);
window.location.href = ‘sign.html’;
});